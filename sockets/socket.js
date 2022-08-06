const { io } = require('../app');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band('Queen') );
bands.addBand( new Band('The beatles') );
bands.addBand( new Band('Metallica') );
bands.addBand( new Band('Soda Stereo') );
bands.addBand( new Band('Portugal The man') );

console.log(bands);


// Mensajes de Sockets
io.on('connection', client => {

    console.log("Cliente conectado");

    client.emit('active-bands', bands.getBands() );
    
      client.on('disconnect', () => {
        console.log("Cliente desconectado");
      });
    
      client.on('mensaje', (payload)=>{
        console.log('Recibi mensaje!!', payload); 
        io.emit('mensaje', {admin: 'Mensaje del administrador'});
      });

      client.on('vote-band', (payload)=>{
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
      });

      client.on('add-band', (payload) => {
        const band = new Band(payload.name)
        bands.addBand(band);
        io.emit('active-bands', bands.getBands());
      });

      client.on('delete-band', (payload) => {
        console.log(payload.id);
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
        // console.log(bands.getBands());
      });

      // client.on('emitir-mensaje', (payload)=>{
      //   // console.log(payload);
      //   // io.emit('nuevo-mensaje', payload); // emite a todos
      //   client.broadcast.emit('nuevo-mensaje', payload) // emite a todos menos al que lo emitio
      // });
    
    });