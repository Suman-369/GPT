
const userModel = require("../models/user.models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function getResgisterController(req,res){
    res.render("register")
}

async function postRegisterController(req,res) {
 
    const {name, username , email , password} = req.body

    const isUserExist = await userModel.findOne({
        $or:[
            { username:username },
            { email:email }

        ]
    })

    if(isUserExist){
        return res.status(400).json({
            message:"User already exists"
        })
    }

    const  hashedPassword = await bcrypt.hash(password,10)

    const user = await userModel.create({
        name: name,
        username: username,
        email: email,
        password:hashedPassword
    })


    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie("token",token)

    return res.redirect("/")
}

async function getLoginController(req,res){
    res.render("login")
}


async function postLoginController(req,res) {
const {username , password} = req.body

const user = await userModel.findOne({
    $or: [
        { username: username },
        { email: username }
    ]
})

if(!user){
    return res.redirect("/auth/login?error=User not found")
}

const isPasswordValid = await bcrypt.compare(password,user.password)

if(!isPasswordValid){
    return res.redirect("/auth/login?error=Invalid password")
}
    
const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

res.cookie('token',token)

return res.redirect("/")

}


async function userLogout(req,res) {

    res.clearCookie("token")
    return res.redirect("/auth/login")
    
}



module.exports = {
    getResgisterController,
    postRegisterController,
    getLoginController,
    postLoginController,
    userLogout
}