var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

// node_modules/.pnpm/@edgeone+pages-blob@0.0.19/node_modules/@edgeone/pages-blob/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/@edgeone+pages-blob@0.0.19/node_modules/@edgeone/pages-blob/dist/index.js"(exports, module) {
    "use strict";
    var U = Object.defineProperty;
    var ge = Object.getOwnPropertyDescriptor;
    var fe = Object.getOwnPropertyNames;
    var he = Object.prototype.hasOwnProperty;
    var me = (t, e) => {
      for (var n in e) U(t, n, { get: e[n], enumerable: true });
    };
    var ye = (t, e, n, r) => {
      if (e && typeof e == "object" || typeof e == "function") for (let s of fe(e)) !he.call(t, s) && s !== n && U(t, s, { get: () => e[s], enumerable: !(r = ge(e, s)) || r.enumerable });
      return t;
    };
    var pe = (t) => ye(U({}, "__esModule", { value: true }), t);
    var Le = {};
    me(Le, { InvalidKeyError: () => w, InvalidStoreNameError: () => p, MissingProjectIdError: () => S, PagesBlobError: () => m, PreconditionFailedError: () => b, QuotaExceededError: () => x, RateLimitedError: () => B, Store: () => T, getStore: () => _e, listStores: () => Ne });
    module.exports = pe(Le);
    var m = class extends Error {
      code;
      constructor(e, n) {
        super(`PagesBlob: ${n}`), this.name = "PagesBlobError", this.code = e;
      }
    };
    var w = class extends m {
      constructor(e) {
        super("INVALID_KEY", e);
      }
    };
    var p = class extends m {
      constructor(e) {
        super("INVALID_STORE_NAME", e);
      }
    };
    var E = class extends m {
      constructor(e) {
        super("MISSING_ENVIRONMENT", `Environment not configured for Pages Blob. Missing: ${e.join(", ")}. Supply these properties when creating a store, or ensure the function is running in a Pages environment.`);
      }
    };
    var we = "If usage just dropped back under the limit, wait a few minutes and retry.";
    var Ce = { storage: "write denied: storage quota exceeded (free plan 1 GB). Reads and deletes still work; delete objects or upgrade the plan.", "complex-operations": "write denied: complex operation quota (writes and lists) exceeded. Reads and deletes still work; upgrade the plan or wait until usage is back under the limit.", egress: "write denied: egress bandwidth quota exceeded. Only deletes still work; upgrade the plan or wait until usage is back under the limit." };
    var x = class extends m {
      reason;
      overMetrics;
      constructor(e = {}) {
        let n = e.reason && Ce[e.reason] || "write denied: blob quota exceeded.";
        super("QUOTA_EXCEEDED", `${n} ${we}`), this.reason = e.reason, this.overMetrics = e.overMetrics ?? [];
      }
    };
    var B = class extends m {
      constructor() {
        super("RATE_LIMITED", "request rate limited, please retry later");
      }
    };
    var S = class extends m {
      constructor() {
        super("MISSING_PROJECT_ID", "projectId is required when using API token mode. Please supply { name, projectId, token } to getStore() / listStores().");
      }
    };
    var y = class extends m {
      constructor(e) {
        super("CREDENTIAL_ERROR", e);
      }
    };
    var h = class extends m {
      statusCode;
      constructor(e, n) {
        super("COS_ERROR", `COS returned ${e}: ${n}`), this.statusCode = e;
      }
    };
    var b = class extends m {
      constructor() {
        super("PRECONDITION_FAILED", "conditional write failed (key already exists)");
      }
    };
    function C(t) {
      if (t === "") throw new w("Blob key must not be empty.");
      if (t.startsWith("/") || t.startsWith("%2F")) throw new w("Blob key must not start with forward slash (/).");
      if (new TextEncoder().encode(t).length > 600) throw new w("Blob key must be a sequence of Unicode characters whose UTF-8 encoding is at most 600 bytes long.");
    }
    function F(t) {
      if (t === "") throw new p("Store name must not be empty.");
      if (t.includes("/") || t.includes(":")) throw new p("Store name must not contain forward slashes (/) or colons (:).");
      if (!/^[a-zA-Z0-9_-]+$/.test(t)) throw new p("Store name must only contain letters, digits, underscores, and hyphens.");
      if (new TextEncoder().encode(t).length > 64) throw new p("Store name must be a sequence of Unicode characters whose UTF-8 encoding is at most 64 bytes long.");
    }
    var T = class {
      cosClient;
      storeName;
      defaultConsistency;
      constructor(e, n, r = "eventual") {
        this.cosClient = e, this.storeName = n, this.defaultConsistency = r;
      }
      resolveConsistency(e) {
        return e ?? this.defaultConsistency;
      }
      async set(e, n, r) {
        C(e);
        let s = await this.cosClient.putObject(this.storeName, e, n, { onlyIfNew: r?.onlyIfNew, cacheControl: r?.cacheControl });
        if (r?.onlyIfNew && s.statusCode === 412) throw new b();
      }
      async setJSON(e, n, r) {
        C(e);
        let s = JSON.stringify(n), o = await this.cosClient.putObject(this.storeName, e, s, { onlyIfNew: r?.onlyIfNew, contentType: "application/json", cacheControl: r?.cacheControl });
        if (r?.onlyIfNew && o.statusCode === 412) throw new b();
      }
      async createUploadUrl(e, n) {
        C(e);
        let { url: r, expiresAt: s } = await this.cosClient.createPresignedPutUrl(this.storeName, e, { expireSeconds: n?.expireSeconds, contentType: n?.contentType });
        return { url: r, key: e, expiresAt: s };
      }
      async get(e, n) {
        C(e);
        let r = this.resolveConsistency(n?.consistency), s = await this.cosClient.getObject(this.storeName, e, r);
        if (s === null) return null;
        let { body: o } = s, c = n?.type ?? "text", i = new TextDecoder("utf-8");
        switch (c) {
          case "text":
            return i.decode(o);
          case "json":
            return JSON.parse(i.decode(o));
          case "arrayBuffer":
            return o.buffer.slice(o.byteOffset, o.byteOffset + o.byteLength);
          case "blob":
            return new Blob([o]);
          case "stream":
            return new ReadableStream({ start(d) {
              d.enqueue(o), d.close();
            } });
          default:
            return i.decode(o);
        }
      }
      async getMetadata(e, n) {
        C(e);
        let r = this.resolveConsistency(n?.consistency);
        return this.cosClient.headObject(this.storeName, e, r);
      }
      async getWithHeaders(e, n) {
        C(e);
        let r = this.resolveConsistency(n?.consistency), s = await this.cosClient.getObject(this.storeName, e, r);
        return s ? { body: new TextDecoder("utf-8").decode(s.body), headers: s.headers || {} } : null;
      }
      async delete(e) {
        C(e), await this.cosClient.deleteObject(this.storeName, e);
      }
      async list(e) {
        let n = e?.paginate !== false, r = e?.limit, s = [], o = [], c = this.resolveConsistency(e?.consistency), i = e?.cursor || "", d = true, a;
        for (; d; ) {
          let l = r !== void 0 ? r - s.length : 1e3, g = Math.min(l, 1e3);
          if (g <= 0) break;
          let u = await this.cosClient.listObjects(this.storeName, { prefix: e?.prefix, delimiter: e?.directories ? "/" : void 0, marker: i || void 0, maxKeys: g, consistency: c });
          for (let f of u.contents) s.push({ key: f.key, etag: f.etag });
          o.push(...u.commonPrefixes), r !== void 0 && s.length >= r ? (s.length = r, (u.isTruncated || u.contents.length === g) && (a = u.nextMarker), d = false) : u.isTruncated ? !n && r === void 0 ? (a = u.nextMarker, d = false) : i = u.nextMarker : d = false;
        }
        return { blobs: s, directories: o, ...a ? { cursor: a } : {} };
      }
    };
    var xe = new TextEncoder();
    function K(t) {
      let e = xe.encode(t), n = new ArrayBuffer(e.byteLength), r = new Uint8Array(n);
      return r.set(e), r;
    }
    function V(t) {
      let e = t instanceof Uint8Array ? t : new Uint8Array(t), n = "";
      for (let r = 0; r < e.length; r++) n += e[r].toString(16).padStart(2, "0");
      return n;
    }
    async function W(t, e) {
      let n = await crypto.subtle.importKey("raw", K(t), { name: "HMAC", hash: "SHA-1" }, false, ["sign"]), r = await crypto.subtle.sign("HMAC", n, K(e));
      return V(r);
    }
    async function be(t) {
      let e = await crypto.subtle.digest("SHA-1", K(t));
      return V(e);
    }
    function j(t) {
      return encodeURIComponent(t).replace(/[!'()*]/g, (e) => "%" + e.charCodeAt(0).toString(16).toUpperCase());
    }
    function I(t) {
      try {
        return decodeURIComponent(t);
      } catch {
        return t;
      }
    }
    function Ee(t) {
      return t.split("/").map((e) => I(e)).join("/");
    }
    function k(t) {
      return Ee(I(t));
    }
    function J(t) {
      return t.split("/").map((e) => j(I(e))).join("/");
    }
    var Se = /* @__PURE__ */ new Set(["cache-control", "content-disposition", "content-encoding", "content-length", "content-md5", "content-type", "expect", "expires", "if-match", "if-modified-since", "if-none-match", "if-unmodified-since", "origin", "range", "transfer-encoding"]);
    function Te(t) {
      return t === "host" || t === "x-cos-security-token" ? false : !!(Se.has(t) || t.startsWith("x-cos-"));
    }
    function X(t) {
      if (!t) return [];
      let e = [];
      for (let [n, r] of Object.entries(t)) r != null && e.push([n.toLowerCase(), String(r)]);
      return e.sort(([n], [r]) => n < r ? -1 : n > r ? 1 : 0), e;
    }
    function Y(t) {
      return t.map(([e, n]) => `${j(e)}=${j(n)}`).join("&");
    }
    function G(t) {
      return t.map(([e]) => j(e)).join(";");
    }
    async function Z(t) {
      let e = t.method.toLowerCase(), n = t.pathname.startsWith("/") ? t.pathname : `/${t.pathname}`, r = Math.floor(Date.now() / 1e3), s = r + (t.expireSeconds ?? 3600), o = `${r};${s}`, i = X(t.headers).filter(([L]) => Te(L)), d = G(i), a = Y(i), l = X(t.query), g = G(l), u = Y(l), f = `${e}
${n}
${u}
${a}
`, _ = `sha1
${o}
${await be(f)}
`, N = await W(t.secretKey, o), de = await W(N, _), le = ["q-sign-algorithm=sha1", `q-ak=${t.secretId}`, `q-sign-time=${o}`, `q-key-time=${o}`, `q-header-list=${d}`, `q-url-param-list=${g}`, `q-signature=${de}`].join("&"), H = {};
      for (let [L, ue] of i) H[L] = ue;
      return { authorization: le, signedHeaders: H };
    }
    async function Q(t) {
      let e = new URL(t.domain), n = I(t.key), r = `/${k(t.key)}`, s = `/${J(n)}`;
      e.pathname = s;
      let { authorization: o } = await Z({ method: t.method, pathname: r, query: t.query, headers: t.headers, secretId: t.credential.secretId, secretKey: t.credential.secretKey, expireSeconds: t.expireSeconds });
      if (t.query) for (let [c, i] of Object.entries(t.query)) i != null && e.searchParams.set(c, String(i));
      for (let c of o.split("&")) {
        let i = c.indexOf("=");
        if (i === -1) continue;
        let d = c.slice(0, i), a = c.slice(i + 1);
        e.searchParams.set(d, a);
      }
      return t.credential.sessionToken && e.searchParams.set("x-cos-security-token", t.credential.sessionToken), e.toString();
    }
    async function P(t) {
      let e = new URL(t.domain), n = t.key ? I(t.key) : "", r = t.key ? `/${k(t.key)}` : "/", s = n ? `/${J(n)}` : "/";
      if (e.pathname = s, t.query) for (let [g, u] of Object.entries(t.query)) u != null && e.searchParams.set(g, String(u));
      let { authorization: o } = await Z({ method: t.method, pathname: r, query: t.query, headers: t.headers, secretId: t.credential.secretId, secretKey: t.credential.secretKey }), c = new Headers();
      if (t.headers) for (let [g, u] of Object.entries(t.headers)) u != null && c.set(g, String(u));
      c.set("Authorization", o), t.credential.sessionToken && c.set("x-cos-security-token", t.credential.sessionToken);
      let i = e.toString(), d = { method: t.method, headers: c, body: t.body ?? void 0, signal: t.signal }, a = 2, l;
      for (let g = 0; g <= a; g++) try {
        return await fetch(i, d);
      } catch (u) {
        if (l = u, u instanceof DOMException && u.name === "AbortError") throw u;
        g < a && await new Promise((f) => setTimeout(f, 1e3 * (g + 1)));
      }
      throw l;
    }
    var Pe = "blob.edgeone.site";
    var Ie = "blob-nocache.edgeone.site";
    var ke = "max-age=0, stale-while-revalidate=60";
    var D = class t {
      credentialManager;
      bucket = "";
      region = "";
      keyPrefix = "";
      cachedDomain = "";
      uncachedDomain = "";
      initialized = false;
      static buildErrorDetail(e, n, r, s, o) {
        let c = r ? `${n}/${r}` : n, i = o ? ` [request-id: ${o}]` : "";
        return `${e} ${c} - ${Ae(s)}${i}`;
      }
      constructor(e) {
        this.credentialManager = e;
      }
      computeSubdomain(e) {
        let n = [];
        if (e.appId && n.push(e.appId), e.zoneId && n.push(e.zoneId), e.projectId && n.push(e.projectId), n.length >= 2) return n.join("-");
        if (e.resourcePrefix) {
          let s = e.resourcePrefix.replace(/\/?\*$/, "").split("/").filter(Boolean);
          if (s.length >= 2) return s.slice(0, Math.min(s.length, 3)).join("-");
        }
        return "";
      }
      async ensureInitialized() {
        if (this.initialized) return;
        let e = await this.credentialManager.getCredential();
        !this.keyPrefix && e.resourcePrefix && (this.keyPrefix = e.resourcePrefix.replace(/\/?\*$/, ""));
        let n = e.edgeRegion === "CN", r = e.cosMainland, s = e.cosOverseas, o = n ? r || s : s || r;
        !this.bucket && o && (this.bucket = o.bucket, this.region = o.region);
        let { cachedDomain: c, uncachedDomain: i } = e;
        if (!c || !i) {
          let d = this.computeSubdomain(e);
          if (!d) throw new h(0, "unable to derive tenant subdomain from credential; missing appId/zoneId/projectId or resourcePrefix");
          c ||= `https://${d}.${Pe}`, i ||= `https://${d}.${Ie}`;
        }
        this.cachedDomain = c, this.uncachedDomain = i, this.initialized = true;
      }
      async resolveDomain(e) {
        return await this.ensureInitialized(), e === "strong" ? this.uncachedDomain : this.cachedDomain;
      }
      async resolveCredential() {
        let e = await this.credentialManager.getCredential();
        return { secretId: e.tmpSecretId, secretKey: e.tmpSecretKey, sessionToken: e.sessionToken };
      }
      buildCosKey(e, n) {
        return `${this.keyPrefix}/${e}/${n}`;
      }
      async getDomains() {
        return await this.ensureInitialized(), { cached: this.cachedDomain, uncached: this.uncachedDomain };
      }
      async putObject(e, n, r, s) {
        let o = await this.resolveDomain("strong"), c = await this.ensureWriteAllowed(), i = await this.resolveCredential(), d = this.buildCosKey(e, n), { defaultCacheControl: a = ke } = c, l = s?.cacheControl === null ? void 0 : s?.cacheControl ?? a, g = {};
        s?.onlyIfNew && (g["x-cos-forbid-overwrite"] = "true"), l && (g["Cache-Control"] = l), s?.contentType && (g["Content-Type"] = s.contentType);
        let u;
        try {
          let f = await P({ domain: o, method: "PUT", key: d, headers: g, body: r, credential: i });
          if (s?.onlyIfNew && (f.status === 409 || f.status === 412)) return await f.arrayBuffer().catch(() => {
          }), { etag: "", statusCode: 412 };
          if (f.ok) {
            let N = f.headers.get("etag") || "";
            return await f.arrayBuffer().catch(() => {
            }), { etag: N, statusCode: f.status };
          }
          let _ = await A(f);
          u = new h(f.status, t.buildErrorDetail("PUT", o, d, _ || `status ${f.status}`, R(f)));
        } catch (f) {
          u = new h(0, t.buildErrorDetail("PUT", o, d, v(f)));
        }
        throw await this.explainWriteFailure(u);
      }
      async ensureWriteAllowed() {
        let e = await this.credentialManager.getCredential();
        if (e.writeAllowed !== false) return e;
        let n = e;
        try {
          n = await this.credentialManager.refreshCredential();
        } catch {
        }
        return ee(n), n;
      }
      async explainWriteFailure(e) {
        if (![0, 403, 550].includes(e.statusCode)) return e;
        try {
          let n = await this.credentialManager.refreshCredential();
          ee(n);
        } catch (n) {
          if (n instanceof x) return n;
        }
        return e;
      }
      async createPresignedPutUrl(e, n, r) {
        let s = await this.resolveDomain("strong");
        await this.ensureWriteAllowed();
        let o = await this.resolveCredential(), c = this.buildCosKey(e, n), i = {};
        r?.contentType && (i["Content-Type"] = r.contentType);
        let d = r?.expireSeconds ?? 3600, a = await Q({ domain: s, method: "PUT", key: c, headers: i, credential: o, expireSeconds: d }), l = Math.floor(Date.now() / 1e3) + d;
        return { url: a, expiresAt: l };
      }
      async getObject(e, n, r) {
        let s = await this.resolveDomain(r), o = await this.resolveCredential(), c = this.buildCosKey(e, n);
        try {
          let i = await P({ domain: s, method: "GET", key: c, credential: o });
          if (i.status === 404) return await i.arrayBuffer().catch(() => {
          }), null;
          if (!i.ok) {
            let l = await A(i);
            throw new h(i.status, t.buildErrorDetail("GET", s, c, l || `status ${i.status}`, R(i)));
          }
          let d = new Uint8Array(await i.arrayBuffer()), a = te(i.headers);
          return { body: d, contentType: a["content-type"], headers: a };
        } catch (i) {
          throw i instanceof h ? i : new h(0, t.buildErrorDetail("GET", s, c, v(i)));
        }
      }
      async headObject(e, n, r) {
        let s = await this.resolveDomain(r), o = await this.resolveCredential(), c = this.buildCosKey(e, n);
        try {
          let i = await P({ domain: s, method: "HEAD", key: c, credential: o });
          if (i.status === 404) return null;
          if (!i.ok) {
            let a = await A(i);
            throw new h(i.status, t.buildErrorDetail("HEAD", s, c, a || `status ${i.status}`, R(i)));
          }
          let d = te(i.headers);
          return { cacheControl: d["cache-control"], contentType: d["content-type"], etag: d.etag, headers: d };
        } catch (i) {
          throw i instanceof h ? i : new h(0, t.buildErrorDetail("HEAD", s, c, v(i)));
        }
      }
      async deleteObject(e, n) {
        let r = await this.resolveDomain("strong"), s = await this.resolveCredential(), o = this.buildCosKey(e, n);
        try {
          let c = await P({ domain: r, method: "DELETE", key: o, credential: s });
          if (c.status === 204 || c.status === 404 || c.ok) {
            await c.arrayBuffer().catch(() => {
            });
            return;
          }
          let i = await A(c);
          throw new h(c.status, t.buildErrorDetail("DELETE", r, o, i || `status ${c.status}`, R(c)));
        } catch (c) {
          throw c instanceof h ? c : new h(0, t.buildErrorDetail("DELETE", r, o, v(c)));
        }
      }
      async listObjects(e, n) {
        await this.ensureInitialized();
        let r = `${this.keyPrefix}/${e}/`, s = n?.prefix ? r + n.prefix : r, o = await this.getBucketRaw({ prefix: s, delimiter: n?.delimiter, marker: n?.marker, maxKeys: n?.maxKeys, consistency: n?.consistency }), c = o.contents.map((d) => {
          let a = d.key, l = a.startsWith(r) ? a.slice(r.length) : a;
          return l ? { key: l, etag: d.etag } : null;
        }).filter((d) => d !== null), i = o.commonPrefixes.map((d) => d.startsWith(r) ? d.slice(r.length) : d).filter((d) => !!d);
        return { contents: c, commonPrefixes: i, isTruncated: o.isTruncated, nextMarker: o.nextMarker };
      }
      async listStores(e) {
        let n = [], r = "", s = true;
        for (; s; ) {
          await this.ensureInitialized();
          let o = `${this.keyPrefix}/`, c = await this.getBucketRaw({ prefix: o, delimiter: "/", maxKeys: 1e3, marker: r || void 0, consistency: e });
          for (let i of c.commonPrefixes) {
            let d = i.startsWith(o) ? i.slice(o.length, -1) : i.slice(0, -1);
            d && n.push(d);
          }
          if (s = c.isTruncated, r = c.nextMarker, !s || !r) break;
        }
        return n;
      }
      async getBucketRaw(e) {
        let n = await this.resolveDomain(e.consistency), r = await this.resolveCredential(), s = { prefix: k(e.prefix) };
        e.delimiter && (s.delimiter = e.delimiter), e.marker && (s.marker = k(e.marker)), e.maxKeys && (s["max-keys"] = e.maxKeys);
        try {
          let o = await P({ domain: n, method: "GET", query: s, credential: r });
          if (!o.ok) {
            let i = await A(o);
            throw new h(o.status, t.buildErrorDetail("LIST", n, e.prefix, i || `status ${o.status}`, R(o)));
          }
          let c = await o.text();
          return Re(c);
        } catch (o) {
          throw o instanceof h ? o : new h(0, t.buildErrorDetail("LIST", n, e.prefix, v(o)));
        }
      }
    };
    function ee(t) {
      if (t.writeAllowed === false) throw new x({ reason: t.writeDeniedReason, overMetrics: t.overMetrics });
    }
    function Ae(t) {
      return t.replace(/[a-zA-Z0-9\-]+\.cos\.[a-zA-Z0-9\-.]+\.myqcloud\.com/gi, "[cos-origin]").replace(/[a-zA-Z0-9\-]+\.cos\.[a-zA-Z0-9\-.]+\.tencentcos\.cn/gi, "[cos-origin]");
    }
    async function A(t) {
      try {
        return await t.text();
      } catch {
        return "";
      }
    }
    function R(t) {
      return t.headers.get("x-cos-request-id") || t.headers.get("x-eo-log-id") || void 0;
    }
    function v(t) {
      let e = t, n = e.message || String(t), r = e.cause;
      if (r) {
        let s = r.message || r.code || "";
        return s ? `${n} (${s})` : n;
      }
      return n;
    }
    function te(t) {
      let e = {};
      return t.forEach((n, r) => {
        e[r.toLowerCase()] = n;
      }), e;
    }
    function Re(t) {
      let e = [], n = /<Contents>([\s\S]*?)<\/Contents>/g, r;
      for (; (r = n.exec(t)) !== null; ) {
        let a = r[1], l = M(a, "Key"), g = M(a, "ETag");
        l !== null && e.push({ key: q(l), etag: g || "" });
      }
      let s = [], o = /<CommonPrefixes>([\s\S]*?)<\/CommonPrefixes>/g;
      for (; (r = o.exec(t)) !== null; ) {
        let a = r[1], l = M(a, "Prefix");
        l !== null && s.push(q(l));
      }
      let i = M(t, "IsTruncated") === "true", d = M(t, "NextMarker") || "";
      return { contents: e, commonPrefixes: s, isTruncated: i, nextMarker: q(d) };
    }
    function M(t, e) {
      let r = new RegExp(`<${e}>([\\s\\S]*?)<\\/${e}>`).exec(t);
      return r ? r[1] : null;
    }
    function q(t) {
      return t.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&");
    }
    var ve = "X-RateLimit-Reset";
    async function $(t, e, n = 2) {
      e.signal?.throwIfAborted?.();
      try {
        let r = await fetch(t, e);
        if (n > 0 && (r.status === 429 || r.status >= 500)) {
          let s = ne(r.headers.get(ve));
          return await re(s, e.signal), $(t, e, n - 1);
        }
        return r;
      } catch (r) {
        if (n === 0 || r instanceof DOMException && r.name === "AbortError") throw r;
        let s = ne();
        return await re(s, e.signal), $(t, e, n - 1);
      }
    }
    function ne(t) {
      return t ? Math.max(Number(t) * 1e3 - Date.now(), 500) : 1500;
    }
    function re(t, e) {
      return new Promise((n, r) => {
        if (e?.aborted) return r(e.reason);
        let s = setTimeout(() => {
          e?.removeEventListener("abort", o), n();
        }, t), o = () => {
          clearTimeout(s), r(e.reason);
        };
        e?.addEventListener("abort", o, { once: true });
      });
    }
    var Me = "prod";
    function se() {
      let t = typeof process < "u" ? process.env.PAGES_BLOB_STS_ENV : void 0;
      return t === "test" || t === "prod" ? t : Me;
    }
    var De = 300;
    var Oe = 6e4;
    var Be = "https://blob-sts.edgeone.site/";
    var O = class {
      authToken;
      projectId;
      cached = null;
      lastForcedRefreshAt = 0;
      constructor(e, n) {
        this.authToken = e, this.projectId = n;
      }
      async getCredential() {
        if (this.cached && !this.isExpired(this.cached)) return this.cached;
        let e = await this.fetchCredential();
        return this.cached = e, e;
      }
      async refreshCredential() {
        if (this.cached && Date.now() - this.lastForcedRefreshAt < Oe) return this.cached;
        this.lastForcedRefreshAt = Date.now();
        let e = await this.fetchCredential(true);
        return this.cached = e, e;
      }
      clearCache() {
        this.cached = null;
      }
      isExpired(e) {
        let n = Math.floor(Date.now() / 1e3);
        return e.expiredTime - n < De;
      }
      async fetchCredential(e = false) {
        for (let s = 1; s <= 3; s++) {
          let o = new AbortController(), c = setTimeout(() => o.abort(), 1e4), i;
          try {
            i = await $(Be, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.authToken}`, "X-Env": se(), ...e ? { "X-SKIP-CACHE": "true" } : {} }, body: JSON.stringify(this.projectId ? { ProjectId: this.projectId } : {}), signal: o.signal });
          } catch (l) {
            if (s < 3) {
              await z(500 * s);
              continue;
            }
            throw new y(`failed to obtain STS credential: ${l.message || "timeout"}`);
          } finally {
            clearTimeout(c);
          }
          if (i.status === 413) throw new y("storage quota exceeded");
          if (i.status === 429) throw new y("rate limited, please retry later");
          if (!i.ok) {
            if (i.status >= 500 && s < 3) {
              await z(500 * s);
              continue;
            }
            let l = await i.text().catch(() => "unknown error");
            throw new y(`failed to obtain STS credential: ${i.status} ${l}`);
          }
          let d = await i.json(), a = d.data && typeof d.data == "object" ? d.data : d;
          if (a.tmpSecretId && a.tmpSecretKey && a.sessionToken && a.expiredTime) {
            let l = a.cosMainland, g = a.cosOverseas, u = i.headers.get("X-Edge-Region") || void 0;
            return { tmpSecretId: a.tmpSecretId, tmpSecretKey: a.tmpSecretKey, sessionToken: a.sessionToken, expiredTime: a.expiredTime, appId: a.appId || void 0, zoneId: a.zoneId || void 0, projectId: a.projectId || void 0, resourcePrefix: a.resourcePrefix || void 0, cosMainland: l || void 0, cosOverseas: g || void 0, edgeRegion: u, defaultCacheControl: typeof a.defaultCacheControl == "string" && a.defaultCacheControl ? a.defaultCacheControl : void 0, cachedDomain: ie(a.cachedDomain), uncachedDomain: ie(a.uncachedDomain), writeAllowed: typeof a.writeAllowed == "boolean" ? a.writeAllowed : void 0, writeDeniedReason: typeof a.writeDeniedReason == "string" && a.writeDeniedReason ? a.writeDeniedReason : void 0, overMetrics: Array.isArray(a.overMetrics) ? a.overMetrics.filter((f) => typeof f == "string") : void 0 };
          }
          if (a.code !== void 0 && a.code !== 0) {
            let l = a.msg || a.message || "unknown error";
            throw new y(`credential exchange failed (code=${a.code}): ${l}`);
          }
          if (d.code !== void 0 && d.code !== 0) {
            let l = d.msg || d.message || "unknown error";
            throw new y(`credential exchange failed (code=${d.code}): ${l}`);
          }
          if (s < 3) {
            await z(500 * s);
            continue;
          }
          throw new y("invalid STS credential response");
        }
        throw new y("invalid STS credential response");
      }
    };
    function ie(t) {
      if (typeof t != "string") return;
      let e = t.trim().replace(/\/+$/, "");
      if (e) return /^https?:\/\//i.test(e) ? e : `https://${e}`;
    }
    function z(t) {
      return new Promise((e) => setTimeout(e, t));
    }
    var je = "{{PAGES_BLOB_DEPLOY_CREDENTIAL}}";
    function ae() {
      let t = {}, e = $e();
      if (e) t.deployCredential = e;
      else {
        let r = oe("PAGES_BLOB_DEPLOY_CREDENTIAL");
        r && (t.deployCredential = r);
      }
      let n = oe("PAGES_PROJECT_ID");
      return n && (t.projectId = n), t;
    }
    function $e() {
      let t = je;
      if (!(t.startsWith("{{") && t.endsWith("}}"))) return t || void 0;
    }
    function oe(t) {
      if (typeof process < "u" && process.env) return process.env[t];
    }
    function _e(t) {
      let e = typeof t == "string" ? t : t.name;
      F(e);
      let n = ce(typeof t == "string" ? void 0 : t), r = new O(n.authToken, n.projectId), s = new D(r);
      return new T(s, e, n.consistency ?? "eventual");
    }
    async function Ne(t) {
      let e = ce(t ? { name: "__list__", projectId: t.projectId, token: t.token, consistency: t.consistency } : void 0), n = new O(e.authToken, e.projectId);
      return { stores: (await new D(n).listStores(e.consistency)).map((o) => ({ name: o })) };
    }
    function ce(t) {
      let e = ae(), n = t?.token || e.deployCredential, r = t?.projectId || e.projectId;
      if (t?.token || e.projectId) {
        if (!r) throw new S();
        if (!n) throw new E(["token"]);
        return { authToken: n, projectId: r, consistency: t?.consistency };
      }
      if (t?.projectId && !n) throw new E(["token"]);
      if (!e.deployCredential) throw new E(["deployCredential"]);
      return { authToken: e.deployCredential, consistency: t?.consistency };
    }
  }
});

// cloud-functions-src/stats.src.js
var import_pages_blob = __toESM(require_dist(), 1);

// cloud-functions-src/docs-data.js
var DOCS = { "fiche-randomisation-insu": { "title": "Randomisation et insu", "md": "# Randomisation et insu\n\nDomaine : M\xE9thodologie\n\n> Fiche p\xE9dagogique, version \xE0 faire valider par une personne comp\xE9tente avant tout usage dans une \xE9tude. Ce n'est pas un avis r\xE9glementaire, statistique ou m\xE9dical.\n\n## Principe g\xE9n\xE9ral\n\n- La randomisation r\xE9partit les participants entre les groupes par tirage au sort, pour que les groupes soient comparables en moyenne.\n- L'insu (aveugle) limite l'influence de la connaissance du groupe sur la prise en charge et sur l'\xE9valuation des crit\xE8res.\n- La liste de randomisation et la lev\xE9e d'insu sont des op\xE9rations encadr\xE9es : elles sont d\xE9crites \xE0 l'avance et trac\xE9es.\n\n## Selon le type d'\xE9tude\n\nTous les essais ne sont pas randomis\xE9s ni en insu : cela d\xE9pend du design, de l'intervention et de la faisabilit\xE9.\n\n## Selon le pays\n\nLes exigences de documentation et d'autorisation varient selon la juridiction.\n\n## Selon le protocole\n\nLe protocole fixe la m\xE9thode d'allocation, les facteurs de stratification \xE9ventuels et les r\xE8gles de lev\xE9e d'insu.\n\n## \xC0 confirmer par une personne comp\xE9tente\n\nLe choix de la m\xE9thode et la liste de randomisation rel\xE8vent de la biostatistique et de la m\xE9thodologie.\n\n## Sources\n\n- ICH E9, principes statistiques (EMA) : https://www.ema.europa.eu/en/scientific-guidelines/ich-e9-statistical-principles-clinical-trials\n- ICH E6 Good clinical practice (EMA) : https://www.ema.europa.eu/en/scientific-guidelines/ich-e6-good-clinical-practice\n\nSources officielles consult\xE9es le 26 novembre 2026. Clinical Navigator, https://clinical-navigator.edgeone.dev\n" }, "fiche-criteres-estimands": { "title": "Crit\xE8res de jugement et estimands", "md": "# Crit\xE8res de jugement et estimands\n\nDomaine : M\xE9thodologie\n\n> Fiche p\xE9dagogique, version \xE0 faire valider par une personne comp\xE9tente avant tout usage dans une \xE9tude. Ce n'est pas un avis r\xE9glementaire, statistique ou m\xE9dical.\n\n## Principe g\xE9n\xE9ral\n\n- Un crit\xE8re de jugement est la mesure qui permet de r\xE9pondre \xE0 la question de l'essai.\n- Un estimand pr\xE9cise ce qui est estim\xE9 : population, variable, \xE9v\xE9nements intercurrents et r\xE9sum\xE9 statistique.\n- D\xE9finir l'estimand avant l'analyse \xE9vite des \xE9carts entre la question pos\xE9e et le calcul r\xE9alis\xE9.\n\n## Selon le type d'\xE9tude\n\nLe niveau de d\xE9tail d\xE9pend de la phase, de l'objectif et du design de l'\xE9tude.\n\n## Selon le pays\n\nLes autorit\xE9s peuvent avoir des attentes propres : \xE0 v\xE9rifier aupr\xE8s de l'autorit\xE9 comp\xE9tente.\n\n## Selon le protocole\n\nLe protocole et le plan d'analyse statistique fixent crit\xE8res, \xE9ch\xE9ances et gestion des \xE9v\xE9nements intercurrents.\n\n## \xC0 confirmer par une personne comp\xE9tente\n\nLa d\xE9finition de l'estimand et le plan d'analyse doivent \xEAtre valid\xE9s par un biostatisticien.\n\n## Sources\n\n- ICH E9, principes statistiques (EMA) : https://www.ema.europa.eu/en/scientific-guidelines/ich-e9-statistical-principles-clinical-trials\n- ICH E9(R1), addendum sur les estimands (ICH) : https://database.ich.org/sites/default/files/E9-R1_Step4_Guideline_2019_1203.pdf\n\nSources officielles consult\xE9es le 26 novembre 2026. Clinical Navigator, https://clinical-navigator.edgeone.dev\n" }, "fiche-taille-echantillon": { "title": "Taille d'\xE9chantillon : les param\xE8tres \xE0 conna\xEEtre", "md": "# Taille d'\xE9chantillon : les param\xE8tres \xE0 conna\xEEtre\n\nDomaine : M\xE9thodologie\n\n> Fiche p\xE9dagogique, version \xE0 faire valider par une personne comp\xE9tente avant tout usage dans une \xE9tude. Ce n'est pas un avis r\xE9glementaire, statistique ou m\xE9dical.\n\n## Principe g\xE9n\xE9ral\n\n- Le calcul de la taille d'\xE9chantillon d\xE9pend d'hypoth\xE8ses : effet attendu, variabilit\xE9, risque d'erreur et puissance.\n- Un changement d'hypoth\xE8se modifie fortement le r\xE9sultat : les hypoth\xE8ses et leur source sont consign\xE9es.\n- Les sorties d'\xE9tude et les donn\xE9es manquantes sont \xE0 pr\xE9voir dans l'effectif \xE0 recruter.\n\n## Selon le type d'\xE9tude\n\nLa m\xE9thode d\xE9pend du type de crit\xE8re (quantitatif, binaire, d\xE9lai) et du design.\n\n## Selon le pays\n\nPas de r\xE8gle de calcul propre \xE0 un pays : la justification est examin\xE9e par les instances d'\xE9valuation.\n\n## Selon le protocole\n\nLa justification de l'effectif figure dans le protocole.\n\n## \xC0 confirmer par une personne comp\xE9tente\n\nTout calcul utilis\xE9 dans un protocole doit \xEAtre r\xE9alis\xE9 ou valid\xE9 par un biostatisticien.\n\n## Sources\n\n- ICH E9, principes statistiques (EMA) : https://www.ema.europa.eu/en/scientific-guidelines/ich-e9-statistical-principles-clinical-trials\n\nSources officielles consult\xE9es le 26 novembre 2026. Clinical Navigator, https://clinical-navigator.edgeone.dev\n" }, "fiche-qualite-risques": { "title": "Qualit\xE9 par la conception et approche proportionn\xE9e au risque", "md": "# Qualit\xE9 par la conception et approche proportionn\xE9e au risque\n\nDomaine : Qualit\xE9\n\n> Fiche p\xE9dagogique, version \xE0 faire valider par une personne comp\xE9tente avant tout usage dans une \xE9tude. Ce n'est pas un avis r\xE9glementaire, statistique ou m\xE9dical.\n\n## Principe g\xE9n\xE9ral\n\n- La qualit\xE9 se pr\xE9pare d\xE8s la conception : on identifie ce qui est critique pour la s\xE9curit\xE9 des participants et la fiabilit\xE9 des r\xE9sultats.\n- Les mesures de ma\xEEtrise sont proportionn\xE9es aux risques identifi\xE9s, puis revues pendant l'\xE9tude.\n- Les d\xE9viations et les actions correctives et pr\xE9ventives (CAPA) alimentent l'am\xE9lioration continue.\n\n## Selon le type d'\xE9tude\n\nLes risques et les contr\xF4les d\xE9pendent de l'\xE9tude : population, produit, complexit\xE9, syst\xE8mes utilis\xE9s.\n\n## Selon le pays\n\nLes attentes d'inspection et de documentation varient selon l'autorit\xE9.\n\n## Selon le protocole\n\nLe plan de gestion des risques et le plan de monitoring sont propres \xE0 l'\xE9tude.\n\n## \xC0 confirmer par une personne comp\xE9tente\n\nLes seuils et fr\xE9quences de contr\xF4le sont ceux des proc\xE9dures de l'organisation, pas ceux des outils p\xE9dagogiques du site.\n\n## Sources\n\n- ICH E6(R3), bonnes pratiques cliniques (texte final, ICH) : https://database.ich.org/sites/default/files/ICH_E6%28R3%29_Step4_FinalGuideline_2025_0106_ErrorCorrections_2025_1024.pdf\n- ICH E6 Good clinical practice (EMA) : https://www.ema.europa.eu/en/scientific-guidelines/ich-e6-good-clinical-practice\n\nSources officielles consult\xE9es le 26 novembre 2026. Clinical Navigator, https://clinical-navigator.edgeone.dev\n" }, "fiche-donnees-ecrf": { "title": "Collecte et qualit\xE9 des donn\xE9es", "md": "# Collecte et qualit\xE9 des donn\xE9es\n\nDomaine : Donn\xE9es\n\n> Fiche p\xE9dagogique, version \xE0 faire valider par une personne comp\xE9tente avant tout usage dans une \xE9tude. Ce n'est pas un avis r\xE9glementaire, statistique ou m\xE9dical.\n\n## Principe g\xE9n\xE9ral\n\n- Un formulaire de recueil (CRF ou eCRF) collecte les donn\xE9es pr\xE9vues par le protocole, rien de plus.\n- Des contr\xF4les de coh\xE9rence et des requ\xEAtes (queries) permettent de corriger les anomalies avec tra\xE7abilit\xE9.\n- Les standards de donn\xE9es, comme CDASH pour la collecte et SDTM pour la pr\xE9sentation, facilitent la r\xE9utilisation des donn\xE9es.\n\n## Selon le type d'\xE9tude\n\nLa structure des formulaires d\xE9pend du protocole, du domaine th\xE9rapeutique et du syst\xE8me utilis\xE9.\n\n## Selon le pays\n\nLes r\xE8gles de protection des donn\xE9es personnelles d\xE9pendent du pays. Aucune donn\xE9e de participant n'est saisie sur ce site.\n\n## Selon le protocole\n\nLe plan de gestion des donn\xE9es d\xE9crit variables, contr\xF4les, codage et gel de base.\n\n## \xC0 confirmer par une personne comp\xE9tente\n\nLa validation du syst\xE8me et les exigences de conservation rel\xE8vent des proc\xE9dures de l'organisation et de la r\xE9glementation applicable.\n\n## Sources\n\n- CDISC, SDTM et CDASH : pourquoi les deux : https://www.cdisc.org/kb/articles/sdtm-and-cdash-why-you-need-both\n- ICH E6 Good clinical practice (EMA) : https://www.ema.europa.eu/en/scientific-guidelines/ich-e6-good-clinical-practice\n\nSources officielles consult\xE9es le 26 novembre 2026. Clinical Navigator, https://clinical-navigator.edgeone.dev\n" }, "fiche-securite-evenements": { "title": "\xC9v\xE9nements ind\xE9sirables : rep\xE8res de vocabulaire", "md": "# \xC9v\xE9nements ind\xE9sirables : rep\xE8res de vocabulaire\n\nDomaine : S\xE9curit\xE9 et vigilance\n\n> Fiche p\xE9dagogique, version \xE0 faire valider par une personne comp\xE9tente avant tout usage dans une \xE9tude. Ce n'est pas un avis r\xE9glementaire, statistique ou m\xE9dical.\n\n## Principe g\xE9n\xE9ral\n\n- Un \xE9v\xE9nement ind\xE9sirable est tout \xE9v\xE9nement m\xE9dical d\xE9favorable survenant chez un participant, li\xE9 ou non au produit \xE9tudi\xE9.\n- La gravit\xE9 et le lien avec le produit sont deux \xE9valuations distinctes.\n- La d\xE9claration suit un circuit pr\xE9vu \xE0 l'avance, avec des d\xE9lais qui d\xE9pendent du cadre applicable.\n\n## Selon le type d'\xE9tude\n\nLes d\xE9finitions et circuits diff\xE8rent entre m\xE9dicaments, dispositifs m\xE9dicaux et recherches non interventionnelles.\n\n## Selon le pays\n\nAutorit\xE9s destinataires, formulaires et d\xE9lais d\xE9pendent du pays et du type de recherche. Aucun d\xE9lai n'est donn\xE9 ici.\n\n## Selon le protocole\n\nLe protocole pr\xE9cise les \xE9v\xE9nements \xE0 recueillir, la p\xE9riode de suivi et le circuit de d\xE9claration.\n\n## \xC0 confirmer par une personne comp\xE9tente\n\nToute classification et toute d\xE9claration rel\xE8vent de l'investigateur, du promoteur et des personnes habilit\xE9es, selon les textes officiels en vigueur.\n\n## Sources\n\n- ICH E2A, gestion des donn\xE9es de s\xE9curit\xE9 clinique (EMA) : https://www.ema.europa.eu/en/scientific-guidelines/ich-e2a-clinical-safety-data-management-definitions-standards-expedited-reporting\n- ICH E6 Good clinical practice (EMA) : https://www.ema.europa.eu/en/scientific-guidelines/ich-e6-good-clinical-practice\n\nSources officielles consult\xE9es le 26 novembre 2026. Clinical Navigator, https://clinical-navigator.edgeone.dev\n" }, "modele-lettre-annonce-visite": { "title": "Lettre d'annonce de visite de monitoring", "md": "# Lettre d'annonce de visite de monitoring\n\n> Trame \xE0 adapter. Brouillon p\xE9dagogique (DRAFT) : \xE0 faire valider par votre structure avant tout usage r\xE9el.\n\n```text\nLETTRE D'ANNONCE DE VISITE DE MONITORING\n(Trame \xE0 adapter : remplacer chaque \xE9l\xE9ment entre crochets)\n\n[Ville], le [date]\n\n\xC0 l'attention de [Pr\xE9nom NOM], [fonction]\n[Service] \u2014 [Centre]\n\nObjet : annonce d'une visite de monitoring \u2014 \xE9tude [code de l'\xE9tude] \xAB [titre court] \xBB\n\nMadame, Monsieur,\n\nDans le cadre du suivi de l'\xE9tude [code de l'\xE9tude] conduite dans votre centre, je vous propose une visite de monitoring le [date], de [heure] \xE0 [heure].\n\nOrdre du jour propos\xE9 :\n1. Ouverture et point d'avancement du recrutement\n2. V\xE9rification des consentements \xE9clair\xE9s\n3. Revue des donn\xE9es source et comparaison avec le eCRF (\xE9chantillon de [nombre] dossiers)\n4. Suivi des \xE9v\xE9nements ind\xE9sirables et de leurs d\xE9clarations\n5. Produit de l'\xE9tude : stock, temp\xE9ratures, comptabilit\xE9\n6. Classeur investigateur et documents essentiels\n7. Requ\xEAtes et d\xE9viations ouvertes\n8. Pr\xE9sentation des constats et \xE9change avec l'\xE9quipe\n\nMerci de pr\xE9voir la disponibilit\xE9 de : l'investigateur ou son repr\xE9sentant, [le pharmacien], [le coordinateur de recherche], ainsi que des dossiers source des participants inclus, du classeur investigateur, des registres de temp\xE9rature et de la comptabilit\xE9 du produit.\n\nMerci de confirmer la date et les disponibilit\xE9s avant le [date limite].\n\n[Pr\xE9nom NOM]\nAttach\xE9(e) de recherche clinique \u2014 [structure promotrice]\n[t\xE9l\xE9phone] \u2014 [adresse e-mail professionnelle]\n\nRappel : aucune donn\xE9e permettant d'identifier directement un participant ne doit figurer dans cette correspondance.\n```\n" }, "modele-lettre-suivi-visite": { "title": "Lettre de suivi de visite de monitoring", "md": "# Lettre de suivi de visite de monitoring\n\n> Trame \xE0 adapter. Brouillon p\xE9dagogique (DRAFT) : \xE0 faire valider par votre structure avant tout usage r\xE9el.\n\n```text\nLETTRE DE SUIVI DE VISITE DE MONITORING\n(Trame \xE0 adapter : remplacer chaque \xE9l\xE9ment entre crochets)\n\n[Ville], le [date]\n\n\xC0 l'attention de [Pr\xE9nom NOM], investigateur(rice) principal(e)\n[Service] \u2014 [Centre]\n\nObjet : compte rendu de la visite de monitoring du [date] \u2014 \xE9tude [code de l'\xE9tude]\n\nMadame, Monsieur,\n\nJe vous remercie pour l'accueil r\xE9serv\xE9 lors de la visite du [date], conduite avec [personnes pr\xE9sentes et fonctions].\n\n1. Rappel du p\xE9rim\xE8tre\nParticipants revus : [nombre] sur [nombre] inclus. Points couverts : consentements, donn\xE9es source, s\xE9curit\xE9, produit, classeur investigateur, requ\xEAtes et d\xE9viations.\n\n2. Constats\nPour chaque constat : le fait observ\xE9, le risque encouru, l'action attendue, le responsable et le d\xE9lai.\n\nConstat n\xB0 1\n- Fait : [description factuelle, sans donn\xE9e identifiante]\n- Risque : [risque pour les participants, les donn\xE9es ou la conformit\xE9]\n- Action attendue : [action pr\xE9cise]\n- Responsable : [fonction] \u2014 D\xE9lai : [date]\n\nConstat n\xB0 2\n- Fait : [description factuelle]\n- Risque : [risque]\n- Action attendue : [action pr\xE9cise]\n- Responsable : [fonction] \u2014 D\xE9lai : [date]\n\n3. Points positifs\n[\xC9l\xE9ments conformes ou remarquables observ\xE9s pendant la visite.]\n\n4. R\xE9ponse attendue\nMerci de faire parvenir vos r\xE9ponses et les preuves des actions men\xE9es avant le [date]. Les points non r\xE9solus seront suivis avec [fonction du r\xE9f\xE9rent promoteur].\n\n5. Prochaine \xE9tape\nProchaine visite envisag\xE9e : [p\xE9riode].\n\n[Pr\xE9nom NOM]\nAttach\xE9(e) de recherche clinique \u2014 [structure promotrice]\n[t\xE9l\xE9phone] \u2014 [adresse e-mail professionnelle]\n\nRappel : aucune donn\xE9e permettant d'identifier directement un participant ne doit figurer dans cette correspondance.\n```\n" }, "modele-log-delegation": { "title": "Log de d\xE9l\xE9gation des t\xE2ches", "md": "# Log de d\xE9l\xE9gation des t\xE2ches\n\n> Trame \xE0 adapter. Brouillon p\xE9dagogique (DRAFT) : \xE0 faire valider par votre structure avant tout usage r\xE9el.\n\n```text\nLOG DE D\xC9L\xC9GATION DES T\xC2CHES\n(Trame \xE0 adapter : le droit national ou le promoteur peut imposer un format propre)\n\n\xC9tude : [code et titre court]\nCentre : [nom et num\xE9ro du centre]\nInvestigateur(rice) principal(e) : [Pr\xE9nom NOM]\n\nTableau des d\xE9l\xE9gations (une ligne par personne et par t\xE2che) :\n\n| Nom et fonction | T\xE2che d\xE9l\xE9gu\xE9e | Qualification v\xE9rifi\xE9e (formation, date) | D\xE9but de d\xE9l\xE9gation | Fin de d\xE9l\xE9gation | Signature de l'investigateur | Signature du d\xE9l\xE9gataire |\n|---|---|---|---|---|---|---|\n| [Nom, fonction] | [ex. prise des constantes] | [formation BPC, date ; formation protocole, date] | [date] | [date ou \xAB en cours \xBB] | | |\n| [Nom, fonction] | [ex. saisie eCRF] | [formations et dates] | [date] | [date] | | |\n| [Nom, fonction] | [ex. gestion du produit] | [formations et dates] | [date] | [date] | | |\n\nR\xE8gles d'utilisation :\n- Toute t\xE2che est d\xE9l\xE9gu\xE9e avant sa premi\xE8re r\xE9alisation, jamais r\xE9troactivement.\n- Les t\xE2ches exigeant une qualification m\xE9dicale sont r\xE9serv\xE9es aux personnes qualifi\xE9es.\n- Toute arriv\xE9e, d\xE9part ou changement de t\xE2che donne lieu \xE0 une nouvelle ligne dat\xE9e et sign\xE9e.\n- Les acc\xE8s aux syst\xE8mes (eCRF, randomisation) correspondent aux t\xE2ches d\xE9l\xE9gu\xE9es.\n```\n" }, "modele-fiche-poste-arc": { "title": "Fiche de poste ARC", "md": "# Fiche de poste ARC\n\n> Trame \xE0 adapter. Brouillon p\xE9dagogique (DRAFT) : \xE0 faire valider par votre structure avant tout usage r\xE9el.\n\n```text\nFICHE DE POSTE \u2014 ATTACH\xC9(E) DE RECHERCHE CLINIQUE (ARC / CRA)\n(Trame \xE0 adapter : contrat, statut et r\xE9mun\xE9ration rel\xE8vent du droit du travail du pays et sont \xE0 faire valider par la structure)\n\n1. Intitul\xE9 et rattachement\nPoste : Attach\xE9(e) de recherche clinique\nRattachement hi\xE9rarchique : [fonction, ex. chef de projet / promoteur]\n\xC9tudes concern\xE9es : [codes et titres courts] \u2014 Centres : [liste et localisation]\n\n2. Missions\nAssurer le monitoring des centres avant, pendant et apr\xE8s la conduite des \xE9tudes, dans le respect du protocole, des bonnes pratiques cliniques et des proc\xE9dures du promoteur.\n\n3. Activit\xE9s principales\nAvant l'ouverture d'un centre : pr\xE9parer et conduire la visite d'initiation, v\xE9rifier les documents r\xE9glementaires, former l'\xE9quipe, recommander l'activation.\nPendant l'\xE9tude : annoncer et conduire les visites de monitoring, v\xE9rifier consentements, donn\xE9es source, s\xE9curit\xE9, produit et classeur investigateur, pr\xE9senter les constats \xE0 l'\xE9quipe, r\xE9diger les lettres de suivi et v\xE9rifier la lev\xE9e des actions.\nApr\xE8s : conduire la visite de cl\xF4ture, solder les requ\xEAtes, r\xE9concilier le produit, organiser l'archivage.\nTransverse : remonter les risques au chef de projet, tenir les outils de suivi \xE0 jour, participer aux r\xE9unions d'\xE9quipe.\n\n4. Pr\xE9requis\nFormation aux bonnes pratiques cliniques \xE0 jour (attestation \xE0 fournir).\nDipl\xF4me : [ex. licence/master en sciences de la vie, sant\xE9 ou \xE9quivalent].\nExp\xE9rience : [ex. premi\xE8re exp\xE9rience encadr\xE9e accept\xE9e, ou X ann\xE9es].\nLangues : fran\xE7ais professionnel requis [pr\xE9ciser si les dossiers sont en fran\xE7ais] ; [autre langue selon le contexte].\nQualit\xE9s : rigueur documentaire, sens du relationnel avec les \xE9quipes, capacit\xE9 \xE0 r\xE9diger des constats factuels.\n\n5. D\xE9placements\n[Fr\xE9quence et p\xE9rim\xE8tre attendus, ex. visites mensuelles sur [zone].]\n\n6. \xC9valuation\nP\xE9riode d'int\xE9gration encadr\xE9e (visites en bin\xF4me avec un ARC exp\xE9riment\xE9, revue des premiers comptes rendus).\nIndicateurs : qualit\xE9 et d\xE9lais des comptes rendus, taux de lev\xE9e des actions, conformit\xE9 des visites au plan de monitoring.\n```\n" }, "modele-plan-capa": { "title": "Plan d'actions correctives et pr\xE9ventives (CAPA)", "md": "# Plan d'actions correctives et pr\xE9ventives (CAPA)\n\n> Trame \xE0 adapter. Brouillon p\xE9dagogique (DRAFT) : \xE0 faire valider par votre structure avant tout usage r\xE9el.\n\n```text\nPLAN D'ACTIONS CORRECTIVES ET PR\xC9VENTIVES (CAPA)\n(Trame \xE0 adapter : \xE0 faire valider par la qualit\xE9 de la structure)\n\nR\xE9f\xE9rence du constat : [source : audit/inspection/d\xE9viation \u2014 identifiant \u2014 date]\n\xC9tude / site concern\xE9 : [code \xE9tude, centre]\n\n1. Description factuelle du constat\n[Ce qui a \xE9t\xE9 observ\xE9, sans interpr\xE9tation ni donn\xE9e identifiante.]\n\n2. Analyse des causes\nCause imm\xE9diate : [ce qui a directement produit le constat]\nCause sous-jacente : [processus ou organisation d\xE9faillant]\nCause racine : [pourquoi le processus a permis la d\xE9faillance \u2014 m\xE9thode des 5 pourquoi ou \xE9quivalent]\n\n3. Actions correctives (traiter le constat existant)\n| Action | Responsable | D\xE9lai | Preuve attendue | Statut |\n|---|---|---|---|---|\n| [action] | [fonction] | [date] | [document, enregistrement] | [en cours/cl\xF4tur\xE9] |\n\n4. Actions pr\xE9ventives (emp\xEAcher la r\xE9apparition)\n| Action | Responsable | D\xE9lai | Preuve attendue | Statut |\n|---|---|---|---|---|\n| [action : proc\xE9dure, formation, contr\xF4le] | [fonction] | [date] | [document, enregistrement] | [en cours/cl\xF4tur\xE9] |\n\n5. V\xE9rification d'efficacit\xE9\nComment et quand l'efficacit\xE9 des actions sera v\xE9rifi\xE9e : [m\xE9thode, indicateur, date de revue].\n\n6. Validation\nR\xE9dig\xE9 par : [nom, fonction, date] \u2014 V\xE9rifi\xE9 par : [qualit\xE9, date] \u2014 Approuv\xE9 par : [fonction, date]\n```\n" }, "modele-exemple-lettre-suivi-remplie": { "title": "Exemple rempli : lettre de suivi de visite", "md": "# Exemple rempli : lettre de suivi de visite\n\n> Exemple enti\xE8rement fictif. Brouillon p\xE9dagogique (DRAFT) : \xE0 faire valider par votre structure avant tout usage r\xE9el.\n\n```text\nEXEMPLE ENTI\xC8REMENT FICTIF \u2014 toute ressemblance avec une \xE9tude ou un centre r\xE9el est fortuite.\n\nLETTRE DE SUIVI DE VISITE DE MONITORING\n\nCotonou, le 18 novembre 2026\n\n\xC0 l'attention du Dr A. GBEGNON, investigateur principal\nService de m\xE9decine interne \u2014 Centre hospitalier de r\xE9f\xE9rence de Parakou (centre 03)\n\nObjet : compte rendu de la visite de monitoring du 16 novembre 2026 \u2014 \xE9tude PALM-2026-014\n\nCher Docteur GBEGNON,\n\nJe vous remercie pour l'accueil r\xE9serv\xE9 lors de la visite du 16 novembre, conduite avec vous-m\xEAme, Mme R. ADJOVI (coordinatrice) et M. K. TOSSOU (pharmacien).\n\n1. Rappel du p\xE9rim\xE8tre\nParticipants revus : 6 sur 9 inclus. Points couverts : consentements, donn\xE9es source, s\xE9curit\xE9, produit, classeur investigateur, requ\xEAtes et d\xE9viations.\n\n2. Constats\n\nConstat n\xB0 1\n- Fait : deux requ\xEAtes eCRF ouvertes depuis plus de 30 jours (visites V3 et V4).\n- Risque : retard de nettoyage des donn\xE9es avant la revue interm\xE9diaire.\n- Action attendue : r\xE9soudre ou commenter chaque requ\xEAte.\n- Responsable : coordinatrice \u2014 D\xE9lai : 2 d\xE9cembre 2026.\n\nConstat n\xB0 2\n- Fait : un relev\xE9 de temp\xE9rature du 9 novembre absent au registre du produit.\n- Risque : tra\xE7abilit\xE9 de conservation incompl\xE8te.\n- Action attendue : v\xE9rifier l'enregistreur, documenter l'\xE9cart selon la proc\xE9dure et rappeler la conduite \xE0 tenir \xE0 l'\xE9quipe.\n- Responsable : pharmacien \u2014 D\xE9lai : 25 novembre 2026.\n\nConstat n\xB0 3\n- Fait : la formation au protocole d'un infirmier r\xE9cemment d\xE9l\xE9gu\xE9 n'est pas dat\xE9e dans le log.\n- Risque : d\xE9l\xE9gation non document\xE9e avant activit\xE9.\n- Action attendue : r\xE9gulariser la ligne du log avec la date r\xE9elle de formation (sans antidater) et former avant toute nouvelle t\xE2che.\n- Responsable : investigateur \u2014 D\xE9lai : 25 novembre 2026.\n\n3. Points positifs\nConsentements complets et dat\xE9s avant toute proc\xE9dure pour les 6 dossiers revus ; registres de s\xE9curit\xE9 \xE0 jour.\n\n4. R\xE9ponse attendue\nMerci de faire parvenir vos r\xE9ponses et les preuves des actions men\xE9es avant le 2 d\xE9cembre 2026. Les points non r\xE9solus seront suivis avec le chef de projet.\n\n5. Prochaine \xE9tape\nProchaine visite envisag\xE9e : semaine du 11 janvier 2027.\n\nS. AGOSSA\nAttach\xE9e de recherche clinique \u2014 Institut de recherche pour la sant\xE9 (structure fictive)\n[t\xE9l\xE9phone] \u2014 [adresse e-mail professionnelle]\n```\n" } };

// cloud-functions-src/stats.src.js
var ID = /^[a-z0-9][a-z0-9-]{0,80}$/;
var CODE = /^[a-hj-km-np-z2-9]{16}$/;
var DAILY_CAP = { score: 6e3, vote: 6e3, save: 3e3, report: 200, create: 1500 };
var MAX_SAVE = 2e4;
var recent = /* @__PURE__ */ new Map();
var json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "Content-Type": "application/json; charset=UTF-8", "Cache-Control": "no-store" }
});
var today = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
function limited(request, key, max, windowMs) {
  const ip = (request.headers.get("x-forwarded-for") || request.headers.get("eo-connecting-ip") || "x").split(",")[0].trim();
  const id = key + "|" + ip;
  const now = Date.now();
  const list = (recent.get(id) || []).filter((t) => now - t < windowMs);
  if (list.length >= max) {
    recent.set(id, list);
    return true;
  }
  list.push(now);
  recent.set(id, list);
  if (recent.size > 3e3) recent.clear();
  return false;
}
async function readJson(store, key, fallback) {
  try {
    const v = await store.get(key, { type: "json", consistency: "strong" });
    return v || fallback;
  } catch {
    return fallback;
  }
}
async function bumpDay(store, kind) {
  const key = "quota/" + today() + "-" + kind + ".json";
  const q = await readJson(store, key, { n: 0 });
  if (q.n >= (DAILY_CAP[kind] || 1e3)) return false;
  q.n += 1;
  await store.setJSON(key, q);
  return true;
}
function cleanText(value, max) {
  return String(value || "").replace(/[\u0000-\u001f\u007f<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}
function hasPersonalOrSpam(text) {
  return /https?:\/\/|www\.|@[\w.-]+\.[a-z]{2,}|\b\+?\d[\d .-]{7,}\d\b|\.(com|ru|cn|xyz|top)\b/i.test(text) || /(.)\1{9,}/.test(text);
}
function newCode() {
  const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}
async function body(request) {
  try {
    const text = await request.text();
    if (text.length > MAX_SAVE + 2e3) return null;
    return JSON.parse(text);
  } catch {
    return null;
  }
}
async function onRequest({ request }) {
  const url = new URL(request.url);
  const action = url.searchParams.get("action") || "";
  let store = null;
  try {
    try {
      store = (0, import_pages_blob.getStore)("clinical-navigator-data");
    } catch {
      store = null;
    }
    if (request.method === "GET" && action === "doc") {
      const id = url.searchParams.get("id") || "";
      const doc = ID.test(id) ? DOCS[id] : null;
      if (!doc) return json({ error: "inconnu" }, 404);
      const key = "docs/" + id + ".md";
      let md = null;
      try {
        md = store ? await store.get(key, { type: "text" }) : null;
      } catch {
        md = null;
      }
      if (!md || md !== doc.md) {
        md = doc.md;
        try {
          if (store) await store.set(key, md);
        } catch {
        }
      }
      return new Response("\uFEFF" + md, { status: 200, headers: {
        "Content-Type": "text/markdown; charset=UTF-8",
        "Content-Disposition": 'attachment; filename="clinical-navigator-' + id + '.md"',
        "Cache-Control": "public, max-age=3600",
        "X-Content-Type-Options": "nosniff"
      } });
    }
    if (request.method === "GET" && action === "docs") {
      return json({ docs: Object.entries(DOCS).map(([id, d]) => ({ id, title: d.title })) });
    }
    if (!store) return json({ error: "service indisponible" }, 503);
    if (request.method === "GET" && action === "top") {
      const quiz = url.searchParams.get("quiz") || "";
      if (!ID.test(quiz)) return json({ error: "quiz invalide" }, 400);
      const d = await readJson(store, "quiz/" + quiz + ".json", { attempts: 0, miss: {} });
      const top = Object.entries(d.miss || {}).map(([q, n]) => ({ q, n })).sort((a, b2) => b2.n - a.n).slice(0, 10);
      return json({ attempts: d.attempts || 0, top });
    }
    if (request.method === "GET" && action === "votes") {
      const fiche = url.searchParams.get("fiche") || "";
      if (!ID.test(fiche)) return json({ error: "fiche invalide" }, 400);
      const d = await readJson(store, "votes/" + fiche + ".json", { yes: 0, no: 0 });
      return json({ yes: d.yes || 0, no: d.no || 0 });
    }
    if (request.method === "GET" && action === "load") {
      const code = (url.searchParams.get("code") || "").toLowerCase();
      if (!CODE.test(code)) return json({ error: "code invalide" }, 400);
      if (limited(request, "load", 20, 6e4)) return json({ error: "trop de demandes" }, 429);
      const d = await readJson(store, "progress/" + code + ".json", null);
      if (!d) return json({ error: "introuvable" }, 404);
      return json({ data: d.data, updated: d.updated });
    }
    if (request.method !== "POST") return json({ error: "m\xE9thode non permise" }, 405);
    const b = await body(request);
    if (!b || typeof b !== "object") return json({ error: "corps invalide" }, 400);
    if (action === "score") {
      const quiz = String(b.quiz || "");
      if (!ID.test(quiz) || !Array.isArray(b.missed) || b.missed.length > 100) return json({ error: "score invalide" }, 400);
      if (limited(request, "score", 20, 6e4)) return json({ error: "trop de demandes" }, 429);
      const missed = b.missed.map(String).filter((q) => ID.test(q)).slice(0, 100);
      if (!await bumpDay(store, "score")) return json({ ok: false, reason: "plafond du jour" });
      const key = "quiz/" + quiz + ".json";
      const d = await readJson(store, key, { attempts: 0, miss: {} });
      d.attempts = (d.attempts || 0) + 1;
      for (const q of missed) d.miss[q] = (d.miss[q] || 0) + 1;
      if (Object.keys(d.miss).length > 500) return json({ ok: false, reason: "trop de questions" });
      await store.setJSON(key, d);
      return json({ ok: true });
    }
    if (action === "vote") {
      const fiche = String(b.fiche || "");
      if (!ID.test(fiche) || b.v !== 0 && b.v !== 1) return json({ error: "vote invalide" }, 400);
      if (limited(request, "vote", 10, 6e4)) return json({ error: "trop de demandes" }, 429);
      if (!await bumpDay(store, "vote")) return json({ ok: false, reason: "plafond du jour" });
      const key = "votes/" + fiche + ".json";
      const d = await readJson(store, key, { yes: 0, no: 0 });
      if (b.v === 1) d.yes = (d.yes || 0) + 1;
      else d.no = (d.no || 0) + 1;
      await store.setJSON(key, d);
      return json({ ok: true, yes: d.yes, no: d.no });
    }
    if (action === "create") {
      if (limited(request, "create", 3, 36e5)) return json({ error: "trop de demandes" }, 429);
      if (!await bumpDay(store, "create")) return json({ error: "plafond du jour" }, 503);
      return json({ code: newCode() });
    }
    if (action === "save") {
      const code = String(b.code || "").toLowerCase();
      const data = b.data;
      if (!CODE.test(code) || !data || typeof data !== "object" || Array.isArray(data)) return json({ error: "sauvegarde invalide" }, 400);
      const clean = {};
      for (const [k, v] of Object.entries(data)) {
        if (!/^(cn_[a-z_0-9]{1,40}|cn-module-checklist-[a-z0-9-]{1,60}|clinical-navigator-design(-draft)?)$/.test(k)) continue;
        if (typeof v !== "string" || v.length > 8e3) continue;
        clean[k] = v;
      }
      const size = JSON.stringify(clean).length;
      if (size > MAX_SAVE || !Object.keys(clean).length) return json({ error: "sauvegarde vide ou trop grande" }, 400);
      if (limited(request, "save", 10, 6e4)) return json({ error: "trop de demandes" }, 429);
      if (!await bumpDay(store, "save")) return json({ error: "plafond du jour" }, 503);
      await store.setJSON("progress/" + code + ".json", { data: clean, updated: today() });
      return json({ ok: true });
    }
    if (action === "forget") {
      const code = String(b.code || "").toLowerCase();
      if (!CODE.test(code)) return json({ error: "code invalide" }, 400);
      await store.delete("progress/" + code + ".json");
      return json({ ok: true });
    }
    if (action === "report") {
      const page = cleanText(b.page, 120);
      const text = cleanText(b.text, 500);
      if (!/^\/[a-z0-9\-\/]{0,100}$/i.test(page) || text.length < 10) return json({ error: "signalement invalide" }, 400);
      if (hasPersonalOrSpam(text)) return json({ error: "Merci de ne pas inclure de lien, d'adresse e-mail ni de num\xE9ro." }, 422);
      if (limited(request, "report", 3, 36e5)) return json({ error: "trop de demandes" }, 429);
      if (!await bumpDay(store, "report")) return json({ error: "plafond du jour" }, 503);
      const key = "reports/pending/" + (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-") + "-" + newCode().slice(0, 6) + ".json";
      await store.setJSON(key, { page, text, at: (/* @__PURE__ */ new Date()).toISOString(), status: "a-relire" });
      return json({ ok: true });
    }
    return json({ error: "action inconnue" }, 400);
  } catch (e) {
    return json({ error: "service indisponible" }, 503);
  }
}
export {
  onRequest
};
