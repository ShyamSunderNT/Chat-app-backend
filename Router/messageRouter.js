import express from "express";
import { authorization } from "../middleware/authorization.js";
import error from "../middleware/Error.js";
import { allMessage, createMessage } from "../Controller/messageController.js";


const router = express.Router();

router.post("/", authorization, error(createMessage));
router.get("/:chatId", authorization, error(allMessage));

export default router;
