import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/index.js";

export const registerUser = async ({ email, password, name }) => {

  const existing = await User.findOne({ where: { email } });

  if (existing) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
    name
  });

  return user
};

export const loginUser = async ({ email, password }) => {

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return {
    user: {
        id: user.id,
        email: user.email
    }, 
    token
  }
};