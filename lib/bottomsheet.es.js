import L from "animejs/lib/anime.es.js";
function yt(i) {
  return typeof i == "string" ? +i.replace("%", "") : +i;
}
function H(i) {
  return typeof i == "string" ? v(+i.replace("%", "")) : +i;
}
function v(i) {
  return Math.round(window.innerHeight * i / 100);
}
function x(i) {
  return window.innerHeight - i;
}
function he() {
  var i = navigator.userAgent || navigator.vendor || window.opera;
  return /windows phone/i.test(i) ? "Windows Phone" : /android/i.test(i) ? "Android" : /iPad|iPhone|iPod/.test(i) && !window.MSStream ? "iOS" : "unknown";
}
function J(i) {
  L({
    targets: i,
    opacity: 0,
    easing: "spring(1, 85, 35, 3)",
    duration: 0
  }), setTimeout(() => {
    var t;
    (t = i == null ? void 0 : i.classList) != null && t.contains("display") && i.classList.remove("display"), i && i.remove();
  }, 300), document.body.style.overflow = "scroll";
}
function St(i) {
  i.classList.add("display"), L({
    targets: i,
    opacity: 1,
    easing: "spring(1, 85, 35, 3)",
    duration: 0
  });
}
function q(i, t, e, s) {
  L({
    targets: i,
    translateY: t,
    easing: e,
    duration: s
  });
}
function pe(i, t, e) {
  return Math.max(t, Math.min(i, e));
}
const y = {
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
function $t(i, t, e) {
  return t === 0 || Math.abs(t) === 1 / 0 ? Math.pow(i, e * 5) : i * t * e / (t + e * i);
}
function Ht(i, t, e, s = 0.15) {
  return s === 0 ? pe(i, t, e) : i < t ? -$t(t - i, e - t, s) + t : i > e ? +$t(i - e, e - t, s) + e : i;
}
function ge(i, [t, e], [s, n]) {
  const [[o, l], [h, p]] = i;
  return [Ht(t, o, l, s), Ht(e, h, p, n)];
}
function O(i, t, e) {
  return t in i ? Object.defineProperty(i, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : i[t] = e, i;
}
function Rt(i, t) {
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
    t % 2 ? Rt(Object(e), !0).forEach(function(s) {
      O(i, s, e[s]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(e)) : Rt(Object(e)).forEach(function(s) {
      Object.defineProperty(i, s, Object.getOwnPropertyDescriptor(e, s));
    });
  }
  return i;
}
const Ft = {
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
function Vt(i) {
  return i ? i[0].toUpperCase() + i.slice(1) : "";
}
const me = ["enter", "leave"];
function _e(i = !1, t) {
  return i && !me.includes(t);
}
function ye(i, t = "", e = !1) {
  const s = Ft[i], n = s && s[t] || t;
  return "on" + Vt(i) + Vt(n) + (_e(e, n) ? "Capture" : "");
}
const ve = ["gotpointercapture", "lostpointercapture"];
function we(i) {
  let t = i.substring(2).toLowerCase();
  const e = !!~t.indexOf("passive");
  e && (t = t.replace("passive", ""));
  const s = ve.includes(t) ? "capturecapture" : "capture", n = !!~t.indexOf(s);
  return n && (t = t.replace("capture", "")), {
    device: t,
    capture: n,
    passive: e
  };
}
function be(i, t = "") {
  const e = Ft[i], s = e && e[t] || t;
  return i + s;
}
function at(i) {
  return "touches" in i;
}
function Zt(i) {
  return at(i) ? "touch" : "pointerType" in i ? i.pointerType : "mouse";
}
function Ee(i) {
  return Array.from(i.touches).filter((t) => {
    var e, s;
    return t.target === i.currentTarget || ((e = i.currentTarget) === null || e === void 0 || (s = e.contains) === null || s === void 0 ? void 0 : s.call(e, t.target));
  });
}
function Te(i) {
  return i.type === "touchend" || i.type === "touchcancel" ? i.changedTouches : i.targetTouches;
}
function Jt(i) {
  return at(i) ? Te(i)[0] : i;
}
function wt(i, t) {
  const e = t.clientX - i.clientX, s = t.clientY - i.clientY, n = (t.clientX + i.clientX) / 2, o = (t.clientY + i.clientY) / 2, l = Math.hypot(e, s);
  return {
    angle: -(Math.atan2(e, s) * 180) / Math.PI,
    distance: l,
    origin: [n, o]
  };
}
function Oe(i) {
  return Ee(i).map((t) => t.identifier);
}
function Kt(i, t) {
  const [e, s] = Array.from(i.touches).filter((n) => t.includes(n.identifier));
  return wt(e, s);
}
function vt(i) {
  const t = Jt(i);
  return at(i) ? t.identifier : t.pointerId;
}
function Z(i) {
  const t = Jt(i);
  return [t.clientX, t.clientY];
}
const jt = 40, Yt = 800;
function Qt(i) {
  let {
    deltaX: t,
    deltaY: e,
    deltaMode: s
  } = i;
  return s === 1 ? (t *= jt, e *= jt) : s === 2 && (t *= Yt, e *= Yt), [t, e];
}
function Ie(i) {
  var t, e;
  const {
    scrollX: s,
    scrollY: n,
    scrollLeft: o,
    scrollTop: l
  } = i.currentTarget;
  return [(t = s ?? o) !== null && t !== void 0 ? t : 0, (e = n ?? l) !== null && e !== void 0 ? e : 0];
}
function xe(i) {
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
function ct(i, ...t) {
  return typeof i == "function" ? i(...t) : i;
}
function Ce() {
}
function Le(...i) {
  return i.length === 0 ? Ce : i.length === 1 ? i[0] : function() {
    let t;
    for (const e of i)
      t = e.apply(this, arguments) || t;
    return t;
  };
}
function qt(i, t) {
  return Object.assign({}, t, i || {});
}
const ke = 32;
class Bt {
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
    e._active || (this.reset(), this.computeInitial(), e._active = !0, e.target = t.target, e.currentTarget = t.currentTarget, e.lastOffset = s.from ? ct(s.from, e) : e.offset, e.offset = e.lastOffset), e.startTime = e.timeStamp = t.timeStamp;
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
    if (t && (e.event = t, s.preventDefault && t.cancelable && e.event.preventDefault(), e.type = t.type, n.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size, n.locked = !!document.pointerLockElement, Object.assign(n, xe(t)), n.down = n.pressed = n.buttons % 2 === 1 || n.touches > 0, o = t.timeStamp - e.timeStamp, e.timeStamp = t.timeStamp, e.elapsedTime = e.timeStamp - e.startTime), e._active) {
      const R = e._delta.map(Math.abs);
      y.addTo(e._distance, R);
    }
    this.axisIntent && this.axisIntent(t);
    const [l, h] = e._movement, [p, _] = s.threshold, {
      _step: d,
      values: A
    } = e;
    if (s.hasCustomTransform ? (d[0] === !1 && (d[0] = Math.abs(l) >= p && A[0]), d[1] === !1 && (d[1] = Math.abs(h) >= _ && A[1])) : (d[0] === !1 && (d[0] = Math.abs(l) >= p && Math.sign(l) * p), d[1] === !1 && (d[1] = Math.abs(h) >= _ && Math.sign(h) * _)), e.intentional = d[0] !== !1 || d[1] !== !1, !e.intentional)
      return;
    const k = [0, 0];
    if (s.hasCustomTransform) {
      const [R, Tt] = A;
      k[0] = d[0] !== !1 ? R - d[0] : 0, k[1] = d[1] !== !1 ? Tt - d[1] : 0;
    } else
      k[0] = d[0] !== !1 ? l - d[0] : 0, k[1] = d[1] !== !1 ? h - d[1] : 0;
    this.restrictToAxis && !e._blocked && this.restrictToAxis(k);
    const N = e.offset, V = e._active && !e._blocked || e.active;
    V && (e.first = e._active && !e.active, e.last = !e._active && e.active, e.active = n[this.ingKey] = e._active, t && (e.first && ("bounds" in s && (e._bounds = ct(s.bounds, e)), this.setup && this.setup()), e.movement = k, this.computeOffset()));
    const [P, K] = e.offset, [[W, lt], [ut, ft]] = e._bounds;
    e.overflow = [P < W ? -1 : P > lt ? 1 : 0, K < ut ? -1 : K > ft ? 1 : 0], e._movementBound[0] = e.overflow[0] ? e._movementBound[0] === !1 ? e._movement[0] : e._movementBound[0] : !1, e._movementBound[1] = e.overflow[1] ? e._movementBound[1] === !1 ? e._movement[1] : e._movementBound[1] : !1;
    const dt = e._active ? s.rubberband || [0, 0] : [0, 0];
    if (e.offset = ge(e._bounds, e.offset, dt), e.delta = y.sub(e.offset, N), this.computeMovement(), V && (!e.last || o > ke)) {
      e.delta = y.sub(e.offset, N);
      const R = e.delta.map(Math.abs);
      y.addTo(e.distance, R), e.direction = e.delta.map(Math.sign), e._direction = e._delta.map(Math.sign), !e.first && o > 0 && (e.velocity = [R[0] / o, R[1] / o]);
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
function De([i, t], e) {
  const s = Math.abs(i), n = Math.abs(t);
  if (s > n && s > e)
    return "x";
  if (n > s && n > e)
    return "y";
}
class Q extends Bt {
  constructor(...t) {
    super(...t), O(this, "aliasKey", "xy");
  }
  reset() {
    super.reset(), this.state.axis = void 0;
  }
  init() {
    this.state.offset = [0, 0], this.state.lastOffset = [0, 0];
  }
  computeOffset() {
    this.state.offset = y.add(this.state.lastOffset, this.state.movement);
  }
  computeMovement() {
    this.state.movement = y.sub(this.state.offset, this.state.lastOffset);
  }
  axisIntent(t) {
    const e = this.state, s = this.config;
    if (!e.axis && t) {
      const n = typeof s.axisThreshold == "object" ? s.axisThreshold[Zt(t)] : s.axisThreshold;
      e.axis = De(e._movement, n);
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
const Ae = (i) => i, Ut = 0.15, te = {
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
        return [Ut, Ut];
      case !1:
        return [0, 0];
      default:
        return y.toVector(i);
    }
  },
  from(i) {
    if (typeof i == "function")
      return i;
    if (i != null)
      return y.toVector(i);
  },
  transform(i, t, e) {
    const s = i || e.shared.transform;
    return this.hasCustomTransform = !!s, s || Ae;
  },
  threshold(i) {
    return y.toVector(i, 0);
  }
}, Me = 0, U = w(w({}, te), {}, {
  axis(i, t, {
    axis: e
  }) {
    if (this.lockDirection = e === "lock", !this.lockDirection)
      return e;
  },
  axisThreshold(i = Me) {
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
}), nt = 10, Nt = {
  ArrowRight: (i = 1) => [nt * i, 0],
  ArrowLeft: (i = 1) => [-nt * i, 0],
  ArrowUp: (i = 1) => [0, -nt * i],
  ArrowDown: (i = 1) => [0, nt * i]
};
class Pe extends Q {
  constructor(...t) {
    super(...t), O(this, "ingKey", "dragging");
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
    e.pointerCapture && t.target.setPointerCapture(t.pointerId), !(n && n.size > 1 && s._pointerActive) && (this.start(t), this.setupPointer(t), s._pointerId = vt(t), s._pointerActive = !0, this.computeValues(Z(t)), this.computeInitial(), e.preventScrollAxis && Zt(t) !== "mouse" ? (s._active = !1, this.setupScrollPrevention(t)) : e.delay > 0 ? (this.setupDelayTrigger(t), e.triggerAllEvents && (this.compute(t), this.emit())) : this.startPointerDrag(t));
  }
  startPointerDrag(t) {
    const e = this.state;
    e._active = !0, e._preventScroll = !0, e._delayed = !1, this.compute(t), this.emit();
  }
  pointerMove(t) {
    const e = this.state, s = this.config;
    if (!e._pointerActive || e.type === t.type && t.timeStamp === e.timeStamp)
      return;
    const n = vt(t);
    if (e._pointerId !== void 0 && n !== e._pointerId)
      return;
    const o = Z(t);
    if (document.pointerLockElement === t.target ? e._delta = [t.movementX, t.movementY] : (e._delta = y.sub(o, e._values), this.computeValues(o)), y.addTo(e._movement, e._delta), this.compute(t), e._delayed && e.intentional) {
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
    const n = vt(t);
    if (e._pointerId !== void 0 && n !== e._pointerId)
      return;
    this.state._pointerActive = !1, this.setActive(), this.compute(t);
    const [o, l] = e._distance;
    if (e.tap = o <= s.tapsThreshold && l <= s.tapsThreshold, e.tap && s.filterTaps)
      e._force = !0;
    else {
      const [h, p] = e.direction, [_, d] = e.velocity, [A, k] = e.movement, [N, V] = s.swipe.velocity, [P, K] = s.swipe.distance, W = s.swipe.duration;
      e.elapsedTime < W && (Math.abs(_) > N && Math.abs(A) > P && (e.swipe[0] = h), Math.abs(d) > V && Math.abs(k) > K && (e.swipe[1] = p));
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
    this.state._preventScroll = !1, Se(t);
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
    const e = Nt[t.key];
    if (e) {
      const s = this.state, n = t.shiftKey ? 10 : t.altKey ? 0.1 : 1;
      this.start(t), s._delta = e(n), s._keyboardActive = !0, y.addTo(s._movement, s._delta), this.compute(t), this.emit();
    }
  }
  keyUp(t) {
    t.key in Nt && (this.state._keyboardActive = !1, this.setActive(), this.compute(t), this.emit());
  }
  bind(t) {
    const e = this.config.device;
    t(e, "start", this.pointerDown.bind(this)), this.config.pointerCapture && (t(e, "change", this.pointerMove.bind(this)), t(e, "end", this.pointerUp.bind(this)), t(e, "cancel", this.pointerUp.bind(this)), t("lostPointerCapture", "", this.pointerUp.bind(this))), this.config.keys && (t("key", "down", this.keyDown.bind(this)), t("key", "up", this.keyUp.bind(this))), this.config.filterTaps && t("click", "", this.pointerClick.bind(this), {
      capture: !0,
      passive: !1
    });
  }
}
function Se(i) {
  "persist" in i && typeof i.persist == "function" && i.persist();
}
const B = typeof window < "u" && window.document && window.document.createElement;
function $e() {
  return B && "ontouchstart" in window;
}
function Wt() {
  return $e() || B && window.navigator.maxTouchPoints > 1;
}
function He() {
  return B && "onpointerdown" in window;
}
function Re() {
  return B && "exitPointerLock" in window.document;
}
function Ve() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const S = {
  isBrowser: B,
  gesture: Ve(),
  touch: Wt(),
  touchscreen: Wt(),
  pointer: He(),
  pointerLock: Re()
}, Ke = 250, je = 180, Ye = 0.5, qe = 50, Ue = 250, Gt = {
  mouse: 0,
  touch: 0,
  pen: 8
}, Ne = w(w({}, U), {}, {
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
    if (this.preventScrollDelay = typeof e == "number" ? e : e || e === void 0 && i ? Ke : void 0, !(!S.touchscreen || e === !1))
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
    const o = y.toVector(i, e ? s : n ? 1 : 0);
    return this.filterTaps = e, this.tapsThreshold = s, o;
  },
  swipe({
    velocity: i = Ye,
    distance: t = qe,
    duration: e = Ue
  } = {}) {
    return {
      velocity: this.transform(y.toVector(i)),
      distance: this.transform(y.toVector(t)),
      duration: e
    };
  },
  delay(i = 0) {
    switch (i) {
      case !0:
        return je;
      case !1:
        return 0;
      default:
        return i;
    }
  },
  axisThreshold(i) {
    return i ? w(w({}, Gt), i) : Gt;
  }
});
function ee(i) {
  const [t, e] = i.overflow, [s, n] = i._delta, [o, l] = i._direction;
  (t < 0 && s > 0 && o < 0 || t > 0 && s < 0 && o > 0) && (i._movement[0] = i._movementBound[0]), (e < 0 && n > 0 && l < 0 || e > 0 && n < 0 && l > 0) && (i._movement[1] = i._movementBound[1]);
}
const We = 30, Ge = 100;
class Xe extends Bt {
  constructor(...t) {
    super(...t), O(this, "ingKey", "pinching"), O(this, "aliasKey", "da");
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
    t === "wheel" ? this.state.offset = y.add(e, s) : this.state.offset = [(1 + e[0]) * s[0], e[1] + s[1]];
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
      const n = Math.abs(e) * We - Math.abs(s);
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
    const n = Kt(t, e._touchIds);
    this.pinchStart(t, n);
  }
  pointerStart(t) {
    if (t.buttons != null && t.buttons % 2 !== 1)
      return;
    this.ctrl.setEventIds(t), t.target.setPointerCapture(t.pointerId);
    const e = this.state, s = e._pointerEvents, n = this.ctrl.pointerIds;
    if (e._active && Array.from(s.keys()).every((l) => n.has(l)) || (s.size < 2 && s.set(t.pointerId, t), e._pointerEvents.size < 2))
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
    const e = Kt(t, this.state._touchIds);
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
    let l = 0;
    Math.abs(o) > 270 && (l += Math.sign(o)), this.computeValues([e.distance, e.angle - 360 * l]), s.origin = e.origin, s.turns = l, s._movement = [s._values[0] / s._initial[0] - 1, s._values[1] - s._initial[1]], this.compute(t), this.emit();
  }
  touchEnd(t) {
    this.ctrl.setEventIds(t), this.state._active && this.state._touchIds.some((e) => !this.ctrl.touchIds.has(e)) && (this.state._active = !1, this.compute(t), this.emit());
  }
  pointerEnd(t) {
    const e = this.state;
    this.ctrl.setEventIds(t);
    try {
      t.target.releasePointerCapture(t.pointerId);
    } catch {
    }
    e._pointerEvents.has(t.pointerId) && e._pointerEvents.delete(t.pointerId), e._active && e._pointerEvents.size < 2 && (e._active = !1, this.compute(t), this.emit());
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
    e._movement = [t.scale - 1, t.rotation], e._delta = y.sub(e._movement, s), this.compute(t), this.emit();
  }
  gestureEnd(t) {
    this.state._active && (this.state._active = !1, this.compute(t), this.emit());
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
    s._delta = [-Qt(t)[1] / Ge * s.offset[0], 0], y.addTo(s._movement, s._delta), ee(s), this.state.origin = [t.clientX, t.clientY], this.compute(t), this.emit();
  }
  wheelEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(t) {
    const e = this.config.device;
    e && (t(e, "start", this[e + "Start"].bind(this)), t(e, "change", this[e + "Move"].bind(this)), t(e, "end", this[e + "End"].bind(this)), t(e, "cancel", this[e + "End"].bind(this))), this.config.pinchOnWheel && t("wheel", "", this.wheel.bind(this), {
      passive: !1
    });
  }
}
const ze = w(w({}, te), {}, {
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
    const n = (l) => {
      const h = qt(ct(e, l), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [h.min, h.max];
    }, o = (l) => {
      const h = qt(ct(s, l), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [h.min, h.max];
    };
    return typeof e != "function" && typeof s != "function" ? [n(), o()] : (l) => [n(l), o(l)];
  },
  threshold(i, t, e) {
    return this.lockDirection = e.axis === "lock", y.toVector(i, this.lockDirection ? [0.1, 3] : 0);
  },
  modifierKey(i) {
    return i === void 0 ? "ctrlKey" : i;
  },
  pinchOnWheel(i = !0) {
    return i;
  }
});
class Fe extends Q {
  constructor(...t) {
    super(...t), O(this, "ingKey", "moving");
  }
  move(t) {
    this.config.mouseOnly && t.pointerType !== "mouse" || (this.state._active ? this.moveChange(t) : this.moveStart(t), this.timeoutStore.add("moveEnd", this.moveEnd.bind(this)));
  }
  moveStart(t) {
    this.start(t), this.computeValues(Z(t)), this.compute(t), this.computeInitial(), this.emit();
  }
  moveChange(t) {
    if (!this.state._active)
      return;
    const e = Z(t), s = this.state;
    s._delta = y.sub(e, s._values), y.addTo(s._movement, s._delta), this.computeValues(e), this.compute(t), this.emit();
  }
  moveEnd(t) {
    this.state._active && (this.state._active = !1, this.compute(t), this.emit());
  }
  bind(t) {
    t("pointer", "change", this.move.bind(this)), t("pointer", "leave", this.moveEnd.bind(this));
  }
}
const Ze = w(w({}, U), {}, {
  mouseOnly: (i = !0) => i
});
class Je extends Q {
  constructor(...t) {
    super(...t), O(this, "ingKey", "scrolling");
  }
  scroll(t) {
    this.state._active || this.start(t), this.scrollChange(t), this.timeoutStore.add("scrollEnd", this.scrollEnd.bind(this));
  }
  scrollChange(t) {
    t.cancelable && t.preventDefault();
    const e = this.state, s = Ie(t);
    e._delta = y.sub(s, e._values), y.addTo(e._movement, e._delta), this.computeValues(s), this.compute(t), this.emit();
  }
  scrollEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(t) {
    t("scroll", "", this.scroll.bind(this));
  }
}
const Qe = U;
class Be extends Q {
  constructor(...t) {
    super(...t), O(this, "ingKey", "wheeling");
  }
  wheel(t) {
    this.state._active || this.start(t), this.wheelChange(t), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(t) {
    const e = this.state;
    e._delta = Qt(t), y.addTo(e._movement, e._delta), ee(e), this.compute(t), this.emit();
  }
  wheelEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(t) {
    t("wheel", "", this.wheel.bind(this));
  }
}
const ti = U;
class ei extends Q {
  constructor(...t) {
    super(...t), O(this, "ingKey", "hovering");
  }
  enter(t) {
    this.config.mouseOnly && t.pointerType !== "mouse" || (this.start(t), this.computeValues(Z(t)), this.compute(t), this.emit());
  }
  leave(t) {
    if (this.config.mouseOnly && t.pointerType !== "mouse")
      return;
    const e = this.state;
    if (!e._active)
      return;
    e._active = !1;
    const s = Z(t);
    e._movement = e._delta = y.sub(s, e._values), this.computeValues(s), this.compute(t), e.delta = e.movement, this.emit();
  }
  bind(t) {
    t("pointer", "enter", this.enter.bind(this)), t("pointer", "leave", this.leave.bind(this));
  }
}
const ii = w(w({}, U), {}, {
  mouseOnly: (i = !0) => i
}), Et = /* @__PURE__ */ new Map(), bt = /* @__PURE__ */ new Map();
function si(i) {
  Et.set(i.key, i.engine), bt.set(i.key, i.resolver);
}
const ni = {
  key: "drag",
  engine: Pe,
  resolver: Ne
}, ri = {
  key: "hover",
  engine: ei,
  resolver: ii
}, oi = {
  key: "move",
  engine: Fe,
  resolver: Ze
}, ci = {
  key: "pinch",
  engine: Xe,
  resolver: ze
}, ai = {
  key: "scroll",
  engine: Je,
  resolver: Qe
}, li = {
  key: "wheel",
  engine: Be,
  resolver: ti
};
function ui(i, t) {
  if (i == null)
    return {};
  var e = {}, s = Object.keys(i), n, o;
  for (o = 0; o < s.length; o++)
    n = s[o], !(t.indexOf(n) >= 0) && (e[n] = i[n]);
  return e;
}
function fi(i, t) {
  if (i == null)
    return {};
  var e = ui(i, t), s, n;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(i);
    for (n = 0; n < o.length; n++)
      s = o[n], !(t.indexOf(s) >= 0) && Object.prototype.propertyIsEnumerable.call(i, s) && (e[s] = i[s]);
  }
  return e;
}
const di = {
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
}, hi = ["target", "eventOptions", "window", "enabled", "transform"];
function ot(i = {}, t) {
  const e = {};
  for (const [s, n] of Object.entries(t))
    switch (typeof n) {
      case "function":
        e[s] = n.call(e, i[s], s, i);
        break;
      case "object":
        e[s] = ot(i[s], n);
        break;
      case "boolean":
        n && (e[s] = i[s]);
        break;
    }
  return e;
}
function pi(i, t, e = {}) {
  const s = i, {
    target: n,
    eventOptions: o,
    window: l,
    enabled: h,
    transform: p
  } = s, _ = fi(s, hi);
  if (e.shared = ot({
    target: n,
    eventOptions: o,
    window: l,
    enabled: h,
    transform: p
  }, di), t) {
    const d = bt.get(t);
    e[t] = ot(w({
      shared: e.shared
    }, _), d);
  } else
    for (const d in _) {
      const A = bt.get(d);
      A && (e[d] = ot(w({
        shared: e.shared
      }, _[d]), A));
    }
  return e;
}
class ie {
  constructor(t, e) {
    O(this, "_listeners", /* @__PURE__ */ new Set()), this._ctrl = t, this._gestureKey = e;
  }
  add(t, e, s, n, o) {
    const l = this._listeners, h = be(e, s), p = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}, _ = w(w({}, p), o);
    t.addEventListener(h, n, _);
    const d = () => {
      t.removeEventListener(h, n, _), l.delete(d);
    };
    return l.add(d), d;
  }
  clean() {
    this._listeners.forEach((t) => t()), this._listeners.clear();
  }
}
class gi {
  constructor() {
    O(this, "_timeouts", /* @__PURE__ */ new Map());
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
    O(this, "gestures", /* @__PURE__ */ new Set()), O(this, "_targetEventStore", new ie(this)), O(this, "gestureEventStores", {}), O(this, "gestureTimeoutStores", {}), O(this, "handlers", {}), O(this, "config", {}), O(this, "pointerIds", /* @__PURE__ */ new Set()), O(this, "touchIds", /* @__PURE__ */ new Set()), O(this, "state", {
      shared: {
        shiftKey: !1,
        metaKey: !1,
        ctrlKey: !1,
        altKey: !1
      }
    }), _i(this, t);
  }
  setEventIds(t) {
    if (at(t))
      return this.touchIds = new Set(Oe(t)), this.touchIds;
    if ("pointerId" in t)
      return t.type === "pointerup" || t.type === "pointercancel" ? this.pointerIds.delete(t.pointerId) : t.type === "pointerdown" && this.pointerIds.add(t.pointerId), this.pointerIds;
  }
  applyHandlers(t, e) {
    this.handlers = t, this.nativeHandlers = e;
  }
  applyConfig(t, e) {
    this.config = pi(t, e, this.config);
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
        for (const l of this.gestures) {
          const h = this.config[l], p = Xt(s, h.eventOptions, !!n);
          if (h.enabled) {
            const _ = Et.get(l);
            new _(this, t, l).bind(p);
          }
        }
        const o = Xt(s, e.eventOptions, !!n);
        for (const l in this.nativeHandlers)
          o(
            l,
            "",
            (h) => this.nativeHandlers[l](w(w({}, this.state.shared), {}, {
              event: h,
              args: t
            })),
            void 0,
            !0
          );
      }
      for (const o in s)
        s[o] = Le(...s[o]);
      if (!n)
        return s;
      for (const o in s) {
        const {
          device: l,
          capture: h,
          passive: p
        } = we(o);
        this._targetEventStore.add(n, l, "", s[o], {
          capture: h,
          passive: p
        });
      }
    }
  }
}
function z(i, t) {
  i.gestures.add(t), i.gestureEventStores[t] = new ie(i, t), i.gestureTimeoutStores[t] = new gi();
}
function _i(i, t) {
  t.drag && z(i, "drag"), t.wheel && z(i, "wheel"), t.scroll && z(i, "scroll"), t.move && z(i, "move"), t.pinch && z(i, "pinch"), t.hover && z(i, "hover");
}
const Xt = (i, t, e) => (s, n, o, l = {}, h = !1) => {
  var p, _;
  const d = (p = l.capture) !== null && p !== void 0 ? p : t.capture, A = (_ = l.passive) !== null && _ !== void 0 ? _ : t.passive;
  let k = h ? s : ye(s, n, d);
  e && A && (k += "Passive"), i[k] = i[k] || [], i[k].push(o);
}, yi = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function vi(i) {
  const t = {}, e = {}, s = /* @__PURE__ */ new Set();
  for (let n in i)
    yi.test(n) ? (s.add(RegExp.lastMatch), e[n] = i[n]) : t[n] = i[n];
  return [e, t, s];
}
function F(i, t, e, s, n, o) {
  if (!i.has(e) || !Et.has(s))
    return;
  const l = e + "Start", h = e + "End", p = (_) => {
    let d;
    return _.first && l in t && t[l](_), e in t && (d = t[e](_)), _.last && h in t && t[h](_), d;
  };
  n[s] = p, o[s] = o[s] || {};
}
function wi(i, t) {
  const [e, s, n] = vi(i), o = {};
  return F(n, e, "onDrag", "drag", o, t), F(n, e, "onWheel", "wheel", o, t), F(n, e, "onScroll", "scroll", o, t), F(n, e, "onPinch", "pinch", o, t), F(n, e, "onMove", "move", o, t), F(n, e, "onHover", "hover", o, t), {
    handlers: o,
    config: t,
    nativeHandlers: s
  };
}
function bi(i, t, e) {
  return t in i ? Object.defineProperty(i, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : i[t] = e, i;
}
function zt(i, t) {
  var e = Object.keys(i);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(i);
    t && (s = s.filter(function(n) {
      return Object.getOwnPropertyDescriptor(i, n).enumerable;
    })), e.push.apply(e, s);
  }
  return e;
}
function rt(i) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? zt(Object(e), !0).forEach(function(s) {
      bi(i, s, e[s]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(e)) : zt(Object(e)).forEach(function(s) {
      Object.defineProperty(i, s, Object.getOwnPropertyDescriptor(e, s));
    });
  }
  return i;
}
class Ei {
  constructor(t, e, s, n, o) {
    this._target = t, this._gestureKey = n, this._ctrl = new mi(e), this._ctrl.applyHandlers(e, o), this._ctrl.applyConfig(rt(rt({}, s), {}, {
      target: t
    }), n), this._ctrl.effect();
  }
  destroy() {
    this._ctrl.clean();
  }
  setConfig(t) {
    this._ctrl.clean(), this._ctrl.applyConfig(rt(rt({}, t), {}, {
      target: this._target
    }), this._gestureKey), this._ctrl.effect();
  }
}
function Ti(i) {
  return i.forEach(si), function(t, e, s) {
    const {
      handlers: n,
      nativeHandlers: o,
      config: l
    } = wi(e, s || {});
    return new Ei(t, n, l, void 0, o);
  };
}
const Oi = function(t, e, s) {
  return Ti([ni, ci, ai, li, oi, ri])(t, e, s || {});
};
function Mi(i) {
  var At;
  let {
    snapPoints: t = ["100%"],
    displayOverlay: e = !1,
    minWidthForModal: s = 700,
    draggableArea: n = "",
    onOpen: o = () => {
    },
    onClose: l = () => {
    },
    trigger: h = "",
    content: p = "",
    onInit: _ = () => {
    },
    webLayout: d = "modal",
    openOnLoad: A = !1,
    modalCloseIcon: k = `<svg width="16" height="12" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33.112 36.9133C34.3649 38.15 36.3963 38.15 37.6492 36.9133C38.9022 35.6766 38.9022 33.6716 37.6492 32.435L24.0375 19L37.6492 5.56496C38.9022 4.3283 38.9022 2.32328 37.6492 1.08662C36.3963 -0.150042 34.3649 -0.150042 33.112 1.08662L19.5002 14.5216L5.88835 1.08655C4.63541 -0.150108 2.60401 -0.150107 1.35108 1.08655C0.0981471 2.32321 0.0981459 4.32824 1.35108 5.5649L14.9629 19L1.35108 32.435C0.0981434 33.6717 0.0981443 35.6767 1.35108 36.9134C2.60401 38.15 4.63541 38.15 5.88834 36.9134L19.5002 23.4783L33.112 36.9133Z" fill="white"/>
    </svg>
    `,
    defaultSideSheetClose: N = !0,
    cleanUpOnClose: V = !1,
    dismissible: P = !0,
    velocityThreshold: K = 0.9,
    distanceThreshold: W = 150,
    closeOnOverlayClick: lt = !0,
    onDragStart: ut = () => {
    },
    onDragEnd: ft = () => {
    },
    sideSheetIcon: dt = `
    <svg width="16" height="14" viewBox="0 0 26 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.5046 40.8036C23.2926 42.0804 21.2623 42.1465 19.9698 40.9513L1.76653 24.118C0.474022 22.9228 0.408779 20.9188 1.62081 19.6421L18.6906 1.66043C19.9026 0.383653 21.9329 0.317552 23.2254 1.51279C24.5179 2.70802 24.5832 4.71199 23.3712 5.98876L8.49597 21.6586L24.3589 36.3277C25.6514 37.5229 25.7166 39.5269 24.5046 40.8036Z" fill="white"/>
    </svg> 
    `,
    sideSheetRightIcon: R = `<svg width="16" height="14" viewBox="0 0 25 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.21057 1.34418C2.46351 0.107522 4.49491 0.107522 5.74784 1.34418L23.3937 18.7608C24.6466 19.9975 24.6466 22.0025 23.3937 23.2392L5.74784 40.6559C4.49491 41.8925 2.46351 41.8925 1.21057 40.6559C-0.0423591 39.4192 -0.0423591 37.4142 1.21057 36.1775L16.5878 21L1.21057 5.82253C-0.0423591 4.58586 -0.0423591 2.58084 1.21057 1.34418Z" fill="white"/>
    </svg>   
    `,
    sideSheetSnapPoints: Tt = ["10%", "25%", "50%", "100%"],
    animateOnDrag: Ii = {},
    sideSheetIconPosition: se = "left",
    sideSheetOpenValue: ht = "50%",
    sideSheetCloseValue: Ot = "30%",
    scaleOnDrag: It = !0,
    scaleItems: xi = [],
    scaleValues: Ci = [],
    springConfig: j = "spring(1, 95, 25, 13)",
    scrollableSheet: tt = !0
  } = i, I;
  p = typeof p != "string" ? promise.resolve(p).then((r) => {
  }) : p;
  let et = h ? (At = document == null ? void 0 : document.querySelector(`#${h}`)) == null ? void 0 : At.getAttribute("data-bottomsheet-id") : "", c = et ? document == null ? void 0 : document.querySelector(`#${et}`) : "";
  const D = document.querySelector(`#${c == null ? void 0 : c.id}-overlay`) ? document.querySelector(`#${c == null ? void 0 : c.id}-overlay`) : document.createElement("div");
  D.id = `${c == null ? void 0 : c.id}-overlay`;
  let xt = 0.93;
  document.addEventListener("click", (r) => {
    setTimeout(() => {
      r.target.tagName.toLowerCase() === "input" && he() === "Android" && q(c, "0px", X());
    }, 100);
  }), A ? it(A) : setTimeout(() => {
    h && document.querySelector(`#${h}`) && document.querySelectorAll(`#${h}`).forEach(
      (r) => r.addEventListener("click", () => {
        it(!1);
      })
    );
  }, 400);
  function it(r = !1) {
    _ && _(), p && !c ? (document.body.insertAdjacentHTML("beforeend", p), c = et ? document.querySelector(`#${et}`) : document.querySelector(
      `#${new DOMParser().parseFromString(p, "text/html").body.firstChild.id}`
    )) : p && !c.innerHTML && (c.innerHTML = new DOMParser().parseFromString(
      p,
      "text/html"
    ).body.firstChild.innerHTML);
    let a = JSON.parse(localStorage.getItem("array")) || [];
    (!a.length || a.length && (a == null ? void 0 : a.indexOf(c.id)) === -1 && c.id.length > 0) && (a == null || a.push(c.id), a.forEach((u) => {
    }), localStorage.setItem("array", JSON.stringify(a))), c && !document.getElementById(`#${c.id}`) && document.body.append(c), re(a), e && (D.classList.add("overlay"), St(D), document.body.appendChild(D), c && document.querySelector(".overlay") && document.body.insertBefore(D, c), lt && D.addEventListener("click", () => {
      G(P, a);
    }));
    let f = !(window.innerWidth < s);
    document.querySelectorAll(`#${c == null ? void 0 : c.id}`).length < 2 ? ne(
      c,
      f,
      D,
      r,
      a
    ) : pt(f, r);
  }
  function ne(r, a, f, u, g) {
    let E = Y(r), $ = yt(t[t.length - 1]), C = document.createElement("div"), m = document.createElement("div"), T = "";
    r.style.display = "block", C.id = "modal-close", C.classList.add("close-modal"), C.addEventListener(
      "click",
      () => Ct(r, f)
    ), se === "left" ? m.id = "side-left" : m.id = "side-right", N && m.addEventListener("click", () => {
      st(f);
    }), C.insertAdjacentHTML("afterbegin", k), m.children.length === 0 && m.insertAdjacentHTML("afterbegin", dt), n && (typeof n == "string" ? (n = new DOMParser().parseFromString(
      n,
      "text/xml"
    ), T = n.childNodes[0].id, n = n.childNodes[0]) : T = n == null ? void 0 : n.id, n.setAttribute("data-draggable", "1"), n.classList.add("draggable")), Lt(
      r,
      m,
      a,
      T,
      f,
      C
    ), a = oe(
      r,
      m,
      a,
      f,
      C,
      T
    ), setTimeout(() => {
      o();
    }, 300), I && I < window.innerHeight && window.innerWidth < s ? G(P, g) : pt(a, u), tt && (r.click(), r.style.overflow = "scroll", r.style.touchAction = "auto"), setTimeout(() => {
      ce(
        r,
        E,
        $,
        r,
        T,
        f,
        a,
        g
      );
    }, 400), document.querySelector(`.bottomsheet #${r.id}`) && (document.querySelector(
      `.bottomsheet #${r.id}`
    ).style.display = "block");
  }
  function re(r) {
    var a = { attributes: !0, childList: !0 }, f = function(g) {
      for (var E of g)
        E.type == "attributes" && window.innerWidth < s && It && ae(r);
    }, u = new MutationObserver(f);
    u.observe(c, a);
  }
  function oe(r, a, f, u, g, E) {
    return window.addEventListener("resize", () => (Lt(
      r,
      a,
      f,
      E,
      u,
      g
    ), window.innerWidth < s ? f = !1 : f = !0, f)), f;
  }
  function Ct(r, a) {
    L({
      targets: r,
      opacity: 0,
      easing: j,
      duration: 0.1,
      translateY: "-40%"
    }), setTimeout(() => {
      mt(r);
    }, 500), J(a);
  }
  function G(r = !0, a) {
    e && D && J(D), document.body.style.overflow = "scroll", window.innerWidth < s ? (L({
      targets: c,
      translateY: `${r ? v(120) : x(H(t[0]))}px`,
      easing: X(),
      duration: 1
    }), It && (a == null || a.forEach((f, u) => {
      u !== c.id && L({
        targets: `#${f}`,
        top: "0px",
        easing: "linear",
        duration: 1
      });
    }))) : d === "modal" ? Ct(c, D) : st(D), I = v(120), setTimeout(() => {
      I >= window.innerHeight && V && mt(c);
    }, 500), J(D), l();
  }
  function Lt(r, a, f, u, g, E) {
    f ? (n && document.querySelector(`#${r.id} #${u}`) && r.removeChild(n), d === "modal" ? r.classList.add("modal") : r.classList.add("side-sheet"), r.classList.remove("bottomsheet"), !document.querySelector(`#${r.id} #modal-close`) && d === "modal" ? r.prepend(E) : !document.querySelector(`#${r.id} #side-right`) && !document.querySelector(`#${r.id} #side-left`) && d !== "modal" && (r.prepend(a), st())) : (u && !document.querySelector(`#${r == null ? void 0 : r.id} #${u}`) && r.prepend(n), document.querySelector(`#${r.id} #modal-close`) && r.removeChild(E), document.querySelector(`#${r.id} #side-left`) && r.removeChild(a), document.querySelector(`#${r.id} #side-right`) && r.removeChild(a), r.classList.add("bottomsheet"), r.classList.remove("modal"), r.classList.remove("side-sheet"));
  }
  function pt(r = !1, a = !1, f = !1) {
    e && St(D), r ? (document.body.style.overflow = "hidden", d === "sideSheetLeft" ? (c.style.top = 0, c.style.left = "-100%", setTimeout(() => {
      L({
        targets: c,
        left: "0",
        width: ht,
        opacity: 1,
        easing: j,
        duration: 1
      });
    }, 100)) : d === "sideSheetRight" ? (c.style.top = 0, c.style.right = "-100%", c.style.left = "unset", setTimeout(() => {
      L({
        targets: c,
        right: "0",
        opacity: 1,
        width: ht,
        easing: j,
        duration: 1
      });
    }, 100)) : (c.style.top = "50%", c.style.opacity = 0, c.style.transform = "translateX(-50%) translateY(-40%) rotateX(-20deg)", L({
      translateY: "-50%",
      targets: c,
      opacity: 1,
      rotateX: "1deg",
      easing: j,
      duration: 0.1
    }))) : a ? (c.style.opacity = 1, c.style.transform = `translateY(${x(
      H(t[0])
    )}px)`) : f ? c.style.transform = `translateY(${x(
      H(t[0])
    )}px)` : (document.body.style.overflow = "hidden", L({
      targets: c,
      translateY: `${v(100)}px`,
      easing: "linear",
      duration: 1
    }), setTimeout(() => {
      L({
        targets: c,
        translateY: `${x(H(t[0]))}px`,
        easing: "spring(1, 85, 15, 3)",
        opacity: 1,
        duration: 1
      });
    }, 60)), I = x(H(t[0]));
  }
  function ce(r, a, f, u, g, E, $, C) {
    new Oi(
      r,
      {
        onDrag: ({
          active: m,
          velocity: [T, b],
          offset: M,
          distance: [ki, _t],
          target: Mt,
          direction: fe,
          ...Di
        }) => {
          let Pt = 0, de = 1 / 0;
          a = Y(u), window.innerWidth < s && (fe[1] > 0 ? g && Mt === document.querySelector(`#${g}`) ? (u.style.overflow = "hidden", u.style.touchAction = "none", gt(
            u,
            Pt,
            null,
            m,
            f,
            b,
            M,
            _t,
            E
          ), I >= window.innerHeight && G(P, C), I >= window.innerHeight && J(E)) : u.scrollTop >= 1 && a <= v(100 - f) && (!g || Mt !== document.querySelector(`#${g}`)) ? tt && (u.style.overflow = "scroll", u.style.touchAction = "auto", u.click()) : (u.style.overflow = "hidden", u.style.touchAction = "none", gt(
            u,
            Pt,
            null,
            m,
            f,
            b,
            M,
            _t,
            E
          ), I >= window.innerHeight && G(P, C)) : Y(c) <= v(100 - f) ? tt && (u.click(), u.style.overflow = "scroll", v(100 - f) > 0 && (u.style.minHeight = "unset"), u.style.height = `${v(
            f
          )}px`, u.style.touchAction = "auto") : (u.style.overflow = "hidden", u.style.touchAction = "none", gt(
            u,
            null,
            de,
            m,
            f,
            b,
            M,
            _t,
            E
          ), I >= window.innerHeight && G(P, C)));
        },
        onDragStart: ({ direction: m }) => {
          document.body.style.overflow = "hidden", ut(m);
        },
        onDragEnd: ({ direction: m }) => {
          a = Y(u), (a <= v(100 - f) || I === 0) && m[1] < 0 && c.scrollTop >= 0 && tt && (u.style.overflow = "scroll", u.click(), u.style.touchAction = "auto"), (a <= v(100 - f) || I === 0) && m[1] > 0 && c.scrollTop === 0 && (u.style.overflow = "hidden"), ft(m);
        }
      },
      {
        drag: {
          filterTaps: !1,
          rubberband: !0,
          axis: "y",
          preventDefault: !1,
          from: () => [0, Y(u)]
        }
      }
    );
  }
  function gt(r, a, f, u, g, E, $, C, m, T) {
    let b = $[1];
    if (f === null) {
      let M = function() {
        return Dt(
          b > window.innerHeight ? window.innerHeight : b < v(100 - g) ? v(100 - g) : b,
          r,
          E,
          g,
          C,
          !1,
          m,
          P
        );
      };
      console.log("if"), u && q(
        r,
        `${b > window.innerHeight ? window.innerHeight : b < v(100 - g) ? v(100 - g) : b}px`,
        "spring(1, 250, 25, 25)"
      ), u || M() !== void 0 && ($[1] = M());
    } else {
      let M = function() {
        return kt(
          b > window.innerHeight ? window.innerHeight : b < v(100 - g) ? v(100 - g) : b,
          r,
          E,
          g,
          C,
          !1,
          m
        );
      };
      u && q(
        r,
        `${b > window.innerHeight ? window.innerHeight : b < v(100 - g) ? v(100 - g) : b}px`,
        "spring(1, 250, 25, 25)"
      ), u || M() !== void 0 && ($[1] = M());
    }
  }
  function Y(r) {
    var a, f;
    return +((f = r == null ? void 0 : r.style) == null ? void 0 : f.transform.slice(
      11,
      (a = r == null ? void 0 : r.style) == null ? void 0 : a.transform.indexOf("px")
    ));
  }
  function kt(r, a, f, u, g, E, $, C) {
    let m = 1 / 0;
    if (t.forEach((T) => {
      let b = yt(T);
      v(b) > x(r) && v(b) < m && (m = v(b));
    }), m !== 1 / 0)
      return E ? (q(
        a,
        `${x(m)}px`,
        X()
      ), I = x(m), I) : f > K || g < W ? (q(
        a,
        `${x(m)}px`,
        X()
      ), I = x(m), I) : Dt(
        r,
        a,
        f,
        u,
        g,
        !0,
        $,
        P
      );
  }
  function Dt(r, a, f, u, g, E, $, C, m) {
    let T = 0;
    return t.forEach((b) => {
      let M = yt(b);
      v(M) < x(r) && v(M) > T && (T = v(M));
    }), E ? (q(
      a,
      `${C ? x(T) : T <= H(t[0]) ? x(H(t[0])) : x(T)}px`,
      X()
    ), I = x(T), I) : f > K || g > W ? (q(
      a,
      `${C ? x(T) : T <= H(t[0]) ? x(H(t[0])) : x(T)}px`,
      X()
    ), I = x(T), I) : kt(
      r,
      a,
      f,
      u,
      g,
      !0,
      $
    );
  }
  function st(r) {
    c.style.width === Ot ? L({
      targets: c,
      width: ht,
      easing: j,
      duration: 0.1
    }) : L({
      targets: c,
      width: Ot,
      easing: j,
      duration: 0.1
    }), setTimeout(() => {
      V && mt(c);
    }, 400), J(r);
  }
  document.querySelectorAll("[data-bottomsheet]");
  function ae(r) {
    r.forEach((a, f) => {
      a === c.id && r[f - 1] && document.getElementById(r[f - 1]) && (L({
        targets: `#${r[f - 1]}`,
        scale: xt + (1 - xt) / window.innerHeight * Y(c),
        easing: "linear",
        duration: 0.1
      }), r.forEach((u, g) => {
      }), f - 1 > 0 && Y(document.getElementById(r[f])) ? r.slice(0, f - 1).forEach((u) => {
        L({
          targets: `#${u}`,
          top: "50px",
          easing: "linear",
          duration: 1
        });
      }) : r.slice(0, f - 1).forEach((u) => {
        L({
          targets: `#${u}`,
          easing: "linear",
          duration: 1
        });
      }));
    });
  }
  function mt(r) {
    r.remove();
  }
  function X() {
    return "spring(1, 95, 25, 13)";
  }
  function le() {
    document.getElementById(h).removeEventListener("click", () => {
      it(!1);
    });
  }
  function ue(r) {
    window.innerWidth > s && L({
      targets: c,
      width: r,
      easing: j,
      duration: 0.1
    });
  }
  return {
    close: G,
    init: it,
    open: pt,
    destroy: le,
    moveSideSheetTo: ue
  };
}
export {
  Mi as default
};
