const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de simulación de Autenticación JWT (RF-01)
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    next();
  } else {
    next(); 
  }
};

app.use(express.json());

// Enrutamiento hacia el microservicio de pedidos
app.use('/api/pedidos', authenticateJWT, createProxyMiddleware({
  target: process.env.PEDIDOS_SERVICE_URL || 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/api/pedidos': '/pedidos',
  },
}));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'API Gateway' });
});

app.listen(PORT, () => {
  console.log(`[API Gateway] Ejecutándose en el puerto ${PORT}`);
});