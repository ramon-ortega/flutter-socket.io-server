const { io } = require('../app');
// Mensajes de Sockets
io.on('connection', client => {

    console.log("Cliente conectado");
    
      client.on('disconnect', () => {
        console.log("Cliente desconectado");
      });
    
      client.on('mensaje', (payload)=>{
        console.log('Recibi mensaje!!', payload);
    
        io.emit('mensaje', {admin: 'Mensaje del admin'});
      });
    
    });