import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { lookupUscfMember } from './lib/uscf.js';

function membershipApiPlugin() {
  return {
    name: 'membership-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/get-membership-expiration', async (req, res, next) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        try {
          let body = '';

          for await (const chunk of req) {
            body += chunk;
          }

          const parsedBody = body ? JSON.parse(body) : {};
          const result = await lookupUscfMember(parsedBody.uscfId);

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(result));
        } catch (error) {
          if (error instanceof SyntaxError) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Invalid JSON body' }));
            return;
          }

          if (error.statusCode) {
            res.statusCode = error.statusCode;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: error.message }));
            return;
          }

          next(error);
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), membershipApiPlugin()],
});
