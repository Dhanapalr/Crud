const { urlencoded } = require('body-parser');
const express=require('express')
var cors = require('cors')
const app= express();
app.use(cors())
const path=require('path')
const userroutes=require('./routes/user')
const excelroute=require('./routes/excel')

app.use(express.json())
app.use(express.urlencoded({extended:false}));
const dirpath=path.join(__dirname,'./public/') 
const viewpath=path.join(__dirname,'./views') 
app.use(express.static(dirpath))
app.set('view engine', 'hbs');
app.set('views','views')


app.use('/',userroutes)
app.use('/export',excelroute)
const URL=process.env.Mongo_DB;
const mongoose=require('mongoose');
mongoose.connect(URL, {useFindAndModify:false,useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true }).then(()=>{
    console.log('connected successfully')
}).catch((e)=>{
    console.log('Not connected')
})






const Port=process.env.PORT || 3001

app.listen(Port,()=>{
    console.log('listening on 3001')
})