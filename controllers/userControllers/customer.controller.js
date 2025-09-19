import User from "../../models/user.model.js";
import { errorResponse, successResponse } from "../../utils/response.js";

const handleGetCustomerProfile = async (req, res) => {
  const userEmail = req.user.userEmail;
  const profile = await User.findOne({ userEmail }).select("-userPassword").exec();
  successResponse(res, profile, undefined, 500);
};

const handlePatchCustomerProfile = async (req, res) => {
  errorResponse(res, "Coming soon.", 500, null);
};
const handlePatchCustomerPassword = async (req, res) => {
  errorResponse(res, "Coming soon.", 500, null);
};
const handleGetCustomerAddresses = async (req, res) => {
  errorResponse(res, "Coming soon.", 500, null);
};
const handlePostCustomerAddresses = async (req, res) => {
  errorResponse(res, "Coming soon.", 500, null);
};
const handlePatchCustomerAddresses = async (req, res) => {
  errorResponse(res, "Coming soon.", 500, null);
};
const handleDeleteCustomerAddresses = async (req, res) => {
  errorResponse(res, "Coming soon.", 500, null);
};

export {
  handleGetCustomerProfile,
  handlePatchCustomerProfile,
  handlePatchCustomerPassword,
  handleGetCustomerAddresses,
  handlePostCustomerAddresses,
  handlePatchCustomerAddresses,
  handleDeleteCustomerAddresses,
};
