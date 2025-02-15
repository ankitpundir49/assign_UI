

let express=require("express");
let passport=require("passport");
let jwt=require("jsonwebtoken");
let JWTStrategy = require('passport-jwt').Strategy;
let ExtractJWT = require('passport-jwt').ExtractJwt;

const { file } = require("react-dom");
let app=express();

app.use(express.json());

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD"
    );
    res.header(
        "Access-Control-Allow-Header",
        "Origin,X-Requested-with,Content-Type,Accept,Authorization"
    );
    next();
});

app.use(passport.initialize());

const port=2410;
app.listen(port,()=>console.log(`Node app listening on port ${port}!`))

let userEmail="";

const { Client } = require("pg");

const client = new Client({
    host:"localhost",
    port:5432,
    dbname:"postgres",
    user:"postgres",
    password:"adminew",
    sslmode:"prefer",
});
client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err));



const params={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:"jwtsecret23647832",
}
let jwtExpireSeconds=300;

let strategyAll=new JWTStrategy(params,function(token,done){
    const query =`SELECT * FROM usertype WHERE email =$1 AND pass =$2`
    client.query(query,[token.email,token.pass],function (err, result) {
        if(!result) {
            return done(null,false,{message:"Incorrect Email or Password"}) 
        }    
        else
            return done(null,result.rows[0]);
    });
})
let strategyAgent=new JWTStrategy(params,function(token,done){
    const query =`SELECT * FROM usertype WHERE email =$1 AND pass =$2`
    client.query(query,[token.email,token.pass],function (err, result) {
        if(!result) {
            return done(null,false,{message:"Incorrect Email or Password"}) 
        }   
        else if(result.rows[0].role!=="agent") {
            return done(null,false,{message:"You do not have agent role"}) 
        }     
        else
            return done(null,result.rows[0]);
    });
})
let strategyAdmin=new JWTStrategy(params,function(token,done){
    const query =`SELECT * FROM usertype WHERE email =$1 AND pass =$2`
    client.query(query,[token.email,token.pass],function (err, result) {
        if(!result) {
            return done(null,false,{message:"Incorrect Email or Password"}) 
        }
        else if(result.rows[0].role!=="admin") {
            return done(null,false,{message:"You do not have admin role"}) 
        }    
        else
            return done(null,result.rows[0]); 
        })
})

passport.use("roleAll",strategyAll);
passport.use("roleAgent",strategyAgent);
passport.use("roleAdmin",strategyAdmin);



app.post("/login",async function(req,res){
    let data=[
        req.body.email,
        req.body.password
    ];
    userEmail=req.body.email;
    try{
        let query=`SELECT * FROM usertype WHERE email =$1 AND pass =$2`;
        client.query(query,data,function (err, result) {
            if(result) {
                let payload={email:result.rows[0].email,pass:result.rows[0].pass,role:result.rows[0].role};
                let token=jwt.sign(payload,params.secretOrKey,{
                    algorithm:"HS256",
                });
                res.send({
                    token: "bearer " + token,
                    user:payload});
            }
            else res.sendStatus(401);
        })
    }
    catch(err){
        console.log(err);
    }
})



app.get("/users",passport.authenticate("roleAdmin",{session:false}),function(req,res){
    let query="SELECT * FROM public.users u JOIN public.usertype ut ON u.email = ut.email WHERE ut.role = 'student';";
    client.query(query,function(err,result){
        if(err) res.status(404).send(err);
        else
        {   res.send(result.rows);}
    })
})
app.get("/user",passport.authenticate("roleAll",{session:false}),function(req,res){
    let query="SELECT * FROM users where email=$1";
    client.query(query,[userEmail],function(err,result){
        if(err) res.status(404).send(err);
        else
        {   res.send(result.rows);}
    })
})
app.put("/updateUser",passport.authenticate("roleAdmin",{session:false}),function (req, res, next) {
    const { applicationstatus, email } = req.body;
    let query="update users Set applicationstatus=$1 where email=$2";
    client.query(query,[applicationstatus,email],function(err,result){
        if(err) res.send(err);
        else res.send("User updated successfully");
    }) 
});

const cors=require("cors");
app.use(cors());