const io = require("socket.io-client");
const readline = require("readline");
const socket = io.connect("http://localhost:8888",{reconnect:true});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let nickname = null;

socket.on("connect",(socket)=>{
    console.log("Connected!");

    rl.question("What you nickname? ",(answer)=>{
        nickname=answer;
        mess();
    });
});

socket.on("message",(msg)=>{
    console.log(toMessage(msg));
});

const mess = () => {
    rl.question("",(msg)=>{
        socket.emit("message",pack({
            nickname:nickname,
            msg:msg
        }));
    });
};

const pack = (obj) =>{
    return JSON.stringify(obj);
};

const toMessage = (str) => {
    let obj = JSON.parse(str);
    return obj.nickname+": "+obj.msg;
};
