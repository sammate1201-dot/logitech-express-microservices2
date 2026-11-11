class PedidoRepository {
  constructor() {
    this.pedidos = new Map(); // Base de datos simulada en memoria
  }

  save(pedido) {
    this.pedidos.set(pedido.id, pedido);
    return pedido;
  }

  findById(id) {
    return this.pedidos.get(id);
  }

  findAll() {
    return Array.from(this.pedidos.values());
  }
}

module.exports = new PedidoRepository();