import { Server } from "socket.io";
import server from './../../../index.js';
import Message from './../../../database/model/message.model.js';
import { connect } from 'mongoose';

export const chat = async () => {
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:3000", "http://127.0.0.1:5500"],
        },
    });
    io.on("connection", async (socket) => {
        socket.on("message", async (message) => {
            const data = await Message.create({message})
            socket.emit("received", data)
        })
        socket.on('loading', async () => {
            const data = await Message.find()
            socket.emit("display", data)
        })

    });
}