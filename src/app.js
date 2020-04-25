const express = require('express');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const redis = require('redis')
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = redis.createClient({
    connect_timeout: 1000*60*60*24*1
})
const app = express();

const { verifyToken } = require('./common/utils');





//路由
const loginRouter = require('./router/login');
const accountRouter = require('./router/account');
const roleRouter = require('./router/role');
const powerRouter = require('./router/power');

// app.use(cookieParser());

// app.set('trust proxy', 1);
app.use(session({
    secret: "keyboard cat",
    resave: false,
    // rolling: true,
    saveUninitialized: true,
    store: new RedisStore({ client: redisClient }),
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 1
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//设置跨域访问
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use((req, res, next)=>{
    try {
        let originalUrl = req.originalUrl;
        if (originalUrl != '/login' && originalUrl != '/captcha') {
            let token = req.headers.authorization.split(' ')[1];
            // console.log(token)
            let islogin = verifyToken(token);
            let exp = Number(islogin.exp + '000');
            let currentDate = Date.parse(new Date());
            // console.log("authorization", req.headers.authorization);
            // console.log("userid",req.session.userid)
            // console.log("username",req.session.username)
            // console.log("islogin",currentDate > exp)
            // console.log("islogin",currentDate - exp)
            // console.log("islogin",islogin)
            // console.log("cookie",req.headers.cookie)
            if (islogin.userid != req.session.userid ||
                islogin.username != req.session.username ||
                currentDate > exp) {
                return res.json({
                    code: 402
                })
            }
        }
        next();
    } catch (error) {
        next(error);
    }
})


app.use(loginRouter);
app.use('/account', accountRouter);
app.use('/role',roleRouter);
app.use('/power',powerRouter);



app.use((err, req, res, next) => {
    
    console.log(err)
    if (err) {
        return res.status(500).json({
            code: 500,
            message: err
        })
    }
})
app.listen(3000, () => {
    console.log('server run')
});




