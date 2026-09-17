export function errorHandler(err, req, res, next) {
  console.error(
    JSON.stringify({
      method: req.method,
      path: req.originalUrl,
      statusCode: err.statusCode || 500,
      error: err.message,
    })
  );

  const statusCode = err.statusCode || 500;
  const code = err.code || 'INTERNAL_SERVER_ERROR';

  res.status(statusCode).json({
    error: {
      message: err.message || 'Internal server error',
      code,
    },
  });
}