import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let headers = req.headers["authorization"];

  if (!headers) {
    return res.status(401).json({
      status: "failed to get authorization",
      message: "must login first",
    });
  }
  const token = headers.split(" ")[1];
  try {
    jwt.verify(token, "ahmedmoghazy");
    next();
  } catch (err) {
    res
      .status(401)
      .json({
        status: "failed to get authorization must login again !",
        message: err.message,
      });
  }
};
