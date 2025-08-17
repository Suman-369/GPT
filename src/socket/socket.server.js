const {Server} = require("socket.io")

const aiServices = require("../services/ai.service")

function setupSocketServer(httpServer){
    const io = new Server(httpServer,{})


    io.on("connection",(socket)=>{
        console.log("A User Connected");


        socket.on("ai-message", async (message)=>{
           
        const result = await aiServices.generateContent(message);

        socket.emit("ai-message-response",result)  
        
 
        })
        socket.on("disconnect",()=>{
            console.log("A user Disconnect");
            
        })
        
    })
}


module.exports = setupSocketServer