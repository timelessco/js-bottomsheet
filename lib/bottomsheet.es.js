import M from "animejs/lib/anime.es.js";
function at(i, e, t) {
  return Math.max(e, Math.min(i, t));
}
const v = {
  toVector(i, e) {
    return i === void 0 && (i = e), Array.isArray(i) ? i : [i, i];
  },
  add(i, e) {
    return [i[0] + e[0], i[1] + e[1]];
  },
  sub(i, e) {
    return [i[0] - e[0], i[1] - e[1]];
  },
  addTo(i, e) {
    i[0] += e[0], i[1] += e[1];
  },
  subTo(i, e) {
    i[0] -= e[0], i[1] -= e[1];
  }
};
function ke(i, e, t) {
  return e === 0 || Math.abs(e) === 1 / 0 ? Math.pow(i, t * 5) : i * e * t / (e + t * i);
}
function Me(i, e, t, s = 0.15) {
  return s === 0 ? at(i, e, t) : i < e ? -ke(e - i, t - e, s) + e : i > t ? +ke(i - t, t - e, s) + t : i;
}
function ct(i, [e, t], [s, n]) {
  const [[o, a], [f, h]] = i;
  return [Me(e, o, a, s), Me(t, f, h, n)];
}
function O(i, e, t) {
  return e in i ? Object.defineProperty(i, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : i[e] = t, i;
}
function Pe(i, e) {
  var t = Object.keys(i);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(i);
    e && (s = s.filter(function(n) {
      return Object.getOwnPropertyDescriptor(i, n).enumerable;
    })), t.push.apply(t, s);
  }
  return t;
}
function b(i) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Pe(Object(t), !0).forEach(function(s) {
      O(i, s, t[s]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(t)) : Pe(Object(t)).forEach(function(s) {
      Object.defineProperty(i, s, Object.getOwnPropertyDescriptor(t, s));
    });
  }
  return i;
}
const We = {
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
function Se(i) {
  return i ? i[0].toUpperCase() + i.slice(1) : "";
}
const lt = ["enter", "leave"];
function ut(i = !1, e) {
  return i && !lt.includes(e);
}
function dt(i, e = "", t = !1) {
  const s = We[i], n = s && s[e] || e;
  return "on" + Se(i) + Se(n) + (ut(t, n) ? "Capture" : "");
}
const ft = ["gotpointercapture", "lostpointercapture"];
function ht(i) {
  let e = i.substring(2).toLowerCase();
  const t = !!~e.indexOf("passive");
  t && (e = e.replace("passive", ""));
  const s = ft.includes(e) ? "capturecapture" : "capture", n = !!~e.indexOf(s);
  return n && (e = e.replace("capture", "")), {
    device: e,
    capture: n,
    passive: t
  };
}
function pt(i, e = "") {
  const t = We[i], s = t && t[e] || e;
  return i + s;
}
function le(i) {
  return "touches" in i;
}
function ze(i) {
  return le(i) ? "touch" : "pointerType" in i ? i.pointerType : "mouse";
}
function mt(i) {
  return Array.from(i.touches).filter((e) => {
    var t, s;
    return e.target === i.currentTarget || ((t = i.currentTarget) === null || t === void 0 || (s = t.contains) === null || s === void 0 ? void 0 : s.call(t, e.target));
  });
}
function gt(i) {
  return i.type === "touchend" || i.type === "touchcancel" ? i.changedTouches : i.targetTouches;
}
function Fe(i) {
  return le(i) ? gt(i)[0] : i;
}
function ye(i, e) {
  const t = e.clientX - i.clientX, s = e.clientY - i.clientY, n = (e.clientX + i.clientX) / 2, o = (e.clientY + i.clientY) / 2, a = Math.hypot(t, s);
  return {
    angle: -(Math.atan2(t, s) * 180) / Math.PI,
    distance: a,
    origin: [n, o]
  };
}
function yt(i) {
  return mt(i).map((e) => e.identifier);
}
function Ne(i, e) {
  const [t, s] = Array.from(i.touches).filter((n) => e.includes(n.identifier));
  return ye(t, s);
}
function me(i) {
  const e = Fe(i);
  return le(i) ? e.identifier : e.pointerId;
}
function F(i) {
  const e = Fe(i);
  return [e.clientX, e.clientY];
}
const $e = 40, He = 800;
function Ze(i) {
  let {
    deltaX: e,
    deltaY: t,
    deltaMode: s
  } = i;
  return s === 1 ? (e *= $e, t *= $e) : s === 2 && (e *= He, t *= He), [e, t];
}
function vt(i) {
  var e, t;
  const {
    scrollX: s,
    scrollY: n,
    scrollLeft: o,
    scrollTop: a
  } = i.currentTarget;
  return [(e = s != null ? s : o) !== null && e !== void 0 ? e : 0, (t = n != null ? n : a) !== null && t !== void 0 ? t : 0];
}
function _t(i) {
  const e = {};
  if ("buttons" in i && (e.buttons = i.buttons), "shiftKey" in i) {
    const {
      shiftKey: t,
      altKey: s,
      metaKey: n,
      ctrlKey: o
    } = i;
    Object.assign(e, {
      shiftKey: t,
      altKey: s,
      metaKey: n,
      ctrlKey: o
    });
  }
  return e;
}
function ce(i, ...e) {
  return typeof i == "function" ? i(...e) : i;
}
function wt() {
}
function bt(...i) {
  return i.length === 0 ? wt : i.length === 1 ? i[0] : function() {
    let e;
    for (const t of i)
      e = t.apply(this, arguments) || e;
    return e;
  };
}
function Ve(i, e) {
  return Object.assign({}, e, i || {});
}
const Et = 32;
class Je {
  constructor(e, t, s) {
    this.ctrl = e, this.args = t, this.key = s, this.state || (this.state = {}, this.computeValues([0, 0]), this.computeInitial(), this.init && this.init(), this.reset());
  }
  get state() {
    return this.ctrl.state[this.key];
  }
  set state(e) {
    this.ctrl.state[this.key] = e;
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
      state: e,
      shared: t,
      ingKey: s,
      args: n
    } = this;
    t[s] = e._active = e.active = e._blocked = e._force = !1, e._step = [!1, !1], e.intentional = !1, e._movement = [0, 0], e._distance = [0, 0], e._direction = [0, 0], e._delta = [0, 0], e._bounds = [[-1 / 0, 1 / 0], [-1 / 0, 1 / 0]], e.args = n, e.axis = void 0, e.memo = void 0, e.elapsedTime = 0, e.direction = [0, 0], e.distance = [0, 0], e.overflow = [0, 0], e._movementBound = [!1, !1], e.velocity = [0, 0], e.movement = [0, 0], e.delta = [0, 0], e.timeStamp = 0;
  }
  start(e) {
    const t = this.state, s = this.config;
    t._active || (this.reset(), this.computeInitial(), t._active = !0, t.target = e.target, t.currentTarget = e.currentTarget, t.lastOffset = s.from ? ce(s.from, t) : t.offset, t.offset = t.lastOffset), t.startTime = t.timeStamp = e.timeStamp;
  }
  computeValues(e) {
    const t = this.state;
    t._values = e, t.values = this.config.transform(e);
  }
  computeInitial() {
    const e = this.state;
    e._initial = e._values, e.initial = e.values;
  }
  compute(e) {
    const {
      state: t,
      config: s,
      shared: n
    } = this;
    t.args = this.args;
    let o = 0;
    if (e && (t.event = e, s.preventDefault && e.cancelable && t.event.preventDefault(), t.type = e.type, n.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size, n.locked = !!document.pointerLockElement, Object.assign(n, _t(e)), n.down = n.pressed = n.buttons % 2 === 1 || n.touches > 0, o = e.timeStamp - t.timeStamp, t.timeStamp = e.timeStamp, t.elapsedTime = t.timeStamp - t.startTime), t._active) {
      const H = t._delta.map(Math.abs);
      v.addTo(t._distance, H);
    }
    this.axisIntent && this.axisIntent(e);
    const [a, f] = t._movement, [h, g] = s.threshold, {
      _step: c,
      values: k
    } = t;
    if (s.hasCustomTransform ? (c[0] === !1 && (c[0] = Math.abs(a) >= h && k[0]), c[1] === !1 && (c[1] = Math.abs(f) >= g && k[1])) : (c[0] === !1 && (c[0] = Math.abs(a) >= h && Math.sign(a) * h), c[1] === !1 && (c[1] = Math.abs(f) >= g && Math.sign(f) * g)), t.intentional = c[0] !== !1 || c[1] !== !1, !t.intentional)
      return;
    const C = [0, 0];
    if (s.hasCustomTransform) {
      const [H, T] = k;
      C[0] = c[0] !== !1 ? H - c[0] : 0, C[1] = c[1] !== !1 ? T - c[1] : 0;
    } else
      C[0] = c[0] !== !1 ? a - c[0] : 0, C[1] = c[1] !== !1 ? f - c[1] : 0;
    this.restrictToAxis && !t._blocked && this.restrictToAxis(C);
    const Y = t.offset, U = t._active && !t._blocked || t.active;
    U && (t.first = t._active && !t.active, t.last = !t._active && t.active, t.active = n[this.ingKey] = t._active, e && (t.first && ("bounds" in s && (t._bounds = ce(s.bounds, t)), this.setup && this.setup()), t.movement = C, this.computeOffset()));
    const [R, $] = t.offset, [[S, B], [ee, te]] = t._bounds;
    t.overflow = [R < S ? -1 : R > B ? 1 : 0, $ < ee ? -1 : $ > te ? 1 : 0], t._movementBound[0] = t.overflow[0] ? t._movementBound[0] === !1 ? t._movement[0] : t._movementBound[0] : !1, t._movementBound[1] = t.overflow[1] ? t._movementBound[1] === !1 ? t._movement[1] : t._movementBound[1] : !1;
    const ue = t._active ? s.rubberband || [0, 0] : [0, 0];
    if (t.offset = ct(t._bounds, t.offset, ue), t.delta = v.sub(t.offset, Y), this.computeMovement(), U && (!t.last || o > Et)) {
      t.delta = v.sub(t.offset, Y);
      const H = t.delta.map(Math.abs);
      v.addTo(t.distance, H), t.direction = t.delta.map(Math.sign), t._direction = t._delta.map(Math.sign), !t.first && o > 0 && (t.velocity = [H[0] / o, H[1] / o]);
    }
  }
  emit() {
    const e = this.state, t = this.shared, s = this.config;
    if (e._active || this.clean(), (e._blocked || !e.intentional) && !e._force && !s.triggerAllEvents)
      return;
    const n = this.handler(b(b(b({}, t), e), {}, {
      [this.aliasKey]: e.values
    }));
    n !== void 0 && (e.memo = n);
  }
  clean() {
    this.eventStore.clean(), this.timeoutStore.clean();
  }
}
function Tt([i, e], t) {
  const s = Math.abs(i), n = Math.abs(e);
  if (s > n && s > t)
    return "x";
  if (n > s && n > t)
    return "y";
}
class J extends Je {
  constructor(...e) {
    super(...e), O(this, "aliasKey", "xy");
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
  axisIntent(e) {
    const t = this.state, s = this.config;
    if (!t.axis && e) {
      const n = typeof s.axisThreshold == "object" ? s.axisThreshold[ze(e)] : s.axisThreshold;
      t.axis = Tt(t._movement, n);
    }
    t._blocked = (s.lockDirection || !!s.axis) && !t.axis || !!s.axis && s.axis !== t.axis;
  }
  restrictToAxis(e) {
    if (this.config.axis || this.config.lockDirection)
      switch (this.state.axis) {
        case "x":
          e[1] = 0;
          break;
        case "y":
          e[0] = 0;
          break;
      }
  }
}
const Re = (i) => i, je = 0.15, _e = {
  enabled(i = !0) {
    return i;
  },
  eventOptions(i, e, t) {
    return b(b({}, t.shared.eventOptions), i);
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
        return [je, je];
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
  transform(i, e, t) {
    const s = i || t.shared.transform;
    if (this.hasCustomTransform = !!s, process.env.NODE_ENV === "development") {
      const n = s || Re;
      return (o) => {
        const a = n(o);
        return (!isFinite(a[0]) || !isFinite(a[1])) && console.warn(`[@use-gesture]: config.transform() must produce a valid result, but it was: [${a[0]},${[1]}]`), a;
      };
    }
    return s || Re;
  },
  threshold(i) {
    return v.toVector(i, 0);
  }
};
process.env.NODE_ENV === "development" && Object.assign(_e, {
  domTarget(i) {
    if (i !== void 0)
      throw Error("[@use-gesture]: `domTarget` option has been renamed to `target`.");
    return NaN;
  },
  lockDirection(i) {
    if (i !== void 0)
      throw Error("[@use-gesture]: `lockDirection` option has been merged with `axis`. Use it as in `{ axis: 'lock' }`");
    return NaN;
  },
  initial(i) {
    if (i !== void 0)
      throw Error("[@use-gesture]: `initial` option has been renamed to `from`.");
    return NaN;
  }
});
const Ot = 0, K = b(b({}, _e), {}, {
  axis(i, e, {
    axis: t
  }) {
    if (this.lockDirection = t === "lock", !this.lockDirection)
      return t;
  },
  axisThreshold(i = Ot) {
    return i;
  },
  bounds(i = {}) {
    if (typeof i == "function")
      return (o) => K.bounds(i(o));
    if ("current" in i)
      return () => i.current;
    if (typeof HTMLElement == "function" && i instanceof HTMLElement)
      return i;
    const {
      left: e = -1 / 0,
      right: t = 1 / 0,
      top: s = -1 / 0,
      bottom: n = 1 / 0
    } = i;
    return [[e, t], [s, n]];
  }
}), re = 10, Ke = {
  ArrowRight: (i = 1) => [re * i, 0],
  ArrowLeft: (i = 1) => [-re * i, 0],
  ArrowUp: (i = 1) => [0, -re * i],
  ArrowDown: (i = 1) => [0, re * i]
};
class xt extends J {
  constructor(...e) {
    super(...e), O(this, "ingKey", "dragging");
  }
  reset() {
    super.reset();
    const e = this.state;
    e._pointerId = void 0, e._pointerActive = !1, e._keyboardActive = !1, e._preventScroll = !1, e._delayed = !1, e.swipe = [0, 0], e.tap = !1, e.canceled = !1, e.cancel = this.cancel.bind(this);
  }
  setup() {
    const e = this.state;
    if (e._bounds instanceof HTMLElement) {
      const t = e._bounds.getBoundingClientRect(), s = e.currentTarget.getBoundingClientRect(), n = {
        left: t.left - s.left + e.offset[0],
        right: t.right - s.right + e.offset[0],
        top: t.top - s.top + e.offset[1],
        bottom: t.bottom - s.bottom + e.offset[1]
      };
      e._bounds = K.bounds(n);
    }
  }
  cancel() {
    const e = this.state;
    e.canceled || (e.canceled = !0, e._active = !1, setTimeout(() => {
      this.compute(), this.emit();
    }, 0));
  }
  setActive() {
    this.state._active = this.state._pointerActive || this.state._keyboardActive;
  }
  clean() {
    this.pointerClean(), this.state._pointerActive = !1, this.state._keyboardActive = !1, super.clean();
  }
  pointerDown(e) {
    const t = this.config, s = this.state;
    if (e.buttons != null && (Array.isArray(t.pointerButtons) ? !t.pointerButtons.includes(e.buttons) : t.pointerButtons !== -1 && t.pointerButtons !== e.buttons))
      return;
    const n = this.ctrl.setEventIds(e);
    t.pointerCapture && e.target.setPointerCapture(e.pointerId), !(n && n.size > 1 && s._pointerActive) && (this.start(e), this.setupPointer(e), s._pointerId = me(e), s._pointerActive = !0, this.computeValues(F(e)), this.computeInitial(), t.preventScrollAxis && ze(e) !== "mouse" ? (s._active = !1, this.setupScrollPrevention(e)) : t.delay > 0 ? (this.setupDelayTrigger(e), t.triggerAllEvents && (this.compute(e), this.emit())) : this.startPointerDrag(e));
  }
  startPointerDrag(e) {
    const t = this.state;
    t._active = !0, t._preventScroll = !0, t._delayed = !1, this.compute(e), this.emit();
  }
  pointerMove(e) {
    const t = this.state, s = this.config;
    if (!t._pointerActive || t.type === e.type && e.timeStamp === t.timeStamp)
      return;
    const n = me(e);
    if (t._pointerId !== void 0 && n !== t._pointerId)
      return;
    const o = F(e);
    if (document.pointerLockElement === e.target ? t._delta = [e.movementX, e.movementY] : (t._delta = v.sub(o, t._values), this.computeValues(o)), v.addTo(t._movement, t._delta), this.compute(e), t._delayed && t.intentional) {
      this.timeoutStore.remove("dragDelay"), t.active = !1, this.startPointerDrag(e);
      return;
    }
    if (s.preventScrollAxis && !t._preventScroll)
      if (t.axis)
        if (t.axis === s.preventScrollAxis || s.preventScrollAxis === "xy") {
          t._active = !1, this.clean();
          return;
        } else {
          this.timeoutStore.remove("startPointerDrag"), this.startPointerDrag(e);
          return;
        }
      else
        return;
    this.emit();
  }
  pointerUp(e) {
    this.ctrl.setEventIds(e);
    try {
      this.config.pointerCapture && e.target.hasPointerCapture(e.pointerId) && e.target.releasePointerCapture(e.pointerId);
    } catch {
      process.env.NODE_ENV === "development" && console.warn("[@use-gesture]: If you see this message, it's likely that you're using an outdated version of `@react-three/fiber`. \n\nPlease upgrade to the latest version.");
    }
    const t = this.state, s = this.config;
    if (!t._active || !t._pointerActive)
      return;
    const n = me(e);
    if (t._pointerId !== void 0 && n !== t._pointerId)
      return;
    this.state._pointerActive = !1, this.setActive(), this.compute(e);
    const [o, a] = t._distance;
    if (t.tap = o <= s.tapsThreshold && a <= s.tapsThreshold, t.tap && s.filterTaps)
      t._force = !0;
    else {
      const [f, h] = t.direction, [g, c] = t.velocity, [k, C] = t.movement, [Y, U] = s.swipe.velocity, [R, $] = s.swipe.distance, S = s.swipe.duration;
      t.elapsedTime < S && (Math.abs(g) > Y && Math.abs(k) > R && (t.swipe[0] = f), Math.abs(c) > U && Math.abs(C) > $ && (t.swipe[1] = h));
    }
    this.emit();
  }
  pointerClick(e) {
    !this.state.tap && e.detail > 0 && (e.preventDefault(), e.stopPropagation());
  }
  setupPointer(e) {
    const t = this.config, s = t.device;
    if (process.env.NODE_ENV === "development")
      try {
        if (s === "pointer" && t.preventScrollDelay === void 0) {
          const n = "uv" in e ? e.sourceEvent.currentTarget : e.currentTarget;
          window.getComputedStyle(n).touchAction === "auto" && console.warn("[@use-gesture]: The drag target has its `touch-action` style property set to `auto`. It is recommended to add `touch-action: 'none'` so that the drag gesture behaves correctly on touch-enabled devices. For more information read this: https://use-gesture.netlify.app/docs/extras/#touch-action.\n\nThis message will only show in development mode. It won't appear in production. If this is intended, you can ignore it.", n);
        }
      } catch {
      }
    t.pointerLock && e.currentTarget.requestPointerLock(), t.pointerCapture || (this.eventStore.add(this.sharedConfig.window, s, "change", this.pointerMove.bind(this)), this.eventStore.add(this.sharedConfig.window, s, "end", this.pointerUp.bind(this)), this.eventStore.add(this.sharedConfig.window, s, "cancel", this.pointerUp.bind(this)));
  }
  pointerClean() {
    this.config.pointerLock && document.pointerLockElement === this.state.currentTarget && document.exitPointerLock();
  }
  preventScroll(e) {
    this.state._preventScroll && e.cancelable && e.preventDefault();
  }
  setupScrollPrevention(e) {
    this.state._preventScroll = !1, It(e);
    const t = this.eventStore.add(this.sharedConfig.window, "touch", "change", this.preventScroll.bind(this), {
      passive: !1
    });
    this.eventStore.add(this.sharedConfig.window, "touch", "end", t), this.eventStore.add(this.sharedConfig.window, "touch", "cancel", t), this.timeoutStore.add("startPointerDrag", this.startPointerDrag.bind(this), this.config.preventScrollDelay, e);
  }
  setupDelayTrigger(e) {
    this.state._delayed = !0, this.timeoutStore.add("dragDelay", () => {
      this.state._step = [0, 0], this.startPointerDrag(e);
    }, this.config.delay);
  }
  keyDown(e) {
    const t = Ke[e.key];
    if (t) {
      const s = this.state, n = e.shiftKey ? 10 : e.altKey ? 0.1 : 1;
      this.start(e), s._delta = t(n), s._keyboardActive = !0, v.addTo(s._movement, s._delta), this.compute(e), this.emit();
    }
  }
  keyUp(e) {
    e.key in Ke && (this.state._keyboardActive = !1, this.setActive(), this.compute(e), this.emit());
  }
  bind(e) {
    const t = this.config.device;
    e(t, "start", this.pointerDown.bind(this)), this.config.pointerCapture && (e(t, "change", this.pointerMove.bind(this)), e(t, "end", this.pointerUp.bind(this)), e(t, "cancel", this.pointerUp.bind(this)), e("lostPointerCapture", "", this.pointerUp.bind(this))), this.config.keys && (e("key", "down", this.keyDown.bind(this)), e("key", "up", this.keyUp.bind(this))), this.config.filterTaps && e("click", "", this.pointerClick.bind(this), {
      capture: !0,
      passive: !1
    });
  }
}
function It(i) {
  "persist" in i && typeof i.persist == "function" && i.persist();
}
const Q = typeof window < "u" && window.document && window.document.createElement;
function At() {
  return Q && "ontouchstart" in window;
}
function Ye() {
  return At() || Q && window.navigator.maxTouchPoints > 1;
}
function Dt() {
  return Q && "onpointerdown" in window;
}
function Ct() {
  return Q && "exitPointerLock" in window.document;
}
function Lt() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const P = {
  isBrowser: Q,
  gesture: Lt(),
  touch: Ye(),
  touchscreen: Ye(),
  pointer: Dt(),
  pointerLock: Ct()
}, kt = 250, Mt = 180, Pt = 0.5, St = 50, Nt = 250, Ue = {
  mouse: 0,
  touch: 0,
  pen: 8
}, Qe = b(b({}, K), {}, {
  device(i, e, {
    pointer: {
      touch: t = !1,
      lock: s = !1,
      mouse: n = !1
    } = {}
  }) {
    return this.pointerLock = s && P.pointerLock, P.touch && t ? "touch" : this.pointerLock ? "mouse" : P.pointer && !n ? "pointer" : P.touch ? "touch" : "mouse";
  },
  preventScrollAxis(i, e, {
    preventScroll: t
  }) {
    if (this.preventScrollDelay = typeof t == "number" ? t : t || t === void 0 && i ? kt : void 0, !(!P.touchscreen || t === !1))
      return i || (t !== void 0 ? "y" : void 0);
  },
  pointerCapture(i, e, {
    pointer: {
      capture: t = !0,
      buttons: s = 1
    } = {}
  }) {
    return this.pointerButtons = s, !this.pointerLock && this.device === "pointer" && t;
  },
  keys(i = !0) {
    return i;
  },
  threshold(i, e, {
    filterTaps: t = !1,
    tapsThreshold: s = 3,
    axis: n = void 0
  }) {
    const o = v.toVector(i, t ? s : n ? 1 : 0);
    return this.filterTaps = t, this.tapsThreshold = s, o;
  },
  swipe({
    velocity: i = Pt,
    distance: e = St,
    duration: t = Nt
  } = {}) {
    return {
      velocity: this.transform(v.toVector(i)),
      distance: this.transform(v.toVector(e)),
      duration: t
    };
  },
  delay(i = 0) {
    switch (i) {
      case !0:
        return Mt;
      case !1:
        return 0;
      default:
        return i;
    }
  },
  axisThreshold(i) {
    return i ? b(b({}, Ue), i) : Ue;
  }
});
process.env.NODE_ENV === "development" && Object.assign(Qe, {
  useTouch(i) {
    if (i !== void 0)
      throw Error("[@use-gesture]: `useTouch` option has been renamed to `pointer.touch`. Use it as in `{ pointer: { touch: true } }`.");
    return NaN;
  },
  experimental_preventWindowScrollY(i) {
    if (i !== void 0)
      throw Error("[@use-gesture]: `experimental_preventWindowScrollY` option has been renamed to `preventScroll`.");
    return NaN;
  },
  swipeVelocity(i) {
    if (i !== void 0)
      throw Error("[@use-gesture]: `swipeVelocity` option has been renamed to `swipe.velocity`. Use it as in `{ swipe: { velocity: 0.5 } }`.");
    return NaN;
  },
  swipeDistance(i) {
    if (i !== void 0)
      throw Error("[@use-gesture]: `swipeDistance` option has been renamed to `swipe.distance`. Use it as in `{ swipe: { distance: 50 } }`.");
    return NaN;
  },
  swipeDuration(i) {
    if (i !== void 0)
      throw Error("[@use-gesture]: `swipeDuration` option has been renamed to `swipe.duration`. Use it as in `{ swipe: { duration: 250 } }`.");
    return NaN;
  }
});
function Be(i) {
  const [e, t] = i.overflow, [s, n] = i._delta, [o, a] = i._direction;
  (e < 0 && s > 0 && o < 0 || e > 0 && s < 0 && o > 0) && (i._movement[0] = i._movementBound[0]), (t < 0 && n > 0 && a < 0 || t > 0 && n < 0 && a > 0) && (i._movement[1] = i._movementBound[1]);
}
const $t = 30, Ht = 100;
class Vt extends Je {
  constructor(...e) {
    super(...e), O(this, "ingKey", "pinching"), O(this, "aliasKey", "da");
  }
  init() {
    this.state.offset = [1, 0], this.state.lastOffset = [1, 0], this.state._pointerEvents = /* @__PURE__ */ new Map();
  }
  reset() {
    super.reset();
    const e = this.state;
    e._touchIds = [], e.canceled = !1, e.cancel = this.cancel.bind(this), e.turns = 0;
  }
  computeOffset() {
    const {
      type: e,
      movement: t,
      lastOffset: s
    } = this.state;
    e === "wheel" ? this.state.offset = v.add(t, s) : this.state.offset = [(1 + t[0]) * s[0], t[1] + s[1]];
  }
  computeMovement() {
    const {
      offset: e,
      lastOffset: t
    } = this.state;
    this.state.movement = [e[0] / t[0], e[1] - t[1]];
  }
  axisIntent() {
    const e = this.state, [t, s] = e._movement;
    if (!e.axis) {
      const n = Math.abs(t) * $t - Math.abs(s);
      n < 0 ? e.axis = "angle" : n > 0 && (e.axis = "scale");
    }
  }
  restrictToAxis(e) {
    this.config.lockDirection && (this.state.axis === "scale" ? e[1] = 0 : this.state.axis === "angle" && (e[0] = 0));
  }
  cancel() {
    const e = this.state;
    e.canceled || setTimeout(() => {
      e.canceled = !0, e._active = !1, this.compute(), this.emit();
    }, 0);
  }
  touchStart(e) {
    this.ctrl.setEventIds(e);
    const t = this.state, s = this.ctrl.touchIds;
    if (t._active && t._touchIds.every((o) => s.has(o)) || s.size < 2)
      return;
    this.start(e), t._touchIds = Array.from(s).slice(0, 2);
    const n = Ne(e, t._touchIds);
    this.pinchStart(e, n);
  }
  pointerStart(e) {
    if (e.buttons != null && e.buttons % 2 !== 1)
      return;
    this.ctrl.setEventIds(e), e.target.setPointerCapture(e.pointerId);
    const t = this.state, s = t._pointerEvents, n = this.ctrl.pointerIds;
    if (t._active && Array.from(s.keys()).every((a) => n.has(a)) || (s.size < 2 && s.set(e.pointerId, e), t._pointerEvents.size < 2))
      return;
    this.start(e);
    const o = ye(...Array.from(s.values()));
    this.pinchStart(e, o);
  }
  pinchStart(e, t) {
    const s = this.state;
    s.origin = t.origin, this.computeValues([t.distance, t.angle]), this.computeInitial(), this.compute(e), this.emit();
  }
  touchMove(e) {
    if (!this.state._active)
      return;
    const t = Ne(e, this.state._touchIds);
    this.pinchMove(e, t);
  }
  pointerMove(e) {
    const t = this.state._pointerEvents;
    if (t.has(e.pointerId) && t.set(e.pointerId, e), !this.state._active)
      return;
    const s = ye(...Array.from(t.values()));
    this.pinchMove(e, s);
  }
  pinchMove(e, t) {
    const s = this.state, n = s._values[1], o = t.angle - n;
    let a = 0;
    Math.abs(o) > 270 && (a += Math.sign(o)), this.computeValues([t.distance, t.angle - 360 * a]), s.origin = t.origin, s.turns = a, s._movement = [s._values[0] / s._initial[0] - 1, s._values[1] - s._initial[1]], this.compute(e), this.emit();
  }
  touchEnd(e) {
    this.ctrl.setEventIds(e), !!this.state._active && this.state._touchIds.some((t) => !this.ctrl.touchIds.has(t)) && (this.state._active = !1, this.compute(e), this.emit());
  }
  pointerEnd(e) {
    const t = this.state;
    this.ctrl.setEventIds(e);
    try {
      e.target.releasePointerCapture(e.pointerId);
    } catch {
    }
    t._pointerEvents.has(e.pointerId) && t._pointerEvents.delete(e.pointerId), !!t._active && t._pointerEvents.size < 2 && (t._active = !1, this.compute(e), this.emit());
  }
  gestureStart(e) {
    e.cancelable && e.preventDefault();
    const t = this.state;
    t._active || (this.start(e), this.computeValues([e.scale, e.rotation]), t.origin = [e.clientX, e.clientY], this.compute(e), this.emit());
  }
  gestureMove(e) {
    if (e.cancelable && e.preventDefault(), !this.state._active)
      return;
    const t = this.state;
    this.computeValues([e.scale, e.rotation]), t.origin = [e.clientX, e.clientY];
    const s = t._movement;
    t._movement = [e.scale - 1, e.rotation], t._delta = v.sub(t._movement, s), this.compute(e), this.emit();
  }
  gestureEnd(e) {
    !this.state._active || (this.state._active = !1, this.compute(e), this.emit());
  }
  wheel(e) {
    const t = this.config.modifierKey;
    t && !e[t] || (this.state._active ? this.wheelChange(e) : this.wheelStart(e), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this)));
  }
  wheelStart(e) {
    this.start(e), this.wheelChange(e);
  }
  wheelChange(e) {
    "uv" in e || (e.cancelable && e.preventDefault(), process.env.NODE_ENV === "development" && !e.defaultPrevented && console.warn("[@use-gesture]: To properly support zoom on trackpads, try using the `target` option.\n\nThis message will only appear in development mode."));
    const s = this.state;
    s._delta = [-Ze(e)[1] / Ht * s.offset[0], 0], v.addTo(s._movement, s._delta), Be(s), this.state.origin = [e.clientX, e.clientY], this.compute(e), this.emit();
  }
  wheelEnd() {
    !this.state._active || (this.state._active = !1, this.compute(), this.emit());
  }
  bind(e) {
    const t = this.config.device;
    t && (e(t, "start", this[t + "Start"].bind(this)), e(t, "change", this[t + "Move"].bind(this)), e(t, "end", this[t + "End"].bind(this)), e(t, "cancel", this[t + "End"].bind(this))), this.config.pinchOnWheel && e("wheel", "", this.wheel.bind(this), {
      passive: !1
    });
  }
}
const Rt = b(b({}, _e), {}, {
  device(i, e, {
    shared: t,
    pointer: {
      touch: s = !1
    } = {}
  }) {
    if (t.target && !P.touch && P.gesture)
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
  bounds(i, e, {
    scaleBounds: t = {},
    angleBounds: s = {}
  }) {
    const n = (a) => {
      const f = Ve(ce(t, a), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [f.min, f.max];
    }, o = (a) => {
      const f = Ve(ce(s, a), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [f.min, f.max];
    };
    return typeof t != "function" && typeof s != "function" ? [n(), o()] : (a) => [n(a), o(a)];
  },
  threshold(i, e, t) {
    return this.lockDirection = t.axis === "lock", v.toVector(i, this.lockDirection ? [0.1, 3] : 0);
  },
  modifierKey(i) {
    return i === void 0 ? "ctrlKey" : i;
  },
  pinchOnWheel(i = !0) {
    return i;
  }
});
class jt extends J {
  constructor(...e) {
    super(...e), O(this, "ingKey", "moving");
  }
  move(e) {
    this.config.mouseOnly && e.pointerType !== "mouse" || (this.state._active ? this.moveChange(e) : this.moveStart(e), this.timeoutStore.add("moveEnd", this.moveEnd.bind(this)));
  }
  moveStart(e) {
    this.start(e), this.computeValues(F(e)), this.compute(e), this.computeInitial(), this.emit();
  }
  moveChange(e) {
    if (!this.state._active)
      return;
    const t = F(e), s = this.state;
    s._delta = v.sub(t, s._values), v.addTo(s._movement, s._delta), this.computeValues(t), this.compute(e), this.emit();
  }
  moveEnd(e) {
    !this.state._active || (this.state._active = !1, this.compute(e), this.emit());
  }
  bind(e) {
    e("pointer", "change", this.move.bind(this)), e("pointer", "leave", this.moveEnd.bind(this));
  }
}
const Kt = b(b({}, K), {}, {
  mouseOnly: (i = !0) => i
});
class Yt extends J {
  constructor(...e) {
    super(...e), O(this, "ingKey", "scrolling");
  }
  scroll(e) {
    this.state._active || this.start(e), this.scrollChange(e), this.timeoutStore.add("scrollEnd", this.scrollEnd.bind(this));
  }
  scrollChange(e) {
    e.cancelable && e.preventDefault();
    const t = this.state, s = vt(e);
    t._delta = v.sub(s, t._values), v.addTo(t._movement, t._delta), this.computeValues(s), this.compute(e), this.emit();
  }
  scrollEnd() {
    !this.state._active || (this.state._active = !1, this.compute(), this.emit());
  }
  bind(e) {
    e("scroll", "", this.scroll.bind(this));
  }
}
const Ut = K;
class qt extends J {
  constructor(...e) {
    super(...e), O(this, "ingKey", "wheeling");
  }
  wheel(e) {
    this.state._active || this.start(e), this.wheelChange(e), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(e) {
    const t = this.state;
    t._delta = Ze(e), v.addTo(t._movement, t._delta), Be(t), this.compute(e), this.emit();
  }
  wheelEnd() {
    !this.state._active || (this.state._active = !1, this.compute(), this.emit());
  }
  bind(e) {
    e("wheel", "", this.wheel.bind(this));
  }
}
const Gt = K;
class Xt extends J {
  constructor(...e) {
    super(...e), O(this, "ingKey", "hovering");
  }
  enter(e) {
    this.config.mouseOnly && e.pointerType !== "mouse" || (this.start(e), this.computeValues(F(e)), this.compute(e), this.emit());
  }
  leave(e) {
    if (this.config.mouseOnly && e.pointerType !== "mouse")
      return;
    const t = this.state;
    if (!t._active)
      return;
    t._active = !1;
    const s = F(e);
    t._movement = t._delta = v.sub(s, t._values), this.computeValues(s), this.compute(e), t.delta = t.movement, this.emit();
  }
  bind(e) {
    e("pointer", "enter", this.enter.bind(this)), e("pointer", "leave", this.leave.bind(this));
  }
}
const Wt = b(b({}, K), {}, {
  mouseOnly: (i = !0) => i
}), we = /* @__PURE__ */ new Map(), ve = /* @__PURE__ */ new Map();
function zt(i) {
  we.set(i.key, i.engine), ve.set(i.key, i.resolver);
}
const Ft = {
  key: "drag",
  engine: xt,
  resolver: Qe
}, Zt = {
  key: "hover",
  engine: Xt,
  resolver: Wt
}, Jt = {
  key: "move",
  engine: jt,
  resolver: Kt
}, Qt = {
  key: "pinch",
  engine: Vt,
  resolver: Rt
}, Bt = {
  key: "scroll",
  engine: Yt,
  resolver: Ut
}, ei = {
  key: "wheel",
  engine: qt,
  resolver: Gt
};
function ti(i, e) {
  if (i == null)
    return {};
  var t = {}, s = Object.keys(i), n, o;
  for (o = 0; o < s.length; o++)
    n = s[o], !(e.indexOf(n) >= 0) && (t[n] = i[n]);
  return t;
}
function ii(i, e) {
  if (i == null)
    return {};
  var t = ti(i, e), s, n;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(i);
    for (n = 0; n < o.length; n++)
      s = o[n], !(e.indexOf(s) >= 0) && (!Object.prototype.propertyIsEnumerable.call(i, s) || (t[s] = i[s]));
  }
  return t;
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
    capture: e = !1
  } = {}) {
    return {
      passive: i,
      capture: e
    };
  },
  transform(i) {
    return i;
  }
}, ni = ["target", "eventOptions", "window", "enabled", "transform"];
function ae(i = {}, e) {
  const t = {};
  for (const [s, n] of Object.entries(e))
    switch (typeof n) {
      case "function":
        if (process.env.NODE_ENV === "development") {
          const o = n.call(t, i[s], s, i);
          Number.isNaN(o) || (t[s] = o);
        } else
          t[s] = n.call(t, i[s], s, i);
        break;
      case "object":
        t[s] = ae(i[s], n);
        break;
      case "boolean":
        n && (t[s] = i[s]);
        break;
    }
  return t;
}
function ri(i, e, t = {}) {
  const s = i, {
    target: n,
    eventOptions: o,
    window: a,
    enabled: f,
    transform: h
  } = s, g = ii(s, ni);
  if (t.shared = ae({
    target: n,
    eventOptions: o,
    window: a,
    enabled: f,
    transform: h
  }, si), e) {
    const c = ve.get(e);
    t[e] = ae(b({
      shared: t.shared
    }, g), c);
  } else
    for (const c in g) {
      const k = ve.get(c);
      if (k)
        t[c] = ae(b({
          shared: t.shared
        }, g[c]), k);
      else if (process.env.NODE_ENV === "development" && !["drag", "pinch", "scroll", "wheel", "move", "hover"].includes(c)) {
        if (c === "domTarget")
          throw Error("[@use-gesture]: `domTarget` option has been renamed to `target`.");
        console.warn(`[@use-gesture]: Unknown config key \`${c}\` was used. Please read the documentation for further information.`);
      }
    }
  return t;
}
class et {
  constructor(e, t) {
    O(this, "_listeners", /* @__PURE__ */ new Set()), this._ctrl = e, this._gestureKey = t;
  }
  add(e, t, s, n, o) {
    const a = this._listeners, f = pt(t, s), h = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}, g = b(b({}, h), o);
    e.addEventListener(f, n, g);
    const c = () => {
      e.removeEventListener(f, n, g), a.delete(c);
    };
    return a.add(c), c;
  }
  clean() {
    this._listeners.forEach((e) => e()), this._listeners.clear();
  }
}
class oi {
  constructor() {
    O(this, "_timeouts", /* @__PURE__ */ new Map());
  }
  add(e, t, s = 140, ...n) {
    this.remove(e), this._timeouts.set(e, window.setTimeout(t, s, ...n));
  }
  remove(e) {
    const t = this._timeouts.get(e);
    t && window.clearTimeout(t);
  }
  clean() {
    this._timeouts.forEach((e) => void window.clearTimeout(e)), this._timeouts.clear();
  }
}
class ai {
  constructor(e) {
    O(this, "gestures", /* @__PURE__ */ new Set()), O(this, "_targetEventStore", new et(this)), O(this, "gestureEventStores", {}), O(this, "gestureTimeoutStores", {}), O(this, "handlers", {}), O(this, "config", {}), O(this, "pointerIds", /* @__PURE__ */ new Set()), O(this, "touchIds", /* @__PURE__ */ new Set()), O(this, "state", {
      shared: {
        shiftKey: !1,
        metaKey: !1,
        ctrlKey: !1,
        altKey: !1
      }
    }), ci(this, e);
  }
  setEventIds(e) {
    if (le(e))
      return this.touchIds = new Set(yt(e)), this.touchIds;
    if ("pointerId" in e)
      return e.type === "pointerup" || e.type === "pointercancel" ? this.pointerIds.delete(e.pointerId) : e.type === "pointerdown" && this.pointerIds.add(e.pointerId), this.pointerIds;
  }
  applyHandlers(e, t) {
    this.handlers = e, this.nativeHandlers = t;
  }
  applyConfig(e, t) {
    this.config = ri(e, t, this.config);
  }
  clean() {
    this._targetEventStore.clean();
    for (const e of this.gestures)
      this.gestureEventStores[e].clean(), this.gestureTimeoutStores[e].clean();
  }
  effect() {
    return this.config.shared.target && this.bind(), () => this._targetEventStore.clean();
  }
  bind(...e) {
    const t = this.config.shared, s = {};
    let n;
    if (!(t.target && (n = t.target(), !n))) {
      if (t.enabled) {
        for (const a of this.gestures) {
          const f = this.config[a], h = qe(s, f.eventOptions, !!n);
          if (f.enabled) {
            const g = we.get(a);
            new g(this, e, a).bind(h);
          }
        }
        const o = qe(s, t.eventOptions, !!n);
        for (const a in this.nativeHandlers)
          o(
            a,
            "",
            (f) => this.nativeHandlers[a](b(b({}, this.state.shared), {}, {
              event: f,
              args: e
            })),
            void 0,
            !0
          );
      }
      for (const o in s)
        s[o] = bt(...s[o]);
      if (!n)
        return s;
      for (const o in s) {
        const {
          device: a,
          capture: f,
          passive: h
        } = ht(o);
        this._targetEventStore.add(n, a, "", s[o], {
          capture: f,
          passive: h
        });
      }
    }
  }
}
function X(i, e) {
  i.gestures.add(e), i.gestureEventStores[e] = new et(i, e), i.gestureTimeoutStores[e] = new oi();
}
function ci(i, e) {
  e.drag && X(i, "drag"), e.wheel && X(i, "wheel"), e.scroll && X(i, "scroll"), e.move && X(i, "move"), e.pinch && X(i, "pinch"), e.hover && X(i, "hover");
}
const qe = (i, e, t) => (s, n, o, a = {}, f = !1) => {
  var h, g;
  const c = (h = a.capture) !== null && h !== void 0 ? h : e.capture, k = (g = a.passive) !== null && g !== void 0 ? g : e.passive;
  let C = f ? s : dt(s, n, c);
  t && k && (C += "Passive"), i[C] = i[C] || [], i[C].push(o);
}, li = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function ui(i) {
  const e = {}, t = {}, s = /* @__PURE__ */ new Set();
  for (let n in i)
    li.test(n) ? (s.add(RegExp.lastMatch), t[n] = i[n]) : e[n] = i[n];
  return [t, e, s];
}
function W(i, e, t, s, n, o) {
  if (!i.has(t))
    return;
  if (!we.has(s)) {
    process.env.NODE_ENV === "development" && console.warn(`[@use-gesture]: You've created a custom handler that that uses the \`${s}\` gesture but isn't properly configured.

Please add \`${s}Action\` when creating your handler.`);
    return;
  }
  const a = t + "Start", f = t + "End", h = (g) => {
    let c;
    return g.first && a in e && e[a](g), t in e && (c = e[t](g)), g.last && f in e && e[f](g), c;
  };
  n[s] = h, o[s] = o[s] || {};
}
function di(i, e) {
  const [t, s, n] = ui(i), o = {};
  return W(n, t, "onDrag", "drag", o, e), W(n, t, "onWheel", "wheel", o, e), W(n, t, "onScroll", "scroll", o, e), W(n, t, "onPinch", "pinch", o, e), W(n, t, "onMove", "move", o, e), W(n, t, "onHover", "hover", o, e), {
    handlers: o,
    config: e,
    nativeHandlers: s
  };
}
function fi(i, e, t) {
  return e in i ? Object.defineProperty(i, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : i[e] = t, i;
}
function Ge(i, e) {
  var t = Object.keys(i);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(i);
    e && (s = s.filter(function(n) {
      return Object.getOwnPropertyDescriptor(i, n).enumerable;
    })), t.push.apply(t, s);
  }
  return t;
}
function oe(i) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Ge(Object(t), !0).forEach(function(s) {
      fi(i, s, t[s]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(t)) : Ge(Object(t)).forEach(function(s) {
      Object.defineProperty(i, s, Object.getOwnPropertyDescriptor(t, s));
    });
  }
  return i;
}
class hi {
  constructor(e, t, s, n, o) {
    this._target = e, this._gestureKey = n, this._ctrl = new ai(t), this._ctrl.applyHandlers(t, o), this._ctrl.applyConfig(oe(oe({}, s), {}, {
      target: e
    }), n), this._ctrl.effect();
  }
  destroy() {
    this._ctrl.clean();
  }
  setConfig(e) {
    this._ctrl.clean(), this._ctrl.applyConfig(oe(oe({}, e), {}, {
      target: this._target
    }), this._gestureKey), this._ctrl.effect();
  }
}
function pi(i) {
  return i.forEach(zt), function(e, t, s) {
    const {
      handlers: n,
      nativeHandlers: o,
      config: a
    } = di(t, s || {});
    return new hi(e, n, a, void 0, o);
  };
}
const mi = function(e, t, s) {
  return pi([Ft, Qt, Bt, ei, Jt, Zt])(e, t, s || {});
};
function z(i) {
  M({
    targets: i,
    opacity: 0,
    easing: "spring(1, 85, 35, 3)",
    duration: 0
  }), setTimeout(() => {
    var e;
    (e = i == null ? void 0 : i.classList) != null && e.contains("display") && i.classList.remove("display"), i && i.remove();
  }, 300), document.body.style.overflow = "scroll";
}
function Xe(i) {
  i.classList.add("display"), M({
    targets: i,
    opacity: 1,
    easing: "spring(1, 85, 35, 3)",
    duration: 0
  });
}
function j(i, e, t, s) {
  M({
    targets: i,
    translateY: e,
    easing: t,
    duration: s
  });
}
function ge(i) {
  return typeof i == "string" ? +i.replace("%", "") : +i;
}
function V(i) {
  return typeof i == "string" ? _(+i.replace("%", "")) : +i;
}
function _(i) {
  return Math.round(window.innerHeight * i / 100);
}
function A(i) {
  return window.innerHeight - i;
}
function gi() {
  var i = navigator.userAgent || navigator.vendor || window.opera;
  return /windows phone/i.test(i) ? "Windows Phone" : /android/i.test(i) ? "Android" : /iPad|iPhone|iPod/.test(i) && !window.MSStream ? "iOS" : "unknown";
}
function _i(i) {
  var De;
  let {
    snapPoints: e = ["100%"],
    displayOverlay: t = !1,
    minWidthForModal: s = 700,
    draggableArea: n = "",
    onOpen: o = () => {
    },
    onClose: a = () => {
    },
    trigger: f = "",
    content: h = "",
    onInit: g = () => {
    },
    webLayout: c = "modal",
    openOnLoad: k = !1,
    modalCloseIcon: C = `<svg width="16" height="12" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33.112 36.9133C34.3649 38.15 36.3963 38.15 37.6492 36.9133C38.9022 35.6766 38.9022 33.6716 37.6492 32.435L24.0375 19L37.6492 5.56496C38.9022 4.3283 38.9022 2.32328 37.6492 1.08662C36.3963 -0.150042 34.3649 -0.150042 33.112 1.08662L19.5002 14.5216L5.88835 1.08655C4.63541 -0.150108 2.60401 -0.150107 1.35108 1.08655C0.0981471 2.32321 0.0981459 4.32824 1.35108 5.5649L14.9629 19L1.35108 32.435C0.0981434 33.6717 0.0981443 35.6767 1.35108 36.9134C2.60401 38.15 4.63541 38.15 5.88834 36.9134L19.5002 23.4783L33.112 36.9133Z" fill="white"/>
    </svg>
    `,
    sideSheetLeftIcon: Y = `
    <svg width="16" height="14" viewBox="0 0 26 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.5046 40.8036C23.2926 42.0804 21.2623 42.1465 19.9698 40.9513L1.76653 24.118C0.474022 22.9228 0.408779 20.9188 1.62081 19.6421L18.6906 1.66043C19.9026 0.383653 21.9329 0.317552 23.2254 1.51279C24.5179 2.70802 24.5832 4.71199 23.3712 5.98876L8.49597 21.6586L24.3589 36.3277C25.6514 37.5229 25.7166 39.5269 24.5046 40.8036Z" fill="white"/>
    </svg> 
    `,
    sideSheetRightIcon: U = `<svg width="16" height="14" viewBox="0 0 25 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.21057 1.34418C2.46351 0.107522 4.49491 0.107522 5.74784 1.34418L23.3937 18.7608C24.6466 19.9975 24.6466 22.0025 23.3937 23.2392L5.74784 40.6559C4.49491 41.8925 2.46351 41.8925 1.21057 40.6559C-0.0423591 39.4192 -0.0423591 37.4142 1.21057 36.1775L16.5878 21L1.21057 5.82253C-0.0423591 4.58586 -0.0423591 2.58084 1.21057 1.34418Z" fill="white"/>
    </svg>   
    `,
    defaultSideSheetClose: R = !0,
    cleanUpOnClose: $ = !1,
    dismissible: S = !0,
    sideSheetSnapPoints: B = ["10%", "25%", "50%", "100%"],
    velocityThreshold: ee = 0.9,
    distanceThreshold: te = 150,
    closeOnOverlayClick: ue = !0,
    animateOnDrag: H = {}
  } = i, T;
  h = typeof h != "string" ? promise.resolve(h).then((r) => {
  }) : h;
  let ie = f ? (De = document == null ? void 0 : document.querySelector(`#${f}`)) == null ? void 0 : De.getAttribute("data-bottomsheet-id") : "", l = ie ? document == null ? void 0 : document.querySelector(`#${ie}`) : "";
  const L = document.querySelector(`#${l == null ? void 0 : l.id}-overlay`) ? document.querySelector(`#${l == null ? void 0 : l.id}-overlay`) : document.createElement("div");
  L.id = `${l == null ? void 0 : l.id}-overlay`;
  let be = "spring(1, 85, 45, 15)", Ee = "spring(1, 85, 35, 5)";
  document.addEventListener("click", (r) => {
    setTimeout(() => {
      r.target.tagName.toLowerCase() === "input" && gi() === "Android" && j(l, "0px", G());
    }, 100);
  }), k ? se(k) : setTimeout(() => {
    f && document.querySelector(`#${f}`) && document.querySelectorAll(`#${f}`).forEach(
      (r) => r.addEventListener("click", () => {
        se(!1);
      })
    );
  }, 400);
  function se(r = !1) {
    document.body.style.overflowY = "contain", g && g(), h && !l ? (document.body.insertAdjacentHTML("beforeend", h), l = ie ? document.querySelector(`#${ie}`) : document.querySelector(
      `#${new DOMParser().parseFromString(h, "text/html").body.firstChild.id}`
    )) : h && !l.innerHTML && (l.innerHTML = new DOMParser().parseFromString(
      h,
      "text/html"
    ).body.firstChild.innerHTML), l && !document.getElementById(`#${l.id}`) && document.body.append(l), t && (L.classList.add("overlay"), Xe(L), document.body.appendChild(L), l && document.querySelector(".overlay") && document.body.insertBefore(L, l), ue && L.addEventListener("click", () => {
      q(d, S);
    }));
    let d = !(window.innerWidth < s);
    document.querySelectorAll(`#${l == null ? void 0 : l.id}`).length < 2 ? tt(l, d, L, r) : de(d, r);
  }
  function tt(r, d, p, u) {
    let m = Z(r), D = ge(e[e.length - 1]), w = document.createElement("div"), x = document.createElement("div"), I = document.createElement("div"), y = "";
    r.style.display = "block", w.id = "modal-close", w.classList.add("close-modal"), w.addEventListener(
      "click",
      () => Te(r, p)
    ), x.id = "side-left", R && x.addEventListener("click", () => {
      Ae(r, p);
    }), I.id = "side-right", R && I.addEventListener(
      "click",
      () => he(r)
    ), w.insertAdjacentHTML("afterbegin", C), x.insertAdjacentHTML("afterbegin", Y), I.insertAdjacentHTML("afterbegin", U), n && (typeof n == "string" ? (n = new DOMParser().parseFromString(
      n,
      "text/xml"
    ), y = n.childNodes[0].id, n = n.childNodes[0]) : y = n == null ? void 0 : n.id, n.setAttribute("data-draggable", "1"), n.classList.add("draggable")), Oe(
      r,
      x,
      I,
      d,
      y,
      p,
      w
    ), d = it(
      r,
      x,
      I,
      d,
      p,
      w,
      y
    ), setTimeout(() => {
      o();
    }, 300), T && T < window.innerHeight && window.innerWidth < s ? q(d, S) : de(d, u), r.click(), r.style.overflow = "scroll", r.style.touchAction = "auto", setTimeout(() => {
      st(
        r,
        m,
        D,
        r,
        y,
        p,
        d
      );
    }, 400), document.querySelector(`.bottomsheet #${r.id}`) && (document.querySelector(
      `.bottomsheet #${r.id}`
    ).style.display = "block");
  }
  function it(r, d, p, u, m, D, w) {
    return window.addEventListener("resize", () => (Oe(
      r,
      d,
      p,
      u,
      w,
      m,
      D
    ), window.innerWidth < s ? u = !1 : u = !0, u)), u;
  }
  function Te(r, d) {
    M({
      targets: r,
      opacity: 0,
      easing: be,
      duration: 0.1,
      translateY: "-40%"
    }), setTimeout(() => {
      ne(r);
    }, 500), z(d);
  }
  function q(r = !1, d = !0, p = 7) {
    t && L && z(L), document.body.style.overflow = "scroll", r ? c === "modal" ? Te(l, L) : c === "sideSheetLeft" ? Ae(l, L) : he(l) : M({
      targets: l,
      translateY: `${d ? _(100) : A(V(e[0]))}px`,
      easing: G(),
      duration: 1
    }), T = _(100), setTimeout(() => {
      T >= window.innerHeight && $ && ne(l);
    }, 500), z(L), a();
  }
  function Oe(r, d, p, u, m, D, w) {
    u ? (n && document.querySelector(`#${r.id} #${m}`) && r.removeChild(n), c === "modal" ? r.classList.add("modal") : r.classList.add("side-sheet"), r.classList.remove("bottomsheet"), !document.querySelector(`#${r.id} #modal-close`) && c === "modal" ? r.prepend(w) : !document.querySelector(`#${r.id} #side-left`) && c === "sideSheetLeft" ? r.prepend(d) : !document.querySelector(`#${r.id} #side-right`) && c === "sideSheetRight" && (r.prepend(p), he(r))) : (m && !document.querySelector(`#${r == null ? void 0 : r.id} #${m}`) && r.prepend(n), document.querySelector(`#${r.id} #modal-close`) && r.removeChild(w), document.querySelector(`#${r.id} #side-left`) && r.removeChild(d), document.querySelector(`#${r.id} #side-right`) && r.removeChild(p), r.classList.add("bottomsheet"), r.classList.remove("modal"), r.classList.remove("side-sheet"));
  }
  function de(r = !1, d = !1) {
    document.body.style.overflow = "hidden", t && Xe(L), r ? c === "sideSheetLeft" ? (l.style.top = 0, l.style.left = "-100%", setTimeout(() => {
      M({
        targets: l,
        left: "0",
        width: B[0],
        easing: Ee,
        duration: 1
      });
    }, 100)) : c === "sideSheetRight" ? (l.style.top = 0, l.style.right = "-100%", setTimeout(() => {
      M({
        targets: l,
        right: "0",
        width: B[0],
        easing: Ee,
        duration: 1
      });
    }, 100)) : (l.style.top = "50%", l.style.opacity = 0, l.style.transform = "translateX(-50%) translateY(-40%) rotateX(-20deg)", M({
      translateY: "-50%",
      targets: l,
      opacity: 1,
      rotateX: "1deg",
      easing: be,
      duration: 0.1
    })) : d ? (l.style.opacity = 1, l.style.transform = `translateY(${A(
      V(e[0])
    )}px)`) : (M({
      targets: l,
      translateY: `${_(100)}px`,
      easing: "linear",
      duration: 1
    }), setTimeout(() => {
      M({
        targets: l,
        translateY: `${A(V(e[0]))}px`,
        easing: "spring(1, 85, 15, 3)",
        opacity: 1,
        duration: 1
      });
    }, 60)), T = A(V(e[0]));
  }
  function st(r, d, p, u, m, D, w) {
    new mi(
      r,
      {
        onDrag: ({
          active: x,
          velocity: [I, y],
          offset: E,
          distance: [N, pe],
          target: Ce,
          direction: rt
        }) => {
          let Le = 0, ot = 1 / 0;
          d = Z(u), window.innerWidth < s && (rt[1] > 0 ? m && Ce === document.querySelector(`#${m}`) ? (u.style.overflow = "hidden", u.style.touchAction = "none", fe(
            u,
            Le,
            null,
            x,
            p,
            y,
            E,
            pe,
            D
          ), T >= window.innerHeight && q(w, S, y), T >= window.innerHeight && z(D)) : u.scrollTop >= 1 && d <= _(100 - p) && (!m || Ce !== document.querySelector(`#${m}`)) ? (u.style.overflow = "scroll", u.style.touchAction = "auto", u.click()) : (u.style.overflow = "hidden", u.style.touchAction = "none", fe(
            u,
            Le,
            null,
            x,
            p,
            y,
            E,
            pe,
            D
          ), T >= window.innerHeight && q(w, S, y)) : Z(l) <= _(100 - p) ? (u.click(), u.style.overflow = "scroll", _(100 - p) > 0 && (u.style.minHeight = "unset"), u.style.height = `${_(p)}px`, u.style.touchAction = "auto") : (u.style.overflow = "hidden", u.style.touchAction = "none", fe(
            u,
            null,
            ot,
            x,
            p,
            y,
            E,
            pe,
            D
          ), T >= window.innerHeight && q(w, S, y)));
        },
        onDragStart: () => {
          document.body.style.overflow = "hidden";
        },
        onDragEnd: ({ direction: x }) => {
          d = Z(u), (d <= _(100 - p) || T === 0) && x[1] < 0 && l.scrollTop >= 0 && (u.style.overflow = "scroll", u.click(), u.style.touchAction = "auto"), (d <= _(100 - p) || T === 0) && x[1] > 0 && l.scrollTop === 0 && (u.style.overflow = "hidden");
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
  function fe(r, d, p, u, m, D, w, x, I, y) {
    let E = w[1];
    if (p === null) {
      let N = function() {
        return Ie(
          E > window.innerHeight ? window.innerHeight : E < _(100 - m) ? _(100 - m) : E,
          r,
          D,
          m,
          x,
          !1,
          I,
          S
        );
      };
      u && j(
        r,
        `${E > window.innerHeight ? window.innerHeight : E < _(100 - m) ? _(100 - m) : E}px`,
        "spring(1, 250, 25, 25)"
      ), u || N() !== void 0 && (w[1] = N());
    } else {
      let N = function() {
        return xe(
          E > window.innerHeight ? window.innerHeight : E < _(100 - m) ? _(100 - m) : E,
          r,
          D,
          m,
          x,
          !1,
          I
        );
      };
      u && j(
        r,
        `${E > window.innerHeight ? window.innerHeight : E < _(100 - m) ? _(100 - m) : E}px`,
        "spring(1, 250, 25, 25)"
      ), u || N() !== void 0 && (w[1] = N());
    }
  }
  function Z(r) {
    var d;
    return +((d = r == null ? void 0 : r.style) == null ? void 0 : d.transform.slice(11).replace("px)", ""));
  }
  function xe(r, d, p, u, m, D, w, x) {
    let I = 1 / 0;
    if (e.forEach((y) => {
      let E = ge(y);
      _(E) > A(r) && _(E) < I && (I = _(E));
    }), I !== 1 / 0)
      return D ? (j(
        d,
        `${A(I)}px`,
        G()
      ), T = A(I), T) : p > ee || m < te ? (j(
        d,
        `${A(I)}px`,
        G()
      ), T = A(I), T) : Ie(
        r,
        d,
        p,
        u,
        m,
        !0,
        w,
        S
      );
  }
  function Ie(r, d, p, u, m, D, w, x, I) {
    let y = 0;
    return e.forEach((E) => {
      let N = ge(E);
      _(N) < A(r) && _(N) > y && (y = _(N));
    }), D ? (j(
      d,
      `${x ? A(y) : y <= V(e[0]) ? A(V(e[0])) : A(y)}px`,
      G()
    ), T = A(y), T) : p > ee || m > te ? (j(
      d,
      `${x ? A(y) : y <= V(e[0]) ? A(V(e[0])) : A(y)}px`,
      G()
    ), T = A(y), T) : xe(
      r,
      d,
      p,
      u,
      m,
      !0,
      w
    );
  }
  function Ae(r, d) {
    M({
      targets: r,
      width: 0,
      easing: "spring(1, 85, 45, 3)",
      duration: 0
    }), setTimeout(() => {
      $ && ne(r);
    }, 400), z(d);
  }
  function he(r) {
    M({
      targets: r,
      width: 0,
      easing: "spring(1, 85, 45, 3)",
      duration: 0
    }), setTimeout(() => {
      $ && ne(r);
    }, 400), z(L);
  }
  function ne(r) {
    r.remove();
  }
  function G() {
    return "spring(1, 95, 25, 13)";
  }
  function nt() {
    document.getElementById(f).removeEventListener("click", () => {
      se(!1);
    });
  }
  return {
    close: q,
    init: se,
    open: de,
    destroy: nt
  };
}
export {
  _i as default
};
