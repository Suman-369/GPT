const {Server} = require("socket.io")

function setupSocketServer(httpServer){
    const io = new Server(httpServer,{})


    io.on("connected",(socket)=>{
        console.log("A USer Connected");
        
    })
}


module.exports = setupSocketServer