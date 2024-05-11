const express = require("express");
const app = express();
const signup = require("./routes/signup");
app.listen(2000,(err)=>{
    if(err)
        console.log("err--->"+err);
    else
        console.log("server started at port number 2000");
})
app.use(express.static(__dirname+"./views/democss.css"));

app.use("/url/signup",signup);