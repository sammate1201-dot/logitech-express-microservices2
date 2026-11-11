const amqp = require('amqplib');

class QueueService {
  constructor() {
    this.channel = null;
  }

  async connect() {
    try {
      const rabbitUrl = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
      const connection = await amqp.connect(rabbitUrl);
      this.channel = await connection.createChannel();
      await this.channel.assertExchange('logitech_events', 'fanout', { durable: false });
      console.log('[Pedidos Service] Conectado a RabbitMQ Exchange: logitech_events');
    } catch (error) {
      console.error('[Pedidos Service] Error al conectar a RabbitMQ:', error.message);
      setTimeout(() => this.connect(), 5000);
    }
  }

  publishEvent(routingKey, data) {
    if (this.channel) {
      const payload = Buffer.from(JSON.stringify({ event: routingKey, payload: data }));
      this.channel.publish('logitech_events', '', payload);
      console.log(`[Pedidos Service] Evento '${routingKey}' publicado a RabbitMQ`);
    }
  }
}

module.exports = new QueueService();