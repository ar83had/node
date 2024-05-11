const path  = require("path");
const express = require("express");
const app = express();
const con = require("../connection/url_shortener");

app.set("view engin","ejs");
app.set("views",path.resolve("../views"));

const  func = 
{
    signup : function(req,res){
            res.render("signup.ejs");
    },
    store : function(req,res){
        
        const data = req.query;
        con.query(`select * from url_signup where email=\"${data.email}\"`,(err,result)=>{
            if(result.length == 0)
            {
                con.query(`insert into url_signup values (\"${data.username}\",\"${data.password}\",\"${data.email}\")`);
                con.query("select * from url_signup",(err,result)=>{
                    if(err)
                        console.log("err-->"+err);
                    else
                        res.render("demo.ejs",{"result":result});

                })
            }
            else
            {
                res.write("email already exists !!!");
                res.end();
            }

        });

    }
}

module.exports  = func;