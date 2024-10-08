import { connect, model, Schema } from "mongoose";

export async function UserDB() {
  try {
    const client = await connect(process.env.DATABASE_USERS! as string);
    console.log("Connected successfully to MongoDB server");
    return client;
  } catch (err) {
    console.error("Error occurred while connecting to MongoDB:", err);
    throw err;
  }
}

// Define the User schema
const userSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  points: {
    type: Number,
    default: 10,
  },
});

const RecentSearchSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  key: [
    {
      type: String,
    },
  ],
});

export const User = model("User", userSchema);
export const RecentSearch = model("RecentSearch", RecentSearchSchema);
