"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = exports.login = void 0;
var _User = _interopRequireDefault(require("../models/User.js"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _belvo = _interopRequireDefault(require("belvo"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const client = new _belvo.default(process.env.BELVO_KEY_ID, process.env.BELVO_KEY_PASSWORD, process.env.BELVO_ENVIRONMENT);
const signUp = async (req, res) => {
  const {
    name,
    email,
    password
  } = req.body;
  const newUser = new _User.default({
    name,
    email,
    password: await _User.default.encryptPassword(password)
  });
  const savedUser = await newUser.save();
  const token = _jsonwebtoken.default.sign({
    id: savedUser._id
  }, process.env.JWT_SECRET);
  res.status(200).json({
    token
  });
};
exports.signUp = signUp;
const login = async (req, res) => {
  const userFound = await _User.default.findOne({
    email: req.body.email
  });
  if (!userFound) return res.status(400).json({
    message: "Invalid Credentials"
  });
  const matchPassword = await _User.default.comparePassword(req.body.password, userFound.password);
  if (!matchPassword) return res.status(400).json({
    message: "Invalid Credentials"
  });
  const token = _jsonwebtoken.default.sign({
    id: userFound._id
  }, process.env.JWT_SECRET);
  res.json({
    token
  });
};
exports.login = login;