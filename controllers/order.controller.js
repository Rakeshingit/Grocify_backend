import express from "express";
import { errorResponse } from "../utils/response.js";

const handlePostOrder = (req, res) => {
  errorResponse(res, "Coming soon.", 500, null);
};

const handleGetAllOrders = (req, res) => {
  errorResponse(res, "Coming soon.", 500, null);
};

// Admin

const handlePatchOrder = (req, res) => {
  errorResponse(res, "Coming soon.", 500, null);
};

const handleGetOrders = async (req, res) => {
  errorResponse(res, "Coming soon.", 500, null);
};

export { handlePostOrder, handleGetOrders, handleGetAllOrders, handlePatchOrder };
