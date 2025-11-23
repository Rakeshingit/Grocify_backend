import User from "../../models/user.model.js";
import { errorResponse, successResponse } from "../../utils/response.js";
import { addressModel } from "../../models/address.model.js";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/errorHandler.js";

const saltRounds = Number(process.env.SALT_ROUNDS);

const handleGetCustomerProfile = async (req, res) => {
  const userEmail = req.user.userEmail;

  const profile = await User.findOne({ email: userEmail }).select("-password -_id");
  successResponse(res, profile, undefined, 200);
};

const handlePatchCustomerProfile = async (req, res) => {
  const userEmail = req.user.userEmail;
  await User.findOne({ email: userEmail }).updateOne(req.body);
  successResponse(res, null, "Profile updated successfully.");
  // errorResponse(res, "Coming soon.", 500, null);
};

const handlePatchCustomerPassword = async (req, res) => {
  const userEmail = req.user.userEmail;
  const user = await User.findOne({ email: userEmail });

  const { oldPassword, newPassword, confirmPassword } = req.body;
  const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
  if (!isOldPasswordCorrect) throw new AppError("Old password incorrect, please retry with the correctt password", 400);

  if (newPassword !== confirmPassword) throw new AppError("New password and Confirm password do not match", 400);

  const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
  await User.updateOne({ email: userEmail }, { password: hashedNewPassword });

  successResponse(res, null, "Password updated successfully.", 200);
};

const handleGetCustomerAddresses = async (req, res) => {
  const { _id: custId } = await User.findOne({ email: req.user.userEmail }).select("_id");
  const addrs = await addressModel.find({ custId: custId });
  successResponse(res, addrs, "Address fetched successfully.", 200);
};

const handlePostCustomerAddresses = async (req, res) => {
  const address = req.body;

  const { _id: custId } = await User.findOne({ email: req.user.userEmail }).select("_id");
  address.custId = custId;

  const createAddress = new addressModel(address);
  const isSaved = await createAddress.save();
  if (isSaved) successResponse(res, null, "Address created.", 201);
  else errorResponse(res, "Could not create address.", 500);
};

const handlePatchCustomerAddresses = async (req, res) => {
  const addrId = req.params.id;
  console.log(addrId);
  const addrUpdate = req.body;
  await addressModel.findById(addrId).updateOne(addrUpdate);
  successResponse(res, null, "Address updated successfully.", 200);
};

const handleDeleteCustomerAddresses = async (req, res) => {
  await addressModel.findByIdAndDelete(req.params.id);
  successResponse(res, null, "Address deleted successfully.", 200);
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
