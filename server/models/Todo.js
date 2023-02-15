import { Schema } from "mongoose";


export const TodosSchema = new Schema(
  {
    completed: {type: Boolean, default: false},
    // NOTE the default value of a string is usually null or undefined, you shouldn't need this default:false here, BUT you could add in a required:true if its required for a todo to have a description
    description: {type: String, default: false},
    user: {type: String, required: true}
  },
  {timestamps: true, toJSON: { virtuals: true }}
)