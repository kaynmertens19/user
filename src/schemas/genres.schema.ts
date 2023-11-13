import mongoose from "mongoose";

const {Schema, model} = mongoose;

const genreSchema = new Schema({
    genreName: {
        type: "string",
        require: true,
        minLength: 2,
        maxLength: 20
    },

})

const GenreModel = model("Genre", genreSchema);

export default GenreModel