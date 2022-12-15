import D from "animejs/lib/anime.es.js";
function he(i, t, e) {
  return Math.max(t, Math.min(i, e));
}
const _ = {
  toVector(i, t) {
    return i === void 0 && (i = t), Array.isArray(i) ? i : [i, i];
  },
  add(i, t) {
    return [i[0] + t[0], i[1] + t[1]];
  },
  sub(i, t) {
    return [i[0] - t[0], i[1] - t[1]];
  },
  addTo(i, t) {
    i[0] += t[0], i[1] += t[1];
  },
  subTo(i, t) {
    i[0] -= t[0], i[1] -= t[1];
  }
};
function Pt(i, t, e) {
  return t === 0 || Math.abs(t) === 1 / 0 ? Math.pow(i, e * 5) : i * t * e / (t + e * i);
}
function St(i, t, e, s = 0.15) {
  return s === 0 ? he(i, t, e) : i < t ? -Pt(t - i, e - t, s) + t : i > e ? +Pt(i - e, e - t, s) + e : i;
}
function pe(i, [t, e], [s, n]) {
  const [[o, a], [d, p]] = i;
  return [St(t, o, a, s), St(e, d, p, n)];
}
function T(i, t, e) {
  return t in i ? Object.defineProperty(i, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : i[t] = e, i;
}
function Ht(i, t) {
  var e = Object.keys(i);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(i);
    t && (s = s.filter(function(n) {
      return Object.getOwnPropertyDescriptor(i, n).enumerable;
    })), e.push.apply(e, s);
  }
  return e;
}
function w(i) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ht(Object(e), !0).forEach(function(s) {
      T(i, s, e[s]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(e)) : Ht(Object(e)).forEach(function(s) {
      Object.defineProperty(i, s, Object.getOwnPropertyDescriptor(e, s));
    });
  }
  return i;
}
const zt = {
  pointer: {
    start: "down",
    change: "move",
    end: "up"
  },
  mouse: {
    start: "down",
    change: "move",
    end: "up"
  },
  touch: {
    start: "start",
    change: "move",
    end: "end"
  },
  gesture: {
    start: "start",
    change: "change",
    end: "end"
  }
};
function $t(i) {
  return i ? i[0].toUpperCase() + i.slice(1) : "";
}
const me = ["enter", "leave"];
function ge(i = !1, t) {
  return i && !me.includes(t);
}
function ye(i, t = "", e = !1) {
  const s = zt[i], n = s && s[t] || t;
  return "on" + $t(i) + $t(n) + (ge(e, n) ? "Capture" : "");
}
const _e = ["gotpointercapture", "lostpointercapture"];
function ve(i) {
  let t = i.substring(2).toLowerCase();
  const e = !!~t.indexOf("passive");
  e && (t = t.replace("passive", ""));
  const s = _e.includes(t) ? "capturecapture" : "capture", n = !!~t.indexOf(s);
  return n && (t = t.replace("capture", "")), {
    device: t,
    capture: n,
    passive: e
  };
}
function we(i, t = "") {
  const e = zt[i], s = e && e[t] || t;
  return i + s;
}
function lt(i) {
  return "touches" in i;
}
function Ft(i) {
  return lt(i) ? "touch" : "pointerType" in i ? i.pointerType : "mouse";
}
function be(i) {
  return Array.from(i.touches).filter((t) => {
    var e, s;
    return t.target === i.currentTarget || ((e = i.currentTarget) === null || e === void 0 || (s = e.contains) === null || s === void 0 ? void 0 : s.call(e, t.target));
  });
}
function Ee(i) {
  return i.type === "touchend" || i.type === "touchcancel" ? i.changedTouches : i.targetTouches;
}
function Zt(i) {
  return lt(i) ? Ee(i)[0] : i;
}
function wt(i, t) {
  const e = t.clientX - i.clientX, s = t.clientY - i.clientY, n = (t.clientX + i.clientX) / 2, o = (t.clientY + i.clientY) / 2, a = Math.hypot(e, s);
  return {
    angle: -(Math.atan2(e, s) * 180) / Math.PI,
    distance: a,
    origin: [n, o]
  };
}
function Te(i) {
  return be(i).map((t) => t.identifier);
}
function Rt(i, t) {
  const [e, s] = Array.from(i.touches).filter((n) => t.includes(n.identifier));
  return wt(e, s);
}
function _t(i) {
  const t = Zt(i);
  return lt(i) ? t.identifier : t.pointerId;
}
function J(i) {
  const t = Zt(i);
  return [t.clientX, t.clientY];
}
const Vt = 40, Kt = 800;
function Jt(i) {
  let {
    deltaX: t,
    deltaY: e,
    deltaMode: s
  } = i;
  return s === 1 ? (t *= Vt, e *= Vt) : s === 2 && (t *= Kt, e *= Kt), [t, e];
}
function Oe(i) {
  var t, e;
  const {
    scrollX: s,
    scrollY: n,
    scrollLeft: o,
    scrollTop: a
  } = i.currentTarget;
  return [(t = s != null ? s : o) !== null && t !== void 0 ? t : 0, (e = n != null ? n : a) !== null && e !== void 0 ? e : 0];
}
function Ae(i) {
  const t = {};
  if ("buttons" in i && (t.buttons = i.buttons), "shiftKey" in i) {
    const {
      shiftKey: e,
      altKey: s,
      metaKey: n,
      ctrlKey: o
    } = i;
    Object.assign(t, {
      shiftKey: e,
      altKey: s,
      metaKey: n,
      ctrlKey: o
    });
  }
  return t;
}
function at(i, ...t) {
  return typeof i == "function" ? i(...t) : i;
}
function Ie() {
}
function xe(...i) {
  return i.length === 0 ? Ie : i.length === 1 ? i[0] : function() {
    let t;
    for (const e of i)
      t = e.apply(this, arguments) || t;
    return t;
  };
}
function jt(i, t) {
  return Object.assign({}, t, i || {});
}
const ke = 32;
class Qt {
  constructor(t, e, s) {
    this.ctrl = t, this.args = e, this.key = s, this.state || (this.state = {}, this.computeValues([0, 0]), this.computeInitial(), this.init && this.init(), this.reset());
  }
  get state() {
    return this.ctrl.state[this.key];
  }
  set state(t) {
    this.ctrl.state[this.key] = t;
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
      state: t,
      shared: e,
      ingKey: s,
      args: n
    } = this;
    e[s] = t._active = t.active = t._blocked = t._force = !1, t._step = [!1, !1], t.intentional = !1, t._movement = [0, 0], t._distance = [0, 0], t._direction = [0, 0], t._delta = [0, 0], t._bounds = [[-1 / 0, 1 / 0], [-1 / 0, 1 / 0]], t.args = n, t.axis = void 0, t.memo = void 0, t.elapsedTime = 0, t.direction = [0, 0], t.distance = [0, 0], t.overflow = [0, 0], t._movementBound = [!1, !1], t.velocity = [0, 0], t.movement = [0, 0], t.delta = [0, 0], t.timeStamp = 0;
  }
  start(t) {
    const e = this.state, s = this.config;
    e._active || (this.reset(), this.computeInitial(), e._active = !0, e.target = t.target, e.currentTarget = t.currentTarget, e.lastOffset = s.from ? at(s.from, e) : e.offset, e.offset = e.lastOffset), e.startTime = e.timeStamp = t.timeStamp;
  }
  computeValues(t) {
    const e = this.state;
    e._values = t, e.values = this.config.transform(t);
  }
  computeInitial() {
    const t = this.state;
    t._initial = t._values, t.initial = t.values;
  }
  compute(t) {
    const {
      state: e,
      config: s,
      shared: n
    } = this;
    e.args = this.args;
    let o = 0;
    if (t && (e.event = t, s.preventDefault && t.cancelable && e.event.preventDefault(), e.type = t.type, n.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size, n.locked = !!document.pointerLockElement, Object.assign(n, Ae(t)), n.down = n.pressed = n.buttons % 2 === 1 || n.touches > 0, o = t.timeStamp - e.timeStamp, e.timeStamp = t.timeStamp, e.elapsedTime = e.timeStamp - e.startTime), e._active) {
      const $ = e._delta.map(Math.abs);
      _.addTo(e._distance, $);
    }
    this.axisIntent && this.axisIntent(t);
    const [a, d] = e._movement, [p, g] = s.threshold, {
      _step: f,
      values: M
    } = e;
    if (s.hasCustomTransform ? (f[0] === !1 && (f[0] = Math.abs(a) >= p && M[0]), f[1] === !1 && (f[1] = Math.abs(d) >= g && M[1])) : (f[0] === !1 && (f[0] = Math.abs(a) >= p && Math.sign(a) * p), f[1] === !1 && (f[1] = Math.abs(d) >= g && Math.sign(d) * g)), e.intentional = f[0] !== !1 || f[1] !== !1, !e.intentional)
      return;
    const C = [0, 0];
    if (s.hasCustomTransform) {
      const [$, Q] = M;
      C[0] = f[0] !== !1 ? $ - f[0] : 0, C[1] = f[1] !== !1 ? Q - f[1] : 0;
    } else
      C[0] = f[0] !== !1 ? a - f[0] : 0, C[1] = f[1] !== !1 ? d - f[1] : 0;
    this.restrictToAxis && !e._blocked && this.restrictToAxis(C);
    const N = e.offset, K = e._active && !e._blocked || e.active;
    K && (e.first = e._active && !e.active, e.last = !e._active && e.active, e.active = n[this.ingKey] = e._active, t && (e.first && ("bounds" in s && (e._bounds = at(s.bounds, e)), this.setup && this.setup()), e.movement = C, this.computeOffset()));
    const [P, j] = e.offset, [[G, ut], [ft, dt]] = e._bounds;
    e.overflow = [P < G ? -1 : P > ut ? 1 : 0, j < ft ? -1 : j > dt ? 1 : 0], e._movementBound[0] = e.overflow[0] ? e._movementBound[0] === !1 ? e._movement[0] : e._movementBound[0] : !1, e._movementBound[1] = e.overflow[1] ? e._movementBound[1] === !1 ? e._movement[1] : e._movementBound[1] : !1;
    const ht = e._active ? s.rubberband || [0, 0] : [0, 0];
    if (e.offset = pe(e._bounds, e.offset, ht), e.delta = _.sub(e.offset, N), this.computeMovement(), K && (!e.last || o > ke)) {
      e.delta = _.sub(e.offset, N);
      const $ = e.delta.map(Math.abs);
      _.addTo(e.distance, $), e.direction = e.delta.map(Math.sign), e._direction = e._delta.map(Math.sign), !e.first && o > 0 && (e.velocity = [$[0] / o, $[1] / o]);
    }
  }
  emit() {
    const t = this.state, e = this.shared, s = this.config;
    if (t._active || this.clean(), (t._blocked || !t.intentional) && !t._force && !s.triggerAllEvents)
      return;
    const n = this.handler(w(w(w({}, e), t), {}, {
      [this.aliasKey]: t.values
    }));
    n !== void 0 && (t.memo = n);
  }
  clean() {
    this.eventStore.clean(), this.timeoutStore.clean();
  }
}
function Ce([i, t], e) {
  const s = Math.abs(i), n = Math.abs(t);
  if (s > n && s > e)
    return "x";
  if (n > s && n > e)
    return "y";
}
class tt extends Qt {
  constructor(...t) {
    super(...t), T(this, "aliasKey", "xy");
  }
  reset() {
    super.reset(), this.state.axis = void 0;
  }
  init() {
    this.state.offset = [0, 0], this.state.lastOffset = [0, 0];
  }
  computeOffset() {
    this.state.offset = _.add(this.state.lastOffset, this.state.movement);
  }
  computeMovement() {
    this.state.movement = _.sub(this.state.offset, this.state.lastOffset);
  }
  axisIntent(t) {
    const e = this.state, s = this.config;
    if (!e.axis && t) {
      const n = typeof s.axisThreshold == "object" ? s.axisThreshold[Ft(t)] : s.axisThreshold;
      e.axis = Ce(e._movement, n);
    }
    e._blocked = (s.lockDirection || !!s.axis) && !e.axis || !!s.axis && s.axis !== e.axis;
  }
  restrictToAxis(t) {
    if (this.config.axis || this.config.lockDirection)
      switch (this.state.axis) {
        case "x":
          t[1] = 0;
          break;
        case "y":
          t[0] = 0;
          break;
      }
  }
}
const Le = (i) => i, Yt = 0.15, Bt = {
  enabled(i = !0) {
    return i;
  },
  eventOptions(i, t, e) {
    return w(w({}, e.shared.eventOptions), i);
  },
  preventDefault(i = !1) {
    return i;
  },
  triggerAllEvents(i = !1) {
    return i;
  },
  rubberband(i = 0) {
    switch (i) {
      case !0:
        return [Yt, Yt];
      case !1:
        return [0, 0];
      default:
        return _.toVector(i);
    }
  },
  from(i) {
    if (typeof i == "function")
      return i;
    if (i != null)
      return _.toVector(i);
  },
  transform(i, t, e) {
    const s = i || e.shared.transform;
    return this.hasCustomTransform = !!s, s || Le;
  },
  threshold(i) {
    return _.toVector(i, 0);
  }
}, De = 0, U = w(w({}, Bt), {}, {
  axis(i, t, {
    axis: e
  }) {
    if (this.lockDirection = e === "lock", !this.lockDirection)
      return e;
  },
  axisThreshold(i = De) {
    return i;
  },
  bounds(i = {}) {
    if (typeof i == "function")
      return (o) => U.bounds(i(o));
    if ("current" in i)
      return () => i.current;
    if (typeof HTMLElement == "function" && i instanceof HTMLElement)
      return i;
    const {
      left: t = -1 / 0,
      right: e = 1 / 0,
      top: s = -1 / 0,
      bottom: n = 1 / 0
    } = i;
    return [[t, e], [s, n]];
  }
}), rt = 10, qt = {
  ArrowRight: (i = 1) => [rt * i, 0],
  ArrowLeft: (i = 1) => [-rt * i, 0],
  ArrowUp: (i = 1) => [0, -rt * i],
  ArrowDown: (i = 1) => [0, rt * i]
};
class Me extends tt {
  constructor(...t) {
    super(...t), T(this, "ingKey", "dragging");
  }
  reset() {
    super.reset();
    const t = this.state;
    t._pointerId = void 0, t._pointerActive = !1, t._keyboardActive = !1, t._preventScroll = !1, t._delayed = !1, t.swipe = [0, 0], t.tap = !1, t.canceled = !1, t.cancel = this.cancel.bind(this);
  }
  setup() {
    const t = this.state;
    if (t._bounds instanceof HTMLElement) {
      const e = t._bounds.getBoundingClientRect(), s = t.currentTarget.getBoundingClientRect(), n = {
        left: e.left - s.left + t.offset[0],
        right: e.right - s.right + t.offset[0],
        top: e.top - s.top + t.offset[1],
        bottom: e.bottom - s.bottom + t.offset[1]
      };
      t._bounds = U.bounds(n);
    }
  }
  cancel() {
    const t = this.state;
    t.canceled || (t.canceled = !0, t._active = !1, setTimeout(() => {
      this.compute(), this.emit();
    }, 0));
  }
  setActive() {
    this.state._active = this.state._pointerActive || this.state._keyboardActive;
  }
  clean() {
    this.pointerClean(), this.state._pointerActive = !1, this.state._keyboardActive = !1, super.clean();
  }
  pointerDown(t) {
    const e = this.config, s = this.state;
    if (t.buttons != null && (Array.isArray(e.pointerButtons) ? !e.pointerButtons.includes(t.buttons) : e.pointerButtons !== -1 && e.pointerButtons !== t.buttons))
      return;
    const n = this.ctrl.setEventIds(t);
    e.pointerCapture && t.target.setPointerCapture(t.pointerId), !(n && n.size > 1 && s._pointerActive) && (this.start(t), this.setupPointer(t), s._pointerId = _t(t), s._pointerActive = !0, this.computeValues(J(t)), this.computeInitial(), e.preventScrollAxis && Ft(t) !== "mouse" ? (s._active = !1, this.setupScrollPrevention(t)) : e.delay > 0 ? (this.setupDelayTrigger(t), e.triggerAllEvents && (this.compute(t), this.emit())) : this.startPointerDrag(t));
  }
  startPointerDrag(t) {
    const e = this.state;
    e._active = !0, e._preventScroll = !0, e._delayed = !1, this.compute(t), this.emit();
  }
  pointerMove(t) {
    const e = this.state, s = this.config;
    if (!e._pointerActive || e.type === t.type && t.timeStamp === e.timeStamp)
      return;
    const n = _t(t);
    if (e._pointerId !== void 0 && n !== e._pointerId)
      return;
    const o = J(t);
    if (document.pointerLockElement === t.target ? e._delta = [t.movementX, t.movementY] : (e._delta = _.sub(o, e._values), this.computeValues(o)), _.addTo(e._movement, e._delta), this.compute(t), e._delayed && e.intentional) {
      this.timeoutStore.remove("dragDelay"), e.active = !1, this.startPointerDrag(t);
      return;
    }
    if (s.preventScrollAxis && !e._preventScroll)
      if (e.axis)
        if (e.axis === s.preventScrollAxis || s.preventScrollAxis === "xy") {
          e._active = !1, this.clean();
          return;
        } else {
          this.timeoutStore.remove("startPointerDrag"), this.startPointerDrag(t);
          return;
        }
      else
        return;
    this.emit();
  }
  pointerUp(t) {
    this.ctrl.setEventIds(t);
    try {
      this.config.pointerCapture && t.target.hasPointerCapture(t.pointerId) && t.target.releasePointerCapture(t.pointerId);
    } catch {
    }
    const e = this.state, s = this.config;
    if (!e._active || !e._pointerActive)
      return;
    const n = _t(t);
    if (e._pointerId !== void 0 && n !== e._pointerId)
      return;
    this.state._pointerActive = !1, this.setActive(), this.compute(t);
    const [o, a] = e._distance;
    if (e.tap = o <= s.tapsThreshold && a <= s.tapsThreshold, e.tap && s.filterTaps)
      e._force = !0;
    else {
      const [d, p] = e.direction, [g, f] = e.velocity, [M, C] = e.movement, [N, K] = s.swipe.velocity, [P, j] = s.swipe.distance, G = s.swipe.duration;
      e.elapsedTime < G && (Math.abs(g) > N && Math.abs(M) > P && (e.swipe[0] = d), Math.abs(f) > K && Math.abs(C) > j && (e.swipe[1] = p));
    }
    this.emit();
  }
  pointerClick(t) {
    !this.state.tap && t.detail > 0 && (t.preventDefault(), t.stopPropagation());
  }
  setupPointer(t) {
    const e = this.config, s = e.device;
    e.pointerLock && t.currentTarget.requestPointerLock(), e.pointerCapture || (this.eventStore.add(this.sharedConfig.window, s, "change", this.pointerMove.bind(this)), this.eventStore.add(this.sharedConfig.window, s, "end", this.pointerUp.bind(this)), this.eventStore.add(this.sharedConfig.window, s, "cancel", this.pointerUp.bind(this)));
  }
  pointerClean() {
    this.config.pointerLock && document.pointerLockElement === this.state.currentTarget && document.exitPointerLock();
  }
  preventScroll(t) {
    this.state._preventScroll && t.cancelable && t.preventDefault();
  }
  setupScrollPrevention(t) {
    this.state._preventScroll = !1, Pe(t);
    const e = this.eventStore.add(this.sharedConfig.window, "touch", "change", this.preventScroll.bind(this), {
      passive: !1
    });
    this.eventStore.add(this.sharedConfig.window, "touch", "end", e), this.eventStore.add(this.sharedConfig.window, "touch", "cancel", e), this.timeoutStore.add("startPointerDrag", this.startPointerDrag.bind(this), this.config.preventScrollDelay, t);
  }
  setupDelayTrigger(t) {
    this.state._delayed = !0, this.timeoutStore.add("dragDelay", () => {
      this.state._step = [0, 0], this.startPointerDrag(t);
    }, this.config.delay);
  }
  keyDown(t) {
    const e = qt[t.key];
    if (e) {
      const s = this.state, n = t.shiftKey ? 10 : t.altKey ? 0.1 : 1;
      this.start(t), s._delta = e(n), s._keyboardActive = !0, _.addTo(s._movement, s._delta), this.compute(t), this.emit();
    }
  }
  keyUp(t) {
    t.key in qt && (this.state._keyboardActive = !1, this.setActive(), this.compute(t), this.emit());
  }
  bind(t) {
    const e = this.config.device;
    t(e, "start", this.pointerDown.bind(this)), this.config.pointerCapture && (t(e, "change", this.pointerMove.bind(this)), t(e, "end", this.pointerUp.bind(this)), t(e, "cancel", this.pointerUp.bind(this)), t("lostPointerCapture", "", this.pointerUp.bind(this))), this.config.keys && (t("key", "down", this.keyDown.bind(this)), t("key", "up", this.keyUp.bind(this))), this.config.filterTaps && t("click", "", this.pointerClick.bind(this), {
      capture: !0,
      passive: !1
    });
  }
}
function Pe(i) {
  "persist" in i && typeof i.persist == "function" && i.persist();
}
const et = typeof window < "u" && window.document && window.document.createElement;
function Se() {
  return et && "ontouchstart" in window;
}
function Ut() {
  return Se() || et && window.navigator.maxTouchPoints > 1;
}
function He() {
  return et && "onpointerdown" in window;
}
function $e() {
  return et && "exitPointerLock" in window.document;
}
function Re() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const S = {
  isBrowser: et,
  gesture: Re(),
  touch: Ut(),
  touchscreen: Ut(),
  pointer: He(),
  pointerLock: $e()
}, Ve = 250, Ke = 180, je = 0.5, Ye = 50, qe = 250, Nt = {
  mouse: 0,
  touch: 0,
  pen: 8
}, Ue = w(w({}, U), {}, {
  device(i, t, {
    pointer: {
      touch: e = !1,
      lock: s = !1,
      mouse: n = !1
    } = {}
  }) {
    return this.pointerLock = s && S.pointerLock, S.touch && e ? "touch" : this.pointerLock ? "mouse" : S.pointer && !n ? "pointer" : S.touch ? "touch" : "mouse";
  },
  preventScrollAxis(i, t, {
    preventScroll: e
  }) {
    if (this.preventScrollDelay = typeof e == "number" ? e : e || e === void 0 && i ? Ve : void 0, !(!S.touchscreen || e === !1))
      return i || (e !== void 0 ? "y" : void 0);
  },
  pointerCapture(i, t, {
    pointer: {
      capture: e = !0,
      buttons: s = 1
    } = {}
  }) {
    return this.pointerButtons = s, !this.pointerLock && this.device === "pointer" && e;
  },
  keys(i = !0) {
    return i;
  },
  threshold(i, t, {
    filterTaps: e = !1,
    tapsThreshold: s = 3,
    axis: n = void 0
  }) {
    const o = _.toVector(i, e ? s : n ? 1 : 0);
    return this.filterTaps = e, this.tapsThreshold = s, o;
  },
  swipe({
    velocity: i = je,
    distance: t = Ye,
    duration: e = qe
  } = {}) {
    return {
      velocity: this.transform(_.toVector(i)),
      distance: this.transform(_.toVector(t)),
      duration: e
    };
  },
  delay(i = 0) {
    switch (i) {
      case !0:
        return Ke;
      case !1:
        return 0;
      default:
        return i;
    }
  },
  axisThreshold(i) {
    return i ? w(w({}, Nt), i) : Nt;
  }
});
function te(i) {
  const [t, e] = i.overflow, [s, n] = i._delta, [o, a] = i._direction;
  (t < 0 && s > 0 && o < 0 || t > 0 && s < 0 && o > 0) && (i._movement[0] = i._movementBound[0]), (e < 0 && n > 0 && a < 0 || e > 0 && n < 0 && a > 0) && (i._movement[1] = i._movementBound[1]);
}
const Ne = 30, Ge = 100;
class We extends Qt {
  constructor(...t) {
    super(...t), T(this, "ingKey", "pinching"), T(this, "aliasKey", "da");
  }
  init() {
    this.state.offset = [1, 0], this.state.lastOffset = [1, 0], this.state._pointerEvents = /* @__PURE__ */ new Map();
  }
  reset() {
    super.reset();
    const t = this.state;
    t._touchIds = [], t.canceled = !1, t.cancel = this.cancel.bind(this), t.turns = 0;
  }
  computeOffset() {
    const {
      type: t,
      movement: e,
      lastOffset: s
    } = this.state;
    t === "wheel" ? this.state.offset = _.add(e, s) : this.state.offset = [(1 + e[0]) * s[0], e[1] + s[1]];
  }
  computeMovement() {
    const {
      offset: t,
      lastOffset: e
    } = this.state;
    this.state.movement = [t[0] / e[0], t[1] - e[1]];
  }
  axisIntent() {
    const t = this.state, [e, s] = t._movement;
    if (!t.axis) {
      const n = Math.abs(e) * Ne - Math.abs(s);
      n < 0 ? t.axis = "angle" : n > 0 && (t.axis = "scale");
    }
  }
  restrictToAxis(t) {
    this.config.lockDirection && (this.state.axis === "scale" ? t[1] = 0 : this.state.axis === "angle" && (t[0] = 0));
  }
  cancel() {
    const t = this.state;
    t.canceled || setTimeout(() => {
      t.canceled = !0, t._active = !1, this.compute(), this.emit();
    }, 0);
  }
  touchStart(t) {
    this.ctrl.setEventIds(t);
    const e = this.state, s = this.ctrl.touchIds;
    if (e._active && e._touchIds.every((o) => s.has(o)) || s.size < 2)
      return;
    this.start(t), e._touchIds = Array.from(s).slice(0, 2);
    const n = Rt(t, e._touchIds);
    this.pinchStart(t, n);
  }
  pointerStart(t) {
    if (t.buttons != null && t.buttons % 2 !== 1)
      return;
    this.ctrl.setEventIds(t), t.target.setPointerCapture(t.pointerId);
    const e = this.state, s = e._pointerEvents, n = this.ctrl.pointerIds;
    if (e._active && Array.from(s.keys()).every((a) => n.has(a)) || (s.size < 2 && s.set(t.pointerId, t), e._pointerEvents.size < 2))
      return;
    this.start(t);
    const o = wt(...Array.from(s.values()));
    this.pinchStart(t, o);
  }
  pinchStart(t, e) {
    const s = this.state;
    s.origin = e.origin, this.computeValues([e.distance, e.angle]), this.computeInitial(), this.compute(t), this.emit();
  }
  touchMove(t) {
    if (!this.state._active)
      return;
    const e = Rt(t, this.state._touchIds);
    this.pinchMove(t, e);
  }
  pointerMove(t) {
    const e = this.state._pointerEvents;
    if (e.has(t.pointerId) && e.set(t.pointerId, t), !this.state._active)
      return;
    const s = wt(...Array.from(e.values()));
    this.pinchMove(t, s);
  }
  pinchMove(t, e) {
    const s = this.state, n = s._values[1], o = e.angle - n;
    let a = 0;
    Math.abs(o) > 270 && (a += Math.sign(o)), this.computeValues([e.distance, e.angle - 360 * a]), s.origin = e.origin, s.turns = a, s._movement = [s._values[0] / s._initial[0] - 1, s._values[1] - s._initial[1]], this.compute(t), this.emit();
  }
  touchEnd(t) {
    this.ctrl.setEventIds(t), !!this.state._active && this.state._touchIds.some((e) => !this.ctrl.touchIds.has(e)) && (this.state._active = !1, this.compute(t), this.emit());
  }
  pointerEnd(t) {
    const e = this.state;
    this.ctrl.setEventIds(t);
    try {
      t.target.releasePointerCapture(t.pointerId);
    } catch {
    }
    e._pointerEvents.has(t.pointerId) && e._pointerEvents.delete(t.pointerId), !!e._active && e._pointerEvents.size < 2 && (e._active = !1, this.compute(t), this.emit());
  }
  gestureStart(t) {
    t.cancelable && t.preventDefault();
    const e = this.state;
    e._active || (this.start(t), this.computeValues([t.scale, t.rotation]), e.origin = [t.clientX, t.clientY], this.compute(t), this.emit());
  }
  gestureMove(t) {
    if (t.cancelable && t.preventDefault(), !this.state._active)
      return;
    const e = this.state;
    this.computeValues([t.scale, t.rotation]), e.origin = [t.clientX, t.clientY];
    const s = e._movement;
    e._movement = [t.scale - 1, t.rotation], e._delta = _.sub(e._movement, s), this.compute(t), this.emit();
  }
  gestureEnd(t) {
    !this.state._active || (this.state._active = !1, this.compute(t), this.emit());
  }
  wheel(t) {
    const e = this.config.modifierKey;
    e && !t[e] || (this.state._active ? this.wheelChange(t) : this.wheelStart(t), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this)));
  }
  wheelStart(t) {
    this.start(t), this.wheelChange(t);
  }
  wheelChange(t) {
    "uv" in t || t.cancelable && t.preventDefault();
    const s = this.state;
    s._delta = [-Jt(t)[1] / Ge * s.offset[0], 0], _.addTo(s._movement, s._delta), te(s), this.state.origin = [t.clientX, t.clientY], this.compute(t), this.emit();
  }
  wheelEnd() {
    !this.state._active || (this.state._active = !1, this.compute(), this.emit());
  }
  bind(t) {
    const e = this.config.device;
    e && (t(e, "start", this[e + "Start"].bind(this)), t(e, "change", this[e + "Move"].bind(this)), t(e, "end", this[e + "End"].bind(this)), t(e, "cancel", this[e + "End"].bind(this))), this.config.pinchOnWheel && t("wheel", "", this.wheel.bind(this), {
      passive: !1
    });
  }
}
const Xe = w(w({}, Bt), {}, {
  device(i, t, {
    shared: e,
    pointer: {
      touch: s = !1
    } = {}
  }) {
    if (e.target && !S.touch && S.gesture)
      return "gesture";
    if (S.touch && s)
      return "touch";
    if (S.touchscreen) {
      if (S.pointer)
        return "pointer";
      if (S.touch)
        return "touch";
    }
  },
  bounds(i, t, {
    scaleBounds: e = {},
    angleBounds: s = {}
  }) {
    const n = (a) => {
      const d = jt(at(e, a), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [d.min, d.max];
    }, o = (a) => {
      const d = jt(at(s, a), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [d.min, d.max];
    };
    return typeof e != "function" && typeof s != "function" ? [n(), o()] : (a) => [n(a), o(a)];
  },
  threshold(i, t, e) {
    return this.lockDirection = e.axis === "lock", _.toVector(i, this.lockDirection ? [0.1, 3] : 0);
  },
  modifierKey(i) {
    return i === void 0 ? "ctrlKey" : i;
  },
  pinchOnWheel(i = !0) {
    return i;
  }
});
class ze extends tt {
  constructor(...t) {
    super(...t), T(this, "ingKey", "moving");
  }
  move(t) {
    this.config.mouseOnly && t.pointerType !== "mouse" || (this.state._active ? this.moveChange(t) : this.moveStart(t), this.timeoutStore.add("moveEnd", this.moveEnd.bind(this)));
  }
  moveStart(t) {
    this.start(t), this.computeValues(J(t)), this.compute(t), this.computeInitial(), this.emit();
  }
  moveChange(t) {
    if (!this.state._active)
      return;
    const e = J(t), s = this.state;
    s._delta = _.sub(e, s._values), _.addTo(s._movement, s._delta), this.computeValues(e), this.compute(t), this.emit();
  }
  moveEnd(t) {
    !this.state._active || (this.state._active = !1, this.compute(t), this.emit());
  }
  bind(t) {
    t("pointer", "change", this.move.bind(this)), t("pointer", "leave", this.moveEnd.bind(this));
  }
}
const Fe = w(w({}, U), {}, {
  mouseOnly: (i = !0) => i
});
class Ze extends tt {
  constructor(...t) {
    super(...t), T(this, "ingKey", "scrolling");
  }
  scroll(t) {
    this.state._active || this.start(t), this.scrollChange(t), this.timeoutStore.add("scrollEnd", this.scrollEnd.bind(this));
  }
  scrollChange(t) {
    t.cancelable && t.preventDefault();
    const e = this.state, s = Oe(t);
    e._delta = _.sub(s, e._values), _.addTo(e._movement, e._delta), this.computeValues(s), this.compute(t), this.emit();
  }
  scrollEnd() {
    !this.state._active || (this.state._active = !1, this.compute(), this.emit());
  }
  bind(t) {
    t("scroll", "", this.scroll.bind(this));
  }
}
const Je = U;
class Qe extends tt {
  constructor(...t) {
    super(...t), T(this, "ingKey", "wheeling");
  }
  wheel(t) {
    this.state._active || this.start(t), this.wheelChange(t), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(t) {
    const e = this.state;
    e._delta = Jt(t), _.addTo(e._movement, e._delta), te(e), this.compute(t), this.emit();
  }
  wheelEnd() {
    !this.state._active || (this.state._active = !1, this.compute(), this.emit());
  }
  bind(t) {
    t("wheel", "", this.wheel.bind(this));
  }
}
const Be = U;
class ti extends tt {
  constructor(...t) {
    super(...t), T(this, "ingKey", "hovering");
  }
  enter(t) {
    this.config.mouseOnly && t.pointerType !== "mouse" || (this.start(t), this.computeValues(J(t)), this.compute(t), this.emit());
  }
  leave(t) {
    if (this.config.mouseOnly && t.pointerType !== "mouse")
      return;
    const e = this.state;
    if (!e._active)
      return;
    e._active = !1;
    const s = J(t);
    e._movement = e._delta = _.sub(s, e._values), this.computeValues(s), this.compute(t), e.delta = e.movement, this.emit();
  }
  bind(t) {
    t("pointer", "enter", this.enter.bind(this)), t("pointer", "leave", this.leave.bind(this));
  }
}
const ei = w(w({}, U), {}, {
  mouseOnly: (i = !0) => i
}), Et = /* @__PURE__ */ new Map(), bt = /* @__PURE__ */ new Map();
function ii(i) {
  Et.set(i.key, i.engine), bt.set(i.key, i.resolver);
}
const si = {
  key: "drag",
  engine: Me,
  resolver: Ue
}, ni = {
  key: "hover",
  engine: ti,
  resolver: ei
}, ri = {
  key: "move",
  engine: ze,
  resolver: Fe
}, oi = {
  key: "pinch",
  engine: We,
  resolver: Xe
}, ci = {
  key: "scroll",
  engine: Ze,
  resolver: Je
}, ai = {
  key: "wheel",
  engine: Qe,
  resolver: Be
};
function li(i, t) {
  if (i == null)
    return {};
  var e = {}, s = Object.keys(i), n, o;
  for (o = 0; o < s.length; o++)
    n = s[o], !(t.indexOf(n) >= 0) && (e[n] = i[n]);
  return e;
}
function ui(i, t) {
  if (i == null)
    return {};
  var e = li(i, t), s, n;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(i);
    for (n = 0; n < o.length; n++)
      s = o[n], !(t.indexOf(s) >= 0) && (!Object.prototype.propertyIsEnumerable.call(i, s) || (e[s] = i[s]));
  }
  return e;
}
const fi = {
  target(i) {
    if (i)
      return () => "current" in i ? i.current : i;
  },
  enabled(i = !0) {
    return i;
  },
  window(i = S.isBrowser ? window : void 0) {
    return i;
  },
  eventOptions({
    passive: i = !0,
    capture: t = !1
  } = {}) {
    return {
      passive: i,
      capture: t
    };
  },
  transform(i) {
    return i;
  }
}, di = ["target", "eventOptions", "window", "enabled", "transform"];
function ct(i = {}, t) {
  const e = {};
  for (const [s, n] of Object.entries(t))
    switch (typeof n) {
      case "function":
        e[s] = n.call(e, i[s], s, i);
        break;
      case "object":
        e[s] = ct(i[s], n);
        break;
      case "boolean":
        n && (e[s] = i[s]);
        break;
    }
  return e;
}
function hi(i, t, e = {}) {
  const s = i, {
    target: n,
    eventOptions: o,
    window: a,
    enabled: d,
    transform: p
  } = s, g = ui(s, di);
  if (e.shared = ct({
    target: n,
    eventOptions: o,
    window: a,
    enabled: d,
    transform: p
  }, fi), t) {
    const f = bt.get(t);
    e[t] = ct(w({
      shared: e.shared
    }, g), f);
  } else
    for (const f in g) {
      const M = bt.get(f);
      M && (e[f] = ct(w({
        shared: e.shared
      }, g[f]), M));
    }
  return e;
}
class ee {
  constructor(t, e) {
    T(this, "_listeners", /* @__PURE__ */ new Set()), this._ctrl = t, this._gestureKey = e;
  }
  add(t, e, s, n, o) {
    const a = this._listeners, d = we(e, s), p = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}, g = w(w({}, p), o);
    t.addEventListener(d, n, g);
    const f = () => {
      t.removeEventListener(d, n, g), a.delete(f);
    };
    return a.add(f), f;
  }
  clean() {
    this._listeners.forEach((t) => t()), this._listeners.clear();
  }
}
class pi {
  constructor() {
    T(this, "_timeouts", /* @__PURE__ */ new Map());
  }
  add(t, e, s = 140, ...n) {
    this.remove(t), this._timeouts.set(t, window.setTimeout(e, s, ...n));
  }
  remove(t) {
    const e = this._timeouts.get(t);
    e && window.clearTimeout(e);
  }
  clean() {
    this._timeouts.forEach((t) => void window.clearTimeout(t)), this._timeouts.clear();
  }
}
class mi {
  constructor(t) {
    T(this, "gestures", /* @__PURE__ */ new Set()), T(this, "_targetEventStore", new ee(this)), T(this, "gestureEventStores", {}), T(this, "gestureTimeoutStores", {}), T(this, "handlers", {}), T(this, "config", {}), T(this, "pointerIds", /* @__PURE__ */ new Set()), T(this, "touchIds", /* @__PURE__ */ new Set()), T(this, "state", {
      shared: {
        shiftKey: !1,
        metaKey: !1,
        ctrlKey: !1,
        altKey: !1
      }
    }), gi(this, t);
  }
  setEventIds(t) {
    if (lt(t))
      return this.touchIds = new Set(Te(t)), this.touchIds;
    if ("pointerId" in t)
      return t.type === "pointerup" || t.type === "pointercancel" ? this.pointerIds.delete(t.pointerId) : t.type === "pointerdown" && this.pointerIds.add(t.pointerId), this.pointerIds;
  }
  applyHandlers(t, e) {
    this.handlers = t, this.nativeHandlers = e;
  }
  applyConfig(t, e) {
    this.config = hi(t, e, this.config);
  }
  clean() {
    this._targetEventStore.clean();
    for (const t of this.gestures)
      this.gestureEventStores[t].clean(), this.gestureTimeoutStores[t].clean();
  }
  effect() {
    return this.config.shared.target && this.bind(), () => this._targetEventStore.clean();
  }
  bind(...t) {
    const e = this.config.shared, s = {};
    let n;
    if (!(e.target && (n = e.target(), !n))) {
      if (e.enabled) {
        for (const a of this.gestures) {
          const d = this.config[a], p = Gt(s, d.eventOptions, !!n);
          if (d.enabled) {
            const g = Et.get(a);
            new g(this, t, a).bind(p);
          }
        }
        const o = Gt(s, e.eventOptions, !!n);
        for (const a in this.nativeHandlers)
          o(
            a,
            "",
            (d) => this.nativeHandlers[a](w(w({}, this.state.shared), {}, {
              event: d,
              args: t
            })),
            void 0,
            !0
          );
      }
      for (const o in s)
        s[o] = xe(...s[o]);
      if (!n)
        return s;
      for (const o in s) {
        const {
          device: a,
          capture: d,
          passive: p
        } = ve(o);
        this._targetEventStore.add(n, a, "", s[o], {
          capture: d,
          passive: p
        });
      }
    }
  }
}
function F(i, t) {
  i.gestures.add(t), i.gestureEventStores[t] = new ee(i, t), i.gestureTimeoutStores[t] = new pi();
}
function gi(i, t) {
  t.drag && F(i, "drag"), t.wheel && F(i, "wheel"), t.scroll && F(i, "scroll"), t.move && F(i, "move"), t.pinch && F(i, "pinch"), t.hover && F(i, "hover");
}
const Gt = (i, t, e) => (s, n, o, a = {}, d = !1) => {
  var p, g;
  const f = (p = a.capture) !== null && p !== void 0 ? p : t.capture, M = (g = a.passive) !== null && g !== void 0 ? g : t.passive;
  let C = d ? s : ye(s, n, f);
  e && M && (C += "Passive"), i[C] = i[C] || [], i[C].push(o);
}, yi = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function _i(i) {
  const t = {}, e = {}, s = /* @__PURE__ */ new Set();
  for (let n in i)
    yi.test(n) ? (s.add(RegExp.lastMatch), e[n] = i[n]) : t[n] = i[n];
  return [e, t, s];
}
function Z(i, t, e, s, n, o) {
  if (!i.has(e) || !Et.has(s))
    return;
  const a = e + "Start", d = e + "End", p = (g) => {
    let f;
    return g.first && a in t && t[a](g), e in t && (f = t[e](g)), g.last && d in t && t[d](g), f;
  };
  n[s] = p, o[s] = o[s] || {};
}
function vi(i, t) {
  const [e, s, n] = _i(i), o = {};
  return Z(n, e, "onDrag", "drag", o, t), Z(n, e, "onWheel", "wheel", o, t), Z(n, e, "onScroll", "scroll", o, t), Z(n, e, "onPinch", "pinch", o, t), Z(n, e, "onMove", "move", o, t), Z(n, e, "onHover", "hover", o, t), {
    handlers: o,
    config: t,
    nativeHandlers: s
  };
}
function wi(i, t, e) {
  return t in i ? Object.defineProperty(i, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : i[t] = e, i;
}
function Wt(i, t) {
  var e = Object.keys(i);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(i);
    t && (s = s.filter(function(n) {
      return Object.getOwnPropertyDescriptor(i, n).enumerable;
    })), e.push.apply(e, s);
  }
  return e;
}
function ot(i) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Wt(Object(e), !0).forEach(function(s) {
      wi(i, s, e[s]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(e)) : Wt(Object(e)).forEach(function(s) {
      Object.defineProperty(i, s, Object.getOwnPropertyDescriptor(e, s));
    });
  }
  return i;
}
class bi {
  constructor(t, e, s, n, o) {
    this._target = t, this._gestureKey = n, this._ctrl = new mi(e), this._ctrl.applyHandlers(e, o), this._ctrl.applyConfig(ot(ot({}, s), {}, {
      target: t
    }), n), this._ctrl.effect();
  }
  destroy() {
    this._ctrl.clean();
  }
  setConfig(t) {
    this._ctrl.clean(), this._ctrl.applyConfig(ot(ot({}, t), {}, {
      target: this._target
    }), this._gestureKey), this._ctrl.effect();
  }
}
function Ei(i) {
  return i.forEach(ii), function(t, e, s) {
    const {
      handlers: n,
      nativeHandlers: o,
      config: a
    } = vi(e, s || {});
    return new bi(t, n, a, void 0, o);
  };
}
const Ti = function(t, e, s) {
  return Ei([si, oi, ci, ai, ri, ni])(t, e, s || {});
};
function B(i) {
  D({
    targets: i,
    opacity: 0,
    easing: "spring(1, 85, 35, 3)",
    duration: 0
  }), setTimeout(() => {
    var t;
    (t = i == null ? void 0 : i.classList) != null && t.contains("display") && i.classList.remove("display"), i && i.remove();
  }, 300), document.body.style.overflow = "scroll";
}
function Xt(i) {
  i.classList.add("display"), D({
    targets: i,
    opacity: 1,
    easing: "spring(1, 85, 35, 3)",
    duration: 0
  });
}
function q(i, t, e, s) {
  D({
    targets: i,
    translateY: t,
    easing: e,
    duration: s
  });
}
function vt(i) {
  return typeof i == "string" ? +i.replace("%", "") : +i;
}
function V(i) {
  return typeof i == "string" ? v(+i.replace("%", "")) : +i;
}
function v(i) {
  return Math.round(window.innerHeight * i / 100);
}
function k(i) {
  return window.innerHeight - i;
}
function Oi() {
  var i = navigator.userAgent || navigator.vendor || window.opera;
  return /windows phone/i.test(i) ? "Windows Phone" : /android/i.test(i) ? "Android" : /iPad|iPhone|iPod/.test(i) && !window.MSStream ? "iOS" : "unknown";
}
function ki(i) {
  var Lt;
  let {
    snapPoints: t = ["100%"],
    displayOverlay: e = !1,
    minWidthForModal: s = 700,
    draggableArea: n = "",
    onOpen: o = () => {
    },
    onClose: a = () => {
    },
    trigger: d = "",
    content: p = "",
    onInit: g = () => {
    },
    webLayout: f = "modal",
    openOnLoad: M = !1,
    modalCloseIcon: C = `<svg width="16" height="12" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33.112 36.9133C34.3649 38.15 36.3963 38.15 37.6492 36.9133C38.9022 35.6766 38.9022 33.6716 37.6492 32.435L24.0375 19L37.6492 5.56496C38.9022 4.3283 38.9022 2.32328 37.6492 1.08662C36.3963 -0.150042 34.3649 -0.150042 33.112 1.08662L19.5002 14.5216L5.88835 1.08655C4.63541 -0.150108 2.60401 -0.150107 1.35108 1.08655C0.0981471 2.32321 0.0981459 4.32824 1.35108 5.5649L14.9629 19L1.35108 32.435C0.0981434 33.6717 0.0981443 35.6767 1.35108 36.9134C2.60401 38.15 4.63541 38.15 5.88834 36.9134L19.5002 23.4783L33.112 36.9133Z" fill="white"/>
    </svg>
    `,
    defaultSideSheetClose: N = !0,
    cleanUpOnClose: K = !1,
    dismissible: P = !0,
    velocityThreshold: j = 0.9,
    distanceThreshold: G = 150,
    closeOnOverlayClick: ut = !0,
    onDragStart: ft = () => {
    },
    onDragEnd: dt = () => {
    },
    sideSheetIcon: ht = `
    <svg width="16" height="14" viewBox="0 0 26 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.5046 40.8036C23.2926 42.0804 21.2623 42.1465 19.9698 40.9513L1.76653 24.118C0.474022 22.9228 0.408779 20.9188 1.62081 19.6421L18.6906 1.66043C19.9026 0.383653 21.9329 0.317552 23.2254 1.51279C24.5179 2.70802 24.5832 4.71199 23.3712 5.98876L8.49597 21.6586L24.3589 36.3277C25.6514 37.5229 25.7166 39.5269 24.5046 40.8036Z" fill="white"/>
    </svg> 
    `,
    sideSheetIconPosition: $ = "left",
    sideSheetOpenValue: Q = "50%",
    sideSheetCloseValue: Tt = "30%",
    scaleOnDrag: ie = !0,
    scaleItems: Ot = [],
    scaleValues: W = []
  } = i, O;
  p = typeof p != "string" ? promise.resolve(p).then((r) => {
  }) : p;
  let it = d ? (Lt = document == null ? void 0 : document.querySelector(`#${d}`)) == null ? void 0 : Lt.getAttribute("data-bottomsheet-id") : "", c = it ? document == null ? void 0 : document.querySelector(`#${it}`) : "";
  const L = document.querySelector(`#${c == null ? void 0 : c.id}-overlay`) ? document.querySelector(`#${c == null ? void 0 : c.id}-overlay`) : document.createElement("div");
  L.id = `${c == null ? void 0 : c.id}-overlay`;
  let se = "spring(1, 95, 25, 13)", Y = "spring(1, 95, 25, 13)";
  document.addEventListener("click", (r) => {
    setTimeout(() => {
      r.target.tagName.toLowerCase() === "input" && Oi() === "Android" && q(c, "0px", z());
    }, 100);
  }), M ? st(M) : setTimeout(() => {
    d && document.querySelector(`#${d}`) && document.querySelectorAll(`#${d}`).forEach(
      (r) => r.addEventListener("click", () => {
        st(!1);
      })
    );
  }, 400);
  function st(r = !1) {
    document.body.style.overflowY = "contain", g && g(), p && !c ? (document.body.insertAdjacentHTML("beforeend", p), c = it ? document.querySelector(`#${it}`) : document.querySelector(
      `#${new DOMParser().parseFromString(p, "text/html").body.firstChild.id}`
    )) : p && !c.innerHTML && (c.innerHTML = new DOMParser().parseFromString(
      p,
      "text/html"
    ).body.firstChild.innerHTML), c && !document.getElementById(`#${c.id}`) && document.body.append(c), re(), e && (L.classList.add("overlay"), Xt(L), document.body.appendChild(L), c && document.querySelector(".overlay") && document.body.insertBefore(L, c), ut && L.addEventListener("click", () => {
      X(l, P);
    }));
    let l = !(window.innerWidth < s);
    document.querySelectorAll(`#${c == null ? void 0 : c.id}`).length < 2 ? ne(c, l, L, r) : pt(l, r);
  }
  function ne(r, l, h, u) {
    let m = R(r), A = vt(t[t.length - 1]), I = document.createElement("div"), y = document.createElement("div"), x = "";
    r.style.display = "block", I.id = "modal-close", I.classList.add("close-modal"), I.addEventListener(
      "click",
      () => At(r, h)
    ), $ === "left" ? y.id = "side-left" : y.id = "side-right", N && y.addEventListener("click", () => {
      nt(h);
    }), I.insertAdjacentHTML("afterbegin", C), console.log(y.children), y.children.length === 0 && y.insertAdjacentHTML("afterbegin", ht), n && (typeof n == "string" ? (n = new DOMParser().parseFromString(
      n,
      "text/xml"
    ), x = n.childNodes[0].id, n = n.childNodes[0]) : x = n == null ? void 0 : n.id, n.setAttribute("data-draggable", "1"), n.classList.add("draggable")), It(
      r,
      y,
      l,
      x,
      h,
      I
    ), l = oe(
      r,
      y,
      l,
      h,
      I,
      x
    ), setTimeout(() => {
      o();
    }, 300), O && O < window.innerHeight && window.innerWidth < s ? X(l, P) : pt(l, u), r.click(), r.style.overflow = "scroll", r.style.touchAction = "auto", setTimeout(() => {
      ce(
        r,
        m,
        A,
        r,
        x,
        h,
        l
      );
    }, 400), document.querySelector(`.bottomsheet #${r.id}`) && (document.querySelector(
      `.bottomsheet #${r.id}`
    ).style.display = "block");
  }
  function re() {
    var r = { attributes: !0, childList: !0 }, l = function(u) {
      for (var m of u)
        m.type == "attributes" && window.innerWidth < s && ie && ae();
    }, h = new MutationObserver(l);
    h.observe(c, r);
  }
  function oe(r, l, h, u, m, A) {
    return window.addEventListener("resize", () => (It(
      r,
      l,
      h,
      A,
      u,
      m
    ), window.innerWidth < s ? h = !1 : h = !0, h)), h;
  }
  function At(r, l) {
    D({
      targets: r,
      opacity: 0,
      easing: se,
      duration: 0.1,
      translateY: "-40%"
    }), setTimeout(() => {
      gt(r);
    }, 500), B(l);
  }
  function X(r = !1, l = !0, h = 7) {
    e && L && B(L), document.body.style.overflow = "scroll", window.innerWidth < s ? D({
      targets: c,
      translateY: `${l ? v(100) : k(V(t[0]))}px`,
      easing: z(),
      duration: 1
    }) : f === "modal" ? At(c, L) : nt(L), O = v(100), setTimeout(() => {
      O >= window.innerHeight && K && gt(c);
    }, 500), B(L), a();
  }
  function It(r, l, h, u, m, A) {
    h ? (n && document.querySelector(`#${r.id} #${u}`) && r.removeChild(n), f === "modal" ? r.classList.add("modal") : r.classList.add("side-sheet"), r.classList.remove("bottomsheet"), !document.querySelector(`#${r.id} #modal-close`) && f === "modal" ? r.prepend(A) : !document.querySelector(`#${r.id} #side-right`) && !document.querySelector(`#${r.id} #side-left`) && f !== "modal" && (r.prepend(l), nt())) : (u && !document.querySelector(`#${r == null ? void 0 : r.id} #${u}`) && r.prepend(n), document.querySelector(`#${r.id} #modal-close`) && r.removeChild(A), document.querySelector(`#${r.id} #side-left`) && r.removeChild(l), document.querySelector(`#${r.id} #side-right`) && r.removeChild(l), r.classList.add("bottomsheet"), r.classList.remove("modal"), r.classList.remove("side-sheet"));
  }
  function pt(r = !1, l = !1) {
    document.body.style.overflow = "hidden", e && Xt(L), r ? f === "sideSheetLeft" ? (c.style.top = 0, c.style.left = "-100%", setTimeout(() => {
      D({
        targets: c,
        left: "0",
        width: Q,
        opacity: 1,
        easing: Y,
        duration: 1
      });
    }, 100)) : f === "sideSheetRight" ? (c.style.top = 0, c.style.right = "-100%", c.style.left = "unset", setTimeout(() => {
      D({
        targets: c,
        right: "0",
        opacity: 1,
        width: Q,
        easing: Y,
        duration: 1
      });
    }, 100)) : (c.style.top = "50%", c.style.opacity = 0, c.style.transform = "translateX(-50%) translateY(-40%) rotateX(-20deg)", D({
      translateY: "-50%",
      targets: c,
      opacity: 1,
      rotateX: "1deg",
      easing: Y,
      duration: 0.1
    })) : l ? (c.style.opacity = 1, c.style.transform = `translateY(${k(
      V(t[0])
    )}px)`) : (D({
      targets: c,
      translateY: `${v(100)}px`,
      easing: "linear",
      duration: 1
    }), setTimeout(() => {
      D({
        targets: c,
        translateY: `${k(V(t[0]))}px`,
        easing: Y,
        opacity: 1,
        duration: 1
      });
    }, 60)), O = k(V(t[0]));
  }
  function ce(r, l, h, u, m, A, I) {
    new Ti(
      r,
      {
        onDrag: ({
          active: y,
          velocity: [x, E],
          offset: b,
          distance: [H, yt],
          target: Dt,
          direction: fe,
          ...Ii
        }) => {
          let Mt = 0, de = 1 / 0;
          l = R(u), window.innerWidth < s && (fe[1] > 0 ? m && Dt === document.querySelector(`#${m}`) ? (u.style.overflow = "hidden", u.style.touchAction = "none", mt(
            u,
            Mt,
            null,
            y,
            h,
            E,
            b,
            yt,
            A
          ), O >= window.innerHeight && X(I, P, E), O >= window.innerHeight && B(A)) : u.scrollTop >= 1 && l <= v(100 - h) && (!m || Dt !== document.querySelector(`#${m}`)) ? (u.style.overflow = "scroll", u.style.touchAction = "auto", u.click()) : (u.style.overflow = "hidden", u.style.touchAction = "none", mt(
            u,
            Mt,
            null,
            y,
            h,
            E,
            b,
            yt,
            A
          ), O >= window.innerHeight && X(I, P, E)) : R(c) <= v(100 - h) ? (u.click(), u.style.overflow = "scroll", v(100 - h) > 0 && (u.style.minHeight = "unset"), u.style.height = `${v(h)}px`, u.style.touchAction = "auto") : (u.style.overflow = "hidden", u.style.touchAction = "none", mt(
            u,
            null,
            de,
            y,
            h,
            E,
            b,
            yt,
            A
          ), O >= window.innerHeight && X(I, P, E)));
        },
        onDragStart: ({ direction: y }) => {
          document.body.style.overflow = "hidden", ft(y);
        },
        onDragEnd: ({ direction: y }) => {
          l = R(u), (l <= v(100 - h) || O === 0) && y[1] < 0 && c.scrollTop >= 0 && (u.style.overflow = "scroll", u.click(), u.style.touchAction = "auto"), (l <= v(100 - h) || O === 0) && y[1] > 0 && c.scrollTop === 0 && (u.style.overflow = "hidden"), dt(y);
        }
      },
      {
        drag: {
          filterTaps: !1,
          rubberband: !0,
          axis: "y",
          preventDefault: !1,
          from: () => [0, R(u)]
        }
      }
    );
  }
  function mt(r, l, h, u, m, A, I, y, x, E) {
    let b = I[1];
    if (h === null) {
      let H = function() {
        return kt(
          b > window.innerHeight ? window.innerHeight : b < v(100 - m) ? v(100 - m) : b,
          r,
          A,
          m,
          y,
          !1,
          x,
          P
        );
      };
      u && q(
        r,
        `${b > window.innerHeight ? window.innerHeight : b < v(100 - m) ? v(100 - m) : b}px`,
        "spring(1, 250, 25, 25)"
      ), u || H() !== void 0 && (I[1] = H());
    } else {
      let H = function() {
        return xt(
          b > window.innerHeight ? window.innerHeight : b < v(100 - m) ? v(100 - m) : b,
          r,
          A,
          m,
          y,
          !1,
          x
        );
      };
      u && q(
        r,
        `${b > window.innerHeight ? window.innerHeight : b < v(100 - m) ? v(100 - m) : b}px`,
        "spring(1, 250, 25, 25)"
      ), u || H() !== void 0 && (I[1] = H());
    }
  }
  function R(r) {
    var l, h;
    return +((h = r == null ? void 0 : r.style) == null ? void 0 : h.transform.slice(
      11,
      (l = r == null ? void 0 : r.style) == null ? void 0 : l.transform.indexOf("px")
    ));
  }
  function xt(r, l, h, u, m, A, I, y) {
    let x = 1 / 0;
    if (t.forEach((E) => {
      let b = vt(E);
      v(b) > k(r) && v(b) < x && (x = v(b));
    }), x !== 1 / 0)
      return A ? (q(
        l,
        `${k(x)}px`,
        z()
      ), O = k(x), O) : h > j || m < G ? (q(
        l,
        `${k(x)}px`,
        z()
      ), O = k(x), O) : kt(
        r,
        l,
        h,
        u,
        m,
        !0,
        I,
        P
      );
  }
  function kt(r, l, h, u, m, A, I, y, x) {
    let E = 0;
    return t.forEach((b) => {
      let H = vt(b);
      v(H) < k(r) && v(H) > E && (E = v(H));
    }), A ? (q(
      l,
      `${y ? k(E) : E <= V(t[0]) ? k(V(t[0])) : k(E)}px`,
      z()
    ), O = k(E), O) : h > j || m > G ? (q(
      l,
      `${y ? k(E) : E <= V(t[0]) ? k(V(t[0])) : k(E)}px`,
      z()
    ), O = k(E), O) : xt(
      r,
      l,
      h,
      u,
      m,
      !0,
      I
    );
  }
  function nt(r) {
    c.style.width === Tt ? D({
      targets: c,
      width: Q,
      easing: Y,
      duration: 0.1
    }) : D({
      targets: c,
      width: Tt,
      easing: Y,
      duration: 0.1
    }), setTimeout(() => {
      K && gt(c);
    }, 400), B(r);
  }
  document.querySelectorAll("[data-bottomsheet]");
  let Ct = 1;
  function ae() {
    Ot.length && Ot.forEach((r, l) => {
      document.getElementById(r) && Ct !== W[l] + (1 - W[l]) / window.innerHeight * R(c).toFixed(1) && (D({
        targets: `#${r}`,
        scale: W[l] + (1 - W[l]) / window.innerHeight * R(c),
        easing: "linear",
        duration: 0.1
      }), Ct = W[l] + (1 - W[l]) / window.innerHeight * R(c).toFixed(1));
    });
  }
  function gt(r) {
    r.remove();
  }
  function z() {
    return "spring(1, 95, 25, 13)";
  }
  function le() {
    document.getElementById(d).removeEventListener("click", () => {
      st(!1);
    });
  }
  function ue(r) {
    window.innerWidth > s && D({
      targets: c,
      width: r,
      easing: Y,
      duration: 0.1
    });
  }
  return {
    close: X,
    init: st,
    open: pt,
    destroy: le,
    moveSideSheetTo: ue
  };
}
export {
  ki as default
};
