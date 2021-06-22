"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.pathConvertToCacheKey = exports.getPathCompFromKey = exports.isExisedTheUrl = exports.getNavListFromMenuList = exports.goToAndClose = exports.goTo = exports.handleAfterLogin=exports.setStoreData = void 0);
var _react = require("react"),
  _react2 = _interopRequireDefault(_react),
  _reactRouterCacheRoute = require("react-router-cache-route"),
  _pathToRegexp = require("path-to-regexp"),
  _pathToRegexp2 = _interopRequireDefault(_pathToRegexp),
  _store = require("../util/store"),
  _history = require("../util/history"),
  _index = require("../constant/index"),
  _index2 = _interopRequireDefault(_index),
  _tabRouter = require("../util/tabRouter.js");
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
function ownKeys(t, e) {
  var r,
    o = Object.keys(t);
  return (
    Object.getOwnPropertySymbols &&
      ((r = Object.getOwnPropertySymbols(t)),
      e &&
        (r = r.filter(function(e) {
          return Object.getOwnPropertyDescriptor(t, e).enumerable;
        })),
      o.push.apply(o, r)),
    o
  );
}
function _objectSpread(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = null != arguments[e] ? arguments[e] : {};
    e % 2
      ? ownKeys(Object(r), !0).forEach(function(e) {
          _defineProperty(t, e, r[e]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
        : ownKeys(Object(r)).forEach(function(e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
          });
  }
  return t;
}
function _defineProperty(e, t, r) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0
        })
      : (e[t] = r),
    e
  );
}
var setStoreData = function(
    e,
    t,
    r,
    o,
    n,
    a,
    u,
    i
  ) {
    _store.authStore.set(_index2.default.AUTH_USER_INFO, e),
      _store.authStore.set(_index2.default.SUBSYSLIST, t),
      _store.authStore.set(_index2.default.AUTH_USER_ISLOGIN, r),
      _store.authStore.set(_index2.default.INIT_URL, o),
      _store.cacheStore.set(_index2.default.CACHE_DICT_LIST, n),
      _store.cacheStore.set(_index2.default.CACHE_ORG_LIST, a),
      _store.cacheStore.set(_index2.default.CACHE_ROLE_INFO, i),
      _store.authStore.set(_index2.default.MULTISUBSYSTYPE, u);
  }
  handleAfterLogin = function(e) {
    var t,
      r,
      o,
      n = e.reply.user,
      a = (e.reply.menuList, e.reply.sysDictList),
      u = e.reply.sysOrgList,
      i = e.reply.roleInfo,
      s = e.reply.subsysList,
      l = e.reply.multisubsysType;
    if (
      (setStoreData(n, s, !0, "/", a, u, l, i),
      _index2.default.NEED_HOME_INDEX)
    ) {
      if (_store.authStore.get(_index2.default.FROM_HOME_INDEX)) {
        var _ = e.reply.menuList;
        return (
          _store.menuStore.set(_index2.default.MENU_INFO, _),
          _store.navStore.set(
            _index2.default.NAV_LIST,
            (0, _tabRouter.getNavListFromMenuList)(_)
          ),
          !1
        );
      }
      _history.history.push(_index2.default.LOGINED_SELFHOME_URL);
    } else {
      
        "select" === l
          ? ((t = e.reply.subsysList),
            _store.authStore.set(_index2.default.SUB_SYSTEM_LIST, t),
            _history.history.push(_index2.default.SHOW_SUBSYSTEM_URL))
          : ("false" !== l && "multi" !== l && l) ||
            ((r = e.reply.menuList),
            (o = e.reply.permType),
            _store.authStore.set(_index2.default.CURRENT_PERMTYPE, o),
            _store.menuStore.set(_index2.default.MENU_INFO, r),
            _store.navStore.set(
              _index2.default.NAV_LIST,
              (0, _tabRouter.getNavListFromMenuList)(r)
            ),
            _history.history.push("/"));
    }
  };
  (exports.setStoreData = setStoreData),
  (exports.handleAfterLogin = handleAfterLogin);
