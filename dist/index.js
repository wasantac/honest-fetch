"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeFetch = safeFetch;
exports.get = get;
exports.post = post;
exports.put = put;
exports.patch = patch;
exports.del = del;
exports.safePromise = safePromise;
/**
 * Performs a safe HTTP fetch request and returns a structured result.
 *
 * @template T - The expected type of the successful response data.
 * @template E - The expected type of the error response data.
 * @param {APIProps} apiProps - The properties for the API request, including URL, headers, and body.
 * @param {HTTPMethod} method - The HTTP method to use for the request (e.g., 'GET', 'POST').
 * @returns {Promise<APIResult<T, E>>} A promise that resolves to an object containing either the data, an error, or an exception.
 *
 * Default Header: "Content-Type": "application/json"
 *
 * The returned object has the following structure:
 * - `data`: The parsed response data if the request is successful.
 * - `error`: The parsed error response data if the request fails with a non-2xx status code.
 * - `exception`: An exception object if an error occurs during the fetch process.
 *
 * Example usage:
 * ```typescript
 * const result = await safeFetch<MyDataType, MyErrorType>(
 *   { url: 'https://api.example.com', headers: { 'Authorization': 'Bearer token' } },
 *   'GET'
 * );
 *
 * if (result.data) {
 *   console.log('Success:', result.data);
 * } else if (result.error) {
 *   console.error('API Error:', result.error);
 * } else if (result.exception) {
 *   console.error('Exception:', result.exception);
 * }
 * ```
 */
async function safeFetch(apiProps, method) {
    const { url, headers, body, ...rest } = apiProps;
    try {
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
            ...rest,
        });
        const result = await response.json();
        if (!response.ok) {
            return {
                data: null,
                error: result,
                exception: null,
            };
        }
        return {
            data: result,
            error: null,
            exception: null,
        };
    }
    catch (error) {
        const normalizedException = error instanceof Error ? error : new Error(String(error));
        return {
            data: null,
            error: null,
            exception: normalizedException,
        };
    }
}
/**
 * Makes a GET request to the specified API endpoint and returns the result.
 *
 * @template T - The expected type of the successful response data.
 * @template E - The expected type of the error response data.
 * @param {APIProps} props - The properties required to configure the API request.
 * @returns {Promise<APIResult<T, E>>} A promise that resolves to the result of the API call,
 * including either the response data or an error.
 */
async function get(props) {
    return safeFetch(props, "GET");
}
/**
 * Makes a POST request to the specified API endpoint and returns the result.
 *
 * @template T - The expected type of the successful response data.
 * @template E - The expected type of the error response data.
 * @param {APIProps} props - The properties required to configure the API request.
 * @returns {Promise<APIResult<T, E>>} A promise that resolves to the result of the API call,
 * including either the response data or an error.
 */
async function post(props) {
    return safeFetch(props, "POST");
}
/**
 * Makes a PUT request to the specified API endpoint and returns the result.
 *
 * @template T - The expected type of the successful response data.
 * @template E - The expected type of the error response data.
 * @param {APIProps} props - The properties required to configure the API request.
 * @returns {Promise<APIResult<T, E>>} A promise that resolves to the result of the API call,
 * including either the response data or an error.
 */
async function put(props) {
    return safeFetch(props, "PUT");
}
/**
 * Makes a PATCH request to the specified API endpoint and returns the result.
 *
 * @template T - The expected type of the successful response data.
 * @template E - The expected type of the error response data.
 * @param {APIProps} props - The properties required to configure the API request.
 * @returns {Promise<APIResult<T, E>>} A promise that resolves to the result of the API call,
 * including either the response data or an error.
 */
async function patch(props) {
    return safeFetch(props, "PATCH");
}
/**
 * Makes a DELETE request to the specified API endpoint and returns the result.
 *
 * @template T - The expected type of the successful response data.
 * @template E - The expected type of the error response data.
 * @param {APIProps} props - The properties required to configure the API request.
 * @returns {Promise<APIResult<T, E>>} A promise that resolves to the result of the API call,
 * including either the response data or an error.
 */
async function del(props) {
    return safeFetch(props, "DELETE");
}
/**
 * Wraps a promise to provide a safe way of handling its resolution or rejection.
 * Returns an object containing either the resolved data or the error.
 *
 * @template T - The type of the resolved value of the promise.
 * @template E - The type of the error in case the promise is rejected.
 *
 * @param promise - The promise to be handled safely.
 * @returns A promise that resolves to an object containing either the `data` (resolved value)
 * or the `error` (rejection reason).
 */
async function safePromise(promise) {
    try {
        const result = await promise;
        return { data: result, error: null };
    }
    catch (error) {
        return { data: null, error: error };
    }
}
