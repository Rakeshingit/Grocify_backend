import express from "express";
import { errorResponse, successResponse } from "../utils/response.js";
import product from "../models/product.model.js";
import { AppError } from "../utils/errorHandler.js";
import { indianTime } from "../utils/date_formatter.js";
import { orderModel } from "../models/orders/order.model.js";

const handlePostOrder = async (req, res) => {
  const data = req.body;

  const userId = req.user.userId;
  const addressId = data.deliveryAddress;
  const itemIds = data.orderItems.map((item) => item.itemId);
  const itemQts = data.orderItems.map((item) => item.quantity);
  let finalAmount = 0;

  //Batch fetching products with selected fields
  const itemDetails = await product.find({ _id: { $in: itemIds } }, "_id name price stock").lean();

  // Stock validation
  for (let i = 0; i < itemQts.length; i++) {
    if (!itemDetails[i].stock >= itemQts[i]) return new AppError("Ordered quantity unavailable!", 422);
  }

  // Final preparation of orderItemDetails
  Object.values(itemDetails).forEach((product, index) => {
    product.quantity = itemQts[index];
    product.totalAmount = product.price * itemQts[index];

    // Final amount for the parent document
    finalAmount += product.totalAmount;

    // Deleting unwanted field
    delete product.stock;
  });

  // Expected deliver date and time
  const today = Date.now();
  const expectedDeliveryDate = today + 24 * 60 * 60 * 1000;
  // console.log(nextDay);
  // console.log(indianTime(nextDayTimestamp));

  const newOrder = {
    customerId: userId,
    orderItemsDetails: itemDetails,
    finalAmount,
    expectedDeliveryDate,
    deliveryAddress: addressId,
  };
  console.log(newOrder);

  const order = new orderModel(newOrder);
  const isSaved = await order.save();

  successResponse(res, null, "Order created successfully.", 200);
};

const handleGetUserOrders = async (req, res) => {
  const allOrders = await orderModel.find({ customerId: req.user.userId });
  successResponse(res, allOrders, "Fetched all orders of the users.", 200);
};

// Admin
const handlePatchOrder = (req, res) => {
  errorResponse(res, "Coming soon.", 500, null);
};

const handleGetAllOrders = async (req, res) => {
  errorResponse(res, "Coming soon.", 500, null);
};

export { handlePostOrder, handleGetAllOrders, handleGetUserOrders, handlePatchOrder };
