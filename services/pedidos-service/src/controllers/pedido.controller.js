const { v4: uuidv4 } = require('uuid');
const pedidoRepository = require('../repositories/pedido.repository');
const queueService = require('../services/queue.service');

exports.crearPedido = (req, res) => {
  const { clienteId, items, direccionOrigen, direccionDestino } = req.body;

  const nuevoPedido = {
    id: uuidv4(),
    clienteId,
    items,
    direccionOrigen,
    direccionDestino,
    estado: 'CREADO',
    fecha: new Date().toISOString()
  };

  pedidoRepository.save(nuevoPedido);

  // Publicar Evento Asíncrono (Pub/Sub)
  queueService.publishEvent('PedidoCreado', nuevoPedido);

  return res.status(202).json({
    mensaje: 'Pedido recibido y en proceso de orquestación',
    pedido: nuevoPedido
  });
};

exports.obtenerPedidos = (req, res) => {
  res.status(200).json(pedidoRepository.findAll());
};