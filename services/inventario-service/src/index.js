const amqp = require('amqplib');

async function startConsumer() {
  try {
    const rabbitUrl = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
    const connection = await amqp.connect(rabbitUrl);
    const channel = await connection.createChannel();

    await channel.assertExchange('logitech_events', 'fanout', { durable: false });
    const q = await channel.assertQueue('', { exclusive: true });
    await channel.bindQueue(q.queue, 'logitech_events', '');

    console.log('[Inventario Service] Escuchando eventos en RabbitMQ...');

    channel.consume(q.queue, (msg) => {
      if (msg.content) {
        const content = JSON.parse(msg.content.toString());
        if (content.event === 'PedidoCreado') {
          console.log(`[Inventario Service] 📦 Procesando reserva de inventario para el Pedido ID: ${content.payload.id}`);
        }
      }
    }, { noAck: true });

  } catch (error) {
    console.error('[Inventario Service] Error al conectar a RabbitMQ:', error.message);
    setTimeout(startConsumer, 5000);
  }
}

startConsumer();