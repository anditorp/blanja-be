const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const verifyOpts = {
    expiresIn: 60 * 60 * 24,
    issuer: "Blanja",
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, verifyOpts);
  return token;
};

const generateRefreshToken = (payload) => {
  const verifyOpts = {
    expiresIn: "1 Day",
    issuer: "Blanja",
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, verifyOpts);
  return token;
};

module.exports = {
  generateToken,
  generateRefreshToken,
};
