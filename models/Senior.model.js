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
    needsList: [{ type: Schema.Types.ObjectId, ref: "Need" }],
  },

  {
    timestamps: true,
  }
);

const Senior = model("Senior", seniorSchema);

module.exports = Senior;
