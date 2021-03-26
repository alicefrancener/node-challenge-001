const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    status: error.statusCode,
    error: error.name,
    message: error.message,
  });
};

module.exports = errorHandler;
