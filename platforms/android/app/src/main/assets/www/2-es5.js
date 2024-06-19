(function () {
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }

  function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(typeof e + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }

  function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }

  function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

  function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }

  function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }

  function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }

  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }

  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2], {
    /***/
    "./node_modules/@ionic/core/dist/esm/ion-app_8.entry.js":
    /*!**************************************************************!*\
      !*** ./node_modules/@ionic/core/dist/esm/ion-app_8.entry.js ***!
      \**************************************************************/

    /*! exports provided: ion_app, ion_buttons, ion_content, ion_footer, ion_header, ion_router_outlet, ion_title, ion_toolbar */

    /***/
    function node_modulesIonicCoreDistEsmIonApp_8EntryJs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ion_app", function () {
        return App;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ion_buttons", function () {
        return Buttons;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ion_content", function () {
        return Content;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ion_footer", function () {
        return Footer;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ion_header", function () {
        return Header;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ion_router_outlet", function () {
        return RouterOutlet;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ion_title", function () {
        return ToolbarTitle;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ion_toolbar", function () {
        return Toolbar;
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


      var _theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./theme-ff3fc52f.js */
      "./node_modules/@ionic/core/dist/esm/theme-ff3fc52f.js");
      /* harmony import */


      var _helpers_1457892a_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./helpers-1457892a.js */
      "./node_modules/@ionic/core/dist/esm/helpers-1457892a.js");
      /* harmony import */


      var _cubic_bezier_eea9a7a9_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./cubic-bezier-eea9a7a9.js */
      "./node_modules/@ionic/core/dist/esm/cubic-bezier-eea9a7a9.js");
      /* harmony import */


      var _framework_delegate_94e770cc_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./framework-delegate-94e770cc.js */
      "./node_modules/@ionic/core/dist/esm/framework-delegate-94e770cc.js");
      /* harmony import */


      var _index_a7711c1e_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./index-a7711c1e.js */
      "./node_modules/@ionic/core/dist/esm/index-a7711c1e.js");

      var appCss = "html.plt-mobile ion-app{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}html.plt-mobile ion-app [contenteditable]{-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}ion-app.force-statusbar-padding{--ion-safe-area-top:20px}";

      var App = /*#__PURE__*/function () {
        function App(hostRef) {
          _classCallCheck(this, App);

          Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        }

        return _createClass(App, [{
          key: "componentDidLoad",
          value: function componentDidLoad() {
            {
              rIC( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                var isHybrid, hardwareBackButtonModule;
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      isHybrid = Object(_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["a"])(window, 'hybrid');

                      if (!_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["c"].getBoolean('_testing')) {
                        __webpack_require__.e(
                        /*! import() | tap-click-7ddcdebb-js */
                        "tap-click-7ddcdebb-js").then(__webpack_require__.bind(null,
                        /*! ./tap-click-7ddcdebb.js */
                        "./node_modules/@ionic/core/dist/esm/tap-click-7ddcdebb.js")).then(function (module) {
                          return module.startTapClick(_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["c"]);
                        });
                      }

                      if (_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["c"].getBoolean('statusTap', isHybrid)) {
                        __webpack_require__.e(
                        /*! import() | status-tap-9cb487b1-js */
                        "status-tap-9cb487b1-js").then(__webpack_require__.bind(null,
                        /*! ./status-tap-9cb487b1.js */
                        "./node_modules/@ionic/core/dist/esm/status-tap-9cb487b1.js")).then(function (module) {
                          return module.startStatusTap();
                        });
                      }

                      if (_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["c"].getBoolean('inputShims', needInputShims())) {
                        __webpack_require__.e(
                        /*! import() | input-shims-ce03ee9f-js */
                        "input-shims-ce03ee9f-js").then(__webpack_require__.bind(null,
                        /*! ./input-shims-ce03ee9f.js */
                        "./node_modules/@ionic/core/dist/esm/input-shims-ce03ee9f.js")).then(function (module) {
                          return module.startInputShims(_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["c"]);
                        });
                      }

                      _context.next = 6;
                      return Promise.resolve().then(__webpack_require__.bind(null,
                      /*! ./hardware-back-button-4a6b37fb.js */
                      "./node_modules/@ionic/core/dist/esm/hardware-back-button-4a6b37fb.js"));

                    case 6:
                      hardwareBackButtonModule = _context.sent;

                      if (_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["c"].getBoolean('hardwareBackButton', isHybrid)) {
                        hardwareBackButtonModule.startHardwareBackButton();
                      } else {
                        hardwareBackButtonModule.blockHardwareBackButton();
                      }

                      if (typeof window !== 'undefined') {
                        __webpack_require__.e(
                        /*! import() | keyboard-5742b5da-js */
                        "keyboard-5742b5da-js").then(__webpack_require__.bind(null,
                        /*! ./keyboard-5742b5da.js */
                        "./node_modules/@ionic/core/dist/esm/keyboard-5742b5da.js")).then(function (module) {
                          return module.startKeyboardAssist(window);
                        });
                      }

                      __webpack_require__.e(
                      /*! import() | focus-visible-f4ad4f1a-js */
                      "focus-visible-f4ad4f1a-js").then(__webpack_require__.bind(null,
                      /*! ./focus-visible-f4ad4f1a.js */
                      "./node_modules/@ionic/core/dist/esm/focus-visible-f4ad4f1a.js")).then(function (module) {
                        return module.startFocusVisible();
                      });

                    case 10:
                    case "end":
                      return _context.stop();
                  }
                }, _callee);
              })));
            }
          }
        }, {
          key: "render",
          value: function render() {
            var mode = Object(_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this);
            return Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
              "class": _defineProperty(_defineProperty(_defineProperty({}, mode, true), 'ion-page', true), 'force-statusbar-padding', _ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["c"].getBoolean('_forceStatusbarPadding'))
            });
          }
        }, {
          key: "el",
          get: function get() {
            return Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["i"])(this);
          }
        }]);
      }();

      var needInputShims = function needInputShims() {
        return Object(_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["a"])(window, 'ios') && Object(_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["a"])(window, 'mobile');
      };

      var rIC = function rIC(callback) {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(callback);
        } else {
          setTimeout(callback, 32);
        }
      };

      App.style = appCss;
      var buttonsIosCss = ".sc-ion-buttons-ios-h{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-transform:translateZ(0);transform:translateZ(0);z-index:99}.sc-ion-buttons-ios-s ion-button{--padding-top:0;--padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}.sc-ion-buttons-ios-s ion-button{--padding-start:5px;--padding-end:5px;margin-left:2px;margin-right:2px;height:32px;font-size:17px;font-weight:400}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.sc-ion-buttons-ios-s ion-button{margin-left:unset;margin-right:unset;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:2px;margin-inline-end:2px}}.sc-ion-buttons-ios-s ion-button:not(.button-round){--border-radius:4px}.sc-ion-buttons-ios-h.ion-color.sc-ion-buttons-ios-s .button,.ion-color .sc-ion-buttons-ios-h.sc-ion-buttons-ios-s .button{--color:initial;--border-color:initial;--background-focused:var(--ion-color-contrast)}.sc-ion-buttons-ios-h.ion-color.sc-ion-buttons-ios-s .button-solid,.ion-color .sc-ion-buttons-ios-h.sc-ion-buttons-ios-s .button-solid{--background:var(--ion-color-contrast);--background-focused:#000;--background-focused-opacity:.12;--background-activated:#000;--background-activated-opacity:.12;--background-hover:var(--ion-color-base);--background-hover-opacity:0.45;--color:var(--ion-color-base);--color-focused:var(--ion-color-base)}.sc-ion-buttons-ios-h.ion-color.sc-ion-buttons-ios-s .button-clear,.ion-color .sc-ion-buttons-ios-h.sc-ion-buttons-ios-s .button-clear{--color-activated:var(--ion-color-contrast);--color-focused:var(--ion-color-contrast)}.sc-ion-buttons-ios-h.ion-color.sc-ion-buttons-ios-s .button-outline,.ion-color .sc-ion-buttons-ios-h.sc-ion-buttons-ios-s .button-outline{--color-activated:var(--ion-color-base);--color-focused:var(--ion-color-contrast)}.sc-ion-buttons-ios-s .button-clear,.sc-ion-buttons-ios-s .button-outline{--background-activated:transparent;--background-focused:currentColor;--background-hover:transparent}.sc-ion-buttons-ios-s .button-solid:not(.ion-color){--background-focused:#000;--background-focused-opacity:.12;--background-activated:#000;--background-activated-opacity:.12}.sc-ion-buttons-ios-s ion-icon[slot=start]{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;margin-right:0.3em;font-size:24px;line-height:0.67}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.sc-ion-buttons-ios-s ion-icon[slot=start]{margin-right:unset;-webkit-margin-end:0.3em;margin-inline-end:0.3em}}.sc-ion-buttons-ios-s ion-icon[slot=end]{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;margin-left:0.4em;font-size:24px;line-height:0.67}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.sc-ion-buttons-ios-s ion-icon[slot=end]{margin-left:unset;-webkit-margin-start:0.4em;margin-inline-start:0.4em}}.sc-ion-buttons-ios-s ion-icon[slot=icon-only]{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;font-size:28px;line-height:0.67}";
      var buttonsMdCss = ".sc-ion-buttons-md-h{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-transform:translateZ(0);transform:translateZ(0);z-index:99}.sc-ion-buttons-md-s ion-button{--padding-top:0;--padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}.sc-ion-buttons-md-s ion-button{--padding-top:0;--padding-bottom:0;--padding-start:8px;--padding-end:8px;--box-shadow:none;margin-left:2px;margin-right:2px;height:32px;font-size:14px;font-weight:500}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.sc-ion-buttons-md-s ion-button{margin-left:unset;margin-right:unset;-webkit-margin-start:2px;margin-inline-start:2px;-webkit-margin-end:2px;margin-inline-end:2px}}.sc-ion-buttons-md-s ion-button:not(.button-round){--border-radius:2px}.sc-ion-buttons-md-h.ion-color.sc-ion-buttons-md-s .button,.ion-color .sc-ion-buttons-md-h.sc-ion-buttons-md-s .button{--color:initial;--color-focused:var(--ion-color-contrast);--color-hover:var(--ion-color-contrast);--background-activated:transparent;--background-focused:var(--ion-color-contrast);--background-hover:var(--ion-color-contrast)}.sc-ion-buttons-md-h.ion-color.sc-ion-buttons-md-s .button-solid,.ion-color .sc-ion-buttons-md-h.sc-ion-buttons-md-s .button-solid{--background:var(--ion-color-contrast);--background-activated:transparent;--background-focused:var(--ion-color-shade);--background-hover:var(--ion-color-base);--color:var(--ion-color-base);--color-focused:var(--ion-color-base);--color-hover:var(--ion-color-base)}.sc-ion-buttons-md-h.ion-color.sc-ion-buttons-md-s .button-outline,.ion-color .sc-ion-buttons-md-h.sc-ion-buttons-md-s .button-outline{--border-color:var(--ion-color-contrast)}.sc-ion-buttons-md-s .button-has-icon-only.button-clear{--padding-top:12px;--padding-end:12px;--padding-bottom:12px;--padding-start:12px;--border-radius:50%;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;width:48px;height:48px}.sc-ion-buttons-md-s .button{--background-hover:currentColor}.sc-ion-buttons-md-s .button-solid{--color:var(--ion-toolbar-background, var(--ion-background-color, #fff));--background:var(--ion-toolbar-color, var(--ion-text-color, #424242));--background-activated:transparent;--background-focused:currentColor}.sc-ion-buttons-md-s .button-outline{--color:initial;--background:transparent;--background-activated:transparent;--background-focused:currentColor;--background-hover:currentColor;--border-color:currentColor}.sc-ion-buttons-md-s .button-clear{--color:initial;--background:transparent;--background-activated:transparent;--background-focused:currentColor;--background-hover:currentColor}.sc-ion-buttons-md-s ion-icon[slot=start]{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;margin-right:0.3em;font-size:1.4em}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.sc-ion-buttons-md-s ion-icon[slot=start]{margin-right:unset;-webkit-margin-end:0.3em;margin-inline-end:0.3em}}.sc-ion-buttons-md-s ion-icon[slot=end]{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;margin-left:0.4em;font-size:1.4em}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.sc-ion-buttons-md-s ion-icon[slot=end]{margin-left:unset;-webkit-margin-start:0.4em;margin-inline-start:0.4em}}.sc-ion-buttons-md-s ion-icon[slot=icon-only]{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;font-size:1.8em}";

      var Buttons = /*#__PURE__*/function () {
        function Buttons(hostRef) {
          _classCallCheck(this, Buttons);

          Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
          /**
           * If true, buttons will disappear when its
           * parent toolbar has fully collapsed if the toolbar
           * is not the first toolbar. If the toolbar is the
           * first toolbar, the buttons will be hidden and will
           * only be shown once all toolbars have fully collapsed.
           *
           * Only applies in `ios` mode with `collapse` set to
           * `true` on `ion-header`.
           *
           * Typically used for [Collapsible Large Titles](https://ionicframework.com/docs/api/title#collapsible-large-titles)
           */

          this.collapse = false;
        }

        return _createClass(Buttons, [{
          key: "render",
          value: function render() {
            var mode = Object(_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this);
            return Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
              "class": _defineProperty(_defineProperty({}, mode, true), 'buttons-collapse', this.collapse)
            });
          }
        }]);
      }();

      Buttons.style = {
        ios: buttonsIosCss,
        md: buttonsMdCss
      };
      var contentCss = ":host{--background:var(--ion-background-color, #fff);--color:var(--ion-text-color, #000);--padding-top:0px;--padding-bottom:0px;--padding-start:0px;--padding-end:0px;--keyboard-offset:0px;--offset-top:0px;--offset-bottom:0px;--overflow:auto;display:block;position:relative;-ms-flex:1;flex:1;width:100%;height:100%;margin:0 !important;padding:0 !important;font-family:var(--ion-font-family, inherit);contain:size style}:host(.ion-color) .inner-scroll{background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(.outer-content){--background:var(--ion-color-step-50, #f2f2f2)}#background-content{left:0px;right:0px;top:calc(var(--offset-top) * -1);bottom:calc(var(--offset-bottom) * -1);position:absolute;background:var(--background)}.inner-scroll{left:0px;right:0px;top:calc(var(--offset-top) * -1);bottom:calc(var(--offset-bottom) * -1);padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:calc(var(--padding-top) + var(--offset-top));padding-bottom:calc(var(--padding-bottom) + var(--keyboard-offset) + var(--offset-bottom));position:absolute;color:var(--color);-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.inner-scroll{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.scroll-y,.scroll-x{-webkit-overflow-scrolling:touch;z-index:0;will-change:scroll-position}.scroll-y{-ms-touch-action:pan-y;touch-action:pan-y;overflow-y:var(--overflow);overscroll-behavior-y:contain}.scroll-x{-ms-touch-action:pan-x;touch-action:pan-x;overflow-x:var(--overflow);overscroll-behavior-x:contain}.scroll-x.scroll-y{-ms-touch-action:auto;touch-action:auto}.overscroll::before,.overscroll::after{position:absolute;width:1px;height:1px;content:\"\"}.overscroll::before{bottom:-1px}.overscroll::after{top:-1px}:host(.content-sizing){display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;min-height:0;contain:none}:host(.content-sizing) .inner-scroll{position:relative;top:0;bottom:0;margin-top:calc(var(--offset-top) * -1);margin-bottom:calc(var(--offset-bottom) * -1)}.transition-effect{display:none;position:absolute;left:-100%;width:100%;height:100vh;opacity:0;pointer-events:none}.transition-cover{position:absolute;right:0;width:100%;height:100%;background:black;opacity:0.1}.transition-shadow{display:block;position:absolute;right:0;width:10px;height:100%;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAgCAYAAAAIXrg4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTE3MDgzRkQ5QTkyMTFFOUEwNzQ5MkJFREE1NUY2MjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTE3MDgzRkU5QTkyMTFFOUEwNzQ5MkJFREE1NUY2MjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMTcwODNGQjlBOTIxMUU5QTA3NDkyQkVEQTU1RjYyNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxMTcwODNGQzlBOTIxMUU5QTA3NDkyQkVEQTU1RjYyNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmePEuQAAABNSURBVHjaYvz//z8DIxAwMDAwATGMhmFmPDQuOSZks0AMmoJBaQHjkPfB0Lfg/2gQjVow+HPy/yHvg9GiYjQfjMbBqAWjFgy/4hogwADYqwdzxy5BuwAAAABJRU5ErkJggg==);background-repeat:repeat-y;background-size:10px 16px}::slotted([slot=fixed]){position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0)}";

      var Content = /*#__PURE__*/function () {
        function Content(hostRef) {
          _classCallCheck(this, Content);

          Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
          this.ionScrollStart = Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionScrollStart", 7);
          this.ionScroll = Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionScroll", 7);
          this.ionScrollEnd = Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionScrollEnd", 7);
          this.isScrolling = false;
          this.lastScroll = 0;
          this.queued = false;
          this.cTop = -1;
          this.cBottom = -1;
          this.isMainContent = true; // Detail is used in a hot loop in the scroll event, by allocating it here
          // V8 will be able to inline any read/write to it since it's a monomorphic class.
          // https://mrale.ph/blog/2015/01/11/whats-up-with-monomorphism.html

          this.detail = {
            scrollTop: 0,
            scrollLeft: 0,
            type: 'scroll',
            event: undefined,
            startX: 0,
            startY: 0,
            startTime: 0,
            currentX: 0,
            currentY: 0,
            velocityX: 0,
            velocityY: 0,
            deltaX: 0,
            deltaY: 0,
            currentTime: 0,
            data: undefined,
            isScrolling: true
          };
          /**
           * If `true`, the content will scroll behind the headers
           * and footers. This effect can easily be seen by setting the toolbar
           * to transparent.
           */

          this.fullscreen = false;
          /**
           * If you want to enable the content scrolling in the X axis, set this property to `true`.
           */

          this.scrollX = false;
          /**
           * If you want to disable the content scrolling in the Y axis, set this property to `false`.
           */

          this.scrollY = true;
          /**
           * Because of performance reasons, ionScroll events are disabled by default, in order to enable them
           * and start listening from (ionScroll), set this property to `true`.
           */

          this.scrollEvents = false;
        }

        return _createClass(Content, [{
          key: "connectedCallback",
          value: function connectedCallback() {
            this.isMainContent = this.el.closest('ion-menu, ion-popover, ion-modal') === null;
          }
        }, {
          key: "disconnectedCallback",
          value: function disconnectedCallback() {
            this.onScrollEnd();
          }
        }, {
          key: "onAppLoad",
          value: function onAppLoad() {
            this.resize();
          }
        }, {
          key: "shouldForceOverscroll",
          value: function shouldForceOverscroll() {
            var forceOverscroll = this.forceOverscroll;
            var mode = Object(_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this);
            return forceOverscroll === undefined ? mode === 'ios' && Object(_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["a"])('ios') : forceOverscroll;
          }
        }, {
          key: "resize",
          value: function resize() {
            var _this = this;

            if (this.fullscreen) {
              Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["f"])(function () {
                return _this.readDimensions();
              });
            } else if (this.cTop !== 0 || this.cBottom !== 0) {
              this.cTop = this.cBottom = 0;
              Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["j"])(this);
            }
          }
        }, {
          key: "readDimensions",
          value: function readDimensions() {
            var page = getPageElement(this.el);
            var top = Math.max(this.el.offsetTop, 0);
            var bottom = Math.max(page.offsetHeight - top - this.el.offsetHeight, 0);
            var dirty = top !== this.cTop || bottom !== this.cBottom;

            if (dirty) {
              this.cTop = top;
              this.cBottom = bottom;
              Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["j"])(this);
            }
          }
        }, {
          key: "onScroll",
          value: function onScroll(ev) {
            var _this2 = this;

            var timeStamp = Date.now();
            var shouldStart = !this.isScrolling;
            this.lastScroll = timeStamp;

            if (shouldStart) {
              this.onScrollStart();
            }

            if (!this.queued && this.scrollEvents) {
              this.queued = true;
              Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["f"])(function (ts) {
                _this2.queued = false;
                _this2.detail.event = ev;
                updateScrollDetail(_this2.detail, _this2.scrollEl, ts, shouldStart);

                _this2.ionScroll.emit(_this2.detail);
              });
            }
          }
          /**
           * Get the element where the actual scrolling takes place.
           * This element can be used to subscribe to `scroll` events or manually modify
           * `scrollTop`. However, it's recommended to use the API provided by `ion-content`:
           *
           * i.e. Using `ionScroll`, `ionScrollStart`, `ionScrollEnd` for scrolling events
           * and `scrollToPoint()` to scroll the content into a certain point.
           */

        }, {
          key: "getScrollElement",
          value: function getScrollElement() {
            return Promise.resolve(this.scrollEl);
          }
          /**
           * Scroll to the top of the component.
           *
           * @param duration The amount of time to take scrolling to the top. Defaults to `0`.
           */

        }, {
          key: "scrollToTop",
          value: function scrollToTop() {
            var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            return this.scrollToPoint(undefined, 0, duration);
          }
          /**
           * Scroll to the bottom of the component.
           *
           * @param duration The amount of time to take scrolling to the bottom. Defaults to `0`.
           */

        }, {
          key: "scrollToBottom",
          value: function scrollToBottom() {
            var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var y = this.scrollEl.scrollHeight - this.scrollEl.clientHeight;
            return this.scrollToPoint(undefined, y, duration);
          }
          /**
           * Scroll by a specified X/Y distance in the component.
           *
           * @param x The amount to scroll by on the horizontal axis.
           * @param y The amount to scroll by on the vertical axis.
           * @param duration The amount of time to take scrolling by that amount.
           */

        }, {
          key: "scrollByPoint",
          value: function scrollByPoint(x, y, duration) {
            return this.scrollToPoint(x + this.scrollEl.scrollLeft, y + this.scrollEl.scrollTop, duration);
          }
          /**
           * Scroll to a specified X/Y location in the component.
           *
           * @param x The point to scroll to on the horizontal axis.
           * @param y The point to scroll to on the vertical axis.
           * @param duration The amount of time to take scrolling to that point. Defaults to `0`.
           */

        }, {
          key: "scrollToPoint",
          value: function () {
            var _scrollToPoint = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(x, y) {
              var duration,
                  el,
                  resolve,
                  startTime,
                  promise,
                  fromY,
                  fromX,
                  deltaY,
                  deltaX,
                  step,
                  _args2 = arguments;
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    duration = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 0;
                    el = this.scrollEl;

                    if (!(duration < 32)) {
                      _context2.next = 6;
                      break;
                    }

                    if (y != null) {
                      el.scrollTop = y;
                    }

                    if (x != null) {
                      el.scrollLeft = x;
                    }

                    return _context2.abrupt("return");

                  case 6:
                    startTime = 0;
                    promise = new Promise(function (r) {
                      return resolve = r;
                    });
                    fromY = el.scrollTop;
                    fromX = el.scrollLeft;
                    deltaY = y != null ? y - fromY : 0;
                    deltaX = x != null ? x - fromX : 0; // scroll loop

                    step = function step(timeStamp) {
                      var linearTime = Math.min(1, (timeStamp - startTime) / duration) - 1;
                      var easedT = Math.pow(linearTime, 3) + 1;

                      if (deltaY !== 0) {
                        el.scrollTop = Math.floor(easedT * deltaY + fromY);
                      }

                      if (deltaX !== 0) {
                        el.scrollLeft = Math.floor(easedT * deltaX + fromX);
                      }

                      if (easedT < 1) {
                        // do not use DomController here
                        // must use nativeRaf in order to fire in the next frame
                        // TODO: remove as any
                        requestAnimationFrame(step);
                      } else {
                        resolve();
                      }
                    }; // chill out for a frame first


                    requestAnimationFrame(function (ts) {
                      startTime = ts;
                      step(ts);
                    });
                    return _context2.abrupt("return", promise);

                  case 15:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2, this);
            }));

            function scrollToPoint(_x, _x2) {
              return _scrollToPoint.apply(this, arguments);
            }

            return scrollToPoint;
          }()
        }, {
          key: "onScrollStart",
          value: function onScrollStart() {
            var _this3 = this;

            this.isScrolling = true;
            this.ionScrollStart.emit({
              isScrolling: true
            });

            if (this.watchDog) {
              clearInterval(this.watchDog);
            } // watchdog


            this.watchDog = setInterval(function () {
              if (_this3.lastScroll < Date.now() - 120) {
                _this3.onScrollEnd();
              }
            }, 100);
          }
        }, {
          key: "onScrollEnd",
          value: function onScrollEnd() {
            clearInterval(this.watchDog);
            this.watchDog = null;

            if (this.isScrolling) {
              this.isScrolling = false;
              this.ionScrollEnd.emit({
                isScrolling: false
              });
            }
          }
        }, {
          key: "render",
          value: function render() {
            var _this4 = this;

            var isMainContent = this.isMainContent,
                scrollX = this.scrollX,
                scrollY = this.scrollY;
            var mode = Object(_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this);
            var forceOverscroll = this.shouldForceOverscroll();
            var TagType = isMainContent ? 'main' : 'div';

            var transitionShadow = mode === 'ios' && _ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["c"].getBoolean('experimentalTransitionShadow', true);

            this.resize();
            return Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
              "class": Object(_theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_2__["c"])(this.color, _defineProperty(_defineProperty(_defineProperty({}, mode, true), 'content-sizing', Object(_theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_2__["h"])('ion-popover', this.el)), 'overscroll', forceOverscroll)),
              style: {
                '--offset-top': "".concat(this.cTop, "px"),
                '--offset-bottom': "".concat(this.cBottom, "px")
              }
            }, Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
              id: "background-content",
              part: "background"
            }), Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])(TagType, {
              "class": {
                'inner-scroll': true,
                'scroll-x': scrollX,
                'scroll-y': scrollY,
                'overscroll': (scrollX || scrollY) && forceOverscroll
              },
              ref: function ref(el) {
                return _this4.scrollEl = el;
              },
              onScroll: this.scrollEvents ? function (ev) {
                return _this4.onScroll(ev);
              } : undefined,
              part: "scroll"
            }, Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)), transitionShadow ? Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
              "class": "transition-effect"
            }, Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
              "class": "transition-cover"
            }), Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
              "class": "transition-shadow"
            })) : null, Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", {
              name: "fixed"
            }));
          }
        }, {
          key: "el",
          get: function get() {
            return Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["i"])(this);
          }
        }]);
      }();

      var getParentElement = function getParentElement(el) {
        if (el.parentElement) {
          // normal element with a parent element
          return el.parentElement;
        }

        if (el.parentNode && el.parentNode.host) {
          // shadow dom's document fragment
          return el.parentNode.host;
        }

        return null;
      };

      var getPageElement = function getPageElement(el) {
        var tabs = el.closest('ion-tabs');

        if (tabs) {
          return tabs;
        }
        /**
         * If we're in a popover, we need to use its wrapper so we can account for space
         * between the popover and the edges of the screen. But if the popover contains
         * its own page element, we should use that instead.
         */


        var page = el.closest('ion-app, ion-page, .ion-page, page-inner, .popover-content');

        if (page) {
          return page;
        }

        return getParentElement(el);
      }; // ******** DOM READ ****************


      var updateScrollDetail = function updateScrollDetail(detail, el, timestamp, shouldStart) {
        var prevX = detail.currentX;
        var prevY = detail.currentY;
        var prevT = detail.currentTime;
        var currentX = el.scrollLeft;
        var currentY = el.scrollTop;
        var timeDelta = timestamp - prevT;

        if (shouldStart) {
          // remember the start positions
          detail.startTime = timestamp;
          detail.startX = currentX;
          detail.startY = currentY;
          detail.velocityX = detail.velocityY = 0;
        }

        detail.currentTime = timestamp;
        detail.currentX = detail.scrollLeft = currentX;
        detail.currentY = detail.scrollTop = currentY;
        detail.deltaX = currentX - detail.startX;
        detail.deltaY = currentY - detail.startY;

        if (timeDelta > 0 && timeDelta < 100) {
          var velocityX = (currentX - prevX) / timeDelta;
          var velocityY = (currentY - prevY) / timeDelta;
          detail.velocityX = velocityX * 0.7 + detail.velocityX * 0.3;
          detail.velocityY = velocityY * 0.7 + detail.velocityY * 0.3;
        }
      };

      Content.style = contentCss;
      var footerIosCss = "ion-footer{display:block;position:relative;-ms-flex-order:1;order:1;width:100%;z-index:10}ion-footer ion-toolbar:last-of-type{padding-bottom:var(--ion-safe-area-bottom, 0)}.footer-ios ion-toolbar:first-of-type{--border-width:0.55px 0 0}@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))){.footer-background{left:0;right:0;top:0;bottom:0;position:absolute;-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}.footer-translucent-ios ion-toolbar{--opacity:.8}}.footer-ios.ion-no-border ion-toolbar:first-of-type{--border-width:0}";
      var footerMdCss = "ion-footer{display:block;position:relative;-ms-flex-order:1;order:1;width:100%;z-index:10}ion-footer ion-toolbar:last-of-type{padding-bottom:var(--ion-safe-area-bottom, 0)}.footer-md::before{left:0;top:-2px;bottom:auto;background-position:left 0 top 0;position:absolute;width:100%;height:2px;background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAHBAMAAADzDtBxAAAAD1BMVEUAAAAAAAAAAAAAAAAAAABPDueNAAAABXRSTlMUCS0gBIh/TXEAAAAaSURBVAjXYxCEAgY4UIICBmMogMsgFLtAAQCNSwXZKOdPxgAAAABJRU5ErkJggg==\");background-repeat:repeat-x;content:\"\"}[dir=rtl] .footer-md::before,:host-context([dir=rtl]) .footer-md::before{left:unset;right:unset;right:0}[dir=rtl] .footer-md::before,:host-context([dir=rtl]) .footer-md::before{background-position:right 0 top 0}.footer-md.ion-no-border::before{display:none}";

      var Footer = /*#__PURE__*/function () {
        function Footer(hostRef) {
          _classCallCheck(this, Footer);

          Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
          /**
           * If `true`, the footer will be translucent.
           * Only applies when the mode is `"ios"` and the device supports
           * [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility).
           *
           * Note: In order to scroll content behind the footer, the `fullscreen`
           * attribute needs to be set on the content.
           */

          this.translucent = false;
        }

        return _createClass(Footer, [{
          key: "render",
          value: function render() {
            var mode = Object(_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this);
            var translucent = this.translucent;
            return Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
              role: "contentinfo",
              "class": _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, mode, true), "footer-".concat(mode), true), "footer-translucent", translucent), "footer-translucent-".concat(mode), translucent)
            }, mode === 'ios' && translucent && Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
              "class": "footer-background"
            }), Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null));
          }
        }]);
      }();

      Footer.style = {
        ios: footerIosCss,
        md: footerMdCss
      };
      var TRANSITION = 'all 0.2s ease-in-out';

      var cloneElement = function cloneElement(tagName) {
        var getCachedEl = document.querySelector("".concat(tagName, ".ion-cloned-element"));

        if (getCachedEl !== null) {
          return getCachedEl;
        }

        var clonedEl = document.createElement(tagName);
        clonedEl.classList.add('ion-cloned-element');
        clonedEl.style.setProperty('display', 'none');
        document.body.appendChild(clonedEl);
        return clonedEl;
      };

      var createHeaderIndex = function createHeaderIndex(headerEl) {
        if (!headerEl) {
          return;
        }

        var toolbars = headerEl.querySelectorAll('ion-toolbar');
        return {
          el: headerEl,
          toolbars: Array.from(toolbars).map(function (toolbar) {
            var ionTitleEl = toolbar.querySelector('ion-title');
            return {
              el: toolbar,
              background: toolbar.shadowRoot.querySelector('.toolbar-background'),
              ionTitleEl: ionTitleEl,
              innerTitleEl: ionTitleEl ? ionTitleEl.shadowRoot.querySelector('.toolbar-title') : null,
              ionButtonsEl: Array.from(toolbar.querySelectorAll('ion-buttons')) || []
            };
          }) || []
        };
      };

      var handleContentScroll = function handleContentScroll(scrollEl, scrollHeaderIndex, contentEl) {
        Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["f"])(function () {
          var scrollTop = scrollEl.scrollTop;
          var scale = Object(_helpers_1457892a_js__WEBPACK_IMPORTED_MODULE_3__["k"])(1, 1 + -scrollTop / 500, 1.1); // Native refresher should not cause titles to scale

          var nativeRefresher = contentEl.querySelector('ion-refresher.refresher-native');

          if (nativeRefresher === null) {
            Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["c"])(function () {
              scaleLargeTitles(scrollHeaderIndex.toolbars, scale);
            });
          }
        });
      };

      var setToolbarBackgroundOpacity = function setToolbarBackgroundOpacity(toolbar, opacity) {
        if (opacity === undefined) {
          toolbar.background.style.removeProperty('--opacity');
        } else {
          toolbar.background.style.setProperty('--opacity', opacity.toString());
        }
      };

      var handleToolbarBorderIntersection = function handleToolbarBorderIntersection(ev, mainHeaderIndex, scrollTop) {
        if (!ev[0].isIntersecting) {
          return;
        }
        /**
         * There is a bug in Safari where overflow scrolling on a non-body element
         * does not always reset the scrollTop position to 0 when letting go. It will
         * set to 1 once the rubber band effect has ended. This causes the background to
         * appear slightly on certain app setups.
         *
         * Additionally, we check if user is rubber banding (scrolling is negative)
         * as this can mean they are using pull to refresh. Once the refresher starts,
         * the content is transformed which can cause the intersection observer to erroneously
         * fire here as well.
         */


        var scale = ev[0].intersectionRatio > 0.9 || scrollTop <= 0 ? 0 : (1 - ev[0].intersectionRatio) * 100 / 75;
        mainHeaderIndex.toolbars.forEach(function (toolbar) {
          setToolbarBackgroundOpacity(toolbar, scale === 1 ? undefined : scale);
        });
      };
      /**
       * If toolbars are intersecting, hide the scrollable toolbar content
       * and show the primary toolbar content. If the toolbars are not intersecting,
       * hide the primary toolbar content and show the scrollable toolbar content
       */


      var handleToolbarIntersection = function handleToolbarIntersection(ev, mainHeaderIndex, scrollHeaderIndex, scrollEl) {
        Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["c"])(function () {
          var scrollTop = scrollEl.scrollTop;
          handleToolbarBorderIntersection(ev, mainHeaderIndex, scrollTop);
          var event = ev[0];
          var intersection = event.intersectionRect;
          var intersectionArea = intersection.width * intersection.height;
          var rootArea = event.rootBounds.width * event.rootBounds.height;
          var isPageHidden = intersectionArea === 0 && rootArea === 0;
          var leftDiff = Math.abs(intersection.left - event.boundingClientRect.left);
          var rightDiff = Math.abs(intersection.right - event.boundingClientRect.right);
          var isPageTransitioning = intersectionArea > 0 && (leftDiff >= 5 || rightDiff >= 5);

          if (isPageHidden || isPageTransitioning) {
            return;
          }

          if (event.isIntersecting) {
            setHeaderActive(mainHeaderIndex, false);
            setHeaderActive(scrollHeaderIndex);
          } else {
            /**
             * There is a bug with IntersectionObserver on Safari
             * where `event.isIntersecting === false` when cancelling
             * a swipe to go back gesture. Checking the intersection
             * x, y, width, and height provides a workaround. This bug
             * does not happen when using Safari + Web Animations,
             * only Safari + CSS Animations.
             */
            var hasValidIntersection = intersection.x === 0 && intersection.y === 0 || intersection.width !== 0 && intersection.height !== 0;

            if (hasValidIntersection && scrollTop > 0) {
              setHeaderActive(mainHeaderIndex);
              setHeaderActive(scrollHeaderIndex, false);
              setToolbarBackgroundOpacity(mainHeaderIndex.toolbars[0]);
            }
          }
        });
      };

      var setHeaderActive = function setHeaderActive(headerIndex) {
        var active = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (active) {
          headerIndex.el.classList.remove('header-collapse-condense-inactive');
        } else {
          headerIndex.el.classList.add('header-collapse-condense-inactive');
        }
      };

      var scaleLargeTitles = function scaleLargeTitles() {
        var toolbars = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var transition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        toolbars.forEach(function (toolbar) {
          var ionTitle = toolbar.ionTitleEl;
          var titleDiv = toolbar.innerTitleEl;

          if (!ionTitle || ionTitle.size !== 'large') {
            return;
          }

          titleDiv.style.transition = transition ? TRANSITION : '';
          titleDiv.style.transform = "scale3d(".concat(scale, ", ").concat(scale, ", 1)");
        });
      };

      var headerIosCss = "ion-header{display:block;position:relative;-ms-flex-order:-1;order:-1;width:100%;z-index:10}ion-header ion-toolbar:first-of-type{padding-top:var(--ion-safe-area-top, 0)}.header-ios ion-toolbar:last-of-type{--border-width:0 0 0.55px}@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))){.header-background{left:0;right:0;top:0;bottom:0;position:absolute;-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}.header-translucent-ios ion-toolbar{--opacity:.8}.header-collapse-condense-inactive .header-background{-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px)}}.header-ios.ion-no-border ion-toolbar:last-of-type{--border-width:0}.header-collapse-condense{z-index:9}.header-collapse-condense ion-toolbar{position:-webkit-sticky;position:sticky;top:0}.header-collapse-condense ion-toolbar:first-of-type{padding-top:7px;z-index:1}.header-collapse-condense ion-toolbar{--background:var(--ion-background-color, #fff);z-index:0}.header-collapse-condense ion-toolbar ion-searchbar{height:48px;padding-top:0px;padding-bottom:13px}.header-collapse-main ion-toolbar.in-toolbar ion-title,.header-collapse-main ion-toolbar.in-toolbar ion-buttons{-webkit-transition:all 0.2s ease-in-out;transition:all 0.2s ease-in-out}.header-collapse-condense-inactive:not(.header-collapse-condense) ion-toolbar.in-toolbar ion-title,.header-collapse-condense-inactive:not(.header-collapse-condense) ion-toolbar.in-toolbar ion-buttons.buttons-collapse{opacity:0;pointer-events:none}.header-collapse-condense-inactive.header-collapse-condense ion-toolbar.in-toolbar ion-title,.header-collapse-condense-inactive.header-collapse-condense ion-toolbar.in-toolbar ion-buttons.buttons-collapse{visibility:hidden}";
      var headerMdCss = "ion-header{display:block;position:relative;-ms-flex-order:-1;order:-1;width:100%;z-index:10}ion-header ion-toolbar:first-of-type{padding-top:var(--ion-safe-area-top, 0)}.header-md::after{left:0;bottom:-5px;background-position:left 0 top -2px;position:absolute;width:100%;height:5px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAHBAMAAADzDtBxAAAAD1BMVEUAAAAAAAAAAAAAAAAAAABPDueNAAAABXRSTlMUCS0gBIh/TXEAAAAaSURBVAjXYxCEAgY4UIICBmMogMsgFLtAAQCNSwXZKOdPxgAAAABJRU5ErkJggg==);background-repeat:repeat-x;content:\"\"}[dir=rtl] .header-md::after,:host-context([dir=rtl]) .header-md::after{left:unset;right:unset;right:0}[dir=rtl] .header-md::after,:host-context([dir=rtl]) .header-md::after{background-position:right 0 top -2px}.header-collapse-condense{display:none}.header-md.ion-no-border::after{display:none}";

      var Header = /*#__PURE__*/function () {
        function Header(hostRef) {
          _classCallCheck(this, Header);

          Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
          this.collapsibleHeaderInitialized = false;
          this.inheritedAttributes = {};
          /**
           * If `true`, the header will be translucent.
           * Only applies when the mode is `"ios"` and the device supports
           * [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility).
           *
           * Note: In order to scroll content behind the header, the `fullscreen`
           * attribute needs to be set on the content.
           */

          this.translucent = false;
        }

        return _createClass(Header, [{
          key: "componentWillLoad",
          value: function componentWillLoad() {
            this.inheritedAttributes = Object(_helpers_1457892a_js__WEBPACK_IMPORTED_MODULE_3__["i"])(this.el);
          }
        }, {
          key: "componentDidLoad",
          value: function () {
            var _componentDidLoad = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return this.checkCollapsibleHeader();

                  case 2:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3, this);
            }));

            function componentDidLoad() {
              return _componentDidLoad.apply(this, arguments);
            }

            return componentDidLoad;
          }()
        }, {
          key: "componentDidUpdate",
          value: function () {
            var _componentDidUpdate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return this.checkCollapsibleHeader();

                  case 2:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4, this);
            }));

            function componentDidUpdate() {
              return _componentDidUpdate.apply(this, arguments);
            }

            return componentDidUpdate;
          }()
        }, {
          key: "disconnectedCallback",
          value: function disconnectedCallback() {
            this.destroyCollapsibleHeader();
          }
        }, {
          key: "checkCollapsibleHeader",
          value: function () {
            var _checkCollapsibleHeader = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
              var hasCollapse, canCollapse, pageEl, contentEl;
              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    // Determine if the header can collapse
                    hasCollapse = this.collapse === 'condense';
                    canCollapse = hasCollapse && Object(_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this) === 'ios' ? hasCollapse : false;

                    if (!(!canCollapse && this.collapsibleHeaderInitialized)) {
                      _context5.next = 6;
                      break;
                    }

                    this.destroyCollapsibleHeader();
                    _context5.next = 12;
                    break;

                  case 6:
                    if (!(canCollapse && !this.collapsibleHeaderInitialized)) {
                      _context5.next = 12;
                      break;
                    }

                    pageEl = this.el.closest('ion-app,ion-page,.ion-page,page-inner');
                    contentEl = pageEl ? pageEl.querySelector('ion-content') : null; // Cloned elements are always needed in iOS transition

                    Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["c"])(function () {
                      var title = cloneElement('ion-title');
                      title.size = 'large';
                      cloneElement('ion-back-button');
                    });
                    _context5.next = 12;
                    return this.setupCollapsibleHeader(contentEl, pageEl);

                  case 12:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5, this);
            }));

            function checkCollapsibleHeader() {
              return _checkCollapsibleHeader.apply(this, arguments);
            }

            return checkCollapsibleHeader;
          }()
        }, {
          key: "destroyCollapsibleHeader",
          value: function destroyCollapsibleHeader() {
            if (this.intersectionObserver) {
              this.intersectionObserver.disconnect();
              this.intersectionObserver = undefined;
            }

            if (this.scrollEl && this.contentScrollCallback) {
              this.scrollEl.removeEventListener('scroll', this.contentScrollCallback);
              this.contentScrollCallback = undefined;
            }

            if (this.collapsibleMainHeader) {
              this.collapsibleMainHeader.classList.remove('header-collapse-main');
              this.collapsibleMainHeader = undefined;
            }
          }
        }, {
          key: "setupCollapsibleHeader",
          value: function () {
            var _setupCollapsibleHeader = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(contentEl, pageEl) {
              var _this5 = this;

              var headers, mainHeaderIndex, scrollHeaderIndex, toolbarIntersection;
              return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    if (!(!contentEl || !pageEl)) {
                      _context6.next = 3;
                      break;
                    }

                    console.error('ion-header requires a content to collapse, make sure there is an ion-content.');
                    return _context6.abrupt("return");

                  case 3:
                    if (!(typeof IntersectionObserver === 'undefined')) {
                      _context6.next = 5;
                      break;
                    }

                    return _context6.abrupt("return");

                  case 5:
                    _context6.next = 7;
                    return contentEl.getScrollElement();

                  case 7:
                    this.scrollEl = _context6.sent;
                    headers = pageEl.querySelectorAll('ion-header');
                    this.collapsibleMainHeader = Array.from(headers).find(function (header) {
                      return header.collapse !== 'condense';
                    });

                    if (this.collapsibleMainHeader) {
                      _context6.next = 12;
                      break;
                    }

                    return _context6.abrupt("return");

                  case 12:
                    mainHeaderIndex = createHeaderIndex(this.collapsibleMainHeader);
                    scrollHeaderIndex = createHeaderIndex(this.el);

                    if (!(!mainHeaderIndex || !scrollHeaderIndex)) {
                      _context6.next = 16;
                      break;
                    }

                    return _context6.abrupt("return");

                  case 16:
                    setHeaderActive(mainHeaderIndex, false);
                    mainHeaderIndex.toolbars.forEach(function (toolbar) {
                      setToolbarBackgroundOpacity(toolbar, 0);
                    });
                    /**
                     * Handle interaction between toolbar collapse and
                     * showing/hiding content in the primary ion-header
                     * as well as progressively showing/hiding the main header
                     * border as the top-most toolbar collapses or expands.
                     */

                    toolbarIntersection = function toolbarIntersection(ev) {
                      handleToolbarIntersection(ev, mainHeaderIndex, scrollHeaderIndex, _this5.scrollEl);
                    };

                    this.intersectionObserver = new IntersectionObserver(toolbarIntersection, {
                      root: contentEl,
                      threshold: [0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
                    });
                    this.intersectionObserver.observe(scrollHeaderIndex.toolbars[scrollHeaderIndex.toolbars.length - 1].el);
                    /**
                     * Handle scaling of large iOS titles and
                     * showing/hiding border on last toolbar
                     * in primary header
                     */

                    this.contentScrollCallback = function () {
                      handleContentScroll(_this5.scrollEl, scrollHeaderIndex, contentEl);
                    };

                    this.scrollEl.addEventListener('scroll', this.contentScrollCallback);
                    Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["c"])(function () {
                      if (_this5.collapsibleMainHeader !== undefined) {
                        _this5.collapsibleMainHeader.classList.add('header-collapse-main');
                      }
                    });
                    this.collapsibleHeaderInitialized = true;

                  case 25:
                  case "end":
                    return _context6.stop();
                }
              }, _callee6, this);
            }));

            function setupCollapsibleHeader(_x3, _x4) {
              return _setupCollapsibleHeader.apply(this, arguments);
            }

            return setupCollapsibleHeader;
          }()
        }, {
          key: "render",
          value: function render() {
            var translucent = this.translucent,
                inheritedAttributes = this.inheritedAttributes;
            var mode = Object(_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this);
            var collapse = this.collapse || 'none'; // banner role must be at top level, so remove role if inside a menu

            var roleType = Object(_theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_2__["h"])('ion-menu', this.el) ? 'none' : 'banner';
            return Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["H"], Object.assign({
              role: roleType,
              "class": _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, mode, true), "header-".concat(mode), true), "header-translucent", this.translucent), "header-collapse-".concat(collapse), true), "header-translucent-".concat(mode), this.translucent)
            }, inheritedAttributes), mode === 'ios' && translucent && Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
              "class": "header-background"
            }), Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null));
          }
        }, {
          key: "el",
          get: function get() {
            return Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["i"])(this);
          }
        }]);
      }();

      Header.style = {
        ios: headerIosCss,
        md: headerMdCss
      };
      var routeOutletCss = ":host{left:0;right:0;top:0;bottom:0;position:absolute;contain:layout size style;overflow:hidden;z-index:0}";

      var RouterOutlet = /*#__PURE__*/function () {
        function RouterOutlet(hostRef) {
          _classCallCheck(this, RouterOutlet);

          Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
          this.ionNavWillLoad = Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionNavWillLoad", 7);
          this.ionNavWillChange = Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionNavWillChange", 3);
          this.ionNavDidChange = Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionNavDidChange", 3);
          this.gestureOrAnimationInProgress = false;
          /**
           * The mode determines which platform styles to use.
           */

          this.mode = Object(_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this);
          /**
           * If `true`, the router-outlet should animate the transition of components.
           */

          this.animated = true;
        }

        return _createClass(RouterOutlet, [{
          key: "swipeHandlerChanged",
          value: function swipeHandlerChanged() {
            if (this.gesture) {
              this.gesture.enable(this.swipeHandler !== undefined);
            }
          }
        }, {
          key: "connectedCallback",
          value: function () {
            var _connectedCallback = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
              var _this6 = this;

              var onStart;
              return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    onStart = function onStart() {
                      _this6.gestureOrAnimationInProgress = true;

                      if (_this6.swipeHandler) {
                        _this6.swipeHandler.onStart();
                      }
                    };

                    _context7.next = 3;
                    return __webpack_require__.e(
                    /*! import() | swipe-back-1bbd08e0-js */
                    "swipe-back-1bbd08e0-js").then(__webpack_require__.bind(null,
                    /*! ./swipe-back-1bbd08e0.js */
                    "./node_modules/@ionic/core/dist/esm/swipe-back-1bbd08e0.js"));

                  case 3:
                    this.gesture = _context7.sent.createSwipeBackGesture(this.el, function () {
                      return !_this6.gestureOrAnimationInProgress && !!_this6.swipeHandler && _this6.swipeHandler.canStart();
                    }, function () {
                      return onStart();
                    }, function (step) {
                      return _this6.ani && _this6.ani.progressStep(step);
                    }, function (shouldComplete, step, dur) {
                      if (_this6.ani) {
                        _this6.ani.onFinish(function () {
                          _this6.gestureOrAnimationInProgress = false;

                          if (_this6.swipeHandler) {
                            _this6.swipeHandler.onEnd(shouldComplete);
                          }
                        }, {
                          oneTimeCallback: true
                        }); // Account for rounding errors in JS


                        var newStepValue = shouldComplete ? -0.001 : 0.001;
                        /**
                         * Animation will be reversed here, so need to
                         * reverse the easing curve as well
                         *
                         * Additionally, we need to account for the time relative
                         * to the new easing curve, as `stepValue` is going to be given
                         * in terms of a linear curve.
                         */

                        if (!shouldComplete) {
                          _this6.ani.easing('cubic-bezier(1, 0, 0.68, 0.28)');

                          newStepValue += Object(_cubic_bezier_eea9a7a9_js__WEBPACK_IMPORTED_MODULE_4__["g"])([0, 0], [1, 0], [0.68, 0.28], [1, 1], step)[0];
                        } else {
                          newStepValue += Object(_cubic_bezier_eea9a7a9_js__WEBPACK_IMPORTED_MODULE_4__["g"])([0, 0], [0.32, 0.72], [0, 1], [1, 1], step)[0];
                        }

                        _this6.ani.progressEnd(shouldComplete ? 1 : 0, newStepValue, dur);
                      } else {
                        _this6.gestureOrAnimationInProgress = false;
                      }
                    });
                    this.swipeHandlerChanged();

                  case 5:
                  case "end":
                    return _context7.stop();
                }
              }, _callee7, this);
            }));

            function connectedCallback() {
              return _connectedCallback.apply(this, arguments);
            }

            return connectedCallback;
          }()
        }, {
          key: "componentWillLoad",
          value: function componentWillLoad() {
            this.ionNavWillLoad.emit();
          }
        }, {
          key: "disconnectedCallback",
          value: function disconnectedCallback() {
            if (this.gesture) {
              this.gesture.destroy();
              this.gesture = undefined;
            }
          }
          /** @internal */

        }, {
          key: "commit",
          value: function () {
            var _commit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(enteringEl, leavingEl, opts) {
              var unlock, changed;
              return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.next = 2;
                    return this.lock();

                  case 2:
                    unlock = _context8.sent;
                    changed = false;
                    _context8.prev = 4;
                    _context8.next = 7;
                    return this.transition(enteringEl, leavingEl, opts);

                  case 7:
                    changed = _context8.sent;
                    _context8.next = 13;
                    break;

                  case 10:
                    _context8.prev = 10;
                    _context8.t0 = _context8["catch"](4);
                    console.error(_context8.t0);

                  case 13:
                    unlock();
                    return _context8.abrupt("return", changed);

                  case 15:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8, this, [[4, 10]]);
            }));

            function commit(_x5, _x6, _x7) {
              return _commit.apply(this, arguments);
            }

            return commit;
          }()
          /** @internal */

        }, {
          key: "setRouteId",
          value: function () {
            var _setRouteId = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(id, params, direction, animation) {
              var changed;
              return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                while (1) switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.next = 2;
                    return this.setRoot(id, params, {
                      duration: direction === 'root' ? 0 : undefined,
                      direction: direction === 'back' ? 'back' : 'forward',
                      animationBuilder: animation
                    });

                  case 2:
                    changed = _context9.sent;
                    return _context9.abrupt("return", {
                      changed: changed,
                      element: this.activeEl
                    });

                  case 4:
                  case "end":
                    return _context9.stop();
                }
              }, _callee9, this);
            }));

            function setRouteId(_x8, _x9, _x10, _x11) {
              return _setRouteId.apply(this, arguments);
            }

            return setRouteId;
          }()
          /** @internal */

        }, {
          key: "getRouteId",
          value: function () {
            var _getRouteId = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
              var active;
              return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                while (1) switch (_context10.prev = _context10.next) {
                  case 0:
                    active = this.activeEl;
                    return _context10.abrupt("return", active ? {
                      id: active.tagName,
                      element: active
                    } : undefined);

                  case 2:
                  case "end":
                    return _context10.stop();
                }
              }, _callee10, this);
            }));

            function getRouteId() {
              return _getRouteId.apply(this, arguments);
            }

            return getRouteId;
          }()
        }, {
          key: "setRoot",
          value: function () {
            var _setRoot = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(component, params, opts) {
              var leavingEl, enteringEl;
              return _regeneratorRuntime().wrap(function _callee11$(_context11) {
                while (1) switch (_context11.prev = _context11.next) {
                  case 0:
                    if (!(this.activeComponent === component)) {
                      _context11.next = 2;
                      break;
                    }

                    return _context11.abrupt("return", false);

                  case 2:
                    // attach entering view to DOM
                    leavingEl = this.activeEl;
                    _context11.next = 5;
                    return Object(_framework_delegate_94e770cc_js__WEBPACK_IMPORTED_MODULE_5__["a"])(this.delegate, this.el, component, ['ion-page', 'ion-page-invisible'], params);

                  case 5:
                    enteringEl = _context11.sent;
                    this.activeComponent = component;
                    this.activeEl = enteringEl; // commit animation

                    _context11.next = 10;
                    return this.commit(enteringEl, leavingEl, opts);

                  case 10:
                    _context11.next = 12;
                    return Object(_framework_delegate_94e770cc_js__WEBPACK_IMPORTED_MODULE_5__["d"])(this.delegate, leavingEl);

                  case 12:
                    return _context11.abrupt("return", true);

                  case 13:
                  case "end":
                    return _context11.stop();
                }
              }, _callee11, this);
            }));

            function setRoot(_x12, _x13, _x14) {
              return _setRoot.apply(this, arguments);
            }

            return setRoot;
          }()
        }, {
          key: "transition",
          value: function () {
            var _transition = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(enteringEl, leavingEl) {
              var _this7 = this;

              var opts,
                  el,
                  mode,
                  animated,
                  animationBuilder,
                  _args12 = arguments;
              return _regeneratorRuntime().wrap(function _callee12$(_context12) {
                while (1) switch (_context12.prev = _context12.next) {
                  case 0:
                    opts = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : {};

                    if (!(leavingEl === enteringEl)) {
                      _context12.next = 3;
                      break;
                    }

                    return _context12.abrupt("return", false);

                  case 3:
                    // emit nav will change event
                    this.ionNavWillChange.emit();
                    el = this.el, mode = this.mode;
                    animated = this.animated && _ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["c"].getBoolean('animated', true);
                    animationBuilder = opts.animationBuilder || this.animation || _ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["c"].get('navAnimation');
                    _context12.next = 9;
                    return Object(_index_a7711c1e_js__WEBPACK_IMPORTED_MODULE_6__["t"])(Object.assign(Object.assign({
                      mode: mode,
                      animated: animated,
                      enteringEl: enteringEl,
                      leavingEl: leavingEl,
                      baseEl: el,
                      progressCallback: opts.progressAnimation ? function (ani) {
                        /**
                         * Because this progress callback is called asynchronously
                         * it is possible for the gesture to start and end before
                         * the animation is ever set. In that scenario, we should
                         * immediately call progressEnd so that the transition promise
                         * resolves and the gesture does not get locked up.
                         */
                        if (ani !== undefined && !_this7.gestureOrAnimationInProgress) {
                          _this7.gestureOrAnimationInProgress = true;
                          ani.onFinish(function () {
                            _this7.gestureOrAnimationInProgress = false;

                            if (_this7.swipeHandler) {
                              _this7.swipeHandler.onEnd(false);
                            }
                          }, {
                            oneTimeCallback: true
                          });
                          /**
                           * Playing animation to beginning
                           * with a duration of 0 prevents
                           * any flickering when the animation
                           * is later cleaned up.
                           */

                          ani.progressEnd(0, 0, 0);
                        } else {
                          _this7.ani = ani;
                        }
                      } : undefined
                    }, opts), {
                      animationBuilder: animationBuilder
                    }));

                  case 9:
                    // emit nav changed event
                    this.ionNavDidChange.emit();
                    return _context12.abrupt("return", true);

                  case 11:
                  case "end":
                    return _context12.stop();
                }
              }, _callee12, this);
            }));

            function transition(_x15, _x16) {
              return _transition.apply(this, arguments);
            }

            return transition;
          }()
        }, {
          key: "lock",
          value: function () {
            var _lock = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
              var p, resolve;
              return _regeneratorRuntime().wrap(function _callee13$(_context13) {
                while (1) switch (_context13.prev = _context13.next) {
                  case 0:
                    p = this.waitPromise;
                    this.waitPromise = new Promise(function (r) {
                      return resolve = r;
                    });

                    if (!(p !== undefined)) {
                      _context13.next = 5;
                      break;
                    }

                    _context13.next = 5;
                    return p;

                  case 5:
                    return _context13.abrupt("return", resolve);

                  case 6:
                  case "end":
                    return _context13.stop();
                }
              }, _callee13, this);
            }));

            function lock() {
              return _lock.apply(this, arguments);
            }

            return lock;
          }()
        }, {
          key: "render",
          value: function render() {
            return Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null);
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
              "swipeHandler": ["swipeHandlerChanged"]
            };
          }
        }]);
      }();

      RouterOutlet.style = routeOutletCss;
      var titleIosCss = ":host{--color:initial;display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;-ms-flex-align:center;align-items:center;-webkit-transform:translateZ(0);transform:translateZ(0);color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}.toolbar-title{display:block;width:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;pointer-events:auto}:host(.title-small) .toolbar-title{white-space:normal}:host{left:0;top:0;padding-left:90px;padding-right:90px;padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);position:absolute;width:100%;height:100%;-webkit-transform:translateZ(0);transform:translateZ(0);font-size:17px;font-weight:600;text-align:center;-webkit-box-sizing:border-box;box-sizing:border-box;pointer-events:none}:host-context([dir=rtl]){left:unset;right:unset;right:0}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:90px;padding-inline-start:90px;-webkit-padding-end:90px;padding-inline-end:90px}}:host(.title-small){padding-left:9px;padding-right:9px;padding-top:6px;padding-bottom:16px;position:relative;font-size:13px;font-weight:normal}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.title-small){padding-left:unset;padding-right:unset;-webkit-padding-start:9px;padding-inline-start:9px;-webkit-padding-end:9px;padding-inline-end:9px}}:host(.title-large){padding-left:16px;padding-right:16px;padding-top:0;padding-bottom:0;-webkit-transform-origin:left center;transform-origin:left center;bottom:0;-ms-flex-align:end;align-items:flex-end;min-width:100%;padding-bottom:6px;font-size:34px;font-weight:700;text-align:start}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.title-large){padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px}}:host(.title-large.title-rtl){-webkit-transform-origin:right center;transform-origin:right center}:host(.title-large.ion-cloned-element){--color:var(--ion-text-color, #000)}:host(.title-large) .toolbar-title{-webkit-transform-origin:inherit;transform-origin:inherit}:host-context([dir=rtl]):host(.title-large) .toolbar-title,:host-context([dir=rtl]).title-large .toolbar-title{-webkit-transform-origin:calc(100% - inherit);transform-origin:calc(100% - inherit)}";
      var titleMdCss = ":host{--color:initial;display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;-ms-flex-align:center;align-items:center;-webkit-transform:translateZ(0);transform:translateZ(0);color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}.toolbar-title{display:block;width:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;pointer-events:auto}:host(.title-small) .toolbar-title{white-space:normal}:host{padding-left:20px;padding-right:20px;padding-top:0;padding-bottom:0;font-size:20px;font-weight:500;letter-spacing:0.0125em}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:20px;padding-inline-start:20px;-webkit-padding-end:20px;padding-inline-end:20px}}:host(.title-small){width:100%;height:100%;font-size:15px;font-weight:normal}";

      var ToolbarTitle = /*#__PURE__*/function () {
        function ToolbarTitle(hostRef) {
          _classCallCheck(this, ToolbarTitle);

          Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
          this.ionStyle = Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this, "ionStyle", 7);
        }

        return _createClass(ToolbarTitle, [{
          key: "sizeChanged",
          value: function sizeChanged() {
            this.emitStyle();
          }
        }, {
          key: "connectedCallback",
          value: function connectedCallback() {
            this.emitStyle();
          }
        }, {
          key: "emitStyle",
          value: function emitStyle() {
            var size = this.getSize();
            this.ionStyle.emit(_defineProperty({}, "title-".concat(size), true));
          }
        }, {
          key: "getSize",
          value: function getSize() {
            return this.size !== undefined ? this.size : 'default';
          }
        }, {
          key: "render",
          value: function render() {
            var mode = Object(_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this);
            var size = this.getSize();
            return Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
              "class": Object(_theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_2__["c"])(this.color, _defineProperty(_defineProperty(_defineProperty({}, mode, true), "title-".concat(size), true), 'title-rtl', document.dir === 'rtl'))
            }, Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
              "class": "toolbar-title"
            }, Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)));
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
              "size": ["sizeChanged"]
            };
          }
        }]);
      }();

      ToolbarTitle.style = {
        ios: titleIosCss,
        md: titleMdCss
      };
      var toolbarIosCss = ":host{--border-width:0;--border-style:solid;--opacity:1;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;padding-left:var(--ion-safe-area-left);padding-right:var(--ion-safe-area-right);display:block;position:relative;width:100%;color:var(--color);font-family:var(--ion-font-family, inherit);contain:content;z-index:10;-webkit-box-sizing:border-box;box-sizing:border-box}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-safe-area-left);padding-inline-start:var(--ion-safe-area-left);-webkit-padding-end:var(--ion-safe-area-right);padding-inline-end:var(--ion-safe-area-right)}}:host(.ion-color){color:var(--ion-color-contrast)}:host(.ion-color) .toolbar-background{background:var(--ion-color-base)}.toolbar-container{padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;width:100%;min-height:var(--min-height);contain:content;overflow:hidden;z-index:10;-webkit-box-sizing:border-box;box-sizing:border-box}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.toolbar-container{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.toolbar-background{left:0;right:0;top:0;bottom:0;position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);contain:strict;opacity:var(--opacity);z-index:-1;pointer-events:none}::slotted(ion-progress-bar){left:0;right:0;bottom:0;position:absolute}:host{--background:var(--ion-toolbar-background, var(--ion-color-step-50, #fff));--color:var(--ion-toolbar-color, var(--ion-text-color, #000));--border-color:var(--ion-toolbar-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.2))));--padding-top:3px;--padding-bottom:3px;--padding-start:4px;--padding-end:4px;--min-height:44px}.toolbar-content{-ms-flex:1;flex:1;-ms-flex-order:4;order:4;min-width:0}:host(.toolbar-segment) .toolbar-content{display:-ms-inline-flexbox;display:inline-flex}:host(.toolbar-searchbar) .toolbar-container{padding-top:0;padding-bottom:0}:host(.toolbar-searchbar) ::slotted(*){-ms-flex-item-align:start;align-self:start}:host(.toolbar-searchbar) ::slotted(ion-chip){margin-top:3px}:host(.toolbar-searchbar) ::slotted(ion-back-button){height:38px}::slotted(ion-buttons){min-height:38px}::slotted([slot=start]){-ms-flex-order:2;order:2}::slotted([slot=secondary]){-ms-flex-order:3;order:3}::slotted([slot=primary]){-ms-flex-order:5;order:5;text-align:end}::slotted([slot=end]){-ms-flex-order:6;order:6;text-align:end}:host(.toolbar-title-large) .toolbar-container{-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:start;align-items:flex-start}:host(.toolbar-title-large) .toolbar-content ion-title{-ms-flex:1;flex:1;-ms-flex-order:8;order:8;min-width:100%}";
      var toolbarMdCss = ":host{--border-width:0;--border-style:solid;--opacity:1;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;padding-left:var(--ion-safe-area-left);padding-right:var(--ion-safe-area-right);display:block;position:relative;width:100%;color:var(--color);font-family:var(--ion-font-family, inherit);contain:content;z-index:10;-webkit-box-sizing:border-box;box-sizing:border-box}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-safe-area-left);padding-inline-start:var(--ion-safe-area-left);-webkit-padding-end:var(--ion-safe-area-right);padding-inline-end:var(--ion-safe-area-right)}}:host(.ion-color){color:var(--ion-color-contrast)}:host(.ion-color) .toolbar-background{background:var(--ion-color-base)}.toolbar-container{padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;width:100%;min-height:var(--min-height);contain:content;overflow:hidden;z-index:10;-webkit-box-sizing:border-box;box-sizing:border-box}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.toolbar-container{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}.toolbar-background{left:0;right:0;top:0;bottom:0;position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);contain:strict;opacity:var(--opacity);z-index:-1;pointer-events:none}::slotted(ion-progress-bar){left:0;right:0;bottom:0;position:absolute}:host{--background:var(--ion-toolbar-background, var(--ion-background-color, #fff));--color:var(--ion-toolbar-color, var(--ion-text-color, #424242));--border-color:var(--ion-toolbar-border-color, var(--ion-border-color, var(--ion-color-step-150, #c1c4cd)));--padding-top:0;--padding-bottom:0;--padding-start:0;--padding-end:0;--min-height:56px}.toolbar-content{-ms-flex:1;flex:1;-ms-flex-order:3;order:3;min-width:0;max-width:100%}::slotted(ion-segment){min-height:var(--min-height)}::slotted(.buttons-first-slot){margin-left:4px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){::slotted(.buttons-first-slot){margin-left:unset;-webkit-margin-start:4px;margin-inline-start:4px}}::slotted(.buttons-last-slot){margin-right:4px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){::slotted(.buttons-last-slot){margin-right:unset;-webkit-margin-end:4px;margin-inline-end:4px}}::slotted([slot=start]){-ms-flex-order:2;order:2}::slotted([slot=secondary]){-ms-flex-order:4;order:4}::slotted([slot=primary]){-ms-flex-order:5;order:5;text-align:end}::slotted([slot=end]){-ms-flex-order:6;order:6;text-align:end}";

      var Toolbar = /*#__PURE__*/function () {
        function Toolbar(hostRef) {
          _classCallCheck(this, Toolbar);

          Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
          this.childrenStyles = new Map();
        }

        return _createClass(Toolbar, [{
          key: "componentWillLoad",
          value: function componentWillLoad() {
            var buttons = Array.from(this.el.querySelectorAll('ion-buttons'));
            var firstButtons = buttons.find(function (button) {
              return button.slot === 'start';
            });

            if (firstButtons) {
              firstButtons.classList.add('buttons-first-slot');
            }

            var buttonsReversed = buttons.reverse();
            var lastButtons = buttonsReversed.find(function (button) {
              return button.slot === 'end';
            }) || buttonsReversed.find(function (button) {
              return button.slot === 'primary';
            }) || buttonsReversed.find(function (button) {
              return button.slot === 'secondary';
            });

            if (lastButtons) {
              lastButtons.classList.add('buttons-last-slot');
            }
          }
        }, {
          key: "childrenStyle",
          value: function childrenStyle(ev) {
            ev.stopPropagation();
            var tagName = ev.target.tagName;
            var updatedStyles = ev.detail;
            var newStyles = {};
            var childStyles = this.childrenStyles.get(tagName) || {};
            var hasStyleChange = false;
            Object.keys(updatedStyles).forEach(function (key) {
              var childKey = "toolbar-".concat(key);
              var newValue = updatedStyles[key];

              if (newValue !== childStyles[childKey]) {
                hasStyleChange = true;
              }

              if (newValue) {
                newStyles[childKey] = true;
              }
            });

            if (hasStyleChange) {
              this.childrenStyles.set(tagName, newStyles);
              Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["j"])(this);
            }
          }
        }, {
          key: "render",
          value: function render() {
            var mode = Object(_ionic_global_63a97a32_js__WEBPACK_IMPORTED_MODULE_1__["b"])(this);
            var childStyles = {};
            this.childrenStyles.forEach(function (value) {
              Object.assign(childStyles, value);
            });
            return Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
              "class": Object.assign(Object.assign({}, childStyles), Object(_theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_2__["c"])(this.color, _defineProperty(_defineProperty({}, mode, true), 'in-toolbar', Object(_theme_ff3fc52f_js__WEBPACK_IMPORTED_MODULE_2__["h"])('ion-toolbar', this.el))))
            }, Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
              "class": "toolbar-background"
            }), Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
              "class": "toolbar-container"
            }, Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", {
              name: "start"
            }), Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", {
              name: "secondary"
            }), Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
              "class": "toolbar-content"
            }, Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)), Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", {
              name: "primary"
            }), Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", {
              name: "end"
            })));
          }
        }, {
          key: "el",
          get: function get() {
            return Object(_index_7a8b7a1c_js__WEBPACK_IMPORTED_MODULE_0__["i"])(this);
          }
        }]);
      }();

      Toolbar.style = {
        ios: toolbarIosCss,
        md: toolbarMdCss
      };
      /***/
    }
  }]);
})();
//# sourceMappingURL=2-es5.js.map