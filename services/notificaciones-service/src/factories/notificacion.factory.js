class EmailNotification {
  send(destinatario, mensaje) {
    console.log(`[Notificación EMAIL] Enviando a '${destinatario}': ${mensaje}`);
  }
}

class SMSNotification {
  send(destinatario, mensaje) {
    console.log(`[Notificación SMS] Enviando a '${destinatario}': ${mensaje}`);
  }
}

class NotificacionFactory {
  static createNotificationChannel(type) {
    switch (type.toLowerCase()) {
      case 'email':
        return new EmailNotification();
      case 'sms':
        return new SMSNotification();
      default:
        return new EmailNotification();
    }
  }
}

module.exports = NotificacionFactory;