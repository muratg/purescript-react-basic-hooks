"use strict";

var React = require("react");

exports.memo_ = React.memo;

exports.useState_ = function useState_(tuple, initialState) {
  var r = React.useState(initialState);
  var state = r[0];
  var setState = r[1];
  return tuple(state, function(update) {
    return function() {
      return setState(update);
    };
  });
};

exports.useEffect_ = function useEffect_(eq, key, effect) {
  var memoizedKey = exports.useMemo_(eq, key);
  React.useEffect(effect, [memoizedKey]);
};

exports.useLayoutEffect_ = function useLayoutEffect_(eq, key, effect) {
  var memoizedKey = exports.useMemo_(eq, key);
  React.useLayoutEffect(effect, [memoizedKey]);
};

exports.useReducer_ = function useReducer_(tuple, reducer, initialState, initialAction) {
  var r = React.useReducer(reducer, initialState, initialAction);
  var state = r[0];
  var dispatch = r[1];
  return tuple(state, function(action) {
    return function() {
      return dispatch(action);
    };
  });
};

exports.useRef_ = React.useRef;

exports.readRef_ = function(ref) {
  return ref.current;
};

exports.writeRef_ = function(ref, a) {
  ref.current = a;
};

exports.useContext_ = React.useContext;

exports.createContext = React.createContext;

exports.contextProvider_ = function contextProvider_(context) {
  return context.Provider;
};

exports.useMemo_ = function useMemo_(eq, a) {
  var memoRef = React.useRef(a);
  if (memoRef.current !== a && !eq(memoRef.current, a)) {
    memoRef.current = a;
  }
  return memoRef.current;
};

exports.useMemoLazy_ = function useMemoLazy_(eq, key, computeA) {
  var memoizedKey = exports.useMemo_(eq, key);
  return React.useMemo(computeA, [memoizedKey]);
};

exports.unsafeSetDisplayName = function unsafeSetDisplayName(displayName, component) {
  component.displayName = displayName;
  component.toString = function() {
    return displayName;
  };
  return component;
};

exports.displayName = function displayName(component) {
  return typeof component === "string" ? component : component.displayName || "[unknown]";
};
