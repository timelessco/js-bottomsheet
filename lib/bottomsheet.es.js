import k from "animejs/lib/anime.es";
function le(i, t, e) {
  return Math.max(t, Math.min(i, e));
}
const v = {
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
function Ct(i, t, e) {
  return t === 0 || Math.abs(t) === 1 / 0 ? Math.pow(i, e * 5) : i * t * e / (t + e * i);
}
function Dt(i, t, e, s = 0.15) {
  return s === 0 ? le(i, t, e) : i < t ? -Ct(t - i, e - t, s) + t : i > e ? +Ct(i - e, e - t, s) + e : i;
}
function ue(i, [t, e], [s, n]) {
  const [[o, c], [d, p]] = i;
  return [Dt(t, o, c, s), Dt(e, d, p, n)];
}
function E(i, t, e) {
  return t in i ? Object.defineProperty(i, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : i[t] = e, i;
}
function Mt(i, t) {
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
    t % 2 ? Mt(Object(e), !0).forEach(function(s) {
      E(i, s, e[s]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(e)) : Mt(Object(e)).forEach(function(s) {
      Object.defineProperty(i, s, Object.getOwnPropertyDescriptor(e, s));
    });
  }
  return i;
}
const Xt = {
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
function Pt(i) {
  return i ? i[0].toUpperCase() + i.slice(1) : "";
}
const fe = ["enter", "leave"];
function he(i = !1, t) {
  return i && !fe.includes(t);
}
function de(i, t = "", e = !1) {
  const s = Xt[i], n = s && s[t] || t;
  return "on" + Pt(i) + Pt(n) + (he(e, n) ? "Capture" : "");
}
const pe = ["gotpointercapture", "lostpointercapture"];
function me(i) {
  let t = i.substring(2).toLowerCase();
  const e = !!~t.indexOf("passive");
  e && (t = t.replace("passive", ""));
  const s = pe.includes(t) ? "capturecapture" : "capture", n = !!~t.indexOf(s);
  return n && (t = t.replace("capture", "")), {
    device: t,
    capture: n,
    passive: e
  };
}
function ge(i, t = "") {
  const e = Xt[i], s = e && e[t] || t;
  return i + s;
}
function dt(i) {
  return "touches" in i;
}
function Gt(i) {
  return dt(i) ? "touch" : "pointerType" in i ? i.pointerType : "mouse";
}
function ye(i) {
  return Array.from(i.touches).filter((t) => {
    var e, s;
    return t.target === i.currentTarget || ((e = i.currentTarget) === null || e === void 0 || (s = e.contains) === null || s === void 0 ? void 0 : s.call(e, t.target));
  });
}
function _e(i) {
  return i.type === "touchend" || i.type === "touchcancel" ? i.changedTouches : i.targetTouches;
}
function Bt(i) {
  return dt(i) ? _e(i)[0] : i;
}
function wt(i, t) {
  const e = t.clientX - i.clientX, s = t.clientY - i.clientY, n = (t.clientX + i.clientX) / 2, o = (t.clientY + i.clientY) / 2, c = Math.hypot(e, s);
  return {
    angle: -(Math.atan2(e, s) * 180) / Math.PI,
    distance: c,
    origin: [n, o]
  };
}
function ve(i) {
  return ye(i).map((t) => t.identifier);
}
function At(i, t) {
  const [e, s] = Array.from(i.touches).filter((n) => t.includes(n.identifier));
  return wt(e, s);
}
function vt(i) {
  const t = Bt(i);
  return dt(i) ? t.identifier : t.pointerId;
}
function z(i) {
  const t = Bt(i);
  return [t.clientX, t.clientY];
}
const $t = 40, Ht = 800;
function zt(i) {
  let {
    deltaX: t,
    deltaY: e,
    deltaMode: s
  } = i;
  return s === 1 ? (t *= $t, e *= $t) : s === 2 && (t *= Ht, e *= Ht), [t, e];
}
function we(i) {
  var t, e;
  const {
    scrollX: s,
    scrollY: n,
    scrollLeft: o,
    scrollTop: c
  } = i.currentTarget;
  return [(t = s ?? o) !== null && t !== void 0 ? t : 0, (e = n ?? c) !== null && e !== void 0 ? e : 0];
}
function be(i) {
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
function ht(i, ...t) {
  return typeof i == "function" ? i(...t) : i;
}
function Ee() {
}
function Se(...i) {
  return i.length === 0 ? Ee : i.length === 1 ? i[0] : function() {
    let t;
    for (const e of i)
      t = e.apply(this, arguments) || t;
    return t;
  };
}
function Rt(i, t) {
  return Object.assign({}, t, i || {});
}
const Te = 32;
class Ft {
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
    e._active || (this.reset(), this.computeInitial(), e._active = !0, e.target = t.target, e.currentTarget = t.currentTarget, e.lastOffset = s.from ? ht(s.from, e) : e.offset, e.offset = e.lastOffset), e.startTime = e.timeStamp = t.timeStamp;
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
    if (t && (e.event = t, s.preventDefault && t.cancelable && e.event.preventDefault(), e.type = t.type, n.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size, n.locked = !!document.pointerLockElement, Object.assign(n, be(t)), n.down = n.pressed = n.buttons % 2 === 1 || n.touches > 0, o = t.timeStamp - e.timeStamp, e.timeStamp = t.timeStamp, e.elapsedTime = e.timeStamp - e.startTime), e._active) {
      const H = e._delta.map(Math.abs);
      v.addTo(e._distance, H);
    }
    this.axisIntent && this.axisIntent(t);
    const [c, d] = e._movement, [p, g] = s.threshold, {
      _step: f,
      values: M
    } = e;
    if (s.hasCustomTransform ? (f[0] === !1 && (f[0] = Math.abs(c) >= p && M[0]), f[1] === !1 && (f[1] = Math.abs(d) >= g && M[1])) : (f[0] === !1 && (f[0] = Math.abs(c) >= p && Math.sign(c) * p), f[1] === !1 && (f[1] = Math.abs(d) >= g && Math.sign(d) * g)), e.intentional = f[0] !== !1 || f[1] !== !1, !e.intentional)
      return;
    const L = [0, 0];
    if (s.hasCustomTransform) {
      const [H, mt] = M;
      L[0] = f[0] !== !1 ? H - f[0] : 0, L[1] = f[1] !== !1 ? mt - f[1] : 0;
    } else
      L[0] = f[0] !== !1 ? c - f[0] : 0, L[1] = f[1] !== !1 ? d - f[1] : 0;
    this.restrictToAxis && !e._blocked && this.restrictToAxis(L);
    const D = e.offset, j = e._active && !e._blocked || e.active;
    j && (e.first = e._active && !e.active, e.last = !e._active && e.active, e.active = n[this.ingKey] = e._active, t && (e.first && ("bounds" in s && (e._bounds = ht(s.bounds, e)), this.setup && this.setup()), e.movement = L, this.computeOffset()));
    const [Y, N] = e.offset, [[F, K], [et, it]] = e._bounds;
    e.overflow = [Y < F ? -1 : Y > K ? 1 : 0, N < et ? -1 : N > it ? 1 : 0], e._movementBound[0] = e.overflow[0] ? e._movementBound[0] === !1 ? e._movement[0] : e._movementBound[0] : !1, e._movementBound[1] = e.overflow[1] ? e._movementBound[1] === !1 ? e._movement[1] : e._movementBound[1] : !1;
    const pt = e._active ? s.rubberband || [0, 0] : [0, 0];
    if (e.offset = ue(e._bounds, e.offset, pt), e.delta = v.sub(e.offset, D), this.computeMovement(), j && (!e.last || o > Te)) {
      e.delta = v.sub(e.offset, D);
      const H = e.delta.map(Math.abs);
      v.addTo(e.distance, H), e.direction = e.delta.map(Math.sign), e._direction = e._delta.map(Math.sign), !e.first && o > 0 && (e.velocity = [H[0] / o, H[1] / o]);
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
function Ie([i, t], e) {
  const s = Math.abs(i), n = Math.abs(t);
  if (s > n && s > e)
    return "x";
  if (n > s && n > e)
    return "y";
}
class Q extends Ft {
  constructor(...t) {
    super(...t), E(this, "aliasKey", "xy");
  }
  reset() {
    super.reset(), this.state.axis = void 0;
  }
  init() {
    this.state.offset = [0, 0], this.state.lastOffset = [0, 0];
  }
  computeOffset() {
    this.state.offset = v.add(this.state.lastOffset, this.state.movement);
  }
  computeMovement() {
    this.state.movement = v.sub(this.state.offset, this.state.lastOffset);
  }
  axisIntent(t) {
    const e = this.state, s = this.config;
    if (!e.axis && t) {
      const n = typeof s.axisThreshold == "object" ? s.axisThreshold[Gt(t)] : s.axisThreshold;
      e.axis = Ie(e._movement, n);
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
const Oe = (i) => i, Vt = 0.15, Jt = {
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
        return [Vt, Vt];
      case !1:
        return [0, 0];
      default:
        return v.toVector(i);
    }
  },
  from(i) {
    if (typeof i == "function")
      return i;
    if (i != null)
      return v.toVector(i);
  },
  transform(i, t, e) {
    const s = i || e.shared.transform;
    return this.hasCustomTransform = !!s, s || Oe;
  },
  threshold(i) {
    return v.toVector(i, 0);
  }
}, xe = 0, U = b(b({}, Jt), {}, {
  axis(i, t, {
    axis: e
  }) {
    if (this.lockDirection = e === "lock", !this.lockDirection)
      return e;
  },
  axisThreshold(i = xe) {
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
}), at = 10, Kt = {
  ArrowRight: (i = 1) => [at * i, 0],
  ArrowLeft: (i = 1) => [-at * i, 0],
  ArrowUp: (i = 1) => [0, -at * i],
  ArrowDown: (i = 1) => [0, at * i]
};
class ke extends Q {
  constructor(...t) {
    super(...t), E(this, "ingKey", "dragging");
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
    e.pointerCapture && t.target.setPointerCapture(t.pointerId), !(n && n.size > 1 && s._pointerActive) && (this.start(t), this.setupPointer(t), s._pointerId = vt(t), s._pointerActive = !0, this.computeValues(z(t)), this.computeInitial(), e.preventScrollAxis && Gt(t) !== "mouse" ? (s._active = !1, this.setupScrollPrevention(t)) : e.delay > 0 ? (this.setupDelayTrigger(t), e.triggerAllEvents && (this.compute(t), this.emit())) : this.startPointerDrag(t));
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
    const o = z(t);
    if (document.pointerLockElement === t.target ? e._delta = [t.movementX, t.movementY] : (e._delta = v.sub(o, e._values), this.computeValues(o)), v.addTo(e._movement, e._delta), this.compute(t), e._delayed && e.intentional) {
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
    const [o, c] = e._distance;
    if (e.tap = o <= s.tapsThreshold && c <= s.tapsThreshold, e.tap && s.filterTaps)
      e._force = !0;
    else {
      const [d, p] = e.direction, [g, f] = e.velocity, [M, L] = e.movement, [D, j] = s.swipe.velocity, [Y, N] = s.swipe.distance, F = s.swipe.duration;
      e.elapsedTime < F && (Math.abs(g) > D && Math.abs(M) > Y && (e.swipe[0] = d), Math.abs(f) > j && Math.abs(L) > N && (e.swipe[1] = p));
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
    this.state._preventScroll = !1, Le(t);
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
    const e = Kt[t.key];
    if (e) {
      const s = this.state, n = t.shiftKey ? 10 : t.altKey ? 0.1 : 1;
      this.start(t), s._delta = e(n), s._keyboardActive = !0, v.addTo(s._movement, s._delta), this.compute(t), this.emit();
    }
  }
  keyUp(t) {
    t.key in Kt && (this.state._keyboardActive = !1, this.setActive(), this.compute(t), this.emit());
  }
  bind(t) {
    const e = this.config.device;
    t(e, "start", this.pointerDown.bind(this)), this.config.pointerCapture && (t(e, "change", this.pointerMove.bind(this)), t(e, "end", this.pointerUp.bind(this)), t(e, "cancel", this.pointerUp.bind(this)), t("lostPointerCapture", "", this.pointerUp.bind(this))), this.config.keys && (t("key", "down", this.keyDown.bind(this)), t("key", "up", this.keyUp.bind(this))), this.config.filterTaps && t("click", "", this.pointerClick.bind(this), {
      capture: !0,
      passive: !1
    });
  }
}
function Le(i) {
  "persist" in i && typeof i.persist == "function" && i.persist();
}
const tt = typeof window < "u" && window.document && window.document.createElement;
function Ce() {
  return tt && "ontouchstart" in window;
}
function Wt() {
  return Ce() || tt && window.navigator.maxTouchPoints > 1;
}
function De() {
  return tt && "onpointerdown" in window;
}
function Me() {
  return tt && "exitPointerLock" in window.document;
}
function Pe() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const $ = {
  isBrowser: tt,
  gesture: Pe(),
  touch: Wt(),
  touchscreen: Wt(),
  pointer: De(),
  pointerLock: Me()
}, Ae = 250, $e = 180, He = 0.5, Re = 50, Ve = 250, jt = {
  mouse: 0,
  touch: 0,
  pen: 8
}, Ke = b(b({}, U), {}, {
  device(i, t, {
    pointer: {
      touch: e = !1,
      lock: s = !1,
      mouse: n = !1
    } = {}
  }) {
    return this.pointerLock = s && $.pointerLock, $.touch && e ? "touch" : this.pointerLock ? "mouse" : $.pointer && !n ? "pointer" : $.touch ? "touch" : "mouse";
  },
  preventScrollAxis(i, t, {
    preventScroll: e
  }) {
    if (this.preventScrollDelay = typeof e == "number" ? e : e || e === void 0 && i ? Ae : void 0, !(!$.touchscreen || e === !1))
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
    const o = v.toVector(i, e ? s : n ? 1 : 0);
    return this.filterTaps = e, this.tapsThreshold = s, o;
  },
  swipe({
    velocity: i = He,
    distance: t = Re,
    duration: e = Ve
  } = {}) {
    return {
      velocity: this.transform(v.toVector(i)),
      distance: this.transform(v.toVector(t)),
      duration: e
    };
  },
  delay(i = 0) {
    switch (i) {
      case !0:
        return $e;
      case !1:
        return 0;
      default:
        return i;
    }
  },
  axisThreshold(i) {
    return i ? b(b({}, jt), i) : jt;
  }
});
function Zt(i) {
  const [t, e] = i.overflow, [s, n] = i._delta, [o, c] = i._direction;
  (t < 0 && s > 0 && o < 0 || t > 0 && s < 0 && o > 0) && (i._movement[0] = i._movementBound[0]), (e < 0 && n > 0 && c < 0 || e > 0 && n < 0 && c > 0) && (i._movement[1] = i._movementBound[1]);
}
const We = 30, je = 100;
class Ye extends Ft {
  constructor(...t) {
    super(...t), E(this, "ingKey", "pinching"), E(this, "aliasKey", "da");
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
    t === "wheel" ? this.state.offset = v.add(e, s) : this.state.offset = [(1 + e[0]) * s[0], e[1] + s[1]];
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
    const n = At(t, e._touchIds);
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
    const e = At(t, this.state._touchIds);
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
    e._movement = [t.scale - 1, t.rotation], e._delta = v.sub(e._movement, s), this.compute(t), this.emit();
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
    s._delta = [-zt(t)[1] / je * s.offset[0], 0], v.addTo(s._movement, s._delta), Zt(s), this.state.origin = [t.clientX, t.clientY], this.compute(t), this.emit();
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
const qe = b(b({}, Jt), {}, {
  device(i, t, {
    shared: e,
    pointer: {
      touch: s = !1
    } = {}
  }) {
    if (e.target && !$.touch && $.gesture)
      return "gesture";
    if ($.touch && s)
      return "touch";
    if ($.touchscreen) {
      if ($.pointer)
        return "pointer";
      if ($.touch)
        return "touch";
    }
  },
  bounds(i, t, {
    scaleBounds: e = {},
    angleBounds: s = {}
  }) {
    const n = (c) => {
      const d = Rt(ht(e, c), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [d.min, d.max];
    }, o = (c) => {
      const d = Rt(ht(s, c), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [d.min, d.max];
    };
    return typeof e != "function" && typeof s != "function" ? [n(), o()] : (c) => [n(c), o(c)];
  },
  threshold(i, t, e) {
    return this.lockDirection = e.axis === "lock", v.toVector(i, this.lockDirection ? [0.1, 3] : 0);
  },
  modifierKey(i) {
    return i === void 0 ? "ctrlKey" : i;
  },
  pinchOnWheel(i = !0) {
    return i;
  }
});
class Ue extends Q {
  constructor(...t) {
    super(...t), E(this, "ingKey", "moving");
  }
  move(t) {
    this.config.mouseOnly && t.pointerType !== "mouse" || (this.state._active ? this.moveChange(t) : this.moveStart(t), this.timeoutStore.add("moveEnd", this.moveEnd.bind(this)));
  }
  moveStart(t) {
    this.start(t), this.computeValues(z(t)), this.compute(t), this.computeInitial(), this.emit();
  }
  moveChange(t) {
    if (!this.state._active)
      return;
    const e = z(t), s = this.state;
    s._delta = v.sub(e, s._values), v.addTo(s._movement, s._delta), this.computeValues(e), this.compute(t), this.emit();
  }
  moveEnd(t) {
    this.state._active && (this.state._active = !1, this.compute(t), this.emit());
  }
  bind(t) {
    t("pointer", "change", this.move.bind(this)), t("pointer", "leave", this.moveEnd.bind(this));
  }
}
const Ne = b(b({}, U), {}, {
  mouseOnly: (i = !0) => i
});
class Xe extends Q {
  constructor(...t) {
    super(...t), E(this, "ingKey", "scrolling");
  }
  scroll(t) {
    this.state._active || this.start(t), this.scrollChange(t), this.timeoutStore.add("scrollEnd", this.scrollEnd.bind(this));
  }
  scrollChange(t) {
    t.cancelable && t.preventDefault();
    const e = this.state, s = we(t);
    e._delta = v.sub(s, e._values), v.addTo(e._movement, e._delta), this.computeValues(s), this.compute(t), this.emit();
  }
  scrollEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(t) {
    t("scroll", "", this.scroll.bind(this));
  }
}
const Ge = U;
class Be extends Q {
  constructor(...t) {
    super(...t), E(this, "ingKey", "wheeling");
  }
  wheel(t) {
    this.state._active || this.start(t), this.wheelChange(t), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(t) {
    const e = this.state;
    e._delta = zt(t), v.addTo(e._movement, e._delta), Zt(e), this.compute(t), this.emit();
  }
  wheelEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(t) {
    t("wheel", "", this.wheel.bind(this));
  }
}
const ze = U;
class Fe extends Q {
  constructor(...t) {
    super(...t), E(this, "ingKey", "hovering");
  }
  enter(t) {
    this.config.mouseOnly && t.pointerType !== "mouse" || (this.start(t), this.computeValues(z(t)), this.compute(t), this.emit());
  }
  leave(t) {
    if (this.config.mouseOnly && t.pointerType !== "mouse")
      return;
    const e = this.state;
    if (!e._active)
      return;
    e._active = !1;
    const s = z(t);
    e._movement = e._delta = v.sub(s, e._values), this.computeValues(s), this.compute(t), e.delta = e.movement, this.emit();
  }
  bind(t) {
    t("pointer", "enter", this.enter.bind(this)), t("pointer", "leave", this.leave.bind(this));
  }
}
const Je = b(b({}, U), {}, {
  mouseOnly: (i = !0) => i
}), Et = /* @__PURE__ */ new Map(), bt = /* @__PURE__ */ new Map();
function Ze(i) {
  Et.set(i.key, i.engine), bt.set(i.key, i.resolver);
}
const Qe = {
  key: "drag",
  engine: ke,
  resolver: Ke
}, ti = {
  key: "hover",
  engine: Fe,
  resolver: Je
}, ei = {
  key: "move",
  engine: Ue,
  resolver: Ne
}, ii = {
  key: "pinch",
  engine: Ye,
  resolver: qe
}, si = {
  key: "scroll",
  engine: Xe,
  resolver: Ge
}, ni = {
  key: "wheel",
  engine: Be,
  resolver: ze
};
function ri(i, t) {
  if (i == null)
    return {};
  var e = {}, s = Object.keys(i), n, o;
  for (o = 0; o < s.length; o++)
    n = s[o], !(t.indexOf(n) >= 0) && (e[n] = i[n]);
  return e;
}
function oi(i, t) {
  if (i == null)
    return {};
  var e = ri(i, t), s, n;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(i);
    for (n = 0; n < o.length; n++)
      s = o[n], !(t.indexOf(s) >= 0) && Object.prototype.propertyIsEnumerable.call(i, s) && (e[s] = i[s]);
  }
  return e;
}
const ai = {
  target(i) {
    if (i)
      return () => "current" in i ? i.current : i;
  },
  enabled(i = !0) {
    return i;
  },
  window(i = $.isBrowser ? window : void 0) {
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
}, ci = ["target", "eventOptions", "window", "enabled", "transform"];
function ft(i = {}, t) {
  const e = {};
  for (const [s, n] of Object.entries(t))
    switch (typeof n) {
      case "function":
        e[s] = n.call(e, i[s], s, i);
        break;
      case "object":
        e[s] = ft(i[s], n);
        break;
      case "boolean":
        n && (e[s] = i[s]);
        break;
    }
  return e;
}
function li(i, t, e = {}) {
  const s = i, {
    target: n,
    eventOptions: o,
    window: c,
    enabled: d,
    transform: p
  } = s, g = oi(s, ci);
  if (e.shared = ft({
    target: n,
    eventOptions: o,
    window: c,
    enabled: d,
    transform: p
  }, ai), t) {
    const f = bt.get(t);
    e[t] = ft(b({
      shared: e.shared
    }, g), f);
  } else
    for (const f in g) {
      const M = bt.get(f);
      M && (e[f] = ft(b({
        shared: e.shared
      }, g[f]), M));
    }
  return e;
}
class Qt {
  constructor(t, e) {
    E(this, "_listeners", /* @__PURE__ */ new Set()), this._ctrl = t, this._gestureKey = e;
  }
  add(t, e, s, n, o) {
    const c = this._listeners, d = ge(e, s), p = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}, g = b(b({}, p), o);
    t.addEventListener(d, n, g);
    const f = () => {
      t.removeEventListener(d, n, g), c.delete(f);
    };
    return c.add(f), f;
  }
  clean() {
    this._listeners.forEach((t) => t()), this._listeners.clear();
  }
}
class ui {
  constructor() {
    E(this, "_timeouts", /* @__PURE__ */ new Map());
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
class fi {
  constructor(t) {
    E(this, "gestures", /* @__PURE__ */ new Set()), E(this, "_targetEventStore", new Qt(this)), E(this, "gestureEventStores", {}), E(this, "gestureTimeoutStores", {}), E(this, "handlers", {}), E(this, "config", {}), E(this, "pointerIds", /* @__PURE__ */ new Set()), E(this, "touchIds", /* @__PURE__ */ new Set()), E(this, "state", {
      shared: {
        shiftKey: !1,
        metaKey: !1,
        ctrlKey: !1,
        altKey: !1
      }
    }), hi(this, t);
  }
  setEventIds(t) {
    if (dt(t))
      return this.touchIds = new Set(ve(t)), this.touchIds;
    if ("pointerId" in t)
      return t.type === "pointerup" || t.type === "pointercancel" ? this.pointerIds.delete(t.pointerId) : t.type === "pointerdown" && this.pointerIds.add(t.pointerId), this.pointerIds;
  }
  applyHandlers(t, e) {
    this.handlers = t, this.nativeHandlers = e;
  }
  applyConfig(t, e) {
    this.config = li(t, e, this.config);
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
          const d = this.config[c], p = Yt(s, d.eventOptions, !!n);
          if (d.enabled) {
            const g = Et.get(c);
            new g(this, t, c).bind(p);
          }
        }
        const o = Yt(s, e.eventOptions, !!n);
        for (const c in this.nativeHandlers)
          o(
            c,
            "",
            (d) => this.nativeHandlers[c](b(b({}, this.state.shared), {}, {
              event: d,
              args: t
            })),
            void 0,
            !0
          );
      }
      for (const o in s)
        s[o] = Se(...s[o]);
      if (!n)
        return s;
      for (const o in s) {
        const {
          device: c,
          capture: d,
          passive: p
        } = me(o);
        this._targetEventStore.add(n, c, "", s[o], {
          capture: d,
          passive: p
        });
      }
    }
  }
}
function G(i, t) {
  i.gestures.add(t), i.gestureEventStores[t] = new Qt(i, t), i.gestureTimeoutStores[t] = new ui();
}
function hi(i, t) {
  t.drag && G(i, "drag"), t.wheel && G(i, "wheel"), t.scroll && G(i, "scroll"), t.move && G(i, "move"), t.pinch && G(i, "pinch"), t.hover && G(i, "hover");
}
const Yt = (i, t, e) => (s, n, o, c = {}, d = !1) => {
  var p, g;
  const f = (p = c.capture) !== null && p !== void 0 ? p : t.capture, M = (g = c.passive) !== null && g !== void 0 ? g : t.passive;
  let L = d ? s : de(s, n, f);
  e && M && (L += "Passive"), i[L] = i[L] || [], i[L].push(o);
}, di = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function pi(i) {
  const t = {}, e = {}, s = /* @__PURE__ */ new Set();
  for (let n in i)
    di.test(n) ? (s.add(RegExp.lastMatch), e[n] = i[n]) : t[n] = i[n];
  return [e, t, s];
}
function B(i, t, e, s, n, o) {
  if (!i.has(e) || !Et.has(s))
    return;
  const c = e + "Start", d = e + "End", p = (g) => {
    let f;
    return g.first && c in t && t[c](g), e in t && (f = t[e](g)), g.last && d in t && t[d](g), f;
  };
  n[s] = p, o[s] = o[s] || {};
}
function mi(i, t) {
  const [e, s, n] = pi(i), o = {};
  return B(n, e, "onDrag", "drag", o, t), B(n, e, "onWheel", "wheel", o, t), B(n, e, "onScroll", "scroll", o, t), B(n, e, "onPinch", "pinch", o, t), B(n, e, "onMove", "move", o, t), B(n, e, "onHover", "hover", o, t), {
    handlers: o,
    config: t,
    nativeHandlers: s
  };
}
function gi(i, t, e) {
  return t in i ? Object.defineProperty(i, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : i[t] = e, i;
}
function qt(i, t) {
  var e = Object.keys(i);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(i);
    t && (s = s.filter(function(n) {
      return Object.getOwnPropertyDescriptor(i, n).enumerable;
    })), e.push.apply(e, s);
  }
  return e;
}
function ct(i) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? qt(Object(e), !0).forEach(function(s) {
      gi(i, s, e[s]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(e)) : qt(Object(e)).forEach(function(s) {
      Object.defineProperty(i, s, Object.getOwnPropertyDescriptor(e, s));
    });
  }
  return i;
}
class yi {
  constructor(t, e, s, n, o) {
    this._target = t, this._gestureKey = n, this._ctrl = new fi(e), this._ctrl.applyHandlers(e, o), this._ctrl.applyConfig(ct(ct({}, s), {}, {
      target: t
    }), n), this._ctrl.effect();
  }
  destroy() {
    this._ctrl.clean();
  }
  setConfig(t) {
    this._ctrl.clean(), this._ctrl.applyConfig(ct(ct({}, t), {}, {
      target: this._target
    }), this._gestureKey), this._ctrl.effect();
  }
}
function _i(i) {
  return i.forEach(Ze), function(t, e, s) {
    const {
      handlers: n,
      nativeHandlers: o,
      config: c
    } = mi(e, s || {});
    return new yi(t, n, c, void 0, o);
  };
}
const Ut = function(t, e, s) {
  return _i([Qe, ii, si, ni, ei, ti])(t, e, s || {});
};
function lt(i) {
  return typeof i == "string" ? +i.replace("%", "") : +i;
}
function w(i) {
  return Math.round(window.innerHeight * i / 100);
}
function V(i) {
  return typeof i == "string" ? w(+i.replace("%", "")) : +i;
}
function T(i) {
  return window.innerHeight - i;
}
function ut(i) {
  k({
    targets: i,
    opacity: 0,
    easing: "spring(1, 85, 35, 3)",
    duration: 0
  }), setTimeout(() => {
    var t;
    (t = i == null ? void 0 : i.classList) != null && t.contains("display") && i.classList.remove("display"), i && i.remove();
  }, 300), document.body.style.overflow = "scroll";
}
function Nt(i) {
  i.classList.add("display"), k({
    targets: i,
    opacity: 1,
    easing: "spring(1, 85, 35, 3)",
    duration: 0
  });
}
function Z(i, t, e, s) {
  k({
    targets: i,
    translateY: t,
    easing: e,
    duration: s
  });
}
function Si(i) {
  var kt;
  const {
    snapPoints: t = ["100%"],
    displayOverlay: e = !1,
    minWidthForModal: s = 700,
    onOpen: n = () => {
    },
    onClose: o = () => {
    },
    trigger: c = "",
    onInit: d = () => {
    },
    webLayout: p = "modal",
    openOnLoad: g = !1,
    modalCloseIcon: f = `<svg width="16" height="12" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33.112 36.9133C34.3649 38.15 36.3963 38.15 37.6492 36.9133C38.9022 35.6766 38.9022 33.6716 37.6492 32.435L24.0375 19L37.6492 5.56496C38.9022 4.3283 38.9022 2.32328 37.6492 1.08662C36.3963 -0.150042 34.3649 -0.150042 33.112 1.08662L19.5002 14.5216L5.88835 1.08655C4.63541 -0.150108 2.60401 -0.150107 1.35108 1.08655C0.0981471 2.32321 0.0981459 4.32824 1.35108 5.5649L14.9629 19L1.35108 32.435C0.0981434 33.6717 0.0981443 35.6767 1.35108 36.9134C2.60401 38.15 4.63541 38.15 5.88834 36.9134L19.5002 23.4783L33.112 36.9133Z" fill="white"/>
    </svg>
    `,
    sideSheetIcon: M = "",
    sideSheetIconPosition: L = "left",
    sideSheetMinValue: D = 20,
    sideSheetMaxValue: j = 50,
    scaleOnDrag: Y = !1,
    defaultSideSheetClose: N = !0,
    cleanUpOnClose: F = !1,
    dismissible: K = !0,
    velocityThreshold: et = 0.9,
    distanceThreshold: it = 150,
    closeOnOverlayClick: pt = !0,
    onDragStart: H = () => {
    },
    onDragEnd: mt = () => {
    },
    scrollableSheet: st = !0,
    resizablePosition: te = "left"
  } = i;
  let { content: R = "", draggableArea: C = "" } = i, I;
  R = typeof R != "string" ? Promise.resolve(R).then((a) => a) : R;
  const nt = c ? (kt = document == null ? void 0 : document.querySelector(`#${c}`)) == null ? void 0 : kt.getAttribute("data-bottomsheet-id") : "";
  let r = nt ? document == null ? void 0 : document.querySelector(`#${nt}`) : "";
  function q(a) {
    var l;
    const u = (l = a == null ? void 0 : a.style) == null ? void 0 : l.transform.slice(11).replace("px)", "");
    return u ? +u : null;
  }
  let J = q(r), W = !(window.innerWidth < s);
  const P = document.querySelector(`#${r == null ? void 0 : r.id}-overlay`) ? document.querySelector(`#${r == null ? void 0 : r.id}-overlay`) : document.createElement("div");
  P.id = `${r == null ? void 0 : r.id}-overlay`;
  const A = "spring(1,250,20,13)", St = 0.93;
  function gt(a, u, l = !1) {
    e && Nt(P), W ? (document.body.style.overflow = "hidden", p === "sideSheetLeft" ? (r.style.top = 0, r.style.left = "-100%", setTimeout(() => {
      k({
        targets: r,
        left: "0",
        width: `${D}%`,
        opacity: 1,
        easing: A,
        duration: 1,
        translateX: 0
      });
    }, 100)) : p === "sideSheetRight" ? (r.style.top = 0, r.style.right = "-100%", r.style.left = "unset", setTimeout(() => {
      k({
        targets: r,
        right: "0",
        opacity: 1,
        width: `${D}%`,
        easing: A,
        duration: 1,
        translateX: 0
      });
    }, 100)) : (r.style.top = "50%", r.style.opacity = 0, r.style.transform = "translateX(-50%) translateY(-40%) rotateX(-20deg)", k({
      translateY: "-50%",
      targets: r,
      opacity: 1,
      rotateX: "1deg",
      easing: A,
      duration: 0.1,
      translateX: 0
    }))) : (a ? localStorage.setItem("array", JSON.stringify(a)) : localStorage.setItem("array", []), u ? (r.style.opacity = 1, r.style.transform = `translateY(${T(
      V(t[0])
    )}px)`) : l ? r.style.transform = `translateY(${T(
      V(t[0])
    )}px)` : (document.body.style.overflow = "hidden", k({
      targets: r,
      translateY: `${w(100)}px`,
      easing: "linear",
      duration: 1
    }), setTimeout(() => {
      k({
        targets: r,
        translateY: `${T(V(t[0]))}px`,
        easing: "spring(1, 85, 15, 3)",
        opacity: 1,
        duration: 1
      });
    }, 60))), I = T(V(t[0]));
  }
  function Tt() {
    r.remove();
  }
  function It() {
    k({
      targets: r,
      opacity: 0,
      easing: A,
      duration: 0.1,
      translateY: "-40%"
    }), setTimeout(() => {
      Tt();
    }, 500), ut(P);
  }
  function rt() {
    r.style.width === 0 ? k({
      targets: r,
      width: "0",
      easing: A,
      duration: 0.1
    }) : k({
      targets: r,
      width: "0",
      easing: A,
      duration: 0.1
    });
  }
  function X(a = !0, u = JSON.parse(localStorage.getItem("array"))) {
    if (e && P && ut(P), document.body.style.overflow = "scroll", window.innerWidth < s) {
      k({
        targets: r,
        translateY: `${a ? w(120) : T(V(t[0]))}px`,
        easing: A,
        duration: 1
      });
      let l;
      u && u.includes(r) && (l = u.findIndex(
        (h) => document.getElementById(h) === r
      )), l > -1 && u.splice(l, 1), u ? localStorage.setItem("array", JSON.stringify(u)) : localStorage.removeItem("array");
    } else
      p === "modal" ? It() : rt();
    I = w(120), setTimeout(() => {
      I >= window.innerHeight && F && Tt();
    }, 500), ut(P), o();
  }
  function Ot(a, u, l, h) {
    W ? (C && document.querySelector(`#${r.id} #${u}`) && r.removeChild(C), p === "modal" ? r.classList.add("modal") : r.classList.add("side-sheet"), r.classList.remove("bottomsheet"), !document.querySelector(`#${r.id} #modal-close`) && p === "modal" ? r.prepend(l) : !document.querySelector(`#${r.id} #side-right`) && !document.querySelector(`#${r.id} #side-left`) && p !== "modal" && (r.prepend(a), r.prepend(h), rt())) : (u && !document.querySelector(`#${r == null ? void 0 : r.id} #${u}`) && r.prepend(C), document.querySelector(`#${r.id} #modal-close`) && r.removeChild(l), (document.querySelector(`#${r.id} #side-left`) || document.querySelector(`#${r.id} #side-right`)) && (r.removeChild(a), r.removeChild(h)), r.classList.add("bottomsheet"), r.classList.remove("modal"), r.classList.remove("side-sheet"));
  }
  function ee(a, u) {
    let l = 0;
    t.forEach((y) => {
      const m = lt(y);
      w(m) < T(a) && w(m) > l && (l = w(m));
    });
    let h;
    return K ? h = T(l) : l <= V(t[0]) ? h = T(V(t[0])) : h = T(l), Z(u, `${h}px`, A), I = T(l), I;
  }
  function yt(a, u, l, h, y) {
    let m = 1 / 0;
    if (t.forEach((_) => {
      const S = lt(_);
      w(S) > T(a) && w(S) < m && (m = w(S));
    }), m !== 1 / 0)
      return l > et || y < it ? (Z(
        u,
        `${T(m)}px`,
        A
      ), I = T(m), I) : ee(a, u);
  }
  function xt(a, u, l, h, y) {
    let m = 0;
    if (t.forEach((_) => {
      const S = lt(_);
      w(S) < T(a) && w(S) > m && (m = w(S));
    }), l > et || y > it) {
      let _;
      return K ? _ = T(m) : m <= V(t[0]) ? _ = T(V(t[0])) : _ = T(m), Z(u, `${_}px`, A), I = T(m), I;
    }
    return yt(
      a,
      u,
      l,
      h,
      y
    );
  }
  function _t(a, u, l, h, y, m, _, S) {
    let x = _[1];
    if (l === null) {
      let O;
      x > window.innerHeight ? O = window.innerHeight : x < w(100 - y) ? O = w(100 - y) : O = x, h && Z(a, `${O}px`, A), h || xt(
        O,
        a,
        m,
        y,
        S
      ) !== void 0 && (x = xt(
        O,
        a,
        m,
        y,
        S
      ));
    } else {
      let O;
      x > window.innerHeight ? O = window.innerHeight : x < w(100 - y) ? O = w(100 - y) : O = x, h && Z(a, `${O}px`, A), h || yt(
        O,
        a,
        m,
        y,
        S
      ) !== void 0 && (x = yt(
        O,
        a,
        m,
        y,
        S
      ));
    }
  }
  function ie(a, u, l, h, y, m) {
    window.innerWidth < s ? Ut(
      a,
      {
        onDrag: ({
          active: _,
          velocity: [, S],
          offset: x,
          distance: [, O],
          target: Lt,
          direction: ce
        }) => {
          J = q(l), ce[1] > 0 ? h && Lt === document.querySelector(`#${h}`) ? (r.style.overflow = "hidden", r.style.touchAction = "none", _t(
            l,
            0,
            null,
            _,
            u,
            S,
            x,
            O
          ), I >= window.innerHeight && X(K, y), I >= window.innerHeight && ut(P)) : r.scrollTop >= 1 && J <= w(100 - u) && (!h || Lt !== document.querySelector(`#${h}`)) ? st && (r.style.overflow = "scroll", r.style.touchAction = "auto", r.click()) : (r.style.overflow = "hidden", r.style.touchAction = "none", _t(
            r,
            0,
            null,
            _,
            u,
            S,
            x,
            O
          ), I >= window.innerHeight && X(K, y)) : q(r) <= w(100 - u) ? st && (r.click(), r.style.overflow = "scroll", w(100 - u) > 0 && (r.style.minHeight = "unset"), r.style.height = `${w(
            u
          )}px`, r.style.touchAction = "auto") : (r.style.overflow = "hidden", r.style.touchAction = "none", _t(
            r,
            null,
            1 / 0,
            _,
            u,
            S,
            x,
            O
          ), I >= window.innerHeight && X(K, y));
        },
        onDragStart: ({ direction: _ }) => {
          document.body.style.overflow = "hidden", H(_);
        },
        onDragEnd: ({ direction: _ }) => {
          J = q(r), (J <= w(100 - u) || I === 0) && _[1] < 0 && r.scrollTop >= 0 && st && (r.style.overflow = "scroll", r.click(), r.style.touchAction = "auto"), (J <= w(100 - u) || I === 0) && _[1] > 0 && r.scrollTop === 0 && (r.style.overflow = "hidden"), mt(_);
        }
      },
      {
        drag: {
          filterTaps: !1,
          rubberband: !0,
          axis: "y",
          preventDefault: !1,
          from: () => [0, q(r)]
        }
      }
    ) : m && Ut(
      m,
      {
        onDrag: ({ offset: _, direction: S }) => {
          let x;
          p === "sideSheetLeft" ? Math.round(
            _[0] / window.innerWidth * 100 + D
          ) < D && S[0] <= 0 && (x = "-105%") : 100 - Math.round(
            _[0] / window.innerWidth * 100 + (100 - D)
          ) < D && S[0] >= 0 && (x = "105%"), k({
            targets: r,
            width: `${p === "sideSheetLeft" ? Math.round(
              _[0] / window.innerWidth * 100 + D
            ) : 100 - Math.round(
              _[0] / window.innerWidth * 100 + (100 - D)
            )}%`,
            easing: "spring(1,250,20,25)",
            duration: 0,
            translateX: x
          });
        }
      },
      {
        drag: {
          axis: "x",
          bounds: {
            left: p === "sideSheetRight" ? -(Math.round(
              window.innerWidth * j / 100
            ) - Math.round(
              window.innerWidth * +r.style.width.replace("%", "") / 100
            )) : -window.innerWidth,
            right: p === "sideSheetLeft" ? Math.round(window.innerWidth * j / 100) - Math.round(
              window.innerWidth * +r.style.width.replace("%", "") / 100
            ) : window.innerWidth,
            top: -50,
            bottom: 50
          }
        }
      }
    );
  }
  function se(a, u, l, h) {
    return window.addEventListener("resize", () => (Ot(
      a,
      l,
      u,
      h
    ), window.innerWidth < s ? W = !1 : W = !0, W)), W;
  }
  function ne(a) {
    const u = lt(
      t[t.length - 1]
    ), l = document.createElement("div"), h = document.createElement("div"), y = document.createElement("div");
    te === "left" ? y.style.left = "0" : y.style.right = "0", y.id = "resizable";
    let m = "";
    r.style.display = "block", l.id = "modal-close", l.classList.add("close-modal"), l.addEventListener("click", () => It()), L === "left" ? h.id = "side-left" : h.id = "side-right", N && h.addEventListener("click", () => {
      rt();
    }), l.insertAdjacentHTML("afterbegin", f), h.children.length === 0 && h.insertAdjacentHTML("afterbegin", M), C && (typeof C == "string" ? (C = new DOMParser().parseFromString(
      C,
      "text/xml"
    ), m = C.childNodes[0].id, [C] = C.childNodes) : m = C == null ? void 0 : C.id, C.setAttribute("data-draggable", "1"), C.classList.add("draggable")), Ot(
      h,
      m,
      l,
      y
    ), W = se(
      h,
      l,
      m,
      y
    ), setTimeout(() => {
      n();
    }, 300), I && I < window.innerHeight && window.innerWidth < s ? X(K, a) : gt(a, g), st && (r.click(), r.style.overflow = "scroll", r.style.touchAction = "auto"), setTimeout(() => {
      ie(
        r,
        u,
        r,
        m,
        a,
        y
      );
    }, 400), document.querySelector(`.bottomsheet #${r.id}`) && (document.querySelector(
      `.bottomsheet #${r.id}`
    ).style.display = "block");
  }
  function re(a) {
    a.forEach((u, l) => {
      u === r.id && (k({
        targets: `#${a[l - 1]}`,
        scale: St + (1 - St) / window.innerHeight * q(r),
        easing: "linear",
        duration: 0.1
      }), l - 1 > 0 && q(document.getElementById(a[l])) ? a.slice(0, l - 1).forEach((h) => {
        k({
          targets: `#${h}`,
          top: "50px",
          easing: "linear",
          duration: 1
        });
      }) : a.slice(0, l - 1).forEach((h) => {
        k({
          targets: `#${h}`,
          easing: "linear",
          duration: 1
        });
      }));
    });
  }
  function oe(a) {
    const u = { attributes: !0, childList: !0 }, l = (y) => {
      y.forEach((m) => {
        m.type === "attributes" && window.innerWidth < s && Y && re(a);
      });
    };
    new MutationObserver(l).observe(r, u);
  }
  function ot() {
    document.body.style.overflowY = "contain", d && d(), R && !r ? (document.body.insertAdjacentHTML("beforeend", R), r = nt ? document.querySelector(`#${nt}`) : document.querySelector(
      `#${new DOMParser().parseFromString(R, "text/html").body.firstChild.id}`
    )) : R && !r.innerHTML && (r.innerHTML = new DOMParser().parseFromString(
      R,
      "text/html"
    ).body.firstChild.innerHTML);
    const a = JSON.parse(localStorage.getItem("array")) || [];
    (!a.length || a.length && (a == null ? void 0 : a.indexOf(r.id)) === -1 && r.id.length > 0) && (a == null || a.push(r.id), a.forEach((u) => {
    })), r && !document.getElementById(`#${r.id}`) && document.body.append(r), a.length > 1 && r === document.getElementById(
      a[a.length - 1]
    ) && t[t.length - 1].includes("100") && Y && (t[t.length - 1] = "95%"), oe(a), e && (P.classList.add("overlay"), Nt(P), document.body.appendChild(P), r && document.querySelector(".overlay") && document.body.insertBefore(P, r), pt && P.addEventListener("click", () => {
      X(a, W);
    })), document.querySelectorAll(`#${r == null ? void 0 : r.id}`).length < 2 ? ne(a) : gt(a, g);
  }
  g ? ot() : setTimeout(() => {
    c && document.querySelector(`#${c}`) && document.querySelectorAll(`#${c}`).forEach(
      (a) => a.addEventListener("click", () => {
        ot();
      })
    );
  }, 400);
  function ae() {
    document.getElementById(c).removeEventListener("click", () => {
      ot();
    });
  }
  return {
    close: X,
    init: ot,
    open: gt,
    destroy: ae
  };
}
export {
  Si as default
};
