import type e from "express";
import User from "../models/user.js";
import type { User as UserType } from "../types/userTypes.js";
import bcrypt from "bcrypt";

export const registerController = async (req: e.Request, res: e.Response) => {
  try {
    // read the request body
    const data = req.body;

    const { name, email, phone, password }: UserType = data;

    const hashPassword = await bcrypt.hash(password, 10);

    // create a new user in the database
    const user = await User.create({
      name,
      email,
      phone,
      password: hashPassword,
    });

    // send a response back to the client
    res.status(201).json({ message: "User Created", user });
  } catch (error: any) {
    console.error(error);
    console.log("ERROR FROM REGISTER CONTROLLER", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const loginController = async (req: e.Request, res: e.Response) => {
  try {
    // read the request body
    const data = req.body;

    // match the user with the email and password in the database
    const user = await User.findOne({ email: data.email });

    // send a response back to the client
    res.status(200).json({ message: "Login successful", user });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
