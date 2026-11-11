const amqp = require('amqplib');
const NotificacionFactory = require('./factories/notificacion.factory');

async function startConsumer() {
  try {
    const rabbitUrl = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
    const connection = await amqp.connect(rabbitUrl);
    const channel = await connection.createChannel();

    await channel.assertExchange('logitech_events', 'fanout', { durable: false });
    const q = await channel.assertQueue('', { exclusive: true });
    await channel.bindQueue(q.queue, 'logitech_events', '');

    console.log('[Notificaciones Service] Escuchando eventos de la cola...');

    channel.consume(q.queue, (msg) => {
      if (msg.content) {
        const content = JSON.parse(msg.content.toString());
        if (content.event === 'PedidoCreado') {
          const pedido = content.payload;
          
          // Uso del Factory Method
          const notifier = NotificacionFactory.createNotificationChannel('email');
          notifier.send(
            `cliente_${pedido.clienteId}@correo.com`,
            `¡Tu pedido ID ${pedido.id} ha sido recibido con éxito!`
          );
        }
      }
    }, { noAck: true });

  } catch (error) {
    console.error('[Notificaciones Service] Error al conectar a RabbitMQ:', error.message);
    setTimeout(startConsumer, 5000);
  }
}

startConsumer();