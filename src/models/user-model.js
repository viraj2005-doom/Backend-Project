import { lowerCase } from 'lodash'
import mongoose, {Schema} from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    username:{
        type:String,
        index:true,
        required:true,
        unique:true,
        trim:true,
        lowerCase:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowerCase:true,
    },
    fullname:{
        type:String,
        index:true,
        required:true,
        trim:true,
    },
    avatar:{
        type:String, // cloudinary link
        reqquired: true,
    },
    coverimage:{
        type:String, // cloudinary link

    },
    watchhistory:[
        {
            type:Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password:{
        type:String, //passwors should be hashed using bcrypt -- it is package bwitch
        required:[true,'Password is required'],
    },
    // direct encryption shakya nathi mate mongoose na hooks use karva padse
    // pre hook che temna mate use thay che
    //pre hook pote middleware che
    //data save thava jyare jai rahyo hoy aeni pela j tamaro password encrypt thay
    //data save pacchi nai

    refreshtoken:{
        type:String,
    },
},
{
    timestamps:true,
})

userSchema.pre("save", async function (next) {
    if (this.ismodified("password")) {
        this.password = bcrypt.hash(this.password,10)
    next()
    }
})
//middleware chaar prakar na hoy che ( 1.document 2.model 3.query 4.aggregate)
//jema document middleware use karva ma aave che ane tena 4 event niche apel che
//validate,save,remove,updateone,deleteone


userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            username: this.username,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
     return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
        }
    )
}

export const User = mongoose.model('User',userSchema)