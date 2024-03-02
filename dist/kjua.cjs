"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/kjua.ts
var kjua_exports = {};
__export(kjua_exports, {
  kjua: () => kjua
});
module.exports = __toCommonJS(kjua_exports);

// src/lib/draw_rounded.ts
var create_draw_ctx = /* @__PURE__ */ __name((ctx) => {
  return {
    m(x, y) {
      ctx.moveTo(x, y);
      return this;
    },
    l(x, y) {
      ctx.lineTo(x, y);
      return this;
    },
    a(...args) {
      ctx.arcTo(...args);
      return this;
    }
  };
}, "create_draw_ctx");
var draw_dark = /* @__PURE__ */ __name((ctx, l, t, r, b, rad, nw, ne, se, sw) => {
  if (nw) {
    ctx.m(l + rad, t);
  } else {
    ctx.m(l, t);
  }
  if (ne) {
    ctx.l(r - rad, t).a(r, t, r, b, rad);
  } else {
    ctx.l(r, t);
  }
  if (se) {
    ctx.l(r, b - rad).a(r, b, l, b, rad);
  } else {
    ctx.l(r, b);
  }
  if (sw) {
    ctx.l(l + rad, b).a(l, b, l, t, rad);
  } else {
    ctx.l(l, b);
  }
  if (nw) {
    ctx.l(l, t + rad).a(l, t, r, t, rad);
  } else {
    ctx.l(l, t);
  }
}, "draw_dark");
var draw_light = /* @__PURE__ */ __name((ctx, l, t, r, b, rad, nw, ne, se, sw) => {
  if (nw) {
    ctx.m(l + rad, t).l(l, t).l(l, t + rad).a(l, t, l + rad, t, rad);
  }
  if (ne) {
    ctx.m(r - rad, t).l(r, t).l(r, t + rad).a(r, t, r - rad, t, rad);
  }
  if (se) {
    ctx.m(r - rad, b).l(r, b).l(r, b - rad).a(r, b, r - rad, b, rad);
  }
  if (sw) {
    ctx.m(l + rad, b).l(l, b).l(l, b - rad).a(l, b, l + rad, b, rad);
  }
}, "draw_light");
var draw_module_rounded = /* @__PURE__ */ __name((qr, ctx, settings, width, row, col) => {
  const left = col * width;
  const top = row * width;
  const right = left + width;
  const bottom = top + width;
  const radius = settings.rounded * 5e-3 * width;
  const is_dark = qr.is_dark;
  const row_n = row - 1;
  const row_s = row + 1;
  const col_w = col - 1;
  const col_e = col + 1;
  const dark_center = is_dark(row, col);
  const dark_nw = is_dark(row_n, col_w);
  const dark_n = is_dark(row_n, col);
  const dark_ne = is_dark(row_n, col_e);
  const dark_e = is_dark(row, col_e);
  const dark_se = is_dark(row_s, col_e);
  const dark_s = is_dark(row_s, col);
  const dark_sw = is_dark(row_s, col_w);
  const dark_w = is_dark(row, col_w);
  const draw_ctx = create_draw_ctx(ctx);
  if (dark_center) {
    draw_dark(
      draw_ctx,
      left,
      top,
      right,
      bottom,
      radius,
      !dark_n && !dark_w,
      !dark_n && !dark_e,
      !dark_s && !dark_e,
      !dark_s && !dark_w
    );
  } else {
    draw_light(
      draw_ctx,
      left,
      top,
      right,
      bottom,
      radius,
      dark_n && dark_w && dark_nw,
      dark_n && dark_e && dark_ne,
      dark_s && dark_e && dark_se,
      dark_s && dark_w && dark_sw
    );
  }
}, "draw_module_rounded");
var draw_rounded_default = draw_module_rounded;

