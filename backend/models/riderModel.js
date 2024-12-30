import mongoose from "mongoose";


const riderSchema = new mongoose.Schema({
  orderId: {type: String, default: ""},
  name: {type:String, required:true},
  phone: {type:Number, required:true},
  location: {type:Object, default: {lat: "", long: ""}}
})

const riderModel = mongoose.models.rider || mongoose.model("rider", riderSchema)

export default riderModel;