var cluster = require('cluster');
var os = require('os');

var cpus = os.cpus();
// console.log(cpus);

console.log('executando thread');

//O cluster master faz o gerenciamento de requisições. Como um loadbalancer.
if(cluster.isMaster) {
    console.log('thread master');
    cpus.forEach(function() {
        cluster.fork();
    });

    cluster.on('listening', function(worker) {
        console.log('cluster conectado ' + worker.process.pid);
    });

    //kill -term pid
    cluster.on('exit', worker => { 
        console.log('cluster %d desconectado', worker.process.pid);
        cluster.fork();
    });

} else {
    console.log('thread slave');
    require('./index.js');
}