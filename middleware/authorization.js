import { getUserIdFromToken } from "../utils/jwtwebToken.js";
import User from "../Models/User.js";
import Error from "./Error.js";


export const authorization = Error(async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(404).send({ message: "Token not found" });
      }
      
      const userId = getUserIdFromToken(token);
      if (!userId) {
        throw new Error("Invalid token or user not found");
      }
      
      req.user = await User.findById(userId).select("-password");
      
      next();
    } catch (err) {
      next(err); // Pass the error to Express's error handling middleware
    }
  });