const { Schema, model } = require("mongoose");

const seniorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    location: {
      type: String,
      required: [true, "Location is required."],
    },
    contact: {
      type: String,
      required: [true, "Contact number is required."],
    },
    image: {
      type: String,
      required: [true, "Image is required."],
    },
    needsList: [{ type: Schema.Types.ObjectId, ref: "Need" }],
    helper: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },

  {
    timestamps: true,
  }
);

const Senior = model("Senior", seniorSchema);

module.exports = Senior;
