import app from './app.ts';

const server = (Bun as any).serve({
    port: process.env.PORT || 3000, // defaults to $BUN_PORT, $PORT, $NODE_PORT otherwise 3000
    fetch: app.fetch // defaults to app.fetch
  });

console.log(`Server running on ${server.port}`);