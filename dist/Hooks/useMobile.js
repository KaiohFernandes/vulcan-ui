import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { useEffect, useState } from 'react';
var mobileWidthViewport = 758;

var useMobile = function useMobile() {
  var _useState = useState(window.innerWidth <= mobileWidthViewport),
      _useState2 = _slicedToArray(_useState, 2),
      isMobile = _useState2[0],
      setIsMobile = _useState2[1];

  useEffect(function () {
    var handleResize = function handleResize() {
      setIsMobile(window.innerWidth <= mobileWidthViewport);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return function () {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return [isMobile];
};

export default useMobile;