var xt = {
  update: null,
  begin: null,
  loopBegin: null,
  changeBegin: null,
  change: null,
  changeComplete: null,
  loopComplete: null,
  complete: null,
  loop: 1,
  direction: "normal",
  autoplay: !0,
  timelineOffset: 0
}, Ke = {
  duration: 1e3,
  delay: 0,
  endDelay: 0,
  easing: "easeOutElastic(1, .5)",
  round: 0
}, Jt = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d"], Ae = {
  CSS: {},
  springs: {}
};
function Q(t, e, n) {
  return Math.min(Math.max(t, e), n);
}
function _e(t, e) {
  return t.indexOf(e) > -1;
}
function Ve(t, e) {
  return t.apply(null, e);
}
var p = {
  arr: function(t) {
    return Array.isArray(t);
  },
  obj: function(t) {
    return _e(Object.prototype.toString.call(t), "Object");
  },
  pth: function(t) {
    return p.obj(t) && t.hasOwnProperty("totalLength");
  },
  svg: function(t) {
    return t instanceof SVGElement;
  },
  inp: function(t) {
    return t instanceof HTMLInputElement;
  },
  dom: function(t) {
    return t.nodeType || p.svg(t);
  },
  str: function(t) {
    return typeof t == "string";
  },
  fnc: function(t) {
    return typeof t == "function";
  },
  und: function(t) {
    return typeof t > "u";
  },
  nil: function(t) {
    return p.und(t) || t === null;
  },
  hex: function(t) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t);
  },
  rgb: function(t) {
    return /^rgb/.test(t);
  },
  hsl: function(t) {
    return /^hsl/.test(t);
  },
  col: function(t) {
    return p.hex(t) || p.rgb(t) || p.hsl(t);
  },
  key: function(t) {
    return !xt.hasOwnProperty(t) && !Ke.hasOwnProperty(t) && t !== "targets" && t !== "keyframes";
  }
};
function It(t) {
  var e = /\(([^)]+)\)/.exec(t);
  return e ? e[1].split(",").map(function(n) {
    return parseFloat(n);
  }) : [];
}
function Ot(t, e) {
  var n = It(t), r = Q(p.und(n[0]) ? 1 : n[0], 0.1, 100), i = Q(p.und(n[1]) ? 100 : n[1], 0.1, 100), s = Q(p.und(n[2]) ? 10 : n[2], 0.1, 100), a = Q(p.und(n[3]) ? 0 : n[3], 0.1, 100), u = Math.sqrt(i / r), o = s / (2 * Math.sqrt(i * r)), d = o < 1 ? u * Math.sqrt(1 - o * o) : 0, c = 1, f = o < 1 ? (o * u + -a) / d : -a + u;
  function h(w) {
    var v = e ? e * w / 1e3 : w;
    return o < 1 ? v = Math.exp(-v * o * u) * (c * Math.cos(d * v) + f * Math.sin(d * v)) : v = (c + f * v) * Math.exp(-v * u), w === 0 || w === 1 ? w : 1 - v;
  }
  function k() {
    var w = Ae.springs[t];
    if (w)
      return w;
    for (var v = 1 / 6, I = 0, x = 0; ; )
      if (I += v, h(I) === 1) {
        if (x++, x >= 16)
          break;
      } else
        x = 0;
    var y = I * v * 1e3;
    return Ae.springs[t] = y, y;
  }
  return e ? h : k;
}
function Bt(t) {
  return t === void 0 && (t = 10), function(e) {
    return Math.ceil(Q(e, 1e-6, 1) * t) * (1 / t);
  };
}
var en = function() {
  var t = 11, e = 1 / (t - 1);
  function n(c, f) {
    return 1 - 3 * f + 3 * c;
  }
  function r(c, f) {
    return 3 * f - 6 * c;
  }
  function i(c) {
    return 3 * c;
  }
  function s(c, f, h) {
    return ((n(f, h) * c + r(f, h)) * c + i(f)) * c;
  }
  function a(c, f, h) {
    return 3 * n(f, h) * c * c + 2 * r(f, h) * c + i(f);
  }
  function u(c, f, h, k, w) {
    var v, I, x = 0;
    do
      I = f + (h - f) / 2, v = s(I, k, w) - c, v > 0 ? h = I : f = I;
    while (Math.abs(v) > 1e-7 && ++x < 10);
    return I;
  }
  function o(c, f, h, k) {
    for (var w = 0; w < 4; ++w) {
      var v = a(f, h, k);
      if (v === 0)
        return f;
      var I = s(f, h, k) - c;
      f -= I / v;
    }
    return f;
  }
  function d(c, f, h, k) {
    if (!(0 <= c && c <= 1 && 0 <= h && h <= 1))
      return;
    var w = new Float32Array(t);
    if (c !== f || h !== k)
      for (var v = 0; v < t; ++v)
        w[v] = s(v * e, c, h);
    function I(x) {
      for (var y = 0, m = 1, S = t - 1; m !== S && w[m] <= x; ++m)
        y += e;
      --m;
      var q = (x - w[m]) / (w[m + 1] - w[m]), O = y + q * e, C = a(O, c, h);
      return C >= 1e-3 ? o(x, O, c, h) : C === 0 ? O : u(x, y, y + e, c, h);
    }
    return function(x) {
      return c === f && h === k || x === 0 || x === 1 ? x : s(I(x), f, k);
    };
  }
  return d;
}(), Ct = function() {
  var t = { linear: function() {
    return function(r) {
      return r;
    };
  } }, e = {
    Sine: function() {
      return function(r) {
        return 1 - Math.cos(r * Math.PI / 2);
      };
    },
    Circ: function() {
      return function(r) {
        return 1 - Math.sqrt(1 - r * r);
      };
    },
    Back: function() {
      return function(r) {
        return r * r * (3 * r - 2);
      };
    },
    Bounce: function() {
      return function(r) {
        for (var i, s = 4; r < ((i = Math.pow(2, --s)) - 1) / 11; )
          ;
        return 1 / Math.pow(4, 3 - s) - 7.5625 * Math.pow((i * 3 - 2) / 22 - r, 2);
      };
    },
    Elastic: function(r, i) {
      r === void 0 && (r = 1), i === void 0 && (i = 0.5);
      var s = Q(r, 1, 10), a = Q(i, 0.1, 2);
      return function(u) {
        return u === 0 || u === 1 ? u : -s * Math.pow(2, 10 * (u - 1)) * Math.sin((u - 1 - a / (Math.PI * 2) * Math.asin(1 / s)) * (Math.PI * 2) / a);
      };
    }
  }, n = ["Quad", "Cubic", "Quart", "Quint", "Expo"];
  return n.forEach(function(r, i) {
    e[r] = function() {
      return function(s) {
        return Math.pow(s, i + 2);
      };
    };
  }), Object.keys(e).forEach(function(r) {
    var i = e[r];
    t["easeIn" + r] = i, t["easeOut" + r] = function(s, a) {
      return function(u) {
        return 1 - i(s, a)(1 - u);
      };
    }, t["easeInOut" + r] = function(s, a) {
      return function(u) {
        return u < 0.5 ? i(s, a)(u * 2) / 2 : 1 - i(s, a)(u * -2 + 2) / 2;
      };
    }, t["easeOutIn" + r] = function(s, a) {
      return function(u) {
        return u < 0.5 ? (1 - i(s, a)(1 - u * 2)) / 2 : (i(s, a)(u * 2 - 1) + 1) / 2;
      };
    };
  }), t;
}();
function Fe(t, e) {
  if (p.fnc(t))
    return t;
  var n = t.split("(")[0], r = Ct[n], i = It(t);
  switch (n) {
    case "spring":
      return Ot(t, e);
    case "cubicBezier":
      return Ve(en, i);
    case "steps":
      return Ve(Bt, i);
    default:
      return Ve(r, i);
  }
}
function At(t) {
  try {
    var e = document.querySelectorAll(t);
    return e;
  } catch {
    return;
  }
}
function De(t, e) {
  for (var n = t.length, r = arguments.length >= 2 ? arguments[1] : void 0, i = [], s = 0; s < n; s++)
    if (s in t) {
      var a = t[s];
      e.call(r, a, s, t) && i.push(a);
    }
  return i;
}
function ke(t) {
  return t.reduce(function(e, n) {
    return e.concat(p.arr(n) ? ke(n) : n);
  }, []);
}
function rt(t) {
  return p.arr(t) ? t : (p.str(t) && (t = At(t) || t), t instanceof NodeList || t instanceof HTMLCollection ? [].slice.call(t) : [t]);
}
function Ye(t, e) {
  return t.some(function(n) {
    return n === e;
  });
}
function qe(t) {
  var e = {};
  for (var n in t)
    e[n] = t[n];
  return e;
}
function He(t, e) {
  var n = qe(t);
  for (var r in t)
    n[r] = e.hasOwnProperty(r) ? e[r] : t[r];
  return n;
}
function Le(t, e) {
  var n = qe(t);
  for (var r in e)
    n[r] = p.und(t[r]) ? e[r] : t[r];
  return n;
}
function tn(t) {
  var e = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(t);
  return e ? "rgba(" + e[1] + ",1)" : t;
}
function nn(t) {
  var e = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, n = t.replace(e, function(u, o, d, c) {
    return o + o + d + d + c + c;
  }), r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n), i = parseInt(r[1], 16), s = parseInt(r[2], 16), a = parseInt(r[3], 16);
  return "rgba(" + i + "," + s + "," + a + ",1)";
}
function rn(t) {
  var e = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(t), n = parseInt(e[1], 10) / 360, r = parseInt(e[2], 10) / 100, i = parseInt(e[3], 10) / 100, s = e[4] || 1;
  function a(h, k, w) {
    return w < 0 && (w += 1), w > 1 && (w -= 1), w < 1 / 6 ? h + (k - h) * 6 * w : w < 1 / 2 ? k : w < 2 / 3 ? h + (k - h) * (2 / 3 - w) * 6 : h;
  }
  var u, o, d;
  if (r == 0)
    u = o = d = i;
  else {
    var c = i < 0.5 ? i * (1 + r) : i + r - i * r, f = 2 * i - c;
    u = a(f, c, n + 1 / 3), o = a(f, c, n), d = a(f, c, n - 1 / 3);
  }
  return "rgba(" + u * 255 + "," + o * 255 + "," + d * 255 + "," + s + ")";
}
function sn(t) {
  if (p.rgb(t))
    return tn(t);
  if (p.hex(t))
    return nn(t);
  if (p.hsl(t))
    return rn(t);
}
function ee(t) {
  var e = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(t);
  if (e)
    return e[1];
}
function on(t) {
  if (_e(t, "translate") || t === "perspective")
    return "px";
  if (_e(t, "rotate") || _e(t, "skew"))
    return "deg";
}
function je(t, e) {
  return p.fnc(t) ? t(e.target, e.id, e.total) : t;
}
function X(t, e) {
  return t.getAttribute(e);
}
function ze(t, e, n) {
  var r = ee(e);
  if (Ye([n, "deg", "rad", "turn"], r))
    return e;
  var i = Ae.CSS[e + n];
  if (!p.und(i))
    return i;
  var s = 100, a = document.createElement(t.tagName), u = t.parentNode && t.parentNode !== document ? t.parentNode : document.body;
  u.appendChild(a), a.style.position = "absolute", a.style.width = s + n;
  var o = s / a.offsetWidth;
  u.removeChild(a);
  var d = o * parseFloat(e);
  return Ae.CSS[e + n] = d, d;
}
function Mt(t, e, n) {
  if (e in t.style) {
    var r = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), i = t.style[e] || getComputedStyle(t).getPropertyValue(r) || "0";
    return n ? ze(t, i, n) : i;
  }
}
function We(t, e) {
  if (p.dom(t) && !p.inp(t) && (!p.nil(X(t, e)) || p.svg(t) && t[e]))
    return "attribute";
  if (p.dom(t) && Ye(Jt, e))
    return "transform";
  if (p.dom(t) && e !== "transform" && Mt(t, e))
    return "css";
  if (t[e] != null)
    return "object";
}
function Dt(t) {
  if (!!p.dom(t)) {
    for (var e = t.style.transform || "", n = /(\w+)\(([^)]*)\)/g, r = /* @__PURE__ */ new Map(), i; i = n.exec(e); )
      r.set(i[1], i[2]);
    return r;
  }
}
function an(t, e, n, r) {
  var i = _e(e, "scale") ? 1 : 0 + on(e), s = Dt(t).get(e) || i;
  return n && (n.transforms.list.set(e, s), n.transforms.last = e), r ? ze(t, s, r) : s;
}
function Ge(t, e, n, r) {
  switch (We(t, e)) {
    case "transform":
      return an(t, e, r, n);
    case "css":
      return Mt(t, e, n);
    case "attribute":
      return X(t, e);
    default:
      return t[e] || 0;
  }
}
function Ze(t, e) {
  var n = /^(\*=|\+=|-=)/.exec(t);
  if (!n)
    return t;
  var r = ee(t) || 0, i = parseFloat(e), s = parseFloat(t.replace(n[0], ""));
  switch (n[0][0]) {
    case "+":
      return i + s + r;
    case "-":
      return i - s + r;
    case "*":
      return i * s + r;
  }
}
function kt(t, e) {
  if (p.col(t))
    return sn(t);
  if (/\s/g.test(t))
    return t;
  var n = ee(t), r = n ? t.substr(0, t.length - n.length) : t;
  return e ? r + e : r;
}
function Qe(t, e) {
  return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
function cn(t) {
  return Math.PI * 2 * X(t, "r");
}
function un(t) {
  return X(t, "width") * 2 + X(t, "height") * 2;
}
function ln(t) {
  return Qe(
    { x: X(t, "x1"), y: X(t, "y1") },
    { x: X(t, "x2"), y: X(t, "y2") }
  );
}
function Lt(t) {
  for (var e = t.points, n = 0, r, i = 0; i < e.numberOfItems; i++) {
    var s = e.getItem(i);
    i > 0 && (n += Qe(r, s)), r = s;
  }
  return n;
}
function fn(t) {
  var e = t.points;
  return Lt(t) + Qe(e.getItem(e.numberOfItems - 1), e.getItem(0));
}
function Pt(t) {
  if (t.getTotalLength)
    return t.getTotalLength();
  switch (t.tagName.toLowerCase()) {
    case "circle":
      return cn(t);
    case "rect":
      return un(t);
    case "line":
      return ln(t);
    case "polyline":
      return Lt(t);
    case "polygon":
      return fn(t);
  }
}
function dn(t) {
  var e = Pt(t);
  return t.setAttribute("stroke-dasharray", e), e;
}
function hn(t) {
  for (var e = t.parentNode; p.svg(e) && p.svg(e.parentNode); )
    e = e.parentNode;
  return e;
}
function St(t, e) {
  var n = e || {}, r = n.el || hn(t), i = r.getBoundingClientRect(), s = X(r, "viewBox"), a = i.width, u = i.height, o = n.viewBox || (s ? s.split(" ") : [0, 0, a, u]);
  return {
    el: r,
    viewBox: o,
    x: o[0] / 1,
    y: o[1] / 1,
    w: a,
    h: u,
    vW: o[2],
    vH: o[3]
  };
}
function pn(t, e) {
  var n = p.str(t) ? At(t)[0] : t, r = e || 100;
  return function(i) {
    return {
      property: i,
      el: n,
      svg: St(n),
      totalLength: Pt(n) * (r / 100)
    };
  };
}
function gn(t, e, n) {
  function r(c) {
    c === void 0 && (c = 0);
    var f = e + c >= 1 ? e + c : 0;
    return t.el.getPointAtLength(f);
  }
  var i = St(t.el, t.svg), s = r(), a = r(-1), u = r(1), o = n ? 1 : i.w / i.vW, d = n ? 1 : i.h / i.vH;
  switch (t.property) {
    case "x":
      return (s.x - i.x) * o;
    case "y":
      return (s.y - i.y) * d;
    case "angle":
      return Math.atan2(u.y - a.y, u.x - a.x) * 180 / Math.PI;
  }
}
function it(t, e) {
  var n = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g, r = kt(p.pth(t) ? t.totalLength : t, e) + "";
  return {
    original: r,
    numbers: r.match(n) ? r.match(n).map(Number) : [0],
    strings: p.str(t) || e ? r.split(n) : []
  };
}
function Xe(t) {
  var e = t ? ke(p.arr(t) ? t.map(rt) : rt(t)) : [];
  return De(e, function(n, r, i) {
    return i.indexOf(n) === r;
  });
}
function Vt(t) {
  var e = Xe(t);
  return e.map(function(n, r) {
    return { target: n, id: r, total: e.length, transforms: { list: Dt(n) } };
  });
}
function vn(t, e) {
  var n = qe(e);
  if (/^spring/.test(n.easing) && (n.duration = Ot(n.easing)), p.arr(t)) {
    var r = t.length, i = r === 2 && !p.obj(t[0]);
    i ? t = { value: t } : p.fnc(e.duration) || (n.duration = e.duration / r);
  }
  var s = p.arr(t) ? t : [t];
  return s.map(function(a, u) {
    var o = p.obj(a) && !p.pth(a) ? a : { value: a };
    return p.und(o.delay) && (o.delay = u ? 0 : e.delay), p.und(o.endDelay) && (o.endDelay = u === s.length - 1 ? e.endDelay : 0), o;
  }).map(function(a) {
    return Le(a, n);
  });
}
function mn(t) {
  for (var e = De(ke(t.map(function(s) {
    return Object.keys(s);
  })), function(s) {
    return p.key(s);
  }).reduce(function(s, a) {
    return s.indexOf(a) < 0 && s.push(a), s;
  }, []), n = {}, r = function(s) {
    var a = e[s];
    n[a] = t.map(function(u) {
      var o = {};
      for (var d in u)
        p.key(d) ? d == a && (o.value = u[d]) : o[d] = u[d];
      return o;
    });
  }, i = 0; i < e.length; i++)
    r(i);
  return n;
}
function yn(t, e) {
  var n = [], r = e.keyframes;
  r && (e = Le(mn(r), e));
  for (var i in e)
    p.key(i) && n.push({
      name: i,
      tweens: vn(e[i], t)
    });
  return n;
}
function _n(t, e) {
  var n = {};
  for (var r in t) {
    var i = je(t[r], e);
    p.arr(i) && (i = i.map(function(s) {
      return je(s, e);
    }), i.length === 1 && (i = i[0])), n[r] = i;
  }
  return n.duration = parseFloat(n.duration), n.delay = parseFloat(n.delay), n;
}
function wn(t, e) {
  var n;
  return t.tweens.map(function(r) {
    var i = _n(r, e), s = i.value, a = p.arr(s) ? s[1] : s, u = ee(a), o = Ge(e.target, t.name, u, e), d = n ? n.to.original : o, c = p.arr(s) ? s[0] : d, f = ee(c) || ee(o), h = u || f;
    return p.und(a) && (a = d), i.from = it(c, h), i.to = it(Ze(a, c), h), i.start = n ? n.end : 0, i.end = i.start + i.delay + i.duration + i.endDelay, i.easing = Fe(i.easing, i.duration), i.isPath = p.pth(s), i.isPathTargetInsideSVG = i.isPath && p.svg(e.target), i.isColor = p.col(i.from.original), i.isColor && (i.round = 1), n = i, i;
  });
}
var Nt = {
  css: function(t, e, n) {
    return t.style[e] = n;
  },
  attribute: function(t, e, n) {
    return t.setAttribute(e, n);
  },
  object: function(t, e, n) {
    return t[e] = n;
  },
  transform: function(t, e, n, r, i) {
    if (r.list.set(e, n), e === r.last || i) {
      var s = "";
      r.list.forEach(function(a, u) {
        s += u + "(" + a + ") ";
      }), t.style.transform = s;
    }
  }
};
function $t(t, e) {
  var n = Vt(t);
  n.forEach(function(r) {
    for (var i in e) {
      var s = je(e[i], r), a = r.target, u = ee(s), o = Ge(a, i, u, r), d = u || ee(o), c = Ze(kt(s, d), o), f = We(a, i);
      Nt[f](a, i, c, r.transforms, !0);
    }
  });
}
function bn(t, e) {
  var n = We(t.target, e.name);
  if (n) {
    var r = wn(e, t), i = r[r.length - 1];
    return {
      type: n,
      property: e.name,
      animatable: t,
      tweens: r,
      duration: i.end,
      delay: r[0].delay,
      endDelay: i.endDelay
    };
  }
}
function En(t, e) {
  return De(ke(t.map(function(n) {
    return e.map(function(r) {
      return bn(n, r);
    });
  })), function(n) {
    return !p.und(n);
  });
}
function Ht(t, e) {
  var n = t.length, r = function(s) {
    return s.timelineOffset ? s.timelineOffset : 0;
  }, i = {};
  return i.duration = n ? Math.max.apply(Math, t.map(function(s) {
    return r(s) + s.duration;
  })) : e.duration, i.delay = n ? Math.min.apply(Math, t.map(function(s) {
    return r(s) + s.delay;
  })) : e.delay, i.endDelay = n ? i.duration - Math.max.apply(Math, t.map(function(s) {
    return r(s) + s.duration - s.endDelay;
  })) : e.endDelay, i;
}
var st = 0;
function Tn(t) {
  var e = He(xt, t), n = He(Ke, t), r = yn(n, t), i = Vt(t.targets), s = En(i, r), a = Ht(s, n), u = st;
  return st++, Le(e, {
    id: u,
    children: [],
    animatables: i,
    animations: s,
    duration: a.duration,
    delay: a.delay,
    endDelay: a.endDelay
  });
}
var W = [], jt = function() {
  var t;
  function e() {
    !t && (!ot() || !T.suspendWhenDocumentHidden) && W.length > 0 && (t = requestAnimationFrame(n));
  }
  function n(i) {
    for (var s = W.length, a = 0; a < s; ) {
      var u = W[a];
      u.paused ? (W.splice(a, 1), s--) : (u.tick(i), a++);
    }
    t = a > 0 ? requestAnimationFrame(n) : void 0;
  }
  function r() {
    !T.suspendWhenDocumentHidden || (ot() ? t = cancelAnimationFrame(t) : (W.forEach(
      function(i) {
        return i._onDocumentVisibility();
      }
    ), jt()));
  }
  return typeof document < "u" && document.addEventListener("visibilitychange", r), e;
}();
function ot() {
  return !!document && document.hidden;
}
function T(t) {
  t === void 0 && (t = {});
  var e = 0, n = 0, r = 0, i, s = 0, a = null;
  function u(y) {
    var m = window.Promise && new Promise(function(S) {
      return a = S;
    });
    return y.finished = m, m;
  }
  var o = Tn(t);
  u(o);
  function d() {
    var y = o.direction;
    y !== "alternate" && (o.direction = y !== "normal" ? "normal" : "reverse"), o.reversed = !o.reversed, i.forEach(function(m) {
      return m.reversed = o.reversed;
    });
  }
  function c(y) {
    return o.reversed ? o.duration - y : y;
  }
  function f() {
    e = 0, n = c(o.currentTime) * (1 / T.speed);
  }
  function h(y, m) {
    m && m.seek(y - m.timelineOffset);
  }
  function k(y) {
    if (o.reversePlayback)
      for (var S = s; S--; )
        h(y, i[S]);
    else
      for (var m = 0; m < s; m++)
        h(y, i[m]);
  }
  function w(y) {
    for (var m = 0, S = o.animations, q = S.length; m < q; ) {
      var O = S[m], C = O.animatable, G = O.tweens, g = G.length - 1, E = G[g];
      g && (E = De(G, function(ye) {
        return y < ye.end;
      })[0] || E);
      for (var J = Q(y - E.start - E.delay, 0, E.duration) / E.duration, se = isNaN(J) ? 1 : E.easing(J), K = E.to.strings, ge = E.round, ve = [], Ee = E.to.numbers.length, Y = void 0, te = 0; te < Ee; te++) {
        var B = void 0, Te = E.to.numbers[te], ce = E.from.numbers[te] || 0;
        E.isPath ? B = gn(E.value, se * Te, E.isPathTargetInsideSVG) : B = ce + se * (Te - ce), ge && (E.isColor && te > 2 || (B = Math.round(B * ge) / ge)), ve.push(B);
      }
      var ne = K.length;
      if (!ne)
        Y = ve[0];
      else {
        Y = K[0];
        for (var re = 0; re < ne; re++) {
          K[re];
          var me = K[re + 1], ue = ve[re];
          isNaN(ue) || (me ? Y += ue + me : Y += ue + " ");
        }
      }
      Nt[O.type](C.target, O.property, Y, C.transforms), O.currentValue = Y, m++;
    }
  }
  function v(y) {
    o[y] && !o.passThrough && o[y](o);
  }
  function I() {
    o.remaining && o.remaining !== !0 && o.remaining--;
  }
  function x(y) {
    var m = o.duration, S = o.delay, q = m - o.endDelay, O = c(y);
    o.progress = Q(O / m * 100, 0, 100), o.reversePlayback = O < o.currentTime, i && k(O), !o.began && o.currentTime > 0 && (o.began = !0, v("begin")), !o.loopBegan && o.currentTime > 0 && (o.loopBegan = !0, v("loopBegin")), O <= S && o.currentTime !== 0 && w(0), (O >= q && o.currentTime !== m || !m) && w(m), O > S && O < q ? (o.changeBegan || (o.changeBegan = !0, o.changeCompleted = !1, v("changeBegin")), v("change"), w(O)) : o.changeBegan && (o.changeCompleted = !0, o.changeBegan = !1, v("changeComplete")), o.currentTime = Q(O, 0, m), o.began && v("update"), y >= m && (n = 0, I(), o.remaining ? (e = r, v("loopComplete"), o.loopBegan = !1, o.direction === "alternate" && d()) : (o.paused = !0, o.completed || (o.completed = !0, v("loopComplete"), v("complete"), !o.passThrough && "Promise" in window && (a(), u(o)))));
  }
  return o.reset = function() {
    var y = o.direction;
    o.passThrough = !1, o.currentTime = 0, o.progress = 0, o.paused = !0, o.began = !1, o.loopBegan = !1, o.changeBegan = !1, o.completed = !1, o.changeCompleted = !1, o.reversePlayback = !1, o.reversed = y === "reverse", o.remaining = o.loop, i = o.children, s = i.length;
    for (var m = s; m--; )
      o.children[m].reset();
    (o.reversed && o.loop !== !0 || y === "alternate" && o.loop === 1) && o.remaining++, w(o.reversed ? o.duration : 0);
  }, o._onDocumentVisibility = f, o.set = function(y, m) {
    return $t(y, m), o;
  }, o.tick = function(y) {
    r = y, e || (e = r), x((r + (n - e)) * T.speed);
  }, o.seek = function(y) {
    x(c(y));
  }, o.pause = function() {
    o.paused = !0, f();
  }, o.play = function() {
    !o.paused || (o.completed && o.reset(), o.paused = !1, W.push(o), f(), jt());
  }, o.reverse = function() {
    d(), o.completed = !o.reversed, f();
  }, o.restart = function() {
    o.reset(), o.play();
  }, o.remove = function(y) {
    var m = Xe(y);
    Rt(m, o);
  }, o.reset(), o.autoplay && o.play(), o;
}
function at(t, e) {
  for (var n = e.length; n--; )
    Ye(t, e[n].animatable.target) && e.splice(n, 1);
}
function Rt(t, e) {
  var n = e.animations, r = e.children;
  at(t, n);
  for (var i = r.length; i--; ) {
    var s = r[i], a = s.animations;
    at(t, a), !a.length && !s.children.length && r.splice(i, 1);
  }
  !n.length && !r.length && e.pause();
}
function xn(t) {
  for (var e = Xe(t), n = W.length; n--; ) {
    var r = W[n];
    Rt(e, r);
  }
}
function In(t, e) {
  e === void 0 && (e = {});
  var n = e.direction || "normal", r = e.easing ? Fe(e.easing) : null, i = e.grid, s = e.axis, a = e.from || 0, u = a === "first", o = a === "center", d = a === "last", c = p.arr(t), f = parseFloat(c ? t[0] : t), h = c ? parseFloat(t[1]) : 0, k = ee(c ? t[1] : t) || 0, w = e.start || 0 + (c ? f : 0), v = [], I = 0;
  return function(x, y, m) {
    if (u && (a = 0), o && (a = (m - 1) / 2), d && (a = m - 1), !v.length) {
      for (var S = 0; S < m; S++) {
        if (!i)
          v.push(Math.abs(a - S));
        else {
          var q = o ? (i[0] - 1) / 2 : a % i[0], O = o ? (i[1] - 1) / 2 : Math.floor(a / i[0]), C = S % i[0], G = Math.floor(S / i[0]), g = q - C, E = O - G, J = Math.sqrt(g * g + E * E);
          s === "x" && (J = -g), s === "y" && (J = -E), v.push(J);
        }
        I = Math.max.apply(Math, v);
      }
      r && (v = v.map(function(K) {
        return r(K / I) * I;
      })), n === "reverse" && (v = v.map(function(K) {
        return s ? K < 0 ? K * -1 : -K : Math.abs(I - K);
      }));
    }
    var se = c ? (h - f) / I : f;
    return w + se * (Math.round(v[y] * 100) / 100) + k;
  };
}
function On(t) {
  t === void 0 && (t = {});
  var e = T(t);
  return e.duration = 0, e.add = function(n, r) {
    var i = W.indexOf(e), s = e.children;
    i > -1 && W.splice(i, 1);
    function a(h) {
      h.passThrough = !0;
    }
    for (var u = 0; u < s.length; u++)
      a(s[u]);
    var o = Le(n, He(Ke, t));
    o.targets = o.targets || t.targets;
    var d = e.duration;
    o.autoplay = !1, o.direction = e.direction, o.timelineOffset = p.und(r) ? d : Ze(r, d), a(e), e.seek(o.timelineOffset);
    var c = T(o);
    a(c), s.push(c);
    var f = Ht(s, t);
    return e.delay = f.delay, e.endDelay = f.endDelay, e.duration = f.duration, e.seek(0), e.reset(), e.autoplay && e.play(), e;
  }, e;
}
T.version = "3.2.1";
T.speed = 1;
T.suspendWhenDocumentHidden = !0;
T.running = W;
T.remove = xn;
T.get = Ge;
T.set = $t;
T.convertPx = ze;
T.path = pn;
T.setDashoffset = dn;
T.stagger = In;
T.timeline = On;
T.easing = Fe;
T.penner = Ct;
T.random = function(t, e) {
  return Math.floor(Math.random() * (e - t + 1)) + t;
};
function Cn(t, e, n) {
  return Math.max(e, Math.min(t, n));
}
const L = {
  toVector(t, e) {
    return t === void 0 && (t = e), Array.isArray(t) ? t : [t, t];
  },
  add(t, e) {
    return [t[0] + e[0], t[1] + e[1]];
  },
  sub(t, e) {
    return [t[0] - e[0], t[1] - e[1]];
  },
  addTo(t, e) {
    t[0] += e[0], t[1] += e[1];
  },
  subTo(t, e) {
    t[0] -= e[0], t[1] -= e[1];
  }
};
function ct(t, e, n) {
  return e === 0 || Math.abs(e) === 1 / 0 ? Math.pow(t, n * 5) : t * e * n / (e + n * t);
}
function ut(t, e, n, r = 0.15) {
  return r === 0 ? Cn(t, e, n) : t < e ? -ct(e - t, n - e, r) + e : t > n ? +ct(t - n, n - e, r) + n : t;
}
function An(t, [e, n], [r, i]) {
  const [[s, a], [u, o]] = t;
  return [ut(e, s, a, r), ut(n, u, o, i)];
}
function H(t, e, n) {
  return e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function lt(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    e && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function N(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? lt(Object(n), !0).forEach(function(r) {
      H(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : lt(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
const Ut = {
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
function ft(t) {
  return t ? t[0].toUpperCase() + t.slice(1) : "";
}
const Mn = ["enter", "leave"];
function Dn(t = !1, e) {
  return t && !Mn.includes(e);
}
function kn(t, e = "", n = !1) {
  const r = Ut[t], i = r && r[e] || e;
  return "on" + ft(t) + ft(i) + (Dn(n, i) ? "Capture" : "");
}
const Ln = ["gotpointercapture", "lostpointercapture"];
function Pn(t) {
  let e = t.substring(2).toLowerCase();
  const n = !!~e.indexOf("passive");
  n && (e = e.replace("passive", ""));
  const r = Ln.includes(e) ? "capturecapture" : "capture", i = !!~e.indexOf(r);
  return i && (e = e.replace("capture", "")), {
    device: e,
    capture: i,
    passive: n
  };
}
function Sn(t, e = "") {
  const n = Ut[t], r = n && n[e] || e;
  return t + r;
}
function Pe(t) {
  return "touches" in t;
}
function Kt(t) {
  return Pe(t) ? "touch" : "pointerType" in t ? t.pointerType : "mouse";
}
function Vn(t) {
  return Array.from(t.touches).filter((e) => {
    var n, r;
    return e.target === t.currentTarget || ((n = t.currentTarget) === null || n === void 0 || (r = n.contains) === null || r === void 0 ? void 0 : r.call(n, e.target));
  });
}
function Nn(t) {
  return t.type === "touchend" || t.type === "touchcancel" ? t.changedTouches : t.targetTouches;
}
function Ft(t) {
  return Pe(t) ? Nn(t)[0] : t;
}
function Re(t, e) {
  const n = e.clientX - t.clientX, r = e.clientY - t.clientY, i = (e.clientX + t.clientX) / 2, s = (e.clientY + t.clientY) / 2, a = Math.hypot(n, r);
  return {
    angle: -(Math.atan2(n, r) * 180) / Math.PI,
    distance: a,
    origin: [i, s]
  };
}
function $n(t) {
  return Vn(t).map((e) => e.identifier);
}
function dt(t, e) {
  const [n, r] = Array.from(t.touches).filter((i) => e.includes(i.identifier));
  return Re(n, r);
}
function Ne(t) {
  const e = Ft(t);
  return Pe(t) ? e.identifier : e.pointerId;
}
function pe(t) {
  const e = Ft(t);
  return [e.clientX, e.clientY];
}
const ht = 40, pt = 800;
function Yt(t) {
  let {
    deltaX: e,
    deltaY: n,
    deltaMode: r
  } = t;
  return r === 1 ? (e *= ht, n *= ht) : r === 2 && (e *= pt, n *= pt), [e, n];
}
function Hn(t) {
  var e, n;
  const {
    scrollX: r,
    scrollY: i,
    scrollLeft: s,
    scrollTop: a
  } = t.currentTarget;
  return [(e = r != null ? r : s) !== null && e !== void 0 ? e : 0, (n = i != null ? i : a) !== null && n !== void 0 ? n : 0];
}
function jn(t) {
  const e = {};
  if ("buttons" in t && (e.buttons = t.buttons), "shiftKey" in t) {
    const {
      shiftKey: n,
      altKey: r,
      metaKey: i,
      ctrlKey: s
    } = t;
    Object.assign(e, {
      shiftKey: n,
      altKey: r,
      metaKey: i,
      ctrlKey: s
    });
  }
  return e;
}
function Me(t, ...e) {
  return typeof t == "function" ? t(...e) : t;
}
function Rn() {
}
function Un(...t) {
  return t.length === 0 ? Rn : t.length === 1 ? t[0] : function() {
    let e;
    for (const n of t)
      e = n.apply(this, arguments) || e;
    return e;
  };
}
function gt(t, e) {
  return Object.assign({}, e, t || {});
}
const Kn = 32;
class qt {
  constructor(e, n, r) {
    this.ctrl = e, this.args = n, this.key = r, this.state || (this.state = {}, this.computeValues([0, 0]), this.computeInitial(), this.init && this.init(), this.reset());
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
      shared: n,
      ingKey: r,
      args: i
    } = this;
    n[r] = e._active = e.active = e._blocked = e._force = !1, e._step = [!1, !1], e.intentional = !1, e._movement = [0, 0], e._distance = [0, 0], e._direction = [0, 0], e._delta = [0, 0], e._bounds = [[-1 / 0, 1 / 0], [-1 / 0, 1 / 0]], e.args = i, e.axis = void 0, e.memo = void 0, e.elapsedTime = 0, e.direction = [0, 0], e.distance = [0, 0], e.overflow = [0, 0], e._movementBound = [!1, !1], e.velocity = [0, 0], e.movement = [0, 0], e.delta = [0, 0], e.timeStamp = 0;
  }
  start(e) {
    const n = this.state, r = this.config;
    n._active || (this.reset(), this.computeInitial(), n._active = !0, n.target = e.target, n.currentTarget = e.currentTarget, n.lastOffset = r.from ? Me(r.from, n) : n.offset, n.offset = n.lastOffset), n.startTime = n.timeStamp = e.timeStamp;
  }
  computeValues(e) {
    const n = this.state;
    n._values = e, n.values = this.config.transform(e);
  }
  computeInitial() {
    const e = this.state;
    e._initial = e._values, e.initial = e.values;
  }
  compute(e) {
    const {
      state: n,
      config: r,
      shared: i
    } = this;
    n.args = this.args;
    let s = 0;
    if (e && (n.event = e, r.preventDefault && e.cancelable && n.event.preventDefault(), n.type = e.type, i.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size, i.locked = !!document.pointerLockElement, Object.assign(i, jn(e)), i.down = i.pressed = i.buttons % 2 === 1 || i.touches > 0, s = e.timeStamp - n.timeStamp, n.timeStamp = e.timeStamp, n.elapsedTime = n.timeStamp - n.startTime), n._active) {
      const O = n._delta.map(Math.abs);
      L.addTo(n._distance, O);
    }
    this.axisIntent && this.axisIntent(e);
    const [a, u] = n._movement, [o, d] = r.threshold, {
      _step: c,
      values: f
    } = n;
    if (r.hasCustomTransform ? (c[0] === !1 && (c[0] = Math.abs(a) >= o && f[0]), c[1] === !1 && (c[1] = Math.abs(u) >= d && f[1])) : (c[0] === !1 && (c[0] = Math.abs(a) >= o && Math.sign(a) * o), c[1] === !1 && (c[1] = Math.abs(u) >= d && Math.sign(u) * d)), n.intentional = c[0] !== !1 || c[1] !== !1, !n.intentional)
      return;
    const h = [0, 0];
    if (r.hasCustomTransform) {
      const [O, C] = f;
      h[0] = c[0] !== !1 ? O - c[0] : 0, h[1] = c[1] !== !1 ? C - c[1] : 0;
    } else
      h[0] = c[0] !== !1 ? a - c[0] : 0, h[1] = c[1] !== !1 ? u - c[1] : 0;
    this.restrictToAxis && !n._blocked && this.restrictToAxis(h);
    const k = n.offset, w = n._active && !n._blocked || n.active;
    w && (n.first = n._active && !n.active, n.last = !n._active && n.active, n.active = i[this.ingKey] = n._active, e && (n.first && ("bounds" in r && (n._bounds = Me(r.bounds, n)), this.setup && this.setup()), n.movement = h, this.computeOffset()));
    const [v, I] = n.offset, [[x, y], [m, S]] = n._bounds;
    n.overflow = [v < x ? -1 : v > y ? 1 : 0, I < m ? -1 : I > S ? 1 : 0], n._movementBound[0] = n.overflow[0] ? n._movementBound[0] === !1 ? n._movement[0] : n._movementBound[0] : !1, n._movementBound[1] = n.overflow[1] ? n._movementBound[1] === !1 ? n._movement[1] : n._movementBound[1] : !1;
    const q = n._active ? r.rubberband || [0, 0] : [0, 0];
    if (n.offset = An(n._bounds, n.offset, q), n.delta = L.sub(n.offset, k), this.computeMovement(), w && (!n.last || s > Kn)) {
      n.delta = L.sub(n.offset, k);
      const O = n.delta.map(Math.abs);
      L.addTo(n.distance, O), n.direction = n.delta.map(Math.sign), n._direction = n._delta.map(Math.sign), !n.first && s > 0 && (n.velocity = [O[0] / s, O[1] / s]);
    }
  }
  emit() {
    const e = this.state, n = this.shared, r = this.config;
    if (e._active || this.clean(), (e._blocked || !e.intentional) && !e._force && !r.triggerAllEvents)
      return;
    const i = this.handler(N(N(N({}, n), e), {}, {
      [this.aliasKey]: e.values
    }));
    i !== void 0 && (e.memo = i);
  }
  clean() {
    this.eventStore.clean(), this.timeoutStore.clean();
  }
}
function Fn([t, e], n) {
  const r = Math.abs(t), i = Math.abs(e);
  if (r > i && r > n)
    return "x";
  if (i > r && i > n)
    return "y";
}
class we extends qt {
  constructor(...e) {
    super(...e), H(this, "aliasKey", "xy");
  }
  reset() {
    super.reset(), this.state.axis = void 0;
  }
  init() {
    this.state.offset = [0, 0], this.state.lastOffset = [0, 0];
  }
  computeOffset() {
    this.state.offset = L.add(this.state.lastOffset, this.state.movement);
  }
  computeMovement() {
    this.state.movement = L.sub(this.state.offset, this.state.lastOffset);
  }
  axisIntent(e) {
    const n = this.state, r = this.config;
    if (!n.axis && e) {
      const i = typeof r.axisThreshold == "object" ? r.axisThreshold[Kt(e)] : r.axisThreshold;
      n.axis = Fn(n._movement, i);
    }
    n._blocked = (r.lockDirection || !!r.axis) && !n.axis || !!r.axis && r.axis !== n.axis;
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
const vt = (t) => t, mt = 0.15, Je = {
  enabled(t = !0) {
    return t;
  },
  eventOptions(t, e, n) {
    return N(N({}, n.shared.eventOptions), t);
  },
  preventDefault(t = !1) {
    return t;
  },
  triggerAllEvents(t = !1) {
    return t;
  },
  rubberband(t = 0) {
    switch (t) {
      case !0:
        return [mt, mt];
      case !1:
        return [0, 0];
      default:
        return L.toVector(t);
    }
  },
  from(t) {
    if (typeof t == "function")
      return t;
    if (t != null)
      return L.toVector(t);
  },
  transform(t, e, n) {
    const r = t || n.shared.transform;
    if (this.hasCustomTransform = !!r, process.env.NODE_ENV === "development") {
      const i = r || vt;
      return (s) => {
        const a = i(s);
        return (!isFinite(a[0]) || !isFinite(a[1])) && console.warn(`[@use-gesture]: config.transform() must produce a valid result, but it was: [${a[0]},${[1]}]`), a;
      };
    }
    return r || vt;
  },
  threshold(t) {
    return L.toVector(t, 0);
  }
};
process.env.NODE_ENV === "development" && Object.assign(Je, {
  domTarget(t) {
    if (t !== void 0)
      throw Error("[@use-gesture]: `domTarget` option has been renamed to `target`.");
    return NaN;
  },
  lockDirection(t) {
    if (t !== void 0)
      throw Error("[@use-gesture]: `lockDirection` option has been merged with `axis`. Use it as in `{ axis: 'lock' }`");
    return NaN;
  },
  initial(t) {
    if (t !== void 0)
      throw Error("[@use-gesture]: `initial` option has been renamed to `from`.");
    return NaN;
  }
});
const Yn = 0, ae = N(N({}, Je), {}, {
  axis(t, e, {
    axis: n
  }) {
    if (this.lockDirection = n === "lock", !this.lockDirection)
      return n;
  },
  axisThreshold(t = Yn) {
    return t;
  },
  bounds(t = {}) {
    if (typeof t == "function")
      return (s) => ae.bounds(t(s));
    if ("current" in t)
      return () => t.current;
    if (typeof HTMLElement == "function" && t instanceof HTMLElement)
      return t;
    const {
      left: e = -1 / 0,
      right: n = 1 / 0,
      top: r = -1 / 0,
      bottom: i = 1 / 0
    } = t;
    return [[e, n], [r, i]];
  }
}), Ie = 10, yt = {
  ArrowRight: (t = 1) => [Ie * t, 0],
  ArrowLeft: (t = 1) => [-Ie * t, 0],
  ArrowUp: (t = 1) => [0, -Ie * t],
  ArrowDown: (t = 1) => [0, Ie * t]
};
class qn extends we {
  constructor(...e) {
    super(...e), H(this, "ingKey", "dragging");
  }
  reset() {
    super.reset();
    const e = this.state;
    e._pointerId = void 0, e._pointerActive = !1, e._keyboardActive = !1, e._preventScroll = !1, e._delayed = !1, e.swipe = [0, 0], e.tap = !1, e.canceled = !1, e.cancel = this.cancel.bind(this);
  }
  setup() {
    const e = this.state;
    if (e._bounds instanceof HTMLElement) {
      const n = e._bounds.getBoundingClientRect(), r = e.currentTarget.getBoundingClientRect(), i = {
        left: n.left - r.left + e.offset[0],
        right: n.right - r.right + e.offset[0],
        top: n.top - r.top + e.offset[1],
        bottom: n.bottom - r.bottom + e.offset[1]
      };
      e._bounds = ae.bounds(i);
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
    const n = this.config, r = this.state;
    if (e.buttons != null && (Array.isArray(n.pointerButtons) ? !n.pointerButtons.includes(e.buttons) : n.pointerButtons !== -1 && n.pointerButtons !== e.buttons))
      return;
    const i = this.ctrl.setEventIds(e);
    n.pointerCapture && e.target.setPointerCapture(e.pointerId), !(i && i.size > 1 && r._pointerActive) && (this.start(e), this.setupPointer(e), r._pointerId = Ne(e), r._pointerActive = !0, this.computeValues(pe(e)), this.computeInitial(), n.preventScrollAxis && Kt(e) !== "mouse" ? (r._active = !1, this.setupScrollPrevention(e)) : n.delay > 0 ? (this.setupDelayTrigger(e), n.triggerAllEvents && (this.compute(e), this.emit())) : this.startPointerDrag(e));
  }
  startPointerDrag(e) {
    const n = this.state;
    n._active = !0, n._preventScroll = !0, n._delayed = !1, this.compute(e), this.emit();
  }
  pointerMove(e) {
    const n = this.state, r = this.config;
    if (!n._pointerActive || n.type === e.type && e.timeStamp === n.timeStamp)
      return;
    const i = Ne(e);
    if (n._pointerId !== void 0 && i !== n._pointerId)
      return;
    const s = pe(e);
    if (document.pointerLockElement === e.target ? n._delta = [e.movementX, e.movementY] : (n._delta = L.sub(s, n._values), this.computeValues(s)), L.addTo(n._movement, n._delta), this.compute(e), n._delayed && n.intentional) {
      this.timeoutStore.remove("dragDelay"), n.active = !1, this.startPointerDrag(e);
      return;
    }
    if (r.preventScrollAxis && !n._preventScroll)
      if (n.axis)
        if (n.axis === r.preventScrollAxis || r.preventScrollAxis === "xy") {
          n._active = !1, this.clean();
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
    const n = this.state, r = this.config;
    if (!n._active || !n._pointerActive)
      return;
    const i = Ne(e);
    if (n._pointerId !== void 0 && i !== n._pointerId)
      return;
    this.state._pointerActive = !1, this.setActive(), this.compute(e);
    const [s, a] = n._distance;
    if (n.tap = s <= r.tapsThreshold && a <= r.tapsThreshold, n.tap && r.filterTaps)
      n._force = !0;
    else {
      const [u, o] = n.direction, [d, c] = n.velocity, [f, h] = n.movement, [k, w] = r.swipe.velocity, [v, I] = r.swipe.distance, x = r.swipe.duration;
      n.elapsedTime < x && (Math.abs(d) > k && Math.abs(f) > v && (n.swipe[0] = u), Math.abs(c) > w && Math.abs(h) > I && (n.swipe[1] = o));
    }
    this.emit();
  }
  pointerClick(e) {
    !this.state.tap && e.detail > 0 && (e.preventDefault(), e.stopPropagation());
  }
  setupPointer(e) {
    const n = this.config, r = n.device;
    if (process.env.NODE_ENV === "development")
      try {
        if (r === "pointer" && n.preventScrollDelay === void 0) {
          const i = "uv" in e ? e.sourceEvent.currentTarget : e.currentTarget;
          window.getComputedStyle(i).touchAction === "auto" && console.warn("[@use-gesture]: The drag target has its `touch-action` style property set to `auto`. It is recommended to add `touch-action: 'none'` so that the drag gesture behaves correctly on touch-enabled devices. For more information read this: https://use-gesture.netlify.app/docs/extras/#touch-action.\n\nThis message will only show in development mode. It won't appear in production. If this is intended, you can ignore it.", i);
        }
      } catch {
      }
    n.pointerLock && e.currentTarget.requestPointerLock(), n.pointerCapture || (this.eventStore.add(this.sharedConfig.window, r, "change", this.pointerMove.bind(this)), this.eventStore.add(this.sharedConfig.window, r, "end", this.pointerUp.bind(this)), this.eventStore.add(this.sharedConfig.window, r, "cancel", this.pointerUp.bind(this)));
  }
  pointerClean() {
    this.config.pointerLock && document.pointerLockElement === this.state.currentTarget && document.exitPointerLock();
  }
  preventScroll(e) {
    this.state._preventScroll && e.cancelable && e.preventDefault();
  }
  setupScrollPrevention(e) {
    this.state._preventScroll = !1, zn(e);
    const n = this.eventStore.add(this.sharedConfig.window, "touch", "change", this.preventScroll.bind(this), {
      passive: !1
    });
    this.eventStore.add(this.sharedConfig.window, "touch", "end", n), this.eventStore.add(this.sharedConfig.window, "touch", "cancel", n), this.timeoutStore.add("startPointerDrag", this.startPointerDrag.bind(this), this.config.preventScrollDelay, e);
  }
  setupDelayTrigger(e) {
    this.state._delayed = !0, this.timeoutStore.add("dragDelay", () => {
      this.state._step = [0, 0], this.startPointerDrag(e);
    }, this.config.delay);
  }
  keyDown(e) {
    const n = yt[e.key];
    if (n) {
      const r = this.state, i = e.shiftKey ? 10 : e.altKey ? 0.1 : 1;
      this.start(e), r._delta = n(i), r._keyboardActive = !0, L.addTo(r._movement, r._delta), this.compute(e), this.emit();
    }
  }
  keyUp(e) {
    e.key in yt && (this.state._keyboardActive = !1, this.setActive(), this.compute(e), this.emit());
  }
  bind(e) {
    const n = this.config.device;
    e(n, "start", this.pointerDown.bind(this)), this.config.pointerCapture && (e(n, "change", this.pointerMove.bind(this)), e(n, "end", this.pointerUp.bind(this)), e(n, "cancel", this.pointerUp.bind(this)), e("lostPointerCapture", "", this.pointerUp.bind(this))), this.config.keys && (e("key", "down", this.keyDown.bind(this)), e("key", "up", this.keyUp.bind(this))), this.config.filterTaps && e("click", "", this.pointerClick.bind(this), {
      capture: !0,
      passive: !1
    });
  }
}
function zn(t) {
  "persist" in t && typeof t.persist == "function" && t.persist();
}
const be = typeof window < "u" && window.document && window.document.createElement;
function Wn() {
  return be && "ontouchstart" in window;
}
function _t() {
  return Wn() || be && window.navigator.maxTouchPoints > 1;
}
function Gn() {
  return be && "onpointerdown" in window;
}
function Zn() {
  return be && "exitPointerLock" in window.document;
}
function Qn() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const z = {
  isBrowser: be,
  gesture: Qn(),
  touch: _t(),
  touchscreen: _t(),
  pointer: Gn(),
  pointerLock: Zn()
}, Xn = 250, Jn = 180, Bn = 0.5, er = 50, tr = 250, wt = {
  mouse: 0,
  touch: 0,
  pen: 8
}, zt = N(N({}, ae), {}, {
  device(t, e, {
    pointer: {
      touch: n = !1,
      lock: r = !1,
      mouse: i = !1
    } = {}
  }) {
    return this.pointerLock = r && z.pointerLock, z.touch && n ? "touch" : this.pointerLock ? "mouse" : z.pointer && !i ? "pointer" : z.touch ? "touch" : "mouse";
  },
  preventScrollAxis(t, e, {
    preventScroll: n
  }) {
    if (this.preventScrollDelay = typeof n == "number" ? n : n || n === void 0 && t ? Xn : void 0, !(!z.touchscreen || n === !1))
      return t || (n !== void 0 ? "y" : void 0);
  },
  pointerCapture(t, e, {
    pointer: {
      capture: n = !0,
      buttons: r = 1
    } = {}
  }) {
    return this.pointerButtons = r, !this.pointerLock && this.device === "pointer" && n;
  },
  keys(t = !0) {
    return t;
  },
  threshold(t, e, {
    filterTaps: n = !1,
    tapsThreshold: r = 3,
    axis: i = void 0
  }) {
    const s = L.toVector(t, n ? r : i ? 1 : 0);
    return this.filterTaps = n, this.tapsThreshold = r, s;
  },
  swipe({
    velocity: t = Bn,
    distance: e = er,
    duration: n = tr
  } = {}) {
    return {
      velocity: this.transform(L.toVector(t)),
      distance: this.transform(L.toVector(e)),
      duration: n
    };
  },
  delay(t = 0) {
    switch (t) {
      case !0:
        return Jn;
      case !1:
        return 0;
      default:
        return t;
    }
  },
  axisThreshold(t) {
    return t ? N(N({}, wt), t) : wt;
  }
});
process.env.NODE_ENV === "development" && Object.assign(zt, {
  useTouch(t) {
    if (t !== void 0)
      throw Error("[@use-gesture]: `useTouch` option has been renamed to `pointer.touch`. Use it as in `{ pointer: { touch: true } }`.");
    return NaN;
  },
  experimental_preventWindowScrollY(t) {
    if (t !== void 0)
      throw Error("[@use-gesture]: `experimental_preventWindowScrollY` option has been renamed to `preventScroll`.");
    return NaN;
  },
  swipeVelocity(t) {
    if (t !== void 0)
      throw Error("[@use-gesture]: `swipeVelocity` option has been renamed to `swipe.velocity`. Use it as in `{ swipe: { velocity: 0.5 } }`.");
    return NaN;
  },
  swipeDistance(t) {
    if (t !== void 0)
      throw Error("[@use-gesture]: `swipeDistance` option has been renamed to `swipe.distance`. Use it as in `{ swipe: { distance: 50 } }`.");
    return NaN;
  },
  swipeDuration(t) {
    if (t !== void 0)
      throw Error("[@use-gesture]: `swipeDuration` option has been renamed to `swipe.duration`. Use it as in `{ swipe: { duration: 250 } }`.");
    return NaN;
  }
});
function Wt(t) {
  const [e, n] = t.overflow, [r, i] = t._delta, [s, a] = t._direction;
  (e < 0 && r > 0 && s < 0 || e > 0 && r < 0 && s > 0) && (t._movement[0] = t._movementBound[0]), (n < 0 && i > 0 && a < 0 || n > 0 && i < 0 && a > 0) && (t._movement[1] = t._movementBound[1]);
}
const nr = 30, rr = 100;
class ir extends qt {
  constructor(...e) {
    super(...e), H(this, "ingKey", "pinching"), H(this, "aliasKey", "da");
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
      movement: n,
      lastOffset: r
    } = this.state;
    e === "wheel" ? this.state.offset = L.add(n, r) : this.state.offset = [(1 + n[0]) * r[0], n[1] + r[1]];
  }
  computeMovement() {
    const {
      offset: e,
      lastOffset: n
    } = this.state;
    this.state.movement = [e[0] / n[0], e[1] - n[1]];
  }
  axisIntent() {
    const e = this.state, [n, r] = e._movement;
    if (!e.axis) {
      const i = Math.abs(n) * nr - Math.abs(r);
      i < 0 ? e.axis = "angle" : i > 0 && (e.axis = "scale");
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
    const n = this.state, r = this.ctrl.touchIds;
    if (n._active && n._touchIds.every((s) => r.has(s)) || r.size < 2)
      return;
    this.start(e), n._touchIds = Array.from(r).slice(0, 2);
    const i = dt(e, n._touchIds);
    this.pinchStart(e, i);
  }
  pointerStart(e) {
    if (e.buttons != null && e.buttons % 2 !== 1)
      return;
    this.ctrl.setEventIds(e), e.target.setPointerCapture(e.pointerId);
    const n = this.state, r = n._pointerEvents, i = this.ctrl.pointerIds;
    if (n._active && Array.from(r.keys()).every((a) => i.has(a)) || (r.size < 2 && r.set(e.pointerId, e), n._pointerEvents.size < 2))
      return;
    this.start(e);
    const s = Re(...Array.from(r.values()));
    this.pinchStart(e, s);
  }
  pinchStart(e, n) {
    const r = this.state;
    r.origin = n.origin, this.computeValues([n.distance, n.angle]), this.computeInitial(), this.compute(e), this.emit();
  }
  touchMove(e) {
    if (!this.state._active)
      return;
    const n = dt(e, this.state._touchIds);
    this.pinchMove(e, n);
  }
  pointerMove(e) {
    const n = this.state._pointerEvents;
    if (n.has(e.pointerId) && n.set(e.pointerId, e), !this.state._active)
      return;
    const r = Re(...Array.from(n.values()));
    this.pinchMove(e, r);
  }
  pinchMove(e, n) {
    const r = this.state, i = r._values[1], s = n.angle - i;
    let a = 0;
    Math.abs(s) > 270 && (a += Math.sign(s)), this.computeValues([n.distance, n.angle - 360 * a]), r.origin = n.origin, r.turns = a, r._movement = [r._values[0] / r._initial[0] - 1, r._values[1] - r._initial[1]], this.compute(e), this.emit();
  }
  touchEnd(e) {
    this.ctrl.setEventIds(e), !!this.state._active && this.state._touchIds.some((n) => !this.ctrl.touchIds.has(n)) && (this.state._active = !1, this.compute(e), this.emit());
  }
  pointerEnd(e) {
    const n = this.state;
    this.ctrl.setEventIds(e);
    try {
      e.target.releasePointerCapture(e.pointerId);
    } catch {
    }
    n._pointerEvents.has(e.pointerId) && n._pointerEvents.delete(e.pointerId), !!n._active && n._pointerEvents.size < 2 && (n._active = !1, this.compute(e), this.emit());
  }
  gestureStart(e) {
    e.cancelable && e.preventDefault();
    const n = this.state;
    n._active || (this.start(e), this.computeValues([e.scale, e.rotation]), n.origin = [e.clientX, e.clientY], this.compute(e), this.emit());
  }
  gestureMove(e) {
    if (e.cancelable && e.preventDefault(), !this.state._active)
      return;
    const n = this.state;
    this.computeValues([e.scale, e.rotation]), n.origin = [e.clientX, e.clientY];
    const r = n._movement;
    n._movement = [e.scale - 1, e.rotation], n._delta = L.sub(n._movement, r), this.compute(e), this.emit();
  }
  gestureEnd(e) {
    !this.state._active || (this.state._active = !1, this.compute(e), this.emit());
  }
  wheel(e) {
    const n = this.config.modifierKey;
    n && !e[n] || (this.state._active ? this.wheelChange(e) : this.wheelStart(e), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this)));
  }
  wheelStart(e) {
    this.start(e), this.wheelChange(e);
  }
  wheelChange(e) {
    "uv" in e || (e.cancelable && e.preventDefault(), process.env.NODE_ENV === "development" && !e.defaultPrevented && console.warn("[@use-gesture]: To properly support zoom on trackpads, try using the `target` option.\n\nThis message will only appear in development mode."));
    const r = this.state;
    r._delta = [-Yt(e)[1] / rr * r.offset[0], 0], L.addTo(r._movement, r._delta), Wt(r), this.state.origin = [e.clientX, e.clientY], this.compute(e), this.emit();
  }
  wheelEnd() {
    !this.state._active || (this.state._active = !1, this.compute(), this.emit());
  }
  bind(e) {
    const n = this.config.device;
    n && (e(n, "start", this[n + "Start"].bind(this)), e(n, "change", this[n + "Move"].bind(this)), e(n, "end", this[n + "End"].bind(this)), e(n, "cancel", this[n + "End"].bind(this))), this.config.pinchOnWheel && e("wheel", "", this.wheel.bind(this), {
      passive: !1
    });
  }
}
const sr = N(N({}, Je), {}, {
  device(t, e, {
    shared: n,
    pointer: {
      touch: r = !1
    } = {}
  }) {
    if (n.target && !z.touch && z.gesture)
      return "gesture";
    if (z.touch && r)
      return "touch";
    if (z.touchscreen) {
      if (z.pointer)
        return "pointer";
      if (z.touch)
        return "touch";
    }
  },
  bounds(t, e, {
    scaleBounds: n = {},
    angleBounds: r = {}
  }) {
    const i = (a) => {
      const u = gt(Me(n, a), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [u.min, u.max];
    }, s = (a) => {
      const u = gt(Me(r, a), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [u.min, u.max];
    };
    return typeof n != "function" && typeof r != "function" ? [i(), s()] : (a) => [i(a), s(a)];
  },
  threshold(t, e, n) {
    return this.lockDirection = n.axis === "lock", L.toVector(t, this.lockDirection ? [0.1, 3] : 0);
  },
  modifierKey(t) {
    return t === void 0 ? "ctrlKey" : t;
  },
  pinchOnWheel(t = !0) {
    return t;
  }
});
class or extends we {
  constructor(...e) {
    super(...e), H(this, "ingKey", "moving");
  }
  move(e) {
    this.config.mouseOnly && e.pointerType !== "mouse" || (this.state._active ? this.moveChange(e) : this.moveStart(e), this.timeoutStore.add("moveEnd", this.moveEnd.bind(this)));
  }
  moveStart(e) {
    this.start(e), this.computeValues(pe(e)), this.compute(e), this.computeInitial(), this.emit();
  }
  moveChange(e) {
    if (!this.state._active)
      return;
    const n = pe(e), r = this.state;
    r._delta = L.sub(n, r._values), L.addTo(r._movement, r._delta), this.computeValues(n), this.compute(e), this.emit();
  }
  moveEnd(e) {
    !this.state._active || (this.state._active = !1, this.compute(e), this.emit());
  }
  bind(e) {
    e("pointer", "change", this.move.bind(this)), e("pointer", "leave", this.moveEnd.bind(this));
  }
}
const ar = N(N({}, ae), {}, {
  mouseOnly: (t = !0) => t
});
class cr extends we {
  constructor(...e) {
    super(...e), H(this, "ingKey", "scrolling");
  }
  scroll(e) {
    this.state._active || this.start(e), this.scrollChange(e), this.timeoutStore.add("scrollEnd", this.scrollEnd.bind(this));
  }
  scrollChange(e) {
    e.cancelable && e.preventDefault();
    const n = this.state, r = Hn(e);
    n._delta = L.sub(r, n._values), L.addTo(n._movement, n._delta), this.computeValues(r), this.compute(e), this.emit();
  }
  scrollEnd() {
    !this.state._active || (this.state._active = !1, this.compute(), this.emit());
  }
  bind(e) {
    e("scroll", "", this.scroll.bind(this));
  }
}
const ur = ae;
class lr extends we {
  constructor(...e) {
    super(...e), H(this, "ingKey", "wheeling");
  }
  wheel(e) {
    this.state._active || this.start(e), this.wheelChange(e), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(e) {
    const n = this.state;
    n._delta = Yt(e), L.addTo(n._movement, n._delta), Wt(n), this.compute(e), this.emit();
  }
  wheelEnd() {
    !this.state._active || (this.state._active = !1, this.compute(), this.emit());
  }
  bind(e) {
    e("wheel", "", this.wheel.bind(this));
  }
}
const fr = ae;
class dr extends we {
  constructor(...e) {
    super(...e), H(this, "ingKey", "hovering");
  }
  enter(e) {
    this.config.mouseOnly && e.pointerType !== "mouse" || (this.start(e), this.computeValues(pe(e)), this.compute(e), this.emit());
  }
  leave(e) {
    if (this.config.mouseOnly && e.pointerType !== "mouse")
      return;
    const n = this.state;
    if (!n._active)
      return;
    n._active = !1;
    const r = pe(e);
    n._movement = n._delta = L.sub(r, n._values), this.computeValues(r), this.compute(e), n.delta = n.movement, this.emit();
  }
  bind(e) {
    e("pointer", "enter", this.enter.bind(this)), e("pointer", "leave", this.leave.bind(this));
  }
}
const hr = N(N({}, ae), {}, {
  mouseOnly: (t = !0) => t
}), Be = /* @__PURE__ */ new Map(), Ue = /* @__PURE__ */ new Map();
function pr(t) {
  Be.set(t.key, t.engine), Ue.set(t.key, t.resolver);
}
const gr = {
  key: "drag",
  engine: qn,
  resolver: zt
}, vr = {
  key: "hover",
  engine: dr,
  resolver: hr
}, mr = {
  key: "move",
  engine: or,
  resolver: ar
}, yr = {
  key: "pinch",
  engine: ir,
  resolver: sr
}, _r = {
  key: "scroll",
  engine: cr,
  resolver: ur
}, wr = {
  key: "wheel",
  engine: lr,
  resolver: fr
};
function br(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, s;
  for (s = 0; s < r.length; s++)
    i = r[s], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function Er(t, e) {
  if (t == null)
    return {};
  var n = br(t, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    for (i = 0; i < s.length; i++)
      r = s[i], !(e.indexOf(r) >= 0) && (!Object.prototype.propertyIsEnumerable.call(t, r) || (n[r] = t[r]));
  }
  return n;
}
const Tr = {
  target(t) {
    if (t)
      return () => "current" in t ? t.current : t;
  },
  enabled(t = !0) {
    return t;
  },
  window(t = z.isBrowser ? window : void 0) {
    return t;
  },
  eventOptions({
    passive: t = !0,
    capture: e = !1
  } = {}) {
    return {
      passive: t,
      capture: e
    };
  },
  transform(t) {
    return t;
  }
}, xr = ["target", "eventOptions", "window", "enabled", "transform"];
function Ce(t = {}, e) {
  const n = {};
  for (const [r, i] of Object.entries(e))
    switch (typeof i) {
      case "function":
        if (process.env.NODE_ENV === "development") {
          const s = i.call(n, t[r], r, t);
          Number.isNaN(s) || (n[r] = s);
        } else
          n[r] = i.call(n, t[r], r, t);
        break;
      case "object":
        n[r] = Ce(t[r], i);
        break;
      case "boolean":
        i && (n[r] = t[r]);
        break;
    }
  return n;
}
function Ir(t, e, n = {}) {
  const r = t, {
    target: i,
    eventOptions: s,
    window: a,
    enabled: u,
    transform: o
  } = r, d = Er(r, xr);
  if (n.shared = Ce({
    target: i,
    eventOptions: s,
    window: a,
    enabled: u,
    transform: o
  }, Tr), e) {
    const c = Ue.get(e);
    n[e] = Ce(N({
      shared: n.shared
    }, d), c);
  } else
    for (const c in d) {
      const f = Ue.get(c);
      if (f)
        n[c] = Ce(N({
          shared: n.shared
        }, d[c]), f);
      else if (process.env.NODE_ENV === "development" && !["drag", "pinch", "scroll", "wheel", "move", "hover"].includes(c)) {
        if (c === "domTarget")
          throw Error("[@use-gesture]: `domTarget` option has been renamed to `target`.");
        console.warn(`[@use-gesture]: Unknown config key \`${c}\` was used. Please read the documentation for further information.`);
      }
    }
  return n;
}
class Gt {
  constructor(e, n) {
    H(this, "_listeners", /* @__PURE__ */ new Set()), this._ctrl = e, this._gestureKey = n;
  }
  add(e, n, r, i, s) {
    const a = this._listeners, u = Sn(n, r), o = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}, d = N(N({}, o), s);
    e.addEventListener(u, i, d);
    const c = () => {
      e.removeEventListener(u, i, d), a.delete(c);
    };
    return a.add(c), c;
  }
  clean() {
    this._listeners.forEach((e) => e()), this._listeners.clear();
  }
}
class Or {
  constructor() {
    H(this, "_timeouts", /* @__PURE__ */ new Map());
  }
  add(e, n, r = 140, ...i) {
    this.remove(e), this._timeouts.set(e, window.setTimeout(n, r, ...i));
  }
  remove(e) {
    const n = this._timeouts.get(e);
    n && window.clearTimeout(n);
  }
  clean() {
    this._timeouts.forEach((e) => void window.clearTimeout(e)), this._timeouts.clear();
  }
}
class Cr {
  constructor(e) {
    H(this, "gestures", /* @__PURE__ */ new Set()), H(this, "_targetEventStore", new Gt(this)), H(this, "gestureEventStores", {}), H(this, "gestureTimeoutStores", {}), H(this, "handlers", {}), H(this, "config", {}), H(this, "pointerIds", /* @__PURE__ */ new Set()), H(this, "touchIds", /* @__PURE__ */ new Set()), H(this, "state", {
      shared: {
        shiftKey: !1,
        metaKey: !1,
        ctrlKey: !1,
        altKey: !1
      }
    }), Ar(this, e);
  }
  setEventIds(e) {
    if (Pe(e))
      return this.touchIds = new Set($n(e)), this.touchIds;
    if ("pointerId" in e)
      return e.type === "pointerup" || e.type === "pointercancel" ? this.pointerIds.delete(e.pointerId) : e.type === "pointerdown" && this.pointerIds.add(e.pointerId), this.pointerIds;
  }
  applyHandlers(e, n) {
    this.handlers = e, this.nativeHandlers = n;
  }
  applyConfig(e, n) {
    this.config = Ir(e, n, this.config);
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
    const n = this.config.shared, r = {};
    let i;
    if (!(n.target && (i = n.target(), !i))) {
      if (n.enabled) {
        for (const a of this.gestures) {
          const u = this.config[a], o = bt(r, u.eventOptions, !!i);
          if (u.enabled) {
            const d = Be.get(a);
            new d(this, e, a).bind(o);
          }
        }
        const s = bt(r, n.eventOptions, !!i);
        for (const a in this.nativeHandlers)
          s(
            a,
            "",
            (u) => this.nativeHandlers[a](N(N({}, this.state.shared), {}, {
              event: u,
              args: e
            })),
            void 0,
            !0
          );
      }
      for (const s in r)
        r[s] = Un(...r[s]);
      if (!i)
        return r;
      for (const s in r) {
        const {
          device: a,
          capture: u,
          passive: o
        } = Pn(s);
        this._targetEventStore.add(i, a, "", r[s], {
          capture: u,
          passive: o
        });
      }
    }
  }
}
function fe(t, e) {
  t.gestures.add(e), t.gestureEventStores[e] = new Gt(t, e), t.gestureTimeoutStores[e] = new Or();
}
function Ar(t, e) {
  e.drag && fe(t, "drag"), e.wheel && fe(t, "wheel"), e.scroll && fe(t, "scroll"), e.move && fe(t, "move"), e.pinch && fe(t, "pinch"), e.hover && fe(t, "hover");
}
const bt = (t, e, n) => (r, i, s, a = {}, u = !1) => {
  var o, d;
  const c = (o = a.capture) !== null && o !== void 0 ? o : e.capture, f = (d = a.passive) !== null && d !== void 0 ? d : e.passive;
  let h = u ? r : kn(r, i, c);
  n && f && (h += "Passive"), t[h] = t[h] || [], t[h].push(s);
}, Mr = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function Dr(t) {
  const e = {}, n = {}, r = /* @__PURE__ */ new Set();
  for (let i in t)
    Mr.test(i) ? (r.add(RegExp.lastMatch), n[i] = t[i]) : e[i] = t[i];
  return [n, e, r];
}
function de(t, e, n, r, i, s) {
  if (!t.has(n))
    return;
  if (!Be.has(r)) {
    process.env.NODE_ENV === "development" && console.warn(`[@use-gesture]: You've created a custom handler that that uses the \`${r}\` gesture but isn't properly configured.

Please add \`${r}Action\` when creating your handler.`);
    return;
  }
  const a = n + "Start", u = n + "End", o = (d) => {
    let c;
    return d.first && a in e && e[a](d), n in e && (c = e[n](d)), d.last && u in e && e[u](d), c;
  };
  i[r] = o, s[r] = s[r] || {};
}
function kr(t, e) {
  const [n, r, i] = Dr(t), s = {};
  return de(i, n, "onDrag", "drag", s, e), de(i, n, "onWheel", "wheel", s, e), de(i, n, "onScroll", "scroll", s, e), de(i, n, "onPinch", "pinch", s, e), de(i, n, "onMove", "move", s, e), de(i, n, "onHover", "hover", s, e), {
    handlers: s,
    config: e,
    nativeHandlers: r
  };
}
function Lr(t, e, n) {
  return e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function Et(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    e && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Oe(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Et(Object(n), !0).forEach(function(r) {
      Lr(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Et(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
class Pr {
  constructor(e, n, r, i, s) {
    this._target = e, this._gestureKey = i, this._ctrl = new Cr(n), this._ctrl.applyHandlers(n, s), this._ctrl.applyConfig(Oe(Oe({}, r), {}, {
      target: e
    }), i), this._ctrl.effect();
  }
  destroy() {
    this._ctrl.clean();
  }
  setConfig(e) {
    this._ctrl.clean(), this._ctrl.applyConfig(Oe(Oe({}, e), {}, {
      target: this._target
    }), this._gestureKey), this._ctrl.effect();
  }
}
function Sr(t) {
  return t.forEach(pr), function(e, n, r) {
    const {
      handlers: i,
      nativeHandlers: s,
      config: a
    } = kr(n, r || {});
    return new Pr(e, i, a, void 0, s);
  };
}
const Vr = function(e, n, r) {
  return Sr([gr, yr, _r, wr, mr, vr])(e, n, r || {});
};
function he(t) {
  T({
    targets: t,
    opacity: 0,
    easing: "spring(1, 85, 35, 3)",
    duration: 0
  }), setTimeout(() => {
    var e;
    (e = t == null ? void 0 : t.classList) != null && e.contains("display") && t.classList.remove("display"), t && t.remove();
  }, 300), document.body.style.overflow = "scroll";
}
function Tt(t) {
  t.classList.add("display"), T({
    targets: t,
    opacity: 1,
    easing: "spring(1, 85, 35, 3)",
    duration: 0
  });
}
function oe(t, e, n, r) {
  T({
    targets: t,
    translateY: e,
    easing: n,
    duration: r
  });
}
function $e(t) {
  return typeof t == "string" ? +t.replace("%", "") : +t;
}
function ie(t) {
  return typeof t == "string" ? P(+t.replace("%", "")) : +t;
}
function P(t) {
  return Math.round(window.innerHeight * t / 100);
}
function U(t) {
  return window.innerHeight - t;
}
function Nr() {
  var t = navigator.userAgent || navigator.vendor || window.opera;
  return /windows phone/i.test(t) ? "Windows Phone" : /android/i.test(t) ? "Android" : /iPad|iPhone|iPod/.test(t) && !window.MSStream ? "iOS" : "unknown";
}
function Hr(t) {
  var et;
  let {
    snapPoints: e = ["100%"],
    displayOverlay: n = !1,
    minWidthForModal: r = 700,
    draggableArea: i = "",
    onOpen: s = () => {
    },
    onClose: a = () => {
    },
    trigger: u = "",
    content: o = "",
    onInit: d = () => {
    },
    webLayout: c = "modal",
    openOnLoad: f = !1,
    modalCloseIcon: h = `<svg width="16" height="12" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33.112 36.9133C34.3649 38.15 36.3963 38.15 37.6492 36.9133C38.9022 35.6766 38.9022 33.6716 37.6492 32.435L24.0375 19L37.6492 5.56496C38.9022 4.3283 38.9022 2.32328 37.6492 1.08662C36.3963 -0.150042 34.3649 -0.150042 33.112 1.08662L19.5002 14.5216L5.88835 1.08655C4.63541 -0.150108 2.60401 -0.150107 1.35108 1.08655C0.0981471 2.32321 0.0981459 4.32824 1.35108 5.5649L14.9629 19L1.35108 32.435C0.0981434 33.6717 0.0981443 35.6767 1.35108 36.9134C2.60401 38.15 4.63541 38.15 5.88834 36.9134L19.5002 23.4783L33.112 36.9133Z" fill="white"/>
    </svg>
    `,
    sideSheetLeftIcon: k = `
    <svg width="16" height="14" viewBox="0 0 26 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.5046 40.8036C23.2926 42.0804 21.2623 42.1465 19.9698 40.9513L1.76653 24.118C0.474022 22.9228 0.408779 20.9188 1.62081 19.6421L18.6906 1.66043C19.9026 0.383653 21.9329 0.317552 23.2254 1.51279C24.5179 2.70802 24.5832 4.71199 23.3712 5.98876L8.49597 21.6586L24.3589 36.3277C25.6514 37.5229 25.7166 39.5269 24.5046 40.8036Z" fill="white"/>
    </svg> 
    `,
    sideSheetRightIcon: w = `<svg width="16" height="14" viewBox="0 0 25 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.21057 1.34418C2.46351 0.107522 4.49491 0.107522 5.74784 1.34418L23.3937 18.7608C24.6466 19.9975 24.6466 22.0025 23.3937 23.2392L5.74784 40.6559C4.49491 41.8925 2.46351 41.8925 1.21057 40.6559C-0.0423591 39.4192 -0.0423591 37.4142 1.21057 36.1775L16.5878 21L1.21057 5.82253C-0.0423591 4.58586 -0.0423591 2.58084 1.21057 1.34418Z" fill="white"/>
    </svg>   
    `,
    defaultSideSheetClose: v = !0,
    cleanUpOnClose: I = !1,
    dismissible: x = !0,
    sideSheetSnapPoints: y = ["10%", "25%", "50%", "100%"],
    velocityThreshold: m = 0.9,
    distanceThreshold: S = 150,
    closeOnOverlayClick: q = !0,
    animateOnDrag: O = {}
  } = t, C;
  o = typeof o != "string" ? promise.resolve(o).then((l) => {
  }) : o;
  let G = u ? (et = document == null ? void 0 : document.querySelector(`#${u}`)) == null ? void 0 : et.getAttribute("data-bottomsheet-id") : "", g = G ? document == null ? void 0 : document.querySelector(`#${G}`) : "";
  const E = document.querySelector(`#${g == null ? void 0 : g.id}-overlay`) ? document.querySelector(`#${g == null ? void 0 : g.id}-overlay`) : document.createElement("div");
  E.id = `${g == null ? void 0 : g.id}-overlay`;
  let J = "spring(1, 85, 45, 15)", se = "spring(1, 85, 35, 5)";
  document.addEventListener("click", (l) => {
    setTimeout(() => {
      l.target.tagName.toLowerCase() === "input" && Nr() === "Android" && oe(g, "0px", le());
    }, 100);
  }), f ? K(f) : setTimeout(() => {
    u && document.querySelector(`#${u}`) && document.querySelectorAll(`#${u}`).forEach(
      (l) => l.addEventListener("click", () => {
        K(!1);
      })
    );
  }, 400);
  function K(l = !1) {
    document.body.style.overflowY = "contain", d && d(), o && !g ? (document.body.insertAdjacentHTML("beforeend", o), g = G ? document.querySelector(`#${G}`) : document.querySelector(
      `#${new DOMParser().parseFromString(o, "text/html").body.firstChild.id}`
    )) : o && !g.innerHTML && (g.innerHTML = new DOMParser().parseFromString(
      o,
      "text/html"
    ).body.firstChild.innerHTML), g && !document.getElementById(`#${g.id}`) && document.body.append(g), n && (E.classList.add("overlay"), Tt(E), document.body.appendChild(E), g && document.querySelector(".overlay") && document.body.insertBefore(E, g), q && E.addEventListener("click", () => {
      Y(b, x);
    }));
    let b = !(window.innerWidth < r);
    document.querySelectorAll(`#${g == null ? void 0 : g.id}`).length < 2 ? ge(g, b, E, l) : B(b, l);
  }
  function ge(l, b, A, _) {
    let M = ne(l), F = $e(e[e.length - 1]), V = document.createElement("div"), j = document.createElement("div"), R = document.createElement("div"), D = "";
    l.style.display = "block", V.id = "modal-close", V.classList.add("close-modal"), V.addEventListener(
      "click",
      () => Ee(l, A)
    ), j.id = "side-left", v && j.addEventListener("click", () => {
      ue(l, A);
    }), R.id = "side-right", v && R.addEventListener(
      "click",
      () => ye(l)
    ), V.insertAdjacentHTML("afterbegin", h), j.insertAdjacentHTML("afterbegin", k), R.insertAdjacentHTML("afterbegin", w), i && (typeof i == "string" ? (i = new DOMParser().parseFromString(
      i,
      "text/xml"
    ), D = i.childNodes[0].id, i = i.childNodes[0]) : D = i == null ? void 0 : i.id, i.setAttribute("data-draggable", "1"), i.classList.add("draggable")), te(
      l,
      j,
      R,
      b,
      D,
      A,
      V
    ), b = ve(
      l,
      j,
      R,
      b,
      A,
      V,
      D
    ), setTimeout(() => {
      s();
    }, 300), C && C < window.innerHeight && window.innerWidth < r ? Y(b, x) : B(b, _), l.click(), l.style.overflow = "scroll", l.style.touchAction = "auto", setTimeout(() => {
      Te(
        l,
        M,
        F,
        l,
        D,
        A,
        b
      );
    }, 400), document.querySelector(`.bottomsheet #${l.id}`) && (document.querySelector(
      `.bottomsheet #${l.id}`
    ).style.display = "block");
  }
  function ve(l, b, A, _, M, F, V) {
    return window.addEventListener("resize", () => (te(
      l,
      b,
      A,
      _,
      V,
      M,
      F
    ), window.innerWidth < r ? _ = !1 : _ = !0, _)), _;
  }
  function Ee(l, b) {
    T({
      targets: l,
      opacity: 0,
      easing: J,
      duration: 0.1,
      translateY: "-40%"
    }), setTimeout(() => {
      xe(l);
    }, 500), he(b);
  }
  function Y(l = !1, b = !0, A = 7) {
    n && E && he(E), document.body.style.overflow = "scroll", l ? c === "modal" ? Ee(g, E) : c === "sideSheetLeft" ? ue(g, E) : ye(g) : T({
      targets: g,
      translateY: `${b ? P(100) : U(ie(e[0]))}px`,
      easing: le(),
      duration: 1
    }), C = P(100), setTimeout(() => {
      C >= window.innerHeight && I && xe(g);
    }, 500), he(E), a();
  }
  function te(l, b, A, _, M, F, V) {
    _ ? (i && document.querySelector(`#${l.id} #${M}`) && l.removeChild(i), c === "modal" ? l.classList.add("modal") : l.classList.add("side-sheet"), l.classList.remove("bottomsheet"), !document.querySelector(`#${l.id} #modal-close`) && c === "modal" ? l.prepend(V) : !document.querySelector(`#${l.id} #side-left`) && c === "sideSheetLeft" ? l.prepend(b) : !document.querySelector(`#${l.id} #side-right`) && c === "sideSheetRight" && (l.prepend(A), ye(l))) : (M && !document.querySelector(`#${l == null ? void 0 : l.id} #${M}`) && l.prepend(i), document.querySelector(`#${l.id} #modal-close`) && l.removeChild(V), document.querySelector(`#${l.id} #side-left`) && l.removeChild(b), document.querySelector(`#${l.id} #side-right`) && l.removeChild(A), l.classList.add("bottomsheet"), l.classList.remove("modal"), l.classList.remove("side-sheet"));
  }
  function B(l = !1, b = !1) {
    document.body.style.overflow = "hidden", n && Tt(E), l ? c === "sideSheetLeft" ? (g.style.top = 0, g.style.left = "-100%", setTimeout(() => {
      T({
        targets: g,
        left: "0",
        width: y[0],
        easing: se,
        duration: 1
      });
    }, 100)) : c === "sideSheetRight" ? (g.style.top = 0, g.style.right = "-100%", setTimeout(() => {
      T({
        targets: g,
        right: "0",
        width: y[0],
        easing: se,
        duration: 1
      });
    }, 100)) : (g.style.top = "50%", g.style.opacity = 0, g.style.transform = "translateX(-50%) translateY(-40%) rotateX(-20deg)", T({
      translateY: "-50%",
      targets: g,
      opacity: 1,
      rotateX: "1deg",
      easing: J,
      duration: 0.1
    })) : b ? (g.style.opacity = 1, g.style.transform = `translateY(${U(
      ie(e[0])
    )}px)`) : (T({
      targets: g,
      translateY: `${P(100)}px`,
      easing: "linear",
      duration: 1
    }), setTimeout(() => {
      T({
        targets: g,
        translateY: `${U(ie(e[0]))}px`,
        easing: "spring(1, 85, 15, 3)",
        opacity: 1,
        duration: 1
      });
    }, 60)), C = U(ie(e[0]));
  }
  function Te(l, b, A, _, M, F, V) {
    new Vr(
      l,
      {
        onDrag: ({
          active: j,
          velocity: [R, D],
          offset: $,
          distance: [Z, Se],
          target: tt,
          direction: Qt
        }) => {
          let nt = 0, Xt = 1 / 0;
          b = ne(_), window.innerWidth < r && (Qt[1] > 0 ? M && tt === document.querySelector(`#${M}`) ? (_.style.overflow = "hidden", _.style.touchAction = "none", ce(
            _,
            nt,
            null,
            j,
            A,
            D,
            $,
            Se,
            F
          ), C >= window.innerHeight && Y(V, x, D), C >= window.innerHeight && he(F)) : _.scrollTop >= 1 && b <= P(100 - A) && (!M || tt !== document.querySelector(`#${M}`)) ? (_.style.overflow = "scroll", _.style.touchAction = "auto", _.click()) : (_.style.overflow = "hidden", _.style.touchAction = "none", ce(
            _,
            nt,
            null,
            j,
            A,
            D,
            $,
            Se,
            F
          ), C >= window.innerHeight && Y(V, x, D)) : ne(g) <= P(100 - A) ? (_.click(), _.style.overflow = "scroll", P(100 - A) > 0 && (_.style.minHeight = "unset"), _.style.height = `${P(A)}px`, _.style.touchAction = "auto") : (_.style.overflow = "hidden", _.style.touchAction = "none", ce(
            _,
            null,
            Xt,
            j,
            A,
            D,
            $,
            Se,
            F
          ), C >= window.innerHeight && Y(V, x, D)));
        },
        onDragStart: () => {
          document.body.style.overflow = "hidden";
        },
        onDragEnd: ({ direction: j }) => {
          b = ne(_), (b <= P(100 - A) || C === 0) && j[1] < 0 && g.scrollTop >= 0 && (_.style.overflow = "scroll", _.click(), _.style.touchAction = "auto"), (b <= P(100 - A) || C === 0) && j[1] > 0 && g.scrollTop === 0 && (_.style.overflow = "hidden");
        }
      },
      {
        drag: {
          filterTaps: !1,
          rubberband: !0,
          axis: "y",
          preventDefault: !1,
          from: () => [0, ne(_)]
        }
      }
    );
  }
  function ce(l, b, A, _, M, F, V, j, R, D) {
    let $ = V[1];
    if (A === null) {
      let Z = function() {
        return me(
          $ > window.innerHeight ? window.innerHeight : $ < P(100 - M) ? P(100 - M) : $,
          l,
          F,
          M,
          j,
          !1,
          R,
          x
        );
      };
      _ && oe(
        l,
        `${$ > window.innerHeight ? window.innerHeight : $ < P(100 - M) ? P(100 - M) : $}px`,
        "spring(1, 250, 25, 25)"
      ), _ || Z() !== void 0 && (V[1] = Z());
    } else {
      let Z = function() {
        return re(
          $ > window.innerHeight ? window.innerHeight : $ < P(100 - M) ? P(100 - M) : $,
          l,
          F,
          M,
          j,
          !1,
          R
        );
      };
      _ && oe(
        l,
        `${$ > window.innerHeight ? window.innerHeight : $ < P(100 - M) ? P(100 - M) : $}px`,
        "spring(1, 250, 25, 25)"
      ), _ || Z() !== void 0 && (V[1] = Z());
    }
  }
  function ne(l) {
    var b;
    return +((b = l == null ? void 0 : l.style) == null ? void 0 : b.transform.slice(11).replace("px)", ""));
  }
  function re(l, b, A, _, M, F, V, j) {
    let R = 1 / 0;
    if (e.forEach((D) => {
      let $ = $e(D);
      P($) > U(l) && P($) < R && (R = P($));
    }), R !== 1 / 0)
      return F ? (oe(
        b,
        `${U(R)}px`,
        le()
      ), C = U(R), C) : A > m || M < S ? (oe(
        b,
        `${U(R)}px`,
        le()
      ), C = U(R), C) : me(
        l,
        b,
        A,
        _,
        M,
        !0,
        V,
        x
      );
  }
  function me(l, b, A, _, M, F, V, j, R) {
    let D = 0;
    return e.forEach(($) => {
      let Z = $e($);
      P(Z) < U(l) && P(Z) > D && (D = P(Z));
    }), F ? (oe(
      b,
      `${j ? U(D) : D <= ie(e[0]) ? U(ie(e[0])) : U(D)}px`,
      le()
    ), C = U(D), C) : A > m || M > S ? (oe(
      b,
      `${j ? U(D) : D <= ie(e[0]) ? U(ie(e[0])) : U(D)}px`,
      le()
    ), C = U(D), C) : re(
      l,
      b,
      A,
      _,
      M,
      !0,
      V
    );
  }
  function ue(l, b) {
    T({
      targets: l,
      width: 0,
      easing: "spring(1, 85, 45, 3)",
      duration: 0
    }), setTimeout(() => {
      I && xe(l);
    }, 400), he(b);
  }
  function ye(l) {
    T({
      targets: l,
      width: 0,
      easing: "spring(1, 85, 45, 3)",
      duration: 0
    }), setTimeout(() => {
      I && xe(l);
    }, 400), he(E);
  }
  function xe(l) {
    l.remove();
  }
  function le() {
    return "spring(1, 95, 25, 13)";
  }
  function Zt() {
    document.getElementById(u).removeEventListener("click", () => {
      K(!1);
    });
  }
  return {
    close: Y,
    init: K,
    open: B,
    destroy: Zt
  };
}
async function jr(t, e) {
  e = typeof e != "string" ? await e : e;
  let n;
  e && t && document.getElementById(`${t}`) && (n = document.getElementById(`${t}`).children[0], document.getElementById(`${t}`).innerHTML = "", n && ((n == null ? void 0 : n.getAttribute("data-draggable")) || n.children[0] instanceof SVGElement) && document.getElementById(`${t}`).appendChild(n), document.getElementById(`${t}`).insertAdjacentHTML("beforeend", e));
}
export {
  Hr as BottomSheet,
  jr as replaceInnerContent
};
