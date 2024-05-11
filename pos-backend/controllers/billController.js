import asyncHandler from "../middlewares/asyncHandler.js";
import BillModel from "../models/billModal.js";
import customErrorClass from "../utils/customErrorClass.js";
import ItemsModel from './../models/itemModel.js';



 /**---------------------------------------
 * @desc    create Bill
 * @route   /api/v1/bills/create-bill
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 export const createBill = asyncHandler(async (req , res , next) => {
let bill = await BillModel.create(req.body);
bill.tax = bill.totalPrice * 10/100
bill.subTotal = Number(bill.totalPrice + bill.tax);

await bill.save();
const billIds = req.body.cartItems.map(bill => bill._id) 
console.log(billIds);
const items = await ItemsModel.find({ _id: { $in: billIds } });
for (const item of items) {
  for (const billItem of bill.cartItems) {
    if (billItem._id.toString() === item._id.toString()) {
      if (item.countInStock < +billItem.qty) {
        if (item.countInStock <= 0) {
          bill.cartItems =  bill.cartItems.filter(bill => bill._id.toString() !== item._id.toString())
        } else {
          billItem.qty = item.countInStock;
          item.countInStock -= +billItem.qty;
        }
      
      } else {
        item.countInStock -= +billItem.qty;
      }
    
    }
    await bill.save();
  }
  await item.save();

}


if (bill.cartItems.length === 0 ) {
await bill.deleteOne();
return next(customErrorClass.create(`No Bill created` , 400))  
}
 
res.status(201).json({bill , message : "Bill created successfully"});
 }); 



  /**---------------------------------------
 * @desc    get All Bills
 * @route   /api/v1/bills
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 export const getAllBills = asyncHandler(async (req , res) => {
  const bills = await BillModel.find({});
  res.status(200).json(bills);
   }); 

  /**---------------------------------------
 * @desc    get All Bills
 * @route   /api/v1/bills/get-one-bill/:id
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 export const getOneBill = asyncHandler(async (req , res , next) => {
  const bill = await BillModel.findById(req.params.id);
  if (!bill) {
    return next(customErrorClass.create(`this Bill not found` , 400))  
  }
  res.status(200).json(bill);
   }); 