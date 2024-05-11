import mongoose from "mongoose";


const ItemsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  category : {type : mongoose.Schema.Types.ObjectId , ref : "Category", required : true,},
  image : {type : Object },
}, {timestamps : true});

const ItemsModel = mongoose.model("Item", ItemsSchema);

export default ItemsModel;

