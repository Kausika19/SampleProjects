const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const route = express.Router();

app.use(cors())
app.use(express.json());   

route
app.get("/login_app", async(res,req) =>{
    try{
        const {email} = req.email 
        console.log(email)
        const results = await pool.query("SELECT * FROM users WHERE email = '$1' AND password = '$2' returning *",
        [req.body.email, req.body.password])
        console.log("User found!");
    }catch(err){
        console.error(err.message)
    }
})


app.post("/login_app", async (req, res) => {
    try{
        if(req.body.status=="login"){
            console.log("trying to log in")
            const existingUser = await pool.query(
                "SELECT name from users WHERE email=$1 AND password = $2",
                [req.body.email,  req.body.password]
            );
            if(existingUser.rowCount!=0){
            res.json({ loggedIn: true});
            }else{
                res.json({ loggedIn: false });
            }
        }else{
      
            console.log("trying to register")

            let { name, email, password } = req.body;
        
            let errors = [];
        
            console.log({
            name,
            email,
            password
            });

            const res = await pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, password]);
                res.json({ registered: true});
            
        }

    }catch(err){
        console.error(err.message);
    }
  });


app.listen(5000, () => {
    console.log("Server has started on port 5000");
});