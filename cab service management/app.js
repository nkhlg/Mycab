
const url=require('url')
const path=require('path')
const http=require('http')
const customer=require('./customer')
const fs=require('fs')
const qs=require('querystring')
const Handlebars=require("handlebars")
const { templates } = require('handlebars')
const server=http.createServer(function(req,res){
const link=url.parse(req.url,true)
const query=link.query
const page=link.pathname
console.log(page)
if(page=='/')
{

    let t=renderTemplate('home')
    res.end(t)

}
else if(page=='/register' && req.method=='GET')
{
let template=renderTemplate('register',{})
res.end(template)
}
else if(page=='/login' && req.method=='GET')
{
    let t=renderTemplate('login')
    res.end(t)
}
else if(page=='/login' && req.method=='POST')
{
    let formData=''
    req.on('data',(data)=>{
    formData+=data.toString()
    })
    req.on('end',()=>{
    
    let userData=qs.parse(formData)
    customer.logOne(userData.email,userData.pwd,(err,result)=>{
        var context={
            result:{success:true,
            errors:[]}
        }
            if(result.length==0)
            {
                context.result.success=false
                let t=renderTemplate('login',context)
            res.end(t)
               
               
            }
            if(result.length>0)
            {
            let t=renderTemplate('booking')
            res.end(t)
            }
            
            
        
            
    })
    })

}
else if(page=='/register' && req.method=='POST')
{
    
    let formData=''
req.on('data',(data)=>{
formData+=data.toString()
console.log(formData)
})
req.on('end',()=>{

let userData=qs.parse(formData)
customer.addOne(userData.firstname,userData.secondname,userData.email,userData.phone,userData.password,(err,result)=>{
    var context={
        result:{success:true,
        errors:[]}
    }
        if(err)
        {
            context.result.success=false
        }
        
        
        let t=renderTemplate('register',context)
        res.end(t)
        
        
})
})
}
}).listen(80)
function renderTemplate(name,data)
{
    var filePath=path.join(__dirname,name+'.hbs')
    let templateText=fs.readFileSync(filePath,'utf-8')
    let template=Handlebars.compile(templateText)
    return template(data)
}



