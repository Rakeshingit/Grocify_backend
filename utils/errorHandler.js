export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// Detailed error report in the development
const sendErrorDev = (err, res) => {
  res.status(err.statusCode || 500).json({
    success: false,
    status: err.status || "Error",
    message: err.message,
    error: err,
    stack: err.stack, //Full stack trace in Dev
  });
};

//Safe error in production
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      success: false,
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR ❌", err); //Internal logging for unknown/programming errors
    res.status(500).json({
      status: "Error",
      message: "Something went wrong!",
    });
  }
};

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res);
  } else {
    // If the env variable is not set, default is development response
    sendErrorDev(err, res);
  }
};
