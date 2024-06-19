(function () {
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }

  function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }

  function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }

  function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }

  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }

  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5], {
    /***/
    "./node_modules/@ionic/core/dist/esm/ion-backdrop.entry.js":
    /*!*****************************************************************!*\
      !*** ./node_modules/@ionic/core/dist/esm/ion-backdrop.entry.js ***!
      \*****************************************************************/

    /*! exports provided: ion_backdrop */

    /***/
    function node_modulesIonicCoreDistEsmIonBackdropEntryJs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ion_backdrop", function () {
        return Backdrop;
      });
      /* harmony import */


      var _index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./index-7a8b7a1c.js */
      "./node_modules/@ionic/core/dist/esm/index-7a8b7a1c.js");
      /* harmony import */


      var _ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./ionic-global-63a97a32.js */
      "./node_modules/@ionic/core/dist/esm/ionic-global-63a97a32.js");
      /* harmony import */


      var _gesture_controller_31cb6bb9_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./gesture-controller-31cb6bb9.js */
      "./node_modules/@ionic/core/dist/esm/gesture-controller-31cb6bb9.js");

      var backdropIosCss = ":host{left:0;right:0;top:0;bottom:0;display:block;position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0);contain:strict;cursor:pointer;opacity:0.01;-ms-touch-action:none;touch-action:none;z-index:2}:host(.backdrop-hide){background:transparent}:host(.backdrop-no-tappable){cursor:auto}:host{background-color:var(--ion-backdrop-color, #000)}";
      var backdropMdCss = ":host{left:0;right:0;top:0;bottom:0;display:block;position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0);contain:strict;cursor:pointer;opacity:0.01;-ms-touch-action:none;touch-action:none;z-index:2}:host(.backdrop-hide){background:transparent}:host(.backdrop-no-tappable){cursor:auto}:host{background-color:var(--ion-backdrop-color, #000)}";

      var Backdrop = /*#__PURE__*/function () {
        function Backdrop(hostRef) {
          _classCallCheck(this, Backdrop);

          Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
          this.ionBackdropTap = Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionBackdropTap", 7);
          this.blocker = _gesture_controller_31cb6bb9_js__WEBPACK_IMPORTED_MODULE_2__["G"].createBlocker({
            disableScroll: true
          });
          /**
           * If `true`, the backdrop will be visible.
           */

          this.visible = true;
          /**
           * If `true`, the backdrop will can be clicked and will emit the `ionBackdropTap` event.
           */

          this.tappable = true;
          /**
           * If `true`, the backdrop will stop propagation on tap.
           */

          this.stopPropagation = true;
        }

        return _createClass(Backdrop, [{
          key: "connectedCallback",
          value: function connectedCallback() {
            if (this.stopPropagation) {
              this.blocker.block();
            }
          }
        }, {
          key: "disconnectedCallback",
          value: function disconnectedCallback() {
            this.blocker.unblock();
          }
        }, {
          key: "onMouseDown",
          value: function onMouseDown(ev) {
            this.emitTap(ev);
          }
        }, {
          key: "emitTap",
          value: function emitTap(ev) {
            if (this.stopPropagation) {
              ev.preventDefault();
              ev.stopPropagation();
            }

            if (this.tappable) {
              this.ionBackdropTap.emit();
            }
          }
        }, {
          key: "render",
          value: function render() {
            var mode = Object(_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this);
            return Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
              tabindex: "-1",
              "aria-hidden": "true",
              "class": _defineProperty(_defineProperty(_defineProperty({}, mode, true), 'backdrop-hide', !this.visible), 'backdrop-no-tappable', !this.tappable)
            });
          }
        }]);
      }();

      Backdrop.style = {
        ios: backdropIosCss,
        md: backdropMdCss
      };
      /***/
    }
  }]);
})();
//# sourceMappingURL=5-es5.js.map