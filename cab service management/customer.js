const db=require('./db')
// function getAll(callback){
// const sql="select id,email,age from customers"
// db.executeQuery(sql,[],callback)
// }
function addOne(firstName,lastName,email,phone,password,callback){
const sql="insert into passenger(first_name,last_name,email,phone,passwrd)values(?,?,?,?,?)"
db.executeQuery(sql,[firstName,lastName,email,phone,password],callback)
}
function logOne(email,pwd,callback)
{
    const sql="select * from passenger where email=? and passwrd=?"
    db.executeQuery(sql,[email,pwd],callback) 
}
module.exports.addOne=addOne
module.exports.logOne=logOne