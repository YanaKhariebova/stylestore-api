const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (statusCode === 500) {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? "Interner Serverfehler"
        : err.message || "Fehler bei der Anfrage",
  });
};

export default errorHandler;
