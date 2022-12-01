'use strict';

var anime = require('animejs/lib/anime.es.js');

function clamp(v, min, max) {
  return Math.max(min, Math.min(v, max));
}
const V = {
  toVector(v, fallback) {
    if (v === undefined) v = fallback;
    return Array.isArray(v) ? v : [v, v];
  },
  add(v1, v2) {
    return [v1[0] + v2[0], v1[1] + v2[1]];
  },
  sub(v1, v2) {
    return [v1[0] - v2[0], v1[1] - v2[1]];
  },
  addTo(v1, v2) {
    v1[0] += v2[0];
    v1[1] += v2[1];
  },
  subTo(v1, v2) {
    v1[0] -= v2[0];
    v1[1] -= v2[1];
  }
};

function rubberband(distance, dimension, constant) {
  if (dimension === 0 || Math.abs(dimension) === Infinity) return Math.pow(distance, constant * 5);
  return distance * dimension * constant / (dimension + constant * distance);
}
function rubberbandIfOutOfBounds(position, min, max, constant = 0.15) {
  if (constant === 0) return clamp(position, min, max);
  if (position < min) return -rubberband(min - position, max - min, constant) + min;
  if (position > max) return +rubberband(position - max, max - min, constant) + max;
  return position;
}
function computeRubberband(bounds, [Vx, Vy], [Rx, Ry]) {
  const [[X0, X1], [Y0, Y1]] = bounds;
  return [rubberbandIfOutOfBounds(Vx, X0, X1, Rx), rubberbandIfOutOfBounds(Vy, Y0, Y1, Ry)];
}

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) {
      _defineProperty$1(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}

const EVENT_TYPE_MAP = {
  pointer: {
    start: 'down',
    change: 'move',
    end: 'up'
  },
  mouse: {
    start: 'down',
    change: 'move',
    end: 'up'
  },
  touch: {
    start: 'start',
    change: 'move',
    end: 'end'
  },
  gesture: {
    start: 'start',
    change: 'change',
    end: 'end'
  }
};
function capitalize(string) {
  if (!string) return '';
  return string[0].toUpperCase() + string.slice(1);
}
const actionsWithoutCaptureSupported = ['enter', 'leave'];
function hasCapture(capture = false, actionKey) {
  return capture && !actionsWithoutCaptureSupported.includes(actionKey);
}
function toHandlerProp(device, action = '', capture = false) {
  const deviceProps = EVENT_TYPE_MAP[device];
  const actionKey = deviceProps ? deviceProps[action] || action : action;
  return 'on' + capitalize(device) + capitalize(actionKey) + (hasCapture(capture, actionKey) ? 'Capture' : '');
}
const pointerCaptureEvents = ['gotpointercapture', 'lostpointercapture'];
function parseProp(prop) {
  let eventKey = prop.substring(2).toLowerCase();
  const passive = !!~eventKey.indexOf('passive');
  if (passive) eventKey = eventKey.replace('passive', '');
  const captureKey = pointerCaptureEvents.includes(eventKey) ? 'capturecapture' : 'capture';
  const capture = !!~eventKey.indexOf(captureKey);
  if (capture) eventKey = eventKey.replace('capture', '');
  return {
    device: eventKey,
    capture,
    passive
  };
}
function toDomEventType(device, action = '') {
  const deviceProps = EVENT_TYPE_MAP[device];
  const actionKey = deviceProps ? deviceProps[action] || action : action;
  return device + actionKey;
}
function isTouch(event) {
  return 'touches' in event;
}
function getPointerType(event) {
  if (isTouch(event)) return 'touch';
  if ('pointerType' in event) return event.pointerType;
  return 'mouse';
}
function getCurrentTargetTouchList(event) {
  return Array.from(event.touches).filter(e => {
    var _event$currentTarget, _event$currentTarget$;
    return e.target === event.currentTarget || ((_event$currentTarget = event.currentTarget) === null || _event$currentTarget === void 0 ? void 0 : (_event$currentTarget$ = _event$currentTarget.contains) === null || _event$currentTarget$ === void 0 ? void 0 : _event$currentTarget$.call(_event$currentTarget, e.target));
  });
}
function getTouchList(event) {
  return event.type === 'touchend' || event.type === 'touchcancel' ? event.changedTouches : event.targetTouches;
}
function getValueEvent(event) {
  return isTouch(event) ? getTouchList(event)[0] : event;
}
function distanceAngle(P1, P2) {
  const dx = P2.clientX - P1.clientX;
  const dy = P2.clientY - P1.clientY;
  const cx = (P2.clientX + P1.clientX) / 2;
  const cy = (P2.clientY + P1.clientY) / 2;
  const distance = Math.hypot(dx, dy);
  const angle = -(Math.atan2(dx, dy) * 180) / Math.PI;
  const origin = [cx, cy];
  return {
    angle,
    distance,
    origin
  };
}
function touchIds(event) {
  return getCurrentTargetTouchList(event).map(touch => touch.identifier);
}
function touchDistanceAngle(event, ids) {
  const [P1, P2] = Array.from(event.touches).filter(touch => ids.includes(touch.identifier));
  return distanceAngle(P1, P2);
}
function pointerId(event) {
  const valueEvent = getValueEvent(event);
  return isTouch(event) ? valueEvent.identifier : valueEvent.pointerId;
}
function pointerValues(event) {
  const valueEvent = getValueEvent(event);
  return [valueEvent.clientX, valueEvent.clientY];
}

const LINE_HEIGHT = 40;
const PAGE_HEIGHT = 800;
function wheelValues(event) {
  let {
    deltaX,
    deltaY,
    deltaMode
  } = event;
  if (deltaMode === 1) {
    deltaX *= LINE_HEIGHT;
    deltaY *= LINE_HEIGHT;
  } else if (deltaMode === 2) {
    deltaX *= PAGE_HEIGHT;
    deltaY *= PAGE_HEIGHT;
  }
  return [deltaX, deltaY];
}
function scrollValues(event) {
  var _ref, _ref2;
  const {
    scrollX,
    scrollY,
    scrollLeft,
    scrollTop
  } = event.currentTarget;
  return [(_ref = scrollX !== null && scrollX !== void 0 ? scrollX : scrollLeft) !== null && _ref !== void 0 ? _ref : 0, (_ref2 = scrollY !== null && scrollY !== void 0 ? scrollY : scrollTop) !== null && _ref2 !== void 0 ? _ref2 : 0];
}
function getEventDetails(event) {
  const payload = {};
  if ('buttons' in event) payload.buttons = event.buttons;
  if ('shiftKey' in event) {
    const {
      shiftKey,
      altKey,
      metaKey,
      ctrlKey
    } = event;
    Object.assign(payload, {
      shiftKey,
      altKey,
      metaKey,
      ctrlKey
    });
  }
  return payload;
}

function call(v, ...args) {
  if (typeof v === 'function') {
    return v(...args);
  } else {
    return v;
  }
}
function noop() {}
function chain(...fns) {
  if (fns.length === 0) return noop;
  if (fns.length === 1) return fns[0];
  return function () {
    let result;
    for (const fn of fns) {
      result = fn.apply(this, arguments) || result;
    }
    return result;
  };
}
function assignDefault(value, fallback) {
  return Object.assign({}, fallback, value || {});
}

const BEFORE_LAST_KINEMATICS_DELAY = 32;

class Engine {

  constructor(ctrl, args, key) {
    this.ctrl = ctrl;
    this.args = args;
    this.key = key;
    if (!this.state) {
      this.state = {};
      this.computeValues([0, 0]);
      this.computeInitial();
      if (this.init) this.init();
      this.reset();
    }
  }

  get state() {
    return this.ctrl.state[this.key];
  }
  set state(state) {
    this.ctrl.state[this.key] = state;
  }
  get shared() {
    return this.ctrl.state.shared;
  }
  get eventStore() {
    return this.ctrl.gestureEventStores[this.key];
  }
  get timeoutStore() {
    return this.ctrl.gestureTimeoutStores[this.key];
  }
  get config() {
    return this.ctrl.config[this.key];
  }
  get sharedConfig() {
    return this.ctrl.config.shared;
  }
  get handler() {
    return this.ctrl.handlers[this.key];
  }
  reset() {
    const {
      state,
      shared,
      ingKey,
      args
    } = this;
    shared[ingKey] = state._active = state.active = state._blocked = state._force = false;
    state._step = [false, false];
    state.intentional = false;
    state._movement = [0, 0];
    state._distance = [0, 0];
    state._direction = [0, 0];
    state._delta = [0, 0];
    state._bounds = [[-Infinity, Infinity], [-Infinity, Infinity]];
    state.args = args;
    state.axis = undefined;
    state.memo = undefined;
    state.elapsedTime = 0;
    state.direction = [0, 0];
    state.distance = [0, 0];
    state.overflow = [0, 0];
    state._movementBound = [false, false];
    state.velocity = [0, 0];
    state.movement = [0, 0];
    state.delta = [0, 0];
    state.timeStamp = 0;
  }
  start(event) {
    const state = this.state;
    const config = this.config;
    if (!state._active) {
      this.reset();
      this.computeInitial();
      state._active = true;
      state.target = event.target;
      state.currentTarget = event.currentTarget;
      state.lastOffset = config.from ? call(config.from, state) : state.offset;
      state.offset = state.lastOffset;
    }
    state.startTime = state.timeStamp = event.timeStamp;
  }

  computeValues(values) {
    const state = this.state;
    state._values = values;
    state.values = this.config.transform(values);
  }

  computeInitial() {
    const state = this.state;
    state._initial = state._values;
    state.initial = state.values;
  }

  compute(event) {
    const {
      state,
      config,
      shared
    } = this;
    state.args = this.args;
    let dt = 0;
    if (event) {
      state.event = event;
      if (config.preventDefault && event.cancelable) state.event.preventDefault();
      state.type = event.type;
      shared.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size;
      shared.locked = !!document.pointerLockElement;
      Object.assign(shared, getEventDetails(event));
      shared.down = shared.pressed = shared.buttons % 2 === 1 || shared.touches > 0;

      dt = event.timeStamp - state.timeStamp;
      state.timeStamp = event.timeStamp;
      state.elapsedTime = state.timeStamp - state.startTime;
    }

    if (state._active) {
      const _absoluteDelta = state._delta.map(Math.abs);
      V.addTo(state._distance, _absoluteDelta);
    }

    if (this.axisIntent) this.axisIntent(event);

    const [_m0, _m1] = state._movement;
    const [t0, t1] = config.threshold;
    const {
      _step,
      values
    } = state;
    if (config.hasCustomTransform) {
      if (_step[0] === false) _step[0] = Math.abs(_m0) >= t0 && values[0];
      if (_step[1] === false) _step[1] = Math.abs(_m1) >= t1 && values[1];
    } else {
      if (_step[0] === false) _step[0] = Math.abs(_m0) >= t0 && Math.sign(_m0) * t0;
      if (_step[1] === false) _step[1] = Math.abs(_m1) >= t1 && Math.sign(_m1) * t1;
    }
    state.intentional = _step[0] !== false || _step[1] !== false;
    if (!state.intentional) return;
    const movement = [0, 0];
    if (config.hasCustomTransform) {
      const [v0, v1] = values;
      movement[0] = _step[0] !== false ? v0 - _step[0] : 0;
      movement[1] = _step[1] !== false ? v1 - _step[1] : 0;
    } else {
      movement[0] = _step[0] !== false ? _m0 - _step[0] : 0;
      movement[1] = _step[1] !== false ? _m1 - _step[1] : 0;
    }
    if (this.restrictToAxis && !state._blocked) this.restrictToAxis(movement);
    const previousOffset = state.offset;
    const gestureIsActive = state._active && !state._blocked || state.active;
    if (gestureIsActive) {
      state.first = state._active && !state.active;
      state.last = !state._active && state.active;
      state.active = shared[this.ingKey] = state._active;
      if (event) {
        if (state.first) {
          if ('bounds' in config) state._bounds = call(config.bounds, state);
          if (this.setup) this.setup();
        }
        state.movement = movement;
        this.computeOffset();
      }
    }
    const [ox, oy] = state.offset;
    const [[x0, x1], [y0, y1]] = state._bounds;
    state.overflow = [ox < x0 ? -1 : ox > x1 ? 1 : 0, oy < y0 ? -1 : oy > y1 ? 1 : 0];

    state._movementBound[0] = state.overflow[0] ? state._movementBound[0] === false ? state._movement[0] : state._movementBound[0] : false;
    state._movementBound[1] = state.overflow[1] ? state._movementBound[1] === false ? state._movement[1] : state._movementBound[1] : false;

    const rubberband = state._active ? config.rubberband || [0, 0] : [0, 0];
    state.offset = computeRubberband(state._bounds, state.offset, rubberband);
    state.delta = V.sub(state.offset, previousOffset);
    this.computeMovement();
    if (gestureIsActive && (!state.last || dt > BEFORE_LAST_KINEMATICS_DELAY)) {
      state.delta = V.sub(state.offset, previousOffset);
      const absoluteDelta = state.delta.map(Math.abs);
      V.addTo(state.distance, absoluteDelta);
      state.direction = state.delta.map(Math.sign);
      state._direction = state._delta.map(Math.sign);
      if (!state.first && dt > 0) {
        state.velocity = [absoluteDelta[0] / dt, absoluteDelta[1] / dt];
      }
    }
  }
  emit() {
    const state = this.state;
    const shared = this.shared;
    const config = this.config;
    if (!state._active) this.clean();

    if ((state._blocked || !state.intentional) && !state._force && !config.triggerAllEvents) return;

    const memo = this.handler(_objectSpread2$1(_objectSpread2$1(_objectSpread2$1({}, shared), state), {}, {
      [this.aliasKey]: state.values
    }));

    if (memo !== undefined) state.memo = memo;
  }
  clean() {
    this.eventStore.clean();
    this.timeoutStore.clean();
  }
}

function selectAxis([dx, dy], threshold) {
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);
  if (absDx > absDy && absDx > threshold) {
    return 'x';
  }
  if (absDy > absDx && absDy > threshold) {
    return 'y';
  }
  return undefined;
}
class CoordinatesEngine extends Engine {
  constructor(...args) {
    super(...args);
    _defineProperty$1(this, "aliasKey", 'xy');
  }
  reset() {
    super.reset();
    this.state.axis = undefined;
  }
  init() {
    this.state.offset = [0, 0];
    this.state.lastOffset = [0, 0];
  }
  computeOffset() {
    this.state.offset = V.add(this.state.lastOffset, this.state.movement);
  }
  computeMovement() {
    this.state.movement = V.sub(this.state.offset, this.state.lastOffset);
  }
  axisIntent(event) {
    const state = this.state;
    const config = this.config;
    if (!state.axis && event) {
      const threshold = typeof config.axisThreshold === 'object' ? config.axisThreshold[getPointerType(event)] : config.axisThreshold;
      state.axis = selectAxis(state._movement, threshold);
    }

    state._blocked = (config.lockDirection || !!config.axis) && !state.axis || !!config.axis && config.axis !== state.axis;
  }
  restrictToAxis(v) {
    if (this.config.axis || this.config.lockDirection) {
      switch (this.state.axis) {
        case 'x':
          v[1] = 0;
          break;
        case 'y':
          v[0] = 0;
          break;
      }
    }
  }
}

