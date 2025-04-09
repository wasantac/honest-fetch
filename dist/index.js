"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  del: () => del,
  get: () => get,
  patch: () => patch,
  post: () => post,
  put: () => put,
  safeFetch: () => safeFetch,
  safePromise: () => safePromise
});
module.exports = __toCommonJS(index_exports);
async function safeFetch(apiProps, method) {
  const { url, headers, body, ...rest } = apiProps;
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      body: body ? JSON.stringify(body) : void 0,
      ...rest
    });
    const result = await response.json();
    if (!response.ok) {
      return {
        data: null,
        error: result,
        exception: null
      };
    }
    return {
      data: result,
      error: null,
      exception: null
    };
  } catch (error) {
    const normalizedException = error instanceof Error ? error : new Error(String(error));
    return {
      data: null,
      error: null,
      exception: normalizedException
    };
  }
}
async function get(props) {
  return safeFetch(props, "GET");
}
async function post(props) {
  return safeFetch(props, "POST");
}
async function put(props) {
  return safeFetch(props, "PUT");
}
async function patch(props) {
  return safeFetch(props, "PATCH");
}
async function del(props) {
  return safeFetch(props, "DELETE");
}
async function safePromise(promise) {
  try {
    const result = await promise;
    return { data: result, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  del,
  get,
  patch,
  post,
  put,
  safeFetch,
  safePromise
});
