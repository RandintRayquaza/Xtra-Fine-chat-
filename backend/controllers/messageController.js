import Conversation from "../models/conversationModel.js";
import {Message} from "../models/messageModel.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id;   // ✅ FIX
    const receiverId = req.params.id;
    const { message } = req.body;

    console.log("senderId:", senderId);
    console.log("receiverId:", receiverId);

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    gotConversation.messages.push(newMessage._id);
    await gotConversation.save();

    return res.status(201).json({ newMessage });
  } catch (error) {
    console.error("sendMessage error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const receiverId = req.params.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    return res.status(200).json(conversation?.messages || []);
  } catch (error) {
    console.error("getMessage error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
