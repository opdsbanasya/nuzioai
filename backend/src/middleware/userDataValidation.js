import type e from "express";
import type { User } from "../types/userTypes.js";
import validator from "validator";

export const userDataValidationMiddleware = (
  req: e.Request,
  res: e.Response,
  next: e.NextFunction,
) => {
  try {
    // Read Data
    const userData = req.body;

    let { name, email, phone, password }: User = userData;

    // validate name
    if (name) {
      name = name.trim();
      if (!validator.isLength(name, { min: 3, max: 100 })) {
        return res
          .status(400)
          .json({ message: "Name must be between 3 and 100 characters" });
      }
      if (!validator.isAlpha(name, "en-US", { ignore: " " })) {
        return res
          .status(400)
          .json({ message: "Name must contain only letters and spaces" });
      }
    }

    // validate email
    if (email) {
      email = email.trim();
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
    }

    // validate phone
    if (phone) {
      phone = phone.trim();
      if (!validator.isMobilePhone(phone, "en-IN")) {
        return res.status(400).json({ message: "Invalid phone number format" });
      }
    }

    // validate password
    if (password) {
      if (!validator.isLength(password, { min: 10, max: 100 })) {
        return res
          .status(400)
          .json({ message: "Password must be between 10 and 100 characters" });
      }
      if (
        !validator.isStrongPassword(password, {
          minLength: 10,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        return res
          .status(400)
          .json({ message: "Password must be a strong password" });
      }
    }

    req.body = { name, email, phone, password };
    next();
  } catch (error: any) {
    console.log("ERROR FROM USER DATA VALIDATION", error.message);
    return res.status(400).json({ message: error.message });
  }
};
