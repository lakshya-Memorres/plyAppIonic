(function () {
  function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }

  function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }

  function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }

  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }

  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13], {
    /***/
    "./node_modules/@ionic/core/dist/esm/ion-img.entry.js":
    /*!************************************************************!*\
      !*** ./node_modules/@ionic/core/dist/esm/ion-img.entry.js ***!
      \************************************************************/

    /*! exports provided: ion_img */

    /***/
    function node_modulesIonicCoreDistEsmIonImgEntryJs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ion_img", function () {
        return Img;
      });
      /* harmony import */


      var _index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./index-7a8b7a1c.js */
      "./node_modules/@ionic/core/dist/esm/index-7a8b7a1c.js");
      /* harmony import */


      var _ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./ionic-global-63a97a32.js */
      "./node_modules/@ionic/core/dist/esm/ionic-global-63a97a32.js");

      var imgCss = ":host{display:block;-o-object-fit:contain;object-fit:contain}img{display:block;width:100%;height:100%;-o-object-fit:inherit;object-fit:inherit;-o-object-position:inherit;object-position:inherit}";

      var Img = /*#__PURE__*/function () {
        function Img(hostRef) {
          var _this = this;

          _classCallCheck(this, Img);

          Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
          this.ionImgWillLoad = Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionImgWillLoad", 7);
          this.ionImgDidLoad = Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionImgDidLoad", 7);
          this.ionError = Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionError", 7);

          this.onLoad = function () {
            _this.ionImgDidLoad.emit();
          };

          this.onError = function () {
            _this.ionError.emit();
          };
        }

        return _createClass(Img, [{
          key: "srcChanged",
          value: function srcChanged() {
            this.addIO();
          }
        }, {
          key: "componentDidLoad",
          value: function componentDidLoad() {
            this.addIO();
          }
        }, {
          key: "addIO",
          value: function addIO() {
            var _this2 = this;

            if (this.src === undefined) {
              return;
            }

            if (typeof window !== 'undefined' && 'IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'isIntersecting' in window.IntersectionObserverEntry.prototype) {
              this.removeIO();
              this.io = new IntersectionObserver(function (data) {
                /**
                 * On slower devices, it is possible for an intersection observer entry to contain multiple
                 * objects in the array. This happens when quickly scrolling an image into view and then out of
                 * view. In this case, the last object represents the current state of the component.
                 */
                if (data[data.length - 1].isIntersecting) {
                  _this2.load();

                  _this2.removeIO();
                }
              });
              this.io.observe(this.el);
            } else {
              // fall back to setTimeout for Safari and IE
              setTimeout(function () {
                return _this2.load();
              }, 200);
            }
          }
        }, {
          key: "load",
          value: function load() {
            this.loadError = this.onError;
            this.loadSrc = this.src;
            this.ionImgWillLoad.emit();
          }
        }, {
          key: "removeIO",
          value: function removeIO() {
            if (this.io) {
              this.io.disconnect();
              this.io = undefined;
            }
          }
        }, {
          key: "render",
          value: function render() {
            return Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
              "class": Object(_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this)
            }, Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])("img", {
              decoding: "async",
              src: this.loadSrc,
              alt: this.alt,
              onLoad: this.onLoad,
              onError: this.loadError,
              part: "image"
            }));
          }
        }, {
          key: "el",
          get: function get() {
            return Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["i"])(this);
          }
        }], [{
          key: "watchers",
          get: function get() {
            return {
              "src": ["srcChanged"]
            };
          }
        }]);
      }();

      Img.style = imgCss;
      /***/
    }
  }]);
})();
//# sourceMappingURL=13-es5.js.map