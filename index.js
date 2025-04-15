const express = require("express");
const app = express();
const mysql = require("mysql2");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({ extended: true }));

var methodOverride = require('method-override');
app.use(methodOverride('_method'));



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "*Sumitdeep27",
  database: 'new_prac'
});

// home page
app.get("/pro/home", (req, res) => {
  let q = "select * from user";
  try {
    connection.query(q, (err, results) => {
      if (err) throw err;
    //   console.log(results);
      res.render("home.ejs", { results });
    });
  } catch (err) {
    console.log(err);
  }
});

// new post
app.get("/pro/new",(req,res)=>{
    res.render("new.ejs");
})

// new post action
app.post("/posts",(req,res)=>{
    let {id,username,content} = req.body;
    let values=[id,username,content];
    let q = "insert into user (id,username,content) values (?,?,?)";
    try {
        connection.query(q,values,(err, results) => {
          if (err) throw err;
          res.redirect("/pro/home");
        });
    } 
    catch (err) {
        console.log(err);
    }
    
})

//edit post
app.get("/pro/:id/edit",(req,res)=>{
    let {id} = req.params;
    let q = "select * from user where id = ?";
    try {
        connection.query(q,[id],(err, results) => {
          if (err) throw err;
          let user = results[0];
          res.render("edit.ejs",{user});
        });
    } 
    catch (err) {
        console.log(err);
    }
})

app.patch("/pro/:id",(req,res)=>{
  let{id} = req.params;
  let new_con = req.body.content;
  let q = `update user set content=? where id = ${id}`;
  try {
    connection.query(q,[new_con],(err, results) => {
      if (err) throw err;
      res.redirect("/pro/home");
    });
  } 
  catch (err) {
    console.log(err);
  }

})


//delete
app.delete("/pro/:id",(req,res)=>{
  let {id} = req.params;
  let q = `delete from user where id =${id}`;
  try {
    connection.query(q,(err, results) => {
      if (err) throw err;
      res.redirect("/pro/home");
    });
  } 
  catch (err) {
    console.log(err);
  }
})

app.listen("8080", () => {
  console.log("listening");
});
