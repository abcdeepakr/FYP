const express = require("express")
const app = express()
const port = 3000
app.get('/', (req, res) => {
    return res.send("you've reached the root page")
})
app.get('/signup', (req, res) => {
    return res.send("Sign up with google or something")
})
app.get('/login', (req, res) =>{
    return res.send("ho gaya bhai connect")

})

const isAdmin = (req, res, next) =>{
    console.log("Admin access granted")
    next();
}
const isLoggedin = (req, res, next) =>{
    console.log("You have logged in successfully")
    next();
}
const admin = (req, res) =>{
    return res.send("Welcome to the admin dashboard")
}


app.get('/admin', admin, isAdmin, isLoggedin)



app.listen(port, () =>{
    console.log(`Server is up and running at port ${port}`)
})




















