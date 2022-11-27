const express = require("express");
const path = require("path")
const app = express();
const { engine } = require('express-handlebars');
const { application } = require("express");
var bodyParser = require('body-parser')



var jsonParser = bodyParser.json()


app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "static")));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.json())
let data = [
    1,2,3,4,5
]
app.get("/", (req, res) => {
    res.render("index",{data:data});

});
app.post('/login', (req, res) => { 
    console.log("line 20")  
console.log(req.body.name)
res.send()
})
app.listen(5000,()=>{
    console.log("server listening on port 5000")
})