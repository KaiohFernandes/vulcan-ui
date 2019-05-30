import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _isEqual from 'lodash.isequal';
import React, { useEffect, useRef, useState } from 'react';
import { Button, ProgressBar, Spinner, TextField, usePortal } from '../../index';
import './Autocomplete.scss';
import AutocompleteDataSource from './AutocompleteDataSource';
import AutocompleteResult from './AutocompleteResult';

var Autocomplete = function Autocomplete(_ref) {
  var autocompleteConfig = _ref.autocompleteConfig,
      onChange = _ref.onChange,
      defaultValue = _ref.value,
      onItemSelect = _ref.onItemSelect,
      props = _objectWithoutProperties(_ref, ["autocompleteConfig", "onChange", "value", "onItemSelect"]);

  autocompleteConfig.emptyLabel = autocompleteConfig.emptyLabel || 'No items found';
  var resultRef = useRef(null);

  var _usePortal$hook = usePortal.hook(),
      _usePortal$hook2 = _slicedToArray(_usePortal$hook, 3),
      resultTargetRef = _usePortal$hook2[0],
      showResult = _usePortal$hook2[1],
      setShowResult = _usePortal$hook2[2];

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isLoading = _useState2[0],
      setIsLoading = _useState2[1];

  var _useState3 = useState(defaultValue),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  var _useState5 = useState(defaultValue),
      _useState6 = _slicedToArray(_useState5, 2),
      selected = _useState6[0],
      setSelected = _useState6[1];

  var _useState7 = useState(null),
      _useState8 = _slicedToArray(_useState7, 2),
      result = _useState8[0],
      setResult = _useState8[1];

  var getResultIndex = useRef(0);
  var getResultTimeout = useRef(null);

  var _useState9 = useState(0),
      _useState10 = _slicedToArray(_useState9, 2),
      page = _useState10[0],
      setPage = _useState10[1];

  var _useState11 = useState(false),
      _useState12 = _slicedToArray(_useState11, 2),
      isScrollEnd = _useState12[0],
      setIsScrollEnd = _useState12[1];

  var getResult = function getResult(value, page) {
    if (page === 0) {
      setResult(null);
    }

    setShowResult(true);
    setIsLoading(true);
    setIsScrollEnd(false);
    var getResultIndexCurrent = ++getResultIndex.current;
    AutocompleteDataSource(autocompleteConfig.endpoint, value, page).get().then(function (res) {
      if (getResultIndex.current === getResultIndexCurrent) {
        setIsLoading(false);
        setResult(page === 0 ? res.data : function (r) {
          return [].concat(_toConsumableArray(r), _toConsumableArray(res.data));
        });
      }
    });
  };

  var handleFocus = function handleFocus(e) {
    var relatedTarget = e.relatedTarget;
    props.onFocus && props.onFocus(e);

    if (!relatedTarget || !relatedTarget.classList.contains('vui-TextField-Autocomplete-Target')) {
      getResult(value, page);
    }
  };

  var handleBlur = function handleBlur(e) {
    props.onBlur && props.onBlur(e);
    var relatedTarget = e.relatedTarget;

    if (!relatedTarget || !relatedTarget.classList.contains('vui-TextField-Autocomplete-Target')) {
      setShowResult(false);
      setPage(0);
      setResult(null);
    }

    if (!_isEqual(value, selected)) {
      setValue(null);
    }

    getResultIndex.current++;
    setIsLoading(false);
  };

  var handleKeyDown = function handleKeyDown(e) {
    props.onKeyDown && props.onKeyDown(e);
    var key = e.key,
        target = e.target;

    switch (key) {
      case 'ArrowUp':
        if (target.previousElementSibling && target.previousElementSibling.classList && target.previousElementSibling.classList.contains('item')) {
          target.previousElementSibling.focus();
        } else {
          resultTargetRef.current.focus();
        }

        break;

      case 'ArrowDown':
        if (target.nextElementSibling && target.nextElementSibling.classList && target.nextElementSibling.classList.contains('item')) {
          target.nextElementSibling.focus();
        } else {
          var firstItem = resultRef.current.querySelector('.item');
          firstItem && firstItem.focus();
        }

        break;

      case 'Escape':
        resultTargetRef.current.focus();
        setShowResult(false);
        setResult(null);
        break;

      default:
    }
  };

  var handleChange = function handleChange(newValue) {
    clearTimeout(getResultTimeout.current);
    getResultTimeout.current = setTimeout(function () {
      setValue(newValue);
      onChange && onChange(null);
      var newPage = 0;
      setPage(newPage);
      getResult(newValue, newPage);
    }, 300);
  };

  var handleItemClick = function handleItemClick(item) {
    resultTargetRef.current.focus();
    var newSelected = autocompleteConfig.valueTranspile(item);
    setValue(newSelected);
    setSelected(newSelected);
    onChange && onChange(autocompleteConfig.valueTranspile(item));
    setShowResult(false);
    setResult(null);
    onItemSelect && onItemSelect(item);
  };

  var handleScroll = function handleScroll(newIsScrollEnd) {
    console.log(newIsScrollEnd);
    setIsScrollEnd(newIsScrollEnd);
  };

  useEffect(function () {
    if (!isLoading && isScrollEnd) {
      setIsLoading(true);
      var newPage = page + 1;
      setPage(newPage);
      getResult(value, newPage);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [isScrollEnd]);
  return React.createElement(TextField, Object.assign({}, props, {
    value: value,
    setRef: resultTargetRef,
    autoComplete: false,
    onFocus: handleFocus,
    onBlur: handleBlur,
    inputClassName: "vui-TextField-Autocomplete-Target",
    onKeyDown: handleKeyDown,
    suffix: isLoading && React.createElement(Button, {
      icon: true
    }, React.createElement(Spinner, null)),
    onChange: handleChange
  }), React.createElement("div", {
    className: "auto-complete"
  }, showResult && React.createElement(AutocompleteResult, {
    target: resultTargetRef,
    setRef: resultRef,
    onScroll: handleScroll
  }, result && React.createElement(React.Fragment, null, result.map(function (item) {
    return React.createElement(AutocompleteResult.Item, {
      key: autocompleteConfig.valueTranspile(item),
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      onClick: function onClick() {
        return handleItemClick(item);
      }
    }, autocompleteConfig.itemTranspile(item));
  }), !result.length && React.createElement("div", {
    className: "empty"
  }, autocompleteConfig.emptyLabel)), isLoading ? React.createElement(ProgressBar, {
    indeterminate: true,
    height: result && result.length ? 4 : 2
  }) : React.createElement("div", {
    style: {
      height: result && result.length ? 4 : 2
    }
  }))));
};

export default Autocomplete;