import { model, Schema, Types } from "mongoose";

const messageSchema = new Schema({
    message: [
        {
            type: String,
            required: true,
            minlength: 1,
            trim: true,
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    sender: {
        type: Types.ObjectId,
        ref: 'User',
        // required: true
    },
    receiver: {
        type: Types.ObjectId,
        ref: 'User',
        // required: true
    },

});

const Message = model('Message', messageSchema);

export default Message