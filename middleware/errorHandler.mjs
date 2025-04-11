export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: "An unexpected error occurred." });
};