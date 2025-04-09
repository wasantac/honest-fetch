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
async function safeGet(props) {
  return safeFetch(props, "GET");
}
async function safePost(props) {
  return safeFetch(props, "POST");
}
async function safePut(props) {
  return safeFetch(props, "PUT");
}
async function safePatch(props) {
  return safeFetch(props, "PATCH");
}
async function safeDelete(props) {
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
  safeDelete,
  safeFetch,
  safeGet,
  safePatch,
  safePost,
  safePromise,
  safePut
};
