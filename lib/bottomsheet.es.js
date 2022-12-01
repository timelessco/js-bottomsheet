import M from "animejs/lib/anime.es.js";
function re(i, t, e) {
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
function kt(i, t, e) {
  return t === 0 || Math.abs(t) === 1 / 0 ? Math.pow(i, e * 5) : i * t * e / (t + e * i);
}
function Dt(i, t, e, s = 0.15) {
  return s === 0 ? re(i, t, e) : i < t ? -kt(t - i, e - t, s) + t : i > e ? +kt(i - e, e - t, s) + e : i;
}
function oe(i, [t, e], [s, n]) {
  const [[o, c], [d, h]] = i;
  return [Dt(t, o, c, s), Dt(e, d, h, n)];
}
function x(i, t, e) {
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
      x(i, s, e[s]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(e)) : Mt(Object(e)).forEach(function(s) {
      Object.defineProperty(i, s, Object.getOwnPropertyDescriptor(e, s));
    });
  }
  return i;
}
const Gt = {
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
const ce = ["enter", "leave"];
function ae(i = !1, t) {
  return i && !ce.includes(t);
}
function le(i, t = "", e = !1) {
  const s = Gt[i], n = s && s[t] || t;
  return "on" + Pt(i) + Pt(n) + (ae(e, n) ? "Capture" : "");
}
const ue = ["gotpointercapture", "lostpointercapture"];
function fe(i) {
  let t = i.substring(2).toLowerCase();
  const e = !!~t.indexOf("passive");
  e && (t = t.replace("passive", ""));
  const s = ue.includes(t) ? "capturecapture" : "capture", n = !!~t.indexOf(s);
  return n && (t = t.replace("capture", "")), {
    device: t,
    capture: n,
    passive: e
  };
}
function de(i, t = "") {
  const e = Gt[i], s = e && e[t] || t;
  return i + s;
}
function lt(i) {
  return "touches" in i;
}
function Xt(i) {
  return lt(i) ? "touch" : "pointerType" in i ? i.pointerType : "mouse";
}
function he(i) {
  return Array.from(i.touches).filter((t) => {
    var e, s;
    return t.target === i.currentTarget || ((e = i.currentTarget) === null || e === void 0 || (s = e.contains) === null || s === void 0 ? void 0 : s.call(e, t.target));
  });
}
function pe(i) {
  return i.type === "touchend" || i.type === "touchcancel" ? i.changedTouches : i.targetTouches;
}
function Wt(i) {
  return lt(i) ? pe(i)[0] : i;
}
function _t(i, t) {
  const e = t.clientX - i.clientX, s = t.clientY - i.clientY, n = (t.clientX + i.clientX) / 2, o = (t.clientY + i.clientY) / 2, c = Math.hypot(e, s);
  return {
    angle: -(Math.atan2(e, s) * 180) / Math.PI,
    distance: c,
    origin: [n, o]
  };
}
function me(i) {
  return he(i).map((t) => t.identifier);
}
function St(i, t) {
  const [e, s] = Array.from(i.touches).filter((n) => t.includes(n.identifier));
  return _t(e, s);
}
function mt(i) {
  const t = Wt(i);
  return lt(i) ? t.identifier : t.pointerId;
}
function F(i) {
  const t = Wt(i);
  return [t.clientX, t.clientY];
}
const Ht = 40, $t = 800;
function zt(i) {
  let {
    deltaX: t,
    deltaY: e,
    deltaMode: s
  } = i;
  return s === 1 ? (t *= Ht, e *= Ht) : s === 2 && (t *= $t, e *= $t), [t, e];
}
function ge(i) {
  var t, e;
  const {
    scrollX: s,
    scrollY: n,
    scrollLeft: o,
    scrollTop: c
  } = i.currentTarget;
  return [(t = s != null ? s : o) !== null && t !== void 0 ? t : 0, (e = n != null ? n : c) !== null && e !== void 0 ? e : 0];
}
function _e(i) {
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
function ye() {
}
function ve(...i) {
  return i.length === 0 ? ye : i.length === 1 ? i[0] : function() {
    let t;
    for (const e of i)
      t = e.apply(this, arguments) || t;
    return t;
  };
}
function Rt(i, t) {
  return Object.assign({}, t, i || {});
}
const we = 32;
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
    if (t && (e.event = t, s.preventDefault && t.cancelable && e.event.preventDefault(), e.type = t.type, n.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size, n.locked = !!document.pointerLockElement, Object.assign(n, _e(t)), n.down = n.pressed = n.buttons % 2 === 1 || n.touches > 0, o = t.timeStamp - e.timeStamp, e.timeStamp = t.timeStamp, e.elapsedTime = e.timeStamp - e.startTime), e._active) {
      const R = e._delta.map(Math.abs);
      y.addTo(e._distance, R);
    }
    this.axisIntent && this.axisIntent(t);
    const [c, d] = e._movement, [h, g] = s.threshold, {
      _step: l,
      values: D
    } = e;
    if (s.hasCustomTransform ? (l[0] === !1 && (l[0] = Math.abs(c) >= h && D[0]), l[1] === !1 && (l[1] = Math.abs(d) >= g && D[1])) : (l[0] === !1 && (l[0] = Math.abs(c) >= h && Math.sign(c) * h), l[1] === !1 && (l[1] = Math.abs(d) >= g && Math.sign(d) * g)), e.intentional = l[0] !== !1 || l[1] !== !1, !e.intentional)
      return;
    const C = [0, 0];
    if (s.hasCustomTransform) {
      const [R, T] = D;
      C[0] = l[0] !== !1 ? R - l[0] : 0, C[1] = l[1] !== !1 ? T - l[1] : 0;
    } else
      C[0] = l[0] !== !1 ? c - l[0] : 0, C[1] = l[1] !== !1 ? d - l[1] : 0;
    this.restrictToAxis && !e._blocked && this.restrictToAxis(C);
    const q = e.offset, U = e._active && !e._blocked || e.active;
    U && (e.first = e._active && !e.active, e.last = !e._active && e.active, e.active = n[this.ingKey] = e._active, t && (e.first && ("bounds" in s && (e._bounds = at(s.bounds, e)), this.setup && this.setup()), e.movement = C, this.computeOffset()));
    const [j, $] = e.offset, [[S, B], [tt, et]] = e._bounds;
    e.overflow = [j < S ? -1 : j > B ? 1 : 0, $ < tt ? -1 : $ > et ? 1 : 0], e._movementBound[0] = e.overflow[0] ? e._movementBound[0] === !1 ? e._movement[0] : e._movementBound[0] : !1, e._movementBound[1] = e.overflow[1] ? e._movementBound[1] === !1 ? e._movement[1] : e._movementBound[1] : !1;
    const ut = e._active ? s.rubberband || [0, 0] : [0, 0];
    if (e.offset = oe(e._bounds, e.offset, ut), e.delta = y.sub(e.offset, q), this.computeMovement(), U && (!e.last || o > we)) {
      e.delta = y.sub(e.offset, q);
      const R = e.delta.map(Math.abs);
      y.addTo(e.distance, R), e.direction = e.delta.map(Math.sign), e._direction = e._delta.map(Math.sign), !e.first && o > 0 && (e.velocity = [R[0] / o, R[1] / o]);
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
function be([i, t], e) {
  const s = Math.abs(i), n = Math.abs(t);
  if (s > n && s > e)
    return "x";
  if (n > s && n > e)
    return "y";
}
class J extends Ft {
  constructor(...t) {
    super(...t), x(this, "aliasKey", "xy");
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
      const n = typeof s.axisThreshold == "object" ? s.axisThreshold[Xt(t)] : s.axisThreshold;
      e.axis = be(e._movement, n);
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
const Ee = (i) => i, Kt = 0.15, Zt = {
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
        return [Kt, Kt];
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
    return this.hasCustomTransform = !!s, s || Ee;
  },
  threshold(i) {
    return y.toVector(i, 0);
  }
}, Te = 0, Y = b(b({}, Zt), {}, {
  axis(i, t, {
    axis: e
  }) {
    if (this.lockDirection = e === "lock", !this.lockDirection)
      return e;
  },
  axisThreshold(i = Te) {
    return i;
  },
  bounds(i = {}) {
    if (typeof i == "function")
      return (o) => Y.bounds(i(o));
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
}), rt = 10, jt = {
  ArrowRight: (i = 1) => [rt * i, 0],
  ArrowLeft: (i = 1) => [-rt * i, 0],
  ArrowUp: (i = 1) => [0, -rt * i],
  ArrowDown: (i = 1) => [0, rt * i]
};
class xe extends J {
  constructor(...t) {
    super(...t), x(this, "ingKey", "dragging");
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
      t._bounds = Y.bounds(n);
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
    e.pointerCapture && t.target.setPointerCapture(t.pointerId), !(n && n.size > 1 && s._pointerActive) && (this.start(t), this.setupPointer(t), s._pointerId = mt(t), s._pointerActive = !0, this.computeValues(F(t)), this.computeInitial(), e.preventScrollAxis && Xt(t) !== "mouse" ? (s._active = !1, this.setupScrollPrevention(t)) : e.delay > 0 ? (this.setupDelayTrigger(t), e.triggerAllEvents && (this.compute(t), this.emit())) : this.startPointerDrag(t));
  }
  startPointerDrag(t) {
    const e = this.state;
    e._active = !0, e._preventScroll = !0, e._delayed = !1, this.compute(t), this.emit();
  }
  pointerMove(t) {
    const e = this.state, s = this.config;
    if (!e._pointerActive || e.type === t.type && t.timeStamp === e.timeStamp)
      return;
    const n = mt(t);
    if (e._pointerId !== void 0 && n !== e._pointerId)
      return;
    const o = F(t);
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
    const n = mt(t);
    if (e._pointerId !== void 0 && n !== e._pointerId)
      return;
    this.state._pointerActive = !1, this.setActive(), this.compute(t);
    const [o, c] = e._distance;
    if (e.tap = o <= s.tapsThreshold && c <= s.tapsThreshold, e.tap && s.filterTaps)
      e._force = !0;
    else {
      const [d, h] = e.direction, [g, l] = e.velocity, [D, C] = e.movement, [q, U] = s.swipe.velocity, [j, $] = s.swipe.distance, S = s.swipe.duration;
      e.elapsedTime < S && (Math.abs(g) > q && Math.abs(D) > j && (e.swipe[0] = d), Math.abs(l) > U && Math.abs(C) > $ && (e.swipe[1] = h));
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
    this.state._preventScroll = !1, Ae(t);
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
    const e = jt[t.key];
    if (e) {
      const s = this.state, n = t.shiftKey ? 10 : t.altKey ? 0.1 : 1;
      this.start(t), s._delta = e(n), s._keyboardActive = !0, y.addTo(s._movement, s._delta), this.compute(t), this.emit();
    }
  }
  keyUp(t) {
    t.key in jt && (this.state._keyboardActive = !1, this.setActive(), this.compute(t), this.emit());
  }
  bind(t) {
    const e = this.config.device;
    t(e, "start", this.pointerDown.bind(this)), this.config.pointerCapture && (t(e, "change", this.pointerMove.bind(this)), t(e, "end", this.pointerUp.bind(this)), t(e, "cancel", this.pointerUp.bind(this)), t("lostPointerCapture", "", this.pointerUp.bind(this))), this.config.keys && (t("key", "down", this.keyDown.bind(this)), t("key", "up", this.keyUp.bind(this))), this.config.filterTaps && t("click", "", this.pointerClick.bind(this), {
      capture: !0,
      passive: !1
    });
  }
}
function Ae(i) {
  "persist" in i && typeof i.persist == "function" && i.persist();
}
const Q = typeof window < "u" && window.document && window.document.createElement;
function Ie() {
  return Q && "ontouchstart" in window;
}
function Vt() {
  return Ie() || Q && window.navigator.maxTouchPoints > 1;
}
function Oe() {
  return Q && "onpointerdown" in window;
}
function Le() {
  return Q && "exitPointerLock" in window.document;
}
function Ce() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const P = {
  isBrowser: Q,
  gesture: Ce(),
  touch: Vt(),
  touchscreen: Vt(),
  pointer: Oe(),
  pointerLock: Le()
}, ke = 250, De = 180, Me = 0.5, Pe = 50, Se = 250, Yt = {
  mouse: 0,
  touch: 0,
  pen: 8
}, He = b(b({}, Y), {}, {
  device(i, t, {
    pointer: {
      touch: e = !1,
      lock: s = !1,
      mouse: n = !1
    } = {}
  }) {
    return this.pointerLock = s && P.pointerLock, P.touch && e ? "touch" : this.pointerLock ? "mouse" : P.pointer && !n ? "pointer" : P.touch ? "touch" : "mouse";
  },
  preventScrollAxis(i, t, {
    preventScroll: e
  }) {
    if (this.preventScrollDelay = typeof e == "number" ? e : e || e === void 0 && i ? ke : void 0, !(!P.touchscreen || e === !1))
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
    velocity: i = Me,
    distance: t = Pe,
    duration: e = Se
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
        return De;
      case !1:
        return 0;
      default:
        return i;
    }
  },
  axisThreshold(i) {
    return i ? b(b({}, Yt), i) : Yt;
  }
});
function Jt(i) {
  const [t, e] = i.overflow, [s, n] = i._delta, [o, c] = i._direction;
  (t < 0 && s > 0 && o < 0 || t > 0 && s < 0 && o > 0) && (i._movement[0] = i._movementBound[0]), (e < 0 && n > 0 && c < 0 || e > 0 && n < 0 && c > 0) && (i._movement[1] = i._movementBound[1]);
}
const $e = 30, Re = 100;
class Ke extends Ft {
  constructor(...t) {
    super(...t), x(this, "ingKey", "pinching"), x(this, "aliasKey", "da");
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
      const n = Math.abs(e) * $e - Math.abs(s);
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
    const n = St(t, e._touchIds);
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
    const o = _t(...Array.from(s.values()));
    this.pinchStart(t, o);
  }
  pinchStart(t, e) {
    const s = this.state;
    s.origin = e.origin, this.computeValues([e.distance, e.angle]), this.computeInitial(), this.compute(t), this.emit();
  }
  touchMove(t) {
    if (!this.state._active)
      return;
    const e = St(t, this.state._touchIds);
    this.pinchMove(t, e);
  }
  pointerMove(t) {
    const e = this.state._pointerEvents;
    if (e.has(t.pointerId) && e.set(t.pointerId, t), !this.state._active)
      return;
    const s = _t(...Array.from(e.values()));
    this.pinchMove(t, s);
  }
  pinchMove(t, e) {
    const s = this.state, n = s._values[1], o = e.angle - n;
    let c = 0;
    Math.abs(o) > 270 && (c += Math.sign(o)), this.computeValues([e.distance, e.angle - 360 * c]), s.origin = e.origin, s.turns = c, s._movement = [s._values[0] / s._initial[0] - 1, s._values[1] - s._initial[1]], this.compute(t), this.emit();
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
    e._movement = [t.scale - 1, t.rotation], e._delta = y.sub(e._movement, s), this.compute(t), this.emit();
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
    s._delta = [-zt(t)[1] / Re * s.offset[0], 0], y.addTo(s._movement, s._delta), Jt(s), this.state.origin = [t.clientX, t.clientY], this.compute(t), this.emit();
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
const je = b(b({}, Zt), {}, {
  device(i, t, {
    shared: e,
    pointer: {
      touch: s = !1
    } = {}
  }) {
    if (e.target && !P.touch && P.gesture)
      return "gesture";
    if (P.touch && s)
      return "touch";
    if (P.touchscreen) {
      if (P.pointer)
        return "pointer";
      if (P.touch)
        return "touch";
    }
  },
  bounds(i, t, {
    scaleBounds: e = {},
    angleBounds: s = {}
  }) {
    const n = (c) => {
      const d = Rt(at(e, c), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [d.min, d.max];
    }, o = (c) => {
      const d = Rt(at(s, c), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [d.min, d.max];
    };
    return typeof e != "function" && typeof s != "function" ? [n(), o()] : (c) => [n(c), o(c)];
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
class Ve extends J {
  constructor(...t) {
    super(...t), x(this, "ingKey", "moving");
  }
  move(t) {
    this.config.mouseOnly && t.pointerType !== "mouse" || (this.state._active ? this.moveChange(t) : this.moveStart(t), this.timeoutStore.add("moveEnd", this.moveEnd.bind(this)));
  }
  moveStart(t) {
    this.start(t), this.computeValues(F(t)), this.compute(t), this.computeInitial(), this.emit();
  }
  moveChange(t) {
    if (!this.state._active)
      return;
    const e = F(t), s = this.state;
    s._delta = y.sub(e, s._values), y.addTo(s._movement, s._delta), this.computeValues(e), this.compute(t), this.emit();
  }
  moveEnd(t) {
    !this.state._active || (this.state._active = !1, this.compute(t), this.emit());
  }
  bind(t) {
    t("pointer", "change", this.move.bind(this)), t("pointer", "leave", this.moveEnd.bind(this));
  }
}
const Ye = b(b({}, Y), {}, {
  mouseOnly: (i = !0) => i
});
class qe extends J {
  constructor(...t) {
    super(...t), x(this, "ingKey", "scrolling");
  }
  scroll(t) {
    this.state._active || this.start(t), this.scrollChange(t), this.timeoutStore.add("scrollEnd", this.scrollEnd.bind(this));
  }
  scrollChange(t) {
    t.cancelable && t.preventDefault();
    const e = this.state, s = ge(t);
    e._delta = y.sub(s, e._values), y.addTo(e._movement, e._delta), this.computeValues(s), this.compute(t), this.emit();
  }
  scrollEnd() {
    !this.state._active || (this.state._active = !1, this.compute(), this.emit());
  }
  bind(t) {
    t("scroll", "", this.scroll.bind(this));
  }
}
const Ue = Y;
class Ne extends J {
  constructor(...t) {
    super(...t), x(this, "ingKey", "wheeling");
  }
  wheel(t) {
    this.state._active || this.start(t), this.wheelChange(t), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(t) {
    const e = this.state;
    e._delta = zt(t), y.addTo(e._movement, e._delta), Jt(e), this.compute(t), this.emit();
  }
  wheelEnd() {
    !this.state._active || (this.state._active = !1, this.compute(), this.emit());
  }
  bind(t) {
    t("wheel", "", this.wheel.bind(this));
  }
}
const Ge = Y;
class Xe extends J {
  constructor(...t) {
    super(...t), x(this, "ingKey", "hovering");
  }
  enter(t) {
    this.config.mouseOnly && t.pointerType !== "mouse" || (this.start(t), this.computeValues(F(t)), this.compute(t), this.emit());
  }
  leave(t) {
    if (this.config.mouseOnly && t.pointerType !== "mouse")
      return;
    const e = this.state;
    if (!e._active)
      return;
    e._active = !1;
    const s = F(t);
    e._movement = e._delta = y.sub(s, e._values), this.computeValues(s), this.compute(t), e.delta = e.movement, this.emit();
  }
  bind(t) {
    t("pointer", "enter", this.enter.bind(this)), t("pointer", "leave", this.leave.bind(this));
  }
}
const We = b(b({}, Y), {}, {
  mouseOnly: (i = !0) => i
}), vt = /* @__PURE__ */ new Map(), yt = /* @__PURE__ */ new Map();
function ze(i) {
  vt.set(i.key, i.engine), yt.set(i.key, i.resolver);
}
const Fe = {
  key: "drag",
  engine: xe,
  resolver: He
}, Ze = {
  key: "hover",
  engine: Xe,
  resolver: We
}, Je = {
  key: "move",
  engine: Ve,
  resolver: Ye
}, Qe = {
  key: "pinch",
  engine: Ke,
  resolver: je
}, Be = {
  key: "scroll",
  engine: qe,
  resolver: Ue
}, ti = {
  key: "wheel",
  engine: Ne,
  resolver: Ge
};
function ei(i, t) {
  if (i == null)
    return {};
  var e = {}, s = Object.keys(i), n, o;
  for (o = 0; o < s.length; o++)
    n = s[o], !(t.indexOf(n) >= 0) && (e[n] = i[n]);
  return e;
}
function ii(i, t) {
  if (i == null)
    return {};
  var e = ei(i, t), s, n;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(i);
    for (n = 0; n < o.length; n++)
      s = o[n], !(t.indexOf(s) >= 0) && (!Object.prototype.propertyIsEnumerable.call(i, s) || (e[s] = i[s]));
  }
  return e;
}
const si = {
  target(i) {
    if (i)
      return () => "current" in i ? i.current : i;
  },
  enabled(i = !0) {
    return i;
  },
  window(i = P.isBrowser ? window : void 0) {
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
}, ni = ["target", "eventOptions", "window", "enabled", "transform"];
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
function ri(i, t, e = {}) {
  const s = i, {
    target: n,
    eventOptions: o,
    window: c,
    enabled: d,
    transform: h
  } = s, g = ii(s, ni);
  if (e.shared = ct({
    target: n,
    eventOptions: o,
    window: c,
    enabled: d,
    transform: h
  }, si), t) {
    const l = yt.get(t);
    e[t] = ct(b({
      shared: e.shared
    }, g), l);
  } else
    for (const l in g) {
      const D = yt.get(l);
      D && (e[l] = ct(b({
        shared: e.shared
      }, g[l]), D));
    }
  return e;
}
class Qt {
  constructor(t, e) {
    x(this, "_listeners", /* @__PURE__ */ new Set()), this._ctrl = t, this._gestureKey = e;
  }
  add(t, e, s, n, o) {
    const c = this._listeners, d = de(e, s), h = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}, g = b(b({}, h), o);
    t.addEventListener(d, n, g);
    const l = () => {
      t.removeEventListener(d, n, g), c.delete(l);
    };
    return c.add(l), l;
  }
  clean() {
    this._listeners.forEach((t) => t()), this._listeners.clear();
  }
}
class oi {
  constructor() {
    x(this, "_timeouts", /* @__PURE__ */ new Map());
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
class ci {
  constructor(t) {
    x(this, "gestures", /* @__PURE__ */ new Set()), x(this, "_targetEventStore", new Qt(this)), x(this, "gestureEventStores", {}), x(this, "gestureTimeoutStores", {}), x(this, "handlers", {}), x(this, "config", {}), x(this, "pointerIds", /* @__PURE__ */ new Set()), x(this, "touchIds", /* @__PURE__ */ new Set()), x(this, "state", {
      shared: {
        shiftKey: !1,
        metaKey: !1,
        ctrlKey: !1,
        altKey: !1
      }
    }), ai(this, t);
  }
  setEventIds(t) {
    if (lt(t))
      return this.touchIds = new Set(me(t)), this.touchIds;
    if ("pointerId" in t)
      return t.type === "pointerup" || t.type === "pointercancel" ? this.pointerIds.delete(t.pointerId) : t.type === "pointerdown" && this.pointerIds.add(t.pointerId), this.pointerIds;
  }
  applyHandlers(t, e) {
    this.handlers = t, this.nativeHandlers = e;
  }
  applyConfig(t, e) {
    this.config = ri(t, e, this.config);
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
          const d = this.config[c], h = qt(s, d.eventOptions, !!n);
          if (d.enabled) {
            const g = vt.get(c);
            new g(this, t, c).bind(h);
          }
        }
        const o = qt(s, e.eventOptions, !!n);
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
        s[o] = ve(...s[o]);
      if (!n)
        return s;
      for (const o in s) {
        const {
          device: c,
          capture: d,
          passive: h
        } = fe(o);
        this._targetEventStore.add(n, c, "", s[o], {
          capture: d,
          passive: h
        });
      }
    }
  }
}
function X(i, t) {
  i.gestures.add(t), i.gestureEventStores[t] = new Qt(i, t), i.gestureTimeoutStores[t] = new oi();
}
function ai(i, t) {
  t.drag && X(i, "drag"), t.wheel && X(i, "wheel"), t.scroll && X(i, "scroll"), t.move && X(i, "move"), t.pinch && X(i, "pinch"), t.hover && X(i, "hover");
}
const qt = (i, t, e) => (s, n, o, c = {}, d = !1) => {
  var h, g;
  const l = (h = c.capture) !== null && h !== void 0 ? h : t.capture, D = (g = c.passive) !== null && g !== void 0 ? g : t.passive;
  let C = d ? s : le(s, n, l);
  e && D && (C += "Passive"), i[C] = i[C] || [], i[C].push(o);
}, li = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function ui(i) {
  const t = {}, e = {}, s = /* @__PURE__ */ new Set();
  for (let n in i)
    li.test(n) ? (s.add(RegExp.lastMatch), e[n] = i[n]) : t[n] = i[n];
  return [e, t, s];
}
function W(i, t, e, s, n, o) {
  if (!i.has(e) || !vt.has(s))
    return;
  const c = e + "Start", d = e + "End", h = (g) => {
    let l;
    return g.first && c in t && t[c](g), e in t && (l = t[e](g)), g.last && d in t && t[d](g), l;
  };
  n[s] = h, o[s] = o[s] || {};
}
function fi(i, t) {
  const [e, s, n] = ui(i), o = {};
  return W(n, e, "onDrag", "drag", o, t), W(n, e, "onWheel", "wheel", o, t), W(n, e, "onScroll", "scroll", o, t), W(n, e, "onPinch", "pinch", o, t), W(n, e, "onMove", "move", o, t), W(n, e, "onHover", "hover", o, t), {
    handlers: o,
    config: t,
    nativeHandlers: s
  };
}
function di(i, t, e) {
  return t in i ? Object.defineProperty(i, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : i[t] = e, i;
}
function Ut(i, t) {
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
    t % 2 ? Ut(Object(e), !0).forEach(function(s) {
      di(i, s, e[s]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(e)) : Ut(Object(e)).forEach(function(s) {
      Object.defineProperty(i, s, Object.getOwnPropertyDescriptor(e, s));
    });
  }
  return i;
}
class hi {
  constructor(t, e, s, n, o) {
    this._target = t, this._gestureKey = n, this._ctrl = new ci(e), this._ctrl.applyHandlers(e, o), this._ctrl.applyConfig(ot(ot({}, s), {}, {
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
function pi(i) {
  return i.forEach(ze), function(t, e, s) {
    const {
      handlers: n,
      nativeHandlers: o,
      config: c
    } = fi(e, s || {});
    return new hi(t, n, c, void 0, o);
  };
}
const mi = function(t, e, s) {
  return pi([Fe, Qe, Be, ti, Je, Ze])(t, e, s || {});
};
function z(i) {
  M({
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
  i.classList.add("display"), M({
    targets: i,
    opacity: 1,
    easing: "spring(1, 85, 35, 3)",
    duration: 0
  });
}
function V(i, t, e, s) {
  M({
    targets: i,
    translateY: t,
    easing: e,
    duration: s
  });
}
function gt(i) {
  return typeof i == "string" ? +i.replace("%", "") : +i;
}
function K(i) {
  return typeof i == "string" ? v(+i.replace("%", "")) : +i;
}
function v(i) {
  return Math.round(window.innerHeight * i / 100);
}
function O(i) {
  return window.innerHeight - i;
}
function gi() {
  var i = navigator.userAgent || navigator.vendor || window.opera;
  return /windows phone/i.test(i) ? "Windows Phone" : /android/i.test(i) ? "Android" : /iPad|iPhone|iPod/.test(i) && !window.MSStream ? "iOS" : "unknown";
}
function vi(i) {
  var Ot;
  let {
    snapPoints: t = ["100%"],
    displayOverlay: e = !1,
    minWidthForModal: s = 700,
    draggableArea: n = "",
    onOpen: o = () => {
    },
    onClose: c = () => {
    },
    trigger: d = "",
    content: h = "",
    onInit: g = () => {
    },
    webLayout: l = "modal",
    openOnLoad: D = !1,
    modalCloseIcon: C = `<svg width="16" height="12" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33.112 36.9133C34.3649 38.15 36.3963 38.15 37.6492 36.9133C38.9022 35.6766 38.9022 33.6716 37.6492 32.435L24.0375 19L37.6492 5.56496C38.9022 4.3283 38.9022 2.32328 37.6492 1.08662C36.3963 -0.150042 34.3649 -0.150042 33.112 1.08662L19.5002 14.5216L5.88835 1.08655C4.63541 -0.150108 2.60401 -0.150107 1.35108 1.08655C0.0981471 2.32321 0.0981459 4.32824 1.35108 5.5649L14.9629 19L1.35108 32.435C0.0981434 33.6717 0.0981443 35.6767 1.35108 36.9134C2.60401 38.15 4.63541 38.15 5.88834 36.9134L19.5002 23.4783L33.112 36.9133Z" fill="white"/>
    </svg>
    `,
    sideSheetLeftIcon: q = `
    <svg width="16" height="14" viewBox="0 0 26 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.5046 40.8036C23.2926 42.0804 21.2623 42.1465 19.9698 40.9513L1.76653 24.118C0.474022 22.9228 0.408779 20.9188 1.62081 19.6421L18.6906 1.66043C19.9026 0.383653 21.9329 0.317552 23.2254 1.51279C24.5179 2.70802 24.5832 4.71199 23.3712 5.98876L8.49597 21.6586L24.3589 36.3277C25.6514 37.5229 25.7166 39.5269 24.5046 40.8036Z" fill="white"/>
    </svg> 
    `,
    sideSheetRightIcon: U = `<svg width="16" height="14" viewBox="0 0 25 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.21057 1.34418C2.46351 0.107522 4.49491 0.107522 5.74784 1.34418L23.3937 18.7608C24.6466 19.9975 24.6466 22.0025 23.3937 23.2392L5.74784 40.6559C4.49491 41.8925 2.46351 41.8925 1.21057 40.6559C-0.0423591 39.4192 -0.0423591 37.4142 1.21057 36.1775L16.5878 21L1.21057 5.82253C-0.0423591 4.58586 -0.0423591 2.58084 1.21057 1.34418Z" fill="white"/>
    </svg>   
    `,
    defaultSideSheetClose: j = !0,
    cleanUpOnClose: $ = !1,
    dismissible: S = !0,
    sideSheetSnapPoints: B = ["10%", "25%", "50%", "100%"],
    velocityThreshold: tt = 0.9,
    distanceThreshold: et = 150,
    closeOnOverlayClick: ut = !0,
    animateOnDrag: R = {}
  } = i, T;
  h = typeof h != "string" ? promise.resolve(h).then((r) => {
  }) : h;
  let it = d ? (Ot = document == null ? void 0 : document.querySelector(`#${d}`)) == null ? void 0 : Ot.getAttribute("data-bottomsheet-id") : "", a = it ? document == null ? void 0 : document.querySelector(`#${it}`) : "";
  const k = document.querySelector(`#${a == null ? void 0 : a.id}-overlay`) ? document.querySelector(`#${a == null ? void 0 : a.id}-overlay`) : document.createElement("div");
  k.id = `${a == null ? void 0 : a.id}-overlay`;
  let wt = "spring(1, 85, 45, 15)", bt = "spring(1, 85, 35, 5)";
  document.addEventListener("click", (r) => {
    setTimeout(() => {
      r.target.tagName.toLowerCase() === "input" && gi() === "Android" && V(a, "0px", G());
    }, 100);
  }), D ? st(D) : setTimeout(() => {
    d && document.querySelector(`#${d}`) && document.querySelectorAll(`#${d}`).forEach(
      (r) => r.addEventListener("click", () => {
        st(!1);
      })
    );
  }, 400);
  function st(r = !1) {
    document.body.style.overflowY = "contain", g && g(), h && !a ? (document.body.insertAdjacentHTML("beforeend", h), a = it ? document.querySelector(`#${it}`) : document.querySelector(
      `#${new DOMParser().parseFromString(h, "text/html").body.firstChild.id}`
    )) : h && !a.innerHTML && (a.innerHTML = new DOMParser().parseFromString(
      h,
      "text/html"
    ).body.firstChild.innerHTML), a && !document.getElementById(`#${a.id}`) && document.body.append(a), e && (k.classList.add("overlay"), Nt(k), document.body.appendChild(k), a && document.querySelector(".overlay") && document.body.insertBefore(k, a), ut && k.addEventListener("click", () => {
      N(f, S);
    }));
    let f = !(window.innerWidth < s);
    document.querySelectorAll(`#${a == null ? void 0 : a.id}`).length < 2 ? Bt(a, f, k, r) : ft(f, r);
  }
  function Bt(r, f, p, u) {
    let m = Z(r), L = gt(t[t.length - 1]), w = document.createElement("div"), A = document.createElement("div"), I = document.createElement("div"), _ = "";
    r.style.display = "block", w.id = "modal-close", w.classList.add("close-modal"), w.addEventListener(
      "click",
      () => Et(r, p)
    ), A.id = "side-left", j && A.addEventListener("click", () => {
      It(r, p);
    }), I.id = "side-right", j && I.addEventListener(
      "click",
      () => ht(r)
    ), w.insertAdjacentHTML("afterbegin", C), A.insertAdjacentHTML("afterbegin", q), I.insertAdjacentHTML("afterbegin", U), n && (typeof n == "string" ? (n = new DOMParser().parseFromString(
      n,
      "text/xml"
    ), _ = n.childNodes[0].id, n = n.childNodes[0]) : _ = n == null ? void 0 : n.id, n.setAttribute("data-draggable", "1"), n.classList.add("draggable")), Tt(
      r,
      A,
      I,
      f,
      _,
      p,
      w
    ), f = te(
      r,
      A,
      I,
      f,
      p,
      w,
      _
    ), setTimeout(() => {
      o();
    }, 300), T && T < window.innerHeight && window.innerWidth < s ? N(f, S) : ft(f, u), r.click(), r.style.overflow = "scroll", r.style.touchAction = "auto", setTimeout(() => {
      ee(
        r,
        m,
        L,
        r,
        _,
        p,
        f
      );
    }, 400), document.querySelector(`.bottomsheet #${r.id}`) && (document.querySelector(
      `.bottomsheet #${r.id}`
    ).style.display = "block");
  }
  function te(r, f, p, u, m, L, w) {
    return window.addEventListener("resize", () => (Tt(
      r,
      f,
      p,
      u,
      w,
      m,
      L
    ), window.innerWidth < s ? u = !1 : u = !0, u)), u;
  }
  function Et(r, f) {
    M({
      targets: r,
      opacity: 0,
      easing: wt,
      duration: 0.1,
      translateY: "-40%"
    }), setTimeout(() => {
      nt(r);
    }, 500), z(f);
  }
  function N(r = !1, f = !0, p = 7) {
    e && k && z(k), document.body.style.overflow = "scroll", r ? l === "modal" ? Et(a, k) : l === "sideSheetLeft" ? It(a, k) : ht(a) : M({
      targets: a,
      translateY: `${f ? v(100) : O(K(t[0]))}px`,
      easing: G(),
      duration: 1
    }), T = v(100), setTimeout(() => {
      T >= window.innerHeight && $ && nt(a);
    }, 500), z(k), c();
  }
  function Tt(r, f, p, u, m, L, w) {
    u ? (n && document.querySelector(`#${r.id} #${m}`) && r.removeChild(n), l === "modal" ? r.classList.add("modal") : r.classList.add("side-sheet"), r.classList.remove("bottomsheet"), !document.querySelector(`#${r.id} #modal-close`) && l === "modal" ? r.prepend(w) : !document.querySelector(`#${r.id} #side-left`) && l === "sideSheetLeft" ? r.prepend(f) : !document.querySelector(`#${r.id} #side-right`) && l === "sideSheetRight" && (r.prepend(p), ht(r))) : (m && !document.querySelector(`#${r == null ? void 0 : r.id} #${m}`) && r.prepend(n), document.querySelector(`#${r.id} #modal-close`) && r.removeChild(w), document.querySelector(`#${r.id} #side-left`) && r.removeChild(f), document.querySelector(`#${r.id} #side-right`) && r.removeChild(p), r.classList.add("bottomsheet"), r.classList.remove("modal"), r.classList.remove("side-sheet"));
  }
  function ft(r = !1, f = !1) {
    document.body.style.overflow = "hidden", e && Nt(k), r ? l === "sideSheetLeft" ? (a.style.top = 0, a.style.left = "-100%", setTimeout(() => {
      M({
        targets: a,
        left: "0",
        width: B[0],
        easing: bt,
        duration: 1
      });
    }, 100)) : l === "sideSheetRight" ? (a.style.top = 0, a.style.right = "-100%", setTimeout(() => {
      M({
        targets: a,
        right: "0",
        width: B[0],
        easing: bt,
        duration: 1
      });
    }, 100)) : (a.style.top = "50%", a.style.opacity = 0, a.style.transform = "translateX(-50%) translateY(-40%) rotateX(-20deg)", M({
      translateY: "-50%",
      targets: a,
      opacity: 1,
      rotateX: "1deg",
      easing: wt,
      duration: 0.1
    })) : f ? (a.style.opacity = 1, a.style.transform = `translateY(${O(
      K(t[0])
    )}px)`) : (M({
      targets: a,
      translateY: `${v(100)}px`,
      easing: "linear",
      duration: 1
    }), setTimeout(() => {
      M({
        targets: a,
        translateY: `${O(K(t[0]))}px`,
        easing: "spring(1, 85, 15, 3)",
        opacity: 1,
        duration: 1
      });
    }, 60)), T = O(K(t[0]));
  }
  function ee(r, f, p, u, m, L, w) {
    new mi(
      r,
      {
        onDrag: ({
          active: A,
          velocity: [I, _],
          offset: E,
          distance: [H, pt],
          target: Lt,
          direction: se
        }) => {
          let Ct = 0, ne = 1 / 0;
          f = Z(u), window.innerWidth < s && (se[1] > 0 ? m && Lt === document.querySelector(`#${m}`) ? (u.style.overflow = "hidden", u.style.touchAction = "none", dt(
            u,
            Ct,
            null,
            A,
            p,
            _,
            E,
            pt,
            L
          ), T >= window.innerHeight && N(w, S, _), T >= window.innerHeight && z(L)) : u.scrollTop >= 1 && f <= v(100 - p) && (!m || Lt !== document.querySelector(`#${m}`)) ? (u.style.overflow = "scroll", u.style.touchAction = "auto", u.click()) : (u.style.overflow = "hidden", u.style.touchAction = "none", dt(
            u,
            Ct,
            null,
            A,
            p,
            _,
            E,
            pt,
            L
          ), T >= window.innerHeight && N(w, S, _)) : Z(a) <= v(100 - p) ? (u.click(), u.style.overflow = "scroll", v(100 - p) > 0 && (u.style.minHeight = "unset"), u.style.height = `${v(p)}px`, u.style.touchAction = "auto") : (u.style.overflow = "hidden", u.style.touchAction = "none", dt(
            u,
            null,
            ne,
            A,
            p,
            _,
            E,
            pt,
            L
          ), T >= window.innerHeight && N(w, S, _)));
        },
        onDragStart: () => {
          document.body.style.overflow = "hidden";
        },
        onDragEnd: ({ direction: A }) => {
          f = Z(u), (f <= v(100 - p) || T === 0) && A[1] < 0 && a.scrollTop >= 0 && (u.style.overflow = "scroll", u.click(), u.style.touchAction = "auto"), (f <= v(100 - p) || T === 0) && A[1] > 0 && a.scrollTop === 0 && (u.style.overflow = "hidden");
        }
      },
      {
        drag: {
          filterTaps: !1,
          rubberband: !0,
          axis: "y",
          preventDefault: !1,
          from: () => [0, Z(u)]
        }
      }
    );
  }
  function dt(r, f, p, u, m, L, w, A, I, _) {
    let E = w[1];
    if (p === null) {
      let H = function() {
        return At(
          E > window.innerHeight ? window.innerHeight : E < v(100 - m) ? v(100 - m) : E,
          r,
          L,
          m,
          A,
          !1,
          I,
          S
        );
      };
      u && V(
        r,
        `${E > window.innerHeight ? window.innerHeight : E < v(100 - m) ? v(100 - m) : E}px`,
        "spring(1, 250, 25, 25)"
      ), u || H() !== void 0 && (w[1] = H());
    } else {
      let H = function() {
        return xt(
          E > window.innerHeight ? window.innerHeight : E < v(100 - m) ? v(100 - m) : E,
          r,
          L,
          m,
          A,
          !1,
          I
        );
      };
      u && V(
        r,
        `${E > window.innerHeight ? window.innerHeight : E < v(100 - m) ? v(100 - m) : E}px`,
        "spring(1, 250, 25, 25)"
      ), u || H() !== void 0 && (w[1] = H());
    }
  }
  function Z(r) {
    var f;
    return +((f = r == null ? void 0 : r.style) == null ? void 0 : f.transform.slice(11).replace("px)", ""));
  }
  function xt(r, f, p, u, m, L, w, A) {
    let I = 1 / 0;
    if (t.forEach((_) => {
      let E = gt(_);
      v(E) > O(r) && v(E) < I && (I = v(E));
    }), I !== 1 / 0)
      return L ? (V(
        f,
        `${O(I)}px`,
        G()
      ), T = O(I), T) : p > tt || m < et ? (V(
        f,
        `${O(I)}px`,
        G()
      ), T = O(I), T) : At(
        r,
        f,
        p,
        u,
        m,
        !0,
        w,
        S
      );
  }
  function At(r, f, p, u, m, L, w, A, I) {
    let _ = 0;
    return t.forEach((E) => {
      let H = gt(E);
      v(H) < O(r) && v(H) > _ && (_ = v(H));
    }), L ? (V(
      f,
      `${A ? O(_) : _ <= K(t[0]) ? O(K(t[0])) : O(_)}px`,
      G()
    ), T = O(_), T) : p > tt || m > et ? (V(
      f,
      `${A ? O(_) : _ <= K(t[0]) ? O(K(t[0])) : O(_)}px`,
      G()
    ), T = O(_), T) : xt(
      r,
      f,
      p,
      u,
      m,
      !0,
      w
    );
  }
  function It(r, f) {
    M({
      targets: r,
      width: 0,
      easing: "spring(1, 85, 45, 3)",
      duration: 0
    }), setTimeout(() => {
      $ && nt(r);
    }, 400), z(f);
  }
  function ht(r) {
    M({
      targets: r,
      width: 0,
      easing: "spring(1, 85, 45, 3)",
      duration: 0
    }), setTimeout(() => {
      $ && nt(r);
    }, 400), z(k);
  }
  function nt(r) {
    r.remove();
  }
  function G() {
    return "spring(1, 95, 25, 13)";
  }
  function ie() {
    document.getElementById(d).removeEventListener("click", () => {
      st(!1);
    });
  }
  return {
    close: N,
    init: st,
    open: ft,
    destroy: ie
  };
}
export {
  vi as default
};