const identity = v => v;
const DEFAULT_RUBBERBAND = 0.15;
const commonConfigResolver = {
  enabled(value = true) {
    return value;
  },
  eventOptions(value, _k, config) {
    return _objectSpread2$1(_objectSpread2$1({}, config.shared.eventOptions), value);
  },
  preventDefault(value = false) {
    return value;
  },
  triggerAllEvents(value = false) {
    return value;
  },
  rubberband(value = 0) {
    switch (value) {
      case true:
        return [DEFAULT_RUBBERBAND, DEFAULT_RUBBERBAND];
      case false:
        return [0, 0];
      default:
        return V.toVector(value);
    }
  },
  from(value) {
    if (typeof value === 'function') return value;
    if (value != null) return V.toVector(value);
  },
  transform(value, _k, config) {
    const transform = value || config.shared.transform;
    this.hasCustomTransform = !!transform;
    return transform || identity;
  },
  threshold(value) {
    return V.toVector(value, 0);
  }
};

const DEFAULT_AXIS_THRESHOLD = 0;
const coordinatesConfigResolver = _objectSpread2$1(_objectSpread2$1({}, commonConfigResolver), {}, {
  axis(_v, _k, {
    axis
  }) {
    this.lockDirection = axis === 'lock';
    if (!this.lockDirection) return axis;
  },
  axisThreshold(value = DEFAULT_AXIS_THRESHOLD) {
    return value;
  },
  bounds(value = {}) {
    if (typeof value === 'function') {
      return state => coordinatesConfigResolver.bounds(value(state));
    }
    if ('current' in value) {
      return () => value.current;
    }
    if (typeof HTMLElement === 'function' && value instanceof HTMLElement) {
      return value;
    }
    const {
      left = -Infinity,
      right = Infinity,
      top = -Infinity,
      bottom = Infinity
    } = value;
    return [[left, right], [top, bottom]];
  }
});

const DISPLACEMENT = 10;
const KEYS_DELTA_MAP = {
  ArrowRight: (factor = 1) => [DISPLACEMENT * factor, 0],
  ArrowLeft: (factor = 1) => [-DISPLACEMENT * factor, 0],
  ArrowUp: (factor = 1) => [0, -DISPLACEMENT * factor],
  ArrowDown: (factor = 1) => [0, DISPLACEMENT * factor]
};
class DragEngine extends CoordinatesEngine {
  constructor(...args) {
    super(...args);
    _defineProperty$1(this, "ingKey", 'dragging');
  }
  reset() {
    super.reset();
    const state = this.state;
    state._pointerId = undefined;
    state._pointerActive = false;
    state._keyboardActive = false;
    state._preventScroll = false;
    state._delayed = false;
    state.swipe = [0, 0];
    state.tap = false;
    state.canceled = false;
    state.cancel = this.cancel.bind(this);
  }
  setup() {
    const state = this.state;
    if (state._bounds instanceof HTMLElement) {
      const boundRect = state._bounds.getBoundingClientRect();
      const targetRect = state.currentTarget.getBoundingClientRect();
      const _bounds = {
        left: boundRect.left - targetRect.left + state.offset[0],
        right: boundRect.right - targetRect.right + state.offset[0],
        top: boundRect.top - targetRect.top + state.offset[1],
        bottom: boundRect.bottom - targetRect.bottom + state.offset[1]
      };
      state._bounds = coordinatesConfigResolver.bounds(_bounds);
    }
  }
  cancel() {
    const state = this.state;
    if (state.canceled) return;
    state.canceled = true;
    state._active = false;
    setTimeout(() => {
      this.compute();
      this.emit();
    }, 0);
  }
  setActive() {
    this.state._active = this.state._pointerActive || this.state._keyboardActive;
  }

