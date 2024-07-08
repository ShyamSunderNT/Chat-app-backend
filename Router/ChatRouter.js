import express from "express"
import { authorization } from "../middleware/authorization.js"
import error from '../middleware/Error.js'
import { addToGroup,  createGroup,  getChat, postChat, removeFromGroup, renameGroup } from "../Controller/chatController.js";

const router = express.Router();

router.post('/',authorization,error(postChat))
router.get('/',authorization,error(getChat))

router.post('/group',authorization,error(createGroup))
router.post('/rename',authorization,error(renameGroup))

router.post('/groupremove',authorization,error(removeFromGroup))
router.post('/groupadd',authorization,error(addToGroup))






export default router