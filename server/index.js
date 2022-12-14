const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//nodemon - continuously see the changes, if we use node it will require to restart terminal again to see the changes 

//middleware
app.use(cors())
app.use(express.json());   //request from the body

//ROUTES//

//create a todo

//get or create data takes time, but async provides "await" which awaits wait for the function to complete before it continus
app.post("/todos", async(req, res) => {            
    try{
        //console.log(req.body);
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);

        res.json(newTodo.rows[0]);

    } catch (err) {
        console.error(err.message);   //error handling
    }
})

//get all todo

app.get("/todos", async(req, res) => {            
    try{
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows);

    } catch (err) {
        console.error(err.message);   //error handling
    }
})

//get a todo

app.get("/todos/:id", async(req, res) => {            
    try{
        //console.log(req.params);
        const { id } = req.params;

        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

        res.json(todo.rows[0]);

    } catch (err) {
        console.error(err.message);   //error handling
    }
})

//edit a todo

app.put("/todos/:id", async(req, res) => {            
try{
    //console.log(req.params);
    const { id } = req.params;
    const { description } = req.body;

    const editTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);

    res.json("Todo Updated!");

} catch (err) {
    console.error(err.message);   //error handling
}
})

//delete a todo

app.delete("/todos/:id", async(req, res) => {            
    try{
        //console.log(req.params);
        const { id } = req.params;
    
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    
        res.json("Todo Deleted!");
    
    } catch (err) {
        console.error(err.message);   //error handling
    }
    })

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});