  clean() {
    this.pointerClean();
    this.state._pointerActive = false;
    this.state._keyboardActive = false;
    super.clean();
  }
  pointerDown(event) {
    const config = this.config;
    const state = this.state;
    if (event.buttons != null && (
    Array.isArray(config.pointerButtons) ? !config.pointerButtons.includes(event.buttons) :
    config.pointerButtons !== -1 && config.pointerButtons !== event.buttons)) return;
    const ctrlIds = this.ctrl.setEventIds(event);
    if (config.pointerCapture) {
      event.target.setPointerCapture(event.pointerId);
    }
    if (
    ctrlIds && ctrlIds.size > 1 && state._pointerActive) return;
    this.start(event);
    this.setupPointer(event);
    state._pointerId = pointerId(event);
    state._pointerActive = true;
    this.computeValues(pointerValues(event));
    this.computeInitial();
    if (config.preventScrollAxis && getPointerType(event) !== 'mouse') {
      state._active = false;
      this.setupScrollPrevention(event);
    } else if (config.delay > 0) {
      this.setupDelayTrigger(event);
      if (config.triggerAllEvents) {
        this.compute(event);
        this.emit();
      }
    } else {
      this.startPointerDrag(event);
    }
  }
  startPointerDrag(event) {
    const state = this.state;
    state._active = true;
    state._preventScroll = true;
    state._delayed = false;
    this.compute(event);
    this.emit();
  }
  pointerMove(event) {
    const state = this.state;
    const config = this.config;
    if (!state._pointerActive) return;

    if (state.type === event.type && event.timeStamp === state.timeStamp) return;
    const id = pointerId(event);
    if (state._pointerId !== undefined && id !== state._pointerId) return;
    const _values = pointerValues(event);
    if (document.pointerLockElement === event.target) {
      state._delta = [event.movementX, event.movementY];
    } else {
      state._delta = V.sub(_values, state._values);
      this.computeValues(_values);
    }
    V.addTo(state._movement, state._delta);
    this.compute(event);

    if (state._delayed && state.intentional) {
      this.timeoutStore.remove('dragDelay');
      state.active = false;
      this.startPointerDrag(event);
      return;
    }
    if (config.preventScrollAxis && !state._preventScroll) {
      if (state.axis) {
        if (state.axis === config.preventScrollAxis || config.preventScrollAxis === 'xy') {
          state._active = false;
          this.clean();
          return;
        } else {
          this.timeoutStore.remove('startPointerDrag');
          this.startPointerDrag(event);
          return;
        }
      } else {
        return;
      }
    }
    this.emit();
  }
  pointerUp(event) {
    this.ctrl.setEventIds(event);
    try {
      if (this.config.pointerCapture && event.target.hasPointerCapture(event.pointerId)) {
        ;
        event.target.releasePointerCapture(event.pointerId);
      }
    } catch (_unused) {
    }
    const state = this.state;
    const config = this.config;
    if (!state._active || !state._pointerActive) return;
    const id = pointerId(event);
    if (state._pointerId !== undefined && id !== state._pointerId) return;
    this.state._pointerActive = false;
    this.setActive();
    this.compute(event);
    const [dx, dy] = state._distance;
    state.tap = dx <= config.tapsThreshold && dy <= config.tapsThreshold;
    if (state.tap && config.filterTaps) {
      state._force = true;
    } else {
      const [dirx, diry] = state.direction;
      const [vx, vy] = state.velocity;
      const [mx, my] = state.movement;
      const [svx, svy] = config.swipe.velocity;
      const [sx, sy] = config.swipe.distance;
      const sdt = config.swipe.duration;
      if (state.elapsedTime < sdt) {
        if (Math.abs(vx) > svx && Math.abs(mx) > sx) state.swipe[0] = dirx;
        if (Math.abs(vy) > svy && Math.abs(my) > sy) state.swipe[1] = diry;
      }
    }
    this.emit();
  }
  pointerClick(event) {
    if (!this.state.tap && event.detail > 0) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  setupPointer(event) {
    const config = this.config;
    const device = config.device;
    if (config.pointerLock) {
      event.currentTarget.requestPointerLock();
    }
    if (!config.pointerCapture) {
      this.eventStore.add(this.sharedConfig.window, device, 'change', this.pointerMove.bind(this));
      this.eventStore.add(this.sharedConfig.window, device, 'end', this.pointerUp.bind(this));
      this.eventStore.add(this.sharedConfig.window, device, 'cancel', this.pointerUp.bind(this));
    }
  }
  pointerClean() {
    if (this.config.pointerLock && document.pointerLockElement === this.state.currentTarget) {
      document.exitPointerLock();
    }
  }
  preventScroll(event) {
    if (this.state._preventScroll && event.cancelable) {
      event.preventDefault();
    }
  }
  setupScrollPrevention(event) {
    this.state._preventScroll = false;
    persistEvent(event);
    const remove = this.eventStore.add(this.sharedConfig.window, 'touch', 'change', this.preventScroll.bind(this), {
      passive: false
    });
    this.eventStore.add(this.sharedConfig.window, 'touch', 'end', remove);
    this.eventStore.add(this.sharedConfig.window, 'touch', 'cancel', remove);
    this.timeoutStore.add('startPointerDrag', this.startPointerDrag.bind(this), this.config.preventScrollDelay, event);
  }
  setupDelayTrigger(event) {
    this.state._delayed = true;
    this.timeoutStore.add('dragDelay', () => {
      this.state._step = [0, 0];
      this.startPointerDrag(event);
    }, this.config.delay);
  }
  keyDown(event) {
    const deltaFn = KEYS_DELTA_MAP[event.key];
    if (deltaFn) {
      const state = this.state;
      const factor = event.shiftKey ? 10 : event.altKey ? 0.1 : 1;
      this.start(event);
      state._delta = deltaFn(factor);
      state._keyboardActive = true;
      V.addTo(state._movement, state._delta);
      this.compute(event);
      this.emit();
    }
  }
  keyUp(event) {
    if (!(event.key in KEYS_DELTA_MAP)) return;
    this.state._keyboardActive = false;
    this.setActive();
    this.compute(event);
    this.emit();
  }
  bind(bindFunction) {
    const device = this.config.device;
    bindFunction(device, 'start', this.pointerDown.bind(this));
    if (this.config.pointerCapture) {
      bindFunction(device, 'change', this.pointerMove.bind(this));
      bindFunction(device, 'end', this.pointerUp.bind(this));
      bindFunction(device, 'cancel', this.pointerUp.bind(this));
      bindFunction('lostPointerCapture', '', this.pointerUp.bind(this));
    }
    if (this.config.keys) {
      bindFunction('key', 'down', this.keyDown.bind(this));
      bindFunction('key', 'up', this.keyUp.bind(this));
    }
    if (this.config.filterTaps) {
      bindFunction('click', '', this.pointerClick.bind(this), {
        capture: true,
        passive: false
      });
    }
  }
}
function persistEvent(event) {
  'persist' in event && typeof event.persist === 'function' && event.persist();
}

const isBrowser = typeof window !== 'undefined' && window.document && window.document.createElement;
function supportsTouchEvents() {
  return isBrowser && 'ontouchstart' in window;
}
function isTouchScreen() {
  return supportsTouchEvents() || isBrowser && window.navigator.maxTouchPoints > 1;
}
function supportsPointerEvents() {
  return isBrowser && 'onpointerdown' in window;
}
function supportsPointerLock() {
  return isBrowser && 'exitPointerLock' in window.document;
}
function supportsGestureEvents() {
  try {
    return 'constructor' in GestureEvent;
  } catch (e) {
    return false;
  }
}
const SUPPORT = {
  isBrowser,
  gesture: supportsGestureEvents(),
  touch: isTouchScreen(),
  touchscreen: isTouchScreen(),
  pointer: supportsPointerEvents(),
  pointerLock: supportsPointerLock()
};

const DEFAULT_PREVENT_SCROLL_DELAY = 250;
const DEFAULT_DRAG_DELAY = 180;
const DEFAULT_SWIPE_VELOCITY = 0.5;
const DEFAULT_SWIPE_DISTANCE = 50;
const DEFAULT_SWIPE_DURATION = 250;
const DEFAULT_DRAG_AXIS_THRESHOLD = {
  mouse: 0,
  touch: 0,
  pen: 8
};
const dragConfigResolver = _objectSpread2$1(_objectSpread2$1({}, coordinatesConfigResolver), {}, {
  device(_v, _k, {
    pointer: {
      touch = false,
      lock = false,
      mouse = false
    } = {}
  }) {
    this.pointerLock = lock && SUPPORT.pointerLock;
    if (SUPPORT.touch && touch) return 'touch';
    if (this.pointerLock) return 'mouse';
    if (SUPPORT.pointer && !mouse) return 'pointer';
    if (SUPPORT.touch) return 'touch';
    return 'mouse';
  },
  preventScrollAxis(value, _k, {
    preventScroll
  }) {
    this.preventScrollDelay = typeof preventScroll === 'number' ? preventScroll : preventScroll || preventScroll === undefined && value ? DEFAULT_PREVENT_SCROLL_DELAY : undefined;
    if (!SUPPORT.touchscreen || preventScroll === false) return undefined;
    return value ? value : preventScroll !== undefined ? 'y' : undefined;
  },
  pointerCapture(_v, _k, {
    pointer: {
      capture = true,
      buttons = 1
    } = {}
  }) {
    this.pointerButtons = buttons;
    return !this.pointerLock && this.device === 'pointer' && capture;
  },
  keys(value = true) {
    return value;
  },
  threshold(value, _k, {
    filterTaps = false,
    tapsThreshold = 3,
    axis = undefined
  }) {
    const threshold = V.toVector(value, filterTaps ? tapsThreshold : axis ? 1 : 0);
    this.filterTaps = filterTaps;
    this.tapsThreshold = tapsThreshold;
    return threshold;
  },
  swipe({
    velocity = DEFAULT_SWIPE_VELOCITY,
    distance = DEFAULT_SWIPE_DISTANCE,
    duration = DEFAULT_SWIPE_DURATION
  } = {}) {
    return {
      velocity: this.transform(V.toVector(velocity)),
      distance: this.transform(V.toVector(distance)),
      duration
    };
  },
  delay(value = 0) {
    switch (value) {
      case true:
        return DEFAULT_DRAG_DELAY;
      case false:
        return 0;
      default:
        return value;
    }
  },
  axisThreshold(value) {
    if (!value) return DEFAULT_DRAG_AXIS_THRESHOLD;
    return _objectSpread2$1(_objectSpread2$1({}, DEFAULT_DRAG_AXIS_THRESHOLD), value);
  }
});

function clampStateInternalMovementToBounds(state) {
  const [ox, oy] = state.overflow;
  const [dx, dy] = state._delta;
  const [dirx, diry] = state._direction;
  if (ox < 0 && dx > 0 && dirx < 0 || ox > 0 && dx < 0 && dirx > 0) {
    state._movement[0] = state._movementBound[0];
  }
  if (oy < 0 && dy > 0 && diry < 0 || oy > 0 && dy < 0 && diry > 0) {
    state._movement[1] = state._movementBound[1];
  }
}

const SCALE_ANGLE_RATIO_INTENT_DEG = 30;
const PINCH_WHEEL_RATIO = 100;
class PinchEngine extends Engine {
  constructor(...args) {
    super(...args);
    _defineProperty$1(this, "ingKey", 'pinching');
    _defineProperty$1(this, "aliasKey", 'da');
  }
  init() {
    this.state.offset = [1, 0];
    this.state.lastOffset = [1, 0];
    this.state._pointerEvents = new Map();
  }

