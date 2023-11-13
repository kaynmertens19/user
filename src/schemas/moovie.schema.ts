import mongoose from "mongoose";

const {Schema, model} = mongoose;

const movieSchema = new Schema({
    name: {
        type: "string",
        require: true,
        minLength: 2,
        maxLength: 20
    },

    genre:[
        {
            type: Schema.Types.ObjectId,
            ref: "Genre",
            require: true
        }
    ]
    


})

const movieModel = model("Movie", movieSchema);

export default movieModel;