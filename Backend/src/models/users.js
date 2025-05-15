import mongoose, { Schema, model } from "mongoose";

const schema = new Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    },
    role: {
        type: String,
        enum: ["admin", "leader", "employe"]
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    leader: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
});

export const Users = model("user", schema);
