export const successResponse = (res, data, message = "Success", status = 200) => {
  return res.status(status).json({
    success: true,
    message: message,
    data: data,
  });
};

export const errorResponse = (res, message = "Error", status = 400, errors = null) => {
  if (process.env.NODE_ENV === "production") errors = null;
  return res.status(status).json({
    success: false,
    message,
    errors,
  });
};
