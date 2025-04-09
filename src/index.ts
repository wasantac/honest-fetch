export type Success<T> = {
	data: T;
	error: null;
	exception: null;
};

export type Failure<E> = {
	data: null;
	error: E;
	exception: null;
};

export type Exception = {
	data: null;
	error: null;
	exception: Error;
};

export type APIResult<T, E> = Success<T> | Failure<E> | Exception;

export type SuccessPromise<T> = {
	data: T;
	error: null;
};

export type FailurePromise<E> = {
	data: null;
	error: E;
};

export type PromiseResult<T, E = Error> = SuccessPromise<T> | FailurePromise<E>;

export interface APIProps {
	url: string;
	headers?: HeadersInit;
	body?: BodyInit;
}

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

/**
 * Performs a safe HTTP fetch request and returns a structured result.
 *
 * @template T - The expected type of the successful response data.
 * @template E - The expected type of the error response data.
 * @param {APIProps} apiProps - The properties for the API request, including URL, headers, and body.
 * @param {HTTPMethod} method - The HTTP method to use for the request (e.g., 'GET', 'POST').
 * @returns {Promise<APIResult<T, E>>} A promise that resolves to an object containing either the data, an error, or an exception.
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
export async function safeFetch<T, E>(
	apiProps: APIProps,
	method: HTTPMethod,
): Promise<APIResult<T, E>> {
	const { url, headers, body } = apiProps;
	try {
		const response = await fetch(url, {
			method,
			headers: {
				...headers,
			},
			body: body ? body : undefined,
		});

		const result = await response.json();

		if (!response.ok) {
			return {
				data: null,
				error: result as E,
				exception: null,
			};
		}

		return {
			data: result as T,
			error: null,
			exception: null,
		};
	} catch (error) {
		const normalizedException =
			error instanceof Error ? error : new Error(String(error));
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
export async function get<T, E>(props: APIProps): Promise<APIResult<T, E>> {
	return safeFetch<T, E>(props, "GET");
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
export async function post<T, E>(props: APIProps): Promise<APIResult<T, E>> {
	return safeFetch<T, E>(props, "POST");
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
export async function put<T, E>(props: APIProps): Promise<APIResult<T, E>> {
	return safeFetch<T, E>(props, "PUT");
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
export async function patch<T, E>(props: APIProps): Promise<APIResult<T, E>> {
	return safeFetch<T, E>(props, "PATCH");
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
export async function del<T, E>(props: APIProps): Promise<APIResult<T, E>> {
	return safeFetch<T, E>(props, "DELETE");
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
export async function safePromise<T, E>(
	promise: Promise<T>,
): Promise<PromiseResult<T, E>> {
	try {
		const result = await promise;
		return { data: result, error: null };
	} catch (error) {
		return { data: null, error: error as E };
	}
}
