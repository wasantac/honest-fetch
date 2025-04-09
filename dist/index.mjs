// src/index.ts
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
export {
  del,
  get,
  patch,
  post,
  put,
  safeFetch,
  safePromise
};
