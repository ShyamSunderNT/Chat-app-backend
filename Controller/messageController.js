import Chat from "../Models/chat.js";
import Message from "../Models/message.js";

export const createMessage = async (req, res) => {
	try {
	  const { message, chatId } = req.body;
	  if (!message || !chatId) {
		return res.status(400).json({ message: "Message or chatId not provided" });
	  }
  
	  const newMessage = await Message.create({
		sender: req.user._id,
		message: message,
		chat: chatId,
	  });
  
	  await Chat.findByIdAndUpdate(chatId, {
		latestMessage: newMessage._id,
	  });
  
	  const fullMessage = await Message.findById(newMessage._id)
		.populate("sender", "-password")
		.populate({
		  path: "chat",
		  populate: { path: "users", select: "-password" },
		});
  
	  return res.status(201).json({ data: fullMessage });
	} catch (error) {
	  console.error('Error creating message:', error);
	  res.status(500).json({ message: 'Failed to create message. Please try again.' });
	}
  };

  export const allMessage = async (req, res) => {
	try {
	  const chatId = req.params.chatId;
	  const messages = await Message.find({ chat: chatId })
		.populate("sender", "-password")
		.populate("chat");
  
	  return res.status(200).json({ data: messages });
	} catch (error) {
	  console.error('Error fetching messages:', error);
	  res.status(500).json({ message: 'Failed to fetch messages. Please try again.' });
	}
  };