// src/lib/draw_mode.ts
var draw_label = /* @__PURE__ */ __name((ctx, settings) => {
  const size = settings.size;
  const font = "bold " + settings.mSize * 0.01 * size + "px " + settings.fontname;
  ctx.strokeStyle = settings.back;
  ctx.lineWidth = settings.mSize * 0.01 * size * 0.1;
  ctx.fillStyle = settings.fontcolor;
  ctx.font = font;
  const w = ctx.measureText(settings.label).width;
  const sh = settings.mSize * 0.01;
  const sw = w / size;
  const sl = (1 - sw) * settings.mPosX * 0.01;
  const st = (1 - sh) * settings.mPosY * 0.01;
  const x = sl * size;
  const y = st * size + 0.75 * settings.mSize * 0.01 * size;
  ctx.strokeText(settings.label, x, y);
  ctx.fillText(settings.label, x, y);
}, "draw_label");
var draw_image = /* @__PURE__ */ __name((ctx, settings) => {
  const size = settings.size;
  const w = settings.image.naturalWidth || 1;
  const h = settings.image.naturalHeight || 1;
  const sh = settings.mSize * 0.01;
  const sw = sh * w / h;
  const sl = (1 - sw) * settings.mPosX * 0.01;
  const st = (1 - sh) * settings.mPosY * 0.01;
  const x = sl * size;
  const y = st * size;
  const iw = sw * size;
  const ih = sh * size;
  ctx.drawImage(settings.image, x, y, iw, ih);
}, "draw_image");
var draw_mode = /* @__PURE__ */ __name((ctx, settings) => {
  const mode = settings.mode;
  if (mode === "label") {
    draw_label(ctx, settings);
  } else if (mode === "image") {
    draw_image(ctx, settings);
  }
}, "draw_mode");
var draw_mode_default = draw_mode;

// src/lib/dom.ts
var win = window;
var doc = win.document;
var dpr = win.devicePixelRatio || 1;
var SVG_NS = "http://www.w3.org/2000/svg";
var get_attr = /* @__PURE__ */ __name((el, key) => el.getAttribute(key), "get_attr");
var set_attrs = /* @__PURE__ */ __name((el, obj) => {
  Object.keys(obj || {}).forEach((key) => {
    el.setAttribute(key, obj[key]);
  });
  return el;
}, "set_attrs");
var create_el = /* @__PURE__ */ __name((name, obj) => set_attrs(doc.createElement(name), obj), "create_el");
var create_svg_el = /* @__PURE__ */ __name((name, obj) => set_attrs(doc.createElementNS(SVG_NS, name), obj), "create_svg_el");
var create_canvas = /* @__PURE__ */ __name((size, ratio) => {
  const canvas = create_el("canvas", {
    width: size * ratio,
    height: size * ratio
  });
  canvas.style.width = `${size}px`;
  canvas.style.height = `${size}px`;
  return canvas;
}, "create_canvas");
var canvas_to_img = /* @__PURE__ */ __name((canvas) => {
  const img = create_el("img", {
    crossOrigin: "anonymous",
    src: canvas.toDataURL("image/png"),
    width: get_attr(canvas, "width"),
    height: get_attr(canvas, "height")
  });
  img.style.width = canvas.style.width;
  img.style.height = canvas.style.height;
  return img;
}, "canvas_to_img");

