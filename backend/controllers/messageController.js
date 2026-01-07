import Conversation from "../models/conversationModel.js";
import {Message} from "../models/messageModel.js";
import { io, getReceiverSocketId } from "../socket/socket.js";


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

    // 🔥 SOCKET PART (THIS WAS MISSING)
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
      console.log("📨 Message emitted to receiver");
    } else {
      console.log("⚠️ Receiver offline");
    }

    return res.status(201).json({ newMessage });
  } catch (error) {
    console.error("sendMessage error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getMessage = async (req, res) => {
   console.log("🔥 getMessage CONTROLLER HIT");
  try {
    const senderId = req.user._id;
    const receiverId = req.params.userId;
console.log("params:", req.params);
    console.log("user:", req.user?._id);
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    return res.status(200).json({
      messages: conversation?.messages || [],
    });
  } catch (error) {
    console.error("getMessage error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
