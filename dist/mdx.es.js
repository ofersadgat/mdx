function Ie(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Ti(e.position) : "start" in e || "end" in e ? Ti(e) : "line" in e || "column" in e ? $n(e) : "";
}
function $n(e) {
  return Pi(e && e.line) + ":" + Pi(e && e.column);
}
function Ti(e) {
  return $n(e && e.start) + "-" + $n(e && e.end);
}
function Pi(e) {
  return e && typeof e == "number" ? e : 1;
}
class G extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(t, n, i) {
    super(), typeof n == "string" && (i = n, n = void 0);
    let r = "", s = {}, a = !1;
    if (n && ("line" in n && "column" in n ? s = { place: n } : "start" in n && "end" in n ? s = { place: n } : "type" in n ? s = {
      ancestors: [n],
      place: n.position
    } : s = { ...n }), typeof t == "string" ? r = t : !s.cause && t && (a = !0, r = t.message, s.cause = t), !s.ruleId && !s.source && typeof i == "string") {
      const l = i.indexOf(":");
      l === -1 ? s.ruleId = i : (s.source = i.slice(0, l), s.ruleId = i.slice(l + 1));
    }
    if (!s.place && s.ancestors && s.ancestors) {
      const l = s.ancestors[s.ancestors.length - 1];
      l && (s.place = l.position);
    }
    const o = s.place && "start" in s.place ? s.place.start : s.place;
    this.ancestors = s.ancestors || void 0, this.cause = s.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file, this.message = r, this.line = o ? o.line : void 0, this.name = Ie(s.place) || "1:1", this.place = s.place || void 0, this.reason = this.message, this.ruleId = s.ruleId || void 0, this.source = s.source || void 0, this.stack = a && s.cause && typeof s.cause.stack == "string" ? s.cause.stack : "", this.actual, this.expected, this.note, this.url;
  }
}
G.prototype.file = "";
G.prototype.name = "";
G.prototype.reason = "";
G.prototype.message = "";
G.prototype.stack = "";
G.prototype.column = void 0;
G.prototype.line = void 0;
G.prototype.ancestors = void 0;
G.prototype.cause = void 0;
G.prototype.fatal = void 0;
G.prototype.place = void 0;
G.prototype.ruleId = void 0;
G.prototype.source = void 0;
const Me = { basename: Ra, dirname: ja, extname: Va, join: Ba, sep: "/" };
function Ra(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  jt(e);
  let n = 0, i = -1, r = e.length, s;
  if (t === void 0 || t.length === 0 || t.length > e.length) {
    for (; r--; )
      if (e.codePointAt(r) === 47) {
        if (s) {
          n = r + 1;
          break;
        }
      } else i < 0 && (s = !0, i = r + 1);
    return i < 0 ? "" : e.slice(n, i);
  }
  if (t === e)
    return "";
  let a = -1, o = t.length - 1;
  for (; r--; )
    if (e.codePointAt(r) === 47) {
      if (s) {
        n = r + 1;
        break;
      }
    } else
      a < 0 && (s = !0, a = r + 1), o > -1 && (e.codePointAt(r) === t.codePointAt(o--) ? o < 0 && (i = r) : (o = -1, i = a));
  return n === i ? i = a : i < 0 && (i = e.length), e.slice(n, i);
}
function ja(e) {
  if (jt(e), e.length === 0)
    return ".";
  let t = -1, n = e.length, i;
  for (; --n; )
    if (e.codePointAt(n) === 47) {
      if (i) {
        t = n;
        break;
      }
    } else i || (i = !0);
  return t < 0 ? e.codePointAt(0) === 47 ? "/" : "." : t === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, t);
}
function Va(e) {
  jt(e);
  let t = e.length, n = -1, i = 0, r = -1, s = 0, a;
  for (; t--; ) {
    const o = e.codePointAt(t);
    if (o === 47) {
      if (a) {
        i = t + 1;
        break;
      }
      continue;
    }
    n < 0 && (a = !0, n = t + 1), o === 46 ? r < 0 ? r = t : s !== 1 && (s = 1) : r > -1 && (s = -1);
  }
  return r < 0 || n < 0 || // We saw a non-dot character immediately before the dot.
  s === 0 || // The (right-most) trimmed path component is exactly `..`.
  s === 1 && r === n - 1 && r === i + 1 ? "" : e.slice(r, n);
}
function Ba(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    jt(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : Ja(n);
}
function Ja(e) {
  jt(e);
  const t = e.codePointAt(0) === 47;
  let n = za(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function za(e, t) {
  let n = "", i = 0, r = -1, s = 0, a = -1, o, l;
  for (; ++a <= e.length; ) {
    if (a < e.length)
      o = e.codePointAt(a);
    else {
      if (o === 47)
        break;
      o = 47;
    }
    if (o === 47) {
      if (!(r === a - 1 || s === 1)) if (r !== a - 1 && s === 2) {
        if (n.length < 2 || i !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
          if (n.length > 2) {
            if (l = n.lastIndexOf("/"), l !== n.length - 1) {
              l < 0 ? (n = "", i = 0) : (n = n.slice(0, l), i = n.length - 1 - n.lastIndexOf("/")), r = a, s = 0;
              continue;
            }
          } else if (n.length > 0) {
            n = "", i = 0, r = a, s = 0;
            continue;
          }
        }
        t && (n = n.length > 0 ? n + "/.." : "..", i = 2);
      } else
        n.length > 0 ? n += "/" + e.slice(r + 1, a) : n = e.slice(r + 1, a), i = a - r - 1;
      r = a, s = 0;
    } else o === 46 && s > -1 ? s++ : s = -1;
  }
  return n;
}
function jt(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const Ua = { cwd: Xa };
function Xa() {
  return "/";
}
function Wn(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function qa(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!Wn(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return Ha(e);
}
function Ha(e) {
  if (e.hostname !== "") {
    const i = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw i.code = "ERR_INVALID_FILE_URL_HOST", i;
  }
  const t = e.pathname;
  let n = -1;
  for (; ++n < t.length; )
    if (t.codePointAt(n) === 37 && t.codePointAt(n + 1) === 50) {
      const i = t.codePointAt(n + 2);
      if (i === 70 || i === 102) {
        const r = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw r.code = "ERR_INVALID_FILE_URL_PATH", r;
      }
    }
  return decodeURIComponent(t);
}
const _n = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
class Yr {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(t) {
    let n;
    t ? Wn(t) ? n = { path: t } : typeof t == "string" || $a(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : Ua.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let i = -1;
    for (; ++i < _n.length; ) {
      const s = _n[i];
      s in n && n[s] !== void 0 && n[s] !== null && (this[s] = s === "history" ? [...n[s]] : n[s]);
    }
    let r;
    for (r in n)
      _n.includes(r) || (this[r] = n[r]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? Me.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(t) {
    Pn(t, "basename"), Tn(t, "basename"), this.path = Me.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? Me.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(t) {
    Ni(this.basename, "dirname"), this.path = Me.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? Me.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(t) {
    if (Tn(t, "extname"), Ni(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = Me.join(this.dirname, this.stem + (t || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(t) {
    Wn(t) && (t = qa(t)), Pn(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? Me.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(t) {
    Pn(t, "stem"), Tn(t, "stem"), this.path = Me.join(this.dirname || "", t + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(t, n, i) {
    const r = this.message(t, n, i);
    throw r.fatal = !0, r;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(t, n, i) {
    const r = this.message(t, n, i);
    return r.fatal = void 0, r;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(t, n, i) {
    const r = new G(
      // @ts-expect-error: the overloads are fine.
      t,
      n,
      i
    );
    return this.path && (r.name = this.path + ":" + r.name, r.file = this.path), r.fatal = !1, this.messages.push(r), r;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(t) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(t || void 0).decode(this.value);
  }
}
function Tn(e, t) {
  if (e && e.includes(Me.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + Me.sep + "`"
    );
}
function Pn(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function Ni(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function $a(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Wa = [
  "md",
  "markdown",
  "mdown",
  "mkdn",
  "mkd",
  "mdwn",
  "mkdown",
  "ron"
], Ga = Wa.map(function(e) {
  return "." + e;
});
function Kr(e, t) {
  const n = Qa(e) ? e : new Yr(e), { format: i, ...r } = t || {};
  return {
    file: n,
    options: {
      format: i === "md" || i === "mdx" ? i : n.extname && (r.mdExtensions || Ga).includes(n.extname) ? "md" : "mdx",
      ...r
    }
  };
}
function Qa(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Ya() {
  return {
    enter: {
      mdxFlowExpression: Za,
      mdxTextExpression: eo
    },
    exit: {
      mdxFlowExpression: Li,
      mdxFlowExpressionChunk: Fi,
      mdxTextExpression: Li,
      mdxTextExpressionChunk: Fi
    }
  };
}
function Ka() {
  return {
    handlers: {
      mdxFlowExpression: Di,
      mdxTextExpression: Di
    },
    unsafe: [
      { character: "{", inConstruct: ["phrasing"] },
      { atBreak: !0, character: "{" }
    ]
  };
}
function Za(e) {
  this.enter({ type: "mdxFlowExpression", value: "" }, e), this.buffer();
}
function eo(e) {
  this.enter({ type: "mdxTextExpression", value: "" }, e), this.buffer();
}
function Li(e) {
  const t = this.resume(), n = e.estree, i = this.stack[this.stack.length - 1];
  i.type === "mdxFlowExpression" || i.type, this.exit(e), i.value = t, n && (i.data = { estree: n });
}
function Fi(e) {
  this.config.enter.data.call(this, e), this.config.exit.data.call(this, e);
}
function Di(e, t, n) {
  const i = e.value || "";
  return "{" + n.indentLines(i, function(s, a, o) {
    return (a === 0 || o ? "" : "  ") + s;
  }) + "}";
}
function Oi(e, t) {
  const n = String(e);
  if (typeof t != "string")
    throw new TypeError("Expected character");
  let i = 0, r = n.indexOf(t);
  for (; r !== -1; )
    i++, r = n.indexOf(t, r + t.length);
  return i;
}
const to = [
  "AElig",
  "AMP",
  "Aacute",
  "Acirc",
  "Agrave",
  "Aring",
  "Atilde",
  "Auml",
  "COPY",
  "Ccedil",
  "ETH",
  "Eacute",
  "Ecirc",
  "Egrave",
  "Euml",
  "GT",
  "Iacute",
  "Icirc",
  "Igrave",
  "Iuml",
  "LT",
  "Ntilde",
  "Oacute",
  "Ocirc",
  "Ograve",
  "Oslash",
  "Otilde",
  "Ouml",
  "QUOT",
  "REG",
  "THORN",
  "Uacute",
  "Ucirc",
  "Ugrave",
  "Uuml",
  "Yacute",
  "aacute",
  "acirc",
  "acute",
  "aelig",
  "agrave",
  "amp",
  "aring",
  "atilde",
  "auml",
  "brvbar",
  "ccedil",
  "cedil",
  "cent",
  "copy",
  "curren",
  "deg",
  "divide",
  "eacute",
  "ecirc",
  "egrave",
  "eth",
  "euml",
  "frac12",
  "frac14",
  "frac34",
  "gt",
  "iacute",
  "icirc",
  "iexcl",
  "igrave",
  "iquest",
  "iuml",
  "laquo",
  "lt",
  "macr",
  "micro",
  "middot",
  "nbsp",
  "not",
  "ntilde",
  "oacute",
  "ocirc",
  "ograve",
  "ordf",
  "ordm",
  "oslash",
  "otilde",
  "ouml",
  "para",
  "plusmn",
  "pound",
  "quot",
  "raquo",
  "reg",
  "sect",
  "shy",
  "sup1",
  "sup2",
  "sup3",
  "szlig",
  "thorn",
  "times",
  "uacute",
  "ucirc",
  "ugrave",
  "uml",
  "uuml",
  "yacute",
  "yen",
  "yuml"
], Mi = {
  0: "�",
  128: "€",
  130: "‚",
  131: "ƒ",
  132: "„",
  133: "…",
  134: "†",
  135: "‡",
  136: "ˆ",
  137: "‰",
  138: "Š",
  139: "‹",
  140: "Œ",
  142: "Ž",
  145: "‘",
  146: "’",
  147: "“",
  148: "”",
  149: "•",
  150: "–",
  151: "—",
  152: "˜",
  153: "™",
  154: "š",
  155: "›",
  156: "œ",
  158: "ž",
  159: "Ÿ"
};
function Zr(e) {
  const t = typeof e == "string" ? e.charCodeAt(0) : e;
  return t >= 48 && t <= 57;
}
function no(e) {
  const t = typeof e == "string" ? e.charCodeAt(0) : e;
  return t >= 97 && t <= 102 || t >= 65 && t <= 70 || t >= 48 && t <= 57;
}
function io(e) {
  const t = typeof e == "string" ? e.charCodeAt(0) : e;
  return t >= 97 && t <= 122 || t >= 65 && t <= 90;
}
function Ri(e) {
  return io(e) || Zr(e);
}
const ji = document.createElement("i");
function Ot(e) {
  const t = "&" + e + ";";
  ji.innerHTML = t;
  const n = ji.textContent;
  return n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n;
}
const ht = String.fromCharCode, ro = [
  "",
  /* 1: Non terminated (named) */
  "Named character references must be terminated by a semicolon",
  /* 2: Non terminated (numeric) */
  "Numeric character references must be terminated by a semicolon",
  /* 3: Empty (named) */
  "Named character references cannot be empty",
  /* 4: Empty (numeric) */
  "Numeric character references cannot be empty",
  /* 5: Unknown (named) */
  "Named character references must be known",
  /* 6: Disallowed (numeric) */
  "Numeric character references cannot be disallowed",
  /* 7: Prohibited (numeric) */
  "Numeric character references cannot be outside the permissible Unicode range"
];
function so(e, t = {}) {
  const n = typeof t.additional == "string" ? t.additional.charCodeAt(0) : t.additional, i = [];
  let r = 0, s = -1, a = "", o, l;
  t.position && ("start" in t.position || "indent" in t.position ? (l = t.position.indent, o = t.position.start) : o = t.position);
  let u = (o ? o.line : 0) || 1, c = (o ? o.column : 0) || 1, p = h(), m;
  for (r--; ++r <= e.length; )
    if (m === 10 && (c = (l ? l[s] : 0) || 1), m = e.charCodeAt(r), m === 38) {
      const I = e.charCodeAt(r + 1);
      if (I === 9 || I === 10 || I === 12 || I === 32 || I === 38 || I === 60 || Number.isNaN(I) || n && I === n) {
        a += ht(m), c++;
        continue;
      }
      const y = r + 1;
      let A = y, E = y, T;
      if (I === 35) {
        E = ++A;
        const L = e.charCodeAt(E);
        L === 88 || L === 120 ? (T = "hexadecimal", E = ++A) : T = "decimal";
      } else
        T = "named";
      let S = "", x = "", g = "";
      const C = T === "named" ? Ri : T === "decimal" ? Zr : no;
      for (E--; ++E <= e.length; ) {
        const L = e.charCodeAt(E);
        if (!C(L))
          break;
        g += ht(L), T === "named" && to.includes(g) && (S = g, x = Ot(g));
      }
      let P = e.charCodeAt(E) === 59;
      if (P) {
        E++;
        const L = T === "named" ? Ot(g) : !1;
        L && (S = g, x = L);
      }
      let O = 1 + E - y, D = "";
      if (!(!P && t.nonTerminated === !1)) if (!g)
        T !== "named" && v(4, O);
      else if (T === "named") {
        if (P && !x)
          v(5, 1);
        else if (S !== g && (E = A + S.length, O = 1 + E - A, P = !1), !P) {
          const L = S ? 1 : 3;
          if (t.attribute) {
            const $ = e.charCodeAt(E);
            $ === 61 ? (v(L, O), x = "") : Ri($) ? x = "" : v(L, O);
          } else
            v(L, O);
        }
        D = x;
      } else {
        P || v(2, O);
        let L = Number.parseInt(
          g,
          T === "hexadecimal" ? 16 : 10
        );
        if (ao(L))
          v(7, O), D = ht(
            65533
            /* `�` */
          );
        else if (L in Mi)
          v(6, O), D = Mi[L];
        else {
          let $ = "";
          oo(L) && v(6, O), L > 65535 && (L -= 65536, $ += ht(L >>> 10 | 55296), L = 56320 | L & 1023), D = $ + ht(L);
        }
      }
      if (D) {
        b(), p = h(), r = E - 1, c += E - y + 1, i.push(D);
        const L = h();
        L.offset++, t.reference && t.reference.call(
          t.referenceContext,
          D,
          { start: p, end: L },
          e.slice(y - 1, E)
        ), p = L;
      } else
        g = e.slice(y - 1, E), a += g, c += g.length, r = E - 1;
    } else
      m === 10 && (u++, s++, c = 0), Number.isNaN(m) ? b() : (a += ht(m), c++);
  return i.join("");
  function h() {
    return {
      line: u,
      column: c,
      offset: r + ((o ? o.offset : 0) || 0)
    };
  }
  function v(I, y) {
    let A;
    t.warning && (A = h(), A.column += y, A.offset += y, t.warning.call(
      t.warningContext,
      ro[I],
      A,
      I
    ));
  }
  function b() {
    a && (i.push(a), t.text && t.text.call(t.textContext, a, {
      start: p,
      end: h()
    }), a = "");
  }
}
function ao(e) {
  return e >= 55296 && e <= 57343 || e > 1114111;
}
function oo(e) {
  return e >= 1 && e <= 8 || e === 11 || e >= 13 && e <= 31 || e >= 127 && e <= 159 || e >= 64976 && e <= 65007 || (e & 65535) === 65535 || (e & 65535) === 65534;
}
const lo = /["&'<>`]/g, uo = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, co = (
  // eslint-disable-next-line no-control-regex, unicorn/no-hex-escape
  /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g
), po = /[|\\{}()[\]^$+*?.]/g, Vi = /* @__PURE__ */ new WeakMap();
function ho(e, t) {
  if (e = e.replace(
    t.subset ? fo(t.subset) : lo,
    i
  ), t.subset || t.escapeOnly)
    return e;
  return e.replace(uo, n).replace(co, i);
  function n(r, s, a) {
    return t.format(
      (r.charCodeAt(0) - 55296) * 1024 + r.charCodeAt(1) - 56320 + 65536,
      a.charCodeAt(s + 2),
      t
    );
  }
  function i(r, s, a) {
    return t.format(
      r.charCodeAt(0),
      a.charCodeAt(s + 1),
      t
    );
  }
}
function fo(e) {
  let t = Vi.get(e);
  return t || (t = mo(e), Vi.set(e, t)), t;
}
function mo(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t.push(e[n].replace(po, "\\$&"));
  return new RegExp("(?:" + t.join("|") + ")", "g");
}
function xo(e) {
  return "&#x" + e.toString(16).toUpperCase() + ";";
}
function go(e, t) {
  return ho(e, Object.assign({ format: xo }, t));
}
const es = "  ";
function yo() {
  return {
    canContainEols: ["mdxJsxTextElement"],
    enter: {
      mdxJsxFlowTag: i,
      mdxJsxFlowTagClosingMarker: r,
      mdxJsxFlowTagAttribute: p,
      mdxJsxFlowTagExpressionAttribute: m,
      mdxJsxFlowTagAttributeValueLiteral: e,
      mdxJsxFlowTagAttributeValueExpression: e,
      mdxJsxFlowTagSelfClosingMarker: a,
      mdxJsxTextTag: i,
      mdxJsxTextTagClosingMarker: r,
      mdxJsxTextTagAttribute: p,
      mdxJsxTextTagExpressionAttribute: m,
      mdxJsxTextTagAttributeValueLiteral: e,
      mdxJsxTextTagAttributeValueExpression: e,
      mdxJsxTextTagSelfClosingMarker: a
    },
    exit: {
      mdxJsxFlowTagClosingMarker: o,
      mdxJsxFlowTagNamePrimary: l,
      mdxJsxFlowTagNameMember: u,
      mdxJsxFlowTagNameLocal: c,
      mdxJsxFlowTagExpressionAttribute: h,
      mdxJsxFlowTagExpressionAttributeValue: n,
      mdxJsxFlowTagAttributeNamePrimary: v,
      mdxJsxFlowTagAttributeNameLocal: b,
      mdxJsxFlowTagAttributeValueLiteral: I,
      mdxJsxFlowTagAttributeValueLiteralValue: n,
      mdxJsxFlowTagAttributeValueExpression: y,
      mdxJsxFlowTagAttributeValueExpressionValue: n,
      mdxJsxFlowTagSelfClosingMarker: A,
      mdxJsxFlowTag: E,
      mdxJsxTextTagClosingMarker: o,
      mdxJsxTextTagNamePrimary: l,
      mdxJsxTextTagNameMember: u,
      mdxJsxTextTagNameLocal: c,
      mdxJsxTextTagExpressionAttribute: h,
      mdxJsxTextTagExpressionAttributeValue: n,
      mdxJsxTextTagAttributeNamePrimary: v,
      mdxJsxTextTagAttributeNameLocal: b,
      mdxJsxTextTagAttributeValueLiteral: I,
      mdxJsxTextTagAttributeValueLiteralValue: n,
      mdxJsxTextTagAttributeValueExpression: y,
      mdxJsxTextTagAttributeValueExpressionValue: n,
      mdxJsxTextTagSelfClosingMarker: A,
      mdxJsxTextTag: E
    }
  };
  function e() {
    this.buffer();
  }
  function t(g) {
    return { line: g.line, column: g.column, offset: g.offset };
  }
  function n(g) {
    this.config.enter.data.call(this, g), this.config.exit.data.call(this, g);
  }
  function i(g) {
    const C = {
      name: void 0,
      attributes: [],
      close: !1,
      selfClosing: !1,
      start: g.start,
      end: g.end
    };
    this.data.mdxJsxTagStack || (this.data.mdxJsxTagStack = []), this.data.mdxJsxTag = C, this.buffer();
  }
  function r(g) {
    if (this.data.mdxJsxTagStack.length === 0)
      throw new G(
        "Unexpected closing slash `/` in tag, expected an open tag first",
        { start: g.start, end: g.end },
        "mdast-util-mdx-jsx:unexpected-closing-slash"
      );
  }
  function s(g) {
    if (this.data.mdxJsxTag.close)
      throw new G(
        "Unexpected attribute in closing tag, expected the end of the tag",
        { start: g.start, end: g.end },
        "mdast-util-mdx-jsx:unexpected-attribute"
      );
  }
  function a(g) {
    if (this.data.mdxJsxTag.close)
      throw new G(
        "Unexpected self-closing slash `/` in closing tag, expected the end of the tag",
        { start: g.start, end: g.end },
        "mdast-util-mdx-jsx:unexpected-self-closing-slash"
      );
  }
  function o() {
    const g = this.data.mdxJsxTag;
    g.close = !0;
  }
  function l(g) {
    const C = this.data.mdxJsxTag;
    C.name = this.sliceSerialize(g);
  }
  function u(g) {
    const C = this.data.mdxJsxTag;
    C.name += "." + this.sliceSerialize(g);
  }
  function c(g) {
    const C = this.data.mdxJsxTag;
    C.name += ":" + this.sliceSerialize(g);
  }
  function p(g) {
    const C = this.data.mdxJsxTag;
    s.call(this, g), C.attributes.push({
      type: "mdxJsxAttribute",
      name: "",
      value: null,
      position: {
        start: t(g.start),
        // @ts-expect-error: `end` will be patched later.
        end: void 0
      }
    });
  }
  function m(g) {
    const C = this.data.mdxJsxTag;
    s.call(this, g), C.attributes.push({ type: "mdxJsxExpressionAttribute", value: "" }), this.buffer();
  }
  function h(g) {
    const C = this.data.mdxJsxTag, P = C.attributes[C.attributes.length - 1];
    P.type;
    const O = g.estree;
    P.value = this.resume(), O && (P.data = { estree: O });
  }
  function v(g) {
    const C = this.data.mdxJsxTag, P = C.attributes[C.attributes.length - 1];
    P.type, P.name = this.sliceSerialize(g), P.position, P.position.end = t(g.end);
  }
  function b(g) {
    const C = this.data.mdxJsxTag, P = C.attributes[C.attributes.length - 1];
    P.type, P.name += ":" + this.sliceSerialize(g), P.position, P.position.end = t(g.end);
  }
  function I(g) {
    const C = this.data.mdxJsxTag, P = C.attributes[C.attributes.length - 1];
    P.value = so(this.resume(), { nonTerminated: !1 }), P.position, P.position.end = t(g.end);
  }
  function y(g) {
    const C = this.data.mdxJsxTag, P = C.attributes[C.attributes.length - 1];
    P.type;
    const O = { type: "mdxJsxAttributeValueExpression", value: this.resume() }, D = g.estree;
    D && (O.data = { estree: D }), P.value = O, P.position, P.position.end = t(g.end);
  }
  function A() {
    const g = this.data.mdxJsxTag;
    g.selfClosing = !0;
  }
  function E(g) {
    const C = this.data.mdxJsxTag, P = this.data.mdxJsxTagStack, O = P[P.length - 1];
    if (C.close && O.name !== C.name)
      throw new G(
        "Unexpected closing tag `" + x(C) + "`, expected corresponding closing tag for `" + x(O) + "` (" + Ie(O) + ")",
        { start: g.start, end: g.end },
        "mdast-util-mdx-jsx:end-tag-mismatch"
      );
    this.resume(), C.close ? P.pop() : this.enter(
      {
        type: g.type === "mdxJsxTextTag" ? "mdxJsxTextElement" : "mdxJsxFlowElement",
        name: C.name || null,
        attributes: C.attributes,
        children: []
      },
      g,
      T
    ), C.selfClosing || C.close ? this.exit(g, S) : P.push(C);
  }
  function T(g, C) {
    const P = this.data.mdxJsxTagStack, O = P[P.length - 1], D = g ? " before the end of `" + g.type + "`" : "", L = g ? { start: g.start, end: g.end } : void 0;
    throw new G(
      "Expected a closing tag for `" + x(O) + "` (" + Ie({ start: C.start, end: C.end }) + ")" + D,
      L,
      "mdast-util-mdx-jsx:end-tag-mismatch"
    );
  }
  function S(g, C) {
    const P = this.data.mdxJsxTag;
    throw new G(
      "Expected the closing tag `" + x(P) + "` either after the end of `" + C.type + "` (" + Ie(C.end) + ") or another opening tag after the start of `" + C.type + "` (" + Ie(C.start) + ")",
      { start: g.start, end: g.end },
      "mdast-util-mdx-jsx:end-tag-mismatch"
    );
  }
  function x(g) {
    return "<" + (g.close ? "/" : "") + (g.name || "") + ">";
  }
}
function bo(e) {
  const t = e || {}, n = t.quote || '"', i = t.quoteSmart || !1, r = t.tightSelfClosing || !1, s = t.printWidth || Number.POSITIVE_INFINITY, a = n === '"' ? "'" : '"';
  if (n !== '"' && n !== "'")
    throw new Error(
      "Cannot serialize attribute values with `" + n + "` for `options.quote`, expected `\"`, or `'`"
    );
  return o.peek = ko, {
    handlers: {
      mdxJsxFlowElement: o,
      mdxJsxTextElement: o
    },
    unsafe: [
      { character: "<", inConstruct: ["phrasing"] },
      { atBreak: !0, character: "<" }
    ],
    // Always generate fenced code (never indented code).
    fences: !0,
    // Always generate links with resources (never autolinks).
    resourceLink: !0
  };
  function o(l, u, c, p) {
    const m = l.type === "mdxJsxFlowElement", h = l.name ? !l.children || l.children.length === 0 : !1, v = ts(c), b = ns(v), I = c.createTracker(p), y = c.createTracker(p), A = [], E = (m ? b : "") + "<" + (l.name || ""), T = c.enter(l.type);
    if (I.move(E), y.move(E), l.attributes && l.attributes.length > 0) {
      if (!l.name)
        throw new Error("Cannot serialize fragment w/ attributes");
      let P = -1;
      for (; ++P < l.attributes.length; ) {
        const O = l.attributes[P];
        let D;
        if (O.type === "mdxJsxExpressionAttribute")
          D = "{" + (O.value || "") + "}";
        else {
          if (!O.name)
            throw new Error("Cannot serialize attribute w/o name");
          const L = O.value, $ = O.name;
          let K = "";
          if (L != null) if (typeof L == "object")
            K = "{" + (L.value || "") + "}";
          else {
            const z = i && Oi(L, n) > Oi(L, a) ? a : n;
            K = z + go(L, { subset: [z] }) + z;
          }
          D = $ + (K ? "=" : "") + K;
        }
        A.push(D);
      }
    }
    let S = !1;
    const x = A.join(" ");
    // Block:
    m && // Including a line ending (expressions).
    (/\r?\n|\r/.test(x) || // Current position (including `<tag`).
    I.current().now.column + // -1 because columns, +1 for ` ` before attributes.
    // Attributes joined by spaces.
    x.length + // ` />`.
    (h ? r ? 2 : 3 : 1) > s) && (S = !0);
    let g = I, C = E;
    if (S) {
      g = y;
      let P = -1;
      for (; ++P < A.length; )
        A[P] = b + es + A[P];
      C += g.move(
        `
` + A.join(`
`) + `
` + b
      );
    } else x && (C += g.move(" " + x));
    return h && (C += g.move(
      (r || S ? "" : " ") + "/"
    )), C += g.move(">"), l.children && l.children.length > 0 && (l.type === "mdxJsxTextElement" ? C += g.move(
      // @ts-expect-error: `containerPhrasing` is typed correctly, but TS
      // generates *hardcoded* types, which means that our dynamically added
      // directives are not present.
      // At some point, TS should fix that, and `from-markdown` should be fine.
      c.containerPhrasing(l, {
        ...g.current(),
        before: ">",
        after: "<"
      })
    ) : (g.shift(2), C += g.move(`
`), C += g.move(wo(l, c, g.current())), C += g.move(`
`))), h || (C += g.move(
      (m ? b : "") + "</" + (l.name || "") + ">"
    )), T(), C;
  }
}
function wo(e, t, n) {
  const i = t.indexStack, r = e.children, s = t.createTracker(n), a = ns(ts(t)), o = [];
  let l = -1;
  for (i.push(-1); ++l < r.length; ) {
    const u = r[l];
    i[i.length - 1] = l;
    const c = { before: `
`, after: `
`, ...s.current() }, p = t.handle(u, e, t, c), m = u.type === "mdxJsxFlowElement" ? p : t.indentLines(p, function(h, v, b) {
      return (b ? "" : a) + h;
    });
    o.push(s.move(m)), u.type !== "list" && (t.bulletLastUsed = void 0), l < r.length - 1 && o.push(s.move(`

`));
  }
  return i.pop(), o.join("");
}
function ts(e) {
  let t = 0, n = e.stack.length;
  for (; --n > -1; ) {
    const i = e.stack[n];
    if (i === "blockquote" || i === "listItem") break;
    i === "mdxJsxFlowElement" && t++;
  }
  return t;
}
function ns(e) {
  return es.repeat(e);
}
function ko() {
  return "<";
}
function vo() {
  return {
    enter: { mdxjsEsm: Eo },
    exit: { mdxjsEsm: Co, mdxjsEsmData: Io }
  };
}
function So() {
  return { handlers: { mdxjsEsm: Ao } };
}
function Eo(e) {
  this.enter({ type: "mdxjsEsm", value: "" }, e), this.buffer();
}
function Co(e) {
  const t = this.resume(), n = this.stack[this.stack.length - 1];
  n.type, this.exit(e);
  const i = e.estree;
  n.value = t, i && (n.data = { estree: i });
}
function Io(e) {
  this.config.enter.data.call(this, e), this.config.exit.data.call(this, e);
}
function Ao(e) {
  return e.value || "";
}
function _o() {
  return [
    Ya(),
    yo(),
    vo()
  ];
}
function To(e) {
  return {
    extensions: [
      Ka(),
      bo(e),
      So()
    ]
  };
}
var Po = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 81, 2, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 9, 5351, 0, 7, 14, 13835, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 983, 6, 110, 6, 6, 9, 4759, 9, 787719, 239], is = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 4026, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 757, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 4191], No = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࢘-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-ᫎᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‌‍‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯・꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿･", rs = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-ࢎࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೝೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꟊꟐꟑꟓꟕ-ꟙꟲ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", Nn = {
  3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
  5: "class enum extends super const export import",
  6: "enum",
  strict: "implements interface let package private protected public static yield",
  strictBind: "eval arguments"
}, Ln = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this", Lo = {
  5: Ln,
  "5module": Ln + " export import",
  6: Ln + " const class extends export import super"
}, Fo = /^in(stanceof)?$/, Do = new RegExp("[" + rs + "]"), Oo = new RegExp("[" + rs + No + "]");
function Gn(e, t) {
  for (var n = 65536, i = 0; i < t.length; i += 2) {
    if (n += t[i], n > e)
      return !1;
    if (n += t[i + 1], n >= e)
      return !0;
  }
  return !1;
}
function je(e, t) {
  return e < 65 ? e === 36 : e < 91 ? !0 : e < 97 ? e === 95 : e < 123 ? !0 : e <= 65535 ? e >= 170 && Do.test(String.fromCharCode(e)) : t === !1 ? !1 : Gn(e, is);
}
function at(e, t) {
  return e < 48 ? e === 36 : e < 58 ? !0 : e < 65 ? !1 : e < 91 ? !0 : e < 97 ? e === 95 : e < 123 ? !0 : e <= 65535 ? e >= 170 && Oo.test(String.fromCharCode(e)) : t === !1 ? !1 : Gn(e, is) || Gn(e, Po);
}
var W = function(t, n) {
  n === void 0 && (n = {}), this.label = t, this.keyword = n.keyword, this.beforeExpr = !!n.beforeExpr, this.startsExpr = !!n.startsExpr, this.isLoop = !!n.isLoop, this.isAssign = !!n.isAssign, this.prefix = !!n.prefix, this.postfix = !!n.postfix, this.binop = n.binop || null, this.updateContext = null;
};
function we(e, t) {
  return new W(e, { beforeExpr: !0, binop: t });
}
var ke = { beforeExpr: !0 }, pe = { startsExpr: !0 }, bn = {};
function H(e, t) {
  return t === void 0 && (t = {}), t.keyword = e, bn[e] = new W(e, t);
}
var f = {
  num: new W("num", pe),
  regexp: new W("regexp", pe),
  string: new W("string", pe),
  name: new W("name", pe),
  privateId: new W("privateId", pe),
  eof: new W("eof"),
  // Punctuation token types.
  bracketL: new W("[", { beforeExpr: !0, startsExpr: !0 }),
  bracketR: new W("]"),
  braceL: new W("{", { beforeExpr: !0, startsExpr: !0 }),
  braceR: new W("}"),
  parenL: new W("(", { beforeExpr: !0, startsExpr: !0 }),
  parenR: new W(")"),
  comma: new W(",", ke),
  semi: new W(";", ke),
  colon: new W(":", ke),
  dot: new W("."),
  question: new W("?", ke),
  questionDot: new W("?."),
  arrow: new W("=>", ke),
  template: new W("template"),
  invalidTemplate: new W("invalidTemplate"),
  ellipsis: new W("...", ke),
  backQuote: new W("`", pe),
  dollarBraceL: new W("${", { beforeExpr: !0, startsExpr: !0 }),
  // Operators. These carry several kinds of properties to help the
  // parser use them properly (the presence of these properties is
  // what categorizes them as operators).
  //
  // `binop`, when present, specifies that this operator is a binary
  // operator, and will refer to its precedence.
  //
  // `prefix` and `postfix` mark the operator as a prefix or postfix
  // unary operator.
  //
  // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
  // binary operators with a very low precedence, that should result
  // in AssignmentExpression nodes.
  eq: new W("=", { beforeExpr: !0, isAssign: !0 }),
  assign: new W("_=", { beforeExpr: !0, isAssign: !0 }),
  incDec: new W("++/--", { prefix: !0, postfix: !0, startsExpr: !0 }),
  prefix: new W("!/~", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
  logicalOR: we("||", 1),
  logicalAND: we("&&", 2),
  bitwiseOR: we("|", 3),
  bitwiseXOR: we("^", 4),
  bitwiseAND: we("&", 5),
  equality: we("==/!=/===/!==", 6),
  relational: we("</>/<=/>=", 7),
  bitShift: we("<</>>/>>>", 8),
  plusMin: new W("+/-", { beforeExpr: !0, binop: 9, prefix: !0, startsExpr: !0 }),
  modulo: we("%", 10),
  star: we("*", 10),
  slash: we("/", 10),
  starstar: new W("**", { beforeExpr: !0 }),
  coalesce: we("??", 1),
  // Keyword token types.
  _break: H("break"),
  _case: H("case", ke),
  _catch: H("catch"),
  _continue: H("continue"),
  _debugger: H("debugger"),
  _default: H("default", ke),
  _do: H("do", { isLoop: !0, beforeExpr: !0 }),
  _else: H("else", ke),
  _finally: H("finally"),
  _for: H("for", { isLoop: !0 }),
  _function: H("function", pe),
  _if: H("if"),
  _return: H("return", ke),
  _switch: H("switch"),
  _throw: H("throw", ke),
  _try: H("try"),
  _var: H("var"),
  _const: H("const"),
  _while: H("while", { isLoop: !0 }),
  _with: H("with"),
  _new: H("new", { beforeExpr: !0, startsExpr: !0 }),
  _this: H("this", pe),
  _super: H("super", pe),
  _class: H("class", pe),
  _extends: H("extends", ke),
  _export: H("export"),
  _import: H("import", pe),
  _null: H("null", pe),
  _true: H("true", pe),
  _false: H("false", pe),
  _in: H("in", { beforeExpr: !0, binop: 7 }),
  _instanceof: H("instanceof", { beforeExpr: !0, binop: 7 }),
  _typeof: H("typeof", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
  _void: H("void", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
  _delete: H("delete", { beforeExpr: !0, prefix: !0, startsExpr: !0 })
}, be = /\r\n?|\n|\u2028|\u2029/, ss = new RegExp(be.source, "g");
function ot(e) {
  return e === 10 || e === 13 || e === 8232 || e === 8233;
}
function as(e, t, n) {
  n === void 0 && (n = e.length);
  for (var i = t; i < n; i++) {
    var r = e.charCodeAt(i);
    if (ot(r))
      return i < n - 1 && r === 13 && e.charCodeAt(i + 1) === 10 ? i + 2 : i + 1;
  }
  return -1;
}
var oi = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/, Se = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g, os = Object.prototype, Mo = os.hasOwnProperty, Ro = os.toString, Vt = Object.hasOwn || function(e, t) {
  return Mo.call(e, t);
}, Bi = Array.isArray || function(e) {
  return Ro.call(e) === "[object Array]";
}, Ji = /* @__PURE__ */ Object.create(null);
function Ke(e) {
  return Ji[e] || (Ji[e] = new RegExp("^(?:" + e.replace(/ /g, "|") + ")$"));
}
function et(e) {
  return e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode((e >> 10) + 55296, (e & 1023) + 56320));
}
var jo = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/, kt = function(t, n) {
  this.line = t, this.column = n;
};
kt.prototype.offset = function(t) {
  return new kt(this.line, this.column + t);
};
var Bt = function(t, n, i) {
  this.start = n, this.end = i, t.sourceFile !== null && (this.source = t.sourceFile);
};
function li(e, t) {
  for (var n = 1, i = 0; ; ) {
    var r = as(e, i, t);
    if (r < 0)
      return new kt(n, t - i);
    ++n, i = r;
  }
}
var ln = {
  // `ecmaVersion` indicates the ECMAScript version to parse. Must be
  // either 3, 5, 6 (or 2015), 7 (2016), 8 (2017), 9 (2018), 10
  // (2019), 11 (2020), 12 (2021), 13 (2022), 14 (2023), or `"latest"`
  // (the latest version the library supports). This influences
  // support for strict mode, the set of reserved words, and support
  // for new syntax features.
  ecmaVersion: null,
  // `sourceType` indicates the mode the code should be parsed in.
  // Can be either `"script"` or `"module"`. This influences global
  // strict mode and parsing of `import` and `export` declarations.
  sourceType: "script",
  // `onInsertedSemicolon` can be a callback that will be called when
  // a semicolon is automatically inserted. It will be passed the
  // position of the inserted semicolon as an offset, and if
  // `locations` is enabled, it is given the location as a `{line,
  // column}` object as second argument.
  onInsertedSemicolon: null,
  // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
  // trailing commas.
  onTrailingComma: null,
  // By default, reserved words are only enforced if ecmaVersion >= 5.
  // Set `allowReserved` to a boolean value to explicitly turn this on
  // an off. When this option has the value "never", reserved words
  // and keywords can also not be used as property names.
  allowReserved: null,
  // When enabled, a return at the top level is not considered an
  // error.
  allowReturnOutsideFunction: !1,
  // When enabled, import/export statements are not constrained to
  // appearing at the top of the program, and an import.meta expression
  // in a script isn't considered an error.
  allowImportExportEverywhere: !1,
  // By default, await identifiers are allowed to appear at the top-level scope only if ecmaVersion >= 2022.
  // When enabled, await identifiers are allowed to appear at the top-level scope,
  // but they are still not allowed in non-async functions.
  allowAwaitOutsideFunction: null,
  // When enabled, super identifiers are not constrained to
  // appearing in methods and do not raise an error when they appear elsewhere.
  allowSuperOutsideMethod: null,
  // When enabled, hashbang directive in the beginning of file is
  // allowed and treated as a line comment. Enabled by default when
  // `ecmaVersion` >= 2023.
  allowHashBang: !1,
  // By default, the parser will verify that private properties are
  // only used in places where they are valid and have been declared.
  // Set this to false to turn such checks off.
  checkPrivateFields: !0,
  // When `locations` is on, `loc` properties holding objects with
  // `start` and `end` properties in `{line, column}` form (with
  // line being 1-based and column 0-based) will be attached to the
  // nodes.
  locations: !1,
  // A function can be passed as `onToken` option, which will
  // cause Acorn to call that function with object in the same
  // format as tokens returned from `tokenizer().getToken()`. Note
  // that you are not allowed to call the parser from the
  // callback—that will corrupt its internal state.
  onToken: null,
  // A function can be passed as `onComment` option, which will
  // cause Acorn to call that function with `(block, text, start,
  // end)` parameters whenever a comment is skipped. `block` is a
  // boolean indicating whether this is a block (`/* */`) comment,
  // `text` is the content of the comment, and `start` and `end` are
  // character offsets that denote the start and end of the comment.
  // When the `locations` option is on, two more parameters are
  // passed, the full `{line, column}` locations of the start and
  // end of the comments. Note that you are not allowed to call the
  // parser from the callback—that will corrupt its internal state.
  // When this option has an array as value, objects representing the
  // comments are pushed to it.
  onComment: null,
  // Nodes have their start and end characters offsets recorded in
  // `start` and `end` properties (directly on the node, rather than
  // the `loc` object, which holds line/column data. To also add a
  // [semi-standardized][range] `range` property holding a `[start,
  // end]` array with the same numbers, set the `ranges` option to
  // `true`.
  //
  // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
  ranges: !1,
  // It is possible to parse multiple files into a single AST by
  // passing the tree produced by parsing the first file as
  // `program` option in subsequent parses. This will add the
  // toplevel forms of the parsed file to the `Program` (top) node
  // of an existing parse tree.
  program: null,
  // When `locations` is on, you can pass this to record the source
  // file in every node's `loc` object.
  sourceFile: null,
  // This value, if given, is stored in every node, whether
  // `locations` is on or off.
  directSourceFile: null,
  // When enabled, parenthesized expressions are represented by
  // (non-standard) ParenthesizedExpression nodes
  preserveParens: !1
}, zi = !1;
function Vo(e) {
  var t = {};
  for (var n in ln)
    t[n] = e && Vt(e, n) ? e[n] : ln[n];
  if (t.ecmaVersion === "latest" ? t.ecmaVersion = 1e8 : t.ecmaVersion == null ? (!zi && typeof console == "object" && console.warn && (zi = !0, console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`)), t.ecmaVersion = 11) : t.ecmaVersion >= 2015 && (t.ecmaVersion -= 2009), t.allowReserved == null && (t.allowReserved = t.ecmaVersion < 5), (!e || e.allowHashBang == null) && (t.allowHashBang = t.ecmaVersion >= 14), Bi(t.onToken)) {
    var i = t.onToken;
    t.onToken = function(r) {
      return i.push(r);
    };
  }
  return Bi(t.onComment) && (t.onComment = Bo(t, t.onComment)), t;
}
function Bo(e, t) {
  return function(n, i, r, s, a, o) {
    var l = {
      type: n ? "Block" : "Line",
      value: i,
      start: r,
      end: s
    };
    e.locations && (l.loc = new Bt(this, a, o)), e.ranges && (l.range = [r, s]), t.push(l);
  };
}
var Mt = 1, vt = 2, ui = 4, ls = 8, us = 16, cs = 32, ci = 64, ps = 128, Jt = 256, pi = Mt | vt | Jt;
function hi(e, t) {
  return vt | (e ? ui : 0) | (t ? ls : 0);
}
var un = 0, fi = 1, We = 2, hs = 3, fs = 4, ms = 5, ie = function(t, n, i) {
  this.options = t = Vo(t), this.sourceFile = t.sourceFile, this.keywords = Ke(Lo[t.ecmaVersion >= 6 ? 6 : t.sourceType === "module" ? "5module" : 5]);
  var r = "";
  t.allowReserved !== !0 && (r = Nn[t.ecmaVersion >= 6 ? 6 : t.ecmaVersion === 5 ? 5 : 3], t.sourceType === "module" && (r += " await")), this.reservedWords = Ke(r);
  var s = (r ? r + " " : "") + Nn.strict;
  this.reservedWordsStrict = Ke(s), this.reservedWordsStrictBind = Ke(s + " " + Nn.strictBind), this.input = String(n), this.containsEsc = !1, i ? (this.pos = i, this.lineStart = this.input.lastIndexOf(`
`, i - 1) + 1, this.curLine = this.input.slice(0, this.lineStart).split(be).length) : (this.pos = this.lineStart = 0, this.curLine = 1), this.type = f.eof, this.value = null, this.start = this.end = this.pos, this.startLoc = this.endLoc = this.curPosition(), this.lastTokEndLoc = this.lastTokStartLoc = null, this.lastTokStart = this.lastTokEnd = this.pos, this.context = this.initialContext(), this.exprAllowed = !0, this.inModule = t.sourceType === "module", this.strict = this.inModule || this.strictDirective(this.pos), this.potentialArrowAt = -1, this.potentialArrowInForAwait = !1, this.yieldPos = this.awaitPos = this.awaitIdentPos = 0, this.labels = [], this.undefinedExports = /* @__PURE__ */ Object.create(null), this.pos === 0 && t.allowHashBang && this.input.slice(0, 2) === "#!" && this.skipLineComment(2), this.scopeStack = [], this.enterScope(Mt), this.regexpState = null, this.privateNameStack = [];
}, Ve = { inFunction: { configurable: !0 }, inGenerator: { configurable: !0 }, inAsync: { configurable: !0 }, canAwait: { configurable: !0 }, allowSuper: { configurable: !0 }, allowDirectSuper: { configurable: !0 }, treatFunctionsAsVar: { configurable: !0 }, allowNewDotTarget: { configurable: !0 }, inClassStaticBlock: { configurable: !0 } };
ie.prototype.parse = function() {
  var t = this.options.program || this.startNode();
  return this.nextToken(), this.parseTopLevel(t);
};
Ve.inFunction.get = function() {
  return (this.currentVarScope().flags & vt) > 0;
};
Ve.inGenerator.get = function() {
  return (this.currentVarScope().flags & ls) > 0 && !this.currentVarScope().inClassFieldInit;
};
Ve.inAsync.get = function() {
  return (this.currentVarScope().flags & ui) > 0 && !this.currentVarScope().inClassFieldInit;
};
Ve.canAwait.get = function() {
  for (var e = this.scopeStack.length - 1; e >= 0; e--) {
    var t = this.scopeStack[e];
    if (t.inClassFieldInit || t.flags & Jt)
      return !1;
    if (t.flags & vt)
      return (t.flags & ui) > 0;
  }
  return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
};
Ve.allowSuper.get = function() {
  var e = this.currentThisScope(), t = e.flags, n = e.inClassFieldInit;
  return (t & ci) > 0 || n || this.options.allowSuperOutsideMethod;
};
Ve.allowDirectSuper.get = function() {
  return (this.currentThisScope().flags & ps) > 0;
};
Ve.treatFunctionsAsVar.get = function() {
  return this.treatFunctionsAsVarInScope(this.currentScope());
};
Ve.allowNewDotTarget.get = function() {
  var e = this.currentThisScope(), t = e.flags, n = e.inClassFieldInit;
  return (t & (vt | Jt)) > 0 || n;
};
Ve.inClassStaticBlock.get = function() {
  return (this.currentVarScope().flags & Jt) > 0;
};
ie.extend = function() {
  for (var t = [], n = arguments.length; n--; ) t[n] = arguments[n];
  for (var i = this, r = 0; r < t.length; r++)
    i = t[r](i);
  return i;
};
ie.parse = function(t, n) {
  return new this(n, t).parse();
};
ie.parseExpressionAt = function(t, n, i) {
  var r = new this(i, t, n);
  return r.nextToken(), r.parseExpression();
};
ie.tokenizer = function(t, n) {
  return new this(n, t);
};
Object.defineProperties(ie.prototype, Ve);
var ue = ie.prototype, Jo = /^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;
ue.strictDirective = function(e) {
  if (this.options.ecmaVersion < 5)
    return !1;
  for (; ; ) {
    Se.lastIndex = e, e += Se.exec(this.input)[0].length;
    var t = Jo.exec(this.input.slice(e));
    if (!t)
      return !1;
    if ((t[1] || t[2]) === "use strict") {
      Se.lastIndex = e + t[0].length;
      var n = Se.exec(this.input), i = n.index + n[0].length, r = this.input.charAt(i);
      return r === ";" || r === "}" || be.test(n[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(r) || r === "!" && this.input.charAt(i + 1) === "=");
    }
    e += t[0].length, Se.lastIndex = e, e += Se.exec(this.input)[0].length, this.input[e] === ";" && e++;
  }
};
ue.eat = function(e) {
  return this.type === e ? (this.next(), !0) : !1;
};
ue.isContextual = function(e) {
  return this.type === f.name && this.value === e && !this.containsEsc;
};
ue.eatContextual = function(e) {
  return this.isContextual(e) ? (this.next(), !0) : !1;
};
ue.expectContextual = function(e) {
  this.eatContextual(e) || this.unexpected();
};
ue.canInsertSemicolon = function() {
  return this.type === f.eof || this.type === f.braceR || be.test(this.input.slice(this.lastTokEnd, this.start));
};
ue.insertSemicolon = function() {
  if (this.canInsertSemicolon())
    return this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc), !0;
};
ue.semicolon = function() {
  !this.eat(f.semi) && !this.insertSemicolon() && this.unexpected();
};
ue.afterTrailingComma = function(e, t) {
  if (this.type === e)
    return this.options.onTrailingComma && this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc), t || this.next(), !0;
};
ue.expect = function(e) {
  this.eat(e) || this.unexpected();
};
ue.unexpected = function(e) {
  this.raise(e ?? this.start, "Unexpected token");
};
var wn = function() {
  this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
};
ue.checkPatternErrors = function(e, t) {
  if (e) {
    e.trailingComma > -1 && this.raiseRecoverable(e.trailingComma, "Comma is not permitted after the rest element");
    var n = t ? e.parenthesizedAssign : e.parenthesizedBind;
    n > -1 && this.raiseRecoverable(n, t ? "Assigning to rvalue" : "Parenthesized pattern");
  }
};
ue.checkExpressionErrors = function(e, t) {
  if (!e)
    return !1;
  var n = e.shorthandAssign, i = e.doubleProto;
  if (!t)
    return n >= 0 || i >= 0;
  n >= 0 && this.raise(n, "Shorthand property assignments are valid only in destructuring patterns"), i >= 0 && this.raiseRecoverable(i, "Redefinition of __proto__ property");
};
ue.checkYieldAwaitInDefaultParams = function() {
  this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos) && this.raise(this.yieldPos, "Yield expression cannot be a default value"), this.awaitPos && this.raise(this.awaitPos, "Await expression cannot be a default value");
};
ue.isSimpleAssignTarget = function(e) {
  return e.type === "ParenthesizedExpression" ? this.isSimpleAssignTarget(e.expression) : e.type === "Identifier" || e.type === "MemberExpression";
};
var j = ie.prototype;
j.parseTopLevel = function(e) {
  var t = /* @__PURE__ */ Object.create(null);
  for (e.body || (e.body = []); this.type !== f.eof; ) {
    var n = this.parseStatement(null, !0, t);
    e.body.push(n);
  }
  if (this.inModule)
    for (var i = 0, r = Object.keys(this.undefinedExports); i < r.length; i += 1) {
      var s = r[i];
      this.raiseRecoverable(this.undefinedExports[s].start, "Export '" + s + "' is not defined");
    }
  return this.adaptDirectivePrologue(e.body), this.next(), e.sourceType = this.options.sourceType, this.finishNode(e, "Program");
};
var mi = { kind: "loop" }, zo = { kind: "switch" };
j.isLet = function(e) {
  if (this.options.ecmaVersion < 6 || !this.isContextual("let"))
    return !1;
  Se.lastIndex = this.pos;
  var t = Se.exec(this.input), n = this.pos + t[0].length, i = this.input.charCodeAt(n);
  if (i === 91 || i === 92)
    return !0;
  if (e)
    return !1;
  if (i === 123 || i > 55295 && i < 56320)
    return !0;
  if (je(i, !0)) {
    for (var r = n + 1; at(i = this.input.charCodeAt(r), !0); )
      ++r;
    if (i === 92 || i > 55295 && i < 56320)
      return !0;
    var s = this.input.slice(n, r);
    if (!Fo.test(s))
      return !0;
  }
  return !1;
};
j.isAsyncFunction = function() {
  if (this.options.ecmaVersion < 8 || !this.isContextual("async"))
    return !1;
  Se.lastIndex = this.pos;
  var e = Se.exec(this.input), t = this.pos + e[0].length, n;
  return !be.test(this.input.slice(this.pos, t)) && this.input.slice(t, t + 8) === "function" && (t + 8 === this.input.length || !(at(n = this.input.charCodeAt(t + 8)) || n > 55295 && n < 56320));
};
j.parseStatement = function(e, t, n) {
  var i = this.type, r = this.startNode(), s;
  switch (this.isLet(e) && (i = f._var, s = "let"), i) {
    case f._break:
    case f._continue:
      return this.parseBreakContinueStatement(r, i.keyword);
    case f._debugger:
      return this.parseDebuggerStatement(r);
    case f._do:
      return this.parseDoStatement(r);
    case f._for:
      return this.parseForStatement(r);
    case f._function:
      return e && (this.strict || e !== "if" && e !== "label") && this.options.ecmaVersion >= 6 && this.unexpected(), this.parseFunctionStatement(r, !1, !e);
    case f._class:
      return e && this.unexpected(), this.parseClass(r, !0);
    case f._if:
      return this.parseIfStatement(r);
    case f._return:
      return this.parseReturnStatement(r);
    case f._switch:
      return this.parseSwitchStatement(r);
    case f._throw:
      return this.parseThrowStatement(r);
    case f._try:
      return this.parseTryStatement(r);
    case f._const:
    case f._var:
      return s = s || this.value, e && s !== "var" && this.unexpected(), this.parseVarStatement(r, s);
    case f._while:
      return this.parseWhileStatement(r);
    case f._with:
      return this.parseWithStatement(r);
    case f.braceL:
      return this.parseBlock(!0, r);
    case f.semi:
      return this.parseEmptyStatement(r);
    case f._export:
    case f._import:
      if (this.options.ecmaVersion > 10 && i === f._import) {
        Se.lastIndex = this.pos;
        var a = Se.exec(this.input), o = this.pos + a[0].length, l = this.input.charCodeAt(o);
        if (l === 40 || l === 46)
          return this.parseExpressionStatement(r, this.parseExpression());
      }
      return this.options.allowImportExportEverywhere || (t || this.raise(this.start, "'import' and 'export' may only appear at the top level"), this.inModule || this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'")), i === f._import ? this.parseImport(r) : this.parseExport(r, n);
    default:
      if (this.isAsyncFunction())
        return e && this.unexpected(), this.next(), this.parseFunctionStatement(r, !0, !e);
      var u = this.value, c = this.parseExpression();
      return i === f.name && c.type === "Identifier" && this.eat(f.colon) ? this.parseLabeledStatement(r, u, c, e) : this.parseExpressionStatement(r, c);
  }
};
j.parseBreakContinueStatement = function(e, t) {
  var n = t === "break";
  this.next(), this.eat(f.semi) || this.insertSemicolon() ? e.label = null : this.type !== f.name ? this.unexpected() : (e.label = this.parseIdent(), this.semicolon());
  for (var i = 0; i < this.labels.length; ++i) {
    var r = this.labels[i];
    if ((e.label == null || r.name === e.label.name) && (r.kind != null && (n || r.kind === "loop") || e.label && n))
      break;
  }
  return i === this.labels.length && this.raise(e.start, "Unsyntactic " + t), this.finishNode(e, n ? "BreakStatement" : "ContinueStatement");
};
j.parseDebuggerStatement = function(e) {
  return this.next(), this.semicolon(), this.finishNode(e, "DebuggerStatement");
};
j.parseDoStatement = function(e) {
  return this.next(), this.labels.push(mi), e.body = this.parseStatement("do"), this.labels.pop(), this.expect(f._while), e.test = this.parseParenExpression(), this.options.ecmaVersion >= 6 ? this.eat(f.semi) : this.semicolon(), this.finishNode(e, "DoWhileStatement");
};
j.parseForStatement = function(e) {
  this.next();
  var t = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
  if (this.labels.push(mi), this.enterScope(0), this.expect(f.parenL), this.type === f.semi)
    return t > -1 && this.unexpected(t), this.parseFor(e, null);
  var n = this.isLet();
  if (this.type === f._var || this.type === f._const || n) {
    var i = this.startNode(), r = n ? "let" : this.value;
    return this.next(), this.parseVar(i, !0, r), this.finishNode(i, "VariableDeclaration"), (this.type === f._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && i.declarations.length === 1 ? (this.options.ecmaVersion >= 9 && (this.type === f._in ? t > -1 && this.unexpected(t) : e.await = t > -1), this.parseForIn(e, i)) : (t > -1 && this.unexpected(t), this.parseFor(e, i));
  }
  var s = this.isContextual("let"), a = !1, o = this.containsEsc, l = new wn(), u = this.start, c = t > -1 ? this.parseExprSubscripts(l, "await") : this.parseExpression(!0, l);
  return this.type === f._in || (a = this.options.ecmaVersion >= 6 && this.isContextual("of")) ? (t > -1 ? (this.type === f._in && this.unexpected(t), e.await = !0) : a && this.options.ecmaVersion >= 8 && (c.start === u && !o && c.type === "Identifier" && c.name === "async" ? this.unexpected() : this.options.ecmaVersion >= 9 && (e.await = !1)), s && a && this.raise(c.start, "The left-hand side of a for-of loop may not start with 'let'."), this.toAssignable(c, !1, l), this.checkLValPattern(c), this.parseForIn(e, c)) : (this.checkExpressionErrors(l, !0), t > -1 && this.unexpected(t), this.parseFor(e, c));
};
j.parseFunctionStatement = function(e, t, n) {
  return this.next(), this.parseFunction(e, Lt | (n ? 0 : Qn), !1, t);
};
j.parseIfStatement = function(e) {
  return this.next(), e.test = this.parseParenExpression(), e.consequent = this.parseStatement("if"), e.alternate = this.eat(f._else) ? this.parseStatement("if") : null, this.finishNode(e, "IfStatement");
};
j.parseReturnStatement = function(e) {
  return !this.inFunction && !this.options.allowReturnOutsideFunction && this.raise(this.start, "'return' outside of function"), this.next(), this.eat(f.semi) || this.insertSemicolon() ? e.argument = null : (e.argument = this.parseExpression(), this.semicolon()), this.finishNode(e, "ReturnStatement");
};
j.parseSwitchStatement = function(e) {
  this.next(), e.discriminant = this.parseParenExpression(), e.cases = [], this.expect(f.braceL), this.labels.push(zo), this.enterScope(0);
  for (var t, n = !1; this.type !== f.braceR; )
    if (this.type === f._case || this.type === f._default) {
      var i = this.type === f._case;
      t && this.finishNode(t, "SwitchCase"), e.cases.push(t = this.startNode()), t.consequent = [], this.next(), i ? t.test = this.parseExpression() : (n && this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"), n = !0, t.test = null), this.expect(f.colon);
    } else
      t || this.unexpected(), t.consequent.push(this.parseStatement(null));
  return this.exitScope(), t && this.finishNode(t, "SwitchCase"), this.next(), this.labels.pop(), this.finishNode(e, "SwitchStatement");
};
j.parseThrowStatement = function(e) {
  return this.next(), be.test(this.input.slice(this.lastTokEnd, this.start)) && this.raise(this.lastTokEnd, "Illegal newline after throw"), e.argument = this.parseExpression(), this.semicolon(), this.finishNode(e, "ThrowStatement");
};
var Uo = [];
j.parseCatchClauseParam = function() {
  var e = this.parseBindingAtom(), t = e.type === "Identifier";
  return this.enterScope(t ? cs : 0), this.checkLValPattern(e, t ? fs : We), this.expect(f.parenR), e;
};
j.parseTryStatement = function(e) {
  if (this.next(), e.block = this.parseBlock(), e.handler = null, this.type === f._catch) {
    var t = this.startNode();
    this.next(), this.eat(f.parenL) ? t.param = this.parseCatchClauseParam() : (this.options.ecmaVersion < 10 && this.unexpected(), t.param = null, this.enterScope(0)), t.body = this.parseBlock(!1), this.exitScope(), e.handler = this.finishNode(t, "CatchClause");
  }
  return e.finalizer = this.eat(f._finally) ? this.parseBlock() : null, !e.handler && !e.finalizer && this.raise(e.start, "Missing catch or finally clause"), this.finishNode(e, "TryStatement");
};
j.parseVarStatement = function(e, t, n) {
  return this.next(), this.parseVar(e, !1, t, n), this.semicolon(), this.finishNode(e, "VariableDeclaration");
};
j.parseWhileStatement = function(e) {
  return this.next(), e.test = this.parseParenExpression(), this.labels.push(mi), e.body = this.parseStatement("while"), this.labels.pop(), this.finishNode(e, "WhileStatement");
};
j.parseWithStatement = function(e) {
  return this.strict && this.raise(this.start, "'with' in strict mode"), this.next(), e.object = this.parseParenExpression(), e.body = this.parseStatement("with"), this.finishNode(e, "WithStatement");
};
j.parseEmptyStatement = function(e) {
  return this.next(), this.finishNode(e, "EmptyStatement");
};
j.parseLabeledStatement = function(e, t, n, i) {
  for (var r = 0, s = this.labels; r < s.length; r += 1) {
    var a = s[r];
    a.name === t && this.raise(n.start, "Label '" + t + "' is already declared");
  }
  for (var o = this.type.isLoop ? "loop" : this.type === f._switch ? "switch" : null, l = this.labels.length - 1; l >= 0; l--) {
    var u = this.labels[l];
    if (u.statementStart === e.start)
      u.statementStart = this.start, u.kind = o;
    else
      break;
  }
  return this.labels.push({ name: t, kind: o, statementStart: this.start }), e.body = this.parseStatement(i ? i.indexOf("label") === -1 ? i + "label" : i : "label"), this.labels.pop(), e.label = n, this.finishNode(e, "LabeledStatement");
};
j.parseExpressionStatement = function(e, t) {
  return e.expression = t, this.semicolon(), this.finishNode(e, "ExpressionStatement");
};
j.parseBlock = function(e, t, n) {
  for (e === void 0 && (e = !0), t === void 0 && (t = this.startNode()), t.body = [], this.expect(f.braceL), e && this.enterScope(0); this.type !== f.braceR; ) {
    var i = this.parseStatement(null);
    t.body.push(i);
  }
  return n && (this.strict = !1), this.next(), e && this.exitScope(), this.finishNode(t, "BlockStatement");
};
j.parseFor = function(e, t) {
  return e.init = t, this.expect(f.semi), e.test = this.type === f.semi ? null : this.parseExpression(), this.expect(f.semi), e.update = this.type === f.parenR ? null : this.parseExpression(), this.expect(f.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, "ForStatement");
};
j.parseForIn = function(e, t) {
  var n = this.type === f._in;
  return this.next(), t.type === "VariableDeclaration" && t.declarations[0].init != null && (!n || this.options.ecmaVersion < 8 || this.strict || t.kind !== "var" || t.declarations[0].id.type !== "Identifier") && this.raise(
    t.start,
    (n ? "for-in" : "for-of") + " loop variable declaration may not have an initializer"
  ), e.left = t, e.right = n ? this.parseExpression() : this.parseMaybeAssign(), this.expect(f.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, n ? "ForInStatement" : "ForOfStatement");
};
j.parseVar = function(e, t, n, i) {
  for (e.declarations = [], e.kind = n; ; ) {
    var r = this.startNode();
    if (this.parseVarId(r, n), this.eat(f.eq) ? r.init = this.parseMaybeAssign(t) : !i && n === "const" && !(this.type === f._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) ? this.unexpected() : !i && r.id.type !== "Identifier" && !(t && (this.type === f._in || this.isContextual("of"))) ? this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value") : r.init = null, e.declarations.push(this.finishNode(r, "VariableDeclarator")), !this.eat(f.comma))
      break;
  }
  return e;
};
j.parseVarId = function(e, t) {
  e.id = this.parseBindingAtom(), this.checkLValPattern(e.id, t === "var" ? fi : We, !1);
};
var Lt = 1, Qn = 2, ds = 4;
j.parseFunction = function(e, t, n, i, r) {
  this.initFunction(e), (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !i) && (this.type === f.star && t & Qn && this.unexpected(), e.generator = this.eat(f.star)), this.options.ecmaVersion >= 8 && (e.async = !!i), t & Lt && (e.id = t & ds && this.type !== f.name ? null : this.parseIdent(), e.id && !(t & Qn) && this.checkLValSimple(e.id, this.strict || e.generator || e.async ? this.treatFunctionsAsVar ? fi : We : hs));
  var s = this.yieldPos, a = this.awaitPos, o = this.awaitIdentPos;
  return this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(hi(e.async, e.generator)), t & Lt || (e.id = this.type === f.name ? this.parseIdent() : null), this.parseFunctionParams(e), this.parseFunctionBody(e, n, !1, r), this.yieldPos = s, this.awaitPos = a, this.awaitIdentPos = o, this.finishNode(e, t & Lt ? "FunctionDeclaration" : "FunctionExpression");
};
j.parseFunctionParams = function(e) {
  this.expect(f.parenL), e.params = this.parseBindingList(f.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams();
};
j.parseClass = function(e, t) {
  this.next();
  var n = this.strict;
  this.strict = !0, this.parseClassId(e, t), this.parseClassSuper(e);
  var i = this.enterClassBody(), r = this.startNode(), s = !1;
  for (r.body = [], this.expect(f.braceL); this.type !== f.braceR; ) {
    var a = this.parseClassElement(e.superClass !== null);
    a && (r.body.push(a), a.type === "MethodDefinition" && a.kind === "constructor" ? (s && this.raiseRecoverable(a.start, "Duplicate constructor in the same class"), s = !0) : a.key && a.key.type === "PrivateIdentifier" && Xo(i, a) && this.raiseRecoverable(a.key.start, "Identifier '#" + a.key.name + "' has already been declared"));
  }
  return this.strict = n, this.next(), e.body = this.finishNode(r, "ClassBody"), this.exitClassBody(), this.finishNode(e, t ? "ClassDeclaration" : "ClassExpression");
};
j.parseClassElement = function(e) {
  if (this.eat(f.semi))
    return null;
  var t = this.options.ecmaVersion, n = this.startNode(), i = "", r = !1, s = !1, a = "method", o = !1;
  if (this.eatContextual("static")) {
    if (t >= 13 && this.eat(f.braceL))
      return this.parseClassStaticBlock(n), n;
    this.isClassElementNameStart() || this.type === f.star ? o = !0 : i = "static";
  }
  if (n.static = o, !i && t >= 8 && this.eatContextual("async") && ((this.isClassElementNameStart() || this.type === f.star) && !this.canInsertSemicolon() ? s = !0 : i = "async"), !i && (t >= 9 || !s) && this.eat(f.star) && (r = !0), !i && !s && !r) {
    var l = this.value;
    (this.eatContextual("get") || this.eatContextual("set")) && (this.isClassElementNameStart() ? a = l : i = l);
  }
  if (i ? (n.computed = !1, n.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc), n.key.name = i, this.finishNode(n.key, "Identifier")) : this.parseClassElementName(n), t < 13 || this.type === f.parenL || a !== "method" || r || s) {
    var u = !n.static && cn(n, "constructor"), c = u && e;
    u && a !== "method" && this.raise(n.key.start, "Constructor can't have get/set modifier"), n.kind = u ? "constructor" : a, this.parseClassMethod(n, r, s, c);
  } else
    this.parseClassField(n);
  return n;
};
j.isClassElementNameStart = function() {
  return this.type === f.name || this.type === f.privateId || this.type === f.num || this.type === f.string || this.type === f.bracketL || this.type.keyword;
};
j.parseClassElementName = function(e) {
  this.type === f.privateId ? (this.value === "constructor" && this.raise(this.start, "Classes can't have an element named '#constructor'"), e.computed = !1, e.key = this.parsePrivateIdent()) : this.parsePropertyName(e);
};
j.parseClassMethod = function(e, t, n, i) {
  var r = e.key;
  e.kind === "constructor" ? (t && this.raise(r.start, "Constructor can't be a generator"), n && this.raise(r.start, "Constructor can't be an async method")) : e.static && cn(e, "prototype") && this.raise(r.start, "Classes may not have a static property named prototype");
  var s = e.value = this.parseMethod(t, n, i);
  return e.kind === "get" && s.params.length !== 0 && this.raiseRecoverable(s.start, "getter should have no params"), e.kind === "set" && s.params.length !== 1 && this.raiseRecoverable(s.start, "setter should have exactly one param"), e.kind === "set" && s.params[0].type === "RestElement" && this.raiseRecoverable(s.params[0].start, "Setter cannot use rest params"), this.finishNode(e, "MethodDefinition");
};
j.parseClassField = function(e) {
  if (cn(e, "constructor") ? this.raise(e.key.start, "Classes can't have a field named 'constructor'") : e.static && cn(e, "prototype") && this.raise(e.key.start, "Classes can't have a static field named 'prototype'"), this.eat(f.eq)) {
    var t = this.currentThisScope(), n = t.inClassFieldInit;
    t.inClassFieldInit = !0, e.value = this.parseMaybeAssign(), t.inClassFieldInit = n;
  } else
    e.value = null;
  return this.semicolon(), this.finishNode(e, "PropertyDefinition");
};
j.parseClassStaticBlock = function(e) {
  e.body = [];
  var t = this.labels;
  for (this.labels = [], this.enterScope(Jt | ci); this.type !== f.braceR; ) {
    var n = this.parseStatement(null);
    e.body.push(n);
  }
  return this.next(), this.exitScope(), this.labels = t, this.finishNode(e, "StaticBlock");
};
j.parseClassId = function(e, t) {
  this.type === f.name ? (e.id = this.parseIdent(), t && this.checkLValSimple(e.id, We, !1)) : (t === !0 && this.unexpected(), e.id = null);
};
j.parseClassSuper = function(e) {
  e.superClass = this.eat(f._extends) ? this.parseExprSubscripts(null, !1) : null;
};
j.enterClassBody = function() {
  var e = { declared: /* @__PURE__ */ Object.create(null), used: [] };
  return this.privateNameStack.push(e), e.declared;
};
j.exitClassBody = function() {
  var e = this.privateNameStack.pop(), t = e.declared, n = e.used;
  if (this.options.checkPrivateFields)
    for (var i = this.privateNameStack.length, r = i === 0 ? null : this.privateNameStack[i - 1], s = 0; s < n.length; ++s) {
      var a = n[s];
      Vt(t, a.name) || (r ? r.used.push(a) : this.raiseRecoverable(a.start, "Private field '#" + a.name + "' must be declared in an enclosing class"));
    }
};
function Xo(e, t) {
  var n = t.key.name, i = e[n], r = "true";
  return t.type === "MethodDefinition" && (t.kind === "get" || t.kind === "set") && (r = (t.static ? "s" : "i") + t.kind), i === "iget" && r === "iset" || i === "iset" && r === "iget" || i === "sget" && r === "sset" || i === "sset" && r === "sget" ? (e[n] = "true", !1) : i ? !0 : (e[n] = r, !1);
}
function cn(e, t) {
  var n = e.computed, i = e.key;
  return !n && (i.type === "Identifier" && i.name === t || i.type === "Literal" && i.value === t);
}
j.parseExportAllDeclaration = function(e, t) {
  return this.options.ecmaVersion >= 11 && (this.eatContextual("as") ? (e.exported = this.parseModuleExportName(), this.checkExport(t, e.exported, this.lastTokStart)) : e.exported = null), this.expectContextual("from"), this.type !== f.string && this.unexpected(), e.source = this.parseExprAtom(), this.semicolon(), this.finishNode(e, "ExportAllDeclaration");
};
j.parseExport = function(e, t) {
  if (this.next(), this.eat(f.star))
    return this.parseExportAllDeclaration(e, t);
  if (this.eat(f._default))
    return this.checkExport(t, "default", this.lastTokStart), e.declaration = this.parseExportDefaultDeclaration(), this.finishNode(e, "ExportDefaultDeclaration");
  if (this.shouldParseExportStatement())
    e.declaration = this.parseExportDeclaration(e), e.declaration.type === "VariableDeclaration" ? this.checkVariableExport(t, e.declaration.declarations) : this.checkExport(t, e.declaration.id, e.declaration.id.start), e.specifiers = [], e.source = null;
  else {
    if (e.declaration = null, e.specifiers = this.parseExportSpecifiers(t), this.eatContextual("from"))
      this.type !== f.string && this.unexpected(), e.source = this.parseExprAtom();
    else {
      for (var n = 0, i = e.specifiers; n < i.length; n += 1) {
        var r = i[n];
        this.checkUnreserved(r.local), this.checkLocalExport(r.local), r.local.type === "Literal" && this.raise(r.local.start, "A string literal cannot be used as an exported binding without `from`.");
      }
      e.source = null;
    }
    this.semicolon();
  }
  return this.finishNode(e, "ExportNamedDeclaration");
};
j.parseExportDeclaration = function(e) {
  return this.parseStatement(null);
};
j.parseExportDefaultDeclaration = function() {
  var e;
  if (this.type === f._function || (e = this.isAsyncFunction())) {
    var t = this.startNode();
    return this.next(), e && this.next(), this.parseFunction(t, Lt | ds, !1, e);
  } else if (this.type === f._class) {
    var n = this.startNode();
    return this.parseClass(n, "nullableID");
  } else {
    var i = this.parseMaybeAssign();
    return this.semicolon(), i;
  }
};
j.checkExport = function(e, t, n) {
  e && (typeof t != "string" && (t = t.type === "Identifier" ? t.name : t.value), Vt(e, t) && this.raiseRecoverable(n, "Duplicate export '" + t + "'"), e[t] = !0);
};
j.checkPatternExport = function(e, t) {
  var n = t.type;
  if (n === "Identifier")
    this.checkExport(e, t, t.start);
  else if (n === "ObjectPattern")
    for (var i = 0, r = t.properties; i < r.length; i += 1) {
      var s = r[i];
      this.checkPatternExport(e, s);
    }
  else if (n === "ArrayPattern")
    for (var a = 0, o = t.elements; a < o.length; a += 1) {
      var l = o[a];
      l && this.checkPatternExport(e, l);
    }
  else n === "Property" ? this.checkPatternExport(e, t.value) : n === "AssignmentPattern" ? this.checkPatternExport(e, t.left) : n === "RestElement" && this.checkPatternExport(e, t.argument);
};
j.checkVariableExport = function(e, t) {
  if (e)
    for (var n = 0, i = t; n < i.length; n += 1) {
      var r = i[n];
      this.checkPatternExport(e, r.id);
    }
};
j.shouldParseExportStatement = function() {
  return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
};
j.parseExportSpecifier = function(e) {
  var t = this.startNode();
  return t.local = this.parseModuleExportName(), t.exported = this.eatContextual("as") ? this.parseModuleExportName() : t.local, this.checkExport(
    e,
    t.exported,
    t.exported.start
  ), this.finishNode(t, "ExportSpecifier");
};
j.parseExportSpecifiers = function(e) {
  var t = [], n = !0;
  for (this.expect(f.braceL); !this.eat(f.braceR); ) {
    if (n)
      n = !1;
    else if (this.expect(f.comma), this.afterTrailingComma(f.braceR))
      break;
    t.push(this.parseExportSpecifier(e));
  }
  return t;
};
j.parseImport = function(e) {
  return this.next(), this.type === f.string ? (e.specifiers = Uo, e.source = this.parseExprAtom()) : (e.specifiers = this.parseImportSpecifiers(), this.expectContextual("from"), e.source = this.type === f.string ? this.parseExprAtom() : this.unexpected()), this.semicolon(), this.finishNode(e, "ImportDeclaration");
};
j.parseImportSpecifier = function() {
  var e = this.startNode();
  return e.imported = this.parseModuleExportName(), this.eatContextual("as") ? e.local = this.parseIdent() : (this.checkUnreserved(e.imported), e.local = e.imported), this.checkLValSimple(e.local, We), this.finishNode(e, "ImportSpecifier");
};
j.parseImportDefaultSpecifier = function() {
  var e = this.startNode();
  return e.local = this.parseIdent(), this.checkLValSimple(e.local, We), this.finishNode(e, "ImportDefaultSpecifier");
};
j.parseImportNamespaceSpecifier = function() {
  var e = this.startNode();
  return this.next(), this.expectContextual("as"), e.local = this.parseIdent(), this.checkLValSimple(e.local, We), this.finishNode(e, "ImportNamespaceSpecifier");
};
j.parseImportSpecifiers = function() {
  var e = [], t = !0;
  if (this.type === f.name && (e.push(this.parseImportDefaultSpecifier()), !this.eat(f.comma)))
    return e;
  if (this.type === f.star)
    return e.push(this.parseImportNamespaceSpecifier()), e;
  for (this.expect(f.braceL); !this.eat(f.braceR); ) {
    if (t)
      t = !1;
    else if (this.expect(f.comma), this.afterTrailingComma(f.braceR))
      break;
    e.push(this.parseImportSpecifier());
  }
  return e;
};
j.parseModuleExportName = function() {
  if (this.options.ecmaVersion >= 13 && this.type === f.string) {
    var e = this.parseLiteral(this.value);
    return jo.test(e.value) && this.raise(e.start, "An export name cannot include a lone surrogate."), e;
  }
  return this.parseIdent(!0);
};
j.adaptDirectivePrologue = function(e) {
  for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t)
    e[t].directive = e[t].expression.raw.slice(1, -1);
};
j.isDirectiveCandidate = function(e) {
  return this.options.ecmaVersion >= 5 && e.type === "ExpressionStatement" && e.expression.type === "Literal" && typeof e.expression.value == "string" && // Reject parenthesized strings.
  (this.input[e.start] === '"' || this.input[e.start] === "'");
};
var Ae = ie.prototype;
Ae.toAssignable = function(e, t, n) {
  if (this.options.ecmaVersion >= 6 && e)
    switch (e.type) {
      case "Identifier":
        this.inAsync && e.name === "await" && this.raise(e.start, "Cannot use 'await' as identifier inside an async function");
        break;
      case "ObjectPattern":
      case "ArrayPattern":
      case "AssignmentPattern":
      case "RestElement":
        break;
      case "ObjectExpression":
        e.type = "ObjectPattern", n && this.checkPatternErrors(n, !0);
        for (var i = 0, r = e.properties; i < r.length; i += 1) {
          var s = r[i];
          this.toAssignable(s, t), s.type === "RestElement" && (s.argument.type === "ArrayPattern" || s.argument.type === "ObjectPattern") && this.raise(s.argument.start, "Unexpected token");
        }
        break;
      case "Property":
        e.kind !== "init" && this.raise(e.key.start, "Object pattern can't contain getter or setter"), this.toAssignable(e.value, t);
        break;
      case "ArrayExpression":
        e.type = "ArrayPattern", n && this.checkPatternErrors(n, !0), this.toAssignableList(e.elements, t);
        break;
      case "SpreadElement":
        e.type = "RestElement", this.toAssignable(e.argument, t), e.argument.type === "AssignmentPattern" && this.raise(e.argument.start, "Rest elements cannot have a default value");
        break;
      case "AssignmentExpression":
        e.operator !== "=" && this.raise(e.left.end, "Only '=' operator can be used for specifying default value."), e.type = "AssignmentPattern", delete e.operator, this.toAssignable(e.left, t);
        break;
      case "ParenthesizedExpression":
        this.toAssignable(e.expression, t, n);
        break;
      case "ChainExpression":
        this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
        break;
      case "MemberExpression":
        if (!t)
          break;
      default:
        this.raise(e.start, "Assigning to rvalue");
    }
  else n && this.checkPatternErrors(n, !0);
  return e;
};
Ae.toAssignableList = function(e, t) {
  for (var n = e.length, i = 0; i < n; i++) {
    var r = e[i];
    r && this.toAssignable(r, t);
  }
  if (n) {
    var s = e[n - 1];
    this.options.ecmaVersion === 6 && t && s && s.type === "RestElement" && s.argument.type !== "Identifier" && this.unexpected(s.argument.start);
  }
  return e;
};
Ae.parseSpread = function(e) {
  var t = this.startNode();
  return this.next(), t.argument = this.parseMaybeAssign(!1, e), this.finishNode(t, "SpreadElement");
};
Ae.parseRestBinding = function() {
  var e = this.startNode();
  return this.next(), this.options.ecmaVersion === 6 && this.type !== f.name && this.unexpected(), e.argument = this.parseBindingAtom(), this.finishNode(e, "RestElement");
};
Ae.parseBindingAtom = function() {
  if (this.options.ecmaVersion >= 6)
    switch (this.type) {
      case f.bracketL:
        var e = this.startNode();
        return this.next(), e.elements = this.parseBindingList(f.bracketR, !0, !0), this.finishNode(e, "ArrayPattern");
      case f.braceL:
        return this.parseObj(!0);
    }
  return this.parseIdent();
};
Ae.parseBindingList = function(e, t, n, i) {
  for (var r = [], s = !0; !this.eat(e); )
    if (s ? s = !1 : this.expect(f.comma), t && this.type === f.comma)
      r.push(null);
    else {
      if (n && this.afterTrailingComma(e))
        break;
      if (this.type === f.ellipsis) {
        var a = this.parseRestBinding();
        this.parseBindingListItem(a), r.push(a), this.type === f.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element"), this.expect(e);
        break;
      } else
        r.push(this.parseAssignableListItem(i));
    }
  return r;
};
Ae.parseAssignableListItem = function(e) {
  var t = this.parseMaybeDefault(this.start, this.startLoc);
  return this.parseBindingListItem(t), t;
};
Ae.parseBindingListItem = function(e) {
  return e;
};
Ae.parseMaybeDefault = function(e, t, n) {
  if (n = n || this.parseBindingAtom(), this.options.ecmaVersion < 6 || !this.eat(f.eq))
    return n;
  var i = this.startNodeAt(e, t);
  return i.left = n, i.right = this.parseMaybeAssign(), this.finishNode(i, "AssignmentPattern");
};
Ae.checkLValSimple = function(e, t, n) {
  t === void 0 && (t = un);
  var i = t !== un;
  switch (e.type) {
    case "Identifier":
      this.strict && this.reservedWordsStrictBind.test(e.name) && this.raiseRecoverable(e.start, (i ? "Binding " : "Assigning to ") + e.name + " in strict mode"), i && (t === We && e.name === "let" && this.raiseRecoverable(e.start, "let is disallowed as a lexically bound name"), n && (Vt(n, e.name) && this.raiseRecoverable(e.start, "Argument name clash"), n[e.name] = !0), t !== ms && this.declareName(e.name, t, e.start));
      break;
    case "ChainExpression":
      this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
      break;
    case "MemberExpression":
      i && this.raiseRecoverable(e.start, "Binding member expression");
      break;
    case "ParenthesizedExpression":
      return i && this.raiseRecoverable(e.start, "Binding parenthesized expression"), this.checkLValSimple(e.expression, t, n);
    default:
      this.raise(e.start, (i ? "Binding" : "Assigning to") + " rvalue");
  }
};
Ae.checkLValPattern = function(e, t, n) {
  switch (t === void 0 && (t = un), e.type) {
    case "ObjectPattern":
      for (var i = 0, r = e.properties; i < r.length; i += 1) {
        var s = r[i];
        this.checkLValInnerPattern(s, t, n);
      }
      break;
    case "ArrayPattern":
      for (var a = 0, o = e.elements; a < o.length; a += 1) {
        var l = o[a];
        l && this.checkLValInnerPattern(l, t, n);
      }
      break;
    default:
      this.checkLValSimple(e, t, n);
  }
};
Ae.checkLValInnerPattern = function(e, t, n) {
  switch (t === void 0 && (t = un), e.type) {
    case "Property":
      this.checkLValInnerPattern(e.value, t, n);
      break;
    case "AssignmentPattern":
      this.checkLValPattern(e.left, t, n);
      break;
    case "RestElement":
      this.checkLValPattern(e.argument, t, n);
      break;
    default:
      this.checkLValPattern(e, t, n);
  }
};
var ve = function(t, n, i, r, s) {
  this.token = t, this.isExpr = !!n, this.preserveSpace = !!i, this.override = r, this.generator = !!s;
}, ee = {
  b_stat: new ve("{", !1),
  b_expr: new ve("{", !0),
  b_tmpl: new ve("${", !1),
  p_stat: new ve("(", !1),
  p_expr: new ve("(", !0),
  q_tmpl: new ve("`", !0, !0, function(e) {
    return e.tryReadTemplateToken();
  }),
  f_stat: new ve("function", !1),
  f_expr: new ve("function", !0),
  f_expr_gen: new ve("function", !0, !1, null, !0),
  f_gen: new ve("function", !1, !1, null, !0)
}, St = ie.prototype;
St.initialContext = function() {
  return [ee.b_stat];
};
St.curContext = function() {
  return this.context[this.context.length - 1];
};
St.braceIsBlock = function(e) {
  var t = this.curContext();
  return t === ee.f_expr || t === ee.f_stat ? !0 : e === f.colon && (t === ee.b_stat || t === ee.b_expr) ? !t.isExpr : e === f._return || e === f.name && this.exprAllowed ? be.test(this.input.slice(this.lastTokEnd, this.start)) : e === f._else || e === f.semi || e === f.eof || e === f.parenR || e === f.arrow ? !0 : e === f.braceL ? t === ee.b_stat : e === f._var || e === f._const || e === f.name ? !1 : !this.exprAllowed;
};
St.inGeneratorContext = function() {
  for (var e = this.context.length - 1; e >= 1; e--) {
    var t = this.context[e];
    if (t.token === "function")
      return t.generator;
  }
  return !1;
};
St.updateContext = function(e) {
  var t, n = this.type;
  n.keyword && e === f.dot ? this.exprAllowed = !1 : (t = n.updateContext) ? t.call(this, e) : this.exprAllowed = n.beforeExpr;
};
St.overrideContext = function(e) {
  this.curContext() !== e && (this.context[this.context.length - 1] = e);
};
f.parenR.updateContext = f.braceR.updateContext = function() {
  if (this.context.length === 1) {
    this.exprAllowed = !0;
    return;
  }
  var e = this.context.pop();
  e === ee.b_stat && this.curContext().token === "function" && (e = this.context.pop()), this.exprAllowed = !e.isExpr;
};
f.braceL.updateContext = function(e) {
  this.context.push(this.braceIsBlock(e) ? ee.b_stat : ee.b_expr), this.exprAllowed = !0;
};
f.dollarBraceL.updateContext = function() {
  this.context.push(ee.b_tmpl), this.exprAllowed = !0;
};
f.parenL.updateContext = function(e) {
  var t = e === f._if || e === f._for || e === f._with || e === f._while;
  this.context.push(t ? ee.p_stat : ee.p_expr), this.exprAllowed = !0;
};
f.incDec.updateContext = function() {
};
f._function.updateContext = f._class.updateContext = function(e) {
  e.beforeExpr && e !== f._else && !(e === f.semi && this.curContext() !== ee.p_stat) && !(e === f._return && be.test(this.input.slice(this.lastTokEnd, this.start))) && !((e === f.colon || e === f.braceL) && this.curContext() === ee.b_stat) ? this.context.push(ee.f_expr) : this.context.push(ee.f_stat), this.exprAllowed = !1;
};
f.colon.updateContext = function() {
  this.curContext().token === "function" && this.context.pop(), this.exprAllowed = !0;
};
f.backQuote.updateContext = function() {
  this.curContext() === ee.q_tmpl ? this.context.pop() : this.context.push(ee.q_tmpl), this.exprAllowed = !1;
};
f.star.updateContext = function(e) {
  if (e === f._function) {
    var t = this.context.length - 1;
    this.context[t] === ee.f_expr ? this.context[t] = ee.f_expr_gen : this.context[t] = ee.f_gen;
  }
  this.exprAllowed = !0;
};
f.name.updateContext = function(e) {
  var t = !1;
  this.options.ecmaVersion >= 6 && e !== f.dot && (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) && (t = !0), this.exprAllowed = t;
};
var V = ie.prototype;
V.checkPropClash = function(e, t, n) {
  if (!(this.options.ecmaVersion >= 9 && e.type === "SpreadElement") && !(this.options.ecmaVersion >= 6 && (e.computed || e.method || e.shorthand))) {
    var i = e.key, r;
    switch (i.type) {
      case "Identifier":
        r = i.name;
        break;
      case "Literal":
        r = String(i.value);
        break;
      default:
        return;
    }
    var s = e.kind;
    if (this.options.ecmaVersion >= 6) {
      r === "__proto__" && s === "init" && (t.proto && (n ? n.doubleProto < 0 && (n.doubleProto = i.start) : this.raiseRecoverable(i.start, "Redefinition of __proto__ property")), t.proto = !0);
      return;
    }
    r = "$" + r;
    var a = t[r];
    if (a) {
      var o;
      s === "init" ? o = this.strict && a.init || a.get || a.set : o = a.init || a[s], o && this.raiseRecoverable(i.start, "Redefinition of property");
    } else
      a = t[r] = {
        init: !1,
        get: !1,
        set: !1
      };
    a[s] = !0;
  }
};
V.parseExpression = function(e, t) {
  var n = this.start, i = this.startLoc, r = this.parseMaybeAssign(e, t);
  if (this.type === f.comma) {
    var s = this.startNodeAt(n, i);
    for (s.expressions = [r]; this.eat(f.comma); )
      s.expressions.push(this.parseMaybeAssign(e, t));
    return this.finishNode(s, "SequenceExpression");
  }
  return r;
};
V.parseMaybeAssign = function(e, t, n) {
  if (this.isContextual("yield")) {
    if (this.inGenerator)
      return this.parseYield(e);
    this.exprAllowed = !1;
  }
  var i = !1, r = -1, s = -1, a = -1;
  t ? (r = t.parenthesizedAssign, s = t.trailingComma, a = t.doubleProto, t.parenthesizedAssign = t.trailingComma = -1) : (t = new wn(), i = !0);
  var o = this.start, l = this.startLoc;
  (this.type === f.parenL || this.type === f.name) && (this.potentialArrowAt = this.start, this.potentialArrowInForAwait = e === "await");
  var u = this.parseMaybeConditional(e, t);
  if (n && (u = n.call(this, u, o, l)), this.type.isAssign) {
    var c = this.startNodeAt(o, l);
    return c.operator = this.value, this.type === f.eq && (u = this.toAssignable(u, !1, t)), i || (t.parenthesizedAssign = t.trailingComma = t.doubleProto = -1), t.shorthandAssign >= u.start && (t.shorthandAssign = -1), this.type === f.eq ? this.checkLValPattern(u) : this.checkLValSimple(u), c.left = u, this.next(), c.right = this.parseMaybeAssign(e), a > -1 && (t.doubleProto = a), this.finishNode(c, "AssignmentExpression");
  } else
    i && this.checkExpressionErrors(t, !0);
  return r > -1 && (t.parenthesizedAssign = r), s > -1 && (t.trailingComma = s), u;
};
V.parseMaybeConditional = function(e, t) {
  var n = this.start, i = this.startLoc, r = this.parseExprOps(e, t);
  if (this.checkExpressionErrors(t))
    return r;
  if (this.eat(f.question)) {
    var s = this.startNodeAt(n, i);
    return s.test = r, s.consequent = this.parseMaybeAssign(), this.expect(f.colon), s.alternate = this.parseMaybeAssign(e), this.finishNode(s, "ConditionalExpression");
  }
  return r;
};
V.parseExprOps = function(e, t) {
  var n = this.start, i = this.startLoc, r = this.parseMaybeUnary(t, !1, !1, e);
  return this.checkExpressionErrors(t) || r.start === n && r.type === "ArrowFunctionExpression" ? r : this.parseExprOp(r, n, i, -1, e);
};
V.parseExprOp = function(e, t, n, i, r) {
  var s = this.type.binop;
  if (s != null && (!r || this.type !== f._in) && s > i) {
    var a = this.type === f.logicalOR || this.type === f.logicalAND, o = this.type === f.coalesce;
    o && (s = f.logicalAND.binop);
    var l = this.value;
    this.next();
    var u = this.start, c = this.startLoc, p = this.parseExprOp(this.parseMaybeUnary(null, !1, !1, r), u, c, s, r), m = this.buildBinary(t, n, e, p, l, a || o);
    return (a && this.type === f.coalesce || o && (this.type === f.logicalOR || this.type === f.logicalAND)) && this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"), this.parseExprOp(m, t, n, i, r);
  }
  return e;
};
V.buildBinary = function(e, t, n, i, r, s) {
  i.type === "PrivateIdentifier" && this.raise(i.start, "Private identifier can only be left side of binary expression");
  var a = this.startNodeAt(e, t);
  return a.left = n, a.operator = r, a.right = i, this.finishNode(a, s ? "LogicalExpression" : "BinaryExpression");
};
V.parseMaybeUnary = function(e, t, n, i) {
  var r = this.start, s = this.startLoc, a;
  if (this.isContextual("await") && this.canAwait)
    a = this.parseAwait(i), t = !0;
  else if (this.type.prefix) {
    var o = this.startNode(), l = this.type === f.incDec;
    o.operator = this.value, o.prefix = !0, this.next(), o.argument = this.parseMaybeUnary(null, !0, l, i), this.checkExpressionErrors(e, !0), l ? this.checkLValSimple(o.argument) : this.strict && o.operator === "delete" && xs(o.argument) ? this.raiseRecoverable(o.start, "Deleting local variable in strict mode") : o.operator === "delete" && Yn(o.argument) ? this.raiseRecoverable(o.start, "Private fields can not be deleted") : t = !0, a = this.finishNode(o, l ? "UpdateExpression" : "UnaryExpression");
  } else if (!t && this.type === f.privateId)
    (i || this.privateNameStack.length === 0) && this.options.checkPrivateFields && this.unexpected(), a = this.parsePrivateIdent(), this.type !== f._in && this.unexpected();
  else {
    if (a = this.parseExprSubscripts(e, i), this.checkExpressionErrors(e))
      return a;
    for (; this.type.postfix && !this.canInsertSemicolon(); ) {
      var u = this.startNodeAt(r, s);
      u.operator = this.value, u.prefix = !1, u.argument = a, this.checkLValSimple(a), this.next(), a = this.finishNode(u, "UpdateExpression");
    }
  }
  if (!n && this.eat(f.starstar))
    if (t)
      this.unexpected(this.lastTokStart);
    else
      return this.buildBinary(r, s, a, this.parseMaybeUnary(null, !1, !1, i), "**", !1);
  else
    return a;
};
function xs(e) {
  return e.type === "Identifier" || e.type === "ParenthesizedExpression" && xs(e.expression);
}
function Yn(e) {
  return e.type === "MemberExpression" && e.property.type === "PrivateIdentifier" || e.type === "ChainExpression" && Yn(e.expression) || e.type === "ParenthesizedExpression" && Yn(e.expression);
}
V.parseExprSubscripts = function(e, t) {
  var n = this.start, i = this.startLoc, r = this.parseExprAtom(e, t);
  if (r.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")")
    return r;
  var s = this.parseSubscripts(r, n, i, !1, t);
  return e && s.type === "MemberExpression" && (e.parenthesizedAssign >= s.start && (e.parenthesizedAssign = -1), e.parenthesizedBind >= s.start && (e.parenthesizedBind = -1), e.trailingComma >= s.start && (e.trailingComma = -1)), s;
};
V.parseSubscripts = function(e, t, n, i, r) {
  for (var s = this.options.ecmaVersion >= 8 && e.type === "Identifier" && e.name === "async" && this.lastTokEnd === e.end && !this.canInsertSemicolon() && e.end - e.start === 5 && this.potentialArrowAt === e.start, a = !1; ; ) {
    var o = this.parseSubscript(e, t, n, i, s, a, r);
    if (o.optional && (a = !0), o === e || o.type === "ArrowFunctionExpression") {
      if (a) {
        var l = this.startNodeAt(t, n);
        l.expression = o, o = this.finishNode(l, "ChainExpression");
      }
      return o;
    }
    e = o;
  }
};
V.shouldParseAsyncArrow = function() {
  return !this.canInsertSemicolon() && this.eat(f.arrow);
};
V.parseSubscriptAsyncArrow = function(e, t, n, i) {
  return this.parseArrowExpression(this.startNodeAt(e, t), n, !0, i);
};
V.parseSubscript = function(e, t, n, i, r, s, a) {
  var o = this.options.ecmaVersion >= 11, l = o && this.eat(f.questionDot);
  i && l && this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
  var u = this.eat(f.bracketL);
  if (u || l && this.type !== f.parenL && this.type !== f.backQuote || this.eat(f.dot)) {
    var c = this.startNodeAt(t, n);
    c.object = e, u ? (c.property = this.parseExpression(), this.expect(f.bracketR)) : this.type === f.privateId && e.type !== "Super" ? c.property = this.parsePrivateIdent() : c.property = this.parseIdent(this.options.allowReserved !== "never"), c.computed = !!u, o && (c.optional = l), e = this.finishNode(c, "MemberExpression");
  } else if (!i && this.eat(f.parenL)) {
    var p = new wn(), m = this.yieldPos, h = this.awaitPos, v = this.awaitIdentPos;
    this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0;
    var b = this.parseExprList(f.parenR, this.options.ecmaVersion >= 8, !1, p);
    if (r && !l && this.shouldParseAsyncArrow())
      return this.checkPatternErrors(p, !1), this.checkYieldAwaitInDefaultParams(), this.awaitIdentPos > 0 && this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"), this.yieldPos = m, this.awaitPos = h, this.awaitIdentPos = v, this.parseSubscriptAsyncArrow(t, n, b, a);
    this.checkExpressionErrors(p, !0), this.yieldPos = m || this.yieldPos, this.awaitPos = h || this.awaitPos, this.awaitIdentPos = v || this.awaitIdentPos;
    var I = this.startNodeAt(t, n);
    I.callee = e, I.arguments = b, o && (I.optional = l), e = this.finishNode(I, "CallExpression");
  } else if (this.type === f.backQuote) {
    (l || s) && this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
    var y = this.startNodeAt(t, n);
    y.tag = e, y.quasi = this.parseTemplate({ isTagged: !0 }), e = this.finishNode(y, "TaggedTemplateExpression");
  }
  return e;
};
V.parseExprAtom = function(e, t, n) {
  this.type === f.slash && this.readRegexp();
  var i, r = this.potentialArrowAt === this.start;
  switch (this.type) {
    case f._super:
      return this.allowSuper || this.raise(this.start, "'super' keyword outside a method"), i = this.startNode(), this.next(), this.type === f.parenL && !this.allowDirectSuper && this.raise(i.start, "super() call outside constructor of a subclass"), this.type !== f.dot && this.type !== f.bracketL && this.type !== f.parenL && this.unexpected(), this.finishNode(i, "Super");
    case f._this:
      return i = this.startNode(), this.next(), this.finishNode(i, "ThisExpression");
    case f.name:
      var s = this.start, a = this.startLoc, o = this.containsEsc, l = this.parseIdent(!1);
      if (this.options.ecmaVersion >= 8 && !o && l.name === "async" && !this.canInsertSemicolon() && this.eat(f._function))
        return this.overrideContext(ee.f_expr), this.parseFunction(this.startNodeAt(s, a), 0, !1, !0, t);
      if (r && !this.canInsertSemicolon()) {
        if (this.eat(f.arrow))
          return this.parseArrowExpression(this.startNodeAt(s, a), [l], !1, t);
        if (this.options.ecmaVersion >= 8 && l.name === "async" && this.type === f.name && !o && (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc))
          return l = this.parseIdent(!1), (this.canInsertSemicolon() || !this.eat(f.arrow)) && this.unexpected(), this.parseArrowExpression(this.startNodeAt(s, a), [l], !0, t);
      }
      return l;
    case f.regexp:
      var u = this.value;
      return i = this.parseLiteral(u.value), i.regex = { pattern: u.pattern, flags: u.flags }, i;
    case f.num:
    case f.string:
      return this.parseLiteral(this.value);
    case f._null:
    case f._true:
    case f._false:
      return i = this.startNode(), i.value = this.type === f._null ? null : this.type === f._true, i.raw = this.type.keyword, this.next(), this.finishNode(i, "Literal");
    case f.parenL:
      var c = this.start, p = this.parseParenAndDistinguishExpression(r, t);
      return e && (e.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(p) && (e.parenthesizedAssign = c), e.parenthesizedBind < 0 && (e.parenthesizedBind = c)), p;
    case f.bracketL:
      return i = this.startNode(), this.next(), i.elements = this.parseExprList(f.bracketR, !0, !0, e), this.finishNode(i, "ArrayExpression");
    case f.braceL:
      return this.overrideContext(ee.b_expr), this.parseObj(!1, e);
    case f._function:
      return i = this.startNode(), this.next(), this.parseFunction(i, 0);
    case f._class:
      return this.parseClass(this.startNode(), !1);
    case f._new:
      return this.parseNew();
    case f.backQuote:
      return this.parseTemplate();
    case f._import:
      return this.options.ecmaVersion >= 11 ? this.parseExprImport(n) : this.unexpected();
    default:
      return this.parseExprAtomDefault();
  }
};
V.parseExprAtomDefault = function() {
  this.unexpected();
};
V.parseExprImport = function(e) {
  var t = this.startNode();
  if (this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword import"), this.next(), this.type === f.parenL && !e)
    return this.parseDynamicImport(t);
  if (this.type === f.dot) {
    var n = this.startNodeAt(t.start, t.loc && t.loc.start);
    return n.name = "import", t.meta = this.finishNode(n, "Identifier"), this.parseImportMeta(t);
  } else
    this.unexpected();
};
V.parseDynamicImport = function(e) {
  if (this.next(), e.source = this.parseMaybeAssign(), !this.eat(f.parenR)) {
    var t = this.start;
    this.eat(f.comma) && this.eat(f.parenR) ? this.raiseRecoverable(t, "Trailing comma is not allowed in import()") : this.unexpected(t);
  }
  return this.finishNode(e, "ImportExpression");
};
V.parseImportMeta = function(e) {
  this.next();
  var t = this.containsEsc;
  return e.property = this.parseIdent(!0), e.property.name !== "meta" && this.raiseRecoverable(e.property.start, "The only valid meta property for import is 'import.meta'"), t && this.raiseRecoverable(e.start, "'import.meta' must not contain escaped characters"), this.options.sourceType !== "module" && !this.options.allowImportExportEverywhere && this.raiseRecoverable(e.start, "Cannot use 'import.meta' outside a module"), this.finishNode(e, "MetaProperty");
};
V.parseLiteral = function(e) {
  var t = this.startNode();
  return t.value = e, t.raw = this.input.slice(this.start, this.end), t.raw.charCodeAt(t.raw.length - 1) === 110 && (t.bigint = t.raw.slice(0, -1).replace(/_/g, "")), this.next(), this.finishNode(t, "Literal");
};
V.parseParenExpression = function() {
  this.expect(f.parenL);
  var e = this.parseExpression();
  return this.expect(f.parenR), e;
};
V.shouldParseArrow = function(e) {
  return !this.canInsertSemicolon();
};
V.parseParenAndDistinguishExpression = function(e, t) {
  var n = this.start, i = this.startLoc, r, s = this.options.ecmaVersion >= 8;
  if (this.options.ecmaVersion >= 6) {
    this.next();
    var a = this.start, o = this.startLoc, l = [], u = !0, c = !1, p = new wn(), m = this.yieldPos, h = this.awaitPos, v;
    for (this.yieldPos = 0, this.awaitPos = 0; this.type !== f.parenR; )
      if (u ? u = !1 : this.expect(f.comma), s && this.afterTrailingComma(f.parenR, !0)) {
        c = !0;
        break;
      } else if (this.type === f.ellipsis) {
        v = this.start, l.push(this.parseParenItem(this.parseRestBinding())), this.type === f.comma && this.raiseRecoverable(
          this.start,
          "Comma is not permitted after the rest element"
        );
        break;
      } else
        l.push(this.parseMaybeAssign(!1, p, this.parseParenItem));
    var b = this.lastTokEnd, I = this.lastTokEndLoc;
    if (this.expect(f.parenR), e && this.shouldParseArrow(l) && this.eat(f.arrow))
      return this.checkPatternErrors(p, !1), this.checkYieldAwaitInDefaultParams(), this.yieldPos = m, this.awaitPos = h, this.parseParenArrowList(n, i, l, t);
    (!l.length || c) && this.unexpected(this.lastTokStart), v && this.unexpected(v), this.checkExpressionErrors(p, !0), this.yieldPos = m || this.yieldPos, this.awaitPos = h || this.awaitPos, l.length > 1 ? (r = this.startNodeAt(a, o), r.expressions = l, this.finishNodeAt(r, "SequenceExpression", b, I)) : r = l[0];
  } else
    r = this.parseParenExpression();
  if (this.options.preserveParens) {
    var y = this.startNodeAt(n, i);
    return y.expression = r, this.finishNode(y, "ParenthesizedExpression");
  } else
    return r;
};
V.parseParenItem = function(e) {
  return e;
};
V.parseParenArrowList = function(e, t, n, i) {
  return this.parseArrowExpression(this.startNodeAt(e, t), n, !1, i);
};
var qo = [];
V.parseNew = function() {
  this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword new");
  var e = this.startNode();
  if (this.next(), this.options.ecmaVersion >= 6 && this.type === f.dot) {
    var t = this.startNodeAt(e.start, e.loc && e.loc.start);
    t.name = "new", e.meta = this.finishNode(t, "Identifier"), this.next();
    var n = this.containsEsc;
    return e.property = this.parseIdent(!0), e.property.name !== "target" && this.raiseRecoverable(e.property.start, "The only valid meta property for new is 'new.target'"), n && this.raiseRecoverable(e.start, "'new.target' must not contain escaped characters"), this.allowNewDotTarget || this.raiseRecoverable(e.start, "'new.target' can only be used in functions and class static block"), this.finishNode(e, "MetaProperty");
  }
  var i = this.start, r = this.startLoc;
  return e.callee = this.parseSubscripts(this.parseExprAtom(null, !1, !0), i, r, !0, !1), this.eat(f.parenL) ? e.arguments = this.parseExprList(f.parenR, this.options.ecmaVersion >= 8, !1) : e.arguments = qo, this.finishNode(e, "NewExpression");
};
V.parseTemplateElement = function(e) {
  var t = e.isTagged, n = this.startNode();
  return this.type === f.invalidTemplate ? (t || this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal"), n.value = {
    raw: this.value.replace(/\r\n?/g, `
`),
    cooked: null
  }) : n.value = {
    raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, `
`),
    cooked: this.value
  }, this.next(), n.tail = this.type === f.backQuote, this.finishNode(n, "TemplateElement");
};
V.parseTemplate = function(e) {
  e === void 0 && (e = {});
  var t = e.isTagged;
  t === void 0 && (t = !1);
  var n = this.startNode();
  this.next(), n.expressions = [];
  var i = this.parseTemplateElement({ isTagged: t });
  for (n.quasis = [i]; !i.tail; )
    this.type === f.eof && this.raise(this.pos, "Unterminated template literal"), this.expect(f.dollarBraceL), n.expressions.push(this.parseExpression()), this.expect(f.braceR), n.quasis.push(i = this.parseTemplateElement({ isTagged: t }));
  return this.next(), this.finishNode(n, "TemplateLiteral");
};
V.isAsyncProp = function(e) {
  return !e.computed && e.key.type === "Identifier" && e.key.name === "async" && (this.type === f.name || this.type === f.num || this.type === f.string || this.type === f.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === f.star) && !be.test(this.input.slice(this.lastTokEnd, this.start));
};
V.parseObj = function(e, t) {
  var n = this.startNode(), i = !0, r = {};
  for (n.properties = [], this.next(); !this.eat(f.braceR); ) {
    if (i)
      i = !1;
    else if (this.expect(f.comma), this.options.ecmaVersion >= 5 && this.afterTrailingComma(f.braceR))
      break;
    var s = this.parseProperty(e, t);
    e || this.checkPropClash(s, r, t), n.properties.push(s);
  }
  return this.finishNode(n, e ? "ObjectPattern" : "ObjectExpression");
};
V.parseProperty = function(e, t) {
  var n = this.startNode(), i, r, s, a;
  if (this.options.ecmaVersion >= 9 && this.eat(f.ellipsis))
    return e ? (n.argument = this.parseIdent(!1), this.type === f.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element"), this.finishNode(n, "RestElement")) : (n.argument = this.parseMaybeAssign(!1, t), this.type === f.comma && t && t.trailingComma < 0 && (t.trailingComma = this.start), this.finishNode(n, "SpreadElement"));
  this.options.ecmaVersion >= 6 && (n.method = !1, n.shorthand = !1, (e || t) && (s = this.start, a = this.startLoc), e || (i = this.eat(f.star)));
  var o = this.containsEsc;
  return this.parsePropertyName(n), !e && !o && this.options.ecmaVersion >= 8 && !i && this.isAsyncProp(n) ? (r = !0, i = this.options.ecmaVersion >= 9 && this.eat(f.star), this.parsePropertyName(n)) : r = !1, this.parsePropertyValue(n, e, i, r, s, a, t, o), this.finishNode(n, "Property");
};
V.parseGetterSetter = function(e) {
  e.kind = e.key.name, this.parsePropertyName(e), e.value = this.parseMethod(!1);
  var t = e.kind === "get" ? 0 : 1;
  if (e.value.params.length !== t) {
    var n = e.value.start;
    e.kind === "get" ? this.raiseRecoverable(n, "getter should have no params") : this.raiseRecoverable(n, "setter should have exactly one param");
  } else
    e.kind === "set" && e.value.params[0].type === "RestElement" && this.raiseRecoverable(e.value.params[0].start, "Setter cannot use rest params");
};
V.parsePropertyValue = function(e, t, n, i, r, s, a, o) {
  (n || i) && this.type === f.colon && this.unexpected(), this.eat(f.colon) ? (e.value = t ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(!1, a), e.kind = "init") : this.options.ecmaVersion >= 6 && this.type === f.parenL ? (t && this.unexpected(), e.kind = "init", e.method = !0, e.value = this.parseMethod(n, i)) : !t && !o && this.options.ecmaVersion >= 5 && !e.computed && e.key.type === "Identifier" && (e.key.name === "get" || e.key.name === "set") && this.type !== f.comma && this.type !== f.braceR && this.type !== f.eq ? ((n || i) && this.unexpected(), this.parseGetterSetter(e)) : this.options.ecmaVersion >= 6 && !e.computed && e.key.type === "Identifier" ? ((n || i) && this.unexpected(), this.checkUnreserved(e.key), e.key.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = r), e.kind = "init", t ? e.value = this.parseMaybeDefault(r, s, this.copyNode(e.key)) : this.type === f.eq && a ? (a.shorthandAssign < 0 && (a.shorthandAssign = this.start), e.value = this.parseMaybeDefault(r, s, this.copyNode(e.key))) : e.value = this.copyNode(e.key), e.shorthand = !0) : this.unexpected();
};
V.parsePropertyName = function(e) {
  if (this.options.ecmaVersion >= 6) {
    if (this.eat(f.bracketL))
      return e.computed = !0, e.key = this.parseMaybeAssign(), this.expect(f.bracketR), e.key;
    e.computed = !1;
  }
  return e.key = this.type === f.num || this.type === f.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
};
V.initFunction = function(e) {
  e.id = null, this.options.ecmaVersion >= 6 && (e.generator = e.expression = !1), this.options.ecmaVersion >= 8 && (e.async = !1);
};
V.parseMethod = function(e, t, n) {
  var i = this.startNode(), r = this.yieldPos, s = this.awaitPos, a = this.awaitIdentPos;
  return this.initFunction(i), this.options.ecmaVersion >= 6 && (i.generator = e), this.options.ecmaVersion >= 8 && (i.async = !!t), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(hi(t, i.generator) | ci | (n ? ps : 0)), this.expect(f.parenL), i.params = this.parseBindingList(f.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams(), this.parseFunctionBody(i, !1, !0, !1), this.yieldPos = r, this.awaitPos = s, this.awaitIdentPos = a, this.finishNode(i, "FunctionExpression");
};
V.parseArrowExpression = function(e, t, n, i) {
  var r = this.yieldPos, s = this.awaitPos, a = this.awaitIdentPos;
  return this.enterScope(hi(n, !1) | us), this.initFunction(e), this.options.ecmaVersion >= 8 && (e.async = !!n), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, e.params = this.toAssignableList(t, !0), this.parseFunctionBody(e, !0, !1, i), this.yieldPos = r, this.awaitPos = s, this.awaitIdentPos = a, this.finishNode(e, "ArrowFunctionExpression");
};
V.parseFunctionBody = function(e, t, n, i) {
  var r = t && this.type !== f.braceL, s = this.strict, a = !1;
  if (r)
    e.body = this.parseMaybeAssign(i), e.expression = !0, this.checkParams(e, !1);
  else {
    var o = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params);
    (!s || o) && (a = this.strictDirective(this.end), a && o && this.raiseRecoverable(e.start, "Illegal 'use strict' directive in function with non-simple parameter list"));
    var l = this.labels;
    this.labels = [], a && (this.strict = !0), this.checkParams(e, !s && !a && !t && !n && this.isSimpleParamList(e.params)), this.strict && e.id && this.checkLValSimple(e.id, ms), e.body = this.parseBlock(!1, void 0, a && !s), e.expression = !1, this.adaptDirectivePrologue(e.body.body), this.labels = l;
  }
  this.exitScope();
};
V.isSimpleParamList = function(e) {
  for (var t = 0, n = e; t < n.length; t += 1) {
    var i = n[t];
    if (i.type !== "Identifier")
      return !1;
  }
  return !0;
};
V.checkParams = function(e, t) {
  for (var n = /* @__PURE__ */ Object.create(null), i = 0, r = e.params; i < r.length; i += 1) {
    var s = r[i];
    this.checkLValInnerPattern(s, fi, t ? null : n);
  }
};
V.parseExprList = function(e, t, n, i) {
  for (var r = [], s = !0; !this.eat(e); ) {
    if (s)
      s = !1;
    else if (this.expect(f.comma), t && this.afterTrailingComma(e))
      break;
    var a = void 0;
    n && this.type === f.comma ? a = null : this.type === f.ellipsis ? (a = this.parseSpread(i), i && this.type === f.comma && i.trailingComma < 0 && (i.trailingComma = this.start)) : a = this.parseMaybeAssign(!1, i), r.push(a);
  }
  return r;
};
V.checkUnreserved = function(e) {
  var t = e.start, n = e.end, i = e.name;
  if (this.inGenerator && i === "yield" && this.raiseRecoverable(t, "Cannot use 'yield' as identifier inside a generator"), this.inAsync && i === "await" && this.raiseRecoverable(t, "Cannot use 'await' as identifier inside an async function"), this.currentThisScope().inClassFieldInit && i === "arguments" && this.raiseRecoverable(t, "Cannot use 'arguments' in class field initializer"), this.inClassStaticBlock && (i === "arguments" || i === "await") && this.raise(t, "Cannot use " + i + " in class static initialization block"), this.keywords.test(i) && this.raise(t, "Unexpected keyword '" + i + "'"), !(this.options.ecmaVersion < 6 && this.input.slice(t, n).indexOf("\\") !== -1)) {
    var r = this.strict ? this.reservedWordsStrict : this.reservedWords;
    r.test(i) && (!this.inAsync && i === "await" && this.raiseRecoverable(t, "Cannot use keyword 'await' outside an async function"), this.raiseRecoverable(t, "The keyword '" + i + "' is reserved"));
  }
};
V.parseIdent = function(e) {
  var t = this.parseIdentNode();
  return this.next(!!e), this.finishNode(t, "Identifier"), e || (this.checkUnreserved(t), t.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = t.start)), t;
};
V.parseIdentNode = function() {
  var e = this.startNode();
  return this.type === f.name ? e.name = this.value : this.type.keyword ? (e.name = this.type.keyword, (e.name === "class" || e.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46) && this.context.pop(), this.type = f.name) : this.unexpected(), e;
};
V.parsePrivateIdent = function() {
  var e = this.startNode();
  return this.type === f.privateId ? e.name = this.value : this.unexpected(), this.next(), this.finishNode(e, "PrivateIdentifier"), this.options.checkPrivateFields && (this.privateNameStack.length === 0 ? this.raise(e.start, "Private field '#" + e.name + "' must be declared in an enclosing class") : this.privateNameStack[this.privateNameStack.length - 1].used.push(e)), e;
};
V.parseYield = function(e) {
  this.yieldPos || (this.yieldPos = this.start);
  var t = this.startNode();
  return this.next(), this.type === f.semi || this.canInsertSemicolon() || this.type !== f.star && !this.type.startsExpr ? (t.delegate = !1, t.argument = null) : (t.delegate = this.eat(f.star), t.argument = this.parseMaybeAssign(e)), this.finishNode(t, "YieldExpression");
};
V.parseAwait = function(e) {
  this.awaitPos || (this.awaitPos = this.start);
  var t = this.startNode();
  return this.next(), t.argument = this.parseMaybeUnary(null, !0, !1, e), this.finishNode(t, "AwaitExpression");
};
var pn = ie.prototype;
pn.raise = function(e, t) {
  var n = li(this.input, e);
  t += " (" + n.line + ":" + n.column + ")";
  var i = new SyntaxError(t);
  throw i.pos = e, i.loc = n, i.raisedAt = this.pos, i;
};
pn.raiseRecoverable = pn.raise;
pn.curPosition = function() {
  if (this.options.locations)
    return new kt(this.curLine, this.pos - this.lineStart);
};
var tt = ie.prototype, Ho = function(t) {
  this.flags = t, this.var = [], this.lexical = [], this.functions = [], this.inClassFieldInit = !1;
};
tt.enterScope = function(e) {
  this.scopeStack.push(new Ho(e));
};
tt.exitScope = function() {
  this.scopeStack.pop();
};
tt.treatFunctionsAsVarInScope = function(e) {
  return e.flags & vt || !this.inModule && e.flags & Mt;
};
tt.declareName = function(e, t, n) {
  var i = !1;
  if (t === We) {
    var r = this.currentScope();
    i = r.lexical.indexOf(e) > -1 || r.functions.indexOf(e) > -1 || r.var.indexOf(e) > -1, r.lexical.push(e), this.inModule && r.flags & Mt && delete this.undefinedExports[e];
  } else if (t === fs) {
    var s = this.currentScope();
    s.lexical.push(e);
  } else if (t === hs) {
    var a = this.currentScope();
    this.treatFunctionsAsVar ? i = a.lexical.indexOf(e) > -1 : i = a.lexical.indexOf(e) > -1 || a.var.indexOf(e) > -1, a.functions.push(e);
  } else
    for (var o = this.scopeStack.length - 1; o >= 0; --o) {
      var l = this.scopeStack[o];
      if (l.lexical.indexOf(e) > -1 && !(l.flags & cs && l.lexical[0] === e) || !this.treatFunctionsAsVarInScope(l) && l.functions.indexOf(e) > -1) {
        i = !0;
        break;
      }
      if (l.var.push(e), this.inModule && l.flags & Mt && delete this.undefinedExports[e], l.flags & pi)
        break;
    }
  i && this.raiseRecoverable(n, "Identifier '" + e + "' has already been declared");
};
tt.checkLocalExport = function(e) {
  this.scopeStack[0].lexical.indexOf(e.name) === -1 && this.scopeStack[0].var.indexOf(e.name) === -1 && (this.undefinedExports[e.name] = e);
};
tt.currentScope = function() {
  return this.scopeStack[this.scopeStack.length - 1];
};
tt.currentVarScope = function() {
  for (var e = this.scopeStack.length - 1; ; e--) {
    var t = this.scopeStack[e];
    if (t.flags & pi)
      return t;
  }
};
tt.currentThisScope = function() {
  for (var e = this.scopeStack.length - 1; ; e--) {
    var t = this.scopeStack[e];
    if (t.flags & pi && !(t.flags & us))
      return t;
  }
};
var zt = function(t, n, i) {
  this.type = "", this.start = n, this.end = 0, t.options.locations && (this.loc = new Bt(t, i)), t.options.directSourceFile && (this.sourceFile = t.options.directSourceFile), t.options.ranges && (this.range = [n, 0]);
}, Ut = ie.prototype;
Ut.startNode = function() {
  return new zt(this, this.start, this.startLoc);
};
Ut.startNodeAt = function(e, t) {
  return new zt(this, e, t);
};
function gs(e, t, n, i) {
  return e.type = t, e.end = n, this.options.locations && (e.loc.end = i), this.options.ranges && (e.range[1] = n), e;
}
Ut.finishNode = function(e, t) {
  return gs.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc);
};
Ut.finishNodeAt = function(e, t, n, i) {
  return gs.call(this, e, t, n, i);
};
Ut.copyNode = function(e) {
  var t = new zt(this, e.start, this.startLoc);
  for (var n in e)
    t[n] = e[n];
  return t;
};
var ys = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS", bs = ys + " Extended_Pictographic", ws = bs, ks = ws + " EBase EComp EMod EPres ExtPict", vs = ks, $o = vs, Wo = {
  9: ys,
  10: bs,
  11: ws,
  12: ks,
  13: vs,
  14: $o
}, Go = "Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji", Qo = {
  9: "",
  10: "",
  11: "",
  12: "",
  13: "",
  14: Go
}, Ui = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu", Ss = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb", Es = Ss + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd", Cs = Es + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho", Is = Cs + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi", As = Is + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith", Yo = As + " Hrkt Katakana_Or_Hiragana Kawi Nag_Mundari Nagm Unknown Zzzz", Ko = {
  9: Ss,
  10: Es,
  11: Cs,
  12: Is,
  13: As,
  14: Yo
}, _s = {};
function Zo(e) {
  var t = _s[e] = {
    binary: Ke(Wo[e] + " " + Ui),
    binaryOfStrings: Ke(Qo[e]),
    nonBinary: {
      General_Category: Ke(Ui),
      Script: Ke(Ko[e])
    }
  };
  t.nonBinary.Script_Extensions = t.nonBinary.Script, t.nonBinary.gc = t.nonBinary.General_Category, t.nonBinary.sc = t.nonBinary.Script, t.nonBinary.scx = t.nonBinary.Script_Extensions;
}
for (var Fn = 0, Xi = [9, 10, 11, 12, 13, 14]; Fn < Xi.length; Fn += 1) {
  var el = Xi[Fn];
  Zo(el);
}
var M = ie.prototype, hn = function(t, n) {
  this.parent = t, this.base = n || this;
};
hn.prototype.separatedFrom = function(t) {
  for (var n = this; n; n = n.parent)
    for (var i = t; i; i = i.parent)
      if (n.base === i.base && n !== i)
        return !0;
  return !1;
};
hn.prototype.sibling = function() {
  return new hn(this.parent, this.base);
};
var Be = function(t) {
  this.parser = t, this.validFlags = "gim" + (t.options.ecmaVersion >= 6 ? "uy" : "") + (t.options.ecmaVersion >= 9 ? "s" : "") + (t.options.ecmaVersion >= 13 ? "d" : "") + (t.options.ecmaVersion >= 15 ? "v" : ""), this.unicodeProperties = _s[t.options.ecmaVersion >= 14 ? 14 : t.options.ecmaVersion], this.source = "", this.flags = "", this.start = 0, this.switchU = !1, this.switchV = !1, this.switchN = !1, this.pos = 0, this.lastIntValue = 0, this.lastStringValue = "", this.lastAssertionIsQuantifiable = !1, this.numCapturingParens = 0, this.maxBackReference = 0, this.groupNames = /* @__PURE__ */ Object.create(null), this.backReferenceNames = [], this.branchID = null;
};
Be.prototype.reset = function(t, n, i) {
  var r = i.indexOf("v") !== -1, s = i.indexOf("u") !== -1;
  this.start = t | 0, this.source = n + "", this.flags = i, r && this.parser.options.ecmaVersion >= 15 ? (this.switchU = !0, this.switchV = !0, this.switchN = !0) : (this.switchU = s && this.parser.options.ecmaVersion >= 6, this.switchV = !1, this.switchN = s && this.parser.options.ecmaVersion >= 9);
};
Be.prototype.raise = function(t) {
  this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + t);
};
Be.prototype.at = function(t, n) {
  n === void 0 && (n = !1);
  var i = this.source, r = i.length;
  if (t >= r)
    return -1;
  var s = i.charCodeAt(t);
  if (!(n || this.switchU) || s <= 55295 || s >= 57344 || t + 1 >= r)
    return s;
  var a = i.charCodeAt(t + 1);
  return a >= 56320 && a <= 57343 ? (s << 10) + a - 56613888 : s;
};
Be.prototype.nextIndex = function(t, n) {
  n === void 0 && (n = !1);
  var i = this.source, r = i.length;
  if (t >= r)
    return r;
  var s = i.charCodeAt(t), a;
  return !(n || this.switchU) || s <= 55295 || s >= 57344 || t + 1 >= r || (a = i.charCodeAt(t + 1)) < 56320 || a > 57343 ? t + 1 : t + 2;
};
Be.prototype.current = function(t) {
  return t === void 0 && (t = !1), this.at(this.pos, t);
};
Be.prototype.lookahead = function(t) {
  return t === void 0 && (t = !1), this.at(this.nextIndex(this.pos, t), t);
};
Be.prototype.advance = function(t) {
  t === void 0 && (t = !1), this.pos = this.nextIndex(this.pos, t);
};
Be.prototype.eat = function(t, n) {
  return n === void 0 && (n = !1), this.current(n) === t ? (this.advance(n), !0) : !1;
};
Be.prototype.eatChars = function(t, n) {
  n === void 0 && (n = !1);
  for (var i = this.pos, r = 0, s = t; r < s.length; r += 1) {
    var a = s[r], o = this.at(i, n);
    if (o === -1 || o !== a)
      return !1;
    i = this.nextIndex(i, n);
  }
  return this.pos = i, !0;
};
M.validateRegExpFlags = function(e) {
  for (var t = e.validFlags, n = e.flags, i = !1, r = !1, s = 0; s < n.length; s++) {
    var a = n.charAt(s);
    t.indexOf(a) === -1 && this.raise(e.start, "Invalid regular expression flag"), n.indexOf(a, s + 1) > -1 && this.raise(e.start, "Duplicate regular expression flag"), a === "u" && (i = !0), a === "v" && (r = !0);
  }
  this.options.ecmaVersion >= 15 && i && r && this.raise(e.start, "Invalid regular expression flag");
};
function tl(e) {
  for (var t in e)
    return !0;
  return !1;
}
M.validateRegExpPattern = function(e) {
  this.regexp_pattern(e), !e.switchN && this.options.ecmaVersion >= 9 && tl(e.groupNames) && (e.switchN = !0, this.regexp_pattern(e));
};
M.regexp_pattern = function(e) {
  e.pos = 0, e.lastIntValue = 0, e.lastStringValue = "", e.lastAssertionIsQuantifiable = !1, e.numCapturingParens = 0, e.maxBackReference = 0, e.groupNames = /* @__PURE__ */ Object.create(null), e.backReferenceNames.length = 0, e.branchID = null, this.regexp_disjunction(e), e.pos !== e.source.length && (e.eat(
    41
    /* ) */
  ) && e.raise("Unmatched ')'"), (e.eat(
    93
    /* ] */
  ) || e.eat(
    125
    /* } */
  )) && e.raise("Lone quantifier brackets")), e.maxBackReference > e.numCapturingParens && e.raise("Invalid escape");
  for (var t = 0, n = e.backReferenceNames; t < n.length; t += 1) {
    var i = n[t];
    e.groupNames[i] || e.raise("Invalid named capture referenced");
  }
};
M.regexp_disjunction = function(e) {
  var t = this.options.ecmaVersion >= 16;
  for (t && (e.branchID = new hn(e.branchID, null)), this.regexp_alternative(e); e.eat(
    124
    /* | */
  ); )
    t && (e.branchID = e.branchID.sibling()), this.regexp_alternative(e);
  t && (e.branchID = e.branchID.parent), this.regexp_eatQuantifier(e, !0) && e.raise("Nothing to repeat"), e.eat(
    123
    /* { */
  ) && e.raise("Lone quantifier brackets");
};
M.regexp_alternative = function(e) {
  for (; e.pos < e.source.length && this.regexp_eatTerm(e); )
    ;
};
M.regexp_eatTerm = function(e) {
  return this.regexp_eatAssertion(e) ? (e.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(e) && e.switchU && e.raise("Invalid quantifier"), !0) : (e.switchU ? this.regexp_eatAtom(e) : this.regexp_eatExtendedAtom(e)) ? (this.regexp_eatQuantifier(e), !0) : !1;
};
M.regexp_eatAssertion = function(e) {
  var t = e.pos;
  if (e.lastAssertionIsQuantifiable = !1, e.eat(
    94
    /* ^ */
  ) || e.eat(
    36
    /* $ */
  ))
    return !0;
  if (e.eat(
    92
    /* \ */
  )) {
    if (e.eat(
      66
      /* B */
    ) || e.eat(
      98
      /* b */
    ))
      return !0;
    e.pos = t;
  }
  if (e.eat(
    40
    /* ( */
  ) && e.eat(
    63
    /* ? */
  )) {
    var n = !1;
    if (this.options.ecmaVersion >= 9 && (n = e.eat(
      60
      /* < */
    )), e.eat(
      61
      /* = */
    ) || e.eat(
      33
      /* ! */
    ))
      return this.regexp_disjunction(e), e.eat(
        41
        /* ) */
      ) || e.raise("Unterminated group"), e.lastAssertionIsQuantifiable = !n, !0;
  }
  return e.pos = t, !1;
};
M.regexp_eatQuantifier = function(e, t) {
  return t === void 0 && (t = !1), this.regexp_eatQuantifierPrefix(e, t) ? (e.eat(
    63
    /* ? */
  ), !0) : !1;
};
M.regexp_eatQuantifierPrefix = function(e, t) {
  return e.eat(
    42
    /* * */
  ) || e.eat(
    43
    /* + */
  ) || e.eat(
    63
    /* ? */
  ) || this.regexp_eatBracedQuantifier(e, t);
};
M.regexp_eatBracedQuantifier = function(e, t) {
  var n = e.pos;
  if (e.eat(
    123
    /* { */
  )) {
    var i = 0, r = -1;
    if (this.regexp_eatDecimalDigits(e) && (i = e.lastIntValue, e.eat(
      44
      /* , */
    ) && this.regexp_eatDecimalDigits(e) && (r = e.lastIntValue), e.eat(
      125
      /* } */
    )))
      return r !== -1 && r < i && !t && e.raise("numbers out of order in {} quantifier"), !0;
    e.switchU && !t && e.raise("Incomplete quantifier"), e.pos = n;
  }
  return !1;
};
M.regexp_eatAtom = function(e) {
  return this.regexp_eatPatternCharacters(e) || e.eat(
    46
    /* . */
  ) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e);
};
M.regexp_eatReverseSolidusAtomEscape = function(e) {
  var t = e.pos;
  if (e.eat(
    92
    /* \ */
  )) {
    if (this.regexp_eatAtomEscape(e))
      return !0;
    e.pos = t;
  }
  return !1;
};
M.regexp_eatUncapturingGroup = function(e) {
  var t = e.pos;
  if (e.eat(
    40
    /* ( */
  )) {
    if (e.eat(
      63
      /* ? */
    ) && e.eat(
      58
      /* : */
    )) {
      if (this.regexp_disjunction(e), e.eat(
        41
        /* ) */
      ))
        return !0;
      e.raise("Unterminated group");
    }
    e.pos = t;
  }
  return !1;
};
M.regexp_eatCapturingGroup = function(e) {
  if (e.eat(
    40
    /* ( */
  )) {
    if (this.options.ecmaVersion >= 9 ? this.regexp_groupSpecifier(e) : e.current() === 63 && e.raise("Invalid group"), this.regexp_disjunction(e), e.eat(
      41
      /* ) */
    ))
      return e.numCapturingParens += 1, !0;
    e.raise("Unterminated group");
  }
  return !1;
};
M.regexp_eatExtendedAtom = function(e) {
  return e.eat(
    46
    /* . */
  ) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e) || this.regexp_eatInvalidBracedQuantifier(e) || this.regexp_eatExtendedPatternCharacter(e);
};
M.regexp_eatInvalidBracedQuantifier = function(e) {
  return this.regexp_eatBracedQuantifier(e, !0) && e.raise("Nothing to repeat"), !1;
};
M.regexp_eatSyntaxCharacter = function(e) {
  var t = e.current();
  return Ts(t) ? (e.lastIntValue = t, e.advance(), !0) : !1;
};
function Ts(e) {
  return e === 36 || e >= 40 && e <= 43 || e === 46 || e === 63 || e >= 91 && e <= 94 || e >= 123 && e <= 125;
}
M.regexp_eatPatternCharacters = function(e) {
  for (var t = e.pos, n = 0; (n = e.current()) !== -1 && !Ts(n); )
    e.advance();
  return e.pos !== t;
};
M.regexp_eatExtendedPatternCharacter = function(e) {
  var t = e.current();
  return t !== -1 && t !== 36 && !(t >= 40 && t <= 43) && t !== 46 && t !== 63 && t !== 91 && t !== 94 && t !== 124 ? (e.advance(), !0) : !1;
};
M.regexp_groupSpecifier = function(e) {
  if (e.eat(
    63
    /* ? */
  )) {
    this.regexp_eatGroupName(e) || e.raise("Invalid group");
    var t = this.options.ecmaVersion >= 16, n = e.groupNames[e.lastStringValue];
    if (n)
      if (t)
        for (var i = 0, r = n; i < r.length; i += 1) {
          var s = r[i];
          s.separatedFrom(e.branchID) || e.raise("Duplicate capture group name");
        }
      else
        e.raise("Duplicate capture group name");
    t ? (n || (e.groupNames[e.lastStringValue] = [])).push(e.branchID) : e.groupNames[e.lastStringValue] = !0;
  }
};
M.regexp_eatGroupName = function(e) {
  if (e.lastStringValue = "", e.eat(
    60
    /* < */
  )) {
    if (this.regexp_eatRegExpIdentifierName(e) && e.eat(
      62
      /* > */
    ))
      return !0;
    e.raise("Invalid capture group name");
  }
  return !1;
};
M.regexp_eatRegExpIdentifierName = function(e) {
  if (e.lastStringValue = "", this.regexp_eatRegExpIdentifierStart(e)) {
    for (e.lastStringValue += et(e.lastIntValue); this.regexp_eatRegExpIdentifierPart(e); )
      e.lastStringValue += et(e.lastIntValue);
    return !0;
  }
  return !1;
};
M.regexp_eatRegExpIdentifierStart = function(e) {
  var t = e.pos, n = this.options.ecmaVersion >= 11, i = e.current(n);
  return e.advance(n), i === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, n) && (i = e.lastIntValue), nl(i) ? (e.lastIntValue = i, !0) : (e.pos = t, !1);
};
function nl(e) {
  return je(e, !0) || e === 36 || e === 95;
}
M.regexp_eatRegExpIdentifierPart = function(e) {
  var t = e.pos, n = this.options.ecmaVersion >= 11, i = e.current(n);
  return e.advance(n), i === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, n) && (i = e.lastIntValue), il(i) ? (e.lastIntValue = i, !0) : (e.pos = t, !1);
};
function il(e) {
  return at(e, !0) || e === 36 || e === 95 || e === 8204 || e === 8205;
}
M.regexp_eatAtomEscape = function(e) {
  return this.regexp_eatBackReference(e) || this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e) || e.switchN && this.regexp_eatKGroupName(e) ? !0 : (e.switchU && (e.current() === 99 && e.raise("Invalid unicode escape"), e.raise("Invalid escape")), !1);
};
M.regexp_eatBackReference = function(e) {
  var t = e.pos;
  if (this.regexp_eatDecimalEscape(e)) {
    var n = e.lastIntValue;
    if (e.switchU)
      return n > e.maxBackReference && (e.maxBackReference = n), !0;
    if (n <= e.numCapturingParens)
      return !0;
    e.pos = t;
  }
  return !1;
};
M.regexp_eatKGroupName = function(e) {
  if (e.eat(
    107
    /* k */
  )) {
    if (this.regexp_eatGroupName(e))
      return e.backReferenceNames.push(e.lastStringValue), !0;
    e.raise("Invalid named reference");
  }
  return !1;
};
M.regexp_eatCharacterEscape = function(e) {
  return this.regexp_eatControlEscape(e) || this.regexp_eatCControlLetter(e) || this.regexp_eatZero(e) || this.regexp_eatHexEscapeSequence(e) || this.regexp_eatRegExpUnicodeEscapeSequence(e, !1) || !e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e) || this.regexp_eatIdentityEscape(e);
};
M.regexp_eatCControlLetter = function(e) {
  var t = e.pos;
  if (e.eat(
    99
    /* c */
  )) {
    if (this.regexp_eatControlLetter(e))
      return !0;
    e.pos = t;
  }
  return !1;
};
M.regexp_eatZero = function(e) {
  return e.current() === 48 && !kn(e.lookahead()) ? (e.lastIntValue = 0, e.advance(), !0) : !1;
};
M.regexp_eatControlEscape = function(e) {
  var t = e.current();
  return t === 116 ? (e.lastIntValue = 9, e.advance(), !0) : t === 110 ? (e.lastIntValue = 10, e.advance(), !0) : t === 118 ? (e.lastIntValue = 11, e.advance(), !0) : t === 102 ? (e.lastIntValue = 12, e.advance(), !0) : t === 114 ? (e.lastIntValue = 13, e.advance(), !0) : !1;
};
M.regexp_eatControlLetter = function(e) {
  var t = e.current();
  return Ps(t) ? (e.lastIntValue = t % 32, e.advance(), !0) : !1;
};
function Ps(e) {
  return e >= 65 && e <= 90 || e >= 97 && e <= 122;
}
M.regexp_eatRegExpUnicodeEscapeSequence = function(e, t) {
  t === void 0 && (t = !1);
  var n = e.pos, i = t || e.switchU;
  if (e.eat(
    117
    /* u */
  )) {
    if (this.regexp_eatFixedHexDigits(e, 4)) {
      var r = e.lastIntValue;
      if (i && r >= 55296 && r <= 56319) {
        var s = e.pos;
        if (e.eat(
          92
          /* \ */
        ) && e.eat(
          117
          /* u */
        ) && this.regexp_eatFixedHexDigits(e, 4)) {
          var a = e.lastIntValue;
          if (a >= 56320 && a <= 57343)
            return e.lastIntValue = (r - 55296) * 1024 + (a - 56320) + 65536, !0;
        }
        e.pos = s, e.lastIntValue = r;
      }
      return !0;
    }
    if (i && e.eat(
      123
      /* { */
    ) && this.regexp_eatHexDigits(e) && e.eat(
      125
      /* } */
    ) && rl(e.lastIntValue))
      return !0;
    i && e.raise("Invalid unicode escape"), e.pos = n;
  }
  return !1;
};
function rl(e) {
  return e >= 0 && e <= 1114111;
}
M.regexp_eatIdentityEscape = function(e) {
  if (e.switchU)
    return this.regexp_eatSyntaxCharacter(e) ? !0 : e.eat(
      47
      /* / */
    ) ? (e.lastIntValue = 47, !0) : !1;
  var t = e.current();
  return t !== 99 && (!e.switchN || t !== 107) ? (e.lastIntValue = t, e.advance(), !0) : !1;
};
M.regexp_eatDecimalEscape = function(e) {
  e.lastIntValue = 0;
  var t = e.current();
  if (t >= 49 && t <= 57) {
    do
      e.lastIntValue = 10 * e.lastIntValue + (t - 48), e.advance();
    while ((t = e.current()) >= 48 && t <= 57);
    return !0;
  }
  return !1;
};
var Ns = 0, He = 1, Ce = 2;
M.regexp_eatCharacterClassEscape = function(e) {
  var t = e.current();
  if (sl(t))
    return e.lastIntValue = -1, e.advance(), He;
  var n = !1;
  if (e.switchU && this.options.ecmaVersion >= 9 && ((n = t === 80) || t === 112)) {
    e.lastIntValue = -1, e.advance();
    var i;
    if (e.eat(
      123
      /* { */
    ) && (i = this.regexp_eatUnicodePropertyValueExpression(e)) && e.eat(
      125
      /* } */
    ))
      return n && i === Ce && e.raise("Invalid property name"), i;
    e.raise("Invalid property name");
  }
  return Ns;
};
function sl(e) {
  return e === 100 || e === 68 || e === 115 || e === 83 || e === 119 || e === 87;
}
M.regexp_eatUnicodePropertyValueExpression = function(e) {
  var t = e.pos;
  if (this.regexp_eatUnicodePropertyName(e) && e.eat(
    61
    /* = */
  )) {
    var n = e.lastStringValue;
    if (this.regexp_eatUnicodePropertyValue(e)) {
      var i = e.lastStringValue;
      return this.regexp_validateUnicodePropertyNameAndValue(e, n, i), He;
    }
  }
  if (e.pos = t, this.regexp_eatLoneUnicodePropertyNameOrValue(e)) {
    var r = e.lastStringValue;
    return this.regexp_validateUnicodePropertyNameOrValue(e, r);
  }
  return Ns;
};
M.regexp_validateUnicodePropertyNameAndValue = function(e, t, n) {
  Vt(e.unicodeProperties.nonBinary, t) || e.raise("Invalid property name"), e.unicodeProperties.nonBinary[t].test(n) || e.raise("Invalid property value");
};
M.regexp_validateUnicodePropertyNameOrValue = function(e, t) {
  if (e.unicodeProperties.binary.test(t))
    return He;
  if (e.switchV && e.unicodeProperties.binaryOfStrings.test(t))
    return Ce;
  e.raise("Invalid property name");
};
M.regexp_eatUnicodePropertyName = function(e) {
  var t = 0;
  for (e.lastStringValue = ""; Ls(t = e.current()); )
    e.lastStringValue += et(t), e.advance();
  return e.lastStringValue !== "";
};
function Ls(e) {
  return Ps(e) || e === 95;
}
M.regexp_eatUnicodePropertyValue = function(e) {
  var t = 0;
  for (e.lastStringValue = ""; al(t = e.current()); )
    e.lastStringValue += et(t), e.advance();
  return e.lastStringValue !== "";
};
function al(e) {
  return Ls(e) || kn(e);
}
M.regexp_eatLoneUnicodePropertyNameOrValue = function(e) {
  return this.regexp_eatUnicodePropertyValue(e);
};
M.regexp_eatCharacterClass = function(e) {
  if (e.eat(
    91
    /* [ */
  )) {
    var t = e.eat(
      94
      /* ^ */
    ), n = this.regexp_classContents(e);
    return e.eat(
      93
      /* ] */
    ) || e.raise("Unterminated character class"), t && n === Ce && e.raise("Negated character class may contain strings"), !0;
  }
  return !1;
};
M.regexp_classContents = function(e) {
  return e.current() === 93 ? He : e.switchV ? this.regexp_classSetExpression(e) : (this.regexp_nonEmptyClassRanges(e), He);
};
M.regexp_nonEmptyClassRanges = function(e) {
  for (; this.regexp_eatClassAtom(e); ) {
    var t = e.lastIntValue;
    if (e.eat(
      45
      /* - */
    ) && this.regexp_eatClassAtom(e)) {
      var n = e.lastIntValue;
      e.switchU && (t === -1 || n === -1) && e.raise("Invalid character class"), t !== -1 && n !== -1 && t > n && e.raise("Range out of order in character class");
    }
  }
};
M.regexp_eatClassAtom = function(e) {
  var t = e.pos;
  if (e.eat(
    92
    /* \ */
  )) {
    if (this.regexp_eatClassEscape(e))
      return !0;
    if (e.switchU) {
      var n = e.current();
      (n === 99 || Os(n)) && e.raise("Invalid class escape"), e.raise("Invalid escape");
    }
    e.pos = t;
  }
  var i = e.current();
  return i !== 93 ? (e.lastIntValue = i, e.advance(), !0) : !1;
};
M.regexp_eatClassEscape = function(e) {
  var t = e.pos;
  if (e.eat(
    98
    /* b */
  ))
    return e.lastIntValue = 8, !0;
  if (e.switchU && e.eat(
    45
    /* - */
  ))
    return e.lastIntValue = 45, !0;
  if (!e.switchU && e.eat(
    99
    /* c */
  )) {
    if (this.regexp_eatClassControlLetter(e))
      return !0;
    e.pos = t;
  }
  return this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e);
};
M.regexp_classSetExpression = function(e) {
  var t = He, n;
  if (!this.regexp_eatClassSetRange(e)) if (n = this.regexp_eatClassSetOperand(e)) {
    n === Ce && (t = Ce);
    for (var i = e.pos; e.eatChars(
      [38, 38]
      /* && */
    ); ) {
      if (e.current() !== 38 && (n = this.regexp_eatClassSetOperand(e))) {
        n !== Ce && (t = He);
        continue;
      }
      e.raise("Invalid character in character class");
    }
    if (i !== e.pos)
      return t;
    for (; e.eatChars(
      [45, 45]
      /* -- */
    ); )
      this.regexp_eatClassSetOperand(e) || e.raise("Invalid character in character class");
    if (i !== e.pos)
      return t;
  } else
    e.raise("Invalid character in character class");
  for (; ; )
    if (!this.regexp_eatClassSetRange(e)) {
      if (n = this.regexp_eatClassSetOperand(e), !n)
        return t;
      n === Ce && (t = Ce);
    }
};
M.regexp_eatClassSetRange = function(e) {
  var t = e.pos;
  if (this.regexp_eatClassSetCharacter(e)) {
    var n = e.lastIntValue;
    if (e.eat(
      45
      /* - */
    ) && this.regexp_eatClassSetCharacter(e)) {
      var i = e.lastIntValue;
      return n !== -1 && i !== -1 && n > i && e.raise("Range out of order in character class"), !0;
    }
    e.pos = t;
  }
  return !1;
};
M.regexp_eatClassSetOperand = function(e) {
  return this.regexp_eatClassSetCharacter(e) ? He : this.regexp_eatClassStringDisjunction(e) || this.regexp_eatNestedClass(e);
};
M.regexp_eatNestedClass = function(e) {
  var t = e.pos;
  if (e.eat(
    91
    /* [ */
  )) {
    var n = e.eat(
      94
      /* ^ */
    ), i = this.regexp_classContents(e);
    if (e.eat(
      93
      /* ] */
    ))
      return n && i === Ce && e.raise("Negated character class may contain strings"), i;
    e.pos = t;
  }
  if (e.eat(
    92
    /* \ */
  )) {
    var r = this.regexp_eatCharacterClassEscape(e);
    if (r)
      return r;
    e.pos = t;
  }
  return null;
};
M.regexp_eatClassStringDisjunction = function(e) {
  var t = e.pos;
  if (e.eatChars(
    [92, 113]
    /* \q */
  )) {
    if (e.eat(
      123
      /* { */
    )) {
      var n = this.regexp_classStringDisjunctionContents(e);
      if (e.eat(
        125
        /* } */
      ))
        return n;
    } else
      e.raise("Invalid escape");
    e.pos = t;
  }
  return null;
};
M.regexp_classStringDisjunctionContents = function(e) {
  for (var t = this.regexp_classString(e); e.eat(
    124
    /* | */
  ); )
    this.regexp_classString(e) === Ce && (t = Ce);
  return t;
};
M.regexp_classString = function(e) {
  for (var t = 0; this.regexp_eatClassSetCharacter(e); )
    t++;
  return t === 1 ? He : Ce;
};
M.regexp_eatClassSetCharacter = function(e) {
  var t = e.pos;
  if (e.eat(
    92
    /* \ */
  ))
    return this.regexp_eatCharacterEscape(e) || this.regexp_eatClassSetReservedPunctuator(e) ? !0 : e.eat(
      98
      /* b */
    ) ? (e.lastIntValue = 8, !0) : (e.pos = t, !1);
  var n = e.current();
  return n < 0 || n === e.lookahead() && ol(n) || ll(n) ? !1 : (e.advance(), e.lastIntValue = n, !0);
};
function ol(e) {
  return e === 33 || e >= 35 && e <= 38 || e >= 42 && e <= 44 || e === 46 || e >= 58 && e <= 64 || e === 94 || e === 96 || e === 126;
}
function ll(e) {
  return e === 40 || e === 41 || e === 45 || e === 47 || e >= 91 && e <= 93 || e >= 123 && e <= 125;
}
M.regexp_eatClassSetReservedPunctuator = function(e) {
  var t = e.current();
  return ul(t) ? (e.lastIntValue = t, e.advance(), !0) : !1;
};
function ul(e) {
  return e === 33 || e === 35 || e === 37 || e === 38 || e === 44 || e === 45 || e >= 58 && e <= 62 || e === 64 || e === 96 || e === 126;
}
M.regexp_eatClassControlLetter = function(e) {
  var t = e.current();
  return kn(t) || t === 95 ? (e.lastIntValue = t % 32, e.advance(), !0) : !1;
};
M.regexp_eatHexEscapeSequence = function(e) {
  var t = e.pos;
  if (e.eat(
    120
    /* x */
  )) {
    if (this.regexp_eatFixedHexDigits(e, 2))
      return !0;
    e.switchU && e.raise("Invalid escape"), e.pos = t;
  }
  return !1;
};
M.regexp_eatDecimalDigits = function(e) {
  var t = e.pos, n = 0;
  for (e.lastIntValue = 0; kn(n = e.current()); )
    e.lastIntValue = 10 * e.lastIntValue + (n - 48), e.advance();
  return e.pos !== t;
};
function kn(e) {
  return e >= 48 && e <= 57;
}
M.regexp_eatHexDigits = function(e) {
  var t = e.pos, n = 0;
  for (e.lastIntValue = 0; Fs(n = e.current()); )
    e.lastIntValue = 16 * e.lastIntValue + Ds(n), e.advance();
  return e.pos !== t;
};
function Fs(e) {
  return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
}
function Ds(e) {
  return e >= 65 && e <= 70 ? 10 + (e - 65) : e >= 97 && e <= 102 ? 10 + (e - 97) : e - 48;
}
M.regexp_eatLegacyOctalEscapeSequence = function(e) {
  if (this.regexp_eatOctalDigit(e)) {
    var t = e.lastIntValue;
    if (this.regexp_eatOctalDigit(e)) {
      var n = e.lastIntValue;
      t <= 3 && this.regexp_eatOctalDigit(e) ? e.lastIntValue = t * 64 + n * 8 + e.lastIntValue : e.lastIntValue = t * 8 + n;
    } else
      e.lastIntValue = t;
    return !0;
  }
  return !1;
};
M.regexp_eatOctalDigit = function(e) {
  var t = e.current();
  return Os(t) ? (e.lastIntValue = t - 48, e.advance(), !0) : (e.lastIntValue = 0, !1);
};
function Os(e) {
  return e >= 48 && e <= 55;
}
M.regexp_eatFixedHexDigits = function(e, t) {
  var n = e.pos;
  e.lastIntValue = 0;
  for (var i = 0; i < t; ++i) {
    var r = e.current();
    if (!Fs(r))
      return e.pos = n, !1;
    e.lastIntValue = 16 * e.lastIntValue + Ds(r), e.advance();
  }
  return !0;
};
var vn = function(t) {
  this.type = t.type, this.value = t.value, this.start = t.start, this.end = t.end, t.options.locations && (this.loc = new Bt(t, t.startLoc, t.endLoc)), t.options.ranges && (this.range = [t.start, t.end]);
}, q = ie.prototype;
q.next = function(e) {
  !e && this.type.keyword && this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword), this.options.onToken && this.options.onToken(new vn(this)), this.lastTokEnd = this.end, this.lastTokStart = this.start, this.lastTokEndLoc = this.endLoc, this.lastTokStartLoc = this.startLoc, this.nextToken();
};
q.getToken = function() {
  return this.next(), new vn(this);
};
typeof Symbol < "u" && (q[Symbol.iterator] = function() {
  var e = this;
  return {
    next: function() {
      var t = e.getToken();
      return {
        done: t.type === f.eof,
        value: t
      };
    }
  };
});
q.nextToken = function() {
  var e = this.curContext();
  if ((!e || !e.preserveSpace) && this.skipSpace(), this.start = this.pos, this.options.locations && (this.startLoc = this.curPosition()), this.pos >= this.input.length)
    return this.finishToken(f.eof);
  if (e.override)
    return e.override(this);
  this.readToken(this.fullCharCodeAtPos());
};
q.readToken = function(e) {
  return je(e, this.options.ecmaVersion >= 6) || e === 92 ? this.readWord() : this.getTokenFromCode(e);
};
q.fullCharCodeAtPos = function() {
  var e = this.input.charCodeAt(this.pos);
  if (e <= 55295 || e >= 56320)
    return e;
  var t = this.input.charCodeAt(this.pos + 1);
  return t <= 56319 || t >= 57344 ? e : (e << 10) + t - 56613888;
};
q.skipBlockComment = function() {
  var e = this.options.onComment && this.curPosition(), t = this.pos, n = this.input.indexOf("*/", this.pos += 2);
  if (n === -1 && this.raise(this.pos - 2, "Unterminated comment"), this.pos = n + 2, this.options.locations)
    for (var i = void 0, r = t; (i = as(this.input, r, this.pos)) > -1; )
      ++this.curLine, r = this.lineStart = i;
  this.options.onComment && this.options.onComment(
    !0,
    this.input.slice(t + 2, n),
    t,
    this.pos,
    e,
    this.curPosition()
  );
};
q.skipLineComment = function(e) {
  for (var t = this.pos, n = this.options.onComment && this.curPosition(), i = this.input.charCodeAt(this.pos += e); this.pos < this.input.length && !ot(i); )
    i = this.input.charCodeAt(++this.pos);
  this.options.onComment && this.options.onComment(
    !1,
    this.input.slice(t + e, this.pos),
    t,
    this.pos,
    n,
    this.curPosition()
  );
};
q.skipSpace = function() {
  e: for (; this.pos < this.input.length; ) {
    var e = this.input.charCodeAt(this.pos);
    switch (e) {
      case 32:
      case 160:
        ++this.pos;
        break;
      case 13:
        this.input.charCodeAt(this.pos + 1) === 10 && ++this.pos;
      case 10:
      case 8232:
      case 8233:
        ++this.pos, this.options.locations && (++this.curLine, this.lineStart = this.pos);
        break;
      case 47:
        switch (this.input.charCodeAt(this.pos + 1)) {
          case 42:
            this.skipBlockComment();
            break;
          case 47:
            this.skipLineComment(2);
            break;
          default:
            break e;
        }
        break;
      default:
        if (e > 8 && e < 14 || e >= 5760 && oi.test(String.fromCharCode(e)))
          ++this.pos;
        else
          break e;
    }
  }
};
q.finishToken = function(e, t) {
  this.end = this.pos, this.options.locations && (this.endLoc = this.curPosition());
  var n = this.type;
  this.type = e, this.value = t, this.updateContext(n);
};
q.readToken_dot = function() {
  var e = this.input.charCodeAt(this.pos + 1);
  if (e >= 48 && e <= 57)
    return this.readNumber(!0);
  var t = this.input.charCodeAt(this.pos + 2);
  return this.options.ecmaVersion >= 6 && e === 46 && t === 46 ? (this.pos += 3, this.finishToken(f.ellipsis)) : (++this.pos, this.finishToken(f.dot));
};
q.readToken_slash = function() {
  var e = this.input.charCodeAt(this.pos + 1);
  return this.exprAllowed ? (++this.pos, this.readRegexp()) : e === 61 ? this.finishOp(f.assign, 2) : this.finishOp(f.slash, 1);
};
q.readToken_mult_modulo_exp = function(e) {
  var t = this.input.charCodeAt(this.pos + 1), n = 1, i = e === 42 ? f.star : f.modulo;
  return this.options.ecmaVersion >= 7 && e === 42 && t === 42 && (++n, i = f.starstar, t = this.input.charCodeAt(this.pos + 2)), t === 61 ? this.finishOp(f.assign, n + 1) : this.finishOp(i, n);
};
q.readToken_pipe_amp = function(e) {
  var t = this.input.charCodeAt(this.pos + 1);
  if (t === e) {
    if (this.options.ecmaVersion >= 12) {
      var n = this.input.charCodeAt(this.pos + 2);
      if (n === 61)
        return this.finishOp(f.assign, 3);
    }
    return this.finishOp(e === 124 ? f.logicalOR : f.logicalAND, 2);
  }
  return t === 61 ? this.finishOp(f.assign, 2) : this.finishOp(e === 124 ? f.bitwiseOR : f.bitwiseAND, 1);
};
q.readToken_caret = function() {
  var e = this.input.charCodeAt(this.pos + 1);
  return e === 61 ? this.finishOp(f.assign, 2) : this.finishOp(f.bitwiseXOR, 1);
};
q.readToken_plus_min = function(e) {
  var t = this.input.charCodeAt(this.pos + 1);
  return t === e ? t === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || be.test(this.input.slice(this.lastTokEnd, this.pos))) ? (this.skipLineComment(3), this.skipSpace(), this.nextToken()) : this.finishOp(f.incDec, 2) : t === 61 ? this.finishOp(f.assign, 2) : this.finishOp(f.plusMin, 1);
};
q.readToken_lt_gt = function(e) {
  var t = this.input.charCodeAt(this.pos + 1), n = 1;
  return t === e ? (n = e === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2, this.input.charCodeAt(this.pos + n) === 61 ? this.finishOp(f.assign, n + 1) : this.finishOp(f.bitShift, n)) : t === 33 && e === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45 ? (this.skipLineComment(4), this.skipSpace(), this.nextToken()) : (t === 61 && (n = 2), this.finishOp(f.relational, n));
};
q.readToken_eq_excl = function(e) {
  var t = this.input.charCodeAt(this.pos + 1);
  return t === 61 ? this.finishOp(f.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2) : e === 61 && t === 62 && this.options.ecmaVersion >= 6 ? (this.pos += 2, this.finishToken(f.arrow)) : this.finishOp(e === 61 ? f.eq : f.prefix, 1);
};
q.readToken_question = function() {
  var e = this.options.ecmaVersion;
  if (e >= 11) {
    var t = this.input.charCodeAt(this.pos + 1);
    if (t === 46) {
      var n = this.input.charCodeAt(this.pos + 2);
      if (n < 48 || n > 57)
        return this.finishOp(f.questionDot, 2);
    }
    if (t === 63) {
      if (e >= 12) {
        var i = this.input.charCodeAt(this.pos + 2);
        if (i === 61)
          return this.finishOp(f.assign, 3);
      }
      return this.finishOp(f.coalesce, 2);
    }
  }
  return this.finishOp(f.question, 1);
};
q.readToken_numberSign = function() {
  var e = this.options.ecmaVersion, t = 35;
  if (e >= 13 && (++this.pos, t = this.fullCharCodeAtPos(), je(t, !0) || t === 92))
    return this.finishToken(f.privateId, this.readWord1());
  this.raise(this.pos, "Unexpected character '" + et(t) + "'");
};
q.getTokenFromCode = function(e) {
  switch (e) {
    case 46:
      return this.readToken_dot();
    case 40:
      return ++this.pos, this.finishToken(f.parenL);
    case 41:
      return ++this.pos, this.finishToken(f.parenR);
    case 59:
      return ++this.pos, this.finishToken(f.semi);
    case 44:
      return ++this.pos, this.finishToken(f.comma);
    case 91:
      return ++this.pos, this.finishToken(f.bracketL);
    case 93:
      return ++this.pos, this.finishToken(f.bracketR);
    case 123:
      return ++this.pos, this.finishToken(f.braceL);
    case 125:
      return ++this.pos, this.finishToken(f.braceR);
    case 58:
      return ++this.pos, this.finishToken(f.colon);
    case 96:
      if (this.options.ecmaVersion < 6)
        break;
      return ++this.pos, this.finishToken(f.backQuote);
    case 48:
      var t = this.input.charCodeAt(this.pos + 1);
      if (t === 120 || t === 88)
        return this.readRadixNumber(16);
      if (this.options.ecmaVersion >= 6) {
        if (t === 111 || t === 79)
          return this.readRadixNumber(8);
        if (t === 98 || t === 66)
          return this.readRadixNumber(2);
      }
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      return this.readNumber(!1);
    case 34:
    case 39:
      return this.readString(e);
    case 47:
      return this.readToken_slash();
    case 37:
    case 42:
      return this.readToken_mult_modulo_exp(e);
    case 124:
    case 38:
      return this.readToken_pipe_amp(e);
    case 94:
      return this.readToken_caret();
    case 43:
    case 45:
      return this.readToken_plus_min(e);
    case 60:
    case 62:
      return this.readToken_lt_gt(e);
    case 61:
    case 33:
      return this.readToken_eq_excl(e);
    case 63:
      return this.readToken_question();
    case 126:
      return this.finishOp(f.prefix, 1);
    case 35:
      return this.readToken_numberSign();
  }
  this.raise(this.pos, "Unexpected character '" + et(e) + "'");
};
q.finishOp = function(e, t) {
  var n = this.input.slice(this.pos, this.pos + t);
  return this.pos += t, this.finishToken(e, n);
};
q.readRegexp = function() {
  for (var e, t, n = this.pos; ; ) {
    this.pos >= this.input.length && this.raise(n, "Unterminated regular expression");
    var i = this.input.charAt(this.pos);
    if (be.test(i) && this.raise(n, "Unterminated regular expression"), e)
      e = !1;
    else {
      if (i === "[")
        t = !0;
      else if (i === "]" && t)
        t = !1;
      else if (i === "/" && !t)
        break;
      e = i === "\\";
    }
    ++this.pos;
  }
  var r = this.input.slice(n, this.pos);
  ++this.pos;
  var s = this.pos, a = this.readWord1();
  this.containsEsc && this.unexpected(s);
  var o = this.regexpState || (this.regexpState = new Be(this));
  o.reset(n, r, a), this.validateRegExpFlags(o), this.validateRegExpPattern(o);
  var l = null;
  try {
    l = new RegExp(r, a);
  } catch {
  }
  return this.finishToken(f.regexp, { pattern: r, flags: a, value: l });
};
q.readInt = function(e, t, n) {
  for (var i = this.options.ecmaVersion >= 12 && t === void 0, r = n && this.input.charCodeAt(this.pos) === 48, s = this.pos, a = 0, o = 0, l = 0, u = t ?? 1 / 0; l < u; ++l, ++this.pos) {
    var c = this.input.charCodeAt(this.pos), p = void 0;
    if (i && c === 95) {
      r && this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals"), o === 95 && this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore"), l === 0 && this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits"), o = c;
      continue;
    }
    if (c >= 97 ? p = c - 97 + 10 : c >= 65 ? p = c - 65 + 10 : c >= 48 && c <= 57 ? p = c - 48 : p = 1 / 0, p >= e)
      break;
    o = c, a = a * e + p;
  }
  return i && o === 95 && this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits"), this.pos === s || t != null && this.pos - s !== t ? null : a;
};
function cl(e, t) {
  return t ? parseInt(e, 8) : parseFloat(e.replace(/_/g, ""));
}
function Ms(e) {
  return typeof BigInt != "function" ? null : BigInt(e.replace(/_/g, ""));
}
q.readRadixNumber = function(e) {
  var t = this.pos;
  this.pos += 2;
  var n = this.readInt(e);
  return n == null && this.raise(this.start + 2, "Expected number in radix " + e), this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110 ? (n = Ms(this.input.slice(t, this.pos)), ++this.pos) : je(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(f.num, n);
};
q.readNumber = function(e) {
  var t = this.pos;
  !e && this.readInt(10, void 0, !0) === null && this.raise(t, "Invalid number");
  var n = this.pos - t >= 2 && this.input.charCodeAt(t) === 48;
  n && this.strict && this.raise(t, "Invalid number");
  var i = this.input.charCodeAt(this.pos);
  if (!n && !e && this.options.ecmaVersion >= 11 && i === 110) {
    var r = Ms(this.input.slice(t, this.pos));
    return ++this.pos, je(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(f.num, r);
  }
  n && /[89]/.test(this.input.slice(t, this.pos)) && (n = !1), i === 46 && !n && (++this.pos, this.readInt(10), i = this.input.charCodeAt(this.pos)), (i === 69 || i === 101) && !n && (i = this.input.charCodeAt(++this.pos), (i === 43 || i === 45) && ++this.pos, this.readInt(10) === null && this.raise(t, "Invalid number")), je(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number");
  var s = cl(this.input.slice(t, this.pos), n);
  return this.finishToken(f.num, s);
};
q.readCodePoint = function() {
  var e = this.input.charCodeAt(this.pos), t;
  if (e === 123) {
    this.options.ecmaVersion < 6 && this.unexpected();
    var n = ++this.pos;
    t = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos), ++this.pos, t > 1114111 && this.invalidStringToken(n, "Code point out of bounds");
  } else
    t = this.readHexChar(4);
  return t;
};
q.readString = function(e) {
  for (var t = "", n = ++this.pos; ; ) {
    this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
    var i = this.input.charCodeAt(this.pos);
    if (i === e)
      break;
    i === 92 ? (t += this.input.slice(n, this.pos), t += this.readEscapedChar(!1), n = this.pos) : i === 8232 || i === 8233 ? (this.options.ecmaVersion < 10 && this.raise(this.start, "Unterminated string constant"), ++this.pos, this.options.locations && (this.curLine++, this.lineStart = this.pos)) : (ot(i) && this.raise(this.start, "Unterminated string constant"), ++this.pos);
  }
  return t += this.input.slice(n, this.pos++), this.finishToken(f.string, t);
};
var Rs = {};
q.tryReadTemplateToken = function() {
  this.inTemplateElement = !0;
  try {
    this.readTmplToken();
  } catch (e) {
    if (e === Rs)
      this.readInvalidTemplateToken();
    else
      throw e;
  }
  this.inTemplateElement = !1;
};
q.invalidStringToken = function(e, t) {
  if (this.inTemplateElement && this.options.ecmaVersion >= 9)
    throw Rs;
  this.raise(e, t);
};
q.readTmplToken = function() {
  for (var e = "", t = this.pos; ; ) {
    this.pos >= this.input.length && this.raise(this.start, "Unterminated template");
    var n = this.input.charCodeAt(this.pos);
    if (n === 96 || n === 36 && this.input.charCodeAt(this.pos + 1) === 123)
      return this.pos === this.start && (this.type === f.template || this.type === f.invalidTemplate) ? n === 36 ? (this.pos += 2, this.finishToken(f.dollarBraceL)) : (++this.pos, this.finishToken(f.backQuote)) : (e += this.input.slice(t, this.pos), this.finishToken(f.template, e));
    if (n === 92)
      e += this.input.slice(t, this.pos), e += this.readEscapedChar(!0), t = this.pos;
    else if (ot(n)) {
      switch (e += this.input.slice(t, this.pos), ++this.pos, n) {
        case 13:
          this.input.charCodeAt(this.pos) === 10 && ++this.pos;
        case 10:
          e += `
`;
          break;
        default:
          e += String.fromCharCode(n);
          break;
      }
      this.options.locations && (++this.curLine, this.lineStart = this.pos), t = this.pos;
    } else
      ++this.pos;
  }
};
q.readInvalidTemplateToken = function() {
  for (; this.pos < this.input.length; this.pos++)
    switch (this.input[this.pos]) {
      case "\\":
        ++this.pos;
        break;
      case "$":
        if (this.input[this.pos + 1] !== "{")
          break;
      case "`":
        return this.finishToken(f.invalidTemplate, this.input.slice(this.start, this.pos));
      case "\r":
        this.input[this.pos + 1] === `
` && ++this.pos;
      case `
`:
      case "\u2028":
      case "\u2029":
        ++this.curLine, this.lineStart = this.pos + 1;
        break;
    }
  this.raise(this.start, "Unterminated template");
};
q.readEscapedChar = function(e) {
  var t = this.input.charCodeAt(++this.pos);
  switch (++this.pos, t) {
    case 110:
      return `
`;
    case 114:
      return "\r";
    case 120:
      return String.fromCharCode(this.readHexChar(2));
    case 117:
      return et(this.readCodePoint());
    case 116:
      return "	";
    case 98:
      return "\b";
    case 118:
      return "\v";
    case 102:
      return "\f";
    case 13:
      this.input.charCodeAt(this.pos) === 10 && ++this.pos;
    case 10:
      return this.options.locations && (this.lineStart = this.pos, ++this.curLine), "";
    case 56:
    case 57:
      if (this.strict && this.invalidStringToken(
        this.pos - 1,
        "Invalid escape sequence"
      ), e) {
        var n = this.pos - 1;
        this.invalidStringToken(
          n,
          "Invalid escape sequence in template string"
        );
      }
    default:
      if (t >= 48 && t <= 55) {
        var i = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0], r = parseInt(i, 8);
        return r > 255 && (i = i.slice(0, -1), r = parseInt(i, 8)), this.pos += i.length - 1, t = this.input.charCodeAt(this.pos), (i !== "0" || t === 56 || t === 57) && (this.strict || e) && this.invalidStringToken(
          this.pos - 1 - i.length,
          e ? "Octal literal in template string" : "Octal literal in strict mode"
        ), String.fromCharCode(r);
      }
      return ot(t) ? (this.options.locations && (this.lineStart = this.pos, ++this.curLine), "") : String.fromCharCode(t);
  }
};
q.readHexChar = function(e) {
  var t = this.pos, n = this.readInt(16, e);
  return n === null && this.invalidStringToken(t, "Bad character escape sequence"), n;
};
q.readWord1 = function() {
  this.containsEsc = !1;
  for (var e = "", t = !0, n = this.pos, i = this.options.ecmaVersion >= 6; this.pos < this.input.length; ) {
    var r = this.fullCharCodeAtPos();
    if (at(r, i))
      this.pos += r <= 65535 ? 1 : 2;
    else if (r === 92) {
      this.containsEsc = !0, e += this.input.slice(n, this.pos);
      var s = this.pos;
      this.input.charCodeAt(++this.pos) !== 117 && this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX"), ++this.pos;
      var a = this.readCodePoint();
      (t ? je : at)(a, i) || this.invalidStringToken(s, "Invalid Unicode escape"), e += et(a), n = this.pos;
    } else
      break;
    t = !1;
  }
  return e + this.input.slice(n, this.pos);
};
q.readWord = function() {
  var e = this.readWord1(), t = f.name;
  return this.keywords.test(e) && (t = bn[e]), this.finishToken(t, e);
};
var js = "8.12.1";
ie.acorn = {
  Parser: ie,
  version: js,
  defaultOptions: ln,
  Position: kt,
  SourceLocation: Bt,
  getLineInfo: li,
  Node: zt,
  TokenType: W,
  tokTypes: f,
  keywordTypes: bn,
  TokContext: ve,
  tokContexts: ee,
  isIdentifierChar: at,
  isIdentifierStart: je,
  Token: vn,
  isNewLine: ot,
  lineBreak: be,
  lineBreakG: ss,
  nonASCIIwhitespace: oi
};
function pl(e, t) {
  return ie.parse(e, t);
}
function hl(e, t, n) {
  return ie.parseExpressionAt(e, t, n);
}
function fl(e, t) {
  return ie.tokenizer(e, t);
}
const ml = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Node: zt,
  Parser: ie,
  Position: kt,
  SourceLocation: Bt,
  TokContext: ve,
  Token: vn,
  TokenType: W,
  defaultOptions: ln,
  getLineInfo: li,
  isIdentifierChar: at,
  isIdentifierStart: je,
  isNewLine: ot,
  keywordTypes: bn,
  lineBreak: be,
  lineBreakG: ss,
  nonASCIIwhitespace: oi,
  parse: pl,
  parseExpressionAt: hl,
  tokContexts: ee,
  tokTypes: f,
  tokenizer: fl,
  version: js
}, Symbol.toStringTag, { value: "Module" }));
function di(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function dl(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function i() {
      return this instanceof i ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(i) {
    var r = Object.getOwnPropertyDescriptor(e, i);
    Object.defineProperty(n, i, r.get ? r : {
      enumerable: !0,
      get: function() {
        return e[i];
      }
    });
  }), n;
}
var Vs = { exports: {} }, xl = {
  quot: '"',
  amp: "&",
  apos: "'",
  lt: "<",
  gt: ">",
  nbsp: " ",
  iexcl: "¡",
  cent: "¢",
  pound: "£",
  curren: "¤",
  yen: "¥",
  brvbar: "¦",
  sect: "§",
  uml: "¨",
  copy: "©",
  ordf: "ª",
  laquo: "«",
  not: "¬",
  shy: "­",
  reg: "®",
  macr: "¯",
  deg: "°",
  plusmn: "±",
  sup2: "²",
  sup3: "³",
  acute: "´",
  micro: "µ",
  para: "¶",
  middot: "·",
  cedil: "¸",
  sup1: "¹",
  ordm: "º",
  raquo: "»",
  frac14: "¼",
  frac12: "½",
  frac34: "¾",
  iquest: "¿",
  Agrave: "À",
  Aacute: "Á",
  Acirc: "Â",
  Atilde: "Ã",
  Auml: "Ä",
  Aring: "Å",
  AElig: "Æ",
  Ccedil: "Ç",
  Egrave: "È",
  Eacute: "É",
  Ecirc: "Ê",
  Euml: "Ë",
  Igrave: "Ì",
  Iacute: "Í",
  Icirc: "Î",
  Iuml: "Ï",
  ETH: "Ð",
  Ntilde: "Ñ",
  Ograve: "Ò",
  Oacute: "Ó",
  Ocirc: "Ô",
  Otilde: "Õ",
  Ouml: "Ö",
  times: "×",
  Oslash: "Ø",
  Ugrave: "Ù",
  Uacute: "Ú",
  Ucirc: "Û",
  Uuml: "Ü",
  Yacute: "Ý",
  THORN: "Þ",
  szlig: "ß",
  agrave: "à",
  aacute: "á",
  acirc: "â",
  atilde: "ã",
  auml: "ä",
  aring: "å",
  aelig: "æ",
  ccedil: "ç",
  egrave: "è",
  eacute: "é",
  ecirc: "ê",
  euml: "ë",
  igrave: "ì",
  iacute: "í",
  icirc: "î",
  iuml: "ï",
  eth: "ð",
  ntilde: "ñ",
  ograve: "ò",
  oacute: "ó",
  ocirc: "ô",
  otilde: "õ",
  ouml: "ö",
  divide: "÷",
  oslash: "ø",
  ugrave: "ù",
  uacute: "ú",
  ucirc: "û",
  uuml: "ü",
  yacute: "ý",
  thorn: "þ",
  yuml: "ÿ",
  OElig: "Œ",
  oelig: "œ",
  Scaron: "Š",
  scaron: "š",
  Yuml: "Ÿ",
  fnof: "ƒ",
  circ: "ˆ",
  tilde: "˜",
  Alpha: "Α",
  Beta: "Β",
  Gamma: "Γ",
  Delta: "Δ",
  Epsilon: "Ε",
  Zeta: "Ζ",
  Eta: "Η",
  Theta: "Θ",
  Iota: "Ι",
  Kappa: "Κ",
  Lambda: "Λ",
  Mu: "Μ",
  Nu: "Ν",
  Xi: "Ξ",
  Omicron: "Ο",
  Pi: "Π",
  Rho: "Ρ",
  Sigma: "Σ",
  Tau: "Τ",
  Upsilon: "Υ",
  Phi: "Φ",
  Chi: "Χ",
  Psi: "Ψ",
  Omega: "Ω",
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  zeta: "ζ",
  eta: "η",
  theta: "θ",
  iota: "ι",
  kappa: "κ",
  lambda: "λ",
  mu: "μ",
  nu: "ν",
  xi: "ξ",
  omicron: "ο",
  pi: "π",
  rho: "ρ",
  sigmaf: "ς",
  sigma: "σ",
  tau: "τ",
  upsilon: "υ",
  phi: "φ",
  chi: "χ",
  psi: "ψ",
  omega: "ω",
  thetasym: "ϑ",
  upsih: "ϒ",
  piv: "ϖ",
  ensp: " ",
  emsp: " ",
  thinsp: " ",
  zwnj: "‌",
  zwj: "‍",
  lrm: "‎",
  rlm: "‏",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  sbquo: "‚",
  ldquo: "“",
  rdquo: "”",
  bdquo: "„",
  dagger: "†",
  Dagger: "‡",
  bull: "•",
  hellip: "…",
  permil: "‰",
  prime: "′",
  Prime: "″",
  lsaquo: "‹",
  rsaquo: "›",
  oline: "‾",
  frasl: "⁄",
  euro: "€",
  image: "ℑ",
  weierp: "℘",
  real: "ℜ",
  trade: "™",
  alefsym: "ℵ",
  larr: "←",
  uarr: "↑",
  rarr: "→",
  darr: "↓",
  harr: "↔",
  crarr: "↵",
  lArr: "⇐",
  uArr: "⇑",
  rArr: "⇒",
  dArr: "⇓",
  hArr: "⇔",
  forall: "∀",
  part: "∂",
  exist: "∃",
  empty: "∅",
  nabla: "∇",
  isin: "∈",
  notin: "∉",
  ni: "∋",
  prod: "∏",
  sum: "∑",
  minus: "−",
  lowast: "∗",
  radic: "√",
  prop: "∝",
  infin: "∞",
  ang: "∠",
  and: "∧",
  or: "∨",
  cap: "∩",
  cup: "∪",
  int: "∫",
  there4: "∴",
  sim: "∼",
  cong: "≅",
  asymp: "≈",
  ne: "≠",
  equiv: "≡",
  le: "≤",
  ge: "≥",
  sub: "⊂",
  sup: "⊃",
  nsub: "⊄",
  sube: "⊆",
  supe: "⊇",
  oplus: "⊕",
  otimes: "⊗",
  perp: "⊥",
  sdot: "⋅",
  lceil: "⌈",
  rceil: "⌉",
  lfloor: "⌊",
  rfloor: "⌋",
  lang: "〈",
  rang: "〉",
  loz: "◊",
  spades: "♠",
  clubs: "♣",
  hearts: "♥",
  diams: "♦"
};
const qi = /* @__PURE__ */ dl(ml);
(function(e) {
  const t = xl, n = /^[\da-fA-F]+$/, i = /^\d+$/, r = /* @__PURE__ */ new WeakMap();
  function s(l) {
    l = l.Parser.acorn || l;
    let u = r.get(l);
    if (!u) {
      const c = l.tokTypes, p = l.TokContext, m = l.TokenType, h = new p("<tag", !1), v = new p("</tag", !1), b = new p("<tag>...</tag>", !0, !0), I = {
        tc_oTag: h,
        tc_cTag: v,
        tc_expr: b
      }, y = {
        jsxName: new m("jsxName"),
        jsxText: new m("jsxText", { beforeExpr: !0 }),
        jsxTagStart: new m("jsxTagStart", { startsExpr: !0 }),
        jsxTagEnd: new m("jsxTagEnd")
      };
      y.jsxTagStart.updateContext = function() {
        this.context.push(b), this.context.push(h), this.exprAllowed = !1;
      }, y.jsxTagEnd.updateContext = function(A) {
        let E = this.context.pop();
        E === h && A === c.slash || E === v ? (this.context.pop(), this.exprAllowed = this.curContext() === b) : this.exprAllowed = !0;
      }, u = { tokContexts: I, tokTypes: y }, r.set(l, u);
    }
    return u;
  }
  function a(l) {
    if (!l)
      return l;
    if (l.type === "JSXIdentifier")
      return l.name;
    if (l.type === "JSXNamespacedName")
      return l.namespace.name + ":" + l.name.name;
    if (l.type === "JSXMemberExpression")
      return a(l.object) + "." + a(l.property);
  }
  e.exports = function(l) {
    return l = l || {}, function(u) {
      return o({
        allowNamespaces: l.allowNamespaces !== !1,
        allowNamespacedObjects: !!l.allowNamespacedObjects
      }, u);
    };
  }, Object.defineProperty(e.exports, "tokTypes", {
    get: function() {
      return s(qi).tokTypes;
    },
    configurable: !0,
    enumerable: !0
  });
  function o(l, u) {
    const c = u.acorn || qi, p = s(c), m = c.tokTypes, h = p.tokTypes, v = c.tokContexts, b = p.tokContexts.tc_oTag, I = p.tokContexts.tc_cTag, y = p.tokContexts.tc_expr, A = c.isNewLine, E = c.isIdentifierStart, T = c.isIdentifierChar;
    return class extends u {
      // Expose actual `tokTypes` and `tokContexts` to other plugins.
      static get acornJsx() {
        return p;
      }
      // Reads inline JSX contents token.
      jsx_readToken() {
        let S = "", x = this.pos;
        for (; ; ) {
          this.pos >= this.input.length && this.raise(this.start, "Unterminated JSX contents");
          let g = this.input.charCodeAt(this.pos);
          switch (g) {
            case 60:
            case 123:
              return this.pos === this.start ? g === 60 && this.exprAllowed ? (++this.pos, this.finishToken(h.jsxTagStart)) : this.getTokenFromCode(g) : (S += this.input.slice(x, this.pos), this.finishToken(h.jsxText, S));
            case 38:
              S += this.input.slice(x, this.pos), S += this.jsx_readEntity(), x = this.pos;
              break;
            case 62:
            case 125:
              this.raise(
                this.pos,
                "Unexpected token `" + this.input[this.pos] + "`. Did you mean `" + (g === 62 ? "&gt;" : "&rbrace;") + '` or `{"' + this.input[this.pos] + '"}`?'
              );
            default:
              A(g) ? (S += this.input.slice(x, this.pos), S += this.jsx_readNewLine(!0), x = this.pos) : ++this.pos;
          }
        }
      }
      jsx_readNewLine(S) {
        let x = this.input.charCodeAt(this.pos), g;
        return ++this.pos, x === 13 && this.input.charCodeAt(this.pos) === 10 ? (++this.pos, g = S ? `
` : `\r
`) : g = String.fromCharCode(x), this.options.locations && (++this.curLine, this.lineStart = this.pos), g;
      }
      jsx_readString(S) {
        let x = "", g = ++this.pos;
        for (; ; ) {
          this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
          let C = this.input.charCodeAt(this.pos);
          if (C === S) break;
          C === 38 ? (x += this.input.slice(g, this.pos), x += this.jsx_readEntity(), g = this.pos) : A(C) ? (x += this.input.slice(g, this.pos), x += this.jsx_readNewLine(!1), g = this.pos) : ++this.pos;
        }
        return x += this.input.slice(g, this.pos++), this.finishToken(m.string, x);
      }
      jsx_readEntity() {
        let S = "", x = 0, g, C = this.input[this.pos];
        C !== "&" && this.raise(this.pos, "Entity must start with an ampersand");
        let P = ++this.pos;
        for (; this.pos < this.input.length && x++ < 10; ) {
          if (C = this.input[this.pos++], C === ";") {
            S[0] === "#" ? S[1] === "x" ? (S = S.substr(2), n.test(S) && (g = String.fromCharCode(parseInt(S, 16)))) : (S = S.substr(1), i.test(S) && (g = String.fromCharCode(parseInt(S, 10)))) : g = t[S];
            break;
          }
          S += C;
        }
        return g || (this.pos = P, "&");
      }
      // Read a JSX identifier (valid tag or attribute name).
      //
      // Optimized version since JSX identifiers can't contain
      // escape characters and so can be read as single slice.
      // Also assumes that first character was already checked
      // by isIdentifierStart in readToken.
      jsx_readWord() {
        let S, x = this.pos;
        do
          S = this.input.charCodeAt(++this.pos);
        while (T(S) || S === 45);
        return this.finishToken(h.jsxName, this.input.slice(x, this.pos));
      }
      // Parse next token as JSX identifier
      jsx_parseIdentifier() {
        let S = this.startNode();
        return this.type === h.jsxName ? S.name = this.value : this.type.keyword ? S.name = this.type.keyword : this.unexpected(), this.next(), this.finishNode(S, "JSXIdentifier");
      }
      // Parse namespaced identifier.
      jsx_parseNamespacedName() {
        let S = this.start, x = this.startLoc, g = this.jsx_parseIdentifier();
        if (!l.allowNamespaces || !this.eat(m.colon)) return g;
        var C = this.startNodeAt(S, x);
        return C.namespace = g, C.name = this.jsx_parseIdentifier(), this.finishNode(C, "JSXNamespacedName");
      }
      // Parses element name in any form - namespaced, member
      // or single identifier.
      jsx_parseElementName() {
        if (this.type === h.jsxTagEnd) return "";
        let S = this.start, x = this.startLoc, g = this.jsx_parseNamespacedName();
        for (this.type === m.dot && g.type === "JSXNamespacedName" && !l.allowNamespacedObjects && this.unexpected(); this.eat(m.dot); ) {
          let C = this.startNodeAt(S, x);
          C.object = g, C.property = this.jsx_parseIdentifier(), g = this.finishNode(C, "JSXMemberExpression");
        }
        return g;
      }
      // Parses any type of JSX attribute value.
      jsx_parseAttributeValue() {
        switch (this.type) {
          case m.braceL:
            let S = this.jsx_parseExpressionContainer();
            return S.expression.type === "JSXEmptyExpression" && this.raise(S.start, "JSX attributes must only be assigned a non-empty expression"), S;
          case h.jsxTagStart:
          case m.string:
            return this.parseExprAtom();
          default:
            this.raise(this.start, "JSX value should be either an expression or a quoted JSX text");
        }
      }
      // JSXEmptyExpression is unique type since it doesn't actually parse anything,
      // and so it should start at the end of last read token (left brace) and finish
      // at the beginning of the next one (right brace).
      jsx_parseEmptyExpression() {
        let S = this.startNodeAt(this.lastTokEnd, this.lastTokEndLoc);
        return this.finishNodeAt(S, "JSXEmptyExpression", this.start, this.startLoc);
      }
      // Parses JSX expression enclosed into curly brackets.
      jsx_parseExpressionContainer() {
        let S = this.startNode();
        return this.next(), S.expression = this.type === m.braceR ? this.jsx_parseEmptyExpression() : this.parseExpression(), this.expect(m.braceR), this.finishNode(S, "JSXExpressionContainer");
      }
      // Parses following JSX attribute name-value pair.
      jsx_parseAttribute() {
        let S = this.startNode();
        return this.eat(m.braceL) ? (this.expect(m.ellipsis), S.argument = this.parseMaybeAssign(), this.expect(m.braceR), this.finishNode(S, "JSXSpreadAttribute")) : (S.name = this.jsx_parseNamespacedName(), S.value = this.eat(m.eq) ? this.jsx_parseAttributeValue() : null, this.finishNode(S, "JSXAttribute"));
      }
      // Parses JSX opening tag starting after '<'.
      jsx_parseOpeningElementAt(S, x) {
        let g = this.startNodeAt(S, x);
        g.attributes = [];
        let C = this.jsx_parseElementName();
        for (C && (g.name = C); this.type !== m.slash && this.type !== h.jsxTagEnd; )
          g.attributes.push(this.jsx_parseAttribute());
        return g.selfClosing = this.eat(m.slash), this.expect(h.jsxTagEnd), this.finishNode(g, C ? "JSXOpeningElement" : "JSXOpeningFragment");
      }
      // Parses JSX closing tag starting after '</'.
      jsx_parseClosingElementAt(S, x) {
        let g = this.startNodeAt(S, x), C = this.jsx_parseElementName();
        return C && (g.name = C), this.expect(h.jsxTagEnd), this.finishNode(g, C ? "JSXClosingElement" : "JSXClosingFragment");
      }
      // Parses entire JSX element, including it's opening tag
      // (starting after '<'), attributes, contents and closing tag.
      jsx_parseElementAt(S, x) {
        let g = this.startNodeAt(S, x), C = [], P = this.jsx_parseOpeningElementAt(S, x), O = null;
        if (!P.selfClosing) {
          e: for (; ; )
            switch (this.type) {
              case h.jsxTagStart:
                if (S = this.start, x = this.startLoc, this.next(), this.eat(m.slash)) {
                  O = this.jsx_parseClosingElementAt(S, x);
                  break e;
                }
                C.push(this.jsx_parseElementAt(S, x));
                break;
              case h.jsxText:
                C.push(this.parseExprAtom());
                break;
              case m.braceL:
                C.push(this.jsx_parseExpressionContainer());
                break;
              default:
                this.unexpected();
            }
          a(O.name) !== a(P.name) && this.raise(
            O.start,
            "Expected corresponding JSX closing tag for <" + a(P.name) + ">"
          );
        }
        let D = P.name ? "Element" : "Fragment";
        return g["opening" + D] = P, g["closing" + D] = O, g.children = C, this.type === m.relational && this.value === "<" && this.raise(this.start, "Adjacent JSX elements must be wrapped in an enclosing tag"), this.finishNode(g, "JSX" + D);
      }
      // Parse JSX text
      jsx_parseText() {
        let S = this.parseLiteral(this.value);
        return S.type = "JSXText", S;
      }
      // Parses entire JSX element from current position.
      jsx_parseElement() {
        let S = this.start, x = this.startLoc;
        return this.next(), this.jsx_parseElementAt(S, x);
      }
      parseExprAtom(S) {
        return this.type === h.jsxText ? this.jsx_parseText() : this.type === h.jsxTagStart ? this.jsx_parseElement() : super.parseExprAtom(S);
      }
      readToken(S) {
        let x = this.curContext();
        if (x === y) return this.jsx_readToken();
        if (x === b || x === I) {
          if (E(S)) return this.jsx_readWord();
          if (S == 62)
            return ++this.pos, this.finishToken(h.jsxTagEnd);
          if ((S === 34 || S === 39) && x == b)
            return this.jsx_readString(S);
        }
        return S === 60 && this.exprAllowed && this.input.charCodeAt(this.pos + 1) !== 33 ? (++this.pos, this.finishToken(h.jsxTagStart)) : super.readToken(S);
      }
      updateContext(S) {
        if (this.type == m.braceL) {
          var x = this.curContext();
          x == b ? this.context.push(v.b_expr) : x == y ? this.context.push(v.b_tmpl) : super.updateContext(S), this.exprAllowed = !0;
        } else if (this.type === m.slash && S === h.jsxTagStart)
          this.context.length -= 2, this.context.push(I), this.exprAllowed = !1;
        else
          return super.updateContext(S);
      }
    };
  }
})(Vs);
var gl = Vs.exports;
const yl = /* @__PURE__ */ di(gl), Fe = nt(/[A-Za-z]/), ye = nt(/[\dA-Za-z]/), bl = nt(/[#-'*+\--9=?A-Z^-~]/);
function Kn(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const Zn = nt(/\d/), wl = nt(/[\dA-Fa-f]/), kl = nt(/[!-/:-@[-`{-~]/);
function R(e) {
  return e !== null && e < -2;
}
function re(e) {
  return e !== null && (e < 0 || e === 32);
}
function X(e) {
  return e === -2 || e === -1 || e === 32;
}
const vl = nt(new RegExp("\\p{P}|\\p{S}", "u")), Xe = nt(/\s/);
function nt(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function Y(e, t, n, i) {
  const r = i ? i - 1 : Number.POSITIVE_INFINITY;
  let s = 0;
  return a;
  function a(l) {
    return X(l) ? (e.enter(n), o(l)) : t(l);
  }
  function o(l) {
    return X(l) && s++ < r ? (e.consume(l), o) : (e.exit(n), t(l));
  }
}
const Sl = {}.hasOwnProperty, El = Symbol("continue"), Dn = Symbol("exit"), Cl = Symbol("skip");
function Il(e, t) {
  let n, i;
  typeof t == "function" ? n = t : t && typeof t == "object" && (t.enter && (n = t.enter), t.leave && (i = t.leave)), r(e, void 0, void 0, [])();
  function r(s, a, o, l) {
    return On(s) && (u.displayName = "node (" + s.type + ")"), u;
    function u() {
      const c = n ? Hi(n(s, a, o, l)) : [];
      if (c[0] === Dn)
        return c;
      if (c[0] !== Cl) {
        let p;
        for (p in s)
          if (Sl.call(s, p) && s[p] && typeof s[p] == "object" && // @ts-expect-error: custom esast extension.
          p !== "data" && // @ts-expect-error: custom esast extension.
          p !== "position") {
            const m = l.concat(s), h = s[p];
            if (Array.isArray(h)) {
              const v = (
                /** @type {Array<unknown>} */
                h
              );
              let b = 0;
              for (; b > -1 && b < v.length; ) {
                const I = v[b];
                if (On(I)) {
                  const y = r(
                    I,
                    p,
                    b,
                    m
                  )();
                  if (y[0] === Dn) return y;
                  b = typeof y[1] == "number" ? y[1] : b + 1;
                } else
                  b++;
              }
            } else if (On(h)) {
              const v = r(h, p, void 0, m)();
              if (v[0] === Dn) return v;
            }
          }
      }
      return i ? Hi(i(s, a, o, l)) : c;
    }
  }
}
function Hi(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [El, e] : [e];
}
function On(e) {
  return !!(e && typeof e == "object" && "type" in e && typeof e.type == "string" && e.type.length > 0);
}
function Bs(e, t) {
  const n = t.prefix || "", i = t.suffix || "", r = Object.assign({}, t.acornOptions), s = [], a = [], o = r.onComment, l = r.onToken;
  let u = !1, c, p;
  const m = Object.assign({}, r, {
    onComment: s,
    preserveParens: !0
  });
  l && (m.onToken = a);
  const h = Al(e, t.tokenTypes), v = h.value, b = n + v + i, I = t.expression && $i(v);
  if (I && !t.allowEmpty)
    throw new G("Unexpected empty expression", {
      place: A(0),
      ruleId: "unexpected-empty-expression",
      source: "micromark-extension-mdx-expression"
    });
  try {
    c = t.expression && !I ? t.acorn.parseExpressionAt(b, 0, m) : t.acorn.parse(b, m);
  } catch (E) {
    const T = (
      /** @type {AcornError} */
      E
    ), S = A(T.pos);
    T.message = String(T.message).replace(/ \(\d+:\d+\)$/, ""), T.pos = S.offset, T.loc = {
      line: S.line,
      column: S.column - 1
    }, p = T, u = T.raisedAt >= n.length + v.length || // Broken comments are raised at their start, not their end.
    T.message === "Unterminated comment";
  }
  if (c && t.expression && !I)
    if ($i(b.slice(c.end, b.length - i.length)))
      c = {
        type: "Program",
        start: 0,
        end: n.length + v.length,
        // @ts-expect-error: It’s good.
        body: [{
          type: "ExpressionStatement",
          expression: c,
          start: 0,
          end: n.length + v.length
        }],
        sourceType: "module",
        comments: []
      };
    else {
      const E = A(c.end), T = (
        /** @type {AcornError} */
        new Error("Unexpected content after expression")
      );
      T.pos = E.offset, T.loc = {
        line: E.line,
        column: E.column - 1
      }, p = T, c = void 0;
    }
  if (c) {
    if (c.comments = s, Il(c, function(E, T, S, x) {
      let g = (
        /** @type {AcornNode | Array<AcornNode>} */
        x[x.length - 1]
      ), C = T;
      E.type === "ParenthesizedExpression" && g && C && (typeof S == "number" && (g = g[C], C = S), g[C] = E.expression), y(E);
    }), Array.isArray(o))
      o.push(...s);
    else if (typeof o == "function")
      for (const E of s)
        o(E.type === "Block", E.value, E.start, E.end, E.loc.start, E.loc.end);
    for (const E of a)
      E.end <= n.length || E.start - n.length >= v.length || (y(E), Array.isArray(l) ? l.push(E) : l(E));
  }
  return {
    estree: c,
    error: p,
    swallow: u
  };
  function y(E) {
    const T = A(E.start), S = A(E.end);
    E.start = T.offset, E.end = S.offset, E.loc = {
      start: {
        line: T.line,
        column: T.column - 1,
        offset: T.offset
      },
      end: {
        line: S.line,
        column: S.column - 1,
        offset: S.offset
      }
    }, E.range = [E.start, E.end];
  }
  function A(E) {
    let T = E - n.length;
    T < 0 ? T = 0 : T > v.length && (T = v.length);
    let S = _l(h.stops, T);
    return S || (S = {
      line: t.start.line,
      column: t.start.column,
      offset: t.start.offset
    }), S;
  }
}
function $i(e) {
  return /^\s*$/.test(e.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\r\n]*(\r\n|\n|\r)/g, ""));
}
function Al(e, t) {
  const n = {
    value: "",
    stops: []
  };
  let i = -1;
  for (; ++i < e.length; ) {
    const r = e[i];
    if (r[0] === "enter") {
      const s = r[1].type;
      if (s === "lineEnding" || t.includes(s)) {
        const a = r[2].sliceStream(r[1]);
        for (; a.length > 0 && a[0] === -1; )
          a.shift();
        const o = Tl(a);
        n.stops.push([n.value.length, r[1].start]), n.value += o, n.stops.push([n.value.length, r[1].end]);
      }
    }
  }
  return n;
}
function _l(e, t) {
  let n = 0;
  for (; n < e.length && e[n][0] <= t; )
    n += 1;
  if (n === 0)
    return;
  const [i, r] = e[n - 1], s = t - i;
  return {
    line: r.line,
    column: r.column + s,
    offset: r.offset + s
  };
}
function Tl(e) {
  let t = -1;
  const n = [];
  let i;
  for (; ++t < e.length; ) {
    const r = e[t];
    let s;
    if (typeof r == "string")
      s = r;
    else switch (r) {
      case -5: {
        s = "\r";
        break;
      }
      case -4: {
        s = `
`;
        break;
      }
      case -3: {
        s = `\r
`;
        break;
      }
      case -2: {
        s = "	";
        break;
      }
      case -1: {
        if (i) continue;
        s = " ";
        break;
      }
      default:
        s = String.fromCharCode(r);
    }
    i = r === -2, n.push(s);
  }
  return n.join("");
}
function qe(e) {
  const t = e || {}, n = t.loc || {}, i = t.range || [void 0, void 0], r = Wi(n.start, i[0] || t.start), s = Wi(n.end, i[1] || t.end);
  if (r && s)
    return { start: r, end: s };
}
function Wi(e, t) {
  if (e && typeof e == "object") {
    const n = "line" in e ? Mn(e.line) : void 0, i = "column" in e ? Mn(e.column) : void 0;
    if (n && i !== void 0)
      return {
        line: n,
        column: i + 1,
        offset: Mn(t)
      };
  }
}
function Mn(e) {
  return typeof e == "number" && e > -1 ? e : void 0;
}
const Pl = 2, yt = "https://github.com/micromark/micromark-extension-mdx-expression/tree/main/packages/micromark-extension-mdx-expression", Nl = "#unexpected-end-of-file-in-expression-expected-a-corresponding-closing-brace-for-", Ll = "#unexpected-lazy-line-in-expression-in-container-expected-line-to-be-prefixed", Gi = "#unexpected-type-in-code-expected-an-object-spread-spread", Fl = "#unexpected-extra-content-in-spread-only-a-single-spread-is-supported", Dl = "#could-not-parse-expression-with-acorn";
function fn(e, t, n, i, r, s, a, o, l, u, c) {
  const p = this, m = this.events.length + 3;
  let h = 0, v, b;
  return I;
  function I(T) {
    return e.enter(n), e.enter(i), e.consume(T), e.exit(i), v = p.now(), y;
  }
  function y(T) {
    if (T === null) {
      if (b) throw b;
      const S = new G("Unexpected end of file in expression, expected a corresponding closing brace for `{`", {
        place: p.now(),
        ruleId: "unexpected-eof",
        source: "micromark-extension-mdx-expression"
      });
      throw S.url = yt + Nl, S;
    }
    if (R(T))
      return e.enter("lineEnding"), e.consume(T), e.exit("lineEnding"), E;
    if (T === 125 && h === 0) {
      const S = s ? Ol.call(p, s, a, r, m, v, u || !1, l || !1) : {
        type: "ok",
        estree: void 0
      };
      if (S.type === "ok") {
        e.enter(i), e.consume(T), e.exit(i);
        const x = e.exit(n);
        return o && S.estree && Object.assign(x, {
          estree: S.estree
        }), t;
      }
      return b = S.message, e.enter(r), e.consume(T), A;
    }
    return e.enter(r), A(T);
  }
  function A(T) {
    return T === 125 && h === 0 || T === null || R(T) ? (e.exit(r), y(T)) : (T === 123 && !s ? h += 1 : T === 125 && (h -= 1), e.consume(T), A);
  }
  function E(T) {
    const S = p.now();
    if (S.line !== v.line && !c && p.parser.lazy[S.line]) {
      const x = new G("Unexpected lazy line in expression in container, expected line to be prefixed with `>` when in a block quote, whitespace when in a list, etc", {
        place: p.now(),
        ruleId: "unexpected-lazy",
        source: "micromark-extension-mdx-expression"
      });
      throw x.url = yt + Ll, x;
    }
    return X(T) ? Y(e, y, "linePrefix", Pl + 1)(T) : y(T);
  }
}
function Ol(e, t, n, i, r, s, a) {
  const o = Bs(this.events.slice(i), {
    acorn: e,
    tokenTypes: [n],
    acornOptions: t,
    start: r,
    expression: !0,
    allowEmpty: s,
    prefix: a ? "({" : "",
    suffix: a ? "})" : ""
  }), l = o.estree;
  if (a && l) {
    const u = l.body[0];
    if (u.type !== "ExpressionStatement" || u.expression.type !== "ObjectExpression") {
      const c = qe(u), p = new G("Unexpected `" + u.type + "` in code: expected an object spread (`{...spread}`)", {
        place: c.start,
        ruleId: "non-spread",
        source: "micromark-extension-mdx-expression"
      });
      throw p.url = yt + Gi, p;
    }
    if (u.expression.properties[1]) {
      const c = qe(u.expression.properties[1]), p = new G("Unexpected extra content in spread: only a single spread is supported", {
        place: c.start,
        ruleId: "spread-extra",
        source: "micromark-extension-mdx-expression"
      });
      throw p.url = yt + Fl, p;
    }
    if (u.expression.properties[0] && u.expression.properties[0].type !== "SpreadElement") {
      const c = qe(u.expression.properties[0]), p = new G("Unexpected `" + u.expression.properties[0].type + "` in code: only spread elements are supported", {
        place: c.start,
        ruleId: "non-spread",
        source: "micromark-extension-mdx-expression"
      });
      throw p.url = yt + Gi, p;
    }
  }
  if (o.error) {
    const u = new G("Could not parse expression with acorn", {
      cause: o.error,
      place: {
        line: o.error.loc.line,
        column: o.error.loc.column + 1,
        offset: o.error.pos
      },
      ruleId: "acorn",
      source: "micromark-extension-mdx-expression"
    });
    return u.url = yt + Dl, {
      type: "nok",
      message: u
    };
  }
  return {
    type: "ok",
    estree: l
  };
}
function Ml(e) {
  const t = e || {}, n = t.addResult, i = t.acorn, r = t.spread;
  let s = t.allowEmpty, a;
  if (s == null && (s = !0), i) {
    if (!i.parseExpressionAt)
      throw new Error("Expected a proper `acorn` instance passed in as `options.acorn`");
    a = Object.assign({
      ecmaVersion: 2024,
      sourceType: "module"
    }, t.acornOptions);
  } else if (t.acornOptions || t.addResult)
    throw new Error("Expected an `acorn` instance passed in as `options.acorn`");
  return {
    flow: {
      123: {
        name: "mdxFlowExpression",
        tokenize: o,
        concrete: !0
      }
    },
    text: {
      123: {
        name: "mdxTextExpression",
        tokenize: l
      }
    }
  };
  function o(u, c, p) {
    const m = this;
    return h;
    function h(y) {
      return v(y);
    }
    function v(y) {
      return fn.call(m, u, b, "mdxFlowExpression", "mdxFlowExpressionMarker", "mdxFlowExpressionChunk", i, a, n, r, s)(y);
    }
    function b(y) {
      return X(y) ? Y(u, I, "whitespace")(y) : I(y);
    }
    function I(y) {
      const A = m.parser.constructs.flow[60], T = (Array.isArray(A) ? A : (
        /* c8 ignore next 3 -- always a list when normalized. */
        A ? [A] : []
      )).find(function(S) {
        return S.name === "mdxJsxFlowTag";
      });
      return y === 60 && T ? u.attempt(T, I, p)(y) : y === null || R(y) ? c(y) : p(y);
    }
  }
  function l(u, c) {
    const p = this;
    return m;
    function m(h) {
      return fn.call(p, u, c, "mdxTextExpression", "mdxTextExpressionMarker", "mdxTextExpressionChunk", i, a, n, r, s, !0)(h);
    }
  }
}
const Rl = /[$_\p{ID_Start}]/u, jl = /[$_\u{200C}\u{200D}\p{ID_Continue}]/u, Vl = /[-$_\u{200C}\u{200D}\p{ID_Continue}]/u, Bl = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Jl = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Js = {};
function Ne(e) {
  return e ? Rl.test(String.fromCodePoint(e)) : !1;
}
function Tt(e, t) {
  const i = (t || Js).jsx ? Vl : jl;
  return e ? i.test(String.fromCodePoint(e)) : !1;
}
function Re(e, t) {
  return ((t || Js).jsx ? Jl : Bl).test(e);
}
const Qi = "https://github.com/micromark/micromark-extension-mdx-jsx";
function zs(e, t, n, i, r, s, a, o, l, u, c, p, m, h, v, b, I, y, A, E, T, S, x, g, C, P, O, D, L, $, K, z) {
  const te = this;
  let U, oe;
  return Te;
  function Te(d) {
    return e.enter(o), e.enter(l), e.consume(d), e.exit(l), w;
  }
  function w(d) {
    return re(d) ? n(d) : (U = fe, ne(d));
  }
  function fe(d) {
    if (d === 47)
      return e.enter(u), e.consume(d), e.exit(u), U = Pe, ne;
    if (d === 62)
      return ct(d);
    if (d !== null && d >= 0 && Ne(d))
      return e.enter(p), e.enter(m), e.consume(d), k;
    N(d, "before name", "a character that can start a name, such as a letter, `$`, or `_`" + (d === 33 ? " (note: to create a comment in MDX, use `{/* text */}`)" : ""));
  }
  function Pe(d) {
    if (d === 62)
      return ct(d);
    if (d !== null && d >= 0 && Ne(d))
      return e.enter(p), e.enter(m), e.consume(d), k;
    N(d, "before name", "a character that can start a name, such as a letter, `$`, or `_`" + (d === 42 || d === 47 ? " (note: JS comments in JSX tags are not supported in MDX)" : ""));
  }
  function k(d) {
    if (d !== null && d >= 0 && Tt(d, {
      jsx: !0
    }))
      return e.consume(d), k;
    if (d === 46 || d === 47 || d === 58 || d === 62 || d === 123 || re(d) || Xe(d))
      return e.exit(m), U = me, ne(d);
    N(d, "in name", "a name character such as letters, digits, `$`, or `_`; whitespace before attributes; or the end of the tag" + (d === 64 ? " (note: to create a link in MDX, use `[text](url)`)" : ""));
  }
  function me(d) {
    if (d === 46)
      return e.enter(h), e.consume(d), e.exit(h), U = De, ne;
    if (d === 58)
      return e.enter(b), e.consume(d), e.exit(b), U = Oe, ne;
    if (d === 47 || d === 62 || d === 123 || d !== null && d >= 0 && Ne(d))
      return e.exit(p), de(d);
    N(d, "after name", "a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag");
  }
  function De(d) {
    if (d !== null && d >= 0 && Ne(d))
      return e.enter(v), e.consume(d), se;
    N(d, "before member name", "a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag");
  }
  function se(d) {
    if (d !== null && d >= 0 && Tt(d, {
      jsx: !0
    }))
      return e.consume(d), se;
    if (d === 46 || d === 47 || d === 62 || d === 123 || re(d) || Xe(d))
      return e.exit(v), U = it, ne(d);
    N(d, "in member name", "a name character such as letters, digits, `$`, or `_`; whitespace before attributes; or the end of the tag" + (d === 64 ? " (note: to create a link in MDX, use `[text](url)`)" : ""));
  }
  function it(d) {
    if (d === 46)
      return e.enter(h), e.consume(d), e.exit(h), U = De, ne;
    if (d === 47 || d === 62 || d === 123 || d !== null && d >= 0 && Ne(d))
      return e.exit(p), de(d);
    N(d, "after member name", "a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag");
  }
  function Oe(d) {
    if (d !== null && d >= 0 && Ne(d))
      return e.enter(I), e.consume(d), Je;
    N(d, "before local name", "a character that can start a name, such as a letter, `$`, or `_`" + (d === 43 || d !== null && d > 46 && d < 58 ? " (note: to create a link in MDX, use `[text](url)`)" : ""));
  }
  function Je(d) {
    if (d !== null && d >= 0 && Tt(d, {
      jsx: !0
    }))
      return e.consume(d), Je;
    if (d === 47 || d === 62 || d === 123 || re(d) || Xe(d))
      return e.exit(I), U = Ge, ne(d);
    N(d, "in local name", "a name character such as letters, digits, `$`, or `_`; whitespace before attributes; or the end of the tag");
  }
  function Ge(d) {
    if (d === 47 || d === 62 || d === 123 || d !== null && d >= 0 && Ne(d))
      return e.exit(p), de(d);
    N(d, "after local name", "a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag");
  }
  function de(d) {
    if (d === 47)
      return e.enter(c), e.consume(d), e.exit(c), U = An, ne;
    if (d === 62)
      return ct(d);
    if (d === 123)
      return fn.call(te, e, Cn, y, A, E, i, r, s, !0, !1, a)(d);
    if (d !== null && d >= 0 && Ne(d))
      return e.enter(T), e.enter(S), e.enter(x), e.consume(d), Ht;
    N(d, "before attribute name", "a character that can start an attribute name, such as a letter, `$`, or `_`; whitespace before attributes; or the end of the tag");
  }
  function Cn(d) {
    return U = de, ne(d);
  }
  function Ht(d) {
    if (d !== null && d >= 0 && Tt(d, {
      jsx: !0
    }))
      return e.consume(d), Ht;
    if (d === 47 || d === 58 || d === 61 || d === 62 || d === 123 || re(d) || Xe(d))
      return e.exit(x), U = In, ne(d);
    N(d, "in attribute name", "an attribute name character such as letters, digits, `$`, or `_`; `=` to initialize a value; whitespace before attributes; or the end of the tag");
  }
  function In(d) {
    if (d === 58)
      return e.enter(g), e.consume(d), e.exit(g), U = $t, ne;
    if (d === 61)
      return e.exit(S), e.enter(P), e.consume(d), e.exit(P), U = Gt, ne;
    if (d === 47 || d === 62 || d === 123 || re(d) || Xe(d) || d !== null && d >= 0 && Ne(d))
      return e.exit(S), e.exit(T), U = de, ne(d);
    N(d, "after attribute name", "a character that can start an attribute name, such as a letter, `$`, or `_`; `=` to initialize a value; or the end of the tag");
  }
  function $t(d) {
    if (d !== null && d >= 0 && Ne(d))
      return e.enter(C), e.consume(d), It;
    N(d, "before local attribute name", "a character that can start an attribute name, such as a letter, `$`, or `_`; `=` to initialize a value; or the end of the tag");
  }
  function It(d) {
    if (d !== null && d >= 0 && Tt(d, {
      jsx: !0
    }))
      return e.consume(d), It;
    if (d === 47 || d === 61 || d === 62 || d === 123 || re(d) || Xe(d))
      return e.exit(C), e.exit(S), U = Wt, ne(d);
    N(d, "in local attribute name", "an attribute name character such as letters, digits, `$`, or `_`; `=` to initialize a value; whitespace before attributes; or the end of the tag");
  }
  function Wt(d) {
    if (d === 61)
      return e.enter(P), e.consume(d), e.exit(P), U = Gt, ne;
    if (d === 47 || d === 62 || d === 123 || d !== null && d >= 0 && Ne(d))
      return e.exit(T), de(d);
    N(d, "after local attribute name", "a character that can start an attribute name, such as a letter, `$`, or `_`; `=` to initialize a value; or the end of the tag");
  }
  function Gt(d) {
    if (d === 34 || d === 39)
      return e.enter(O), e.enter(D), e.consume(d), e.exit(D), oe = d, ut;
    if (d === 123)
      return fn.call(te, e, Qt, $, K, z, i, r, s, !1, !1, a)(d);
    N(d, "before attribute value", "a character that can start an attribute value, such as `\"`, `'`, or `{`" + (d === 60 ? " (note: to use an element or fragment as a prop value in MDX, use `{<element />}`)" : ""));
  }
  function Qt(d) {
    return e.exit(T), U = de, ne(d);
  }
  function ut(d) {
    return d === null && N(d, "in attribute value", "a corresponding closing quote `" + String.fromCodePoint(oe) + "`"), d === oe ? (e.enter(D), e.consume(d), e.exit(D), e.exit(O), e.exit(T), oe = void 0, U = de, ne) : R(d) ? (U = ut, ne(d)) : (e.enter(L), Yt(d));
  }
  function Yt(d) {
    return d === null || d === oe || R(d) ? (e.exit(L), ut(d)) : (e.consume(d), Yt);
  }
  function An(d) {
    if (d === 62)
      return ct(d);
    N(d, "after self-closing slash", "`>` to end the tag" + (d === 42 || d === 47 ? " (note: JS comments in JSX tags are not supported in MDX)" : ""));
  }
  function ct(d) {
    return e.enter(l), e.consume(d), e.exit(l), e.exit(o), t;
  }
  function ne(d) {
    return R(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), _) : X(d) || Xe(d) ? (e.enter("esWhitespace"), Kt(d)) : U(d);
  }
  function Kt(d) {
    return R(d) ? (e.exit("esWhitespace"), ne(d)) : X(d) || Xe(d) ? (e.consume(d), Kt) : (e.exit("esWhitespace"), U(d));
  }
  function _(d) {
    if (!a && te.parser.lazy[te.now().line]) {
      const J = new G("Unexpected lazy line in container, expected line to be prefixed with `>` when in a block quote, whitespace when in a list, etc", te.now(), "micromark-extension-mdx-jsx:unexpected-lazy");
      throw J.url = Qi + "#unexpected-lazy-line-in-container-expected-line-to-be", J;
    }
    return ne(d);
  }
  function N(d, J, Q) {
    const ce = new G("Unexpected " + (d === null ? "end of file" : "character `" + (d === 96 ? "` ` `" : String.fromCodePoint(d)) + "` (" + zl(d) + ")") + " " + J + ", expected " + Q, te.now(), "micromark-extension-mdx-jsx:unexpected-" + (d === null ? "eof" : "character"));
    throw ce.url = Qi + (d === null ? "#unexpected-end-of-file-at-expected-expect" : "#unexpected-character-at-expected-expect"), ce;
  }
}
function zl(e) {
  return "U+" + e.toString(16).toUpperCase().padStart(4, "0");
}
function Ul(e, t) {
  return {
    name: "mdxJsxTextTag",
    tokenize: n
  };
  function n(i, r, s) {
    return zs.call(this, i, r, s, e, t.acornOptions, t.addResult, !0, "mdxJsxTextTag", "mdxJsxTextTagMarker", "mdxJsxTextTagClosingMarker", "mdxJsxTextTagSelfClosingMarker", "mdxJsxTextTagName", "mdxJsxTextTagNamePrimary", "mdxJsxTextTagNameMemberMarker", "mdxJsxTextTagNameMember", "mdxJsxTextTagNamePrefixMarker", "mdxJsxTextTagNameLocal", "mdxJsxTextTagExpressionAttribute", "mdxJsxTextTagExpressionAttributeMarker", "mdxJsxTextTagExpressionAttributeValue", "mdxJsxTextTagAttribute", "mdxJsxTextTagAttributeName", "mdxJsxTextTagAttributeNamePrimary", "mdxJsxTextTagAttributeNamePrefixMarker", "mdxJsxTextTagAttributeNameLocal", "mdxJsxTextTagAttributeInitializerMarker", "mdxJsxTextTagAttributeValueLiteral", "mdxJsxTextTagAttributeValueLiteralMarker", "mdxJsxTextTagAttributeValueLiteralValue", "mdxJsxTextTagAttributeValueExpression", "mdxJsxTextTagAttributeValueExpressionMarker", "mdxJsxTextTagAttributeValueExpressionValue");
  }
}
function Xl(e, t) {
  return {
    name: "mdxJsxFlowTag",
    tokenize: n,
    concrete: !0
  };
  function n(i, r, s) {
    const a = this;
    return o;
    function o(p) {
      return l(p);
    }
    function l(p) {
      return zs.call(a, i, u, s, e, t.acornOptions, t.addResult, !1, "mdxJsxFlowTag", "mdxJsxFlowTagMarker", "mdxJsxFlowTagClosingMarker", "mdxJsxFlowTagSelfClosingMarker", "mdxJsxFlowTagName", "mdxJsxFlowTagNamePrimary", "mdxJsxFlowTagNameMemberMarker", "mdxJsxFlowTagNameMember", "mdxJsxFlowTagNamePrefixMarker", "mdxJsxFlowTagNameLocal", "mdxJsxFlowTagExpressionAttribute", "mdxJsxFlowTagExpressionAttributeMarker", "mdxJsxFlowTagExpressionAttributeValue", "mdxJsxFlowTagAttribute", "mdxJsxFlowTagAttributeName", "mdxJsxFlowTagAttributeNamePrimary", "mdxJsxFlowTagAttributeNamePrefixMarker", "mdxJsxFlowTagAttributeNameLocal", "mdxJsxFlowTagAttributeInitializerMarker", "mdxJsxFlowTagAttributeValueLiteral", "mdxJsxFlowTagAttributeValueLiteralMarker", "mdxJsxFlowTagAttributeValueLiteralValue", "mdxJsxFlowTagAttributeValueExpression", "mdxJsxFlowTagAttributeValueExpressionMarker", "mdxJsxFlowTagAttributeValueExpressionValue")(p);
    }
    function u(p) {
      return X(p) ? Y(i, c, "whitespace")(p) : c(p);
    }
    function c(p) {
      const m = a.parser.constructs.flow[123], v = (Array.isArray(m) ? m : m ? [m] : []).find((b) => b.name === "mdxFlowExpression");
      return p === 60 ? (
        // We can’t just say: fine. Lines of blocks have to be parsed until an eol/eof.
        o(p)
      ) : p === 123 && v ? i.attempt(v, c, s)(p) : p === null || R(p) ? r(p) : s(p);
    }
  }
}
function ql(e) {
  const t = e || {}, n = t.acorn;
  let i;
  if (n) {
    if (!n.parse || !n.parseExpressionAt)
      throw new Error("Expected a proper `acorn` instance passed in as `options.acorn`");
    i = Object.assign({
      ecmaVersion: 2024,
      sourceType: "module"
    }, t.acornOptions, {
      locations: !0
    });
  } else if (t.acornOptions || t.addResult)
    throw new Error("Expected an `acorn` instance passed in as `options.acorn`");
  return {
    flow: {
      60: Xl(n || void 0, {
        acornOptions: i,
        addResult: t.addResult || void 0
      })
    },
    text: {
      60: Ul(n || void 0, {
        acornOptions: i,
        addResult: t.addResult || void 0
      })
    }
  };
}
function Hl() {
  return {
    disable: { null: ["autolink", "codeIndented", "htmlFlow", "htmlText"] }
  };
}
function $e(e, t, n, i) {
  const r = e.length;
  let s = 0, a;
  if (t < 0 ? t = -t > r ? 0 : r + t : t = t > r ? r : t, n = n > 0 ? n : 0, i.length < 1e4)
    a = Array.from(i), a.unshift(t, n), e.splice(...a);
  else
    for (n && e.splice(t, n); s < i.length; )
      a = i.slice(s, s + 1e4), a.unshift(t, 0), e.splice(...a), s += 1e4, t += 1e4;
}
function Ee(e, t) {
  return e.length > 0 ? ($e(e, e.length, 0, t), e) : t;
}
function Yi(e) {
  if (e === null || re(e) || Xe(e))
    return 1;
  if (vl(e))
    return 2;
}
function xi(e, t, n) {
  const i = [];
  let r = -1;
  for (; ++r < e.length; ) {
    const s = e[r].resolveAll;
    s && !i.includes(s) && (t = s(t, n), i.push(s));
  }
  return t;
}
const ei = {
  name: "attention",
  tokenize: Wl,
  resolveAll: $l
};
function $l(e, t) {
  let n = -1, i, r, s, a, o, l, u, c;
  for (; ++n < e.length; )
    if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
      for (i = n; i--; )
        if (e[i][0] === "exit" && e[i][1].type === "attentionSequence" && e[i][1]._open && // If the markers are the same:
        t.sliceSerialize(e[i][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
          if ((e[i][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[i][1].end.offset - e[i][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3))
            continue;
          l = e[i][1].end.offset - e[i][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
          const p = Object.assign({}, e[i][1].end), m = Object.assign({}, e[n][1].start);
          Ki(p, -l), Ki(m, l), a = {
            type: l > 1 ? "strongSequence" : "emphasisSequence",
            start: p,
            end: Object.assign({}, e[i][1].end)
          }, o = {
            type: l > 1 ? "strongSequence" : "emphasisSequence",
            start: Object.assign({}, e[n][1].start),
            end: m
          }, s = {
            type: l > 1 ? "strongText" : "emphasisText",
            start: Object.assign({}, e[i][1].end),
            end: Object.assign({}, e[n][1].start)
          }, r = {
            type: l > 1 ? "strong" : "emphasis",
            start: Object.assign({}, a.start),
            end: Object.assign({}, o.end)
          }, e[i][1].end = Object.assign({}, a.start), e[n][1].start = Object.assign({}, o.end), u = [], e[i][1].end.offset - e[i][1].start.offset && (u = Ee(u, [["enter", e[i][1], t], ["exit", e[i][1], t]])), u = Ee(u, [["enter", r, t], ["enter", a, t], ["exit", a, t], ["enter", s, t]]), u = Ee(u, xi(t.parser.constructs.insideSpan.null, e.slice(i + 1, n), t)), u = Ee(u, [["exit", s, t], ["enter", o, t], ["exit", o, t], ["exit", r, t]]), e[n][1].end.offset - e[n][1].start.offset ? (c = 2, u = Ee(u, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : c = 0, $e(e, i - 1, n - i + 3, u), n = i + u.length - c - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function Wl(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, i = this.previous, r = Yi(i);
  let s;
  return a;
  function a(l) {
    return s = l, e.enter("attentionSequence"), o(l);
  }
  function o(l) {
    if (l === s)
      return e.consume(l), o;
    const u = e.exit("attentionSequence"), c = Yi(l), p = !c || c === 2 && r || n.includes(l), m = !r || r === 2 && c || n.includes(i);
    return u._open = !!(s === 42 ? p : p && (r || !m)), u._close = !!(s === 42 ? m : m && (c || !p)), t(l);
  }
}
function Ki(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const Gl = {
  name: "autolink",
  tokenize: Ql
};
function Ql(e, t, n) {
  let i = 0;
  return r;
  function r(h) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), s;
  }
  function s(h) {
    return Fe(h) ? (e.consume(h), a) : h === 64 ? n(h) : u(h);
  }
  function a(h) {
    return h === 43 || h === 45 || h === 46 || ye(h) ? (i = 1, o(h)) : u(h);
  }
  function o(h) {
    return h === 58 ? (e.consume(h), i = 0, l) : (h === 43 || h === 45 || h === 46 || ye(h)) && i++ < 32 ? (e.consume(h), o) : (i = 0, u(h));
  }
  function l(h) {
    return h === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t) : h === null || h === 32 || h === 60 || Kn(h) ? n(h) : (e.consume(h), l);
  }
  function u(h) {
    return h === 64 ? (e.consume(h), c) : bl(h) ? (e.consume(h), u) : n(h);
  }
  function c(h) {
    return ye(h) ? p(h) : n(h);
  }
  function p(h) {
    return h === 46 ? (e.consume(h), i = 0, c) : h === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(h), e.exit("autolinkMarker"), e.exit("autolink"), t) : m(h);
  }
  function m(h) {
    if ((h === 45 || ye(h)) && i++ < 63) {
      const v = h === 45 ? m : p;
      return e.consume(h), v;
    }
    return n(h);
  }
}
const Xt = {
  tokenize: Yl,
  partial: !0
};
function Yl(e, t, n) {
  return i;
  function i(s) {
    return X(s) ? Y(e, r, "linePrefix")(s) : r(s);
  }
  function r(s) {
    return s === null || R(s) ? t(s) : n(s);
  }
}
const Us = {
  name: "blockQuote",
  tokenize: Kl,
  continuation: {
    tokenize: Zl
  },
  exit: eu
};
function Kl(e, t, n) {
  const i = this;
  return r;
  function r(a) {
    if (a === 62) {
      const o = i.containerState;
      return o.open || (e.enter("blockQuote", {
        _container: !0
      }), o.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(a), e.exit("blockQuoteMarker"), s;
    }
    return n(a);
  }
  function s(a) {
    return X(a) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(a), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(a));
  }
}
function Zl(e, t, n) {
  const i = this;
  return r;
  function r(a) {
    return X(a) ? Y(e, s, "linePrefix", i.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a) : s(a);
  }
  function s(a) {
    return e.attempt(Us, t, n)(a);
  }
}
function eu(e) {
  e.exit("blockQuote");
}
const Xs = {
  name: "characterEscape",
  tokenize: tu
};
function tu(e, t, n) {
  return i;
  function i(s) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(s), e.exit("escapeMarker"), r;
  }
  function r(s) {
    return kl(s) ? (e.enter("characterEscapeValue"), e.consume(s), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(s);
  }
}
const qs = {
  name: "characterReference",
  tokenize: nu
};
function nu(e, t, n) {
  const i = this;
  let r = 0, s, a;
  return o;
  function o(p) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(p), e.exit("characterReferenceMarker"), l;
  }
  function l(p) {
    return p === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(p), e.exit("characterReferenceMarkerNumeric"), u) : (e.enter("characterReferenceValue"), s = 31, a = ye, c(p));
  }
  function u(p) {
    return p === 88 || p === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(p), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), s = 6, a = wl, c) : (e.enter("characterReferenceValue"), s = 7, a = Zn, c(p));
  }
  function c(p) {
    if (p === 59 && r) {
      const m = e.exit("characterReferenceValue");
      return a === ye && !Ot(i.sliceSerialize(m)) ? n(p) : (e.enter("characterReferenceMarker"), e.consume(p), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return a(p) && r++ < s ? (e.consume(p), c) : n(p);
  }
}
const Zi = {
  tokenize: ru,
  partial: !0
}, er = {
  name: "codeFenced",
  tokenize: iu,
  concrete: !0
};
function iu(e, t, n) {
  const i = this, r = {
    tokenize: S,
    partial: !0
  };
  let s = 0, a = 0, o;
  return l;
  function l(x) {
    return u(x);
  }
  function u(x) {
    const g = i.events[i.events.length - 1];
    return s = g && g[1].type === "linePrefix" ? g[2].sliceSerialize(g[1], !0).length : 0, o = x, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), c(x);
  }
  function c(x) {
    return x === o ? (a++, e.consume(x), c) : a < 3 ? n(x) : (e.exit("codeFencedFenceSequence"), X(x) ? Y(e, p, "whitespace")(x) : p(x));
  }
  function p(x) {
    return x === null || R(x) ? (e.exit("codeFencedFence"), i.interrupt ? t(x) : e.check(Zi, b, T)(x)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), m(x));
  }
  function m(x) {
    return x === null || R(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), p(x)) : X(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), Y(e, h, "whitespace")(x)) : x === 96 && x === o ? n(x) : (e.consume(x), m);
  }
  function h(x) {
    return x === null || R(x) ? p(x) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), v(x));
  }
  function v(x) {
    return x === null || R(x) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), p(x)) : x === 96 && x === o ? n(x) : (e.consume(x), v);
  }
  function b(x) {
    return e.attempt(r, T, I)(x);
  }
  function I(x) {
    return e.enter("lineEnding"), e.consume(x), e.exit("lineEnding"), y;
  }
  function y(x) {
    return s > 0 && X(x) ? Y(e, A, "linePrefix", s + 1)(x) : A(x);
  }
  function A(x) {
    return x === null || R(x) ? e.check(Zi, b, T)(x) : (e.enter("codeFlowValue"), E(x));
  }
  function E(x) {
    return x === null || R(x) ? (e.exit("codeFlowValue"), A(x)) : (e.consume(x), E);
  }
  function T(x) {
    return e.exit("codeFenced"), t(x);
  }
  function S(x, g, C) {
    let P = 0;
    return O;
    function O(z) {
      return x.enter("lineEnding"), x.consume(z), x.exit("lineEnding"), D;
    }
    function D(z) {
      return x.enter("codeFencedFence"), X(z) ? Y(x, L, "linePrefix", i.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(z) : L(z);
    }
    function L(z) {
      return z === o ? (x.enter("codeFencedFenceSequence"), $(z)) : C(z);
    }
    function $(z) {
      return z === o ? (P++, x.consume(z), $) : P >= a ? (x.exit("codeFencedFenceSequence"), X(z) ? Y(x, K, "whitespace")(z) : K(z)) : C(z);
    }
    function K(z) {
      return z === null || R(z) ? (x.exit("codeFencedFence"), g(z)) : C(z);
    }
  }
}
function ru(e, t, n) {
  const i = this;
  return r;
  function r(a) {
    return a === null ? n(a) : (e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), s);
  }
  function s(a) {
    return i.parser.lazy[i.now().line] ? n(a) : t(a);
  }
}
const Rn = {
  name: "codeIndented",
  tokenize: au
}, su = {
  tokenize: ou,
  partial: !0
};
function au(e, t, n) {
  const i = this;
  return r;
  function r(u) {
    return e.enter("codeIndented"), Y(e, s, "linePrefix", 5)(u);
  }
  function s(u) {
    const c = i.events[i.events.length - 1];
    return c && c[1].type === "linePrefix" && c[2].sliceSerialize(c[1], !0).length >= 4 ? a(u) : n(u);
  }
  function a(u) {
    return u === null ? l(u) : R(u) ? e.attempt(su, a, l)(u) : (e.enter("codeFlowValue"), o(u));
  }
  function o(u) {
    return u === null || R(u) ? (e.exit("codeFlowValue"), a(u)) : (e.consume(u), o);
  }
  function l(u) {
    return e.exit("codeIndented"), t(u);
  }
}
function ou(e, t, n) {
  const i = this;
  return r;
  function r(a) {
    return i.parser.lazy[i.now().line] ? n(a) : R(a) ? (e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), r) : Y(e, s, "linePrefix", 5)(a);
  }
  function s(a) {
    const o = i.events[i.events.length - 1];
    return o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? t(a) : R(a) ? r(a) : n(a);
  }
}
const lu = {
  name: "codeText",
  tokenize: pu,
  resolve: uu,
  previous: cu
};
function uu(e) {
  let t = e.length - 4, n = 3, i, r;
  if ((e[n][1].type === "lineEnding" || e[n][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
    for (i = n; ++i < t; )
      if (e[i][1].type === "codeTextData") {
        e[n][1].type = "codeTextPadding", e[t][1].type = "codeTextPadding", n += 2, t -= 2;
        break;
      }
  }
  for (i = n - 1, t++; ++i <= t; )
    r === void 0 ? i !== t && e[i][1].type !== "lineEnding" && (r = i) : (i === t || e[i][1].type === "lineEnding") && (e[r][1].type = "codeTextData", i !== r + 2 && (e[r][1].end = e[i - 1][1].end, e.splice(r + 2, i - r - 2), t -= i - r - 2, i = r + 2), r = void 0);
  return e;
}
function cu(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function pu(e, t, n) {
  let i = 0, r, s;
  return a;
  function a(p) {
    return e.enter("codeText"), e.enter("codeTextSequence"), o(p);
  }
  function o(p) {
    return p === 96 ? (e.consume(p), i++, o) : (e.exit("codeTextSequence"), l(p));
  }
  function l(p) {
    return p === null ? n(p) : p === 32 ? (e.enter("space"), e.consume(p), e.exit("space"), l) : p === 96 ? (s = e.enter("codeTextSequence"), r = 0, c(p)) : R(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), l) : (e.enter("codeTextData"), u(p));
  }
  function u(p) {
    return p === null || p === 32 || p === 96 || R(p) ? (e.exit("codeTextData"), l(p)) : (e.consume(p), u);
  }
  function c(p) {
    return p === 96 ? (e.consume(p), r++, c) : r === i ? (e.exit("codeTextSequence"), e.exit("codeText"), t(p)) : (s.type = "codeTextData", u(p));
  }
}
class hu {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(t) {
    this.left = t ? [...t] : [], this.right = [];
  }
  /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */
  get(t) {
    if (t < 0 || t >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + t + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return t < this.left.length ? this.left[t] : this.right[this.right.length - t + this.left.length - 1];
  }
  /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */
  get length() {
    return this.left.length + this.right.length;
  }
  /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */
  slice(t, n) {
    const i = n ?? Number.POSITIVE_INFINITY;
    return i < this.left.length ? this.left.slice(t, i) : t > this.left.length ? this.right.slice(this.right.length - i + this.left.length, this.right.length - t + this.left.length).reverse() : this.left.slice(t).concat(this.right.slice(this.right.length - i + this.left.length).reverse());
  }
  /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */
  splice(t, n, i) {
    const r = n || 0;
    this.setCursor(Math.trunc(t));
    const s = this.right.splice(this.right.length - r, Number.POSITIVE_INFINITY);
    return i && Pt(this.left, i), s.reverse();
  }
  /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  push(t) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(t);
  }
  /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  pushMany(t) {
    this.setCursor(Number.POSITIVE_INFINITY), Pt(this.left, t);
  }
  /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  unshift(t) {
    this.setCursor(0), this.right.push(t);
  }
  /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  unshiftMany(t) {
    this.setCursor(0), Pt(this.right, t.reverse());
  }
  /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */
  setCursor(t) {
    if (!(t === this.left.length || t > this.left.length && this.right.length === 0 || t < 0 && this.left.length === 0))
      if (t < this.left.length) {
        const n = this.left.splice(t, Number.POSITIVE_INFINITY);
        Pt(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        Pt(this.left, n.reverse());
      }
  }
}
function Pt(e, t) {
  let n = 0;
  if (t.length < 1e4)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function Hs(e) {
  const t = {};
  let n = -1, i, r, s, a, o, l, u;
  const c = new hu(e);
  for (; ++n < c.length; ) {
    for (; n in t; )
      n = t[n];
    if (i = c.get(n), n && i[1].type === "chunkFlow" && c.get(n - 1)[1].type === "listItemPrefix" && (l = i[1]._tokenizer.events, s = 0, s < l.length && l[s][1].type === "lineEndingBlank" && (s += 2), s < l.length && l[s][1].type === "content"))
      for (; ++s < l.length && l[s][1].type !== "content"; )
        l[s][1].type === "chunkText" && (l[s][1]._isInFirstContentOfListItem = !0, s++);
    if (i[0] === "enter")
      i[1].contentType && (Object.assign(t, fu(c, n)), n = t[n], u = !0);
    else if (i[1]._container) {
      for (s = n, r = void 0; s-- && (a = c.get(s), a[1].type === "lineEnding" || a[1].type === "lineEndingBlank"); )
        a[0] === "enter" && (r && (c.get(r)[1].type = "lineEndingBlank"), a[1].type = "lineEnding", r = s);
      r && (i[1].end = Object.assign({}, c.get(r)[1].start), o = c.slice(r, n), o.unshift(i), c.splice(r, n - r + 1, o));
    }
  }
  return $e(e, 0, Number.POSITIVE_INFINITY, c.slice(0)), !u;
}
function fu(e, t) {
  const n = e.get(t)[1], i = e.get(t)[2];
  let r = t - 1;
  const s = [], a = n._tokenizer || i.parser[n.contentType](n.start), o = a.events, l = [], u = {};
  let c, p, m = -1, h = n, v = 0, b = 0;
  const I = [b];
  for (; h; ) {
    for (; e.get(++r)[1] !== h; )
      ;
    s.push(r), h._tokenizer || (c = i.sliceStream(h), h.next || c.push(null), p && a.defineSkip(h.start), h._isInFirstContentOfListItem && (a._gfmTasklistFirstContentOfListItem = !0), a.write(c), h._isInFirstContentOfListItem && (a._gfmTasklistFirstContentOfListItem = void 0)), p = h, h = h.next;
  }
  for (h = n; ++m < o.length; )
    // Find a void token that includes a break.
    o[m][0] === "exit" && o[m - 1][0] === "enter" && o[m][1].type === o[m - 1][1].type && o[m][1].start.line !== o[m][1].end.line && (b = m + 1, I.push(b), h._tokenizer = void 0, h.previous = void 0, h = h.next);
  for (a.events = [], h ? (h._tokenizer = void 0, h.previous = void 0) : I.pop(), m = I.length; m--; ) {
    const y = o.slice(I[m], I[m + 1]), A = s.pop();
    l.push([A, A + y.length - 1]), e.splice(A, 2, y);
  }
  for (l.reverse(), m = -1; ++m < l.length; )
    u[v + l[m][0]] = v + l[m][1], v += l[m][1] - l[m][0] - 1;
  return u;
}
const mu = {
  tokenize: gu,
  resolve: xu
}, du = {
  tokenize: yu,
  partial: !0
};
function xu(e) {
  return Hs(e), e;
}
function gu(e, t) {
  let n;
  return i;
  function i(o) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), r(o);
  }
  function r(o) {
    return o === null ? s(o) : R(o) ? e.check(du, a, s)(o) : (e.consume(o), r);
  }
  function s(o) {
    return e.exit("chunkContent"), e.exit("content"), t(o);
  }
  function a(o) {
    return e.consume(o), e.exit("chunkContent"), n.next = e.enter("chunkContent", {
      contentType: "content",
      previous: n
    }), n = n.next, r;
  }
}
function yu(e, t, n) {
  const i = this;
  return r;
  function r(a) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), Y(e, s, "linePrefix");
  }
  function s(a) {
    if (a === null || R(a))
      return n(a);
    const o = i.events[i.events.length - 1];
    return !i.parser.constructs.disable.null.includes("codeIndented") && o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? t(a) : e.interrupt(i.parser.constructs.flow, n, t)(a);
  }
}
function $s(e, t, n, i, r, s, a, o, l) {
  const u = l || Number.POSITIVE_INFINITY;
  let c = 0;
  return p;
  function p(y) {
    return y === 60 ? (e.enter(i), e.enter(r), e.enter(s), e.consume(y), e.exit(s), m) : y === null || y === 32 || y === 41 || Kn(y) ? n(y) : (e.enter(i), e.enter(a), e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), b(y));
  }
  function m(y) {
    return y === 62 ? (e.enter(s), e.consume(y), e.exit(s), e.exit(r), e.exit(i), t) : (e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), h(y));
  }
  function h(y) {
    return y === 62 ? (e.exit("chunkString"), e.exit(o), m(y)) : y === null || y === 60 || R(y) ? n(y) : (e.consume(y), y === 92 ? v : h);
  }
  function v(y) {
    return y === 60 || y === 62 || y === 92 ? (e.consume(y), h) : h(y);
  }
  function b(y) {
    return !c && (y === null || y === 41 || re(y)) ? (e.exit("chunkString"), e.exit(o), e.exit(a), e.exit(i), t(y)) : c < u && y === 40 ? (e.consume(y), c++, b) : y === 41 ? (e.consume(y), c--, b) : y === null || y === 32 || y === 40 || Kn(y) ? n(y) : (e.consume(y), y === 92 ? I : b);
  }
  function I(y) {
    return y === 40 || y === 41 || y === 92 ? (e.consume(y), b) : b(y);
  }
}
function Ws(e, t, n, i, r, s) {
  const a = this;
  let o = 0, l;
  return u;
  function u(h) {
    return e.enter(i), e.enter(r), e.consume(h), e.exit(r), e.enter(s), c;
  }
  function c(h) {
    return o > 999 || h === null || h === 91 || h === 93 && !l || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    h === 94 && !o && "_hiddenFootnoteSupport" in a.parser.constructs ? n(h) : h === 93 ? (e.exit(s), e.enter(r), e.consume(h), e.exit(r), e.exit(i), t) : R(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), c) : (e.enter("chunkString", {
      contentType: "string"
    }), p(h));
  }
  function p(h) {
    return h === null || h === 91 || h === 93 || R(h) || o++ > 999 ? (e.exit("chunkString"), c(h)) : (e.consume(h), l || (l = !X(h)), h === 92 ? m : p);
  }
  function m(h) {
    return h === 91 || h === 92 || h === 93 ? (e.consume(h), o++, p) : p(h);
  }
}
function Gs(e, t, n, i, r, s) {
  let a;
  return o;
  function o(m) {
    return m === 34 || m === 39 || m === 40 ? (e.enter(i), e.enter(r), e.consume(m), e.exit(r), a = m === 40 ? 41 : m, l) : n(m);
  }
  function l(m) {
    return m === a ? (e.enter(r), e.consume(m), e.exit(r), e.exit(i), t) : (e.enter(s), u(m));
  }
  function u(m) {
    return m === a ? (e.exit(s), l(a)) : m === null ? n(m) : R(m) ? (e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), Y(e, u, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), c(m));
  }
  function c(m) {
    return m === a || m === null || R(m) ? (e.exit("chunkString"), u(m)) : (e.consume(m), m === 92 ? p : c);
  }
  function p(m) {
    return m === a || m === 92 ? (e.consume(m), c) : c(m);
  }
}
function Ft(e, t) {
  let n;
  return i;
  function i(r) {
    return R(r) ? (e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), n = !0, i) : X(r) ? Y(
      e,
      i,
      n ? "linePrefix" : "lineSuffix"
    )(r) : t(r);
  }
}
function bt(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const bu = {
  name: "definition",
  tokenize: ku
}, wu = {
  tokenize: vu,
  partial: !0
};
function ku(e, t, n) {
  const i = this;
  let r;
  return s;
  function s(h) {
    return e.enter("definition"), a(h);
  }
  function a(h) {
    return Ws.call(
      i,
      e,
      o,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(h);
  }
  function o(h) {
    return r = bt(i.sliceSerialize(i.events[i.events.length - 1][1]).slice(1, -1)), h === 58 ? (e.enter("definitionMarker"), e.consume(h), e.exit("definitionMarker"), l) : n(h);
  }
  function l(h) {
    return re(h) ? Ft(e, u)(h) : u(h);
  }
  function u(h) {
    return $s(
      e,
      c,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(h);
  }
  function c(h) {
    return e.attempt(wu, p, p)(h);
  }
  function p(h) {
    return X(h) ? Y(e, m, "whitespace")(h) : m(h);
  }
  function m(h) {
    return h === null || R(h) ? (e.exit("definition"), i.parser.defined.push(r), t(h)) : n(h);
  }
}
function vu(e, t, n) {
  return i;
  function i(o) {
    return re(o) ? Ft(e, r)(o) : n(o);
  }
  function r(o) {
    return Gs(e, s, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(o);
  }
  function s(o) {
    return X(o) ? Y(e, a, "whitespace")(o) : a(o);
  }
  function a(o) {
    return o === null || R(o) ? t(o) : n(o);
  }
}
const Su = {
  name: "hardBreakEscape",
  tokenize: Eu
};
function Eu(e, t, n) {
  return i;
  function i(s) {
    return e.enter("hardBreakEscape"), e.consume(s), r;
  }
  function r(s) {
    return R(s) ? (e.exit("hardBreakEscape"), t(s)) : n(s);
  }
}
const Cu = {
  name: "headingAtx",
  tokenize: Au,
  resolve: Iu
};
function Iu(e, t) {
  let n = e.length - 2, i = 3, r, s;
  return e[i][1].type === "whitespace" && (i += 2), n - 2 > i && e[n][1].type === "whitespace" && (n -= 2), e[n][1].type === "atxHeadingSequence" && (i === n - 1 || n - 4 > i && e[n - 2][1].type === "whitespace") && (n -= i + 1 === n ? 2 : 4), n > i && (r = {
    type: "atxHeadingText",
    start: e[i][1].start,
    end: e[n][1].end
  }, s = {
    type: "chunkText",
    start: e[i][1].start,
    end: e[n][1].end,
    contentType: "text"
  }, $e(e, i, n - i + 1, [["enter", r, t], ["enter", s, t], ["exit", s, t], ["exit", r, t]])), e;
}
function Au(e, t, n) {
  let i = 0;
  return r;
  function r(c) {
    return e.enter("atxHeading"), s(c);
  }
  function s(c) {
    return e.enter("atxHeadingSequence"), a(c);
  }
  function a(c) {
    return c === 35 && i++ < 6 ? (e.consume(c), a) : c === null || re(c) ? (e.exit("atxHeadingSequence"), o(c)) : n(c);
  }
  function o(c) {
    return c === 35 ? (e.enter("atxHeadingSequence"), l(c)) : c === null || R(c) ? (e.exit("atxHeading"), t(c)) : X(c) ? Y(e, o, "whitespace")(c) : (e.enter("atxHeadingText"), u(c));
  }
  function l(c) {
    return c === 35 ? (e.consume(c), l) : (e.exit("atxHeadingSequence"), o(c));
  }
  function u(c) {
    return c === null || c === 35 || re(c) ? (e.exit("atxHeadingText"), o(c)) : (e.consume(c), u);
  }
}
const _u = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], tr = ["pre", "script", "style", "textarea"], Tu = {
  name: "htmlFlow",
  tokenize: Fu,
  resolveTo: Lu,
  concrete: !0
}, Pu = {
  tokenize: Ou,
  partial: !0
}, Nu = {
  tokenize: Du,
  partial: !0
};
function Lu(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function Fu(e, t, n) {
  const i = this;
  let r, s, a, o, l;
  return u;
  function u(k) {
    return c(k);
  }
  function c(k) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(k), p;
  }
  function p(k) {
    return k === 33 ? (e.consume(k), m) : k === 47 ? (e.consume(k), s = !0, b) : k === 63 ? (e.consume(k), r = 3, i.interrupt ? t : w) : Fe(k) ? (e.consume(k), a = String.fromCharCode(k), I) : n(k);
  }
  function m(k) {
    return k === 45 ? (e.consume(k), r = 2, h) : k === 91 ? (e.consume(k), r = 5, o = 0, v) : Fe(k) ? (e.consume(k), r = 4, i.interrupt ? t : w) : n(k);
  }
  function h(k) {
    return k === 45 ? (e.consume(k), i.interrupt ? t : w) : n(k);
  }
  function v(k) {
    const me = "CDATA[";
    return k === me.charCodeAt(o++) ? (e.consume(k), o === me.length ? i.interrupt ? t : L : v) : n(k);
  }
  function b(k) {
    return Fe(k) ? (e.consume(k), a = String.fromCharCode(k), I) : n(k);
  }
  function I(k) {
    if (k === null || k === 47 || k === 62 || re(k)) {
      const me = k === 47, De = a.toLowerCase();
      return !me && !s && tr.includes(De) ? (r = 1, i.interrupt ? t(k) : L(k)) : _u.includes(a.toLowerCase()) ? (r = 6, me ? (e.consume(k), y) : i.interrupt ? t(k) : L(k)) : (r = 7, i.interrupt && !i.parser.lazy[i.now().line] ? n(k) : s ? A(k) : E(k));
    }
    return k === 45 || ye(k) ? (e.consume(k), a += String.fromCharCode(k), I) : n(k);
  }
  function y(k) {
    return k === 62 ? (e.consume(k), i.interrupt ? t : L) : n(k);
  }
  function A(k) {
    return X(k) ? (e.consume(k), A) : O(k);
  }
  function E(k) {
    return k === 47 ? (e.consume(k), O) : k === 58 || k === 95 || Fe(k) ? (e.consume(k), T) : X(k) ? (e.consume(k), E) : O(k);
  }
  function T(k) {
    return k === 45 || k === 46 || k === 58 || k === 95 || ye(k) ? (e.consume(k), T) : S(k);
  }
  function S(k) {
    return k === 61 ? (e.consume(k), x) : X(k) ? (e.consume(k), S) : E(k);
  }
  function x(k) {
    return k === null || k === 60 || k === 61 || k === 62 || k === 96 ? n(k) : k === 34 || k === 39 ? (e.consume(k), l = k, g) : X(k) ? (e.consume(k), x) : C(k);
  }
  function g(k) {
    return k === l ? (e.consume(k), l = null, P) : k === null || R(k) ? n(k) : (e.consume(k), g);
  }
  function C(k) {
    return k === null || k === 34 || k === 39 || k === 47 || k === 60 || k === 61 || k === 62 || k === 96 || re(k) ? S(k) : (e.consume(k), C);
  }
  function P(k) {
    return k === 47 || k === 62 || X(k) ? E(k) : n(k);
  }
  function O(k) {
    return k === 62 ? (e.consume(k), D) : n(k);
  }
  function D(k) {
    return k === null || R(k) ? L(k) : X(k) ? (e.consume(k), D) : n(k);
  }
  function L(k) {
    return k === 45 && r === 2 ? (e.consume(k), te) : k === 60 && r === 1 ? (e.consume(k), U) : k === 62 && r === 4 ? (e.consume(k), fe) : k === 63 && r === 3 ? (e.consume(k), w) : k === 93 && r === 5 ? (e.consume(k), Te) : R(k) && (r === 6 || r === 7) ? (e.exit("htmlFlowData"), e.check(Pu, Pe, $)(k)) : k === null || R(k) ? (e.exit("htmlFlowData"), $(k)) : (e.consume(k), L);
  }
  function $(k) {
    return e.check(Nu, K, Pe)(k);
  }
  function K(k) {
    return e.enter("lineEnding"), e.consume(k), e.exit("lineEnding"), z;
  }
  function z(k) {
    return k === null || R(k) ? $(k) : (e.enter("htmlFlowData"), L(k));
  }
  function te(k) {
    return k === 45 ? (e.consume(k), w) : L(k);
  }
  function U(k) {
    return k === 47 ? (e.consume(k), a = "", oe) : L(k);
  }
  function oe(k) {
    if (k === 62) {
      const me = a.toLowerCase();
      return tr.includes(me) ? (e.consume(k), fe) : L(k);
    }
    return Fe(k) && a.length < 8 ? (e.consume(k), a += String.fromCharCode(k), oe) : L(k);
  }
  function Te(k) {
    return k === 93 ? (e.consume(k), w) : L(k);
  }
  function w(k) {
    return k === 62 ? (e.consume(k), fe) : k === 45 && r === 2 ? (e.consume(k), w) : L(k);
  }
  function fe(k) {
    return k === null || R(k) ? (e.exit("htmlFlowData"), Pe(k)) : (e.consume(k), fe);
  }
  function Pe(k) {
    return e.exit("htmlFlow"), t(k);
  }
}
function Du(e, t, n) {
  const i = this;
  return r;
  function r(a) {
    return R(a) ? (e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), s) : n(a);
  }
  function s(a) {
    return i.parser.lazy[i.now().line] ? n(a) : t(a);
  }
}
function Ou(e, t, n) {
  return i;
  function i(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), e.attempt(Xt, t, n);
  }
}
const Mu = {
  name: "htmlText",
  tokenize: Ru
};
function Ru(e, t, n) {
  const i = this;
  let r, s, a;
  return o;
  function o(w) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(w), l;
  }
  function l(w) {
    return w === 33 ? (e.consume(w), u) : w === 47 ? (e.consume(w), S) : w === 63 ? (e.consume(w), E) : Fe(w) ? (e.consume(w), C) : n(w);
  }
  function u(w) {
    return w === 45 ? (e.consume(w), c) : w === 91 ? (e.consume(w), s = 0, v) : Fe(w) ? (e.consume(w), A) : n(w);
  }
  function c(w) {
    return w === 45 ? (e.consume(w), h) : n(w);
  }
  function p(w) {
    return w === null ? n(w) : w === 45 ? (e.consume(w), m) : R(w) ? (a = p, U(w)) : (e.consume(w), p);
  }
  function m(w) {
    return w === 45 ? (e.consume(w), h) : p(w);
  }
  function h(w) {
    return w === 62 ? te(w) : w === 45 ? m(w) : p(w);
  }
  function v(w) {
    const fe = "CDATA[";
    return w === fe.charCodeAt(s++) ? (e.consume(w), s === fe.length ? b : v) : n(w);
  }
  function b(w) {
    return w === null ? n(w) : w === 93 ? (e.consume(w), I) : R(w) ? (a = b, U(w)) : (e.consume(w), b);
  }
  function I(w) {
    return w === 93 ? (e.consume(w), y) : b(w);
  }
  function y(w) {
    return w === 62 ? te(w) : w === 93 ? (e.consume(w), y) : b(w);
  }
  function A(w) {
    return w === null || w === 62 ? te(w) : R(w) ? (a = A, U(w)) : (e.consume(w), A);
  }
  function E(w) {
    return w === null ? n(w) : w === 63 ? (e.consume(w), T) : R(w) ? (a = E, U(w)) : (e.consume(w), E);
  }
  function T(w) {
    return w === 62 ? te(w) : E(w);
  }
  function S(w) {
    return Fe(w) ? (e.consume(w), x) : n(w);
  }
  function x(w) {
    return w === 45 || ye(w) ? (e.consume(w), x) : g(w);
  }
  function g(w) {
    return R(w) ? (a = g, U(w)) : X(w) ? (e.consume(w), g) : te(w);
  }
  function C(w) {
    return w === 45 || ye(w) ? (e.consume(w), C) : w === 47 || w === 62 || re(w) ? P(w) : n(w);
  }
  function P(w) {
    return w === 47 ? (e.consume(w), te) : w === 58 || w === 95 || Fe(w) ? (e.consume(w), O) : R(w) ? (a = P, U(w)) : X(w) ? (e.consume(w), P) : te(w);
  }
  function O(w) {
    return w === 45 || w === 46 || w === 58 || w === 95 || ye(w) ? (e.consume(w), O) : D(w);
  }
  function D(w) {
    return w === 61 ? (e.consume(w), L) : R(w) ? (a = D, U(w)) : X(w) ? (e.consume(w), D) : P(w);
  }
  function L(w) {
    return w === null || w === 60 || w === 61 || w === 62 || w === 96 ? n(w) : w === 34 || w === 39 ? (e.consume(w), r = w, $) : R(w) ? (a = L, U(w)) : X(w) ? (e.consume(w), L) : (e.consume(w), K);
  }
  function $(w) {
    return w === r ? (e.consume(w), r = void 0, z) : w === null ? n(w) : R(w) ? (a = $, U(w)) : (e.consume(w), $);
  }
  function K(w) {
    return w === null || w === 34 || w === 39 || w === 60 || w === 61 || w === 96 ? n(w) : w === 47 || w === 62 || re(w) ? P(w) : (e.consume(w), K);
  }
  function z(w) {
    return w === 47 || w === 62 || re(w) ? P(w) : n(w);
  }
  function te(w) {
    return w === 62 ? (e.consume(w), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(w);
  }
  function U(w) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(w), e.exit("lineEnding"), oe;
  }
  function oe(w) {
    return X(w) ? Y(e, Te, "linePrefix", i.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(w) : Te(w);
  }
  function Te(w) {
    return e.enter("htmlTextData"), a(w);
  }
}
const gi = {
  name: "labelEnd",
  tokenize: Uu,
  resolveTo: zu,
  resolveAll: Ju
}, ju = {
  tokenize: Xu
}, Vu = {
  tokenize: qu
}, Bu = {
  tokenize: Hu
};
function Ju(e) {
  let t = -1;
  for (; ++t < e.length; ) {
    const n = e[t][1];
    (n.type === "labelImage" || n.type === "labelLink" || n.type === "labelEnd") && (e.splice(t + 1, n.type === "labelImage" ? 4 : 2), n.type = "data", t++);
  }
  return e;
}
function zu(e, t) {
  let n = e.length, i = 0, r, s, a, o;
  for (; n--; )
    if (r = e[n][1], s) {
      if (r.type === "link" || r.type === "labelLink" && r._inactive)
        break;
      e[n][0] === "enter" && r.type === "labelLink" && (r._inactive = !0);
    } else if (a) {
      if (e[n][0] === "enter" && (r.type === "labelImage" || r.type === "labelLink") && !r._balanced && (s = n, r.type !== "labelLink")) {
        i = 2;
        break;
      }
    } else r.type === "labelEnd" && (a = n);
  const l = {
    type: e[s][1].type === "labelLink" ? "link" : "image",
    start: Object.assign({}, e[s][1].start),
    end: Object.assign({}, e[e.length - 1][1].end)
  }, u = {
    type: "label",
    start: Object.assign({}, e[s][1].start),
    end: Object.assign({}, e[a][1].end)
  }, c = {
    type: "labelText",
    start: Object.assign({}, e[s + i + 2][1].end),
    end: Object.assign({}, e[a - 2][1].start)
  };
  return o = [["enter", l, t], ["enter", u, t]], o = Ee(o, e.slice(s + 1, s + i + 3)), o = Ee(o, [["enter", c, t]]), o = Ee(o, xi(t.parser.constructs.insideSpan.null, e.slice(s + i + 4, a - 3), t)), o = Ee(o, [["exit", c, t], e[a - 2], e[a - 1], ["exit", u, t]]), o = Ee(o, e.slice(a + 1)), o = Ee(o, [["exit", l, t]]), $e(e, s, e.length, o), e;
}
function Uu(e, t, n) {
  const i = this;
  let r = i.events.length, s, a;
  for (; r--; )
    if ((i.events[r][1].type === "labelImage" || i.events[r][1].type === "labelLink") && !i.events[r][1]._balanced) {
      s = i.events[r][1];
      break;
    }
  return o;
  function o(m) {
    return s ? s._inactive ? p(m) : (a = i.parser.defined.includes(bt(i.sliceSerialize({
      start: s.end,
      end: i.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(m), e.exit("labelMarker"), e.exit("labelEnd"), l) : n(m);
  }
  function l(m) {
    return m === 40 ? e.attempt(ju, c, a ? c : p)(m) : m === 91 ? e.attempt(Vu, c, a ? u : p)(m) : a ? c(m) : p(m);
  }
  function u(m) {
    return e.attempt(Bu, c, p)(m);
  }
  function c(m) {
    return t(m);
  }
  function p(m) {
    return s._balanced = !0, n(m);
  }
}
function Xu(e, t, n) {
  return i;
  function i(p) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(p), e.exit("resourceMarker"), r;
  }
  function r(p) {
    return re(p) ? Ft(e, s)(p) : s(p);
  }
  function s(p) {
    return p === 41 ? c(p) : $s(e, a, o, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(p);
  }
  function a(p) {
    return re(p) ? Ft(e, l)(p) : c(p);
  }
  function o(p) {
    return n(p);
  }
  function l(p) {
    return p === 34 || p === 39 || p === 40 ? Gs(e, u, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(p) : c(p);
  }
  function u(p) {
    return re(p) ? Ft(e, c)(p) : c(p);
  }
  function c(p) {
    return p === 41 ? (e.enter("resourceMarker"), e.consume(p), e.exit("resourceMarker"), e.exit("resource"), t) : n(p);
  }
}
function qu(e, t, n) {
  const i = this;
  return r;
  function r(o) {
    return Ws.call(i, e, s, a, "reference", "referenceMarker", "referenceString")(o);
  }
  function s(o) {
    return i.parser.defined.includes(bt(i.sliceSerialize(i.events[i.events.length - 1][1]).slice(1, -1))) ? t(o) : n(o);
  }
  function a(o) {
    return n(o);
  }
}
function Hu(e, t, n) {
  return i;
  function i(s) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(s), e.exit("referenceMarker"), r;
  }
  function r(s) {
    return s === 93 ? (e.enter("referenceMarker"), e.consume(s), e.exit("referenceMarker"), e.exit("reference"), t) : n(s);
  }
}
const $u = {
  name: "labelStartImage",
  tokenize: Wu,
  resolveAll: gi.resolveAll
};
function Wu(e, t, n) {
  const i = this;
  return r;
  function r(o) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(o), e.exit("labelImageMarker"), s;
  }
  function s(o) {
    return o === 91 ? (e.enter("labelMarker"), e.consume(o), e.exit("labelMarker"), e.exit("labelImage"), a) : n(o);
  }
  function a(o) {
    return o === 94 && "_hiddenFootnoteSupport" in i.parser.constructs ? n(o) : t(o);
  }
}
const Gu = {
  name: "labelStartLink",
  tokenize: Qu,
  resolveAll: gi.resolveAll
};
function Qu(e, t, n) {
  const i = this;
  return r;
  function r(a) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(a), e.exit("labelMarker"), e.exit("labelLink"), s;
  }
  function s(a) {
    return a === 94 && "_hiddenFootnoteSupport" in i.parser.constructs ? n(a) : t(a);
  }
}
const jn = {
  name: "lineEnding",
  tokenize: Yu
};
function Yu(e, t) {
  return n;
  function n(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), Y(e, t, "linePrefix");
  }
}
const an = {
  name: "thematicBreak",
  tokenize: Ku
};
function Ku(e, t, n) {
  let i = 0, r;
  return s;
  function s(u) {
    return e.enter("thematicBreak"), a(u);
  }
  function a(u) {
    return r = u, o(u);
  }
  function o(u) {
    return u === r ? (e.enter("thematicBreakSequence"), l(u)) : i >= 3 && (u === null || R(u)) ? (e.exit("thematicBreak"), t(u)) : n(u);
  }
  function l(u) {
    return u === r ? (e.consume(u), i++, l) : (e.exit("thematicBreakSequence"), X(u) ? Y(e, o, "whitespace")(u) : o(u));
  }
}
const he = {
  name: "list",
  tokenize: tc,
  continuation: {
    tokenize: nc
  },
  exit: rc
}, Zu = {
  tokenize: sc,
  partial: !0
}, ec = {
  tokenize: ic,
  partial: !0
};
function tc(e, t, n) {
  const i = this, r = i.events[i.events.length - 1];
  let s = r && r[1].type === "linePrefix" ? r[2].sliceSerialize(r[1], !0).length : 0, a = 0;
  return o;
  function o(h) {
    const v = i.containerState.type || (h === 42 || h === 43 || h === 45 ? "listUnordered" : "listOrdered");
    if (v === "listUnordered" ? !i.containerState.marker || h === i.containerState.marker : Zn(h)) {
      if (i.containerState.type || (i.containerState.type = v, e.enter(v, {
        _container: !0
      })), v === "listUnordered")
        return e.enter("listItemPrefix"), h === 42 || h === 45 ? e.check(an, n, u)(h) : u(h);
      if (!i.interrupt || h === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), l(h);
    }
    return n(h);
  }
  function l(h) {
    return Zn(h) && ++a < 10 ? (e.consume(h), l) : (!i.interrupt || a < 2) && (i.containerState.marker ? h === i.containerState.marker : h === 41 || h === 46) ? (e.exit("listItemValue"), u(h)) : n(h);
  }
  function u(h) {
    return e.enter("listItemMarker"), e.consume(h), e.exit("listItemMarker"), i.containerState.marker = i.containerState.marker || h, e.check(
      Xt,
      // Can’t be empty when interrupting.
      i.interrupt ? n : c,
      e.attempt(Zu, m, p)
    );
  }
  function c(h) {
    return i.containerState.initialBlankLine = !0, s++, m(h);
  }
  function p(h) {
    return X(h) ? (e.enter("listItemPrefixWhitespace"), e.consume(h), e.exit("listItemPrefixWhitespace"), m) : n(h);
  }
  function m(h) {
    return i.containerState.size = s + i.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(h);
  }
}
function nc(e, t, n) {
  const i = this;
  return i.containerState._closeFlow = void 0, e.check(Xt, r, s);
  function r(o) {
    return i.containerState.furtherBlankLines = i.containerState.furtherBlankLines || i.containerState.initialBlankLine, Y(e, t, "listItemIndent", i.containerState.size + 1)(o);
  }
  function s(o) {
    return i.containerState.furtherBlankLines || !X(o) ? (i.containerState.furtherBlankLines = void 0, i.containerState.initialBlankLine = void 0, a(o)) : (i.containerState.furtherBlankLines = void 0, i.containerState.initialBlankLine = void 0, e.attempt(ec, t, a)(o));
  }
  function a(o) {
    return i.containerState._closeFlow = !0, i.interrupt = void 0, Y(e, e.attempt(he, t, n), "linePrefix", i.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o);
  }
}
function ic(e, t, n) {
  const i = this;
  return Y(e, r, "listItemIndent", i.containerState.size + 1);
  function r(s) {
    const a = i.events[i.events.length - 1];
    return a && a[1].type === "listItemIndent" && a[2].sliceSerialize(a[1], !0).length === i.containerState.size ? t(s) : n(s);
  }
}
function rc(e) {
  e.exit(this.containerState.type);
}
function sc(e, t, n) {
  const i = this;
  return Y(e, r, "listItemPrefixWhitespace", i.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function r(s) {
    const a = i.events[i.events.length - 1];
    return !X(s) && a && a[1].type === "listItemPrefixWhitespace" ? t(s) : n(s);
  }
}
const nr = {
  name: "setextUnderline",
  tokenize: oc,
  resolveTo: ac
};
function ac(e, t) {
  let n = e.length, i, r, s;
  for (; n--; )
    if (e[n][0] === "enter") {
      if (e[n][1].type === "content") {
        i = n;
        break;
      }
      e[n][1].type === "paragraph" && (r = n);
    } else
      e[n][1].type === "content" && e.splice(n, 1), !s && e[n][1].type === "definition" && (s = n);
  const a = {
    type: "setextHeading",
    start: Object.assign({}, e[r][1].start),
    end: Object.assign({}, e[e.length - 1][1].end)
  };
  return e[r][1].type = "setextHeadingText", s ? (e.splice(r, 0, ["enter", a, t]), e.splice(s + 1, 0, ["exit", e[i][1], t]), e[i][1].end = Object.assign({}, e[s][1].end)) : e[i][1] = a, e.push(["exit", a, t]), e;
}
function oc(e, t, n) {
  const i = this;
  let r;
  return s;
  function s(u) {
    let c = i.events.length, p;
    for (; c--; )
      if (i.events[c][1].type !== "lineEnding" && i.events[c][1].type !== "linePrefix" && i.events[c][1].type !== "content") {
        p = i.events[c][1].type === "paragraph";
        break;
      }
    return !i.parser.lazy[i.now().line] && (i.interrupt || p) ? (e.enter("setextHeadingLine"), r = u, a(u)) : n(u);
  }
  function a(u) {
    return e.enter("setextHeadingLineSequence"), o(u);
  }
  function o(u) {
    return u === r ? (e.consume(u), o) : (e.exit("setextHeadingLineSequence"), X(u) ? Y(e, l, "lineSuffix")(u) : l(u));
  }
  function l(u) {
    return u === null || R(u) ? (e.exit("setextHeadingLine"), t(u)) : n(u);
  }
}
const lc = {
  tokenize: pc,
  partial: !0
}, ir = "https://github.com/micromark/micromark-extension-mdxjs-esm", uc = /* @__PURE__ */ new Set(["ExportAllDeclaration", "ExportDefaultDeclaration", "ExportNamedDeclaration", "ImportDeclaration"]);
function cc(e) {
  const t = {
    tokenize: r,
    concrete: !0
  };
  if (!e || !e.acorn || !e.acorn.parse)
    throw new Error("Expected an `acorn` instance passed in as `options.acorn`");
  const n = e.acorn, i = Object.assign({
    ecmaVersion: 2024,
    sourceType: "module"
  }, e.acornOptions, {
    locations: !0
  });
  return {
    flow: {
      101: t,
      105: t
    }
  };
  function r(s, a, o) {
    const l = this, u = l.parser.definedModuleSpecifiers || (l.parser.definedModuleSpecifiers = []), c = this.events.length + 1;
    let p = "";
    return l.interrupt ? o : m;
    function m(A) {
      return l.now().column > 1 ? o(A) : (s.enter("mdxjsEsm"), s.enter("mdxjsEsmData"), s.consume(A), p += String.fromCharCode(A), h);
    }
    function h(A) {
      return Fe(A) ? (s.consume(A), p += String.fromCharCode(A), h) : (p === "import" || p === "export") && A === 32 ? (s.consume(A), v) : o(A);
    }
    function v(A) {
      return A === null || R(A) ? (s.exit("mdxjsEsmData"), b(A)) : (s.consume(A), v);
    }
    function b(A) {
      return A === null ? y(A) : R(A) ? s.check(lc, y, I)(A) : (s.enter("mdxjsEsmData"), v(A));
    }
    function I(A) {
      return s.enter("lineEnding"), s.consume(A), s.exit("lineEnding"), b;
    }
    function y(A) {
      const E = Bs(l.events.slice(c), {
        acorn: n,
        acornOptions: i,
        tokenTypes: ["mdxjsEsmData"],
        prefix: u.length > 0 ? "var " + u.join(",") + `
` : ""
      });
      if (E.error) {
        if (A !== null && E.swallow)
          return I(A);
        const S = new G("Could not parse import/exports with acorn", {
          cause: E.error,
          place: {
            line: E.error.loc.line,
            column: E.error.loc.column + 1,
            offset: E.error.pos
          },
          ruleId: "acorn",
          source: "micromark-extension-mdxjs-esm"
        });
        throw S.url = ir + "#could-not-parse-importexports-with-acorn", S;
      }
      u.length > 0 && E.estree.body.shift();
      let T = -1;
      for (; ++T < E.estree.body.length; ) {
        const S = E.estree.body[T];
        if (!uc.has(S.type)) {
          const x = new G("Unexpected `" + S.type + "` in code: only import/exports are supported", {
            place: qe(S),
            ruleId: "non-esm",
            source: "micromark-extension-mdxjs-esm"
          });
          throw x.url = ir + "#unexpected-type-in-code-only-importexports-are-supported", x;
        }
        if (S.type === "ImportDeclaration" && !l.interrupt) {
          let x = -1;
          for (; ++x < S.specifiers.length; ) {
            const g = S.specifiers[x];
            u.push(g.local.name);
          }
        }
      }
      return Object.assign(s.exit("mdxjsEsm"), e.addResult ? {
        estree: E.estree
      } : void 0), a(A);
    }
  }
}
function pc(e, t, n) {
  return i;
  function i(r) {
    return e.enter("lineEndingBlank"), e.consume(r), e.exit("lineEndingBlank"), e.attempt(Xt, t, n);
  }
}
const rr = {}.hasOwnProperty;
function Qs(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    hc(t, e[n]);
  return t;
}
function hc(e, t) {
  let n;
  for (n in t) {
    const r = (rr.call(e, n) ? e[n] : void 0) || (e[n] = {}), s = t[n];
    let a;
    if (s)
      for (a in s) {
        rr.call(r, a) || (r[a] = []);
        const o = s[a];
        fc(
          // @ts-expect-error Looks like a list.
          r[a],
          Array.isArray(o) ? o : o ? [o] : []
        );
      }
  }
}
function fc(e, t) {
  let n = -1;
  const i = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : i).push(t[n]);
  $e(e, 0, 0, i);
}
function mc(e) {
  const t = Object.assign(
    {
      acorn: ie.extend(yl()),
      acornOptions: { ecmaVersion: 2024, sourceType: "module" },
      addResult: !0
    },
    e
  );
  return Qs([
    cc(t),
    Ml(t),
    ql(t),
    Hl()
  ]);
}
const dc = {};
function xc(e) {
  const t = (
    /** @type {Processor} */
    this
  ), n = e || dc, i = t.data(), r = i.micromarkExtensions || (i.micromarkExtensions = []), s = i.fromMarkdownExtensions || (i.fromMarkdownExtensions = []), a = i.toMarkdownExtensions || (i.toMarkdownExtensions = []);
  r.push(mc(n)), s.push(_o()), a.push(To(n));
}
const gc = {};
function yc(e, t) {
  const n = gc, i = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, r = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return Ys(e, i, r);
}
function Ys(e, t, n) {
  if (bc(e)) {
    if ("value" in e)
      return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return sr(e.children, t, n);
  }
  return Array.isArray(e) ? sr(e, t, n) : "";
}
function sr(e, t, n) {
  const i = [];
  let r = -1;
  for (; ++r < e.length; )
    i[r] = Ys(e[r], t, n);
  return i.join("");
}
function bc(e) {
  return !!(e && typeof e == "object");
}
function Ks(e, t) {
  const n = Number.parseInt(e, t);
  return (
    // C0 except for HT, LF, FF, CR, space.
    n < 9 || n === 11 || n > 13 && n < 32 || // Control character (DEL) of C0, and C1 controls.
    n > 126 && n < 160 || // Lone high surrogates and low surrogates.
    n > 55295 && n < 57344 || // Noncharacters.
    n > 64975 && n < 65008 || /* eslint-disable no-bitwise */
    (n & 65535) === 65535 || (n & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    n > 1114111 ? "�" : String.fromCodePoint(n)
  );
}
function Et(e) {
  const t = [];
  let n = -1, i = 0, r = 0;
  for (; ++n < e.length; ) {
    const s = e.charCodeAt(n);
    let a = "";
    if (s === 37 && ye(e.charCodeAt(n + 1)) && ye(e.charCodeAt(n + 2)))
      r = 2;
    else if (s < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(s)) || (a = String.fromCharCode(s));
    else if (s > 55295 && s < 57344) {
      const o = e.charCodeAt(n + 1);
      s < 56320 && o > 56319 && o < 57344 ? (a = String.fromCharCode(s, o), r = 1) : a = "�";
    } else
      a = String.fromCharCode(s);
    a && (t.push(e.slice(i, n), encodeURIComponent(a)), i = n + r + 1, a = ""), r && (n += r, r = 0);
  }
  return t.join("") + e.slice(i);
}
const wc = {
  tokenize: kc
};
function kc(e) {
  const t = e.attempt(
    this.parser.constructs.contentInitial,
    i,
    r
  );
  let n;
  return t;
  function i(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), Y(e, t, "linePrefix");
  }
  function r(o) {
    return e.enter("paragraph"), s(o);
  }
  function s(o) {
    const l = e.enter("chunkText", {
      contentType: "text",
      previous: n
    });
    return n && (n.next = l), n = l, a(o);
  }
  function a(o) {
    if (o === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(o);
      return;
    }
    return R(o) ? (e.consume(o), e.exit("chunkText"), s) : (e.consume(o), a);
  }
}
const vc = {
  tokenize: Sc
}, ar = {
  tokenize: Ec
};
function Sc(e) {
  const t = this, n = [];
  let i = 0, r, s, a;
  return o;
  function o(E) {
    if (i < n.length) {
      const T = n[i];
      return t.containerState = T[1], e.attempt(
        T[0].continuation,
        l,
        u
      )(E);
    }
    return u(E);
  }
  function l(E) {
    if (i++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, r && A();
      const T = t.events.length;
      let S = T, x;
      for (; S--; )
        if (t.events[S][0] === "exit" && t.events[S][1].type === "chunkFlow") {
          x = t.events[S][1].end;
          break;
        }
      y(i);
      let g = T;
      for (; g < t.events.length; )
        t.events[g][1].end = Object.assign({}, x), g++;
      return $e(
        t.events,
        S + 1,
        0,
        t.events.slice(T)
      ), t.events.length = g, u(E);
    }
    return o(E);
  }
  function u(E) {
    if (i === n.length) {
      if (!r)
        return m(E);
      if (r.currentConstruct && r.currentConstruct.concrete)
        return v(E);
      t.interrupt = !!(r.currentConstruct && !r._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(
      ar,
      c,
      p
    )(E);
  }
  function c(E) {
    return r && A(), y(i), m(E);
  }
  function p(E) {
    return t.parser.lazy[t.now().line] = i !== n.length, a = t.now().offset, v(E);
  }
  function m(E) {
    return t.containerState = {}, e.attempt(
      ar,
      h,
      v
    )(E);
  }
  function h(E) {
    return i++, n.push([t.currentConstruct, t.containerState]), m(E);
  }
  function v(E) {
    if (E === null) {
      r && A(), y(0), e.consume(E);
      return;
    }
    return r = r || t.parser.flow(t.now()), e.enter("chunkFlow", {
      contentType: "flow",
      previous: s,
      _tokenizer: r
    }), b(E);
  }
  function b(E) {
    if (E === null) {
      I(e.exit("chunkFlow"), !0), y(0), e.consume(E);
      return;
    }
    return R(E) ? (e.consume(E), I(e.exit("chunkFlow")), i = 0, t.interrupt = void 0, o) : (e.consume(E), b);
  }
  function I(E, T) {
    const S = t.sliceStream(E);
    if (T && S.push(null), E.previous = s, s && (s.next = E), s = E, r.defineSkip(E.start), r.write(S), t.parser.lazy[E.start.line]) {
      let x = r.events.length;
      for (; x--; )
        if (
          // The token starts before the line ending…
          r.events[x][1].start.offset < a && // …and either is not ended yet…
          (!r.events[x][1].end || // …or ends after it.
          r.events[x][1].end.offset > a)
        )
          return;
      const g = t.events.length;
      let C = g, P, O;
      for (; C--; )
        if (t.events[C][0] === "exit" && t.events[C][1].type === "chunkFlow") {
          if (P) {
            O = t.events[C][1].end;
            break;
          }
          P = !0;
        }
      for (y(i), x = g; x < t.events.length; )
        t.events[x][1].end = Object.assign({}, O), x++;
      $e(
        t.events,
        C + 1,
        0,
        t.events.slice(g)
      ), t.events.length = x;
    }
  }
  function y(E) {
    let T = n.length;
    for (; T-- > E; ) {
      const S = n[T];
      t.containerState = S[1], S[0].exit.call(t, e);
    }
    n.length = E;
  }
  function A() {
    r.write([null]), s = void 0, r = void 0, t.containerState._closeFlow = void 0;
  }
}
function Ec(e, t, n) {
  return Y(
    e,
    e.attempt(this.parser.constructs.document, t, n),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
  );
}
const Cc = {
  tokenize: Ic
};
function Ic(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    Xt,
    i,
    // Try to parse initial flow (essentially, only code).
    e.attempt(
      this.parser.constructs.flowInitial,
      r,
      Y(
        e,
        e.attempt(
          this.parser.constructs.flow,
          r,
          e.attempt(mu, r)
        ),
        "linePrefix"
      )
    )
  );
  return n;
  function i(s) {
    if (s === null) {
      e.consume(s);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(s), e.exit("lineEndingBlank"), t.currentConstruct = void 0, n;
  }
  function r(s) {
    if (s === null) {
      e.consume(s);
      return;
    }
    return e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), t.currentConstruct = void 0, n;
  }
}
const Ac = {
  resolveAll: ea()
}, _c = Zs("string"), Tc = Zs("text");
function Zs(e) {
  return {
    tokenize: t,
    resolveAll: ea(
      e === "text" ? Pc : void 0
    )
  };
  function t(n) {
    const i = this, r = this.parser.constructs[e], s = n.attempt(r, a, o);
    return a;
    function a(c) {
      return u(c) ? s(c) : o(c);
    }
    function o(c) {
      if (c === null) {
        n.consume(c);
        return;
      }
      return n.enter("data"), n.consume(c), l;
    }
    function l(c) {
      return u(c) ? (n.exit("data"), s(c)) : (n.consume(c), l);
    }
    function u(c) {
      if (c === null)
        return !0;
      const p = r[c];
      let m = -1;
      if (p)
        for (; ++m < p.length; ) {
          const h = p[m];
          if (!h.previous || h.previous.call(i, i.previous))
            return !0;
        }
      return !1;
    }
  }
}
function ea(e) {
  return t;
  function t(n, i) {
    let r = -1, s;
    for (; ++r <= n.length; )
      s === void 0 ? n[r] && n[r][1].type === "data" && (s = r, r++) : (!n[r] || n[r][1].type !== "data") && (r !== s + 2 && (n[s][1].end = n[r - 1][1].end, n.splice(s + 2, r - s - 2), r = s + 2), s = void 0);
    return e ? e(n, i) : n;
  }
}
function Pc(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if ((n === e.length || e[n][1].type === "lineEnding") && e[n - 1][1].type === "data") {
      const i = e[n - 1][1], r = t.sliceStream(i);
      let s = r.length, a = -1, o = 0, l;
      for (; s--; ) {
        const u = r[s];
        if (typeof u == "string") {
          for (a = u.length; u.charCodeAt(a - 1) === 32; )
            o++, a--;
          if (a) break;
          a = -1;
        } else if (u === -2)
          l = !0, o++;
        else if (u !== -1) {
          s++;
          break;
        }
      }
      if (o) {
        const u = {
          type: n === e.length || l || o < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            line: i.end.line,
            column: i.end.column - o,
            offset: i.end.offset - o,
            _index: i.start._index + s,
            _bufferIndex: s ? a : i.start._bufferIndex + a
          },
          end: Object.assign({}, i.end)
        };
        i.end = Object.assign({}, u.start), i.start.offset === i.end.offset ? Object.assign(i, u) : (e.splice(
          n,
          0,
          ["enter", u, t],
          ["exit", u, t]
        ), n += 2);
      }
      n++;
    }
  return e;
}
function Nc(e, t, n) {
  let i = Object.assign(
    n ? Object.assign({}, n) : {
      line: 1,
      column: 1,
      offset: 0
    },
    {
      _index: 0,
      _bufferIndex: -1
    }
  );
  const r = {}, s = [];
  let a = [], o = [];
  const l = {
    consume: A,
    enter: E,
    exit: T,
    attempt: g(S),
    check: g(x),
    interrupt: g(x, {
      interrupt: !0
    })
  }, u = {
    previous: null,
    code: null,
    containerState: {},
    events: [],
    parser: e,
    sliceStream: h,
    sliceSerialize: m,
    now: v,
    defineSkip: b,
    write: p
  };
  let c = t.tokenize.call(u, l);
  return t.resolveAll && s.push(t), u;
  function p(D) {
    return a = Ee(a, D), I(), a[a.length - 1] !== null ? [] : (C(t, 0), u.events = xi(s, u.events, u), u.events);
  }
  function m(D, L) {
    return Fc(h(D), L);
  }
  function h(D) {
    return Lc(a, D);
  }
  function v() {
    const { line: D, column: L, offset: $, _index: K, _bufferIndex: z } = i;
    return {
      line: D,
      column: L,
      offset: $,
      _index: K,
      _bufferIndex: z
    };
  }
  function b(D) {
    r[D.line] = D.column, O();
  }
  function I() {
    let D;
    for (; i._index < a.length; ) {
      const L = a[i._index];
      if (typeof L == "string")
        for (D = i._index, i._bufferIndex < 0 && (i._bufferIndex = 0); i._index === D && i._bufferIndex < L.length; )
          y(L.charCodeAt(i._bufferIndex));
      else
        y(L);
    }
  }
  function y(D) {
    c = c(D);
  }
  function A(D) {
    R(D) ? (i.line++, i.column = 1, i.offset += D === -3 ? 2 : 1, O()) : D !== -1 && (i.column++, i.offset++), i._bufferIndex < 0 ? i._index++ : (i._bufferIndex++, i._bufferIndex === a[i._index].length && (i._bufferIndex = -1, i._index++)), u.previous = D;
  }
  function E(D, L) {
    const $ = L || {};
    return $.type = D, $.start = v(), u.events.push(["enter", $, u]), o.push($), $;
  }
  function T(D) {
    const L = o.pop();
    return L.end = v(), u.events.push(["exit", L, u]), L;
  }
  function S(D, L) {
    C(D, L.from);
  }
  function x(D, L) {
    L.restore();
  }
  function g(D, L) {
    return $;
    function $(K, z, te) {
      let U, oe, Te, w;
      return Array.isArray(K) ? Pe(K) : "tokenize" in K ? (
        // @ts-expect-error Looks like a construct.
        Pe([K])
      ) : fe(K);
      function fe(se) {
        return it;
        function it(Oe) {
          const Je = Oe !== null && se[Oe], Ge = Oe !== null && se.null, de = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Je) ? Je : Je ? [Je] : [],
            ...Array.isArray(Ge) ? Ge : Ge ? [Ge] : []
          ];
          return Pe(de)(Oe);
        }
      }
      function Pe(se) {
        return U = se, oe = 0, se.length === 0 ? te : k(se[oe]);
      }
      function k(se) {
        return it;
        function it(Oe) {
          return w = P(), Te = se, se.partial || (u.currentConstruct = se), se.name && u.parser.constructs.disable.null.includes(se.name) ? De() : se.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            L ? Object.assign(Object.create(u), L) : u,
            l,
            me,
            De
          )(Oe);
        }
      }
      function me(se) {
        return D(Te, w), z;
      }
      function De(se) {
        return w.restore(), ++oe < U.length ? k(U[oe]) : te;
      }
    }
  }
  function C(D, L) {
    D.resolveAll && !s.includes(D) && s.push(D), D.resolve && $e(
      u.events,
      L,
      u.events.length - L,
      D.resolve(u.events.slice(L), u)
    ), D.resolveTo && (u.events = D.resolveTo(u.events, u));
  }
  function P() {
    const D = v(), L = u.previous, $ = u.currentConstruct, K = u.events.length, z = Array.from(o);
    return {
      restore: te,
      from: K
    };
    function te() {
      i = D, u.previous = L, u.currentConstruct = $, u.events.length = K, o = z, O();
    }
  }
  function O() {
    i.line in r && i.column < 2 && (i.column = r[i.line], i.offset += r[i.line] - 1);
  }
}
function Lc(e, t) {
  const n = t.start._index, i = t.start._bufferIndex, r = t.end._index, s = t.end._bufferIndex;
  let a;
  if (n === r)
    a = [e[n].slice(i, s)];
  else {
    if (a = e.slice(n, r), i > -1) {
      const o = a[0];
      typeof o == "string" ? a[0] = o.slice(i) : a.shift();
    }
    s > 0 && a.push(e[r].slice(0, s));
  }
  return a;
}
function Fc(e, t) {
  let n = -1;
  const i = [];
  let r;
  for (; ++n < e.length; ) {
    const s = e[n];
    let a;
    if (typeof s == "string")
      a = s;
    else
      switch (s) {
        case -5: {
          a = "\r";
          break;
        }
        case -4: {
          a = `
`;
          break;
        }
        case -3: {
          a = `\r
`;
          break;
        }
        case -2: {
          a = t ? " " : "	";
          break;
        }
        case -1: {
          if (!t && r) continue;
          a = " ";
          break;
        }
        default:
          a = String.fromCharCode(s);
      }
    r = s === -2, i.push(a);
  }
  return i.join("");
}
const Dc = {
  42: he,
  43: he,
  45: he,
  48: he,
  49: he,
  50: he,
  51: he,
  52: he,
  53: he,
  54: he,
  55: he,
  56: he,
  57: he,
  62: Us
}, Oc = {
  91: bu
}, Mc = {
  [-2]: Rn,
  [-1]: Rn,
  32: Rn
}, Rc = {
  35: Cu,
  42: an,
  45: [nr, an],
  60: Tu,
  61: nr,
  95: an,
  96: er,
  126: er
}, jc = {
  38: qs,
  92: Xs
}, Vc = {
  [-5]: jn,
  [-4]: jn,
  [-3]: jn,
  33: $u,
  38: qs,
  42: ei,
  60: [Gl, Mu],
  91: Gu,
  92: [Su, Xs],
  93: gi,
  95: ei,
  96: lu
}, Bc = {
  null: [ei, Ac]
}, Jc = {
  null: [42, 95]
}, zc = {
  null: []
}, Uc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: Jc,
  contentInitial: Oc,
  disable: zc,
  document: Dc,
  flow: Rc,
  flowInitial: Mc,
  insideSpan: Bc,
  string: jc,
  text: Vc
}, Symbol.toStringTag, { value: "Module" }));
function Xc(e) {
  const n = (
    /** @type {FullNormalizedExtension} */
    Qs([Uc, ...(e || {}).extensions || []])
  ), i = {
    defined: [],
    lazy: {},
    constructs: n,
    content: r(wc),
    document: r(vc),
    flow: r(Cc),
    string: r(_c),
    text: r(Tc)
  };
  return i;
  function r(s) {
    return a;
    function a(o) {
      return Nc(i, s, o);
    }
  }
}
function qc(e) {
  for (; !Hs(e); )
    ;
  return e;
}
const or = /[\0\t\n\r]/g;
function Hc() {
  let e = 1, t = "", n = !0, i;
  return r;
  function r(s, a, o) {
    const l = [];
    let u, c, p, m, h;
    for (s = t + (typeof s == "string" ? s.toString() : new TextDecoder(a || void 0).decode(s)), p = 0, t = "", n && (s.charCodeAt(0) === 65279 && p++, n = void 0); p < s.length; ) {
      if (or.lastIndex = p, u = or.exec(s), m = u && u.index !== void 0 ? u.index : s.length, h = s.charCodeAt(m), !u) {
        t = s.slice(p);
        break;
      }
      if (h === 10 && p === m && i)
        l.push(-3), i = void 0;
      else
        switch (i && (l.push(-5), i = void 0), p < m && (l.push(s.slice(p, m)), e += m - p), h) {
          case 0: {
            l.push(65533), e++;
            break;
          }
          case 9: {
            for (c = Math.ceil(e / 4) * 4, l.push(-2); e++ < c; ) l.push(-1);
            break;
          }
          case 10: {
            l.push(-4), e = 1;
            break;
          }
          default:
            i = !0, e = 1;
        }
      p = m + 1;
    }
    return o && (i && l.push(-5), t && l.push(t), l.push(null)), l;
  }
}
const $c = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Wc(e) {
  return e.replace($c, Gc);
}
function Gc(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const r = n.charCodeAt(1), s = r === 120 || r === 88;
    return Ks(n.slice(s ? 2 : 1), s ? 16 : 10);
  }
  return Ot(n) || e;
}
const ta = {}.hasOwnProperty;
function Qc(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), Yc(n)(qc(Xc(n).document().write(Hc()(e, t, !0))));
}
function Yc(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: s(Qt),
      autolinkProtocol: P,
      autolinkEmail: P,
      atxHeading: s($t),
      blockQuote: s(Ge),
      characterEscape: P,
      characterReference: P,
      codeFenced: s(de),
      codeFencedFenceInfo: a,
      codeFencedFenceMeta: a,
      codeIndented: s(de, a),
      codeText: s(Cn, a),
      codeTextData: P,
      data: P,
      codeFlowValue: P,
      definition: s(Ht),
      definitionDestinationString: a,
      definitionLabelString: a,
      definitionTitleString: a,
      emphasis: s(In),
      hardBreakEscape: s(It),
      hardBreakTrailing: s(It),
      htmlFlow: s(Wt, a),
      htmlFlowData: P,
      htmlText: s(Wt, a),
      htmlTextData: P,
      image: s(Gt),
      label: a,
      link: s(Qt),
      listItem: s(Yt),
      listItemValue: m,
      listOrdered: s(ut, p),
      listUnordered: s(ut),
      paragraph: s(An),
      reference: k,
      referenceString: a,
      resourceDestinationString: a,
      resourceTitleString: a,
      setextHeading: s($t),
      strong: s(ct),
      thematicBreak: s(Kt)
    },
    exit: {
      atxHeading: l(),
      atxHeadingSequence: S,
      autolink: l(),
      autolinkEmail: Je,
      autolinkProtocol: Oe,
      blockQuote: l(),
      characterEscapeValue: O,
      characterReferenceMarkerHexadecimal: De,
      characterReferenceMarkerNumeric: De,
      characterReferenceValue: se,
      characterReference: it,
      codeFenced: l(I),
      codeFencedFence: b,
      codeFencedFenceInfo: h,
      codeFencedFenceMeta: v,
      codeFlowValue: O,
      codeIndented: l(y),
      codeText: l(z),
      codeTextData: O,
      data: O,
      definition: l(),
      definitionDestinationString: T,
      definitionLabelString: A,
      definitionTitleString: E,
      emphasis: l(),
      hardBreakEscape: l(L),
      hardBreakTrailing: l(L),
      htmlFlow: l($),
      htmlFlowData: O,
      htmlText: l(K),
      htmlTextData: O,
      image: l(U),
      label: Te,
      labelText: oe,
      lineEnding: D,
      link: l(te),
      listItem: l(),
      listOrdered: l(),
      listUnordered: l(),
      paragraph: l(),
      referenceString: me,
      resourceDestinationString: w,
      resourceTitleString: fe,
      resource: Pe,
      setextHeading: l(C),
      setextHeadingLineSequence: g,
      setextHeadingText: x,
      strong: l(),
      thematicBreak: l()
    }
  };
  na(t, (e || {}).mdastExtensions || []);
  const n = {};
  return i;
  function i(_) {
    let N = {
      type: "root",
      children: []
    };
    const d = {
      stack: [N],
      tokenStack: [],
      config: t,
      enter: o,
      exit: u,
      buffer: a,
      resume: c,
      data: n
    }, J = [];
    let Q = -1;
    for (; ++Q < _.length; )
      if (_[Q][1].type === "listOrdered" || _[Q][1].type === "listUnordered")
        if (_[Q][0] === "enter")
          J.push(Q);
        else {
          const ce = J.pop();
          Q = r(_, ce, Q);
        }
    for (Q = -1; ++Q < _.length; ) {
      const ce = t[_[Q][0]];
      ta.call(ce, _[Q][1].type) && ce[_[Q][1].type].call(Object.assign({
        sliceSerialize: _[Q][2].sliceSerialize
      }, d), _[Q][1]);
    }
    if (d.tokenStack.length > 0) {
      const ce = d.tokenStack[d.tokenStack.length - 1];
      (ce[1] || lr).call(d, void 0, ce[0]);
    }
    for (N.position = {
      start: Qe(_.length > 0 ? _[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: Qe(_.length > 0 ? _[_.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, Q = -1; ++Q < t.transforms.length; )
      N = t.transforms[Q](N) || N;
    return N;
  }
  function r(_, N, d) {
    let J = N - 1, Q = -1, ce = !1, rt, ze, At, _t;
    for (; ++J <= d; ) {
      const xe = _[J];
      switch (xe[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          xe[0] === "enter" ? Q++ : Q--, _t = void 0;
          break;
        }
        case "lineEndingBlank": {
          xe[0] === "enter" && (rt && !_t && !Q && !At && (At = J), _t = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          _t = void 0;
      }
      if (!Q && xe[0] === "enter" && xe[1].type === "listItemPrefix" || Q === -1 && xe[0] === "exit" && (xe[1].type === "listUnordered" || xe[1].type === "listOrdered")) {
        if (rt) {
          let pt = J;
          for (ze = void 0; pt--; ) {
            const Ue = _[pt];
            if (Ue[1].type === "lineEnding" || Ue[1].type === "lineEndingBlank") {
              if (Ue[0] === "exit") continue;
              ze && (_[ze][1].type = "lineEndingBlank", ce = !0), Ue[1].type = "lineEnding", ze = pt;
            } else if (!(Ue[1].type === "linePrefix" || Ue[1].type === "blockQuotePrefix" || Ue[1].type === "blockQuotePrefixWhitespace" || Ue[1].type === "blockQuoteMarker" || Ue[1].type === "listItemIndent")) break;
          }
          At && (!ze || At < ze) && (rt._spread = !0), rt.end = Object.assign({}, ze ? _[ze][1].start : xe[1].end), _.splice(ze || J, 0, ["exit", rt, xe[2]]), J++, d++;
        }
        if (xe[1].type === "listItemPrefix") {
          const pt = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, xe[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          rt = pt, _.splice(J, 0, ["enter", pt, xe[2]]), J++, d++, At = void 0, _t = !0;
        }
      }
    }
    return _[N][1]._spread = ce, d;
  }
  function s(_, N) {
    return d;
    function d(J) {
      o.call(this, _(J), J), N && N.call(this, J);
    }
  }
  function a() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function o(_, N, d) {
    this.stack[this.stack.length - 1].children.push(_), this.stack.push(_), this.tokenStack.push([N, d]), _.position = {
      start: Qe(N.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function l(_) {
    return N;
    function N(d) {
      _ && _.call(this, d), u.call(this, d);
    }
  }
  function u(_, N) {
    const d = this.stack.pop(), J = this.tokenStack.pop();
    if (J)
      J[0].type !== _.type && (N ? N.call(this, _, J[0]) : (J[1] || lr).call(this, _, J[0]));
    else throw new Error("Cannot close `" + _.type + "` (" + Ie({
      start: _.start,
      end: _.end
    }) + "): it’s not open");
    d.position.end = Qe(_.end);
  }
  function c() {
    return yc(this.stack.pop());
  }
  function p() {
    this.data.expectingFirstListItemValue = !0;
  }
  function m(_) {
    if (this.data.expectingFirstListItemValue) {
      const N = this.stack[this.stack.length - 2];
      N.start = Number.parseInt(this.sliceSerialize(_), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function h() {
    const _ = this.resume(), N = this.stack[this.stack.length - 1];
    N.lang = _;
  }
  function v() {
    const _ = this.resume(), N = this.stack[this.stack.length - 1];
    N.meta = _;
  }
  function b() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function I() {
    const _ = this.resume(), N = this.stack[this.stack.length - 1];
    N.value = _.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function y() {
    const _ = this.resume(), N = this.stack[this.stack.length - 1];
    N.value = _.replace(/(\r?\n|\r)$/g, "");
  }
  function A(_) {
    const N = this.resume(), d = this.stack[this.stack.length - 1];
    d.label = N, d.identifier = bt(this.sliceSerialize(_)).toLowerCase();
  }
  function E() {
    const _ = this.resume(), N = this.stack[this.stack.length - 1];
    N.title = _;
  }
  function T() {
    const _ = this.resume(), N = this.stack[this.stack.length - 1];
    N.url = _;
  }
  function S(_) {
    const N = this.stack[this.stack.length - 1];
    if (!N.depth) {
      const d = this.sliceSerialize(_).length;
      N.depth = d;
    }
  }
  function x() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function g(_) {
    const N = this.stack[this.stack.length - 1];
    N.depth = this.sliceSerialize(_).codePointAt(0) === 61 ? 1 : 2;
  }
  function C() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function P(_) {
    const d = this.stack[this.stack.length - 1].children;
    let J = d[d.length - 1];
    (!J || J.type !== "text") && (J = ne(), J.position = {
      start: Qe(_.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, d.push(J)), this.stack.push(J);
  }
  function O(_) {
    const N = this.stack.pop();
    N.value += this.sliceSerialize(_), N.position.end = Qe(_.end);
  }
  function D(_) {
    const N = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const d = N.children[N.children.length - 1];
      d.position.end = Qe(_.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(N.type) && (P.call(this, _), O.call(this, _));
  }
  function L() {
    this.data.atHardBreak = !0;
  }
  function $() {
    const _ = this.resume(), N = this.stack[this.stack.length - 1];
    N.value = _;
  }
  function K() {
    const _ = this.resume(), N = this.stack[this.stack.length - 1];
    N.value = _;
  }
  function z() {
    const _ = this.resume(), N = this.stack[this.stack.length - 1];
    N.value = _;
  }
  function te() {
    const _ = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const N = this.data.referenceType || "shortcut";
      _.type += "Reference", _.referenceType = N, delete _.url, delete _.title;
    } else
      delete _.identifier, delete _.label;
    this.data.referenceType = void 0;
  }
  function U() {
    const _ = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const N = this.data.referenceType || "shortcut";
      _.type += "Reference", _.referenceType = N, delete _.url, delete _.title;
    } else
      delete _.identifier, delete _.label;
    this.data.referenceType = void 0;
  }
  function oe(_) {
    const N = this.sliceSerialize(_), d = this.stack[this.stack.length - 2];
    d.label = Wc(N), d.identifier = bt(N).toLowerCase();
  }
  function Te() {
    const _ = this.stack[this.stack.length - 1], N = this.resume(), d = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, d.type === "link") {
      const J = _.children;
      d.children = J;
    } else
      d.alt = N;
  }
  function w() {
    const _ = this.resume(), N = this.stack[this.stack.length - 1];
    N.url = _;
  }
  function fe() {
    const _ = this.resume(), N = this.stack[this.stack.length - 1];
    N.title = _;
  }
  function Pe() {
    this.data.inReference = void 0;
  }
  function k() {
    this.data.referenceType = "collapsed";
  }
  function me(_) {
    const N = this.resume(), d = this.stack[this.stack.length - 1];
    d.label = N, d.identifier = bt(this.sliceSerialize(_)).toLowerCase(), this.data.referenceType = "full";
  }
  function De(_) {
    this.data.characterReferenceType = _.type;
  }
  function se(_) {
    const N = this.sliceSerialize(_), d = this.data.characterReferenceType;
    let J;
    d ? (J = Ks(N, d === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : J = Ot(N);
    const Q = this.stack[this.stack.length - 1];
    Q.value += J;
  }
  function it(_) {
    const N = this.stack.pop();
    N.position.end = Qe(_.end);
  }
  function Oe(_) {
    O.call(this, _);
    const N = this.stack[this.stack.length - 1];
    N.url = this.sliceSerialize(_);
  }
  function Je(_) {
    O.call(this, _);
    const N = this.stack[this.stack.length - 1];
    N.url = "mailto:" + this.sliceSerialize(_);
  }
  function Ge() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function de() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function Cn() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function Ht() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function In() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function $t() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function It() {
    return {
      type: "break"
    };
  }
  function Wt() {
    return {
      type: "html",
      value: ""
    };
  }
  function Gt() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function Qt() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function ut(_) {
    return {
      type: "list",
      ordered: _.type === "listOrdered",
      start: null,
      spread: _._spread,
      children: []
    };
  }
  function Yt(_) {
    return {
      type: "listItem",
      spread: _._spread,
      checked: null,
      children: []
    };
  }
  function An() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function ct() {
    return {
      type: "strong",
      children: []
    };
  }
  function ne() {
    return {
      type: "text",
      value: ""
    };
  }
  function Kt() {
    return {
      type: "thematicBreak"
    };
  }
}
function Qe(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function na(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const i = t[n];
    Array.isArray(i) ? na(e, i) : Kc(e, i);
  }
}
function Kc(e, t) {
  let n;
  for (n in t)
    if (ta.call(t, n))
      switch (n) {
        case "canContainEols": {
          const i = t[n];
          i && e[n].push(...i);
          break;
        }
        case "transforms": {
          const i = t[n];
          i && e[n].push(...i);
          break;
        }
        case "enter":
        case "exit": {
          const i = t[n];
          i && Object.assign(e[n], i);
          break;
        }
      }
}
function lr(e, t) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + Ie({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + Ie({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + Ie({
    start: t.start,
    end: t.end
  }) + ") is still open");
}
function Zc(e) {
  const t = this;
  t.parser = n;
  function n(i) {
    return Qc(i, {
      ...t.data("settings"),
      ...e,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: t.data("micromarkExtensions") || [],
      mdastExtensions: t.data("fromMarkdownExtensions") || []
    });
  }
}
function ep(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function tp(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function np(e, t) {
  const n = t.value ? t.value + `
` : "", i = {};
  t.lang && (i.className = ["language-" + t.lang]);
  let r = {
    type: "element",
    tagName: "code",
    properties: i,
    children: [{ type: "text", value: n }]
  };
  return t.meta && (r.data = { meta: t.meta }), e.patch(t, r), r = e.applyData(t, r), r = { type: "element", tagName: "pre", properties: {}, children: [r] }, e.patch(t, r), r;
}
function ip(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function rp(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function sp(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", i = String(t.identifier).toUpperCase(), r = Et(i.toLowerCase()), s = e.footnoteOrder.indexOf(i);
  let a, o = e.footnoteCounts.get(i);
  o === void 0 ? (o = 0, e.footnoteOrder.push(i), a = e.footnoteOrder.length) : a = s + 1, o += 1, e.footnoteCounts.set(i, o);
  const l = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + n + "fn-" + r,
      id: n + "fnref-" + r + (o > 1 ? "-" + o : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(a) }]
  };
  e.patch(t, l);
  const u = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [l]
  };
  return e.patch(t, u), e.applyData(t, u);
}
function ap(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function op(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}
function ia(e, t) {
  const n = t.referenceType;
  let i = "]";
  if (n === "collapsed" ? i += "[]" : n === "full" && (i += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + i }];
  const r = e.all(t), s = r[0];
  s && s.type === "text" ? s.value = "[" + s.value : r.unshift({ type: "text", value: "[" });
  const a = r[r.length - 1];
  return a && a.type === "text" ? a.value += i : r.push({ type: "text", value: i }), r;
}
function lp(e, t) {
  const n = String(t.identifier).toUpperCase(), i = e.definitionById.get(n);
  if (!i)
    return ia(e, t);
  const r = { src: Et(i.url || ""), alt: t.alt };
  i.title !== null && i.title !== void 0 && (r.title = i.title);
  const s = { type: "element", tagName: "img", properties: r, children: [] };
  return e.patch(t, s), e.applyData(t, s);
}
function up(e, t) {
  const n = { src: Et(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const i = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, i), e.applyData(t, i);
}
function cp(e, t) {
  const n = { type: "text", value: t.value.replace(/\r?\n|\r/g, " ") };
  e.patch(t, n);
  const i = {
    type: "element",
    tagName: "code",
    properties: {},
    children: [n]
  };
  return e.patch(t, i), e.applyData(t, i);
}
function pp(e, t) {
  const n = String(t.identifier).toUpperCase(), i = e.definitionById.get(n);
  if (!i)
    return ia(e, t);
  const r = { href: Et(i.url || "") };
  i.title !== null && i.title !== void 0 && (r.title = i.title);
  const s = {
    type: "element",
    tagName: "a",
    properties: r,
    children: e.all(t)
  };
  return e.patch(t, s), e.applyData(t, s);
}
function hp(e, t) {
  const n = { href: Et(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const i = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t)
  };
  return e.patch(t, i), e.applyData(t, i);
}
function fp(e, t, n) {
  const i = e.all(t), r = n ? mp(n) : ra(t), s = {}, a = [];
  if (typeof t.checked == "boolean") {
    const c = i[0];
    let p;
    c && c.type === "element" && c.tagName === "p" ? p = c : (p = { type: "element", tagName: "p", properties: {}, children: [] }, i.unshift(p)), p.children.length > 0 && p.children.unshift({ type: "text", value: " " }), p.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: t.checked, disabled: !0 },
      children: []
    }), s.className = ["task-list-item"];
  }
  let o = -1;
  for (; ++o < i.length; ) {
    const c = i[o];
    (r || o !== 0 || c.type !== "element" || c.tagName !== "p") && a.push({ type: "text", value: `
` }), c.type === "element" && c.tagName === "p" && !r ? a.push(...c.children) : a.push(c);
  }
  const l = i[i.length - 1];
  l && (r || l.type !== "element" || l.tagName !== "p") && a.push({ type: "text", value: `
` });
  const u = { type: "element", tagName: "li", properties: s, children: a };
  return e.patch(t, u), e.applyData(t, u);
}
function mp(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let i = -1;
    for (; !t && ++i < n.length; )
      t = ra(n[i]);
  }
  return t;
}
function ra(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function dp(e, t) {
  const n = {}, i = e.all(t);
  let r = -1;
  for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++r < i.length; ) {
    const a = i[r];
    if (a.type === "element" && a.tagName === "li" && a.properties && Array.isArray(a.properties.className) && a.properties.className.includes("task-list-item")) {
      n.className = ["contains-task-list"];
      break;
    }
  }
  const s = {
    type: "element",
    tagName: t.ordered ? "ol" : "ul",
    properties: n,
    children: e.wrap(i, !0)
  };
  return e.patch(t, s), e.applyData(t, s);
}
function xp(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function gp(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function yp(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
const sa = oa("end"), aa = oa("start");
function oa(e) {
  return t;
  function t(n) {
    const i = n && n.position && n.position[e] || {};
    if (typeof i.line == "number" && i.line > 0 && typeof i.column == "number" && i.column > 0)
      return {
        line: i.line,
        column: i.column,
        offset: typeof i.offset == "number" && i.offset > -1 ? i.offset : void 0
      };
  }
}
function la(e) {
  const t = aa(e), n = sa(e);
  if (t && n)
    return { start: t, end: n };
}
function bp(e, t) {
  const n = e.all(t), i = n.shift(), r = [];
  if (i) {
    const a = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([i], !0)
    };
    e.patch(t.children[0], a), r.push(a);
  }
  if (n.length > 0) {
    const a = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: e.wrap(n, !0)
    }, o = aa(t.children[1]), l = sa(t.children[t.children.length - 1]);
    o && l && (a.position = { start: o, end: l }), r.push(a);
  }
  const s = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(r, !0)
  };
  return e.patch(t, s), e.applyData(t, s);
}
function wp(e, t, n) {
  const i = n ? n.children : void 0, s = (i ? i.indexOf(t) : 1) === 0 ? "th" : "td", a = n && n.type === "table" ? n.align : void 0, o = a ? a.length : t.children.length;
  let l = -1;
  const u = [];
  for (; ++l < o; ) {
    const p = t.children[l], m = {}, h = a ? a[l] : void 0;
    h && (m.align = h);
    let v = { type: "element", tagName: s, properties: m, children: [] };
    p && (v.children = e.all(p), e.patch(p, v), v = e.applyData(p, v)), u.push(v);
  }
  const c = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(u, !0)
  };
  return e.patch(t, c), e.applyData(t, c);
}
function kp(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
const ur = 9, cr = 32;
function vp(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let i = n.exec(t), r = 0;
  const s = [];
  for (; i; )
    s.push(
      pr(t.slice(r, i.index), r > 0, !0),
      i[0]
    ), r = i.index + i[0].length, i = n.exec(t);
  return s.push(pr(t.slice(r), r > 0, !1)), s.join("");
}
function pr(e, t, n) {
  let i = 0, r = e.length;
  if (t) {
    let s = e.codePointAt(i);
    for (; s === ur || s === cr; )
      i++, s = e.codePointAt(i);
  }
  if (n) {
    let s = e.codePointAt(r - 1);
    for (; s === ur || s === cr; )
      r--, s = e.codePointAt(r - 1);
  }
  return r > i ? e.slice(i, r) : "";
}
function Sp(e, t) {
  const n = { type: "text", value: vp(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function Ep(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const Cp = {
  blockquote: ep,
  break: tp,
  code: np,
  delete: ip,
  emphasis: rp,
  footnoteReference: sp,
  heading: ap,
  html: op,
  imageReference: lp,
  image: up,
  inlineCode: cp,
  linkReference: pp,
  link: hp,
  listItem: fp,
  list: dp,
  paragraph: xp,
  // @ts-expect-error: root is different, but hard to type.
  root: gp,
  strong: yp,
  table: bp,
  tableCell: kp,
  tableRow: wp,
  text: Sp,
  thematicBreak: Ep,
  toml: Zt,
  yaml: Zt,
  definition: Zt,
  footnoteDefinition: Zt
};
function Zt() {
}
const ua = -1, Sn = 0, mn = 1, dn = 2, yi = 3, bi = 4, wi = 5, ki = 6, ca = 7, pa = 8, hr = typeof self == "object" ? self : globalThis, Ip = (e, t) => {
  const n = (r, s) => (e.set(s, r), r), i = (r) => {
    if (e.has(r))
      return e.get(r);
    const [s, a] = t[r];
    switch (s) {
      case Sn:
      case ua:
        return n(a, r);
      case mn: {
        const o = n([], r);
        for (const l of a)
          o.push(i(l));
        return o;
      }
      case dn: {
        const o = n({}, r);
        for (const [l, u] of a)
          o[i(l)] = i(u);
        return o;
      }
      case yi:
        return n(new Date(a), r);
      case bi: {
        const { source: o, flags: l } = a;
        return n(new RegExp(o, l), r);
      }
      case wi: {
        const o = n(/* @__PURE__ */ new Map(), r);
        for (const [l, u] of a)
          o.set(i(l), i(u));
        return o;
      }
      case ki: {
        const o = n(/* @__PURE__ */ new Set(), r);
        for (const l of a)
          o.add(i(l));
        return o;
      }
      case ca: {
        const { name: o, message: l } = a;
        return n(new hr[o](l), r);
      }
      case pa:
        return n(BigInt(a), r);
      case "BigInt":
        return n(Object(BigInt(a)), r);
    }
    return n(new hr[s](a), r);
  };
  return i;
}, fr = (e) => Ip(/* @__PURE__ */ new Map(), e)(0), ft = "", { toString: Ap } = {}, { keys: _p } = Object, Nt = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [Sn, t];
  const n = Ap.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [mn, ft];
    case "Object":
      return [dn, ft];
    case "Date":
      return [yi, ft];
    case "RegExp":
      return [bi, ft];
    case "Map":
      return [wi, ft];
    case "Set":
      return [ki, ft];
  }
  return n.includes("Array") ? [mn, n] : n.includes("Error") ? [ca, n] : [dn, n];
}, en = ([e, t]) => e === Sn && (t === "function" || t === "symbol"), Tp = (e, t, n, i) => {
  const r = (a, o) => {
    const l = i.push(a) - 1;
    return n.set(o, l), l;
  }, s = (a) => {
    if (n.has(a))
      return n.get(a);
    let [o, l] = Nt(a);
    switch (o) {
      case Sn: {
        let c = a;
        switch (l) {
          case "bigint":
            o = pa, c = a.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + l);
            c = null;
            break;
          case "undefined":
            return r([ua], a);
        }
        return r([o, c], a);
      }
      case mn: {
        if (l)
          return r([l, [...a]], a);
        const c = [], p = r([o, c], a);
        for (const m of a)
          c.push(s(m));
        return p;
      }
      case dn: {
        if (l)
          switch (l) {
            case "BigInt":
              return r([l, a.toString()], a);
            case "Boolean":
            case "Number":
            case "String":
              return r([l, a.valueOf()], a);
          }
        if (t && "toJSON" in a)
          return s(a.toJSON());
        const c = [], p = r([o, c], a);
        for (const m of _p(a))
          (e || !en(Nt(a[m]))) && c.push([s(m), s(a[m])]);
        return p;
      }
      case yi:
        return r([o, a.toISOString()], a);
      case bi: {
        const { source: c, flags: p } = a;
        return r([o, { source: c, flags: p }], a);
      }
      case wi: {
        const c = [], p = r([o, c], a);
        for (const [m, h] of a)
          (e || !(en(Nt(m)) || en(Nt(h)))) && c.push([s(m), s(h)]);
        return p;
      }
      case ki: {
        const c = [], p = r([o, c], a);
        for (const m of a)
          (e || !en(Nt(m))) && c.push(s(m));
        return p;
      }
    }
    const { message: u } = a;
    return r([o, { name: l, message: u }], a);
  };
  return s;
}, mr = (e, { json: t, lossy: n } = {}) => {
  const i = [];
  return Tp(!(t || n), !!t, /* @__PURE__ */ new Map(), i)(e), i;
}, xn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? fr(mr(e, t)) : structuredClone(e)
) : (e, t) => fr(mr(e, t));
function Pp(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function Np(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function Lp(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || Pp, i = e.options.footnoteBackLabel || Np, r = e.options.footnoteLabel || "Footnotes", s = e.options.footnoteLabelTagName || "h2", a = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, o = [];
  let l = -1;
  for (; ++l < e.footnoteOrder.length; ) {
    const u = e.footnoteById.get(
      e.footnoteOrder[l]
    );
    if (!u)
      continue;
    const c = e.all(u), p = String(u.identifier).toUpperCase(), m = Et(p.toLowerCase());
    let h = 0;
    const v = [], b = e.footnoteCounts.get(p);
    for (; b !== void 0 && ++h <= b; ) {
      v.length > 0 && v.push({ type: "text", value: " " });
      let A = typeof n == "string" ? n : n(l, h);
      typeof A == "string" && (A = { type: "text", value: A }), v.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + m + (h > 1 ? "-" + h : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof i == "string" ? i : i(l, h),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(A) ? A : [A]
      });
    }
    const I = c[c.length - 1];
    if (I && I.type === "element" && I.tagName === "p") {
      const A = I.children[I.children.length - 1];
      A && A.type === "text" ? A.value += " " : I.children.push({ type: "text", value: " " }), I.children.push(...v);
    } else
      c.push(...v);
    const y = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + m },
      children: e.wrap(c, !0)
    };
    e.patch(u, y), o.push(y);
  }
  if (o.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: s,
          properties: {
            ...xn(a),
            id: "footnote-label"
          },
          children: [{ type: "text", value: r }]
        },
        { type: "text", value: `
` },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: e.wrap(o, !0)
        },
        { type: "text", value: `
` }
      ]
    };
}
const ha = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  function(e) {
    if (e == null)
      return Mp;
    if (typeof e == "function")
      return En(e);
    if (typeof e == "object")
      return Array.isArray(e) ? Fp(e) : Dp(e);
    if (typeof e == "string")
      return Op(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function Fp(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = ha(e[n]);
  return En(i);
  function i(...r) {
    let s = -1;
    for (; ++s < t.length; )
      if (t[s].apply(this, r)) return !0;
    return !1;
  }
}
function Dp(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return En(n);
  function n(i) {
    const r = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      i
    );
    let s;
    for (s in e)
      if (r[s] !== t[s]) return !1;
    return !0;
  }
}
function Op(e) {
  return En(t);
  function t(n) {
    return n && n.type === e;
  }
}
function En(e) {
  return t;
  function t(n, i, r) {
    return !!(Rp(n) && e.call(
      this,
      n,
      typeof i == "number" ? i : void 0,
      r || void 0
    ));
  }
}
function Mp() {
  return !0;
}
function Rp(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const fa = [], jp = !0, dr = !1, Vp = "skip";
function Bp(e, t, n, i) {
  let r;
  typeof t == "function" && typeof n != "function" ? (i = n, n = t) : r = t;
  const s = ha(r), a = i ? -1 : 1;
  o(e, void 0, [])();
  function o(l, u, c) {
    const p = (
      /** @type {Record<string, unknown>} */
      l && typeof l == "object" ? l : {}
    );
    if (typeof p.type == "string") {
      const h = (
        // `hast`
        typeof p.tagName == "string" ? p.tagName : (
          // `xast`
          typeof p.name == "string" ? p.name : void 0
        )
      );
      Object.defineProperty(m, "name", {
        value: "node (" + (l.type + (h ? "<" + h + ">" : "")) + ")"
      });
    }
    return m;
    function m() {
      let h = fa, v, b, I;
      if ((!t || s(l, u, c[c.length - 1] || void 0)) && (h = Jp(n(l, c)), h[0] === dr))
        return h;
      if ("children" in l && l.children) {
        const y = (
          /** @type {UnistParent} */
          l
        );
        if (y.children && h[0] !== Vp)
          for (b = (i ? y.children.length : -1) + a, I = c.concat(y); b > -1 && b < y.children.length; ) {
            const A = y.children[b];
            if (v = o(A, b, I)(), v[0] === dr)
              return v;
            b = typeof v[1] == "number" ? v[1] : b + a;
          }
      }
      return h;
    }
  }
}
function Jp(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [jp, e] : e == null ? fa : [e];
}
function vi(e, t, n, i) {
  let r, s, a;
  typeof t == "function" && typeof n != "function" ? (s = void 0, a = t, r = n) : (s = t, a = n, r = i), Bp(e, s, o, r);
  function o(l, u) {
    const c = u[u.length - 1], p = c ? c.children.indexOf(l) : void 0;
    return a(l, p, c);
  }
}
const ti = {}.hasOwnProperty, zp = {};
function Up(e, t) {
  const n = t || zp, i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), a = { ...Cp, ...n.handlers }, o = {
    all: u,
    applyData: qp,
    definitionById: i,
    footnoteById: r,
    footnoteCounts: s,
    footnoteOrder: [],
    handlers: a,
    one: l,
    options: n,
    patch: Xp,
    wrap: $p
  };
  return vi(e, function(c) {
    if (c.type === "definition" || c.type === "footnoteDefinition") {
      const p = c.type === "definition" ? i : r, m = String(c.identifier).toUpperCase();
      p.has(m) || p.set(m, c);
    }
  }), o;
  function l(c, p) {
    const m = c.type, h = o.handlers[m];
    if (ti.call(o.handlers, m) && h)
      return h(o, c, p);
    if (o.options.passThrough && o.options.passThrough.includes(m)) {
      if ("children" in c) {
        const { children: b, ...I } = c, y = xn(I);
        return y.children = o.all(c), y;
      }
      return xn(c);
    }
    return (o.options.unknownHandler || Hp)(o, c, p);
  }
  function u(c) {
    const p = [];
    if ("children" in c) {
      const m = c.children;
      let h = -1;
      for (; ++h < m.length; ) {
        const v = o.one(m[h], c);
        if (v) {
          if (h && m[h - 1].type === "break" && (!Array.isArray(v) && v.type === "text" && (v.value = xr(v.value)), !Array.isArray(v) && v.type === "element")) {
            const b = v.children[0];
            b && b.type === "text" && (b.value = xr(b.value));
          }
          Array.isArray(v) ? p.push(...v) : p.push(v);
        }
      }
    }
    return p;
  }
}
function Xp(e, t) {
  e.position && (t.position = la(e));
}
function qp(e, t) {
  let n = t;
  if (e && e.data) {
    const i = e.data.hName, r = e.data.hChildren, s = e.data.hProperties;
    if (typeof i == "string")
      if (n.type === "element")
        n.tagName = i;
      else {
        const a = "children" in n ? n.children : [n];
        n = { type: "element", tagName: i, properties: {}, children: a };
      }
    n.type === "element" && s && Object.assign(n.properties, xn(s)), "children" in n && n.children && r !== null && r !== void 0 && (n.children = r);
  }
  return n;
}
function Hp(e, t) {
  const n = t.data || {}, i = "value" in t && !(ti.call(n, "hProperties") || ti.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, i), e.applyData(t, i);
}
function $p(e, t) {
  const n = [];
  let i = -1;
  for (t && n.push({ type: "text", value: `
` }); ++i < e.length; )
    i && n.push({ type: "text", value: `
` }), n.push(e[i]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function xr(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function gr(e, t) {
  const n = Up(e, t), i = n.one(e, void 0), r = Lp(n), s = Array.isArray(i) ? { type: "root", children: i } : i || { type: "root", children: [] };
  return r && s.children.push({ type: "text", value: `
` }, r), s;
}
function Wp(e, t) {
  return e && "run" in e ? async function(n, i) {
    const r = (
      /** @type {HastRoot} */
      gr(n, { file: i, ...t })
    );
    await e.run(r, i);
  } : function(n, i) {
    return (
      /** @type {HastRoot} */
      gr(n, { file: i, ...e || t })
    );
  };
}
function yr(e) {
  if (e)
    throw e;
}
var on = Object.prototype.hasOwnProperty, ma = Object.prototype.toString, br = Object.defineProperty, wr = Object.getOwnPropertyDescriptor, kr = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : ma.call(t) === "[object Array]";
}, vr = function(t) {
  if (!t || ma.call(t) !== "[object Object]")
    return !1;
  var n = on.call(t, "constructor"), i = t.constructor && t.constructor.prototype && on.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !i)
    return !1;
  var r;
  for (r in t)
    ;
  return typeof r > "u" || on.call(t, r);
}, Sr = function(t, n) {
  br && n.name === "__proto__" ? br(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, Er = function(t, n) {
  if (n === "__proto__")
    if (on.call(t, n)) {
      if (wr)
        return wr(t, n).value;
    } else return;
  return t[n];
}, Gp = function e() {
  var t, n, i, r, s, a, o = arguments[0], l = 1, u = arguments.length, c = !1;
  for (typeof o == "boolean" && (c = o, o = arguments[1] || {}, l = 2), (o == null || typeof o != "object" && typeof o != "function") && (o = {}); l < u; ++l)
    if (t = arguments[l], t != null)
      for (n in t)
        i = Er(o, n), r = Er(t, n), o !== r && (c && r && (vr(r) || (s = kr(r))) ? (s ? (s = !1, a = i && kr(i) ? i : []) : a = i && vr(i) ? i : {}, Sr(o, { name: n, newValue: e(c, a, r) })) : typeof r < "u" && Sr(o, { name: n, newValue: r }));
  return o;
};
const Vn = /* @__PURE__ */ di(Gp);
function ni(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Qp() {
  const e = [], t = { run: n, use: i };
  return t;
  function n(...r) {
    let s = -1;
    const a = r.pop();
    if (typeof a != "function")
      throw new TypeError("Expected function as last argument, not " + a);
    o(null, ...r);
    function o(l, ...u) {
      const c = e[++s];
      let p = -1;
      if (l) {
        a(l);
        return;
      }
      for (; ++p < r.length; )
        (u[p] === null || u[p] === void 0) && (u[p] = r[p]);
      r = u, c ? Yp(c, o)(...u) : a(null, ...u);
    }
  }
  function i(r) {
    if (typeof r != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + r
      );
    return e.push(r), t;
  }
}
function Yp(e, t) {
  let n;
  return i;
  function i(...a) {
    const o = e.length > a.length;
    let l;
    o && a.push(r);
    try {
      l = e.apply(this, a);
    } catch (u) {
      const c = (
        /** @type {Error} */
        u
      );
      if (o && n)
        throw c;
      return r(c);
    }
    o || (l && l.then && typeof l.then == "function" ? l.then(s, r) : l instanceof Error ? r(l) : s(l));
  }
  function r(a, ...o) {
    n || (n = !0, t(a, ...o));
  }
  function s(a) {
    r(null, a);
  }
}
const Kp = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  function(e) {
    const i = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), r = i[e], s = function() {
      return r.apply(s, arguments);
    };
    return Object.setPrototypeOf(s, i), s;
  }
), Zp = {}.hasOwnProperty;
class Si extends Kp {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = Qp();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@linkcode Processor}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const t = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new Si()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const i = this.attachers[n];
      t.use(...i);
    }
    return t.data(Vn(!0, {}, this.namespace)), t;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > **Note**: to register custom data in TypeScript, augment the
   * > {@linkcode Data} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(t, n) {
    return typeof t == "string" ? arguments.length === 2 ? (zn("data", this.frozen), this.namespace[t] = n, this) : Zp.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (zn("data", this.frozen), this.namespace = t, this) : this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen)
      return this;
    const t = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [n, ...i] = this.attachers[this.freezeIndex];
      if (i[0] === !1)
        continue;
      i[0] === !0 && (i[0] = void 0);
      const r = n.call(t, ...i);
      typeof r == "function" && this.transformers.use(r);
    }
    return this.frozen = !0, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(t) {
    this.freeze();
    const n = tn(t), i = this.parser || this.Parser;
    return Bn("parse", i), i(String(n), n);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(t, n) {
    const i = this;
    return this.freeze(), Bn("process", this.parser || this.Parser), Jn("process", this.compiler || this.Compiler), n ? r(void 0, n) : new Promise(r);
    function r(s, a) {
      const o = tn(t), l = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        i.parse(o)
      );
      i.run(l, o, function(c, p, m) {
        if (c || !p || !m)
          return u(c);
        const h = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          p
        ), v = i.stringify(h, m);
        nh(v) ? m.value = v : m.result = v, u(
          c,
          /** @type {VFileWithOutput<CompileResult>} */
          m
        );
      });
      function u(c, p) {
        c || !p ? a(c) : s ? s(p) : n(void 0, p);
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(t) {
    let n = !1, i;
    return this.freeze(), Bn("processSync", this.parser || this.Parser), Jn("processSync", this.compiler || this.Compiler), this.process(t, r), Ir("processSync", "process", n), i;
    function r(s, a) {
      n = !0, yr(s), i = a;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(t, n, i) {
    Cr(t), this.freeze();
    const r = this.transformers;
    return !i && typeof n == "function" && (i = n, n = void 0), i ? s(void 0, i) : new Promise(s);
    function s(a, o) {
      const l = tn(n);
      r.run(t, l, u);
      function u(c, p, m) {
        const h = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          p || t
        );
        c ? o(c) : a ? a(h) : i(void 0, h, m);
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(t, n) {
    let i = !1, r;
    return this.run(t, n, s), Ir("runSync", "run", i), r;
    function s(a, o) {
      yr(a), r = o, i = !0;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(t, n) {
    this.freeze();
    const i = tn(n), r = this.compiler || this.Compiler;
    return Jn("stringify", r), Cr(t), r(t, i);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(t, ...n) {
    const i = this.attachers, r = this.namespace;
    if (zn("use", this.frozen), t != null) if (typeof t == "function")
      l(t, n);
    else if (typeof t == "object")
      Array.isArray(t) ? o(t) : a(t);
    else
      throw new TypeError("Expected usable value, not `" + t + "`");
    return this;
    function s(u) {
      if (typeof u == "function")
        l(u, []);
      else if (typeof u == "object")
        if (Array.isArray(u)) {
          const [c, ...p] = (
            /** @type {PluginTuple<Array<unknown>>} */
            u
          );
          l(c, p);
        } else
          a(u);
      else
        throw new TypeError("Expected usable value, not `" + u + "`");
    }
    function a(u) {
      if (!("plugins" in u) && !("settings" in u))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      o(u.plugins), u.settings && (r.settings = Vn(!0, r.settings, u.settings));
    }
    function o(u) {
      let c = -1;
      if (u != null) if (Array.isArray(u))
        for (; ++c < u.length; ) {
          const p = u[c];
          s(p);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + u + "`");
    }
    function l(u, c) {
      let p = -1, m = -1;
      for (; ++p < i.length; )
        if (i[p][0] === u) {
          m = p;
          break;
        }
      if (m === -1)
        i.push([u, ...c]);
      else if (c.length > 0) {
        let [h, ...v] = c;
        const b = i[m][1];
        ni(b) && ni(h) && (h = Vn(!0, b, h)), i[m] = [u, h, ...v];
      }
    }
  }
}
const eh = new Si().freeze();
function Bn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function Jn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function zn(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Cr(e) {
  if (!ni(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function Ir(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function tn(e) {
  return th(e) ? e : new Yr(e);
}
function th(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function nh(e) {
  return typeof e == "string" || ih(e);
}
function ih(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
class rh {
  constructor() {
    this.should_skip = !1, this.should_remove = !1, this.replacement = null, this.context = {
      skip: () => this.should_skip = !0,
      remove: () => this.should_remove = !0,
      replace: (t) => this.replacement = t
    };
  }
  /**
   * @template {Node} Parent
   * @param {Parent | null | undefined} parent
   * @param {keyof Parent | null | undefined} prop
   * @param {number | null | undefined} index
   * @param {Node} node
   */
  replace(t, n, i, r) {
    t && n && (i != null ? t[n][i] = r : t[n] = r);
  }
  /**
   * @template {Node} Parent
   * @param {Parent | null | undefined} parent
   * @param {keyof Parent | null | undefined} prop
   * @param {number | null | undefined} index
   */
  remove(t, n, i) {
    t && n && (i != null ? t[n].splice(i, 1) : delete t[n]);
  }
}
class sh extends rh {
  /**
   *
   * @param {SyncHandler} [enter]
   * @param {SyncHandler} [leave]
   */
  constructor(t, n) {
    super(), this.should_skip = !1, this.should_remove = !1, this.replacement = null, this.context = {
      skip: () => this.should_skip = !0,
      remove: () => this.should_remove = !0,
      replace: (i) => this.replacement = i
    }, this.enter = t, this.leave = n;
  }
  /**
   * @template {Node} Parent
   * @param {Node} node
   * @param {Parent | null} parent
   * @param {keyof Parent} [prop]
   * @param {number | null} [index]
   * @returns {Node | null}
   */
  visit(t, n, i, r) {
    if (t) {
      if (this.enter) {
        const a = this.should_skip, o = this.should_remove, l = this.replacement;
        this.should_skip = !1, this.should_remove = !1, this.replacement = null, this.enter.call(this.context, t, n, i, r), this.replacement && (t = this.replacement, this.replace(n, i, r, t)), this.should_remove && this.remove(n, i, r);
        const u = this.should_skip, c = this.should_remove;
        if (this.should_skip = a, this.should_remove = o, this.replacement = l, u) return t;
        if (c) return null;
      }
      let s;
      for (s in t) {
        const a = t[s];
        if (a && typeof a == "object")
          if (Array.isArray(a)) {
            const o = (
              /** @type {Array<unknown>} */
              a
            );
            for (let l = 0; l < o.length; l += 1) {
              const u = o[l];
              Ar(u) && (this.visit(u, t, s, l) || l--);
            }
          } else Ar(a) && this.visit(a, t, s, null);
      }
      if (this.leave) {
        const a = this.replacement, o = this.should_remove;
        this.replacement = null, this.should_remove = !1, this.leave.call(this.context, t, n, i, r), this.replacement && (t = this.replacement, this.replace(n, i, r, t)), this.should_remove && this.remove(n, i, r);
        const l = this.should_remove;
        if (this.replacement = a, this.should_remove = o, l) return null;
      }
    }
    return t;
  }
}
function Ar(e) {
  return e !== null && typeof e == "object" && "type" in e && typeof e.type == "string";
}
function Rt(e, { enter: t, leave: n }) {
  return new sh(t, n).visit(e, null);
}
function da(e, t) {
  if (e.type === "MemberExpression")
    return !e.computed && da(e.object, e);
  if (e.type === "Identifier") {
    if (!t) return !0;
    switch (t.type) {
      case "MemberExpression":
        return t.computed || e === t.object;
      case "MethodDefinition":
        return t.computed;
      case "PropertyDefinition":
        return t.computed || e === t.value;
      case "Property":
        return t.computed || e === t.value;
      case "ExportSpecifier":
      case "ImportSpecifier":
        return e === t.local;
      case "LabeledStatement":
      case "BreakStatement":
      case "ContinueStatement":
        return !1;
      default:
        return !0;
    }
  }
  return !1;
}
function xa(e) {
  const t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new Map(), i = new mt(null, !1), r = [];
  let s = i;
  Rt(e, {
    enter(a, o) {
      switch (a.type) {
        case "Identifier":
          o && da(a, o) && r.push([s, a]);
          break;
        case "ImportDeclaration":
          a.specifiers.forEach((l) => {
            s.declarations.set(l.local.name, l);
          });
          break;
        case "FunctionExpression":
        case "FunctionDeclaration":
        case "ArrowFunctionExpression":
          a.type === "FunctionDeclaration" ? (a.id && s.declarations.set(a.id.name, a), t.set(a, s = new mt(s, !1))) : (t.set(a, s = new mt(s, !1)), a.type === "FunctionExpression" && a.id && s.declarations.set(a.id.name, a)), a.params.forEach((l) => {
            ii(l).forEach((u) => {
              s.declarations.set(u, a);
            });
          });
          break;
        case "ForStatement":
        case "ForInStatement":
        case "ForOfStatement":
          t.set(a, s = new mt(s, !0));
          break;
        case "BlockStatement":
          t.set(a, s = new mt(s, !0));
          break;
        case "ClassDeclaration":
        case "VariableDeclaration":
          s.add_declaration(a);
          break;
        case "CatchClause":
          t.set(a, s = new mt(s, !0)), a.param && ii(a.param).forEach((l) => {
            a.param && s.declarations.set(l, a.param);
          });
          break;
      }
    },
    leave(a) {
      t.has(a) && s !== null && s.parent && (s = s.parent);
    }
  });
  for (let a = r.length - 1; a >= 0; --a) {
    const [o, l] = r[a];
    o.references.has(l.name) || ga(o, l.name), o.find_owner(l.name) || n.set(l.name, l);
  }
  return { map: t, scope: i, globals: n };
}
function ga(e, t) {
  e.references.add(t), e.parent && ga(e.parent, t);
}
class mt {
  /**
   * @param {Scope | null} parent 
   * @param {boolean} block 
   */
  constructor(t, n) {
    this.parent = t, this.block = n, this.declarations = /* @__PURE__ */ new Map(), this.initialised_declarations = /* @__PURE__ */ new Set(), this.references = /* @__PURE__ */ new Set();
  }
  /**
   * @param {import('estree').VariableDeclaration | import('estree').ClassDeclaration} node
   */
  add_declaration(t) {
    if (t.type === "VariableDeclaration")
      if (t.kind === "var" && this.block && this.parent)
        this.parent.add_declaration(t);
      else {
        const n = (i) => {
          ii(i.id).forEach((r) => {
            this.declarations.set(r, t), i.init && this.initialised_declarations.add(r);
          });
        };
        t.declarations.forEach(n);
      }
    else t.id && this.declarations.set(t.id.name, t);
  }
  /**
   * @param {string} name
   * @returns {Scope | null}
   */
  find_owner(t) {
    return this.declarations.has(t) ? this : this.parent && this.parent.find_owner(t);
  }
  /**
   * @param {string} name
   * @returns {boolean}
   */
  has(t) {
    return this.declarations.has(t) || !!this.parent && this.parent.has(t);
  }
}
function ii(e) {
  return gt(e).map((t) => t.name);
}
function gt(e, t = []) {
  switch (e.type) {
    case "Identifier":
      t.push(e);
      break;
    case "MemberExpression":
      let n = e;
      for (; n.type === "MemberExpression"; )
        n = /** @type {any} */
        n.object;
      t.push(
        /** @type {any} */
        n
      );
      break;
    case "ObjectPattern":
      const i = (s) => {
        s.type === "RestElement" ? gt(s.argument, t) : gt(s.value, t);
      };
      e.properties.forEach(i);
      break;
    case "ArrayPattern":
      const r = (s) => {
        s && gt(s, t);
      };
      e.elements.forEach((s) => {
        s && r(s);
      });
      break;
    case "RestElement":
      gt(e.argument, t);
      break;
    case "AssignmentPattern":
      gt(e.left, t);
      break;
  }
  return t;
}
function Ye(e, t) {
  const n = ["start", "end", "loc", "range", "comments"];
  let i = -1;
  for (; ++i < n.length; ) {
    const r = n[i];
    r in e && (t[r] = e[r]);
  }
}
function ah(e) {
  return e.type === "FunctionDeclaration" ? { ...e, type: "FunctionExpression" } : (e.type, { ...e, type: "ClassExpression" });
}
function oh(e) {
  return e.type === "FunctionDeclaration" || e.type === "ClassDeclaration" || e.type === "VariableDeclaration";
}
function Ei(e, t) {
  let n = -1;
  const i = [], r = [];
  let s;
  for (; ++n < e.length; ) {
    const a = e[n];
    a.type === "ImportNamespaceSpecifier" ? s = a : r.push(a);
  }
  if (s) {
    const a = {
      type: "VariableDeclarator",
      id: s.local,
      init: t
    };
    Ye(s, a), i.push(a);
  }
  return i.push({
    type: "VariableDeclarator",
    id: {
      type: "ObjectPattern",
      properties: r.map(function(a) {
        let o = a.type === "ImportSpecifier" ? a.imported : a.type === "ExportSpecifier" ? a.exported : { type: "Identifier", name: "default" }, l = a.local;
        a.type === "ExportSpecifier" && (l = o, o = a.local);
        const u = {
          type: "Property",
          kind: "init",
          shorthand: o.name === l.name,
          method: !1,
          computed: !1,
          key: o,
          value: l
        };
        return Ye(a, u), u;
      })
    },
    init: s ? { type: "Identifier", name: s.local.name } : t
  }), i;
}
function Ze(e) {
  let t = -1, n;
  for (; ++t < e.length; ) {
    const i = e[t], r = typeof i == "string" && Re(i) ? { type: "Identifier", name: i } : { type: "Literal", value: i };
    n = n ? {
      type: "MemberExpression",
      object: n,
      property: r,
      computed: r.type === "Literal",
      optional: !1
    } : r;
  }
  return n.type, n;
}
function _r(e) {
  let t = -1, n;
  for (; ++t < e.length; ) {
    const i = e[t];
    typeof i == "string" && Re(i, { jsx: !0 });
    const r = { type: "JSXIdentifier", name: i };
    n = n ? { type: "JSXMemberExpression", object: n, property: r } : r;
  }
  return n;
}
function lh(e) {
  const t = e.baseUrl || void 0, n = typeof t == "object" ? t.href : t, i = e.outputFormat || "program", r = e.pragma === void 0 ? "React.createElement" : e.pragma, s = e.pragmaFrag === void 0 ? "React.Fragment" : e.pragmaFrag, a = e.pragmaImportSource || "react", o = e.jsxImportSource || "react", l = e.jsxRuntime || "automatic";
  return function(c, p) {
    const m = [], h = [];
    let v = 0, b, I, y;
    if (l === "classic" && s && nn(c, "@jsxFrag", s), l === "classic" && r && nn(c, "@jsx", r), l === "automatic" && o && nn(c, "@jsxImportSource", o), l && nn(c, "@jsxRuntime", l), l === "classic" && a) {
      if (!r)
        throw new Error(
          "Missing `pragma` in classic runtime with `pragmaImportSource`"
        );
      S({
        type: "ImportDeclaration",
        specifiers: [
          {
            type: "ImportDefaultSpecifier",
            local: { type: "Identifier", name: r.split(".")[0] }
          }
        ],
        source: { type: "Literal", value: a }
      });
    }
    for (y of c.body)
      if (y.type === "ExportDefaultDeclaration")
        b && p.fail(
          "Unexpected duplicate layout, expected a single layout (previous: " + Ie(qe(b)) + ")",
          {
            ancestors: [c, y],
            place: qe(y),
            ruleId: "duplicate-layout",
            source: "recma-document"
          }
        ), b = y, h.push({
          type: "VariableDeclaration",
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              id: { type: "Identifier", name: "MDXLayout" },
              init: oh(y.declaration) ? ah(y.declaration) : y.declaration
            }
          ]
        });
      else if (y.type === "ExportNamedDeclaration" && y.source) {
        const x = (
          /** @type {SimpleLiteral} */
          y.source
        );
        y.specifiers = y.specifiers.filter(function(g) {
          if (g.exported.name === "default") {
            b && p.fail(
              "Unexpected duplicate layout, expected a single layout (previous: " + Ie(qe(b)) + ")",
              {
                ancestors: [c, y, g],
                place: qe(y),
                ruleId: "duplicate-layout",
                source: "recma-document"
              }
            ), b = g;
            const C = [];
            if (g.local.name === "default")
              C.push({
                type: "ImportDefaultSpecifier",
                local: { type: "Identifier", name: "MDXLayout" }
              });
            else {
              const D = {
                type: "ImportSpecifier",
                imported: g.local,
                local: { type: "Identifier", name: "MDXLayout" }
              };
              Ye(g.local, D), C.push(D);
            }
            const P = { type: "Literal", value: x.value };
            Ye(x, P);
            const O = {
              type: "ImportDeclaration",
              specifiers: C,
              source: P
            };
            return Ye(g, O), S(O), !1;
          }
          return !0;
        }), y.specifiers.length > 0 && T(y);
      } else y.type === "ExportNamedDeclaration" || y.type === "ExportAllDeclaration" ? T(y) : y.type === "ImportDeclaration" ? S(y) : y.type === "ExpressionStatement" && (y.expression.type === "JSXElement" || // @ts-expect-error: `estree-jsx` does not register `JSXFragment` as an expression.
      y.expression.type === "JSXFragment") ? (I = !0, h.push(
        ...u(y.expression, i, !!b)
      )) : h.push(y);
    I || h.push(
      ...u(void 0, i, !!b)
    ), m.push(["MDXContent", "default"]), i === "function-body" && h.push({
      type: "ReturnStatement",
      argument: {
        type: "ObjectExpression",
        properties: [
          ...Array.from({ length: v }).map(
            /**
             * @param {undefined} _
             *   Nothing.
             * @param {number} index
             *   Index.
             * @returns {SpreadElement}
             *   Node.
             */
            function(x, g) {
              return {
                type: "SpreadElement",
                argument: {
                  type: "Identifier",
                  name: "_exportAll" + (g + 1)
                }
              };
            }
          ),
          ...m.map(function(x) {
            return {
              type: "Property",
              kind: "init",
              method: !1,
              computed: !1,
              shorthand: typeof x == "string",
              key: {
                type: "Identifier",
                name: typeof x == "string" ? x : x[1]
              },
              value: {
                type: "Identifier",
                name: typeof x == "string" ? x : x[0]
              }
            };
          })
        ]
      }
    }), c.body = h;
    let A = !1, E = !1;
    (n || i === "function-body") && Rt(c, {
      enter(x) {
        if ((x.type === "ExportAllDeclaration" || x.type === "ExportNamedDeclaration" || x.type === "ImportDeclaration") && x.source) {
          let g = x.source.value;
          try {
            new URL(g);
          } catch {
            (g.startsWith("/") || g.startsWith("./") || g.startsWith("../")) && (g = new URL(g, n).href);
          }
          const C = { type: "Literal", value: g };
          Ye(x.source, C), x.source = C;
          return;
        }
        if (x.type === "ImportExpression") {
          E = !0;
          const g = {
            type: "CallExpression",
            callee: { type: "Identifier", name: "_resolveDynamicMdxSpecifier" },
            arguments: [x.source],
            optional: !1
          };
          x.source = g;
          return;
        }
        if (x.type === "MemberExpression" && "object" in x && x.object.type === "MetaProperty" && x.property.type === "Identifier" && x.object.meta.name === "import" && x.object.property.name === "meta" && x.property.name === "url") {
          A = !0;
          const g = { type: "Identifier", name: "_importMetaUrl" };
          Ye(x, g), this.replace(g);
        }
      }
    }), E && (n || (A = !0), c.body.push(
      uh(
        n ? { type: "Literal", value: n } : { type: "Identifier", name: "_importMetaUrl" }
      )
    )), A && c.body.unshift(...ch());
    function T(x) {
      if (x.type === "ExportNamedDeclaration") {
        x.declaration && m.push(
          ...xa(x.declaration).scope.declarations.keys()
        );
        for (y of x.specifiers)
          m.push(y.exported.name);
      }
      S(x);
    }
    function S(x) {
      let g, C;
      if (i === "function-body")
        if (
          // Always have a source:
          x.type === "ImportDeclaration" || x.type === "ExportAllDeclaration" || // Source optional:
          x.type === "ExportNamedDeclaration" && x.source
        ) {
          x.source;
          const P = { type: "ImportExpression", source: x.source };
          Ye(x, P), C = { type: "AwaitExpression", argument: P }, (x.type === "ImportDeclaration" || x.type === "ExportNamedDeclaration") && x.specifiers.length === 0 ? g = { type: "ExpressionStatement", expression: C } : g = {
            type: "VariableDeclaration",
            kind: "const",
            declarations: x.type === "ExportAllDeclaration" ? [
              {
                type: "VariableDeclarator",
                id: {
                  type: "Identifier",
                  name: "_exportAll" + ++v
                },
                init: C
              }
            ] : Ei(x.specifiers, C)
          };
        } else if (x.declaration)
          g = x.declaration;
        else {
          const P = x.specifiers.filter(function(O) {
            return O.local.name !== O.exported.name;
          }).map(function(O) {
            return {
              type: "VariableDeclarator",
              id: O.exported,
              init: O.local
            };
          });
          P.length > 0 && (g = {
            type: "VariableDeclaration",
            kind: "const",
            declarations: P
          });
        }
      else
        g = x;
      g && h.push(g);
    }
  };
  function u(c, p, m) {
    let v = {
      type: "JSXElement",
      openingElement: {
        type: "JSXOpeningElement",
        name: { type: "JSXIdentifier", name: "MDXLayout" },
        attributes: [
          {
            type: "JSXSpreadAttribute",
            argument: { type: "Identifier", name: "props" }
          }
        ],
        selfClosing: !1
      },
      closingElement: {
        type: "JSXClosingElement",
        name: { type: "JSXIdentifier", name: "MDXLayout" }
      },
      children: [
        {
          type: "JSXElement",
          openingElement: {
            type: "JSXOpeningElement",
            name: { type: "JSXIdentifier", name: "_createMdxContent" },
            attributes: [
              {
                type: "JSXSpreadAttribute",
                argument: { type: "Identifier", name: "props" }
              }
            ],
            selfClosing: !0
          },
          closingElement: null,
          children: []
        }
      ]
    };
    m || (v = {
      type: "ConditionalExpression",
      test: { type: "Identifier", name: "MDXLayout" },
      consequent: v,
      alternate: {
        type: "CallExpression",
        callee: { type: "Identifier", name: "_createMdxContent" },
        arguments: [{ type: "Identifier", name: "props" }],
        optional: !1
      }
    });
    let b = (
      // Cast because TS otherwise does not think `JSXFragment`s are expressions.
      /** @type {Readonly<Expression> | Readonly<JSXFragment>} */
      c || { type: "Identifier", name: "undefined" }
    );
    b.type === "JSXFragment" && b.children.length === 1 && b.children[0].type === "JSXElement" && (b = b.children[0]);
    let I = !1;
    Rt(b, {
      enter(A) {
        if (A.type === "ArrowFunctionExpression" || A.type === "FunctionDeclaration" || A.type === "FunctionExpression")
          return this.skip();
        (A.type === "AwaitExpression" || /* c8 ignore next 2 -- can only occur in a function (which then can
         * only be async, so skipped it) */
        A.type === "ForOfStatement" && A.await) && (I = !0);
      }
    });
    const y = {
      type: "FunctionDeclaration",
      id: { type: "Identifier", name: "MDXContent" },
      params: [
        {
          type: "AssignmentPattern",
          left: { type: "Identifier", name: "props" },
          right: { type: "ObjectExpression", properties: [] }
        }
      ],
      body: {
        type: "BlockStatement",
        body: [{ type: "ReturnStatement", argument: v }]
      }
    };
    return [
      {
        type: "FunctionDeclaration",
        async: I,
        id: { type: "Identifier", name: "_createMdxContent" },
        params: [{ type: "Identifier", name: "props" }],
        body: {
          type: "BlockStatement",
          body: [
            {
              type: "ReturnStatement",
              // Cast because TS doesn’t think `JSXFragment` is an expression.
              // eslint-disable-next-line object-shorthand
              argument: (
                /** @type {Expression} */
                b
              )
            }
          ]
        }
      },
      p === "program" ? { type: "ExportDefaultDeclaration", declaration: y } : y
    ];
  }
}
function nn(e, t, n) {
  var i;
  (i = e.comments) == null || i.unshift({
    type: "Block",
    value: t + " " + n,
    data: { _mdxIsPragmaComment: !0 }
  });
}
function uh(e) {
  return {
    type: "FunctionDeclaration",
    id: { type: "Identifier", name: "_resolveDynamicMdxSpecifier" },
    generator: !1,
    async: !1,
    params: [{ type: "Identifier", name: "d" }],
    body: {
      type: "BlockStatement",
      body: [
        {
          type: "IfStatement",
          test: {
            type: "BinaryExpression",
            left: {
              type: "UnaryExpression",
              operator: "typeof",
              prefix: !0,
              argument: { type: "Identifier", name: "d" }
            },
            operator: "!==",
            right: { type: "Literal", value: "string" }
          },
          consequent: {
            type: "ReturnStatement",
            argument: { type: "Identifier", name: "d" }
          },
          alternate: null
        },
        // To do: use `URL.canParse` when widely supported (see commented
        // out code below).
        {
          type: "TryStatement",
          block: {
            type: "BlockStatement",
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "NewExpression",
                  callee: { type: "Identifier", name: "URL" },
                  arguments: [{ type: "Identifier", name: "d" }]
                }
              },
              {
                type: "ReturnStatement",
                argument: { type: "Identifier", name: "d" }
              }
            ]
          },
          handler: {
            type: "CatchClause",
            param: null,
            body: { type: "BlockStatement", body: [] }
          },
          finalizer: null
        },
        // To do: use `URL.canParse` when widely supported.
        // {
        //   type: 'IfStatement',
        //   test: {
        //     type: 'CallExpression',
        //     callee: toIdOrMemberExpression(['URL', 'canParse']),
        //     arguments: [{type: 'Identifier', name: 'd'}],
        //     optional: false
        //   },
        //   consequent: {
        //     type: 'ReturnStatement',
        //     argument: {type: 'Identifier', name: 'd'}
        //   },
        //   alternate: null
        // },
        {
          type: "IfStatement",
          test: {
            type: "LogicalExpression",
            left: {
              type: "LogicalExpression",
              left: {
                type: "CallExpression",
                callee: Ze(["d", "startsWith"]),
                arguments: [{ type: "Literal", value: "/" }],
                optional: !1
              },
              operator: "||",
              right: {
                type: "CallExpression",
                callee: Ze(["d", "startsWith"]),
                arguments: [{ type: "Literal", value: "./" }],
                optional: !1
              }
            },
            operator: "||",
            right: {
              type: "CallExpression",
              callee: Ze(["d", "startsWith"]),
              arguments: [{ type: "Literal", value: "../" }],
              optional: !1
            }
          },
          consequent: {
            type: "ReturnStatement",
            argument: {
              type: "MemberExpression",
              object: {
                type: "NewExpression",
                callee: { type: "Identifier", name: "URL" },
                arguments: [{ type: "Identifier", name: "d" }, e]
              },
              property: { type: "Identifier", name: "href" },
              computed: !1,
              optional: !1
            }
          },
          alternate: null
        },
        {
          type: "ReturnStatement",
          argument: { type: "Identifier", name: "d" }
        }
      ]
    }
  };
}
function ch() {
  return [
    {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: { type: "Identifier", name: "_importMetaUrl" },
          init: Ze(["arguments", 0, "baseUrl"])
        }
      ],
      kind: "const"
    },
    {
      type: "IfStatement",
      test: {
        type: "UnaryExpression",
        operator: "!",
        prefix: !0,
        argument: { type: "Identifier", name: "_importMetaUrl" }
      },
      consequent: {
        type: "ThrowStatement",
        argument: {
          type: "NewExpression",
          callee: { type: "Identifier", name: "Error" },
          arguments: [
            {
              type: "Literal",
              value: "Unexpected missing `options.baseUrl` needed to support `export … from`, `import`, or `import.meta.url` when generating `function-body`"
            }
          ]
        }
      },
      alternate: null
    }
  ];
}
const Un = /@(jsx|jsxFrag|jsxImportSource|jsxRuntime)\s+(\S+)/g;
function ph(e, t) {
  const n = t || {};
  let i = n.runtime === "automatic";
  const r = {}, s = {};
  Rt(e, {
    enter(a) {
      if (a.type === "Program") {
        const o = a.comments || [];
        let l = -1;
        for (; ++l < o.length; ) {
          Un.lastIndex = 0;
          let u = Un.exec(o[l].value);
          for (; u; )
            r[u[1]] = u[2], u = Un.exec(o[l].value);
        }
        if (r.jsxRuntime)
          if (r.jsxRuntime === "automatic") {
            if (i = !0, r.jsx)
              throw new Error("Unexpected `@jsx` pragma w/ automatic runtime");
            if (r.jsxFrag)
              throw new Error(
                "Unexpected `@jsxFrag` pragma w/ automatic runtime"
              );
          } else if (r.jsxRuntime === "classic") {
            if (i = !1, r.jsxImportSource)
              throw new Error(
                "Unexpected `@jsxImportSource` w/ classic runtime"
              );
          } else
            throw new Error(
              "Unexpected `jsxRuntime` `" + r.jsxRuntime + "`, expected `automatic` or `classic`"
            );
      }
    },
    // eslint-disable-next-line complexity
    leave(a) {
      if (a.type === "Program") {
        const b = [];
        if (s.fragment && b.push({
          type: "ImportSpecifier",
          imported: { type: "Identifier", name: "Fragment" },
          local: { type: "Identifier", name: "_Fragment" }
        }), s.jsx && b.push({
          type: "ImportSpecifier",
          imported: { type: "Identifier", name: "jsx" },
          local: { type: "Identifier", name: "_jsx" }
        }), s.jsxs && b.push({
          type: "ImportSpecifier",
          imported: { type: "Identifier", name: "jsxs" },
          local: { type: "Identifier", name: "_jsxs" }
        }), s.jsxDEV && b.push({
          type: "ImportSpecifier",
          imported: { type: "Identifier", name: "jsxDEV" },
          local: { type: "Identifier", name: "_jsxDEV" }
        }), b.length > 0) {
          let I = 0;
          for (; I < a.body.length; ) {
            const y = a.body[I];
            if ("directive" in y && y.directive)
              I++;
            else
              break;
          }
          a.body.splice(I, 0, {
            type: "ImportDeclaration",
            specifiers: b,
            source: {
              type: "Literal",
              value: (r.jsxImportSource || n.importSource || "react") + (n.development ? "/jsx-dev-runtime" : "/jsx-runtime")
            }
          });
        }
      }
      if (a.type !== "JSXElement" && a.type !== "JSXFragment")
        return;
      const o = [];
      let l = -1;
      for (; ++l < a.children.length; ) {
        const b = a.children[l];
        if (b.type === "JSXExpressionContainer")
          b.expression.type !== "JSXEmptyExpression" && o.push(b.expression);
        else if (b.type === "JSXText") {
          const I = b.value.replace(/\t/g, " ").replace(/ *(\r?\n|\r) */g, `
`).replace(/\n+/g, `
`).replace(/\n+$/, "").replace(/^\n+/, "").replace(/\n/g, " ");
          if (I) {
            const y = { type: "Literal", value: I };
            Dt(b, y), o.push(y);
          }
        } else
          b.type !== "JSXElement" && b.type !== "JSXFragment" && b.type, o.push(b);
      }
      let u;
      const c = [];
      let p = [], m;
      if (a.type === "JSXElement") {
        if (u = gn(a.openingElement.name), u.type === "Identifier" && /^[a-z]/.test(u.name)) {
          const A = { type: "Literal", value: u.name };
          Dt(u, A), u = A;
        }
        let b;
        const I = a.openingElement.attributes;
        let y = -1;
        for (; ++y < I.length; ) {
          const A = I[y];
          if (A.type === "JSXSpreadAttribute")
            A.argument.type === "ObjectExpression" ? c.push(...A.argument.properties) : c.push({ type: "SpreadElement", argument: A.argument }), b = !0;
          else {
            const E = hh(A);
            if (i && E.key.type === "Identifier" && E.key.name === "key") {
              if (b)
                throw new Error(
                  "Expected `key` to come before any spread expressions"
                );
              const T = E.value;
              T.type !== "AssignmentPattern" && T.type !== "ArrayPattern" && T.type !== "ObjectPattern" && T.type, m = T;
            } else
              c.push(E);
          }
        }
      } else i ? (s.fragment = !0, u = { type: "Identifier", name: "_Fragment" }) : u = Tr(
        r.jsxFrag || n.pragmaFrag || "React.Fragment"
      );
      i ? o.length > 0 && c.push({
        type: "Property",
        key: { type: "Identifier", name: "children" },
        value: o.length > 1 ? { type: "ArrayExpression", elements: o } : o[0],
        kind: "init",
        method: !1,
        shorthand: !1,
        computed: !1
      }) : p = o;
      let h;
      if (i) {
        p.push({ type: "ObjectExpression", properties: c }), m ? p.push(m) : n.development && p.push({ type: "Identifier", name: "undefined" });
        const b = o.length > 1;
        if (n.development) {
          s.jsxDEV = !0, h = {
            type: "Identifier",
            name: "_jsxDEV"
          }, p.push({ type: "Literal", value: b });
          const I = {
            type: "ObjectExpression",
            properties: [
              {
                type: "Property",
                method: !1,
                shorthand: !1,
                computed: !1,
                kind: "init",
                key: { type: "Identifier", name: "fileName" },
                value: {
                  type: "Literal",
                  value: n.filePath || "<source.js>"
                }
              }
            ]
          };
          a.loc && I.properties.push(
            {
              type: "Property",
              method: !1,
              shorthand: !1,
              computed: !1,
              kind: "init",
              key: { type: "Identifier", name: "lineNumber" },
              value: { type: "Literal", value: a.loc.start.line }
            },
            {
              type: "Property",
              method: !1,
              shorthand: !1,
              computed: !1,
              kind: "init",
              key: { type: "Identifier", name: "columnNumber" },
              value: { type: "Literal", value: a.loc.start.column + 1 }
            }
          ), p.push(I, { type: "ThisExpression" });
        } else b ? (s.jsxs = !0, h = { type: "Identifier", name: "_jsxs" }) : (s.jsx = !0, h = { type: "Identifier", name: "_jsx" });
      } else
        c.length > 0 ? p.unshift({ type: "ObjectExpression", properties: c }) : p.length > 0 && p.unshift({ type: "Literal", value: null }), h = Tr(
          r.jsx || n.pragma || "React.createElement"
        );
      p.unshift(u);
      const v = {
        type: "CallExpression",
        callee: h,
        arguments: p,
        optional: !1
      };
      Dt(a, v), this.replace(v);
    }
  });
}
function hh(e) {
  let t;
  if (e.value)
    if (e.value.type === "JSXExpressionContainer") {
      const i = e.value.expression;
      i.type, t = i;
    } else {
      const i = e.value;
      i.type !== "JSXElement" && i.type, t = i, delete t.raw;
    }
  else
    t = { type: "Literal", value: !0 };
  const n = {
    type: "Property",
    key: gn(e.name),
    value: t,
    kind: "init",
    method: !1,
    shorthand: !1,
    computed: !1
  };
  return Dt(e, n), n;
}
function gn(e) {
  let t;
  if (e.type === "JSXMemberExpression") {
    const n = gn(e.property);
    t = {
      type: "MemberExpression",
      object: gn(e.object),
      property: n,
      computed: n.type === "Literal",
      optional: !1
    };
  } else e.type === "JSXNamespacedName" ? t = {
    type: "Literal",
    value: e.namespace.name + ":" + e.name.name
  } : t = Re(e.name) ? { type: "Identifier", name: e.name } : { type: "Literal", value: e.name };
  return Dt(e, t), t;
}
function Tr(e) {
  const t = e.split(".");
  let n = -1, i;
  for (; ++n < t.length; ) {
    const r = Re(t[n]) ? { type: "Identifier", name: t[n] } : { type: "Literal", value: t[n] };
    i = i ? {
      type: "MemberExpression",
      object: i,
      property: r,
      computed: !!(n && r.type === "Literal"),
      optional: !1
    } : r;
  }
  return i;
}
function Dt(e, t) {
  const n = ["start", "end", "loc", "range", "comments"];
  let i = -1;
  for (; ++i < n.length; ) {
    const r = n[i];
    r in e && (t[r] = e[r]);
  }
}
function fh(e) {
  const { development: t, outputFormat: n } = e || {};
  return function(i, r) {
    if (ph(i, { development: t, filePath: r.history[0] }), i.comments && (i.comments = i.comments.filter(function(s) {
      var a;
      return !((a = s.data) != null && a._mdxIsPragmaComment);
    })), n === "function-body") {
      let s = 0;
      for (; s < i.body.length; ) {
        const o = i.body[s];
        if ("directive" in o && o.directive)
          s++;
        else
          break;
      }
      const a = i.body[s];
      a && a.type === "ImportDeclaration" && typeof a.source.value == "string" && /\/jsx-(dev-)?runtime$/.test(a.source.value) && (i.body[s] = {
        type: "VariableDeclaration",
        kind: "const",
        declarations: Ei(
          a.specifiers,
          Ze(["arguments", 0])
        )
      });
    }
  };
}
function Pr(e) {
  let t = -1, n;
  for (; ++t < e.length; ) {
    const i = e[t];
    n = n ? { type: "BinaryExpression", left: n, operator: "+", right: i } : i;
  }
  return n;
}
function mh(e) {
  const { development: t, outputFormat: n, providerImportSource: i } = e;
  return function(r, s) {
    const a = xa(r), o = [];
    let l = !1, u = !1, c;
    if (Rt(r, {
      enter(p) {
        const m = (
          /** @type {Scope | undefined} */
          a.map.get(p)
        );
        (p.type === "FunctionDeclaration" || p.type === "FunctionExpression" || p.type === "ArrowFunctionExpression") && (o.push({
          components: [],
          idToInvalidComponentName: /* @__PURE__ */ new Map(),
          node: p,
          objects: [],
          references: {},
          tags: []
        }), dt(p, "MDXContent") && m && !Xn(m, "MDXLayout") && o[0].components.push("MDXLayout"));
        const h = o[0];
        if (!(!h || !dt(h.node, "_createMdxContent") && !i) && (m && (m.node = p, c = m), c && p.type === "JSXElement")) {
          let v = p.openingElement.name;
          if (v.type === "JSXMemberExpression") {
            const b = [];
            for (; v.type === "JSXMemberExpression"; )
              b.unshift(v.property.name), v = v.object;
            b.unshift(v.name);
            const I = b.join("."), y = v.name, A = Xn(c, y);
            if (!Object.hasOwn(h.references, I)) {
              const E = (
                /** @type {Scope | undefined} */
                c.parent
              );
              (!A || // If the parent scope is `_createMdxContent`, then this
              // references a component we can add a check statement for.
              E && E.node.type === "FunctionDeclaration" && dt(E.node, "_createMdxContent")) && (h.references[I] = { component: !0, node: p });
            }
            !h.objects.includes(y) && !A && h.objects.push(y);
          } else if (v.type !== "JSXNamespacedName") {
            if (Re(v.name) && !/^[a-z]/.test(v.name)) {
              const b = v.name;
              Xn(c, b) || (b !== "MDXLayout" && !Object.hasOwn(h.references, b) && (h.references[b] = { component: !0, node: p }), h.components.includes(b) || h.components.push(b));
            } else if (!(p.data && p.data._mdxExplicitJsx)) {
              const b = v.name;
              h.tags.includes(b) || h.tags.push(b);
              let I = ["_components", b];
              if (Re(b) === !1) {
                let y = h.idToInvalidComponentName.get(b);
                y === void 0 && (y = `_component${h.idToInvalidComponentName.size}`, h.idToInvalidComponentName.set(
                  b,
                  y
                )), I = [y];
              }
              p.openingElement.name = _r(I), p.closingElement && (p.closingElement.name = _r(I));
            }
          }
        }
      },
      leave(p) {
        const m = [], h = [], v = [], b = [];
        if (c && c.node === p && (c = /** @type {Scope} */
        c.parent), p.type === "FunctionDeclaration" || p.type === "FunctionExpression" || p.type === "ArrowFunctionExpression") {
          const I = p, y = o[o.length - 1];
          let A;
          for (A of y.tags.sort())
            m.push({
              type: "Property",
              kind: "init",
              key: Re(A) ? { type: "Identifier", name: A } : { type: "Literal", value: A },
              value: { type: "Literal", value: A },
              method: !1,
              shorthand: !1,
              computed: !1
            });
          h.push(...y.components);
          for (A of y.objects)
            h.includes(A) || h.push(A);
          h.sort();
          const E = [];
          if (m.length > 0 || h.length > 0 || y.idToInvalidComponentName.size > 0) {
            if (i && (l = !0, v.push({
              type: "CallExpression",
              callee: { type: "Identifier", name: "_provideComponents" },
              arguments: [],
              optional: !1
            })), (dt(y.node, "MDXContent") || dt(y.node, "_createMdxContent")) && v.push(Ze(["props", "components"])), m.length > 0 || v.length > 1)
              for (const P of v)
                m.push({ type: "SpreadElement", argument: P });
            let g = m.length > 0 ? { type: "ObjectExpression", properties: m } : (
              // If we’re only getting components from `props.components`,
              // make sure it’s defined.
              {
                type: "LogicalExpression",
                operator: "||",
                left: v[0],
                right: { type: "ObjectExpression", properties: [] }
              }
            ), C;
            if (h.length > 0 && (C = {
              type: "ObjectPattern",
              properties: h.map(function(P) {
                return {
                  type: "Property",
                  kind: "init",
                  key: {
                    type: "Identifier",
                    name: P === "MDXLayout" ? "wrapper" : P
                  },
                  value: { type: "Identifier", name: P },
                  method: !1,
                  shorthand: P !== "MDXLayout",
                  computed: !1
                };
              })
            }), y.tags.length > 0 && (b.push({
              type: "VariableDeclarator",
              id: { type: "Identifier", name: "_components" },
              init: g
            }), g = { type: "Identifier", name: "_components" }), dt(y.node, "_createMdxContent"))
              for (const [P, O] of [
                ...y.idToInvalidComponentName
              ].sort(function([D], [L]) {
                return D.localeCompare(L);
              }))
                b.push({
                  type: "VariableDeclarator",
                  id: {
                    type: "Identifier",
                    name: O
                  },
                  init: {
                    type: "MemberExpression",
                    object: { type: "Identifier", name: "_components" },
                    property: { type: "Literal", value: P },
                    computed: !0,
                    optional: !1
                  }
                });
            C && b.push({
              type: "VariableDeclarator",
              id: C,
              init: g
            }), b.length > 0 && E.push({
              type: "VariableDeclaration",
              kind: "const",
              declarations: b
            });
          }
          let T;
          for (T in y.references)
            if (Object.hasOwn(y.references, T)) {
              const g = T.split(".");
              let C = 0;
              for (; ++C < g.length; ) {
                const P = g.slice(0, C).join(".");
                Object.hasOwn(y.references, P) || (y.references[P] = {
                  component: !1,
                  node: y.references[T].node
                });
              }
            }
          const S = Object.keys(y.references).sort();
          let x = -1;
          for (; ++x < S.length; ) {
            const g = S[x], C = y.references[g], P = Ie(qe(C.node)), O = [
              { type: "Literal", value: g },
              { type: "Literal", value: C.component }
            ];
            u = !0, t && P && O.push({ type: "Literal", value: P }), E.push({
              type: "IfStatement",
              test: {
                type: "UnaryExpression",
                operator: "!",
                prefix: !0,
                argument: Ze(g.split("."))
              },
              consequent: {
                type: "ExpressionStatement",
                expression: {
                  type: "CallExpression",
                  callee: { type: "Identifier", name: "_missingMdxReference" },
                  arguments: O,
                  optional: !1
                }
              },
              alternate: void 0
            });
          }
          E.length > 0 && (I.body.type !== "BlockStatement" && (I.body = {
            type: "BlockStatement",
            body: [{ type: "ReturnStatement", argument: I.body }]
          }), I.body.body.unshift(...E)), o.pop();
        }
      }
    }), l && i && r.body.unshift(
      dh(i, n)
    ), u) {
      const p = [
        { type: "Literal", value: "Expected " },
        {
          type: "ConditionalExpression",
          test: { type: "Identifier", name: "component" },
          consequent: { type: "Literal", value: "component" },
          alternate: { type: "Literal", value: "object" }
        },
        { type: "Literal", value: " `" },
        { type: "Identifier", name: "id" },
        {
          type: "Literal",
          value: "` to be defined: you likely forgot to import, pass, or provide it."
        }
      ], m = [
        { type: "Identifier", name: "id" },
        { type: "Identifier", name: "component" }
      ];
      t && (p.push({
        type: "ConditionalExpression",
        test: { type: "Identifier", name: "place" },
        consequent: Pr([
          { type: "Literal", value: "\nIt’s referenced in your code at `" },
          { type: "Identifier", name: "place" },
          {
            type: "Literal",
            value: (s.path ? "` in `" + s.path : "") + "`"
          }
        ]),
        alternate: { type: "Literal", value: "" }
      }), m.push({ type: "Identifier", name: "place" })), r.body.push({
        type: "FunctionDeclaration",
        id: { type: "Identifier", name: "_missingMdxReference" },
        generator: !1,
        async: !1,
        params: m,
        body: {
          type: "BlockStatement",
          body: [
            {
              type: "ThrowStatement",
              argument: {
                type: "NewExpression",
                callee: { type: "Identifier", name: "Error" },
                arguments: [Pr(p)]
              }
            }
          ]
        }
      });
    }
    n === "function-body" && r.body.unshift({
      type: "ExpressionStatement",
      expression: { type: "Literal", value: "use strict" },
      directive: "use strict"
    });
  };
}
function dh(e, t) {
  const n = [
    {
      type: "ImportSpecifier",
      imported: { type: "Identifier", name: "useMDXComponents" },
      local: { type: "Identifier", name: "_provideComponents" }
    }
  ];
  return t === "function-body" ? {
    type: "VariableDeclaration",
    kind: "const",
    declarations: Ei(
      n,
      Ze(["arguments", 0])
    )
  } : {
    type: "ImportDeclaration",
    specifiers: n,
    source: { type: "Literal", value: e }
  };
}
function dt(e, t) {
  return !!(e && "id" in e && e.id && e.id.name === t);
}
function Xn(e, t) {
  let n = e;
  for (; n; ) {
    if (n.declarations.has(t))
      return !0;
    n = /** @type {Scope | undefined} */
    n.parent || void 0;
  }
  return !1;
}
const { stringify: xh } = JSON;
if (!String.prototype.repeat)
  throw new Error(
    "String.prototype.repeat is undefined, see https://github.com/davidbonnet/astring#installation"
  );
if (!String.prototype.endsWith)
  throw new Error(
    "String.prototype.endsWith is undefined, see https://github.com/davidbonnet/astring#installation"
  );
const rn = {
  "||": 2,
  "??": 3,
  "&&": 4,
  "|": 5,
  "^": 6,
  "&": 7,
  "==": 8,
  "!=": 8,
  "===": 8,
  "!==": 8,
  "<": 9,
  ">": 9,
  "<=": 9,
  ">=": 9,
  in: 9,
  instanceof: 9,
  "<<": 10,
  ">>": 10,
  ">>>": 10,
  "+": 11,
  "-": 11,
  "*": 12,
  "%": 12,
  "/": 12,
  "**": 13
}, Le = 17, gh = {
  // Definitions
  ArrayExpression: 20,
  TaggedTemplateExpression: 20,
  ThisExpression: 20,
  Identifier: 20,
  PrivateIdentifier: 20,
  Literal: 18,
  TemplateLiteral: 20,
  Super: 20,
  SequenceExpression: 20,
  // Operations
  MemberExpression: 19,
  ChainExpression: 19,
  CallExpression: 19,
  NewExpression: 19,
  // Other definitions
  ArrowFunctionExpression: Le,
  ClassExpression: Le,
  FunctionExpression: Le,
  ObjectExpression: Le,
  // Other operations
  UpdateExpression: 16,
  UnaryExpression: 15,
  AwaitExpression: 15,
  BinaryExpression: 14,
  LogicalExpression: 13,
  ConditionalExpression: 4,
  AssignmentExpression: 3,
  YieldExpression: 2,
  RestElement: 1
};
function xt(e, t) {
  const { generator: n } = e;
  if (e.write("("), t != null && t.length > 0) {
    n[t[0].type](t[0], e);
    const { length: i } = t;
    for (let r = 1; r < i; r++) {
      const s = t[r];
      e.write(", "), n[s.type](s, e);
    }
  }
  e.write(")");
}
function ya(e, t, n, i) {
  const r = e.expressionsPrecedence[t.type];
  if (r === Le)
    return !0;
  const s = e.expressionsPrecedence[n.type];
  return r !== s ? !i && r === 15 && s === 14 && n.operator === "**" || r < s : r !== 13 && r !== 14 ? !1 : t.operator === "**" && n.operator === "**" ? !i : r === 13 && s === 13 && (t.operator === "??" || n.operator === "??") ? !0 : i ? rn[t.operator] <= rn[n.operator] : rn[t.operator] < rn[n.operator];
}
function sn(e, t, n, i) {
  const { generator: r } = e;
  ya(e, t, n, i) ? (e.write("("), r[t.type](t, e), e.write(")")) : r[t.type](t, e);
}
function yh(e, t, n, i) {
  const r = t.split(`
`), s = r.length - 1;
  if (e.write(r[0].trim()), s > 0) {
    e.write(i);
    for (let a = 1; a < s; a++)
      e.write(n + r[a].trim() + i);
    e.write(n + r[s].trim());
  }
}
function le(e, t, n, i) {
  const { length: r } = t;
  for (let s = 0; s < r; s++) {
    const a = t[s];
    e.write(n), a.type[0] === "L" ? e.write("// " + a.value.trim() + `
`, a) : (e.write("/*"), yh(e, a.value, n, i), e.write("*/" + i));
  }
}
function bh(e) {
  let t = e;
  for (; t != null; ) {
    const { type: n } = t;
    if (n[0] === "C" && n[1] === "a")
      return !0;
    if (n[0] === "M" && n[1] === "e" && n[2] === "m")
      t = t.object;
    else
      return !1;
  }
}
function qn(e, t) {
  const { generator: n } = e, { declarations: i } = t;
  e.write(t.kind + " ");
  const { length: r } = i;
  if (r > 0) {
    n.VariableDeclarator(i[0], e);
    for (let s = 1; s < r; s++)
      e.write(", "), n.VariableDeclarator(i[s], e);
  }
}
let Nr, Lr, Fr, Dr, Or, Mr;
const ba = {
  /*
  Default generator.
  */
  Program(e, t) {
    const n = t.indent.repeat(t.indentLevel), { lineEnd: i, writeComments: r } = t;
    r && e.comments != null && le(t, e.comments, n, i);
    const s = e.body, { length: a } = s;
    for (let o = 0; o < a; o++) {
      const l = s[o];
      r && l.comments != null && le(t, l.comments, n, i), t.write(n), this[l.type](l, t), t.write(i);
    }
    r && e.trailingComments != null && le(t, e.trailingComments, n, i);
  },
  BlockStatement: Mr = function(e, t) {
    const n = t.indent.repeat(t.indentLevel++), { lineEnd: i, writeComments: r } = t, s = n + t.indent;
    t.write("{");
    const a = e.body;
    if (a != null && a.length > 0) {
      t.write(i), r && e.comments != null && le(t, e.comments, s, i);
      const { length: o } = a;
      for (let l = 0; l < o; l++) {
        const u = a[l];
        r && u.comments != null && le(t, u.comments, s, i), t.write(s), this[u.type](u, t), t.write(i);
      }
      t.write(n);
    } else
      r && e.comments != null && (t.write(i), le(t, e.comments, s, i), t.write(n));
    r && e.trailingComments != null && le(t, e.trailingComments, s, i), t.write("}"), t.indentLevel--;
  },
  ClassBody: Mr,
  StaticBlock(e, t) {
    t.write("static "), this.BlockStatement(e, t);
  },
  EmptyStatement(e, t) {
    t.write(";");
  },
  ExpressionStatement(e, t) {
    const n = t.expressionsPrecedence[e.expression.type];
    n === Le || n === 3 && e.expression.left.type[0] === "O" ? (t.write("("), this[e.expression.type](e.expression, t), t.write(")")) : this[e.expression.type](e.expression, t), t.write(";");
  },
  IfStatement(e, t) {
    t.write("if ("), this[e.test.type](e.test, t), t.write(") "), this[e.consequent.type](e.consequent, t), e.alternate != null && (t.write(" else "), this[e.alternate.type](e.alternate, t));
  },
  LabeledStatement(e, t) {
    this[e.label.type](e.label, t), t.write(": "), this[e.body.type](e.body, t);
  },
  BreakStatement(e, t) {
    t.write("break"), e.label != null && (t.write(" "), this[e.label.type](e.label, t)), t.write(";");
  },
  ContinueStatement(e, t) {
    t.write("continue"), e.label != null && (t.write(" "), this[e.label.type](e.label, t)), t.write(";");
  },
  WithStatement(e, t) {
    t.write("with ("), this[e.object.type](e.object, t), t.write(") "), this[e.body.type](e.body, t);
  },
  SwitchStatement(e, t) {
    const n = t.indent.repeat(t.indentLevel++), { lineEnd: i, writeComments: r } = t;
    t.indentLevel++;
    const s = n + t.indent, a = s + t.indent;
    t.write("switch ("), this[e.discriminant.type](e.discriminant, t), t.write(") {" + i);
    const { cases: o } = e, { length: l } = o;
    for (let u = 0; u < l; u++) {
      const c = o[u];
      r && c.comments != null && le(t, c.comments, s, i), c.test ? (t.write(s + "case "), this[c.test.type](c.test, t), t.write(":" + i)) : t.write(s + "default:" + i);
      const { consequent: p } = c, { length: m } = p;
      for (let h = 0; h < m; h++) {
        const v = p[h];
        r && v.comments != null && le(t, v.comments, a, i), t.write(a), this[v.type](v, t), t.write(i);
      }
    }
    t.indentLevel -= 2, t.write(n + "}");
  },
  ReturnStatement(e, t) {
    t.write("return"), e.argument && (t.write(" "), this[e.argument.type](e.argument, t)), t.write(";");
  },
  ThrowStatement(e, t) {
    t.write("throw "), this[e.argument.type](e.argument, t), t.write(";");
  },
  TryStatement(e, t) {
    if (t.write("try "), this[e.block.type](e.block, t), e.handler) {
      const { handler: n } = e;
      n.param == null ? t.write(" catch ") : (t.write(" catch ("), this[n.param.type](n.param, t), t.write(") ")), this[n.body.type](n.body, t);
    }
    e.finalizer && (t.write(" finally "), this[e.finalizer.type](e.finalizer, t));
  },
  WhileStatement(e, t) {
    t.write("while ("), this[e.test.type](e.test, t), t.write(") "), this[e.body.type](e.body, t);
  },
  DoWhileStatement(e, t) {
    t.write("do "), this[e.body.type](e.body, t), t.write(" while ("), this[e.test.type](e.test, t), t.write(");");
  },
  ForStatement(e, t) {
    if (t.write("for ("), e.init != null) {
      const { init: n } = e;
      n.type[0] === "V" ? qn(t, n) : this[n.type](n, t);
    }
    t.write("; "), e.test && this[e.test.type](e.test, t), t.write("; "), e.update && this[e.update.type](e.update, t), t.write(") "), this[e.body.type](e.body, t);
  },
  ForInStatement: Nr = function(e, t) {
    t.write(`for ${e.await ? "await " : ""}(`);
    const { left: n } = e;
    n.type[0] === "V" ? qn(t, n) : this[n.type](n, t), t.write(e.type[3] === "I" ? " in " : " of "), this[e.right.type](e.right, t), t.write(") "), this[e.body.type](e.body, t);
  },
  ForOfStatement: Nr,
  DebuggerStatement(e, t) {
    t.write("debugger;", e);
  },
  FunctionDeclaration: Lr = function(e, t) {
    t.write(
      (e.async ? "async " : "") + (e.generator ? "function* " : "function ") + (e.id ? e.id.name : ""),
      e
    ), xt(t, e.params), t.write(" "), this[e.body.type](e.body, t);
  },
  FunctionExpression: Lr,
  VariableDeclaration(e, t) {
    qn(t, e), t.write(";");
  },
  VariableDeclarator(e, t) {
    this[e.id.type](e.id, t), e.init != null && (t.write(" = "), this[e.init.type](e.init, t));
  },
  ClassDeclaration(e, t) {
    if (t.write("class " + (e.id ? `${e.id.name} ` : ""), e), e.superClass) {
      t.write("extends ");
      const { superClass: n } = e, { type: i } = n, r = t.expressionsPrecedence[i];
      (i[0] !== "C" || i[1] !== "l" || i[5] !== "E") && (r === Le || r < t.expressionsPrecedence.ClassExpression) ? (t.write("("), this[e.superClass.type](n, t), t.write(")")) : this[n.type](n, t), t.write(" ");
    }
    this.ClassBody(e.body, t);
  },
  ImportDeclaration(e, t) {
    t.write("import ");
    const { specifiers: n, attributes: i } = e, { length: r } = n;
    let s = 0;
    if (r > 0) {
      for (; s < r; ) {
        s > 0 && t.write(", ");
        const a = n[s], o = a.type[6];
        if (o === "D")
          t.write(a.local.name, a), s++;
        else if (o === "N")
          t.write("* as " + a.local.name, a), s++;
        else
          break;
      }
      if (s < r) {
        for (t.write("{"); ; ) {
          const a = n[s], { name: o } = a.imported;
          if (t.write(o, a), o !== a.local.name && t.write(" as " + a.local.name), ++s < r)
            t.write(", ");
          else
            break;
        }
        t.write("}");
      }
      t.write(" from ");
    }
    if (this.Literal(e.source, t), i && i.length > 0) {
      t.write(" with { ");
      for (let a = 0; a < i.length; a++)
        this.ImportAttribute(i[a], t), a < i.length - 1 && t.write(", ");
      t.write(" }");
    }
    t.write(";");
  },
  ImportAttribute(e, t) {
    this.Identifier(e.key, t), t.write(": "), this.Literal(e.value, t);
  },
  ImportExpression(e, t) {
    t.write("import("), this[e.source.type](e.source, t), t.write(")");
  },
  ExportDefaultDeclaration(e, t) {
    t.write("export default "), this[e.declaration.type](e.declaration, t), t.expressionsPrecedence[e.declaration.type] != null && e.declaration.type[0] !== "F" && t.write(";");
  },
  ExportNamedDeclaration(e, t) {
    if (t.write("export "), e.declaration)
      this[e.declaration.type](e.declaration, t);
    else {
      t.write("{");
      const { specifiers: n } = e, { length: i } = n;
      if (i > 0)
        for (let r = 0; ; ) {
          const s = n[r], { name: a } = s.local;
          if (t.write(a, s), a !== s.exported.name && t.write(" as " + s.exported.name), ++r < i)
            t.write(", ");
          else
            break;
        }
      if (t.write("}"), e.source && (t.write(" from "), this.Literal(e.source, t)), e.attributes && e.attributes.length > 0) {
        t.write(" with { ");
        for (let r = 0; r < e.attributes.length; r++)
          this.ImportAttribute(e.attributes[r], t), r < e.attributes.length - 1 && t.write(", ");
        t.write(" }");
      }
      t.write(";");
    }
  },
  ExportAllDeclaration(e, t) {
    if (e.exported != null ? t.write("export * as " + e.exported.name + " from ") : t.write("export * from "), this.Literal(e.source, t), e.attributes && e.attributes.length > 0) {
      t.write(" with { ");
      for (let n = 0; n < e.attributes.length; n++)
        this.ImportAttribute(e.attributes[n], t), n < e.attributes.length - 1 && t.write(", ");
      t.write(" }");
    }
    t.write(";");
  },
  MethodDefinition(e, t) {
    e.static && t.write("static ");
    const n = e.kind[0];
    (n === "g" || n === "s") && t.write(e.kind + " "), e.value.async && t.write("async "), e.value.generator && t.write("*"), e.computed ? (t.write("["), this[e.key.type](e.key, t), t.write("]")) : this[e.key.type](e.key, t), xt(t, e.value.params), t.write(" "), this[e.value.body.type](e.value.body, t);
  },
  ClassExpression(e, t) {
    this.ClassDeclaration(e, t);
  },
  ArrowFunctionExpression(e, t) {
    t.write(e.async ? "async " : "", e);
    const { params: n } = e;
    n != null && (n.length === 1 && n[0].type[0] === "I" ? t.write(n[0].name, n[0]) : xt(t, e.params)), t.write(" => "), e.body.type[0] === "O" ? (t.write("("), this.ObjectExpression(e.body, t), t.write(")")) : this[e.body.type](e.body, t);
  },
  ThisExpression(e, t) {
    t.write("this", e);
  },
  Super(e, t) {
    t.write("super", e);
  },
  RestElement: Fr = function(e, t) {
    t.write("..."), this[e.argument.type](e.argument, t);
  },
  SpreadElement: Fr,
  YieldExpression(e, t) {
    t.write(e.delegate ? "yield*" : "yield"), e.argument && (t.write(" "), this[e.argument.type](e.argument, t));
  },
  AwaitExpression(e, t) {
    t.write("await ", e), sn(t, e.argument, e);
  },
  TemplateLiteral(e, t) {
    const { quasis: n, expressions: i } = e;
    t.write("`");
    const { length: r } = i;
    for (let a = 0; a < r; a++) {
      const o = i[a], l = n[a];
      t.write(l.value.raw, l), t.write("${"), this[o.type](o, t), t.write("}");
    }
    const s = n[n.length - 1];
    t.write(s.value.raw, s), t.write("`");
  },
  TemplateElement(e, t) {
    t.write(e.value.raw, e);
  },
  TaggedTemplateExpression(e, t) {
    sn(t, e.tag, e), this[e.quasi.type](e.quasi, t);
  },
  ArrayExpression: Or = function(e, t) {
    if (t.write("["), e.elements.length > 0) {
      const { elements: n } = e, { length: i } = n;
      for (let r = 0; ; ) {
        const s = n[r];
        if (s != null && this[s.type](s, t), ++r < i)
          t.write(", ");
        else {
          s == null && t.write(", ");
          break;
        }
      }
    }
    t.write("]");
  },
  ArrayPattern: Or,
  ObjectExpression(e, t) {
    const n = t.indent.repeat(t.indentLevel++), { lineEnd: i, writeComments: r } = t, s = n + t.indent;
    if (t.write("{"), e.properties.length > 0) {
      t.write(i), r && e.comments != null && le(t, e.comments, s, i);
      const a = "," + i, { properties: o } = e, { length: l } = o;
      for (let u = 0; ; ) {
        const c = o[u];
        if (r && c.comments != null && le(t, c.comments, s, i), t.write(s), this[c.type](c, t), ++u < l)
          t.write(a);
        else
          break;
      }
      t.write(i), r && e.trailingComments != null && le(t, e.trailingComments, s, i), t.write(n + "}");
    } else r ? e.comments != null ? (t.write(i), le(t, e.comments, s, i), e.trailingComments != null && le(t, e.trailingComments, s, i), t.write(n + "}")) : e.trailingComments != null ? (t.write(i), le(t, e.trailingComments, s, i), t.write(n + "}")) : t.write("}") : t.write("}");
    t.indentLevel--;
  },
  Property(e, t) {
    e.method || e.kind[0] !== "i" ? this.MethodDefinition(e, t) : (e.shorthand || (e.computed ? (t.write("["), this[e.key.type](e.key, t), t.write("]")) : this[e.key.type](e.key, t), t.write(": ")), this[e.value.type](e.value, t));
  },
  PropertyDefinition(e, t) {
    if (e.static && t.write("static "), e.computed && t.write("["), this[e.key.type](e.key, t), e.computed && t.write("]"), e.value == null) {
      e.key.type[0] !== "F" && t.write(";");
      return;
    }
    t.write(" = "), this[e.value.type](e.value, t), t.write(";");
  },
  ObjectPattern(e, t) {
    if (t.write("{"), e.properties.length > 0) {
      const { properties: n } = e, { length: i } = n;
      for (let r = 0; this[n[r].type](n[r], t), ++r < i; )
        t.write(", ");
    }
    t.write("}");
  },
  SequenceExpression(e, t) {
    xt(t, e.expressions);
  },
  UnaryExpression(e, t) {
    if (e.prefix) {
      const {
        operator: n,
        argument: i,
        argument: { type: r }
      } = e;
      t.write(n);
      const s = ya(t, i, e);
      !s && (n.length > 1 || r[0] === "U" && (r[1] === "n" || r[1] === "p") && i.prefix && i.operator[0] === n && (n === "+" || n === "-")) && t.write(" "), s ? (t.write(n.length > 1 ? " (" : "("), this[r](i, t), t.write(")")) : this[r](i, t);
    } else
      this[e.argument.type](e.argument, t), t.write(e.operator);
  },
  UpdateExpression(e, t) {
    e.prefix ? (t.write(e.operator), this[e.argument.type](e.argument, t)) : (this[e.argument.type](e.argument, t), t.write(e.operator));
  },
  AssignmentExpression(e, t) {
    this[e.left.type](e.left, t), t.write(" " + e.operator + " "), this[e.right.type](e.right, t);
  },
  AssignmentPattern(e, t) {
    this[e.left.type](e.left, t), t.write(" = "), this[e.right.type](e.right, t);
  },
  BinaryExpression: Dr = function(e, t) {
    const n = e.operator === "in";
    n && t.write("("), sn(t, e.left, e, !1), t.write(" " + e.operator + " "), sn(t, e.right, e, !0), n && t.write(")");
  },
  LogicalExpression: Dr,
  ConditionalExpression(e, t) {
    const { test: n } = e, i = t.expressionsPrecedence[n.type];
    i === Le || i <= t.expressionsPrecedence.ConditionalExpression ? (t.write("("), this[n.type](n, t), t.write(")")) : this[n.type](n, t), t.write(" ? "), this[e.consequent.type](e.consequent, t), t.write(" : "), this[e.alternate.type](e.alternate, t);
  },
  NewExpression(e, t) {
    t.write("new ");
    const n = t.expressionsPrecedence[e.callee.type];
    n === Le || n < t.expressionsPrecedence.CallExpression || bh(e.callee) ? (t.write("("), this[e.callee.type](e.callee, t), t.write(")")) : this[e.callee.type](e.callee, t), xt(t, e.arguments);
  },
  CallExpression(e, t) {
    const n = t.expressionsPrecedence[e.callee.type];
    n === Le || n < t.expressionsPrecedence.CallExpression ? (t.write("("), this[e.callee.type](e.callee, t), t.write(")")) : this[e.callee.type](e.callee, t), e.optional && t.write("?."), xt(t, e.arguments);
  },
  ChainExpression(e, t) {
    this[e.expression.type](e.expression, t);
  },
  MemberExpression(e, t) {
    const n = t.expressionsPrecedence[e.object.type];
    n === Le || n < t.expressionsPrecedence.MemberExpression ? (t.write("("), this[e.object.type](e.object, t), t.write(")")) : this[e.object.type](e.object, t), e.computed ? (e.optional && t.write("?."), t.write("["), this[e.property.type](e.property, t), t.write("]")) : (e.optional ? t.write("?.") : t.write("."), this[e.property.type](e.property, t));
  },
  MetaProperty(e, t) {
    t.write(e.meta.name + "." + e.property.name, e);
  },
  Identifier(e, t) {
    t.write(e.name, e);
  },
  PrivateIdentifier(e, t) {
    t.write(`#${e.name}`, e);
  },
  Literal(e, t) {
    e.raw != null ? t.write(e.raw, e) : e.regex != null ? this.RegExpLiteral(e, t) : e.bigint != null ? t.write(e.bigint + "n", e) : t.write(xh(e.value), e);
  },
  RegExpLiteral(e, t) {
    const { regex: n } = e;
    t.write(`/${n.pattern}/${n.flags}`, e);
  }
}, wh = {};
class kh {
  constructor(t) {
    const n = t ?? wh;
    this.output = "", n.output != null ? (this.output = n.output, this.write = this.writeToStream) : this.output = "", this.generator = n.generator != null ? n.generator : ba, this.expressionsPrecedence = n.expressionsPrecedence != null ? n.expressionsPrecedence : gh, this.indent = n.indent != null ? n.indent : "  ", this.lineEnd = n.lineEnd != null ? n.lineEnd : `
`, this.indentLevel = n.startingIndentLevel != null ? n.startingIndentLevel : 0, this.writeComments = n.comments ? n.comments : !1, n.sourceMap != null && (this.write = n.output == null ? this.writeAndMap : this.writeToStreamAndMap, this.sourceMap = n.sourceMap, this.line = 1, this.column = 0, this.lineEndSize = this.lineEnd.split(`
`).length - 1, this.mapping = {
      original: null,
      // Uses the entire state to avoid generating ephemeral objects
      generated: this,
      name: void 0,
      source: n.sourceMap.file || n.sourceMap._file
    });
  }
  write(t) {
    this.output += t;
  }
  writeToStream(t) {
    this.output.write(t);
  }
  writeAndMap(t, n) {
    this.output += t, this.map(t, n);
  }
  writeToStreamAndMap(t, n) {
    this.output.write(t), this.map(t, n);
  }
  map(t, n) {
    if (n != null) {
      const { type: s } = n;
      if (s[0] === "L" && s[2] === "n") {
        this.column = 0, this.line++;
        return;
      }
      if (n.loc != null) {
        const { mapping: a } = this;
        a.original = n.loc.start, a.name = n.name, this.sourceMap.addMapping(a);
      }
      if (s[0] === "T" && s[8] === "E" || s[0] === "L" && s[1] === "i" && typeof n.value == "string") {
        const { length: a } = t;
        let { column: o, line: l } = this;
        for (let u = 0; u < a; u++)
          t[u] === `
` ? (o = 0, l++) : o++;
        this.column = o, this.line = l;
        return;
      }
    }
    const { length: i } = t, { lineEnd: r } = this;
    i > 0 && (this.lineEndSize > 0 && (r.length === 1 ? t[i - 1] === r : t.endsWith(r)) ? (this.line += this.lineEndSize, this.column = 0) : this.column += i);
  }
  toString() {
    return this.output;
  }
}
function vh(e, t) {
  const n = new kh(t);
  return n.generator[e.type](e, n), n.output;
}
const Sh = {};
function Rr(e, t) {
  const { SourceMapGenerator: n, filePath: i, handlers: r } = t || Sh, s = n ? new n({ file: i || "<unknown>.js" }) : void 0, a = vh(
    e,
    // @ts-expect-error: `sourceMap` can be undefined, `astring` types are buggy.
    {
      comments: !0,
      generator: { ...ba, ...r },
      sourceMap: s || void 0
    }
  ), o = s ? s.toJSON() : void 0;
  return { value: a, map: o };
}
const jr = {
  JSXAttribute: Eh,
  JSXClosingElement: Ch,
  JSXClosingFragment: Ih,
  JSXElement: Ah,
  JSXEmptyExpression: _h,
  JSXExpressionContainer: Th,
  JSXFragment: Ph,
  JSXIdentifier: Nh,
  JSXMemberExpression: Lh,
  JSXNamespacedName: Fh,
  JSXOpeningElement: Dh,
  JSXOpeningFragment: Oh,
  JSXSpreadAttribute: Mh,
  JSXText: Rh
};
function Eh(e, t) {
  this[e.name.type](e.name, t), e.value !== null && e.value !== void 0 && (t.write("="), e.value.type === "Literal" ? t.write(
    '"' + wa(String(e.value.value)).replace(/"/g, "&quot;") + '"',
    e
  ) : this[e.value.type](e.value, t));
}
function Ch(e, t) {
  t.write("</"), this[e.name.type](e.name, t), t.write(">");
}
function Ih(e, t) {
  t.write("</>", e);
}
function Ah(e, t) {
  let n = -1;
  if (this[e.openingElement.type](e.openingElement, t), e.children)
    for (; ++n < e.children.length; ) {
      const i = e.children[n];
      if (i.type === "JSXSpreadChild")
        throw new Error("JSX spread children are not supported");
      this[i.type](i, t);
    }
  e.closingElement && this[e.closingElement.type](e.closingElement, t);
}
function _h() {
}
function Th(e, t) {
  t.write("{"), this[e.expression.type](e.expression, t), t.write("}");
}
function Ph(e, t) {
  let n = -1;
  if (this[e.openingFragment.type](e.openingFragment, t), e.children)
    for (; ++n < e.children.length; ) {
      const i = e.children[n];
      if (i.type === "JSXSpreadChild")
        throw new Error("JSX spread children are not supported");
      this[i.type](i, t);
    }
  this[e.closingFragment.type](e.closingFragment, t);
}
function Nh(e, t) {
  t.write(e.name, e);
}
function Lh(e, t) {
  this[e.object.type](e.object, t), t.write("."), this[e.property.type](e.property, t);
}
function Fh(e, t) {
  this[e.namespace.type](e.namespace, t), t.write(":"), this[e.name.type](e.name, t);
}
function Dh(e, t) {
  let n = -1;
  if (t.write("<"), this[e.name.type](e.name, t), e.attributes)
    for (; ++n < e.attributes.length; )
      t.write(" "), this[e.attributes[n].type](e.attributes[n], t);
  t.write(e.selfClosing ? " />" : ">");
}
function Oh(e, t) {
  t.write("<>", e);
}
function Mh(e, t) {
  t.write("{"), this.SpreadElement(e, t), t.write("}");
}
function Rh(e, t) {
  t.write(wa(e.value).replace(/[<>{}]/g, jh), e);
}
function wa(e) {
  return e.replace(/&(?=[#a-z])/gi, "&amp;");
}
function jh(e) {
  return e === "<" ? "&lt;" : e === ">" ? "&gt;" : e === "{" ? "&#123;" : "&#125;";
}
function Vh(e) {
  const t = (
    /** @type {Processor} */
    this
  ), { SourceMapGenerator: n } = e;
  t.compiler = i;
  function i(r, s) {
    const a = n ? Rr(r, {
      SourceMapGenerator: n,
      filePath: s.path || "unknown.mdx",
      handlers: jr
    }) : Rr(r, { handlers: jr });
    return s.map = a.map, a.value;
  }
}
function Bh(e, t) {
  const n = { type: "Block", value: e.value };
  t.inherit(e, n), t.comments.push(n);
  const i = {
    type: "JSXEmptyExpression",
    // @ts-expect-error: `comments` is custom.
    comments: [Object.assign({}, n, { leading: !1, trailing: !0 })]
  };
  t.patch(e, i);
  const r = { type: "JSXExpressionContainer", expression: i };
  return t.patch(e, r), r;
}
function Jh(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
class qt {
  /**
   * @constructor
   * @param {Properties} property
   * @param {Normal} normal
   * @param {string} [space]
   */
  constructor(t, n, i) {
    this.property = t, this.normal = n, i && (this.space = i);
  }
}
qt.prototype.property = {};
qt.prototype.normal = {};
qt.prototype.space = null;
function ka(e, t) {
  const n = {}, i = {};
  let r = -1;
  for (; ++r < e.length; )
    Object.assign(n, e[r].property), Object.assign(i, e[r].normal);
  return new qt(n, i, t);
}
function ri(e) {
  return e.toLowerCase();
}
class _e {
  /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   */
  constructor(t, n) {
    this.property = t, this.attribute = n;
  }
}
_e.prototype.space = null;
_e.prototype.boolean = !1;
_e.prototype.booleanish = !1;
_e.prototype.overloadedBoolean = !1;
_e.prototype.number = !1;
_e.prototype.commaSeparated = !1;
_e.prototype.spaceSeparated = !1;
_e.prototype.commaOrSpaceSeparated = !1;
_e.prototype.mustUseProperty = !1;
_e.prototype.defined = !1;
let zh = 0;
const B = lt(), ae = lt(), va = lt(), F = lt(), Z = lt(), wt = lt(), ge = lt();
function lt() {
  return 2 ** ++zh;
}
const si = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: B,
  booleanish: ae,
  commaOrSpaceSeparated: ge,
  commaSeparated: wt,
  number: F,
  overloadedBoolean: va,
  spaceSeparated: Z
}, Symbol.toStringTag, { value: "Module" })), Hn = Object.keys(si);
class Ci extends _e {
  /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   * @param {number|null} [mask]
   * @param {string} [space]
   */
  constructor(t, n, i, r) {
    let s = -1;
    if (super(t, n), Vr(this, "space", r), typeof i == "number")
      for (; ++s < Hn.length; ) {
        const a = Hn[s];
        Vr(this, Hn[s], (i & si[a]) === si[a]);
      }
  }
}
Ci.prototype.defined = !0;
function Vr(e, t, n) {
  n && (e[t] = n);
}
const Uh = {}.hasOwnProperty;
function Ct(e) {
  const t = {}, n = {};
  let i;
  for (i in e.properties)
    if (Uh.call(e.properties, i)) {
      const r = e.properties[i], s = new Ci(
        i,
        e.transform(e.attributes || {}, i),
        r,
        e.space
      );
      e.mustUseProperty && e.mustUseProperty.includes(i) && (s.mustUseProperty = !0), t[i] = s, n[ri(i)] = i, n[ri(s.attribute)] = i;
    }
  return new qt(t, n, e.space);
}
const Sa = Ct({
  space: "xlink",
  transform(e, t) {
    return "xlink:" + t.slice(5).toLowerCase();
  },
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  }
}), Ea = Ct({
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  },
  properties: { xmlLang: null, xmlBase: null, xmlSpace: null }
});
function Ca(e, t) {
  return t in e ? e[t] : t;
}
function Ia(e, t) {
  return Ca(e, t.toLowerCase());
}
const Aa = Ct({
  space: "xmlns",
  attributes: { xmlnsxlink: "xmlns:xlink" },
  transform: Ia,
  properties: { xmlns: null, xmlnsXLink: null }
}), _a = Ct({
  transform(e, t) {
    return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
  },
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: ae,
    ariaAutoComplete: null,
    ariaBusy: ae,
    ariaChecked: ae,
    ariaColCount: F,
    ariaColIndex: F,
    ariaColSpan: F,
    ariaControls: Z,
    ariaCurrent: null,
    ariaDescribedBy: Z,
    ariaDetails: null,
    ariaDisabled: ae,
    ariaDropEffect: Z,
    ariaErrorMessage: null,
    ariaExpanded: ae,
    ariaFlowTo: Z,
    ariaGrabbed: ae,
    ariaHasPopup: null,
    ariaHidden: ae,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: Z,
    ariaLevel: F,
    ariaLive: null,
    ariaModal: ae,
    ariaMultiLine: ae,
    ariaMultiSelectable: ae,
    ariaOrientation: null,
    ariaOwns: Z,
    ariaPlaceholder: null,
    ariaPosInSet: F,
    ariaPressed: ae,
    ariaReadOnly: ae,
    ariaRelevant: null,
    ariaRequired: ae,
    ariaRoleDescription: Z,
    ariaRowCount: F,
    ariaRowIndex: F,
    ariaRowSpan: F,
    ariaSelected: ae,
    ariaSetSize: F,
    ariaSort: null,
    ariaValueMax: F,
    ariaValueMin: F,
    ariaValueNow: F,
    ariaValueText: null,
    role: null
  }
}), Xh = Ct({
  space: "html",
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  transform: Ia,
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: wt,
    acceptCharset: Z,
    accessKey: Z,
    action: null,
    allow: null,
    allowFullScreen: B,
    allowPaymentRequest: B,
    allowUserMedia: B,
    alt: null,
    as: null,
    async: B,
    autoCapitalize: null,
    autoComplete: Z,
    autoFocus: B,
    autoPlay: B,
    blocking: Z,
    capture: null,
    charSet: null,
    checked: B,
    cite: null,
    className: Z,
    cols: F,
    colSpan: null,
    content: null,
    contentEditable: ae,
    controls: B,
    controlsList: Z,
    coords: F | wt,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: B,
    defer: B,
    dir: null,
    dirName: null,
    disabled: B,
    download: va,
    draggable: ae,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: B,
    formTarget: null,
    headers: Z,
    height: F,
    hidden: B,
    high: F,
    href: null,
    hrefLang: null,
    htmlFor: Z,
    httpEquiv: Z,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: B,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: B,
    itemId: null,
    itemProp: Z,
    itemRef: Z,
    itemScope: B,
    itemType: Z,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: B,
    low: F,
    manifest: null,
    max: null,
    maxLength: F,
    media: null,
    method: null,
    min: null,
    minLength: F,
    multiple: B,
    muted: B,
    name: null,
    nonce: null,
    noModule: B,
    noValidate: B,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: B,
    optimum: F,
    pattern: null,
    ping: Z,
    placeholder: null,
    playsInline: B,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: B,
    referrerPolicy: null,
    rel: Z,
    required: B,
    reversed: B,
    rows: F,
    rowSpan: F,
    sandbox: Z,
    scope: null,
    scoped: B,
    seamless: B,
    selected: B,
    shadowRootClonable: B,
    shadowRootDelegatesFocus: B,
    shadowRootMode: null,
    shape: null,
    size: F,
    sizes: null,
    slot: null,
    span: F,
    spellCheck: ae,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: F,
    step: null,
    style: null,
    tabIndex: F,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: B,
    useMap: null,
    value: ae,
    width: F,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: Z,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: F,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: F,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: B,
    // Lists. Use CSS to reduce space between items instead
    declare: B,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: F,
    // `<img>` and `<object>`
    leftMargin: F,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: F,
    // `<body>`
    marginWidth: F,
    // `<body>`
    noResize: B,
    // `<frame>`
    noHref: B,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: B,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: B,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: F,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: ae,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: F,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: F,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: B,
    disableRemotePlayback: B,
    prefix: null,
    property: null,
    results: F,
    security: null,
    unselectable: null
  }
}), qh = Ct({
  space: "svg",
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  transform: Ca,
  properties: {
    about: ge,
    accentHeight: F,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: F,
    amplitude: F,
    arabicForm: null,
    ascent: F,
    attributeName: null,
    attributeType: null,
    azimuth: F,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: F,
    by: null,
    calcMode: null,
    capHeight: F,
    className: Z,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: F,
    diffuseConstant: F,
    direction: null,
    display: null,
    dur: null,
    divisor: F,
    dominantBaseline: null,
    download: B,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: F,
    enableBackground: null,
    end: null,
    event: null,
    exponent: F,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: F,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: wt,
    g2: wt,
    glyphName: wt,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: F,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: F,
    horizOriginX: F,
    horizOriginY: F,
    id: null,
    ideographic: F,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: F,
    k: F,
    k1: F,
    k2: F,
    k3: F,
    k4: F,
    kernelMatrix: ge,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: F,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: F,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: F,
    overlineThickness: F,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: F,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: Z,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: F,
    pointsAtY: F,
    pointsAtZ: F,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: ge,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: ge,
    rev: ge,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: ge,
    requiredFeatures: ge,
    requiredFonts: ge,
    requiredFormats: ge,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: F,
    specularExponent: F,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: F,
    strikethroughThickness: F,
    string: null,
    stroke: null,
    strokeDashArray: ge,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: F,
    strokeOpacity: F,
    strokeWidth: null,
    style: null,
    surfaceScale: F,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: ge,
    tabIndex: F,
    tableValues: null,
    target: null,
    targetX: F,
    targetY: F,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: ge,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: F,
    underlineThickness: F,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: F,
    values: null,
    vAlphabetic: F,
    vMathematical: F,
    vectorEffect: null,
    vHanging: F,
    vIdeographic: F,
    version: null,
    vertAdvY: F,
    vertOriginX: F,
    vertOriginY: F,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: F,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  }
}), Hh = /^data[-\w.:]+$/i, Br = /-[a-z]/g, $h = /[A-Z]/g;
function Wh(e, t) {
  const n = ri(t);
  let i = t, r = _e;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && Hh.test(t)) {
    if (t.charAt(4) === "-") {
      const s = t.slice(5).replace(Br, Qh);
      i = "data" + s.charAt(0).toUpperCase() + s.slice(1);
    } else {
      const s = t.slice(4);
      if (!Br.test(s)) {
        let a = s.replace($h, Gh);
        a.charAt(0) !== "-" && (a = "-" + a), t = "data" + a;
      }
    }
    r = Ci;
  }
  return new r(i, t);
}
function Gh(e) {
  return "-" + e.toLowerCase();
}
function Qh(e) {
  return e.charAt(1).toUpperCase();
}
const Yh = {
  classId: "classID",
  dataType: "datatype",
  itemId: "itemID",
  strokeDashArray: "strokeDasharray",
  strokeDashOffset: "strokeDashoffset",
  strokeLineCap: "strokeLinecap",
  strokeLineJoin: "strokeLinejoin",
  strokeMiterLimit: "strokeMiterlimit",
  typeOf: "typeof",
  xLinkActuate: "xlinkActuate",
  xLinkArcRole: "xlinkArcrole",
  xLinkHref: "xlinkHref",
  xLinkRole: "xlinkRole",
  xLinkShow: "xlinkShow",
  xLinkTitle: "xlinkTitle",
  xLinkType: "xlinkType",
  xmlnsXLink: "xmlnsXlink"
}, Kh = ka([Ea, Sa, Aa, _a, Xh], "html"), Ii = ka([Ea, Sa, Aa, _a, qh], "svg");
function Zh(e) {
  return e.join(" ").trim();
}
var Ai = { exports: {} }, Jr = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, ef = /\n/g, tf = /^\s*/, nf = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, rf = /^:\s*/, sf = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, af = /^[;\s]*/, of = /^\s+|\s+$/g, lf = `
`, zr = "/", Ur = "*", st = "", uf = "comment", cf = "declaration", pf = function(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, i = 1;
  function r(v) {
    var b = v.match(ef);
    b && (n += b.length);
    var I = v.lastIndexOf(lf);
    i = ~I ? v.length - I : i + v.length;
  }
  function s() {
    var v = { line: n, column: i };
    return function(b) {
      return b.position = new a(v), u(), b;
    };
  }
  function a(v) {
    this.start = v, this.end = { line: n, column: i }, this.source = t.source;
  }
  a.prototype.content = e;
  function o(v) {
    var b = new Error(
      t.source + ":" + n + ":" + i + ": " + v
    );
    if (b.reason = v, b.filename = t.source, b.line = n, b.column = i, b.source = e, !t.silent) throw b;
  }
  function l(v) {
    var b = v.exec(e);
    if (b) {
      var I = b[0];
      return r(I), e = e.slice(I.length), b;
    }
  }
  function u() {
    l(tf);
  }
  function c(v) {
    var b;
    for (v = v || []; b = p(); )
      b !== !1 && v.push(b);
    return v;
  }
  function p() {
    var v = s();
    if (!(zr != e.charAt(0) || Ur != e.charAt(1))) {
      for (var b = 2; st != e.charAt(b) && (Ur != e.charAt(b) || zr != e.charAt(b + 1)); )
        ++b;
      if (b += 2, st === e.charAt(b - 1))
        return o("End of comment missing");
      var I = e.slice(2, b - 2);
      return i += 2, r(I), e = e.slice(b), i += 2, v({
        type: uf,
        comment: I
      });
    }
  }
  function m() {
    var v = s(), b = l(nf);
    if (b) {
      if (p(), !l(rf)) return o("property missing ':'");
      var I = l(sf), y = v({
        type: cf,
        property: Xr(b[0].replace(Jr, st)),
        value: I ? Xr(I[0].replace(Jr, st)) : st
      });
      return l(af), y;
    }
  }
  function h() {
    var v = [];
    c(v);
    for (var b; b = m(); )
      b !== !1 && (v.push(b), c(v));
    return v;
  }
  return u(), h();
};
function Xr(e) {
  return e ? e.replace(of, st) : st;
}
var hf = pf;
function Ta(e, t) {
  var n = null;
  if (!e || typeof e != "string")
    return n;
  for (var i, r = hf(e), s = typeof t == "function", a, o, l = 0, u = r.length; l < u; l++)
    i = r[l], a = i.property, o = i.value, s ? t(a, o, i) : o && (n || (n = {}), n[a] = o);
  return n;
}
Ai.exports = Ta;
Ai.exports.default = Ta;
var ff = Ai.exports;
const mf = /* @__PURE__ */ di(ff), ai = {}.hasOwnProperty, df = /[A-Z]/g, xf = /-([a-z])/g, gf = /* @__PURE__ */ new Set(["td", "th"]);
function yf(e, t) {
  const n = t.schema;
  let i = n;
  const r = e.properties || {};
  n.space === "html" && e.tagName.toLowerCase() === "svg" && (i = Ii, t.schema = i);
  const s = t.all(e), a = [];
  let o, l, u;
  for (o in r)
    if (ai.call(r, o)) {
      let p = r[o];
      const m = Wh(i, o);
      let h;
      if (p == null || p === !1 || typeof p == "number" && Number.isNaN(p) || !p && m.boolean)
        continue;
      if (o = t.elementAttributeNameCase === "react" && m.space ? Yh[m.property] || m.property : m.attribute, Array.isArray(p) && (p = m.commaSeparated ? Jh(p) : Zh(p)), o === "style") {
        let v = typeof p == "object" ? p : bf(String(p), e.tagName);
        t.stylePropertyNameCase === "css" && (v = wf(v));
        const b = [];
        let I;
        for (I in v)
          ai.call(v, I) && b.push({
            type: "Property",
            method: !1,
            shorthand: !1,
            computed: !1,
            key: Re(I) ? { type: "Identifier", name: I } : { type: "Literal", value: I },
            value: { type: "Literal", value: String(v[I]) },
            kind: "init"
          });
        u = b, h = {
          type: "JSXExpressionContainer",
          expression: { type: "ObjectExpression", properties: b }
        };
      } else if (p === !0)
        h = null;
      else if (t.tableCellAlignToStyle && gf.has(e.tagName) && o === "align") {
        l = String(p);
        continue;
      } else
        h = { type: "Literal", value: String(p) };
      Re(o, { jsx: !0 }) ? a.push({
        type: "JSXAttribute",
        name: { type: "JSXIdentifier", name: o },
        value: h
      }) : a.push({
        type: "JSXSpreadAttribute",
        argument: {
          type: "ObjectExpression",
          properties: [
            {
              type: "Property",
              method: !1,
              shorthand: !1,
              computed: !1,
              key: { type: "Literal", value: String(o) },
              // @ts-expect-error No need to worry about `style` (which has a
              // `JSXExpressionContainer` value) because that’s a valid identifier.
              value: h || { type: "Literal", value: !0 },
              kind: "init"
            }
          ]
        }
      });
    }
  if (l !== void 0) {
    u || (u = [], a.push({
      type: "JSXAttribute",
      name: { type: "JSXIdentifier", name: "style" },
      value: {
        type: "JSXExpressionContainer",
        expression: { type: "ObjectExpression", properties: u }
      }
    }));
    const p = t.stylePropertyNameCase === "css" ? Pa("textAlign") : "textAlign";
    u.push({
      type: "Property",
      method: !1,
      shorthand: !1,
      computed: !1,
      key: Re(p) ? { type: "Identifier", name: p } : { type: "Literal", value: p },
      value: { type: "Literal", value: l },
      kind: "init"
    });
  }
  t.schema = n;
  const c = {
    type: "JSXElement",
    openingElement: {
      type: "JSXOpeningElement",
      attributes: a,
      name: t.createJsxElementName(e.tagName),
      selfClosing: s.length === 0
    },
    closingElement: s.length > 0 ? {
      type: "JSXClosingElement",
      name: t.createJsxElementName(e.tagName)
    } : null,
    children: s
  };
  return t.inherit(e, c), c;
}
function bf(e, t) {
  const n = {};
  try {
    mf(e, i);
  } catch (r) {
    const s = (
      /** @type {Error} */
      r
    );
    throw new Error(
      "Could not parse `style` attribute on `" + t + "`",
      { cause: s }
    );
  }
  return n;
  function i(r, s) {
    let a = r;
    a.slice(0, 2) !== "--" && (a.slice(0, 4) === "-ms-" && (a = "ms-" + a.slice(4)), a = a.replace(xf, kf)), n[a] = s;
  }
}
function wf(e) {
  const t = {};
  let n;
  for (n in e)
    ai.call(e, n) && (t[Pa(n)] = e[n]);
  return t;
}
function Pa(e) {
  let t = e.replace(df, vf);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function kf(e, t) {
  return t.toUpperCase();
}
function vf(e) {
  return "-" + e.toLowerCase();
}
const Sf = {}.hasOwnProperty, Ef = [];
function yn(e, t) {
  const n = t ? [...t].sort(_i) : Ef;
  n.length > 0 && Na(e, { comments: n, index: 0 });
}
function Na(e, t) {
  if (t.index === t.comments.length)
    return;
  const n = [], i = [];
  let r;
  for (r in e)
    if (Sf.call(e, r)) {
      const a = e[r];
      if (a && typeof a == "object" && r !== "comments")
        if (Array.isArray(a)) {
          let o = -1;
          for (; ++o < a.length; )
            a[o] && typeof a[o].type == "string" && n.push(a[o]);
        } else typeof a.type == "string" && n.push(a);
    }
  n.sort(_i), i.push(...qr(t, e, !1, { leading: !0, trailing: !1 }));
  let s = -1;
  for (; ++s < n.length; )
    Na(n[s], t);
  i.push(
    ...qr(t, e, !0, {
      leading: !1,
      trailing: n.length > 0
    })
  ), i.length > 0 && (e.comments = i);
}
function qr(e, t, n, i) {
  const r = [];
  for (; e.comments[e.index] && _i(e.comments[e.index], t, n) < 1; )
    r.push(Object.assign({}, e.comments[e.index++], i));
  return r;
}
function _i(e, t, n) {
  const i = n ? "end" : "start";
  return e.range && t.range ? e.range[0] - t.range[n ? 1 : 0] : e.loc && e.loc.start && t.loc && t.loc[i] ? e.loc.start.line - t.loc[i].line || e.loc.start.column - t.loc[i].column : "start" in e && i in t ? e.start - t[i] : Number.NaN;
}
function Hr(e, t) {
  const n = e.data && e.data.estree, i = n && n.comments || [];
  let r;
  n && (t.comments.push(...i), yn(n, n.comments), r = n.body[0] && n.body[0].type === "ExpressionStatement" && n.body[0].expression || void 0), r || (r = { type: "JSXEmptyExpression" }, t.patch(e, r));
  const s = { type: "JSXExpressionContainer", expression: r };
  return t.inherit(e, s), s;
}
function $r(e, t) {
  const n = t.schema;
  let i = n;
  const r = e.attributes || [];
  let s = -1;
  e.name && n.space === "html" && e.name.toLowerCase() === "svg" && (i = Ii, t.schema = i);
  const a = t.all(e), o = [];
  for (; ++s < r.length; ) {
    const u = r[s], c = u.value;
    let p;
    if (u.type === "mdxJsxAttribute") {
      if (c == null)
        p = null;
      else if (typeof c == "object") {
        const h = c.data && c.data.estree, v = h && h.comments || [];
        let b;
        h && (t.comments.push(...v), yn(h, h.comments), b = h.body[0] && h.body[0].type === "ExpressionStatement" && h.body[0].expression || void 0), p = {
          type: "JSXExpressionContainer",
          expression: b || { type: "JSXEmptyExpression" }
        }, t.inherit(c, p);
      } else
        p = { type: "Literal", value: String(c) };
      const m = {
        type: "JSXAttribute",
        name: t.createJsxAttributeName(u.name),
        value: p
      };
      t.inherit(u, m), o.push(m);
    } else {
      const m = u.data && u.data.estree, h = m && m.comments || [];
      let v;
      m && (t.comments.push(...h), yn(m, m.comments), v = m.body[0] && m.body[0].type === "ExpressionStatement" && m.body[0].expression && m.body[0].expression.type === "ObjectExpression" && m.body[0].expression.properties && m.body[0].expression.properties[0] && m.body[0].expression.properties[0].type === "SpreadElement" && m.body[0].expression.properties[0].argument || void 0);
      const b = {
        type: "JSXSpreadAttribute",
        argument: v || { type: "ObjectExpression", properties: [] }
      };
      t.inherit(u, b), o.push(b);
    }
  }
  t.schema = n;
  const l = e.name ? {
    type: "JSXElement",
    openingElement: {
      type: "JSXOpeningElement",
      attributes: o,
      name: t.createJsxElementName(e.name),
      selfClosing: a.length === 0
    },
    closingElement: a.length > 0 ? {
      type: "JSXClosingElement",
      name: t.createJsxElementName(e.name)
    } : null,
    children: a
  } : {
    type: "JSXFragment",
    openingFragment: { type: "JSXOpeningFragment" },
    closingFragment: { type: "JSXClosingFragment" },
    children: a
  };
  return t.inherit(e, l), l;
}
function Cf(e, t) {
  const n = e.data && e.data.estree, i = n && n.comments || [];
  n && (t.comments.push(...i), yn(n, i), t.esm.push(...n.body));
}
const If = /[ \t\n\f\r]/g;
function Af(e) {
  return typeof e == "object" ? e.type === "text" ? Wr(e.value) : !1 : Wr(e);
}
function Wr(e) {
  return e.replace(If, "") === "";
}
function _f(e, t) {
  const n = t.all(e), i = [];
  let r = -1, s;
  for (; ++r < n.length; ) {
    const o = n[r];
    o.type === "JSXExpressionContainer" && o.expression.type === "Literal" && Af(String(o.expression.value)) ? s && s.push(o) : (s && i.push(...s), i.push(o), s = []);
  }
  const a = {
    type: "JSXFragment",
    openingFragment: { type: "JSXOpeningFragment" },
    closingFragment: { type: "JSXClosingFragment" },
    children: i
  };
  return t.inherit(e, a), a;
}
function Tf(e, t) {
  const n = String(e.value || "");
  if (n) {
    const i = { type: "Literal", value: n };
    t.inherit(e, i);
    const r = { type: "JSXExpressionContainer", expression: i };
    return t.patch(e, r), r;
  }
}
const Pf = {
  comment: Bh,
  doctype: Nf,
  element: yf,
  mdxFlowExpression: Hr,
  mdxJsxFlowElement: $r,
  mdxJsxTextElement: $r,
  mdxTextExpression: Hr,
  mdxjsEsm: Cf,
  root: _f,
  text: Tf
};
function Nf() {
}
const Gr = {}.hasOwnProperty;
function Lf(e, t) {
  const n = t || {};
  function i(r, ...s) {
    let a = i.invalid;
    const o = i.handlers;
    if (r && Gr.call(r, e)) {
      const l = String(r[e]);
      a = Gr.call(o, l) ? o[l] : i.unknown;
    }
    if (a)
      return a.call(this, r, ...s);
  }
  return i.handlers = n.handlers || {}, i.invalid = n.invalid, i.unknown = n.unknown, i;
}
const Ff = {}.hasOwnProperty, Df = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]);
function Of(e) {
  const t = Lf("type", {
    invalid: Mf,
    unknown: Rf,
    handlers: { ...Pf, ...e.handlers }
  });
  return {
    // Current space.
    elementAttributeNameCase: e.elementAttributeNameCase || "react",
    schema: e.space === "svg" ? Ii : Kh,
    stylePropertyNameCase: e.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: e.tableCellAlignToStyle !== !1,
    // Results.
    comments: [],
    esm: [],
    // Useful functions.
    all: jf,
    createJsxAttributeName: Bf,
    createJsxElementName: Jf,
    handle: n,
    inherit: Vf,
    patch: La
  };
  function n(i) {
    return t(i, this);
  }
}
function Mf(e) {
  throw new Error("Cannot handle value `" + e + "`, expected node");
}
function Rf(e) {
  throw new Error("Cannot handle unknown node `" + e.type + "`");
}
function jf(e) {
  const t = e.children || [];
  let n = -1;
  const i = [], r = this.schema.space === "html" && e.type === "element" && Df.has(e.tagName.toLowerCase());
  for (; ++n < t.length; ) {
    const s = t[n];
    if (r && s.type === "text" && s.value === `
`)
      continue;
    const a = this.handle(s);
    Array.isArray(a) ? i.push(...a) : a && i.push(a);
  }
  return i;
}
function Vf(e, t) {
  const n = (
    /** @type {Record<string, unknown> | undefined} */
    e.data
  );
  let i, r;
  if (La(e, t), n) {
    for (r in n)
      Ff.call(n, r) && r !== "estree" && (i || (i = {}), i[r] = n[r]);
    i && (t.data = i);
  }
}
function La(e, t) {
  const n = la(e);
  n && n.start.offset !== void 0 && n.end.offset !== void 0 && (t.start = n.start.offset, t.end = n.end.offset, t.loc = {
    start: { line: n.start.line, column: n.start.column - 1 },
    end: { line: n.end.line, column: n.end.column - 1 }
  }, t.range = [n.start.offset, n.end.offset]);
}
function Bf(e) {
  const t = Fa(e);
  if (t.type === "JSXMemberExpression")
    throw new Error("Member expressions in attribute names are not supported");
  return t;
}
function Jf(e) {
  return Fa(e);
}
function Fa(e) {
  if (e.includes(".")) {
    const t = e.split(".");
    let n = t.shift(), i = { type: "JSXIdentifier", name: n };
    for (; n = t.shift(); )
      i = {
        type: "JSXMemberExpression",
        object: i,
        property: { type: "JSXIdentifier", name: n }
      };
    return i;
  }
  if (e.includes(":")) {
    const t = e.split(":");
    return {
      type: "JSXNamespacedName",
      namespace: { type: "JSXIdentifier", name: t[0] },
      name: { type: "JSXIdentifier", name: t[1] }
    };
  }
  return { type: "JSXIdentifier", name: e };
}
function zf(e, t) {
  const n = Of(t || {});
  let i = n.handle(e);
  const r = n.esm;
  if (i) {
    i.type !== "JSXFragment" && i.type !== "JSXElement" && (i = {
      type: "JSXFragment",
      openingFragment: { type: "JSXOpeningFragment" },
      closingFragment: { type: "JSXClosingFragment" },
      children: [i]
    }, n.patch(e, i));
    const a = { type: "ExpressionStatement", expression: i };
    n.patch(e, a), r.push(a);
  }
  const s = {
    type: "Program",
    body: r,
    sourceType: "module",
    comments: n.comments
  };
  return n.patch(e, s), s;
}
function Uf(e) {
  return function(t) {
    return zf(t, e);
  };
}
function Xf() {
  return function(e) {
    vi(e, "raw", function(t, n, i) {
      if (i && typeof n == "number")
        return i.children.splice(n, 1), n;
    });
  };
}
const qf = /\s+/g, Hf = /[\t\n\v\f\r ]+/g;
function $f(e, t) {
  t ? typeof t == "string" && (t = { style: t }) : t = {};
  const n = t.preserveLineEndings ? Wf : Gf;
  return String(e).replace(
    t.style === "html" ? Hf : qf,
    t.trim ? Qf(n) : n
  );
}
function Wf(e) {
  const t = /\r?\n|\r/.exec(e);
  return t ? t[0] : " ";
}
function Gf() {
  return " ";
}
function Qf(e) {
  return t;
  function t(n, i, r) {
    return i === 0 || i + n.length === r.length ? "" : e(n);
  }
}
function Yf() {
  return function(e) {
    vi(e, function(t, n, i) {
      let r = -1, s = !0, a = !1;
      if (i && typeof n == "number" && t.type === "paragraph") {
        const o = t.children;
        for (; ++r < o.length; ) {
          const l = o[r];
          if (l.type === "mdxJsxTextElement" || l.type === "mdxTextExpression")
            a = !0;
          else if (!(l.type === "text" && $f(l.value, { style: "html", trim: !0 }) === "")) {
            s = !1;
            break;
          }
        }
        if (s && a) {
          r = -1;
          const l = [];
          for (; ++r < o.length; ) {
            const u = o[r];
            u.type === "mdxJsxTextElement" && (u.type = "mdxJsxFlowElement"), u.type === "mdxTextExpression" && (u.type = "mdxFlowExpression"), u.type === "text" && /^[\t\r\n ]+$/.test(String(u.value)) || l.push(u);
          }
          return i.children.splice(n, 1, ...l), n;
        }
      }
      if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement") {
        const o = t.data || (t.data = {});
        o._mdxExplicitJsx = !0;
      }
    });
  };
}
const Kf = (
  /** @type {const} */
  [
    "mdxFlowExpression",
    "mdxJsxFlowElement",
    "mdxJsxTextElement",
    "mdxTextExpression",
    "mdxjsEsm"
  ]
);
let Qr = !1;
function Da(e) {
  const t = e || {};
  t.format, (t.jsxRuntime === "classic" || t.pragma || t.pragmaFrag || t.pragmaImportSource) && !Qr && (Qr = !0, console.warn(
    "Unexpected deprecated option `jsxRuntime: 'classic'`, `pragma`, `pragmaFrag`, or `pragmaImportSource`; see <https://mdxjs.com/migrating/v3/> on how to migrate"
  ));
  const n = eh().use(Zc);
  t.format !== "md" && n.use(xc);
  const i = t.remarkRehypeOptions || {};
  return n.use(Yf).use(t.remarkPlugins || []).use(Wp, {
    ...i,
    allowDangerousHtml: !0,
    passThrough: [...i.passThrough || [], ...Kf]
  }).use(t.rehypePlugins || []), t.format === "md" && n.use(Xf), n.use(Uf, t).use(lh, t).use(mh, t), t.jsx || n.use(fh, t), n.use(Vh, t).use(t.recmaPlugins || []), n;
}
function Zf(e, t) {
  const { file: n, options: i } = Kr(e, t);
  return Da(i).process(n);
}
function em(e, t) {
  const { file: n, options: i } = Kr(e, t);
  return Da(i).processSync(n);
}
function Oa(e) {
  const {
    Fragment: t,
    baseUrl: n,
    development: i,
    jsx: r,
    jsxDEV: s,
    jsxs: a,
    useMDXComponents: o,
    ...l
  } = e || {};
  if (!t) throw new Error("Expected `Fragment` given to `evaluate`");
  if (i) {
    if (!s) throw new Error("Expected `jsxDEV` given to `evaluate`");
  } else {
    if (!r) throw new Error("Expected `jsx` given to `evaluate`");
    if (!a) throw new Error("Expected `jsxs` given to `evaluate`");
  }
  return {
    compiletime: {
      ...l,
      development: i,
      outputFormat: "function-body",
      providerImportSource: o ? "#" : void 0
    },
    runtime: { Fragment: t, baseUrl: n, jsx: r, jsxDEV: s, jsxs: a, useMDXComponents: o }
  };
}
const tm = Object.getPrototypeOf(Ma).constructor;
async function Ma(e, t) {
  return new tm(String(e))(t);
}
function nm(e, t) {
  return new Function(String(e))(t);
}
async function im(e, t) {
  const { compiletime: n, runtime: i } = Oa(t);
  return Ma(await Zf(e, n), i);
}
function rm(e, t) {
  const { compiletime: n, runtime: i } = Oa(t);
  return nm(em(e, n), i);
}
export {
  Zf as compile,
  em as compileSync,
  Da as createProcessor,
  im as evaluate,
  rm as evaluateSync,
  Kf as nodeTypes,
  Ma as run,
  nm as runSync
};