  reset() {
    super.reset();
    const state = this.state;
    state._touchIds = [];
    state.canceled = false;
    state.cancel = this.cancel.bind(this);
    state.turns = 0;
  }
  computeOffset() {
    const {
      type,
      movement,
      lastOffset
    } = this.state;
    if (type === 'wheel') {
      this.state.offset = V.add(movement, lastOffset);
    } else {
      this.state.offset = [(1 + movement[0]) * lastOffset[0], movement[1] + lastOffset[1]];
    }
  }
  computeMovement() {
    const {
      offset,
      lastOffset
    } = this.state;
    this.state.movement = [offset[0] / lastOffset[0], offset[1] - lastOffset[1]];
  }
  axisIntent() {
    const state = this.state;
    const [_m0, _m1] = state._movement;
    if (!state.axis) {
      const axisMovementDifference = Math.abs(_m0) * SCALE_ANGLE_RATIO_INTENT_DEG - Math.abs(_m1);
      if (axisMovementDifference < 0) state.axis = 'angle';else if (axisMovementDifference > 0) state.axis = 'scale';
    }
  }
  restrictToAxis(v) {
    if (this.config.lockDirection) {
      if (this.state.axis === 'scale') v[1] = 0;else if (this.state.axis === 'angle') v[0] = 0;
    }
  }
  cancel() {
    const state = this.state;
    if (state.canceled) return;
    setTimeout(() => {
      state.canceled = true;
      state._active = false;
      this.compute();
      this.emit();
    }, 0);
  }
  touchStart(event) {
    this.ctrl.setEventIds(event);
    const state = this.state;
    const ctrlTouchIds = this.ctrl.touchIds;
    if (state._active) {
      if (state._touchIds.every(id => ctrlTouchIds.has(id))) return;
    }

    if (ctrlTouchIds.size < 2) return;
    this.start(event);
    state._touchIds = Array.from(ctrlTouchIds).slice(0, 2);
    const payload = touchDistanceAngle(event, state._touchIds);
    this.pinchStart(event, payload);
  }
  pointerStart(event) {
    if (event.buttons != null && event.buttons % 2 !== 1) return;
    this.ctrl.setEventIds(event);
    event.target.setPointerCapture(event.pointerId);
    const state = this.state;
    const _pointerEvents = state._pointerEvents;
    const ctrlPointerIds = this.ctrl.pointerIds;
    if (state._active) {
      if (Array.from(_pointerEvents.keys()).every(id => ctrlPointerIds.has(id))) return;
    }
    if (_pointerEvents.size < 2) {
      _pointerEvents.set(event.pointerId, event);
    }
    if (state._pointerEvents.size < 2) return;
    this.start(event);

    const payload = distanceAngle(...Array.from(_pointerEvents.values()));
    this.pinchStart(event, payload);
  }
  pinchStart(event, payload) {
    const state = this.state;
    state.origin = payload.origin;
    this.computeValues([payload.distance, payload.angle]);
    this.computeInitial();
    this.compute(event);
    this.emit();
  }
  touchMove(event) {
    if (!this.state._active) return;
    const payload = touchDistanceAngle(event, this.state._touchIds);
    this.pinchMove(event, payload);
  }
  pointerMove(event) {
    const _pointerEvents = this.state._pointerEvents;
    if (_pointerEvents.has(event.pointerId)) {
      _pointerEvents.set(event.pointerId, event);
    }
    if (!this.state._active) return;
    const payload = distanceAngle(...Array.from(_pointerEvents.values()));
    this.pinchMove(event, payload);
  }
  pinchMove(event, payload) {
    const state = this.state;
    const prev_a = state._values[1];
    const delta_a = payload.angle - prev_a;
    let delta_turns = 0;
    if (Math.abs(delta_a) > 270) delta_turns += Math.sign(delta_a);
    this.computeValues([payload.distance, payload.angle - 360 * delta_turns]);
    state.origin = payload.origin;
    state.turns = delta_turns;
    state._movement = [state._values[0] / state._initial[0] - 1, state._values[1] - state._initial[1]];
    this.compute(event);
    this.emit();
  }
  touchEnd(event) {
    this.ctrl.setEventIds(event);
    if (!this.state._active) return;
    if (this.state._touchIds.some(id => !this.ctrl.touchIds.has(id))) {
      this.state._active = false;
      this.compute(event);
      this.emit();
    }
  }
  pointerEnd(event) {
    const state = this.state;
    this.ctrl.setEventIds(event);
    try {
      event.target.releasePointerCapture(event.pointerId);
    } catch (_unused) {}
    if (state._pointerEvents.has(event.pointerId)) {
      state._pointerEvents.delete(event.pointerId);
    }
    if (!state._active) return;
    if (state._pointerEvents.size < 2) {
      state._active = false;
      this.compute(event);
      this.emit();
    }
  }
  gestureStart(event) {
    if (event.cancelable) event.preventDefault();
    const state = this.state;
    if (state._active) return;
    this.start(event);
    this.computeValues([event.scale, event.rotation]);
    state.origin = [event.clientX, event.clientY];
    this.compute(event);
    this.emit();
  }
  gestureMove(event) {
    if (event.cancelable) event.preventDefault();
    if (!this.state._active) return;
    const state = this.state;
    this.computeValues([event.scale, event.rotation]);
    state.origin = [event.clientX, event.clientY];
    const _previousMovement = state._movement;
    state._movement = [event.scale - 1, event.rotation];
    state._delta = V.sub(state._movement, _previousMovement);
    this.compute(event);
    this.emit();
  }
  gestureEnd(event) {
    if (!this.state._active) return;
    this.state._active = false;
    this.compute(event);
    this.emit();
  }
  wheel(event) {
    const modifierKey = this.config.modifierKey;
    if (modifierKey && !event[modifierKey]) return;
    if (!this.state._active) this.wheelStart(event);else this.wheelChange(event);
    this.timeoutStore.add('wheelEnd', this.wheelEnd.bind(this));
  }
  wheelStart(event) {
    this.start(event);
    this.wheelChange(event);
  }
  wheelChange(event) {
    const isR3f = ('uv' in event);
    if (!isR3f) {
      if (event.cancelable) {
        event.preventDefault();
      }
    }
    const state = this.state;
    state._delta = [-wheelValues(event)[1] / PINCH_WHEEL_RATIO * state.offset[0], 0];
    V.addTo(state._movement, state._delta);

    clampStateInternalMovementToBounds(state);
    this.state.origin = [event.clientX, event.clientY];
    this.compute(event);
    this.emit();
  }
  wheelEnd() {
    if (!this.state._active) return;
    this.state._active = false;
    this.compute();
    this.emit();
  }
  bind(bindFunction) {
    const device = this.config.device;
    if (!!device) {
      bindFunction(device, 'start', this[device + 'Start'].bind(this));
      bindFunction(device, 'change', this[device + 'Move'].bind(this));
      bindFunction(device, 'end', this[device + 'End'].bind(this));
      bindFunction(device, 'cancel', this[device + 'End'].bind(this));
    }
    if (this.config.pinchOnWheel) {
      bindFunction('wheel', '', this.wheel.bind(this), {
        passive: false
      });
    }
  }
}

const pinchConfigResolver = _objectSpread2$1(_objectSpread2$1({}, commonConfigResolver), {}, {
  device(_v, _k, {
    shared,
    pointer: {
      touch = false
    } = {}
  }) {
    const sharedConfig = shared;
    if (sharedConfig.target && !SUPPORT.touch && SUPPORT.gesture) return 'gesture';
    if (SUPPORT.touch && touch) return 'touch';
    if (SUPPORT.touchscreen) {
      if (SUPPORT.pointer) return 'pointer';
      if (SUPPORT.touch) return 'touch';
    }
  },

  bounds(_v, _k, {
    scaleBounds = {},
    angleBounds = {}
  }) {
    const _scaleBounds = state => {
      const D = assignDefault(call(scaleBounds, state), {
        min: -Infinity,
        max: Infinity
      });
      return [D.min, D.max];
    };
    const _angleBounds = state => {
      const A = assignDefault(call(angleBounds, state), {
        min: -Infinity,
        max: Infinity
      });
      return [A.min, A.max];
    };
    if (typeof scaleBounds !== 'function' && typeof angleBounds !== 'function') return [_scaleBounds(), _angleBounds()];
    return state => [_scaleBounds(state), _angleBounds(state)];
  },
  threshold(value, _k, config) {
    this.lockDirection = config.axis === 'lock';
    const threshold = V.toVector(value, this.lockDirection ? [0.1, 3] : 0);
    return threshold;
  },
  modifierKey(value) {
    if (value === undefined) return 'ctrlKey';
    return value;
  },
  pinchOnWheel(value = true) {
    return value;
  }
});

class MoveEngine extends CoordinatesEngine {
  constructor(...args) {
    super(...args);
    _defineProperty$1(this, "ingKey", 'moving');
  }
  move(event) {
    if (this.config.mouseOnly && event.pointerType !== 'mouse') return;
    if (!this.state._active) this.moveStart(event);else this.moveChange(event);
    this.timeoutStore.add('moveEnd', this.moveEnd.bind(this));
  }
  moveStart(event) {
    this.start(event);
    this.computeValues(pointerValues(event));
    this.compute(event);
    this.computeInitial();
    this.emit();
  }
  moveChange(event) {
    if (!this.state._active) return;
    const values = pointerValues(event);
    const state = this.state;
    state._delta = V.sub(values, state._values);
    V.addTo(state._movement, state._delta);
    this.computeValues(values);
    this.compute(event);
    this.emit();
  }
  moveEnd(event) {
    if (!this.state._active) return;
    this.state._active = false;
    this.compute(event);
    this.emit();
  }
  bind(bindFunction) {
    bindFunction('pointer', 'change', this.move.bind(this));
    bindFunction('pointer', 'leave', this.moveEnd.bind(this));
  }
}

const moveConfigResolver = _objectSpread2$1(_objectSpread2$1({}, coordinatesConfigResolver), {}, {
  mouseOnly: (value = true) => value
});

class ScrollEngine extends CoordinatesEngine {
  constructor(...args) {
    super(...args);
    _defineProperty$1(this, "ingKey", 'scrolling');
  }
  scroll(event) {
    if (!this.state._active) this.start(event);
    this.scrollChange(event);
    this.timeoutStore.add('scrollEnd', this.scrollEnd.bind(this));
  }
  scrollChange(event) {
    if (event.cancelable) event.preventDefault();
    const state = this.state;
    const values = scrollValues(event);
    state._delta = V.sub(values, state._values);
    V.addTo(state._movement, state._delta);
    this.computeValues(values);
    this.compute(event);
    this.emit();
  }
  scrollEnd() {
    if (!this.state._active) return;
    this.state._active = false;
    this.compute();
    this.emit();
  }
  bind(bindFunction) {
    bindFunction('scroll', '', this.scroll.bind(this));
  }
}

const scrollConfigResolver = coordinatesConfigResolver;

class WheelEngine extends CoordinatesEngine {
  constructor(...args) {
    super(...args);
    _defineProperty$1(this, "ingKey", 'wheeling');
  }
  wheel(event) {
    if (!this.state._active) this.start(event);
    this.wheelChange(event);
    this.timeoutStore.add('wheelEnd', this.wheelEnd.bind(this));
  }
  wheelChange(event) {
    const state = this.state;
    state._delta = wheelValues(event);
    V.addTo(state._movement, state._delta);

    clampStateInternalMovementToBounds(state);
    this.compute(event);
    this.emit();
  }
  wheelEnd() {
    if (!this.state._active) return;
    this.state._active = false;
    this.compute();
    this.emit();
  }
  bind(bindFunction) {
    bindFunction('wheel', '', this.wheel.bind(this));
  }
}

const wheelConfigResolver = coordinatesConfigResolver;

class HoverEngine extends CoordinatesEngine {
  constructor(...args) {
    super(...args);
    _defineProperty$1(this, "ingKey", 'hovering');
  }
  enter(event) {
    if (this.config.mouseOnly && event.pointerType !== 'mouse') return;
    this.start(event);
    this.computeValues(pointerValues(event));
    this.compute(event);
    this.emit();
  }
  leave(event) {
    if (this.config.mouseOnly && event.pointerType !== 'mouse') return;
    const state = this.state;
    if (!state._active) return;
    state._active = false;
    const values = pointerValues(event);
    state._movement = state._delta = V.sub(values, state._values);
    this.computeValues(values);
    this.compute(event);
    state.delta = state.movement;
    this.emit();
  }
  bind(bindFunction) {
    bindFunction('pointer', 'enter', this.enter.bind(this));
    bindFunction('pointer', 'leave', this.leave.bind(this));
  }
}

const hoverConfigResolver = _objectSpread2$1(_objectSpread2$1({}, coordinatesConfigResolver), {}, {
  mouseOnly: (value = true) => value
});

const EngineMap = new Map();
const ConfigResolverMap = new Map();
function registerAction(action) {
  EngineMap.set(action.key, action.engine);
  ConfigResolverMap.set(action.key, action.resolver);
}
const dragAction = {
  key: 'drag',
  engine: DragEngine,
  resolver: dragConfigResolver
};
const hoverAction = {
  key: 'hover',
  engine: HoverEngine,
  resolver: hoverConfigResolver
};
const moveAction = {
  key: 'move',
  engine: MoveEngine,
  resolver: moveConfigResolver
};
const pinchAction = {
  key: 'pinch',
  engine: PinchEngine,
  resolver: pinchConfigResolver
};
const scrollAction = {
  key: 'scroll',
  engine: ScrollEngine,
  resolver: scrollConfigResolver
};
const wheelAction = {
  key: 'wheel',
  engine: WheelEngine,
  resolver: wheelConfigResolver
};

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

const sharedConfigResolver = {
  target(value) {
    if (value) {
      return () => 'current' in value ? value.current : value;
    }
    return undefined;
  },
  enabled(value = true) {
    return value;
  },
  window(value = SUPPORT.isBrowser ? window : undefined) {
    return value;
  },
  eventOptions({
    passive = true,
    capture = false
  } = {}) {
    return {
      passive,
      capture
    };
  },
  transform(value) {
    return value;
  }
};

const _excluded = ["target", "eventOptions", "window", "enabled", "transform"];
function resolveWith(config = {}, resolvers) {
  const result = {};
  for (const [key, resolver] of Object.entries(resolvers)) {
    switch (typeof resolver) {
      case 'function':
        {
          result[key] = resolver.call(result, config[key], key, config);
        }
        break;
      case 'object':
        result[key] = resolveWith(config[key], resolver);
        break;
      case 'boolean':
        if (resolver) result[key] = config[key];
        break;
    }
  }
  return result;
}
function parse(newConfig, gestureKey, _config = {}) {
  const _ref = newConfig,
    {
      target,
      eventOptions,
      window,
      enabled,
      transform
    } = _ref,
    rest = _objectWithoutProperties(_ref, _excluded);
  _config.shared = resolveWith({
    target,
    eventOptions,
    window,
    enabled,
    transform
  }, sharedConfigResolver);
  if (gestureKey) {
    const resolver = ConfigResolverMap.get(gestureKey);
    _config[gestureKey] = resolveWith(_objectSpread2$1({
      shared: _config.shared
    }, rest), resolver);
  } else {
    for (const key in rest) {
      const resolver = ConfigResolverMap.get(key);
      if (resolver) {
        _config[key] = resolveWith(_objectSpread2$1({
          shared: _config.shared
        }, rest[key]), resolver);
      }
    }
  }
  return _config;
}

class EventStore {
  constructor(ctrl, gestureKey) {
    _defineProperty$1(this, "_listeners", new Set());
    this._ctrl = ctrl;
    this._gestureKey = gestureKey;
  }
  add(element, device, action, handler, options) {
    const listeners = this._listeners;
    const type = toDomEventType(device, action);
    const _options = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {};
    const eventOptions = _objectSpread2$1(_objectSpread2$1({}, _options), options);
    element.addEventListener(type, handler, eventOptions);
    const remove = () => {
      element.removeEventListener(type, handler, eventOptions);
      listeners.delete(remove);
    };
    listeners.add(remove);
    return remove;
  }
  clean() {
    this._listeners.forEach(remove => remove());
    this._listeners.clear();
  }
}

class TimeoutStore {
  constructor() {
    _defineProperty$1(this, "_timeouts", new Map());
  }
  add(key, callback, ms = 140, ...args) {
    this.remove(key);
    this._timeouts.set(key, window.setTimeout(callback, ms, ...args));
  }
  remove(key) {
    const timeout = this._timeouts.get(key);
    if (timeout) window.clearTimeout(timeout);
  }
  clean() {
    this._timeouts.forEach(timeout => void window.clearTimeout(timeout));
    this._timeouts.clear();
  }
}

class Controller {

