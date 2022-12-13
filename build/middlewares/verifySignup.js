"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkDuplicatedEmail = void 0;
var _User = _interopRequireDefault(require("../models/User.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const checkDuplicatedEmail = async (req, res, next) => {
  const userFound = await _User.default.findOne({
    email: req.body.email
  });
  if (userFound) return res.status(400).json({
    message: "This user already exists, try to login"
  });
  next();
};
exports.checkDuplicatedEmail = checkDuplicatedEmail;