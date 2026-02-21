import { spawn } from 'child_process';

const port = Number(process.env.SMOKE_PORT || 4010);
const baseUrl = `http://127.0.0.1:${port}`;
const startupTimeoutMs = 45000;

const routes = [
  { path: '/', label: 'home page' },
  { path: '/portfolio', label: 'portfolio page' },
  { path: '/project/flora', label: 'project detail page' },
];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, timeoutMs) {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // Server is not ready yet.
    }

    await delay(500);
  }

  throw new Error(`Server did not become ready within ${timeoutMs}ms`);
}

function startServer() {
  return spawn('pnpm', ['start', '-p', String(port)], {
    stdio: 'inherit',
    env: { ...process.env },
  });
}

async function run() {
  const server = startServer();
  let serverExited = false;

  server.on('exit', (code) => {
    serverExited = true;
    if (code !== 0) {
      console.error(`Smoke test server exited early with code ${code}`);
    }
  });

  try {
    await waitForServer(`${baseUrl}/`, startupTimeoutMs);

    for (const route of routes) {
      const url = `${baseUrl}${route.path}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Expected ${route.label} (${route.path}) to return 200, got ${response.status}`);
      }

      console.log(`PASS ${route.path} -> ${response.status}`);
    }

    console.log('Smoke tests passed.');
  } finally {
    if (!serverExited) {
      server.kill('SIGTERM');
      await new Promise((resolve) => server.once('exit', resolve));
    }
  }
}

run().catch((error) => {
  console.error('Smoke tests failed.');
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
