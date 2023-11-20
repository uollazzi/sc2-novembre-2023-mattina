// DAL: Data Access Layer

import { config } from "dotenv";
import mongoose from "mongoose";
import { Post } from "./models/post";
config();

const connectionString = process.env.MONGODB_CONNECTION_STRING;

export const addPost = async (
    title: string,
    body: string,
    author: string,
    hidden: boolean) => {

    try {
        await mongoose.connect(connectionString!, { dbName: "blog" });

        const post = new Post();
        post.title = title;
        post.body = body;
        post.author = author;
        post.hidden = hidden;

        return await post.save();
    } catch (error) {
        console.log(error);
    }
    finally {
        await mongoose.disconnect();
    }
}

export const updatePost = async (
    id: string,
    title: string | null,
    body?: string,
    author?: string,
    hidden?: boolean) => {

    try {
        await mongoose.connect(connectionString!, { dbName: "blog" });

        const post = await Post.findById(id);

        if (post) {
            if (title) post.title = title;
            if (body) post.body = body;
            if (author) post.author = author;
            if (hidden) post.hidden = hidden;

            return await post.save();
        } else {
            return null;
        }

    } catch (error) {
        console.log(error);
    }
    finally {
        await mongoose.disconnect();
    }
}

export const deletePost = async (id: string) => {

    try {
        await mongoose.connect(connectionString!, { dbName: "blog" });

        const r = await Post.deleteOne({ _id: id });

        return r;
    } catch (error) {
        console.log(error);
    }
    finally {
        await mongoose.disconnect();
    }
}

export const getPosts = async () => {

    try {
        await mongoose.connect(connectionString!, { dbName: "blog" });

        const r = await Post.find().select("_id title body author");

        return r;
    } catch (error) {
        console.log(error);
    }
    finally {
        await mongoose.disconnect();
    }
}