"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_mongoose.default.connect(process.env.DBURL).then(db => console.log('DB is connected')).catch(error => console.log(error));