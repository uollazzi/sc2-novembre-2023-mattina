import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: String,
    author: String,
    body: String,
    date: { type: Date, default: Date.now },
    hidden: { type: Boolean, default: true },
});

export const Post = mongoose.model("Post", postSchema, "posts");