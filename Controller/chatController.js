import Chat from "../Models/chat.js";

export const postChat = async (req, res) => {
	try {
	  const { userId } = req.body;
	  if (!userId) {
		return res.status(400).json({ message: "userId not provided" });
	  }
	  
	  const existingChat = await Chat.find({
		isGroupChat: false,
		$and: [
		  { users: { $elemMatch: { $eq: req.user._id } } },
		  { users: { $elemMatch: { $eq: userId } } },
		],
	  })
		.populate("users", "-password")
		.populate({
		  path: "latestMessage",
		  populate: {
			path: "sender",
			select: "-password",
		  },
		})
		.populate("groupAdmin", "-password");
  
	  if (existingChat.length === 0) {
		const chatName = "Messenger";
		const isGroupChat = false;
		const users = [req.user._id, userId];
		const chat = await Chat.create({
		  chatName,
		  isGroupChat,
		  users,
		});
		const chatAll = await Chat.findOne({ _id: chat._id }).populate(
		  "users",
		  "-password"
		);
		return res.status(200).json({ data: chatAll });
	  } else {
		const chat = existingChat[0];
		return res.status(200).json({ data: chat });
	  }
	} catch (error) {
	  console.error('Error posting chat:', error);
	  res.status(500).json({ message: 'Failed to post chat. Please try again.' });
	}
  };

export const getChat = async (req, res) => {
	try {
	  const chat = await Chat.find({
		users: { $elemMatch: { $eq: req.user._id } },
	  })
		.sort({ updatedAt: -1 })
		.populate("users", "-password")
		.populate({
		  path: "latestMessage",
		  populate: {
			path: "sender",
			select: "-password",
		  },
		})
		.populate("groupAdmin", "-password");
	  return res.status(200).json({ data: chat });
	} catch (error) {
	  console.error('Error fetching chat:', error);
	  res.status(500).json({ message: 'Failed to fetch chat. Please try again.' });
	}
  };

export const createGroup = async (req, res) => {
	try {
	  if (!req.body.users || !req.body.name) {
		return res.status(400).json({ message: "users and name not provided" });
	  }
	  
	  const users = req.body.users;
	  if (users.length < 2) {
		return res.status(400).json({ message: "min 2 users required for group" });
	  }
	  
	  users.push(req.user._id);
	  const groupChat = await Chat.create({
		chatName: req.body.name,
		isGroupChat: true,
		users: users,
		groupAdmin: req.user._id,
	  });
	  const groups = await Chat.findOne({ _id: groupChat._id })
		.populate("users", "-password")
		.populate("groupAdmin", "-password");
	  res.status(200).json({ data: groups });
	} catch (error) {
	  console.error('Error creating group:', error);
	  res.status(500).json({ message: 'Failed to create group. Please try again.' });
	}
  };

export const renameGroup = async (req, res) => {
	try {
	  const { name, chatId } = req.body;
	  if (!name || !chatId) {
		return res.status(400).json({ message: "name and chatId not provided" });
	  }
	  
	  const chat = await Chat.findByIdAndUpdate(
		chatId,
		{ chatName: name },
		{ new: true }
	  )
		.populate("users", "-password")
		.populate("groupAdmin", "-password");
		
	  if (!chat) {
		return res.status(404).json({ message: "chat not found" });
	  } else {
		return res.status(200).json({ data: chat });
	  }
	} catch (error) {
	  console.error('Error renaming group:', error);
	  res.status(500).json({ message: 'Failed to rename group. Please try again.' });
	}
  };

export const removeFromGroup = async (req, res) => {
	try {
	  const { chatId, userId } = req.body;
	  if (!chatId || !userId) {
		return res.status(400).json({ message: "chatId and userId not provided" });
	  }
	  
	  const chat = await Chat.findByIdAndUpdate(
		chatId,
		{ $pull: { users: userId } },
		{ new: true }
	  )
		.populate("users", "-password")
		.populate("groupAdmin", "-password");
		
	  if (!chat) {
		return res.status(404).json({ message: "chat not found" });
	  } else {
		return res.status(200).json({ data: chat });
	  }
	} catch (error) {
	  console.error('Error removing user from group:', error);
	  res.status(500).json({ message: 'Failed to remove user from group. Please try again.' });
	}
  };
export const addToGroup = async (req, res) => {
	try {
	  const { chatId, userId } = req.body;
	  if (!chatId || !userId) {
		return res.status(400).json({ message: "chatId and userId not provided" });
	  }
	  
	  const chat = await Chat.findByIdAndUpdate(
		chatId,
		{ $push: { users: userId } },
		{ new: true }
	  )
		.populate("users", "-password")
		.populate("groupAdmin", "-password");
		
	  if (!chat) {
		return res.status(404).json({ message: "chat not found" });
	  } else {
		return res.status(200).json({ data: chat });
	  }
	} catch (error) {
	  console.error('Error adding user to group:', error);
	  res.status(500).json({ message: 'Failed to add user to group. Please try again.' });
	}
  };
