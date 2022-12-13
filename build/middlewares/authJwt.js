"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _User = _interopRequireDefault(require("../models/User.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({
      message: "No token provided"
    });
    const decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
    const user = await _User.default.findById(decoded.id, {
      password: 0
    });
    if (!user) return res.status(404).json({
      message: "No user found"
    });
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }
};
exports.verifyToken = verifyToken;