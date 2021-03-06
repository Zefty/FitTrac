// "use strict";

// var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

// Object.defineProperty(exports, "__esModule", {
//   value: true
// });
// exports.default = void 0;

// var _react = _interopRequireDefault(require("react"));

// var _SvgIcon = _interopRequireDefault(require("@material-ui/core/SvgIcon"));

// var _ref = _react.default.createElement("path", {
//   d: "M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"
// });

// function LightbulbOutline(props) {
//   return _react.default.createElement(_SvgIcon.default, props, _ref);
// }

// LightbulbOutline.muiName = 'SvgIcon';
// var _default = LightbulbOutline;
// exports.default = _default;

import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function LightbulbOutline(props) {
  return (
    <SvgIcon {...props}>
      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
    </SvgIcon>
  );
}

LightbulbOutline.muiName = 'SvgIcon';

export default LightbulbOutline;