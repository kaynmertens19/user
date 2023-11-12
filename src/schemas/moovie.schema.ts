import mongoose from "mongoose";

const {Schema, model} = mongoose;

const movieSchema = new Schema({
    _id:{
        type: "string", _id: false
    },
    name: {
        type: "string",
        require: true,
        minLength: 2,
        maxLength: 20
    },
    description: {
        type: "string",
        require: true,
        minLength: 2,
        maxLength: 50
    },
    createdAt:{

    },
    updatedAt:{

    },
    genre:[
        {
            type: Schema.Types.ObjectId,
            ref: "Genre",
            require: true
        }
    ]
    


})

const movieModel = model("Moovie", movieSchema);

export default movieModel;