import mongoose from "mongoose";

const {Schema, model} = mongoose;

const userSchema = new Schema({
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
        require: true
    },
    password: {
        type: "string",
        require: true
    }
})

const userModel = model("User", userSchema);

export default userModel