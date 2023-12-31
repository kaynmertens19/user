import mongoose from "mongoose";

const {Schema, model} = mongoose;

const userSchema = new Schema({
    _id:{
        type: "string", _id: false
    },
    name: {
        type: "string",
        require: true,
        minLength: 2,
        maxLength: 20
    },
    surname: {
        type: "string",
        require: true,
        minLength: 2,
        maxLength: 20
    }, 
    email: {
        type: "string",
        require: true,
        unique: true
    },
    password: {
        type: "string",
        require: true,
    },
    movies:[
        {
            type: Schema.Types.ObjectId,
            ref: "Movie"
        }
    ]
    


})

const UserModel = model("User", userSchema);

export default UserModel