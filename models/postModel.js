import {models, model, Schema } from "mongoose";

const postSchema = new Schema({
    title: {type: String},
    description: {type: String},
    image: {type: String}
})

const PostModel = models.Post ||  model("Post", postSchema);

export default PostModel;