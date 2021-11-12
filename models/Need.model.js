const { Schema, model } = require("mongoose");

const needSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    senior: {
      type: Schema.Types.ObjectId,
      ref: "Senior",
    },
  },
  {
    timestamps: true,
  }
);

const Need = model("Need", needSchema);

module.exports = Need;
