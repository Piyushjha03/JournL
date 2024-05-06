import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { getUser } from "./users.model.js";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Missing userName Field"],
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, "Missing firstName Field"],
      minlength: 1,
      maxLength: [50, "firstName cannot be more than 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Missing lastName Field"],
      minlength: 1,
      maxLength: [50, "lastName cannot be more than 50 characters"],
    },
    password: {
      type: String,
      required: [true, "Missing password Field"],
      minlength: [8, "password length should be 8 characters atleast"],
    },
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/dhxgnzie8/image/upload/v1714955633/JournL/nvkzkysvqvidgisxj1f9.jpg",
    },
    followers: {
      type: [],
      default: [],
    },
    following: {
      type: [],
      default: [],
    },
    Tracks: {
      type: [],
      default: [],
    },
  },
  { timeStamps: true }
);

// encrypting the password
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//login validation....

userSchema.statics.login = async function (userDetails) {
  const userInfo = await getUser(userDetails.userName);

  if (userInfo) {
    const isValid = await bcrypt.compare(
      userDetails.password,
      userInfo.password
    );
    if (isValid) {
      return userInfo;
    }
    throw Error("UserName And Password Do not Match");
  }
  throw Error("UserName Does Not Exist");
};

const User = mongoose.model("User", userSchema);

export default User;
