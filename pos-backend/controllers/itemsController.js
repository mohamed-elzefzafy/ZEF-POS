import ItemsModel from "../models/itemModel.js";
import asyncHandler from './../middlewares/asyncHandler.js';
import { cloudinaryRemoveImage, cloudinaryUploadImage } from './../utils/cloudinary.js';
import customErrorClass from "../utils/customErrorClass.js";


 /**---------------------------------------
 * @desc    addItem
 * @route   /api/v1/items/create-item
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 export const addItem = asyncHandler(async (req , res) => {
  const item = await ItemsModel.create({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
  })

// upload image photo to cloudinary 
// start 
if (req.file) {

  // upload the photo to cloudinary
  const result = await cloudinaryUploadImage(req.file.path);

  //  Change the image field in the DB
  item.image = {
    url : result.secure_url,
    public_id : result.public_id
  }
  await item.save();
}

//finish

  res.status(201).json({item ,meassage : "item added successfully"})
 });

 /**---------------------------------------
 * @desc    get Items
 * @route   /api/v1/items
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 export const getItems = asyncHandler(async (req , res) => {
  const items = await ItemsModel.find({}).populate("category" , "_id , name image").sort({createdAt : "desc"});
  res.status(201).json(items)
 });


  /**---------------------------------------
 * @desc    get One Item
 * @route   /api/v1/items/get-one-item/:id
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 export const getOneItem = asyncHandler(async (req , res) => {
  const item = await ItemsModel.findById(req.params.id).populate("category" , "_id , name image");
  if (!item) {
    return next(customErrorClass.create(`not found item for id ${req.params.id}` , 404))  
  }

  res.status(200).json(item)
 });
  
  

  /**---------------------------------------
 * @desc    delete Item
 * @route   /api/v1/items/delete-items/:id
 * @method  DELETE
 * @access  public 
 ----------------------------------------*/
 export const deleteItem = asyncHandler(async (req , res , next) => {
  const item = await ItemsModel.findById(req.params.id);
  if (!item) {
    return next(customErrorClass.create(`not found item for id ${req.params.id}` , 404))  
  }

  await cloudinaryRemoveImage(item.image.public_id);
  await item.deleteOne();
  res.status(200).json("item deleted successfully")
 });
  



  /**---------------------------------------
 * @desc    update Item
 * @route   /api/v1/items/update-item/:id
 * @method  PUT
 * @access  public 
 ----------------------------------------*/
 export const updateItem = asyncHandler(async (req , res) => {
  const item = await ItemsModel.findById(req.params.id);
  if (!item) {
    return next(customErrorClass.create(`not found item for id ${req.params.id}` , 404))  
  }
  const updatedItem = await ItemsModel.findByIdAndUpdate(req.params.id ,{
    name: req.body.name || item.name,
    price: req.body.price || item.price,
    category: req.body.category || item.category,
    countInStock: req.body.countInStock || item.countInStock,
  } , {new : true})

// upload image photo to cloudinary 
// start 
// if (req.file) {

//   // upload the photo to cloudinary
//   const result = await cloudinaryUploadImage(req.file.path);

//   //  Change the image field in the DB
//   item.image = {
//     url : result.secure_url,
//     public_Id : result.public_id
//   }
//   await item.save();
// }

//finish



if (req.file ) {
  if (updatedItem?.image?.public_id) {
    await cloudinaryRemoveImage(updatedItem?.image?.public_id)
  }  
// upload the photo to cloudinary
const result = await cloudinaryUploadImage(req.file.path);

//  Change the profilePhoto field in the DB
updatedItem.image = {
  url : result.secure_url,
  public_id : result.public_id
}

await updatedItem.save();
}


  res.status(201).json({item , message : "item updated successfully"})
 });
