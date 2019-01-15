// 'use strict' // Javascript fica mais rigoroso com o código, ex: necessario usar ;

// importação de pacotes do node_modules para a minha aplicação
const app = require('../src/app');
const http = require('http');
const debug = require('debug')('CursoNode:server');

const port = normalizePort( process.env.PORT || 3000);

const server = http.createServer(app);

server.listen(port);
server.on('Error', onError);
server.on('listening', onListening);
console.log('API rodando na porta ' + port);

function normalizePort(val) {
    const port = parseInt(val, 10);

    if(isNaN(port)){
        return val;
    }

    if(port >= 0) {
        return port;
    }
    return false;
}

function onError(error){
    if(error.syscall != 'listen'){
        throw error;
    }

    const bind = typeof port === 'string' ?
        'pipe ' + port :
        'port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            proccess.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is already in use');
            proccess.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}