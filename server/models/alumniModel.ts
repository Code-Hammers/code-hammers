import mongoose, { Schema } from "mongoose";
import { IAlumni } from "../types/alumni";

const alumniSchema = new Schema<IAlumni>(
  {
    company: { type: String, trim: true },
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    linkedIn: { type: String, trim: true },
    campus: { type: String, trim: true },
    cohort: {
      type: Schema.Types.Mixed, //TODO Better way to do this? Spreadhsete has strings and numbers...
      required: true,
      validate: {
        validator: function (v: string | number) {
          return typeof v === "string" || typeof v === "number";
        },
        message: (props: { value: string | number }) =>
          `${props.value} is not a valid number or string!`,
      },
    },
    jobTitle: { type: String, trim: true },
    industry: { type: String, trim: true, default: "" },
    cities: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

const Alumni = mongoose.model<IAlumni>("Alumni", alumniSchema);

export default Alumni;
