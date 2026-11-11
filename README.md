# 🚚 LogiTech Express - Arquetipo de Microservicios y Event-Driven Architecture

Este repositorio contiene la implementación del prototipo funcional para la modernización de la plataforma digital de **LogiTech Express**, estructurada mediante una arquitectura orientada a microservicios y guiada por eventos.

---

## 🛠️ Requisitos Previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y en ejecución.
- [Postman](https://www.postman.com/) o cURL para pruebas de endpoints.

---

## 🚀 Instrucciones para Levantar el Sistema Localmente

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/equipo-arquitectura-optima/logitech-express-microservices.git
   cd logitech-express-microservices
   ```

2. **Construir y desplegar con Docker Compose:**
   ```bash
   docker-compose up --build -d
   ```

3. **Verificar que todos los contenedores estén corriendo:**
   ```bash
   docker-compose ps
   ```

---

## 📹 Guión de Demostración para la Presentación (15 Minutos)

### Paso 1: Mostrar la Arquitectura Desplegada
- Abrir la consola de gestión de **RabbitMQ**: `http://localhost:15672` (guest / guest).

### Paso 2: Petición a través del API Gateway
- `POST http://localhost:3000/api/pedidos`
```json
{
  "clienteId": "USR-9876",
  "items": [{"productoId": "PROD-01", "cantidad": 2}],
  "direccionOrigen": "Bodega Central Medellín",
  "direccionDestino": "Calle 50 #30-20"
}
```

### Paso 3: Evidenciar Eventos en Logs
- `docker-compose logs -f`