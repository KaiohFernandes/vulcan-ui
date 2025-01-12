import React from 'react';
import './PrettyJson.scss';

function PrettyJson(_ref) {
  var json = _ref.json,
      label = _ref.label,
      style = _ref.style;

  if (typeof json !== 'undefined') {
    return React.createElement("pre", {
      className: "vui-PrettyJson",
      style: style,
      dangerouslySetInnerHTML: {
        __html: syntaxHighlight(json, label)
      }
    });
  } else {
    console.error('[PrettyJson]: Property "json" not set');
    return React.createElement(React.Fragment, null);
  }
}

export default PrettyJson;

function syntaxHighlight(json, label) {
  if (typeof json != 'string') {
    json = JSON.stringify(json, undefined, 2) || 'Function';
  }

  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return (label ? label + ': ' : '') + json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
    var cls = 'number';

    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }

    return "<span class=\"".concat(cls, "\">").concat(match, "</span>");
  });
}