const express = require('express');
const pedidoController = require('./controllers/pedido.controller');
const queueService = require('./services/queue.service');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.post('/pedidos', pedidoController.crearPedido);
app.get('/pedidos', pedidoController.obtenerPedidos);

app.listen(PORT, async () => {
  console.log(`[Pedidos Service] Escuchando en el puerto ${PORT}`);
  await queueService.connect();
});