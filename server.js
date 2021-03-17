import Express from "express"

var i = 1;
const server = Express();
const port = 3000;
server.use(Express.json());
server.use(Express.urlencoded({extended: true}));
var message = [{id:i++, name:"Hello"}, {id:i++, name:"World"}];

//GET

server.get("/message", (req, res) => {
    res.json(message);
});

//POST

server.post("/message", (req, res) =>{
    const newMessage = {id: i++, name: req.body.name}
    message.push(newMessage);
    res.json(message);
});

//PUT

server.put("/message/:id", (req, res) =>{
    if (req.body) {
        const msg = message.find((item) => item.id == req.body.id);
        msg.name = req.body.name;
        message[msg.id-1] = msg;
        res.send(message);
    }
});

//DELETE

server.delete("/message/:id", (req, res) =>{
    if (req.body) {
        const msg = message.find((item) => item.id == req.body.id);
        message.splice(message.indexOf(msg), 1);
        res.json(message);
    }
});

server.listen(port, () => console.log("Listening on port " + port));