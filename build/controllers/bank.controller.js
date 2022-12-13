"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.associateBelvoData = exports.accessToken = void 0;
var _belvo = _interopRequireDefault(require("belvo"));
var _User = _interopRequireDefault(require("../models/User.js"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const client = new _belvo.default(process.env.BELVO_KEY_ID, process.env.BELVO_KEY_PASSWORD, process.env.BELVO_ENVIRONMENT);
const accessToken = async (req, res) => {
  try {
    await client.connect();
    const access_token = await client.widgetToken.create();
    res.json(access_token);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};
exports.accessToken = accessToken;
const associateBelvoData = async (req, res) => {
  const userId = getUserID(req);
  const updatedUser = await _User.default.findByIdAndUpdate(userId, req.body, {
    new: true
  });
  res.status(204).json(updatedUser);
};
exports.associateBelvoData = associateBelvoData;
const getUserID = req => {
  const token = req.headers["x-access-token"];
  const decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};