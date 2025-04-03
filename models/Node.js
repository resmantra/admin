import mongoose from "mongoose";
const pathSeparator = "//";

const nodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Node",
  },
  path: {
    type: String,
    required: true,
  },
  suggested: Boolean,
  searchable: { type: Boolean, required: true },
});

nodeSchema.pre("save", async function (next) {
  if (this.isModified("parent") || this.isNew) {
    const parent = await this.model("Node").findOne(
      { _id: this.parent },
      "path"
    );
    if (parent) {
      this.path = `${parent.path}${pathSeparator}${this.name}`;
    } else {
      this.path = `${pathSeparator}${this.name}`;
    }
  }
  next();
});

const Node = mongoose.model("Node", nodeSchema);

export default Node;