// src/lib/create_canvas_qrcode.ts
var draw_background = /* @__PURE__ */ __name((ctx, settings) => {
  if (settings.back) {
    ctx.fillStyle = settings.back;
    ctx.fillRect(0, 0, settings.size, settings.size);
  }
}, "draw_background");
var draw_module_default = /* @__PURE__ */ __name((qr, ctx, settings, width, row, col) => {
  if (qr.is_dark(row, col)) {
    ctx.rect(col * width, row * width, width, width);
  }
}, "draw_module_default");
var draw_modules = /* @__PURE__ */ __name((qr, ctx, settings) => {
  if (!qr) {
    return;
  }
  const draw_module = settings.rounded > 0 && settings.rounded <= 100 ? draw_rounded_default : draw_module_default;
  const mod_count = qr.module_count;
  let mod_size = settings.size / mod_count;
  let offset = 0;
  if (settings.crisp) {
    mod_size = Math.floor(mod_size);
    offset = Math.floor((settings.size - mod_size * mod_count) / 2);
  }
  ctx.translate(offset, offset);
  ctx.beginPath();
  for (let row = 0; row < mod_count; row += 1) {
    for (let col = 0; col < mod_count; col += 1) {
      draw_module(qr, ctx, settings, mod_size, row, col);
    }
  }
  ctx.fillStyle = settings.fill;
  ctx.fill();
  ctx.translate(-offset, -offset);
}, "draw_modules");
var draw = /* @__PURE__ */ __name((qr, ctx, settings) => {
  draw_background(ctx, settings);
  draw_modules(qr, ctx, settings);
  draw_mode_default(ctx, settings);
}, "draw");
var create_canvas_qrcode = /* @__PURE__ */ __name((qr, settings, as_image) => {
  const ratio = settings.ratio || dpr;
  const canvas = create_canvas(settings.size, ratio);
  const context = canvas.getContext("2d");
  context.scale(ratio, ratio);
  draw(qr, context, settings);
  return as_image ? canvas_to_img(canvas) : canvas;
}, "create_canvas_qrcode");
var create_canvas_qrcode_default = create_canvas_qrcode;

