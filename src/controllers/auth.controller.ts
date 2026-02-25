import type { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../lib/s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import path from "path"; // to handle file extensions
import { randomUUID } from "crypto"; // generate unique IDs

export const signup = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password)
    return res.status(400).json({ message: "All fields are required" });
  try {
    //hash password
    const user = await User.findOne({ email: email });
    if (user) return res.status(400).json({ message: "Email already exists!" });
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashPassword,
    });
    if (newUser) {
      generateToken(newUser._id.toString(), res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "Invalid User Data!" });
    }
  } catch (error) {
    console.log("Error in signup controller : ", (error as Error).message);
    return res.status(500).json({ message: "Internal Server Errror" });
  }
};
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials!" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials!" });
    generateToken(user._id.toString(), res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in Login Controller", (error as Error).message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    console.log("Error in Logout Controller", (error as Error).message);
  }
  res.send("logout route");
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const ext = path.extname(req.file!.originalname); // e.g., ".png" or ".jpg"

    // 2️⃣ Generate unique filename
    const uniqueFileName = `${randomUUID()}${ext}`;
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME!, // your bucket name
        Key: uniqueFileName,
        Body: req.file!.buffer,
        ContentType: req.file!.mimetype,
      }),
    );
    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME!,
      Key: uniqueFileName,
    });

    const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 600 });

    // 5️⃣ Return presigned URL to frontend
    res.json({
      message: "file uploaded successsfully",
      filename: uniqueFileName,
      url: presignedUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
};