  constructor(handlers) {
    _defineProperty$1(this, "gestures", new Set());
    _defineProperty$1(this, "_targetEventStore", new EventStore(this));
    _defineProperty$1(this, "gestureEventStores", {});
    _defineProperty$1(this, "gestureTimeoutStores", {});
    _defineProperty$1(this, "handlers", {});
    _defineProperty$1(this, "config", {});
    _defineProperty$1(this, "pointerIds", new Set());
    _defineProperty$1(this, "touchIds", new Set());
    _defineProperty$1(this, "state", {
      shared: {
        shiftKey: false,
        metaKey: false,
        ctrlKey: false,
        altKey: false
      }
    });
    resolveGestures(this, handlers);
  }
  setEventIds(event) {
    if (isTouch(event)) {
      this.touchIds = new Set(touchIds(event));
      return this.touchIds;
    } else if ('pointerId' in event) {
      if (event.type === 'pointerup' || event.type === 'pointercancel') this.pointerIds.delete(event.pointerId);else if (event.type === 'pointerdown') this.pointerIds.add(event.pointerId);
      return this.pointerIds;
    }
  }
  applyHandlers(handlers, nativeHandlers) {
    this.handlers = handlers;
    this.nativeHandlers = nativeHandlers;
  }
  applyConfig(config, gestureKey) {
    this.config = parse(config, gestureKey, this.config);
  }
  clean() {
    this._targetEventStore.clean();
    for (const key of this.gestures) {
      this.gestureEventStores[key].clean();
      this.gestureTimeoutStores[key].clean();
    }
  }
  effect() {
    if (this.config.shared.target) this.bind();
    return () => this._targetEventStore.clean();
  }
  bind(...args) {
    const sharedConfig = this.config.shared;
    const props = {};
    let target;
    if (sharedConfig.target) {
      target = sharedConfig.target();
      if (!target) return;
    }
    if (sharedConfig.enabled) {
      for (const gestureKey of this.gestures) {
        const gestureConfig = this.config[gestureKey];
        const bindFunction = bindToProps(props, gestureConfig.eventOptions, !!target);
        if (gestureConfig.enabled) {
          const Engine = EngineMap.get(gestureKey);
          new Engine(this, args, gestureKey).bind(bindFunction);
        }
      }

      const nativeBindFunction = bindToProps(props, sharedConfig.eventOptions, !!target);
      for (const eventKey in this.nativeHandlers) {
        nativeBindFunction(eventKey, '',
        event => this.nativeHandlers[eventKey](_objectSpread2$1(_objectSpread2$1({}, this.state.shared), {}, {
          event,
          args
        })), undefined, true);
      }
    }

    for (const handlerProp in props) {
      props[handlerProp] = chain(...props[handlerProp]);
    }

    if (!target) return props;

    for (const handlerProp in props) {
      const {
        device,
        capture,
        passive
      } = parseProp(handlerProp);
      this._targetEventStore.add(target, device, '', props[handlerProp], {
        capture,
        passive
      });
    }
  }
}
function setupGesture(ctrl, gestureKey) {
  ctrl.gestures.add(gestureKey);
  ctrl.gestureEventStores[gestureKey] = new EventStore(ctrl, gestureKey);
  ctrl.gestureTimeoutStores[gestureKey] = new TimeoutStore();
}
function resolveGestures(ctrl, internalHandlers) {
  if (internalHandlers.drag) setupGesture(ctrl, 'drag');
  if (internalHandlers.wheel) setupGesture(ctrl, 'wheel');
  if (internalHandlers.scroll) setupGesture(ctrl, 'scroll');
  if (internalHandlers.move) setupGesture(ctrl, 'move');
  if (internalHandlers.pinch) setupGesture(ctrl, 'pinch');
  if (internalHandlers.hover) setupGesture(ctrl, 'hover');
}
const bindToProps = (props, eventOptions, withPassiveOption) => (device, action, handler, options = {}, isNative = false) => {
  var _options$capture, _options$passive;
  const capture = (_options$capture = options.capture) !== null && _options$capture !== void 0 ? _options$capture : eventOptions.capture;
  const passive = (_options$passive = options.passive) !== null && _options$passive !== void 0 ? _options$passive : eventOptions.passive;
  let handlerProp = isNative ? device : toHandlerProp(device, action, capture);
  if (withPassiveOption && passive) handlerProp += 'Passive';
  props[handlerProp] = props[handlerProp] || [];
  props[handlerProp].push(handler);
};

const RE_NOT_NATIVE = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function sortHandlers(_handlers) {
  const native = {};
  const handlers = {};
  const actions = new Set();
  for (let key in _handlers) {
    if (RE_NOT_NATIVE.test(key)) {
      actions.add(RegExp.lastMatch);
      handlers[key] = _handlers[key];
    } else {
      native[key] = _handlers[key];
    }
  }
  return [handlers, native, actions];
}
function registerGesture(actions, handlers, handlerKey, key, internalHandlers, config) {
  if (!actions.has(handlerKey)) return;
  if (!EngineMap.has(key)) {
    return;
  }
  const startKey = handlerKey + 'Start';
  const endKey = handlerKey + 'End';
  const fn = state => {
    let memo = undefined;
    if (state.first && startKey in handlers) handlers[startKey](state);
    if (handlerKey in handlers) memo = handlers[handlerKey](state);
    if (state.last && endKey in handlers) handlers[endKey](state);
    return memo;
  };
  internalHandlers[key] = fn;
  config[key] = config[key] || {};
}
function parseMergedHandlers(mergedHandlers, mergedConfig) {
  const [handlers, nativeHandlers, actions] = sortHandlers(mergedHandlers);
  const internalHandlers = {};
  registerGesture(actions, handlers, 'onDrag', 'drag', internalHandlers, mergedConfig);
  registerGesture(actions, handlers, 'onWheel', 'wheel', internalHandlers, mergedConfig);
  registerGesture(actions, handlers, 'onScroll', 'scroll', internalHandlers, mergedConfig);
  registerGesture(actions, handlers, 'onPinch', 'pinch', internalHandlers, mergedConfig);
  registerGesture(actions, handlers, 'onMove', 'move', internalHandlers, mergedConfig);
  registerGesture(actions, handlers, 'onHover', 'hover', internalHandlers, mergedConfig);
  return {
    handlers: internalHandlers,
    config: mergedConfig,
    nativeHandlers
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}

class Recognizer {
  constructor(target, handlers, config, gestureKey, nativeHandlers) {
    this._target = target;
    this._gestureKey = gestureKey;
    this._ctrl = new Controller(handlers);
    this._ctrl.applyHandlers(handlers, nativeHandlers);
    this._ctrl.applyConfig(_objectSpread2(_objectSpread2({}, config), {}, {
      target
    }), gestureKey);
    this._ctrl.effect();
  }
  destroy() {
    this._ctrl.clean();
  }
  setConfig(config) {
    this._ctrl.clean();
    this._ctrl.applyConfig(_objectSpread2(_objectSpread2({}, config), {}, {
      target: this._target
    }), this._gestureKey);
    this._ctrl.effect();
  }
}

function createGesture(actions) {
  actions.forEach(registerAction);
  return function (target, _handlers, _config) {
    const {
      handlers,
      nativeHandlers,
      config
    } = parseMergedHandlers(_handlers, _config || {});
    return new Recognizer(target, handlers, config, undefined, nativeHandlers);
  };
}

const Gesture = function Gesture(target, handlers, config) {
  const gestureFunction = createGesture([dragAction, pinchAction, scrollAction, wheelAction, moveAction, hoverAction]);
  return gestureFunction(target, handlers, config || {});
};

function hideOverlay(overlay) {
  anime({
    targets: overlay,
    opacity: 0,
    easing: "spring(1, 85, 35, 3)",
    duration: 0
  });
  setTimeout(() => {
    if (overlay?.classList?.contains("display")) {
      overlay.classList.remove("display");
    }
    if (overlay) overlay.remove();
  }, 300);
  document.body.style.overflow = "scroll";
  // targetBottomSheet.innerHTML = "";
}

function addOverlay(overlay) {
  overlay.classList.add("display");
  anime({
    targets: overlay,
    opacity: 1,
    easing: "spring(1, 85, 35, 3)",
    duration: 0
  });
}

function moveBottomSheet(targetBottomSheet, top, ease, duration) {
  let result = {
    targets: targetBottomSheet,
    translateY: top,
    easing: ease,
    duration
  };
  anime(result);
}

function snapPointConversion(snapPoint) {
  return typeof snapPoint === "string" ? +snapPoint.replace("%", "") : +snapPoint;
}
function checkType(value) {
  return typeof value === "string" ? convertToPx(+value.replace("%", "")) : +value;
}
function convertToPx(percentage) {
  return Math.round(window.innerHeight * percentage / 100);
}
function differenceOfWindowHt(value) {
  return window.innerHeight - value;
}
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }
  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }
  return "unknown";
}

