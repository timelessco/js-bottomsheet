import $ from "animejs/lib/anime.es";
function ee(i, t, e) {
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
function Ot(i, t, e) {
  return t === 0 || Math.abs(t) === 1 / 0 ? Math.pow(i, e * 5) : i * t * e / (t + e * i);
}
function At(i, t, e, s = 0.15) {
  return s === 0 ? ee(i, t, e) : i < t ? -Ot(t - i, e - t, s) + t : i > e ? +Ot(i - e, e - t, s) + e : i;
}
function ie(i, [t, e], [s, n]) {
  const [[o, c], [f, d]] = i;
  return [At(t, o, c, s), At(e, f, d, n)];
}
function w(i, t, e) {
  return t in i ? Object.defineProperty(i, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : i[t] = e, i;
}
function Ct(i, t) {
  var e = Object.keys(i);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(i);
    t && (s = s.filter(function(n) {
      return Object.getOwnPropertyDescriptor(i, n).enumerable;
    })), e.push.apply(e, s);
  }
  return e;
}
function b(i) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ct(Object(e), !0).forEach(function(s) {
      w(i, s, e[s]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(e)) : Ct(Object(e)).forEach(function(s) {
      Object.defineProperty(i, s, Object.getOwnPropertyDescriptor(e, s));
    });
  }
  return i;
}
const qt = {
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
function Lt(i) {
  return i ? i[0].toUpperCase() + i.slice(1) : "";
}
const se = ["enter", "leave"];
function ne(i = !1, t) {
  return i && !se.includes(t);
}
function re(i, t = "", e = !1) {
  const s = qt[i], n = s && s[t] || t;
  return "on" + Lt(i) + Lt(n) + (ne(e, n) ? "Capture" : "");
}
const oe = ["gotpointercapture", "lostpointercapture"];
function ce(i) {
  let t = i.substring(2).toLowerCase();
  const e = !!~t.indexOf("passive");
  e && (t = t.replace("passive", ""));
  const s = oe.includes(t) ? "capturecapture" : "capture", n = !!~t.indexOf(s);
  return n && (t = t.replace("capture", "")), {
    device: t,
    capture: n,
    passive: e
  };
}
function ae(i, t = "") {
  const e = qt[i], s = e && e[t] || t;
  return i + s;
}
function ut(i) {
  return "touches" in i;
}
function Ut(i) {
  return ut(i) ? "touch" : "pointerType" in i ? i.pointerType : "mouse";
}
function le(i) {
  return Array.from(i.touches).filter((t) => {
    var e, s;
    return t.target === i.currentTarget || ((e = i.currentTarget) === null || e === void 0 || (s = e.contains) === null || s === void 0 ? void 0 : s.call(e, t.target));
  });
}
function ue(i) {
  return i.type === "touchend" || i.type === "touchcancel" ? i.changedTouches : i.targetTouches;
}
function Wt(i) {
  return ut(i) ? ue(i)[0] : i;
}
function vt(i, t) {
  const e = t.clientX - i.clientX, s = t.clientY - i.clientY, n = (t.clientX + i.clientX) / 2, o = (t.clientY + i.clientY) / 2, c = Math.hypot(e, s);
  return {
    angle: -(Math.atan2(e, s) * 180) / Math.PI,
    distance: c,
    origin: [n, o]
  };
}
function fe(i) {
  return le(i).map((t) => t.identifier);
}
function kt(i, t) {
  const [e, s] = Array.from(i.touches).filter((n) => t.includes(n.identifier));
  return vt(e, s);
}
function _t(i) {
  const t = Wt(i);
  return ut(i) ? t.identifier : t.pointerId;
}
function B(i) {
  const t = Wt(i);
  return [t.clientX, t.clientY];
}
const Dt = 40, Pt = 800;
function Nt(i) {
  let {
    deltaX: t,
    deltaY: e,
    deltaMode: s
  } = i;
  return s === 1 ? (t *= Dt, e *= Dt) : s === 2 && (t *= Pt, e *= Pt), [t, e];
}
function he(i) {
  var t, e;
  const {
    scrollX: s,
    scrollY: n,
    scrollLeft: o,
    scrollTop: c
  } = i.currentTarget;
  return [(t = s ?? o) !== null && t !== void 0 ? t : 0, (e = n ?? c) !== null && e !== void 0 ? e : 0];
}
function de(i) {
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
function lt(i, ...t) {
  return typeof i == "function" ? i(...t) : i;
}
function pe() {
}
function me(...i) {
  return i.length === 0 ? pe : i.length === 1 ? i[0] : function() {
    let t;
    for (const e of i)
      t = e.apply(this, arguments) || t;
    return t;
  };
}
function Mt(i, t) {
  return Object.assign({}, t, i || {});
}
const ge = 32;
class Gt {
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
    e._active || (this.reset(), this.computeInitial(), e._active = !0, e.target = t.target, e.currentTarget = t.currentTarget, e.lastOffset = s.from ? lt(s.from, e) : e.offset, e.offset = e.lastOffset), e.startTime = e.timeStamp = t.timeStamp;
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
    if (t && (e.event = t, s.preventDefault && t.cancelable && e.event.preventDefault(), e.type = t.type, n.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size, n.locked = !!document.pointerLockElement, Object.assign(n, de(t)), n.down = n.pressed = n.buttons % 2 === 1 || n.touches > 0, o = t.timeStamp - e.timeStamp, e.timeStamp = t.timeStamp, e.elapsedTime = e.timeStamp - e.startTime), e._active) {
      const M = e._delta.map(Math.abs);
      _.addTo(e._distance, M);
    }
    this.axisIntent && this.axisIntent(t);
    const [c, f] = e._movement, [d, m] = s.threshold, {
      _step: l,
      values: D
    } = e;
    if (s.hasCustomTransform ? (l[0] === !1 && (l[0] = Math.abs(c) >= d && D[0]), l[1] === !1 && (l[1] = Math.abs(f) >= m && D[1])) : (l[0] === !1 && (l[0] = Math.abs(c) >= d && Math.sign(c) * d), l[1] === !1 && (l[1] = Math.abs(f) >= m && Math.sign(f) * m)), e.intentional = l[0] !== !1 || l[1] !== !1, !e.intentional)
      return;
    const I = [0, 0];
    if (s.hasCustomTransform) {
      const [M, R] = D;
      I[0] = l[0] !== !1 ? M - l[0] : 0, I[1] = l[1] !== !1 ? R - l[1] : 0;
    } else
      I[0] = l[0] !== !1 ? c - l[0] : 0, I[1] = l[1] !== !1 ? f - l[1] : 0;
    this.restrictToAxis && !e._blocked && this.restrictToAxis(I);
    const Y = e.offset, V = e._active && !e._blocked || e.active;
    V && (e.first = e._active && !e.active, e.last = !e._active && e.active, e.active = n[this.ingKey] = e._active, t && (e.first && ("bounds" in s && (e._bounds = lt(s.bounds, e)), this.setup && this.setup()), e.movement = I, this.computeOffset()));
    const [P, q] = e.offset, [[W, et], [ft, ht]] = e._bounds;
    e.overflow = [P < W ? -1 : P > et ? 1 : 0, q < ft ? -1 : q > ht ? 1 : 0], e._movementBound[0] = e.overflow[0] ? e._movementBound[0] === !1 ? e._movement[0] : e._movementBound[0] : !1, e._movementBound[1] = e.overflow[1] ? e._movementBound[1] === !1 ? e._movement[1] : e._movementBound[1] : !1;
    const dt = e._active ? s.rubberband || [0, 0] : [0, 0];
    if (e.offset = ie(e._bounds, e.offset, dt), e.delta = _.sub(e.offset, Y), this.computeMovement(), V && (!e.last || o > ge)) {
      e.delta = _.sub(e.offset, Y);
      const M = e.delta.map(Math.abs);
      _.addTo(e.distance, M), e.direction = e.delta.map(Math.sign), e._direction = e._delta.map(Math.sign), !e.first && o > 0 && (e.velocity = [M[0] / o, M[1] / o]);
    }
  }
  emit() {
    const t = this.state, e = this.shared, s = this.config;
    if (t._active || this.clean(), (t._blocked || !t.intentional) && !t._force && !s.triggerAllEvents)
      return;
    const n = this.handler(b(b(b({}, e), t), {}, {
      [this.aliasKey]: t.values
    }));
    n !== void 0 && (t.memo = n);
  }
  clean() {
    this.eventStore.clean(), this.timeoutStore.clean();
  }
}
function ye([i, t], e) {
  const s = Math.abs(i), n = Math.abs(t);
  if (s > n && s > e)
    return "x";
  if (n > s && n > e)
    return "y";
}
class Q extends Gt {
  constructor(...t) {
    super(...t), w(this, "aliasKey", "xy");
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
      const n = typeof s.axisThreshold == "object" ? s.axisThreshold[Ut(t)] : s.axisThreshold;
      e.axis = ye(e._movement, n);
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
const _e = (i) => i, $t = 0.15, Xt = {
  enabled(i = !0) {
    return i;
  },
  eventOptions(i, t, e) {
    return b(b({}, e.shared.eventOptions), i);
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
        return [$t, $t];
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
    return this.hasCustomTransform = !!s, s || _e;
  },
  threshold(i) {
    return _.toVector(i, 0);
  }
}, ve = 0, U = b(b({}, Xt), {}, {
  axis(i, t, {
    axis: e
  }) {
    if (this.lockDirection = e === "lock", !this.lockDirection)
      return e;
  },
  axisThreshold(i = ve) {
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
}), rt = 10, Ht = {
  ArrowRight: (i = 1) => [rt * i, 0],
  ArrowLeft: (i = 1) => [-rt * i, 0],
  ArrowUp: (i = 1) => [0, -rt * i],
  ArrowDown: (i = 1) => [0, rt * i]
};
class be extends Q {
  constructor(...t) {
    super(...t), w(this, "ingKey", "dragging");
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
    e.pointerCapture && t.target.setPointerCapture(t.pointerId), !(n && n.size > 1 && s._pointerActive) && (this.start(t), this.setupPointer(t), s._pointerId = _t(t), s._pointerActive = !0, this.computeValues(B(t)), this.computeInitial(), e.preventScrollAxis && Ut(t) !== "mouse" ? (s._active = !1, this.setupScrollPrevention(t)) : e.delay > 0 ? (this.setupDelayTrigger(t), e.triggerAllEvents && (this.compute(t), this.emit())) : this.startPointerDrag(t));
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
    const o = B(t);
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
    const [o, c] = e._distance;
    if (e.tap = o <= s.tapsThreshold && c <= s.tapsThreshold, e.tap && s.filterTaps)
      e._force = !0;
    else {
      const [f, d] = e.direction, [m, l] = e.velocity, [D, I] = e.movement, [Y, V] = s.swipe.velocity, [P, q] = s.swipe.distance, W = s.swipe.duration;
      e.elapsedTime < W && (Math.abs(m) > Y && Math.abs(D) > P && (e.swipe[0] = f), Math.abs(l) > V && Math.abs(I) > q && (e.swipe[1] = d));
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
    this.state._preventScroll = !1, we(t);
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
    const e = Ht[t.key];
    if (e) {
      const s = this.state, n = t.shiftKey ? 10 : t.altKey ? 0.1 : 1;
      this.start(t), s._delta = e(n), s._keyboardActive = !0, _.addTo(s._movement, s._delta), this.compute(t), this.emit();
    }
  }
  keyUp(t) {
    t.key in Ht && (this.state._keyboardActive = !1, this.setActive(), this.compute(t), this.emit());
  }
  bind(t) {
    const e = this.config.device;
    t(e, "start", this.pointerDown.bind(this)), this.config.pointerCapture && (t(e, "change", this.pointerMove.bind(this)), t(e, "end", this.pointerUp.bind(this)), t(e, "cancel", this.pointerUp.bind(this)), t("lostPointerCapture", "", this.pointerUp.bind(this))), this.config.keys && (t("key", "down", this.keyDown.bind(this)), t("key", "up", this.keyUp.bind(this))), this.config.filterTaps && t("click", "", this.pointerClick.bind(this), {
      capture: !0,
      passive: !1
    });
  }
}
function we(i) {
  "persist" in i && typeof i.persist == "function" && i.persist();
}
const tt = typeof window < "u" && window.document && window.document.createElement;
function Ee() {
  return tt && "ontouchstart" in window;
}
function Rt() {
  return Ee() || tt && window.navigator.maxTouchPoints > 1;
}
function Te() {
  return tt && "onpointerdown" in window;
}
function Se() {
  return tt && "exitPointerLock" in window.document;
}
function Ie() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const H = {
  isBrowser: tt,
  gesture: Ie(),
  touch: Rt(),
  touchscreen: Rt(),
  pointer: Te(),
  pointerLock: Se()
}, xe = 250, Oe = 180, Ae = 0.5, Ce = 50, Le = 250, Kt = {
  mouse: 0,
  touch: 0,
  pen: 8
}, ke = b(b({}, U), {}, {
  device(i, t, {
    pointer: {
      touch: e = !1,
      lock: s = !1,
      mouse: n = !1
    } = {}
  }) {
    return this.pointerLock = s && H.pointerLock, H.touch && e ? "touch" : this.pointerLock ? "mouse" : H.pointer && !n ? "pointer" : H.touch ? "touch" : "mouse";
  },
  preventScrollAxis(i, t, {
    preventScroll: e
  }) {
    if (this.preventScrollDelay = typeof e == "number" ? e : e || e === void 0 && i ? xe : void 0, !(!H.touchscreen || e === !1))
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
    velocity: i = Ae,
    distance: t = Ce,
    duration: e = Le
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
        return Oe;
      case !1:
        return 0;
      default:
        return i;
    }
  },
  axisThreshold(i) {
    return i ? b(b({}, Kt), i) : Kt;
  }
});
function zt(i) {
  const [t, e] = i.overflow, [s, n] = i._delta, [o, c] = i._direction;
  (t < 0 && s > 0 && o < 0 || t > 0 && s < 0 && o > 0) && (i._movement[0] = i._movementBound[0]), (e < 0 && n > 0 && c < 0 || e > 0 && n < 0 && c > 0) && (i._movement[1] = i._movementBound[1]);
}
const De = 30, Pe = 100;
class Me extends Gt {
  constructor(...t) {
    super(...t), w(this, "ingKey", "pinching"), w(this, "aliasKey", "da");
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
      const n = Math.abs(e) * De - Math.abs(s);
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
    const n = kt(t, e._touchIds);
    this.pinchStart(t, n);
  }
  pointerStart(t) {
    if (t.buttons != null && t.buttons % 2 !== 1)
      return;
    this.ctrl.setEventIds(t), t.target.setPointerCapture(t.pointerId);
    const e = this.state, s = e._pointerEvents, n = this.ctrl.pointerIds;
    if (e._active && Array.from(s.keys()).every((c) => n.has(c)) || (s.size < 2 && s.set(t.pointerId, t), e._pointerEvents.size < 2))
      return;
    this.start(t);
    const o = vt(...Array.from(s.values()));
    this.pinchStart(t, o);
  }
  pinchStart(t, e) {
    const s = this.state;
    s.origin = e.origin, this.computeValues([e.distance, e.angle]), this.computeInitial(), this.compute(t), this.emit();
  }
  touchMove(t) {
    if (!this.state._active)
      return;
    const e = kt(t, this.state._touchIds);
    this.pinchMove(t, e);
  }
  pointerMove(t) {
    const e = this.state._pointerEvents;
    if (e.has(t.pointerId) && e.set(t.pointerId, t), !this.state._active)
      return;
    const s = vt(...Array.from(e.values()));
    this.pinchMove(t, s);
  }
  pinchMove(t, e) {
    const s = this.state, n = s._values[1], o = e.angle - n;
    let c = 0;
    Math.abs(o) > 270 && (c += Math.sign(o)), this.computeValues([e.distance, e.angle - 360 * c]), s.origin = e.origin, s.turns = c, s._movement = [s._values[0] / s._initial[0] - 1, s._values[1] - s._initial[1]], this.compute(t), this.emit();
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
    e._movement = [t.scale - 1, t.rotation], e._delta = _.sub(e._movement, s), this.compute(t), this.emit();
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
    s._delta = [-Nt(t)[1] / Pe * s.offset[0], 0], _.addTo(s._movement, s._delta), zt(s), this.state.origin = [t.clientX, t.clientY], this.compute(t), this.emit();
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
const $e = b(b({}, Xt), {}, {
  device(i, t, {
    shared: e,
    pointer: {
      touch: s = !1
    } = {}
  }) {
    if (e.target && !H.touch && H.gesture)
      return "gesture";
    if (H.touch && s)
      return "touch";
    if (H.touchscreen) {
      if (H.pointer)
        return "pointer";
      if (H.touch)
        return "touch";
    }
  },
  bounds(i, t, {
    scaleBounds: e = {},
    angleBounds: s = {}
  }) {
    const n = (c) => {
      const f = Mt(lt(e, c), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [f.min, f.max];
    }, o = (c) => {
      const f = Mt(lt(s, c), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [f.min, f.max];
    };
    return typeof e != "function" && typeof s != "function" ? [n(), o()] : (c) => [n(c), o(c)];
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
class He extends Q {
  constructor(...t) {
    super(...t), w(this, "ingKey", "moving");
  }
  move(t) {
    this.config.mouseOnly && t.pointerType !== "mouse" || (this.state._active ? this.moveChange(t) : this.moveStart(t), this.timeoutStore.add("moveEnd", this.moveEnd.bind(this)));
  }
  moveStart(t) {
    this.start(t), this.computeValues(B(t)), this.compute(t), this.computeInitial(), this.emit();
  }
  moveChange(t) {
    if (!this.state._active)
      return;
    const e = B(t), s = this.state;
    s._delta = _.sub(e, s._values), _.addTo(s._movement, s._delta), this.computeValues(e), this.compute(t), this.emit();
  }
  moveEnd(t) {
    this.state._active && (this.state._active = !1, this.compute(t), this.emit());
  }
  bind(t) {
    t("pointer", "change", this.move.bind(this)), t("pointer", "leave", this.moveEnd.bind(this));
  }
}
const Re = b(b({}, U), {}, {
  mouseOnly: (i = !0) => i
});
class Ke extends Q {
  constructor(...t) {
    super(...t), w(this, "ingKey", "scrolling");
  }
  scroll(t) {
    this.state._active || this.start(t), this.scrollChange(t), this.timeoutStore.add("scrollEnd", this.scrollEnd.bind(this));
  }
  scrollChange(t) {
    t.cancelable && t.preventDefault();
    const e = this.state, s = he(t);
    e._delta = _.sub(s, e._values), _.addTo(e._movement, e._delta), this.computeValues(s), this.compute(t), this.emit();
  }
  scrollEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(t) {
    t("scroll", "", this.scroll.bind(this));
  }
}
const je = U;
class Ve extends Q {
  constructor(...t) {
    super(...t), w(this, "ingKey", "wheeling");
  }
  wheel(t) {
    this.state._active || this.start(t), this.wheelChange(t), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(t) {
    const e = this.state;
    e._delta = Nt(t), _.addTo(e._movement, e._delta), zt(e), this.compute(t), this.emit();
  }
  wheelEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(t) {
    t("wheel", "", this.wheel.bind(this));
  }
}
const Ye = U;
class qe extends Q {
  constructor(...t) {
    super(...t), w(this, "ingKey", "hovering");
  }
  enter(t) {
    this.config.mouseOnly && t.pointerType !== "mouse" || (this.start(t), this.computeValues(B(t)), this.compute(t), this.emit());
  }
  leave(t) {
    if (this.config.mouseOnly && t.pointerType !== "mouse")
      return;
    const e = this.state;
    if (!e._active)
      return;
    e._active = !1;
    const s = B(t);
    e._movement = e._delta = _.sub(s, e._values), this.computeValues(s), this.compute(t), e.delta = e.movement, this.emit();
  }
  bind(t) {
    t("pointer", "enter", this.enter.bind(this)), t("pointer", "leave", this.leave.bind(this));
  }
}
const Ue = b(b({}, U), {}, {
  mouseOnly: (i = !0) => i
}), wt = /* @__PURE__ */ new Map(), bt = /* @__PURE__ */ new Map();
function We(i) {
  wt.set(i.key, i.engine), bt.set(i.key, i.resolver);
}
const Ne = {
  key: "drag",
  engine: be,
  resolver: ke
}, Ge = {
  key: "hover",
  engine: qe,
  resolver: Ue
}, Xe = {
  key: "move",
  engine: He,
  resolver: Re
}, ze = {
  key: "pinch",
  engine: Me,
  resolver: $e
}, Be = {
  key: "scroll",
  engine: Ke,
  resolver: je
}, Fe = {
  key: "wheel",
  engine: Ve,
  resolver: Ye
};
function Ze(i, t) {
  if (i == null)
    return {};
  var e = {}, s = Object.keys(i), n, o;
  for (o = 0; o < s.length; o++)
    n = s[o], !(t.indexOf(n) >= 0) && (e[n] = i[n]);
  return e;
}
function Je(i, t) {
  if (i == null)
    return {};
  var e = Ze(i, t), s, n;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(i);
    for (n = 0; n < o.length; n++)
      s = o[n], !(t.indexOf(s) >= 0) && Object.prototype.propertyIsEnumerable.call(i, s) && (e[s] = i[s]);
  }
  return e;
}
const Qe = {
  target(i) {
    if (i)
      return () => "current" in i ? i.current : i;
  },
  enabled(i = !0) {
    return i;
  },
  window(i = H.isBrowser ? window : void 0) {
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
}, ti = ["target", "eventOptions", "window", "enabled", "transform"];
function at(i = {}, t) {
  const e = {};
  for (const [s, n] of Object.entries(t))
    switch (typeof n) {
      case "function":
        e[s] = n.call(e, i[s], s, i);
        break;
      case "object":
        e[s] = at(i[s], n);
        break;
      case "boolean":
        n && (e[s] = i[s]);
        break;
    }
  return e;
}
function ei(i, t, e = {}) {
  const s = i, {
    target: n,
    eventOptions: o,
    window: c,
    enabled: f,
    transform: d
  } = s, m = Je(s, ti);
  if (e.shared = at({
    target: n,
    eventOptions: o,
    window: c,
    enabled: f,
    transform: d
  }, Qe), t) {
    const l = bt.get(t);
    e[t] = at(b({
      shared: e.shared
    }, m), l);
  } else
    for (const l in m) {
      const D = bt.get(l);
      D && (e[l] = at(b({
        shared: e.shared
      }, m[l]), D));
    }
  return e;
}
class Bt {
  constructor(t, e) {
    w(this, "_listeners", /* @__PURE__ */ new Set()), this._ctrl = t, this._gestureKey = e;
  }
  add(t, e, s, n, o) {
    const c = this._listeners, f = ae(e, s), d = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}, m = b(b({}, d), o);
    t.addEventListener(f, n, m);
    const l = () => {
      t.removeEventListener(f, n, m), c.delete(l);
    };
    return c.add(l), l;
  }
  clean() {
    this._listeners.forEach((t) => t()), this._listeners.clear();
  }
}
class ii {
  constructor() {
    w(this, "_timeouts", /* @__PURE__ */ new Map());
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
class si {
  constructor(t) {
    w(this, "gestures", /* @__PURE__ */ new Set()), w(this, "_targetEventStore", new Bt(this)), w(this, "gestureEventStores", {}), w(this, "gestureTimeoutStores", {}), w(this, "handlers", {}), w(this, "config", {}), w(this, "pointerIds", /* @__PURE__ */ new Set()), w(this, "touchIds", /* @__PURE__ */ new Set()), w(this, "state", {
      shared: {
        shiftKey: !1,
        metaKey: !1,
        ctrlKey: !1,
        altKey: !1
      }
    }), ni(this, t);
  }
  setEventIds(t) {
    if (ut(t))
      return this.touchIds = new Set(fe(t)), this.touchIds;
    if ("pointerId" in t)
      return t.type === "pointerup" || t.type === "pointercancel" ? this.pointerIds.delete(t.pointerId) : t.type === "pointerdown" && this.pointerIds.add(t.pointerId), this.pointerIds;
  }
  applyHandlers(t, e) {
    this.handlers = t, this.nativeHandlers = e;
  }
  applyConfig(t, e) {
    this.config = ei(t, e, this.config);
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
        for (const c of this.gestures) {
          const f = this.config[c], d = jt(s, f.eventOptions, !!n);
          if (f.enabled) {
            const m = wt.get(c);
            new m(this, t, c).bind(d);
          }
        }
        const o = jt(s, e.eventOptions, !!n);
        for (const c in this.nativeHandlers)
          o(
            c,
            "",
            (f) => this.nativeHandlers[c](b(b({}, this.state.shared), {}, {
              event: f,
              args: t
            })),
            void 0,
            !0
          );
      }
      for (const o in s)
        s[o] = me(...s[o]);
      if (!n)
        return s;
      for (const o in s) {
        const {
          device: c,
          capture: f,
          passive: d
        } = ce(o);
        this._targetEventStore.add(n, c, "", s[o], {
          capture: f,
          passive: d
        });
      }
    }
  }
}
function G(i, t) {
  i.gestures.add(t), i.gestureEventStores[t] = new Bt(i, t), i.gestureTimeoutStores[t] = new ii();
}
function ni(i, t) {
  t.drag && G(i, "drag"), t.wheel && G(i, "wheel"), t.scroll && G(i, "scroll"), t.move && G(i, "move"), t.pinch && G(i, "pinch"), t.hover && G(i, "hover");
}
const jt = (i, t, e) => (s, n, o, c = {}, f = !1) => {
  var d, m;
  const l = (d = c.capture) !== null && d !== void 0 ? d : t.capture, D = (m = c.passive) !== null && m !== void 0 ? m : t.passive;
  let I = f ? s : re(s, n, l);
  e && D && (I += "Passive"), i[I] = i[I] || [], i[I].push(o);
}, ri = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function oi(i) {
  const t = {}, e = {}, s = /* @__PURE__ */ new Set();
  for (let n in i)
    ri.test(n) ? (s.add(RegExp.lastMatch), e[n] = i[n]) : t[n] = i[n];
  return [e, t, s];
}
function X(i, t, e, s, n, o) {
  if (!i.has(e) || !wt.has(s))
    return;
  const c = e + "Start", f = e + "End", d = (m) => {
    let l;
    return m.first && c in t && t[c](m), e in t && (l = t[e](m)), m.last && f in t && t[f](m), l;
  };
  n[s] = d, o[s] = o[s] || {};
}
function ci(i, t) {
  const [e, s, n] = oi(i), o = {};
  return X(n, e, "onDrag", "drag", o, t), X(n, e, "onWheel", "wheel", o, t), X(n, e, "onScroll", "scroll", o, t), X(n, e, "onPinch", "pinch", o, t), X(n, e, "onMove", "move", o, t), X(n, e, "onHover", "hover", o, t), {
    handlers: o,
    config: t,
    nativeHandlers: s
  };
}
function ai(i, t, e) {
  return t in i ? Object.defineProperty(i, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : i[t] = e, i;
}
function Vt(i, t) {
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
    t % 2 ? Vt(Object(e), !0).forEach(function(s) {
      ai(i, s, e[s]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(e)) : Vt(Object(e)).forEach(function(s) {
      Object.defineProperty(i, s, Object.getOwnPropertyDescriptor(e, s));
    });
  }
  return i;
}
class li {
  constructor(t, e, s, n, o) {
    this._target = t, this._gestureKey = n, this._ctrl = new si(e), this._ctrl.applyHandlers(e, o), this._ctrl.applyConfig(ot(ot({}, s), {}, {
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
function ui(i) {
  return i.forEach(We), function(t, e, s) {
    const {
      handlers: n,
      nativeHandlers: o,
      config: c
    } = ci(e, s || {});
    return new li(t, n, c, void 0, o);
  };
}
const fi = function(t, e, s) {
  return ui([Ne, ze, Be, Fe, Xe, Ge])(t, e, s || {});
};
function ct(i) {
  return typeof i == "string" ? +i.replace("%", "") : +i;
}
function v(i) {
  return Math.round(window.innerHeight * i / 100);
}
function j(i) {
  return typeof i == "string" ? v(+i.replace("%", "")) : +i;
}
function E(i) {
  return window.innerHeight - i;
}
function z(i) {
  $({
    targets: i,
    opacity: 0,
    easing: "spring(1, 85, 35, 3)",
    duration: 0
  }), setTimeout(() => {
    var t;
    (t = i == null ? void 0 : i.classList) != null && t.contains("display") && i.classList.remove("display"), i && i.remove();
  }, 300), document.body.style.overflow = "scroll";
}
function Yt(i) {
  i.classList.add("display"), $({
    targets: i,
    opacity: 1,
    easing: "spring(1, 85, 35, 3)",
    duration: 0
  });
}
function J(i, t, e, s) {
  $({
    targets: i,
    translateY: t,
    easing: e,
    duration: s
  });
}
function gi(i) {
  var xt;
  const {
    snapPoints: t = ["100%"],
    displayOverlay: e = !1,
    minWidthForModal: s = 700,
    onOpen: n = () => {
    },
    onClose: o = () => {
    },
    trigger: c = "",
    onInit: f = () => {
    },
    webLayout: d = "modal",
    openOnLoad: m = !1,
    modalCloseIcon: l = `<svg width="16" height="12" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33.112 36.9133C34.3649 38.15 36.3963 38.15 37.6492 36.9133C38.9022 35.6766 38.9022 33.6716 37.6492 32.435L24.0375 19L37.6492 5.56496C38.9022 4.3283 38.9022 2.32328 37.6492 1.08662C36.3963 -0.150042 34.3649 -0.150042 33.112 1.08662L19.5002 14.5216L5.88835 1.08655C4.63541 -0.150108 2.60401 -0.150107 1.35108 1.08655C0.0981471 2.32321 0.0981459 4.32824 1.35108 5.5649L14.9629 19L1.35108 32.435C0.0981434 33.6717 0.0981443 35.6767 1.35108 36.9134C2.60401 38.15 4.63541 38.15 5.88834 36.9134L19.5002 23.4783L33.112 36.9133Z" fill="white"/>
    </svg>
    `,
    sideSheetLeftIcon: D = `
    <svg width="16" height="14" viewBox="0 0 26 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.5046 40.8036C23.2926 42.0804 21.2623 42.1465 19.9698 40.9513L1.76653 24.118C0.474022 22.9228 0.408779 20.9188 1.62081 19.6421L18.6906 1.66043C19.9026 0.383653 21.9329 0.317552 23.2254 1.51279C24.5179 2.70802 24.5832 4.71199 23.3712 5.98876L8.49597 21.6586L24.3589 36.3277C25.6514 37.5229 25.7166 39.5269 24.5046 40.8036Z" fill="white"/>
    </svg>
    `,
    sideSheetRightIcon: I = `<svg width="16" height="14" viewBox="0 0 25 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.21057 1.34418C2.46351 0.107522 4.49491 0.107522 5.74784 1.34418L23.3937 18.7608C24.6466 19.9975 24.6466 22.0025 23.3937 23.2392L5.74784 40.6559C4.49491 41.8925 2.46351 41.8925 1.21057 40.6559C-0.0423591 39.4192 -0.0423591 37.4142 1.21057 36.1775L16.5878 21L1.21057 5.82253C-0.0423591 4.58586 -0.0423591 2.58084 1.21057 1.34418Z" fill="white"/>
    </svg>
    `,
    defaultSideSheetClose: Y = !0,
    cleanUpOnClose: V = !1,
    dismissible: P = !0,
    sideSheetSnapPoints: q = ["10%", "25%", "50%", "100%"],
    velocityThreshold: W = 0.9,
    distanceThreshold: et = 150,
    closeOnOverlayClick: ft = !0,
    onDragStart: ht = () => {
    },
    onDragEnd: dt = () => {
    },
    scrollableSheet: M = !0
  } = i;
  let { content: R = "", draggableArea: x = "" } = i, T;
  R = typeof R != "string" ? Promise.resolve(R).then((h) => h) : R;
  const it = c ? (xt = document == null ? void 0 : document.querySelector(`#${c}`)) == null ? void 0 : xt.getAttribute("data-bottomsheet-id") : "";
  let r = it ? document == null ? void 0 : document.querySelector(`#${it}`) : "";
  function F(h) {
    var a;
    const u = (a = h == null ? void 0 : h.style) == null ? void 0 : a.transform.slice(11).replace("px)", "");
    return u ? +u : null;
  }
  let Z = F(r), L = !(window.innerWidth < s);
  const A = document.querySelector(`#${r == null ? void 0 : r.id}-overlay`) ? document.querySelector(`#${r == null ? void 0 : r.id}-overlay`) : document.createElement("div");
  A.id = `${r == null ? void 0 : r.id}-overlay`;
  const k = "spring(1,250,20,13)";
  function pt(h = !1, u = !1, a = !1) {
    e && Yt(A), h ? (document.body.style.overflow = "hidden", d === "sideSheetLeft" ? (r.style.top = 0, r.style.left = "-100%", setTimeout(() => {
      $({
        targets: r,
        left: "0",
        width: q[0],
        easing: k,
        duration: 1
      });
    }, 100)) : d === "sideSheetRight" ? (r.style.top = 0, r.style.right = "-100%", setTimeout(() => {
      $({
        targets: r,
        right: "0",
        width: q[0],
        easing: k,
        duration: 1
      });
    }, 100)) : (r.style.top = "50%", r.style.opacity = 0, r.style.transform = "translateX(-50%) translateY(-40%) rotateX(-20deg)", $({
      translateY: "-50%",
      targets: r,
      opacity: 1,
      rotateX: "1deg",
      easing: k,
      duration: 0.1
    }))) : u ? (r.style.opacity = 1, r.style.transform = `translateY(${E(
      j(t[0])
    )}px)`) : a ? r.style.transform = `translateY(${E(
      j(t[0])
    )}px)` : (document.body.style.overflow = "hidden", $({
      targets: r,
      translateY: `${v(100)}px`,
      easing: "linear",
      duration: 1
    }), setTimeout(() => {
      $({
        targets: r,
        translateY: `${E(j(t[0]))}px`,
        easing: k,
        opacity: 1,
        duration: 1
      });
    }, 60)), T = E(j(t[0]));
  }
  function st() {
    r.remove();
  }
  function Et() {
    $({
      targets: r,
      opacity: 0,
      easing: k,
      duration: 0.1,
      translateY: "-40%"
    }), setTimeout(() => {
      st();
    }, 500), z(A);
  }
  function Tt() {
    $({
      targets: r,
      width: 0,
      easing: k,
      duration: 0
    }), setTimeout(() => {
      V && st();
    }, 400), z(A);
  }
  function mt() {
    $({
      targets: r,
      width: 0,
      easing: k,
      duration: 0
    }), setTimeout(() => {
      V && st();
    }, 400), z(A);
  }
  function N(h = !1, u = !0) {
    e && A && z(A), document.body.style.overflow = "scroll", h ? d === "modal" ? Et() : d === "sideSheetLeft" ? Tt() : mt() : $({
      targets: r,
      translateY: `${u ? v(120) : E(j(t[0]))}px`,
      easing: k,
      duration: 1
    }), T = v(120), setTimeout(() => {
      T >= window.innerHeight && V && st();
    }, 500), z(A), o();
  }
  function St(h, u, a, g) {
    L ? (x && document.querySelector(`#${r.id} #${a}`) && r.removeChild(x), d === "modal" ? r.classList.add("modal") : r.classList.add("side-sheet"), r.classList.remove("bottomsheet"), !document.querySelector(`#${r.id} #modal-close`) && d === "modal" ? r.prepend(g) : !document.querySelector(`#${r.id} #side-left`) && d === "sideSheetLeft" ? r.prepend(h) : !document.querySelector(`#${r.id} #side-right`) && d === "sideSheetRight" && (r.prepend(u), mt())) : (a && !document.querySelector(`#${r == null ? void 0 : r.id} #${a}`) && r.prepend(x), document.querySelector(`#${r.id} #modal-close`) && r.removeChild(g), document.querySelector(`#${r.id} #side-left`) && r.removeChild(h), document.querySelector(`#${r.id} #side-right`) && r.removeChild(u), r.classList.add("bottomsheet"), r.classList.remove("modal"), r.classList.remove("side-sheet"));
  }
  function Ft(h, u) {
    let a = 0;
    t.forEach((p) => {
      const y = ct(p);
      v(y) < E(h) && v(y) > a && (a = v(y));
    });
    let g;
    return P ? g = E(a) : a <= j(t[0]) ? g = E(j(t[0])) : g = E(a), J(u, `${g}px`, k), T = E(a), T;
  }
  function gt(h, u, a, g, p) {
    let y = 1 / 0;
    if (t.forEach((C) => {
      const S = ct(C);
      v(S) > E(h) && v(S) < y && (y = v(S));
    }), y !== 1 / 0)
      return a > W || p < et ? (J(
        u,
        `${E(y)}px`,
        k
      ), T = E(y), T) : Ft(h, u);
  }
  function It(h, u, a, g, p) {
    let y = 0;
    if (t.forEach((C) => {
      const S = ct(C);
      v(S) < E(h) && v(S) > y && (y = v(S));
    }), a > W || p > et) {
      let C;
      return P ? C = E(y) : y <= j(t[0]) ? C = E(j(t[0])) : C = E(y), J(u, `${C}px`, k), T = E(y), T;
    }
    return gt(
      h,
      u,
      a,
      g,
      p
    );
  }
  function yt(h, u, a, g, p, y, C, S) {
    let K = C[1];
    if (a === null) {
      let O;
      K > window.innerHeight ? O = window.innerHeight : K < v(100 - p) ? O = v(100 - p) : O = K, g && J(h, `${O}px`, k), g || It(
        O,
        h,
        y,
        p,
        S
      ) !== void 0 && (K = It(
        O,
        h,
        y,
        p,
        S
      ));
    } else {
      let O;
      K > window.innerHeight ? O = window.innerHeight : K < v(100 - p) ? O = v(100 - p) : O = K, g && J(h, `${O}px`, k), g || gt(
        O,
        h,
        y,
        p,
        S
      ) !== void 0 && (K = gt(
        O,
        h,
        y,
        p,
        S
      ));
    }
  }
  function Zt(h, u, a, g) {
    fi(
      h,
      {
        onDrag: ({
          active: p,
          velocity: [, y],
          offset: C,
          distance: [, S],
          target: K,
          direction: O
        }) => {
          Z = F(a), window.innerWidth < s && (O[1] > 0 ? g && K === document.querySelector(`#${g}`) ? (r.style.overflow = "hidden", r.style.touchAction = "none", yt(
            a,
            0,
            null,
            p,
            u,
            y,
            C,
            S
          ), T >= window.innerHeight && N(L, P), T >= window.innerHeight && z(A)) : a.scrollTop >= 1 && Z <= v(100 - u) && (!g || K !== document.querySelector(`#${g}`)) ? M && (r.style.overflow = "scroll", r.style.touchAction = "auto", r.click()) : (r.style.overflow = "hidden", r.style.touchAction = "none", yt(
            a,
            0,
            null,
            p,
            u,
            y,
            C,
            S
          ), T >= window.innerHeight && N(L, P)) : F(r) <= v(100 - u) ? M && (a.click(), r.style.overflow = "scroll", v(100 - u) > 0 && (r.style.minHeight = "unset"), r.style.height = `${v(
            u
          )}px`, r.style.touchAction = "auto") : (r.style.overflow = "hidden", r.style.touchAction = "none", yt(
            a,
            null,
            1 / 0,
            p,
            u,
            y,
            C,
            S
          ), T >= window.innerHeight && N(L, P)));
        },
        onDragStart: ({ direction: p }) => {
          document.body.style.overflow = "hidden", ht(p);
        },
        onDragEnd: ({ direction: p }) => {
          Z = F(a), (Z <= v(100 - u) || T === 0) && p[1] < 0 && r.scrollTop >= 0 && M && (r.style.overflow = "scroll", r.click(), r.style.touchAction = "auto"), (Z <= v(100 - u) || T === 0) && p[1] > 0 && r.scrollTop === 0 && (r.style.overflow = "hidden"), dt(p);
        }
      },
      {
        drag: {
          filterTaps: !1,
          rubberband: !0,
          axis: "y",
          preventDefault: !1,
          from: () => [0, F(a)]
        }
      }
    );
  }
  function Jt(h, u, a, g) {
    return window.addEventListener("resize", () => (St(h, u, g, a), window.innerWidth < s ? L = !1 : L = !0, L)), L;
  }
  function Qt() {
    const h = ct(
      t[t.length - 1]
    ), u = document.createElement("div"), a = document.createElement("div"), g = document.createElement("div");
    let p = "";
    r.style.display = "block", u.id = "modal-close", u.classList.add("close-modal"), u.addEventListener("click", () => Et()), a.id = "side-left", Y && a.addEventListener("click", () => {
      Tt();
    }), g.id = "side-right", Y && g.addEventListener("click", () => mt()), u.insertAdjacentHTML("afterbegin", l), a.insertAdjacentHTML("afterbegin", D), g.insertAdjacentHTML("afterbegin", I), x && (typeof x == "string" ? (x = new DOMParser().parseFromString(
      x,
      "text/xml"
    ), p = x.childNodes[0].id, [x] = x.childNodes) : p = x == null ? void 0 : x.id, x.setAttribute("data-draggable", "1"), x.classList.add("draggable")), St(a, g, p, u), L = Jt(
      a,
      g,
      u,
      p
    ), setTimeout(() => {
      n();
    }, 300), T && T < window.innerHeight && window.innerWidth < s ? N(L, P) : pt(L, m), M && (r.click(), r.style.overflow = "scroll", r.style.touchAction = "auto"), setTimeout(() => {
      Zt(
        r,
        h,
        r,
        p
      );
    }, 400), document.querySelector(`.bottomsheet #${r.id}`) && (document.querySelector(
      `.bottomsheet #${r.id}`
    ).style.display = "block");
  }
  function nt() {
    document.body.style.overflowY = "contain", f && f(), R && !r ? (document.body.insertAdjacentHTML("beforeend", R), r = it ? document.querySelector(`#${it}`) : document.querySelector(
      `#${new DOMParser().parseFromString(R, "text/html").body.firstChild.id}`
    )) : R && !r.innerHTML && (r.innerHTML = new DOMParser().parseFromString(
      R,
      "text/html"
    ).body.firstChild.innerHTML), r && !document.getElementById(`#${r.id}`) && document.body.append(r), e && (A.classList.add("overlay"), Yt(A), document.body.appendChild(A), r && document.querySelector(".overlay") && document.body.insertBefore(A, r), ft && A.addEventListener("click", () => {
      N(L, P);
    })), document.querySelectorAll(`#${r == null ? void 0 : r.id}`).length < 2 ? Qt() : pt(L, m);
  }
  m ? nt() : setTimeout(() => {
    c && document.querySelector(`#${c}`) && document.querySelectorAll(`#${c}`).forEach(
      (h) => h.addEventListener("click", () => {
        nt();
      })
    );
  }, 400);
  function te() {
    document.getElementById(c).removeEventListener("click", () => {
      nt();
    });
  }
  return {
    close: N,
    init: nt,
    open: pt,
    destroy: te
  };
}
export {
  gi as default
};