// src/lib/create_svg_qrcode.ts
var create_draw_ctx2 = /* @__PURE__ */ __name((ctx) => {
  const rnd = /* @__PURE__ */ __name((x) => Math.round(x * 10) / 10, "rnd");
  const rndo = /* @__PURE__ */ __name((x) => Math.round(x * 10) / 10 + ctx.o, "rndo");
  return {
    m(x, y) {
      ctx.p += `M ${rndo(x)} ${rndo(y)} `;
      return this;
    },
    l(x, y) {
      ctx.p += `L ${rndo(x)} ${rndo(y)} `;
      return this;
    },
    a(x, y, rad) {
      ctx.p += `A ${rnd(rad)} ${rnd(rad)} 0 0 1 ${rndo(x)} ${rndo(y)} `;
      return this;
    }
  };
}, "create_draw_ctx");
var draw_dark2 = /* @__PURE__ */ __name((ctx, l, t, r, b, rad, nw, ne, se, sw) => {
  if (nw) {
    ctx.m(l + rad, t);
  } else {
    ctx.m(l, t);
  }
  if (ne) {
    ctx.l(r - rad, t).a(r, t + rad, rad);
  } else {
    ctx.l(r, t);
  }
  if (se) {
    ctx.l(r, b - rad).a(r - rad, b, rad);
  } else {
    ctx.l(r, b);
  }
  if (sw) {
    ctx.l(l + rad, b).a(l, b - rad, rad);
  } else {
    ctx.l(l, b);
  }
  if (nw) {
    ctx.l(l, t + rad).a(l + rad, t, rad);
  } else {
    ctx.l(l, t);
  }
}, "draw_dark");
var draw_light2 = /* @__PURE__ */ __name((ctx, l, t, r, b, rad, nw, ne, se, sw) => {
  if (nw) {
    ctx.m(l + rad, t).l(l, t).l(l, t + rad).a(l + rad, t, rad);
  }
  if (ne) {
    ctx.m(r, t + rad).l(r, t).l(r - rad, t).a(r, t + rad, rad);
  }
  if (se) {
    ctx.m(r - rad, b).l(r, b).l(r, b - rad).a(r - rad, b, rad);
  }
  if (sw) {
    ctx.m(l, b - rad).l(l, b).l(l + rad, b).a(l, b - rad, rad);
  }
}, "draw_light");
var draw_mod = /* @__PURE__ */ __name((qr, ctx, options, width, row, col) => {
  const left = col * width;
  const top = row * width;
  const right = left + width;
  const bottom = top + width;
  const radius = options.rounded * 5e-3 * width;
  const is_dark = qr.is_dark;
  const row_n = row - 1;
  const row_s = row + 1;
  const col_w = col - 1;
  const col_e = col + 1;
  const dark_center = is_dark(row, col);
  const dark_nw = is_dark(row_n, col_w);
  const dark_n = is_dark(row_n, col);
  const dark_ne = is_dark(row_n, col_e);
  const dark_e = is_dark(row, col_e);
  const dark_se = is_dark(row_s, col_e);
  const dark_s = is_dark(row_s, col);
  const dark_sw = is_dark(row_s, col_w);
  const dark_w = is_dark(row, col_w);
  if (dark_center) {
    draw_dark2(
      ctx,
      left,
      top,
      right,
      bottom,
      radius,
      !dark_n && !dark_w,
      !dark_n && !dark_e,
      !dark_s && !dark_e,
      !dark_s && !dark_w
    );
  } else {
    draw_light2(
      ctx,
      left,
      top,
      right,
      bottom,
      radius,
      dark_n && dark_w && dark_nw,
      dark_n && dark_e && dark_ne,
      dark_s && dark_e && dark_se,
      dark_s && dark_w && dark_sw
    );
  }
}, "draw_mod");
var create_path = /* @__PURE__ */ __name((qr, options) => {
  if (!qr) {
    return "";
  }
  const ctx = { p: "", o: 0 };
  const mod_count = qr.module_count;
  let mod_size = options.size / mod_count;
  if (options.crisp) {
    mod_size = Math.floor(mod_size);
    ctx.o = Math.floor((options.size - mod_size * mod_count) / 2);
  }
  const draw_ctx = create_draw_ctx2(ctx);
  for (let row = 0; row < mod_count; row += 1) {
    for (let col = 0; col < mod_count; col += 1) {
      draw_mod(qr, draw_ctx, options, mod_size, row, col);
    }
  }
  return ctx.p;
}, "create_path");
var add_label = /* @__PURE__ */ __name((el, options) => {
  const size = options.size;
  const font = "bold " + options.mSize * 0.01 * size + "px " + options.fontname;
  const ratio = options.ratio || dpr;
  const ctx = create_canvas(size, ratio).getContext("2d");
  ctx.strokeStyle = options.back;
  ctx.lineWidth = options.mSize * 0.01 * size * 0.1;
  ctx.fillStyle = options.fontcolor;
  ctx.font = font;
  const w = ctx.measureText(options.label).width;
  const sh = options.mSize * 0.01;
  const sw = w / size;
  const sl = (1 - sw) * options.mPosX * 0.01;
  const st = (1 - sh) * options.mPosY * 0.01;
  const x = sl * size;
  const y = st * size + 0.75 * options.mSize * 0.01 * size;
  const text_el = create_svg_el("text", {
    x,
    y
  });
  Object.assign(text_el.style, {
    font,
    fill: options.fontcolor,
    "paint-order": "stroke",
    stroke: options.back,
    "stroke-width": ctx.lineWidth
  });
  text_el.textContent = options.label;
  el.appendChild(text_el);
}, "add_label");
var add_image = /* @__PURE__ */ __name((el, options) => {
  if (!options.image) {
    console.error("kjua: image is enabled but none given");
    return;
  }
  const size = options.size;
  const w = options.image.naturalWidth || 1;
  const h = options.image.naturalHeight || 1;
  const sh = options.mSize * 0.01;
  const sw = sh * w / h;
  const sl = (1 - sw) * options.mPosX * 0.01;
  const st = (1 - sh) * options.mPosY * 0.01;
  const x = sl * size;
  const y = st * size;
  const iw = sw * size;
  const ih = sh * size;
  const img_el = create_svg_el("image", {
    href: get_attr(options.image, "src"),
    x,
    y,
    width: iw,
    height: ih
  });
  el.appendChild(img_el);
}, "add_image");
var create_svg_qrcode = /* @__PURE__ */ __name((qr, options) => {
  const size = options.size;
  const mode = options.mode;
  const svg_el = create_svg_el("svg", {
    xmlns: SVG_NS,
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`
  });
  svg_el.style.width = `${size}px`;
  svg_el.style.height = `${size}px`;
  if (options.back) {
    svg_el.appendChild(
      create_svg_el("rect", {
        x: 0,
        y: 0,
        width: size,
        height: size,
        fill: options.back
      })
    );
  }
  svg_el.appendChild(
    create_svg_el("path", {
      d: create_path(qr, options),
      fill: options.fill
    })
  );
  if (mode === "label") {
    add_label(svg_el, options);
  } else if (mode === "image") {
    add_image(svg_el, options);
  }
  return svg_el;
}, "create_svg_qrcode");
var create_svg_qrcode_default = create_svg_qrcode;

// src/lib/options.ts
var defaultOptions = {
  // render method: 'canvas', 'image' or 'svg'
  render: "image",
  // render pixel-perfect lines
  crisp: true,
  // minimum version: 1..40
  minVersion: 1,
  // error correction level: 'L', 'M', 'Q' or 'H'
  ecLevel: "L",
  // size in pixel
  size: 200,
  // pixel-ratio, null for devicePixelRatio
  ratio: null,
  // code color
  fill: "#333",
  // background color
  back: "#fff",
  // content
  text: "https://github.com/ghostdevv/kjua",
  // roundend corners in pc: 0..100
  rounded: 0,
  // quiet zone in modules
  quiet: 0,
  // modes: 'plain', 'label' or 'image'
  mode: "plain",
  // label/image size and pos in pc: 0..100
  mSize: 30,
  mPosX: 50,
  mPosY: 50,
  // label
  label: "no label",
  fontname: "sans",
  fontcolor: "#333",
  // image element
  image: null
};

// src/lib/qrcode.ts
var qr_gen = __toESM(require("qrcode-generator"), 1);
var RE_CODE_LENGTH_OVERFLOW = /code length overflow/i;
var min_qrcode = /* @__PURE__ */ __name((text, level, min_ver = 1) => {
  min_ver = Math.max(1, min_ver);
  for (let version = min_ver; version <= 40; version += 1) {
    try {
      const qr = qr_gen.default(version, level);
      qr.addData(text);
      qr.make();
      const module_count = qr.getModuleCount();
      const is_dark = /* @__PURE__ */ __name((row, col) => {
        return row >= 0 && row < module_count && col >= 0 && col < module_count && qr.isDark(row, col);
      }, "is_dark");
      return { text, level, version, module_count, is_dark };
    } catch (err) {
      if (!(version < 40 && RE_CODE_LENGTH_OVERFLOW.test(err))) {
        throw new Error(err);
      }
    }
  }
  return null;
}, "min_qrcode");
var quiet_qrcode = /* @__PURE__ */ __name((text = "", level = "L", min_ver = 1, quiet = 0) => {
  const qr = min_qrcode(text, level, min_ver);
  if (qr) {
    const prev_is_dark = qr.is_dark;
    qr.module_count += 2 * quiet;
    qr.is_dark = (row, col) => prev_is_dark(row - quiet, col - quiet);
  }
  return qr;
}, "quiet_qrcode");
var qrcode_default = quiet_qrcode;

// src/kjua.ts
var kjua = /* @__PURE__ */ __name((inputOptions) => {
  const options = { ...defaultOptions, ...inputOptions };
  const qr = qrcode_default(
    options.text,
    options.ecLevel,
    options.minVersion,
    options.quiet
  );
  if (options.render === "svg") {
    return create_svg_qrcode_default(qr, options);
  }
  return create_canvas_qrcode_default(qr, options, options.render === "image");
}, "kjua");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  kjua
});
//# sourceMappingURL=kjua.cjs.map