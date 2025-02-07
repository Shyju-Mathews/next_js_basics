import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    }
})

const UserModel = models.User || model("User", userSchema);

export default UserModel;