const express = require('express');
const proxy = require('express-http-proxy');

const app = express();
const port = 3000;

const usersServiceUrl = 'http://localhost:3001';
const productsServiceUrl = 'http://localhost:3002';

app.use(express.json());

// Proxy para usuarios
app.use('/usuarios', proxy(usersServiceUrl, {
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    proxyReqOpts.headers = { ...srcReq.headers };
    return proxyReqOpts;
  },
  proxyReqPathResolver: (req) => req.originalUrl
}));

// Proxy para productos
app.use('/productos', proxy(productsServiceUrl, {
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    proxyReqOpts.headers = { ...srcReq.headers };
    return proxyReqOpts;
  },
  proxyReqPathResolver: (req) => req.originalUrl
}));

app.listen(port, () => {
  console.log(`API Gateway escuchando en http://localhost:${port}`);
});
