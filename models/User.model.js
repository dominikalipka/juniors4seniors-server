const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    role: {
      type: String,
      default: "user",
    },
    seniorsList: [{ type: Schema.Types.ObjectId, ref: "Senior" }],
  },

  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
