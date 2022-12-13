"use strict";

var _app = _interopRequireDefault(require("./app.js"));
require("./database.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_app.default.listen(_app.default.get('port'), () => {
  console.log('Server on port', _app.default.get('port'));
});