function BottomSheet(props) {
  let {
    snapPoints = ["100%"],
    displayOverlay = false,
    minWidthForModal = 700,
    draggableArea = ``,
    onOpen = () => {},
    onClose = () => {},
    trigger = "",
    content = "",
    onInit = () => {},
    webLayout = "modal",
    openOnLoad = false,
    modalCloseIcon = `<svg width="16" height="12" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33.112 36.9133C34.3649 38.15 36.3963 38.15 37.6492 36.9133C38.9022 35.6766 38.9022 33.6716 37.6492 32.435L24.0375 19L37.6492 5.56496C38.9022 4.3283 38.9022 2.32328 37.6492 1.08662C36.3963 -0.150042 34.3649 -0.150042 33.112 1.08662L19.5002 14.5216L5.88835 1.08655C4.63541 -0.150108 2.60401 -0.150107 1.35108 1.08655C0.0981471 2.32321 0.0981459 4.32824 1.35108 5.5649L14.9629 19L1.35108 32.435C0.0981434 33.6717 0.0981443 35.6767 1.35108 36.9134C2.60401 38.15 4.63541 38.15 5.88834 36.9134L19.5002 23.4783L33.112 36.9133Z" fill="white"/>
    </svg>
    `,
    sideSheetLeftIcon = `
    <svg width="16" height="14" viewBox="0 0 26 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.5046 40.8036C23.2926 42.0804 21.2623 42.1465 19.9698 40.9513L1.76653 24.118C0.474022 22.9228 0.408779 20.9188 1.62081 19.6421L18.6906 1.66043C19.9026 0.383653 21.9329 0.317552 23.2254 1.51279C24.5179 2.70802 24.5832 4.71199 23.3712 5.98876L8.49597 21.6586L24.3589 36.3277C25.6514 37.5229 25.7166 39.5269 24.5046 40.8036Z" fill="white"/>
    </svg> 
    `,
    sideSheetRightIcon = `<svg width="16" height="14" viewBox="0 0 25 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.21057 1.34418C2.46351 0.107522 4.49491 0.107522 5.74784 1.34418L23.3937 18.7608C24.6466 19.9975 24.6466 22.0025 23.3937 23.2392L5.74784 40.6559C4.49491 41.8925 2.46351 41.8925 1.21057 40.6559C-0.0423591 39.4192 -0.0423591 37.4142 1.21057 36.1775L16.5878 21L1.21057 5.82253C-0.0423591 4.58586 -0.0423591 2.58084 1.21057 1.34418Z" fill="white"/>
    </svg>   
    `,
    defaultSideSheetClose = true,
    cleanUpOnClose = false,
    dismissible = true,
    sideSheetSnapPoints = ["10%", "25%", "50%", "100%"],
    velocityThreshold = 0.9,
    distanceThreshold = 150,
    closeOnOverlayClick = true,
    animateOnDrag = {}
  } = props;
  let lastSetSnapPoint;
  content = typeof content !== "string" ? promise.resolve(content).then(value => {
  }) : content;
  let targetid = trigger ? document?.querySelector(`#${trigger}`)?.getAttribute("data-bottomsheet-id") : "";
  let targetBottomSheet = targetid ? document?.querySelector(`#${targetid}`) : "";
  const overlay = document.querySelector(`#${targetBottomSheet?.id}-overlay`) ? document.querySelector(`#${targetBottomSheet?.id}-overlay`) : document.createElement("div");
  overlay.id = `${targetBottomSheet?.id}-overlay`;
  let closeAnimation = `spring(1, 85, 45, 15)`;
  let openAnimation = `spring(1, 85, 35, 5)`;
  document.addEventListener("click", e => {
    setTimeout(() => {
      if (e.target.tagName.toLowerCase() === "input" && getMobileOperatingSystem() === "Android") {
        moveBottomSheet(targetBottomSheet, "0px", getSnapPointAnimation());
      }
    }, 100);
  });
  openOnLoad ? init(openOnLoad) : setTimeout(() => {
    if (trigger && document.querySelector(`#${trigger}`)) {
      document.querySelectorAll(`#${trigger}`).forEach(i => i.addEventListener("click", () => {
        init(false);
      }));
    }
  }, 400);
  function init(openOnLoad = false) {
    document.body.style.overflowY = "contain";
    if (onInit) {
      onInit();
    }
    if (content && !targetBottomSheet) {
      document.body.insertAdjacentHTML("beforeend", content);
      targetBottomSheet = targetid ? document.querySelector(`#${targetid}`) : document.querySelector(`#${new DOMParser().parseFromString(content, "text/html").body.firstChild.id}`);
    } else if (content && !targetBottomSheet.innerHTML) {
      targetBottomSheet.innerHTML = new DOMParser().parseFromString(content, "text/html").body.firstChild.innerHTML;
    }
    if (targetBottomSheet && !document.getElementById(`#${targetBottomSheet.id}`)) {
      document.body.append(targetBottomSheet);
    }
    if (displayOverlay) {
      overlay.classList.add("overlay");
      addOverlay(overlay);
      document.body.appendChild(overlay);
      targetBottomSheet && document.querySelector(".overlay") ? document.body.insertBefore(overlay, targetBottomSheet) : "";
      if (closeOnOverlayClick) {
        overlay.addEventListener("click", () => {
          close(isWeb, dismissible);
        });
      }
    }
    let isWeb = window.innerWidth < minWidthForModal ? false : true;
    if (document.querySelectorAll(`#${targetBottomSheet?.id}`).length < 2) {
      createBottomSheet(targetBottomSheet, isWeb, overlay, openOnLoad);
    } else {
      open(isWeb, openOnLoad);
    }
  }
  function createBottomSheet(targetBottomSheet, isWeb, overlay, openOnLoad) {
    let currentSnapPoint = getCurrentSnapPoint(targetBottomSheet);
    let lastSnapPoint = snapPointConversion(snapPoints[snapPoints.length - 1]);
    let modalClose = document.createElement("div");
    let sideSheetLeft = document.createElement("div");
    let sideSheetRight = document.createElement("div");
    let draggableId = "";
    targetBottomSheet.style.display = "block";
    modalClose.id = "modal-close";
    modalClose.classList.add("close-modal");
    modalClose.addEventListener("click", () => closeModal(targetBottomSheet, overlay));
    sideSheetLeft.id = "side-left";
    defaultSideSheetClose ? sideSheetLeft.addEventListener("click", () => {
      closeLeftSideSheet(targetBottomSheet, overlay);
    }) : "";
    sideSheetRight.id = "side-right";
    defaultSideSheetClose ? sideSheetRight.addEventListener("click", () => closeRightSideSheet(targetBottomSheet)) : "";
    modalClose.insertAdjacentHTML("afterbegin", modalCloseIcon);
    sideSheetLeft.insertAdjacentHTML("afterbegin", sideSheetLeftIcon);
    sideSheetRight.insertAdjacentHTML("afterbegin", sideSheetRightIcon);
    if (draggableArea) {
      if (typeof draggableArea === "string") {
        draggableArea = new DOMParser().parseFromString(draggableArea, "text/xml");
        draggableId = draggableArea.childNodes[0].id;
        draggableArea = draggableArea.childNodes[0];
      } else {
        draggableId = draggableArea?.id;
      }
      draggableArea.setAttribute("data-draggable", "1");
      draggableArea.classList.add("draggable");
    }
    handleCloseIcons(targetBottomSheet, sideSheetLeft, sideSheetRight, isWeb, draggableId, overlay, modalClose);
    isWeb = windowResizeListener(targetBottomSheet, sideSheetLeft, sideSheetRight, isWeb, overlay, modalClose, draggableId);
    setTimeout(() => {
      onOpen();
    }, 300);
    if (lastSetSnapPoint && lastSetSnapPoint < window.innerHeight && window.innerWidth < minWidthForModal) {
      close(isWeb, dismissible);
    } else {
      open(isWeb, openOnLoad);
    }
    targetBottomSheet.click();
    targetBottomSheet.style.overflow = "scroll";
    targetBottomSheet.style.touchAction = "auto";
    setTimeout(() => {
      handleDragGesture(targetBottomSheet, currentSnapPoint, lastSnapPoint, targetBottomSheet, draggableId, overlay, isWeb);
    }, 400);
    if (document.querySelector(`.bottomsheet #${targetBottomSheet.id}`)) {
      document.querySelector(`.bottomsheet #${targetBottomSheet.id}`).style.display = "block";
    }
  }
  function windowResizeListener(targetBottomSheet, sideSheetLeft, sideSheetRight, isWeb, overlay, modalClose, draggableId) {
    window.addEventListener("resize", () => {
      handleCloseIcons(targetBottomSheet, sideSheetLeft, sideSheetRight, isWeb, draggableId, overlay, modalClose);
      if (window.innerWidth < minWidthForModal) isWeb = false;else isWeb = true;
      return isWeb;
    });
    return isWeb;
  }
  function closeModal(targetBottomSheet, overlay) {
    anime({
      targets: targetBottomSheet,
      opacity: 0,
      easing: closeAnimation,
      duration: 0.1,
      translateY: "-40%"
    });
    setTimeout(() => {
      cleanUp(targetBottomSheet);
    }, 500);
    hideOverlay(overlay);
  }
  function close(isWeb = false, dismissible = true, vy = 7) {
    displayOverlay && overlay ? hideOverlay(overlay) : "";
    document.body.style.overflow = "scroll";
    if (!isWeb) {
      anime({
        targets: targetBottomSheet,
        translateY: `${!dismissible ? differenceOfWindowHt(checkType(snapPoints[0])) : convertToPx(100)}px`,
        easing: getSnapPointAnimation(),
        duration: 1
      });
    } else {
      if (webLayout === "modal") {
        closeModal(targetBottomSheet, overlay);
      } else if (webLayout === "sideSheetLeft") {
        closeLeftSideSheet(targetBottomSheet, overlay);
      } else {
        closeRightSideSheet(targetBottomSheet);
      }
    }
    lastSetSnapPoint = convertToPx(100);
    setTimeout(() => {
      if (lastSetSnapPoint >= window.innerHeight) {
        cleanUpOnClose ? cleanUp(targetBottomSheet) : "";
      }
    }, 500);
    hideOverlay(overlay);
    onClose();
  }
  function handleCloseIcons(targetBottomSheet, sideSheetLeft, sideSheetRight, isWeb, draggableId, overlay, modalClose) {
    if (isWeb) {
      if (draggableArea && document.querySelector(`#${targetBottomSheet.id} #${draggableId}`)) {
        targetBottomSheet.removeChild(draggableArea);
      }
      if (webLayout === "modal") {
        targetBottomSheet.classList.add("modal");
      } else {
        targetBottomSheet.classList.add("side-sheet");
      }
      targetBottomSheet.classList.remove("bottomsheet");
      if (!document.querySelector(`#${targetBottomSheet.id} #modal-close`) && webLayout === "modal") {
        targetBottomSheet.prepend(modalClose);
      } else if (!document.querySelector(`#${targetBottomSheet.id} #side-left`) && webLayout === "sideSheetLeft") {
        targetBottomSheet.prepend(sideSheetLeft);
      } else if (!document.querySelector(`#${targetBottomSheet.id} #side-right`) && webLayout === "sideSheetRight") {
        targetBottomSheet.prepend(sideSheetRight);
        closeRightSideSheet(targetBottomSheet);
      }
    } else {
      if (draggableId && !document.querySelector(`#${targetBottomSheet?.id} #${draggableId}`)) {
        targetBottomSheet.prepend(draggableArea);
      }
      if (document.querySelector(`#${targetBottomSheet.id} #modal-close`)) {
        targetBottomSheet.removeChild(modalClose);
      }
      if (document.querySelector(`#${targetBottomSheet.id} #side-left`)) {
        targetBottomSheet.removeChild(sideSheetLeft);
      }
      if (document.querySelector(`#${targetBottomSheet.id} #side-right`)) {
        targetBottomSheet.removeChild(sideSheetRight);
      }
      targetBottomSheet.classList.add("bottomsheet"), targetBottomSheet.classList.remove("modal");
      targetBottomSheet.classList.remove("side-sheet");
    }
  }
  function open(isWeb = false, openOnLoad = false) {
    document.body.style.overflow = "hidden";
    displayOverlay ? addOverlay(overlay) : "";
    if (isWeb) {
      if (webLayout === "sideSheetLeft") {
        targetBottomSheet.style.top = 0;
        targetBottomSheet.style.left = `-100%`;
        setTimeout(() => {
          anime({
            targets: targetBottomSheet,
            left: "0",
            width: sideSheetSnapPoints[0],
            easing: openAnimation,
            duration: 1
          });
        }, 100);
      } else if (webLayout === "sideSheetRight") {
        targetBottomSheet.style.top = 0;
        targetBottomSheet.style.right = `-100%`;
        setTimeout(() => {
          anime({
            targets: targetBottomSheet,
            right: "0",
            width: sideSheetSnapPoints[0],
            easing: openAnimation,
            duration: 1
          });
        }, 100);
      } else {
        targetBottomSheet.style.top = "50%";
        targetBottomSheet.style.opacity = 0;
        targetBottomSheet.style.transform = "translateX(-50%) translateY(-40%) rotateX(-20deg)";
        anime({
          translateY: "-50%",
          targets: targetBottomSheet,
          opacity: 1,
          rotateX: "1deg",
          easing: closeAnimation,
          duration: 0.1
        });
      }
    } else {
      if (openOnLoad) {
        targetBottomSheet.style.opacity = 1;
        targetBottomSheet.style.transform = `translateY(${differenceOfWindowHt(checkType(snapPoints[0]))}px)`;
      } else {
        anime({
          targets: targetBottomSheet,
          translateY: `${convertToPx(100)}px`,
          easing: "linear",
          duration: 1
        });
        setTimeout(() => {
          anime({
            targets: targetBottomSheet,
            translateY: `${differenceOfWindowHt(checkType(snapPoints[0]))}px`,
            easing: "spring(1, 85, 15, 3)",
            opacity: 1,
            duration: 1
          });
        }, 60);
      }
    }
    lastSetSnapPoint = differenceOfWindowHt(checkType(snapPoints[0]));
  }
  function handleDragGesture(draggableTarget, currentSnapPoint, lastSnapPoint, newBottomSheet, draggableId, overlay, isWeb) {
    new Gesture(draggableTarget, {
      onDrag: ({
        active,
        velocity: [vx, vy],
        offset,
        distance: [dx, dy],
        target,
        direction
      }) => {
        let minSnapPoint = 0;
        let maxSnapPoint = Infinity;
        currentSnapPoint = getCurrentSnapPoint(newBottomSheet);
        if (window.innerWidth < minWidthForModal) {
          if (direction[1] > 0) {
            if (draggableId && target === document.querySelector(`#${draggableId}`)) {
              newBottomSheet.style.overflow = "hidden";
              newBottomSheet.style.touchAction = "none";
              handleSnapPoints(newBottomSheet, minSnapPoint, null, active, lastSnapPoint, vy, offset, dy, overlay);
              if (lastSetSnapPoint >= window.innerHeight) close(isWeb, dismissible, vy);
              if (lastSetSnapPoint >= window.innerHeight) {
                hideOverlay(overlay);
              }
            } else {
              if (newBottomSheet.scrollTop >= 1 && currentSnapPoint <= convertToPx(100 - lastSnapPoint) && (!draggableId || target !== document.querySelector(`#${draggableId}`))) {
                newBottomSheet.style.overflow = "scroll";
                newBottomSheet.style.touchAction = "auto";
                newBottomSheet.click();
              } else {
                newBottomSheet.style.overflow = "hidden";
                newBottomSheet.style.touchAction = "none";
                handleSnapPoints(newBottomSheet, minSnapPoint, null, active, lastSnapPoint, vy, offset, dy, overlay);
                if (lastSetSnapPoint >= window.innerHeight) close(isWeb, dismissible, vy);
              }
            }
          } else {
            if (getCurrentSnapPoint(targetBottomSheet) <= convertToPx(100 - lastSnapPoint)) {
              newBottomSheet.click();
              newBottomSheet.style.overflow = "scroll";
              if (convertToPx(100 - lastSnapPoint) > 0) newBottomSheet.style.minHeight = "unset";
              newBottomSheet.style.height = `${convertToPx(lastSnapPoint)}px`;
              newBottomSheet.style.touchAction = "auto";
            } else {
              newBottomSheet.style.overflow = "hidden";
              newBottomSheet.style.touchAction = "none";
              handleSnapPoints(newBottomSheet, null, maxSnapPoint, active, lastSnapPoint, vy, offset, dy, overlay);
              if (lastSetSnapPoint >= window.innerHeight) close(isWeb, dismissible, vy);
            }
          }
        }
      },
      onDragStart: () => {
        document.body.style.overflow = "hidden";
      },
      onDragEnd: ({
        direction
      }) => {
        currentSnapPoint = getCurrentSnapPoint(newBottomSheet);
        if ((currentSnapPoint <= convertToPx(100 - lastSnapPoint) || lastSetSnapPoint === 0) && direction[1] < 0 && targetBottomSheet.scrollTop >= 0) {
          newBottomSheet.style.overflow = "scroll";
          newBottomSheet.click();
          newBottomSheet.style.touchAction = "auto";
        }
        if ((currentSnapPoint <= convertToPx(100 - lastSnapPoint) || lastSetSnapPoint === 0) && direction[1] > 0 && targetBottomSheet.scrollTop === 0) {
          newBottomSheet.style.overflow = "hidden";
        }
      }
    }, {
      drag: {
        filterTaps: false,
        rubberband: true,
        axis: "y",
        preventDefault: false,
        from: () => [0, getCurrentSnapPoint(newBottomSheet)]
      }
    });
  }
  function handleSnapPoints(newBottomSheet, minSnapPoint, maxSnapPoint, active, lastSnapPoint, vy, offset, dy, overlay, isWeb) {
    let actualOffset = offset[1];
    if (maxSnapPoint === null) {
      if (active) {
        moveBottomSheet(newBottomSheet, `${actualOffset > window.innerHeight ? window.innerHeight : actualOffset < convertToPx(100 - lastSnapPoint) ? convertToPx(100 - lastSnapPoint) : actualOffset}px`, `spring(1, 250, 25, 25)`);
      }
      function previousSnappointInputs() {
        return translateToPreviousSnapPoint(actualOffset > window.innerHeight ? window.innerHeight : actualOffset < convertToPx(100 - lastSnapPoint) ? convertToPx(100 - lastSnapPoint) : actualOffset, newBottomSheet, vy, lastSnapPoint, dy, false, overlay, dismissible);
      }
      if (!active) {
        previousSnappointInputs() !== undefined ? offset[1] = previousSnappointInputs() : "";
      }
    } else {
      if (active) {
        moveBottomSheet(newBottomSheet, `${actualOffset > window.innerHeight ? window.innerHeight : actualOffset < convertToPx(100 - lastSnapPoint) ? convertToPx(100 - lastSnapPoint) : actualOffset}px`, `spring(1, 250, 25, 25)`);
      }
      function nextSnappointInputs() {
        return translateToNextSnapPoint(actualOffset > window.innerHeight ? window.innerHeight : actualOffset < convertToPx(100 - lastSnapPoint) ? convertToPx(100 - lastSnapPoint) : actualOffset, newBottomSheet, vy, lastSnapPoint, dy, false, overlay);
      }
      if (!active) {
        nextSnappointInputs() !== undefined ? offset[1] = nextSnappointInputs() : "";
      }
    }
  }
  function getCurrentSnapPoint(newBottomSheet) {
    return +newBottomSheet?.style?.transform.slice(11).replace("px)", "");
  }
  function translateToNextSnapPoint(convertXy, newBottomSheet, vy, lastSnapPoint, dy, snappable, overlay, isWeb) {
    let maxSnapPoint = Infinity;
    snapPoints.forEach(element => {
      let elem = snapPointConversion(element);
      if (convertToPx(elem) > differenceOfWindowHt(convertXy) && convertToPx(elem) < maxSnapPoint) {
        maxSnapPoint = convertToPx(elem);
      }
    });
    if (maxSnapPoint !== Infinity) {
      if (snappable) {
        moveBottomSheet(newBottomSheet, `${differenceOfWindowHt(maxSnapPoint)}px`, getSnapPointAnimation());
        lastSetSnapPoint = differenceOfWindowHt(maxSnapPoint);
        return lastSetSnapPoint;
      } else {
        if (vy > velocityThreshold || dy < distanceThreshold) {
          moveBottomSheet(newBottomSheet, `${differenceOfWindowHt(maxSnapPoint)}px`, getSnapPointAnimation());
          lastSetSnapPoint = differenceOfWindowHt(maxSnapPoint);
          return lastSetSnapPoint;
        } else {
          return translateToPreviousSnapPoint(convertXy, newBottomSheet, vy, lastSnapPoint, dy, true, overlay, dismissible);
        }
      }
    }
  }
  function translateToPreviousSnapPoint(convertXy, newBottomSheet, vy, lastSnapPoint, dy, snappable, overlay, dismissible, isWeb) {
    let minSnapPoint = 0;
    snapPoints.forEach(element => {
      let elem = snapPointConversion(element);
      if (convertToPx(elem) < differenceOfWindowHt(convertXy) && convertToPx(elem) > minSnapPoint) {
        minSnapPoint = convertToPx(elem);
      }
    });
    if (snappable) {
      moveBottomSheet(newBottomSheet, `${!dismissible ? minSnapPoint <= checkType(snapPoints[0]) ? differenceOfWindowHt(checkType(snapPoints[0])) : differenceOfWindowHt(minSnapPoint) : differenceOfWindowHt(minSnapPoint)}px`, getSnapPointAnimation());
      lastSetSnapPoint = differenceOfWindowHt(minSnapPoint);
      return lastSetSnapPoint;
    } else {
      if (vy > velocityThreshold || dy > distanceThreshold) {
        moveBottomSheet(newBottomSheet, `${!dismissible ? minSnapPoint <= checkType(snapPoints[0]) ? differenceOfWindowHt(checkType(snapPoints[0])) : differenceOfWindowHt(minSnapPoint) : differenceOfWindowHt(minSnapPoint)}px`, getSnapPointAnimation());
        lastSetSnapPoint = differenceOfWindowHt(minSnapPoint);
        return lastSetSnapPoint;
      } else {
        return translateToNextSnapPoint(convertXy, newBottomSheet, vy, lastSnapPoint, dy, true, overlay);
      }
    }
  }
  function closeLeftSideSheet(targetBottomSheet, overlay) {
    anime({
      targets: targetBottomSheet,
      width: 0,
      easing: "spring(1, 85, 45, 3)",
      duration: 0
    });
    setTimeout(() => {
      cleanUpOnClose ? cleanUp(targetBottomSheet) : "";
    }, 400);
    hideOverlay(overlay);
  }
  function closeRightSideSheet(targetBottomSheet) {
    anime({
      targets: targetBottomSheet,
      width: 0,
      easing: "spring(1, 85, 45, 3)",
      duration: 0
    });
    setTimeout(() => {
      cleanUpOnClose ? cleanUp(targetBottomSheet) : "";
    }, 400);
    hideOverlay(overlay);
  }
  function cleanUp(targetBottomSheet) {
    targetBottomSheet.remove();
  }
  function getSnapPointAnimation() {
    return `spring(1, 95, 25, 13)`;
  }
  function destroy() {
    document.getElementById(trigger).removeEventListener("click", () => {
      init(false);
    });
  }
  const self = {
    close,
    init,
    open,
    destroy
  };
  return self;
}

module.exports = BottomSheet;
//# sourceMappingURL=bottomsheet.cjs.js.map
