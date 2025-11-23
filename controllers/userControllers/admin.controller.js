import { errorResponse, successResponse } from "../../utils/response.js";
import userModel from "../../models/user.model.js";

const handleGetAllUsers = async (req, res) => {
  const userList = await userModel.find({});
  successResponse(res, userList, "All users fetched successfully.", 200);
};

const handleGetUserById = async (req, res) => {
  const userId = req.params.id;
  const user = await userModel.findById(userId).select("-password");
  successResponse(res, user, "Success", 200);
};

const handlePatchUserStatus = async (req, res) => {
  const userId = req.params.id;
  const user = await userModel.findByIdAndUpdate(userId, req.body);
  successResponse(res, null, "Status updated successfully.", 200);
};

const handleDeleteUser = async (req, res) => {
  const userId = req.params.id;
  const user = await userModel.findByIdAndDelete(userId);
  successResponse(res, null, "User account deleted.", 200);
};

export { handleGetAllUsers, handleGetUserById, handlePatchUserStatus, handleDeleteUser };
