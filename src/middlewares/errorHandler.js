const errorHandler = (error, req, res) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    error: error.name,
    message: error.message,
  });
};

module.exports = errorHandler;
