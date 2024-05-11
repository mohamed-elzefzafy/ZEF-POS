import mongoose from "mongoose";

const BillSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerPhoneNumber : {type:String , required:true},
  totalPrice: { type: Number, required: true },
  tax: { type: Number},
  subTotal: { type: Number},
  paymentMode : {type:String , required:true , enum :["cash", "credit"], default : "cash"},
  cartItems : {type:Array , required:true}
}, {timestamps : true});

const BillModel = mongoose.model("Bill", BillSchema);

export default BillModel;
