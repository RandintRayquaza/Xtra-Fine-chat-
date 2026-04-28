import Conversation from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import {getIO, getReceiverSocketId} from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.userId;
    const { message } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    conversation.messages.push(newMessage._id);
    await conversation.save();

    // Real-time emit
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      const io = getIO();
      io.to(receiverSocketId).emit("receiveMessage", newMessage);
    }

    return res.status(201).json({ newMessage });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.userId;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    return res.status(200).json({
      messages: conversation?.messages || [],
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
