var disableBodyScroll = function () {
  var _selector = false,
      _element = false,
      _clientY;
  /**
   * Polyfills for Element.matches and Element.closest
   */


  if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  if (!Element.prototype.closest) Element.prototype.closest = function (s) {
    var el = this;
    if (!document.documentElement.contains(el)) return null;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);

    return null;
  };
  /**
   * Prevent default unless within _selector
   *
   * @param  event object event
   * @return void
   */

  var preventBodyScroll = function preventBodyScroll(event) {
    if (false === _element || !event.target.closest(_selector)) {
      event.preventDefault();
    }
  };
  /**
   * Cache the clientY co-ordinates for
   * comparison
   *
   * @param  event object event
   * @return void
   */


  var captureClientY = function captureClientY(event) {
    // only respond to a single touch
    if (event.targetTouches.length === 1) {
      _clientY = event.targetTouches[0].clientY;
    }
  };
  /**
   * Detect whether the element is at the top
   * or the bottom of their scroll and prevent
   * the user from scrolling beyond
   *
   * @param  event object event
   * @return void
   */


  var preventOverscroll = function preventOverscroll(event) {
    // only respond to a single touch
    if (event.targetTouches.length !== 1) {
      return;
    }

    var clientY = event.targetTouches[0].clientY - _clientY; // The element at the top of its scroll,
    // and the user scrolls down

    if (_element.scrollTop === 0 && clientY > 0) {
      event.preventDefault();
    } // The element at the bottom of its scroll,
    // and the user scrolls up
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions


    if (_element.scrollHeight - _element.scrollTop <= _element.clientHeight && clientY < 0) {
      event.preventDefault();
    }
  };
  /**
   * Disable body scroll. Scrolling with the selector is
   * allowed if a selector is porvided.
   *
   * @param  boolean allow
   * @param  string selector Selector to element to change scroll permission
   * @return void
   */


  return function (allow, selector) {
    if (typeof selector !== 'undefined') {
      _selector = selector;
      _element = document.querySelector(selector);
    }

    if (true === allow) {
      if (false !== _element) {
        _element.addEventListener('touchstart', captureClientY, false);

        _element.addEventListener('touchmove', preventOverscroll, false);
      }

      document.body.addEventListener('touchmove', preventBodyScroll, false);
    } else {
      if (false !== _element) {
        _element.removeEventListener('touchstart', captureClientY, false);

        _element.removeEventListener('touchmove', preventOverscroll, false);
      }

      document.body.removeEventListener('touchmove', preventBodyScroll, false);
    }
  };
}();

export default disableBodyScroll;