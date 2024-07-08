import jwt from "jsonwebtoken";

// Generate Token by User ID
export const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWt_SECRET_KEY, {
    expiresIn: "48h",
  });
  return token;
};

// Verify Token and return User ID

export const getUserIdFromToken = (token) => {
  const decodedToken = jwt.verify(token, process.env.JWt_SECRET_KEY);
  return decodedToken.userId;
};
