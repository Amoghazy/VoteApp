import bcrypt from "bcrypt";
import { userSchema } from "../utlis/user.schema.js";
import { User } from "../model/model.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
  try {
    const result = await userSchema.validateAsync(req.body);
    console.log(result.email);
    const isFind = await User.findOne({ email: result.email });

    if (isFind) throw new Error("EMAIL is already registered");

    const hashedPassword = await bcrypt.hash(result.password, 10);

    const user = new User({
      username: result.username,
      email: result.email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json("Registered successfully!");
  } catch (err) {
    res.status(403).json({ message: err.message });
    
  }
};
export const login = async (req, res) => {
  try {
    const result = req.body;

    const isFind = await User.findOne({ email: result.email });
    if (!isFind) throw new Error("this is email not found register first ");
    const passwordMatch = await bcrypt.compare(
      result.password,
      isFind.password
    );
    if (passwordMatch) {
      let token = jwt.sign(
        { email: isFind.email, id: isFind._id },
        "ahmedmoghazy",
        { expiresIn: "5m" }
      );
      res
        .status(200)
        .json({ message: "login success", token, email: isFind.email });
    } else {
      res.status(400).json("Wrong  password !");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
