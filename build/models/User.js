"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = require("mongoose");
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  link: {
    type: String,
    required: false
  },
  institution: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});
userSchema.statics.encryptPassword = async password => {
  const salt = await _bcryptjs.default.genSalt(10);
  return await _bcryptjs.default.hash(password, salt);
};
userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await _bcryptjs.default.compare(password, receivedPassword);
};
var _default = (0, _mongoose.model)('User', userSchema);
exports.default = _default;