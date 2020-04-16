const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const accountRouter = require('../router/account');
// const roleRouter = require('../router/role');
// const powerRouter = require('../router/power');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/account',accountRouter);
// app.use('/role',roleRouter);
// app.use('/power',powerRouter);



app.use((err,req,res,next)=>{
    console.log(err)
    if(err){
        res.status(500).json({
            code: 500,
            message: 'request fail'
        })
    }
})
app.listen(3000,()=>{
    console.log('server run')
});