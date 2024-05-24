const path  = require("path");
const express = require("express");
const app = express();
const con = require("../connection/url_shortener");
const shortner = require("node-url-shortener");

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
                res.render("home.ejs",{"email":data.email,"flag":0});
            }
            else
            {
                res.write("email already exists !!!");
                res.end();
            }

        });

    },
    shorted_store : function(req,res){
        const data = req.query;
        shortner.short(data.url,(err,url_shortener)=>{
            con.query(`select url from url_shortener where url=\"${data.url}\"`,(err,re)=>{
                console.log(re);
                console.log(re.length);
                if(re.length == 0)
                {
                    console.log(re.length);
                    con.query(`insert into url_shortener values (\"${data.url}\",\"${url_shortener}\",0,\"${data.user_email}\")`);
                }
                con.query(`update url_shortener set view = view+1 where url = \"${data.url}\"`);
            });
        });

        con.query(`select * from url_shortener where email=\"${data.user_email}\"`,(err,result)=>{
            console.log(result);
            res.render("home.ejs",{"flag":1,"result":result,"email":data.user_email});
        })
    }
}

module.exports  = func;