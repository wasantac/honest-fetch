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

export async function safeFetch<T, E>(
	{ url, headers, body }: APIProps,
	method: HTTPMethod,
): Promise<APIResult<T, E | Error>> {
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

export async function get<T, E>(
	props: APIProps,
): Promise<APIResult<T, E | Error>> {
	return safeFetch<T, E>(props, "GET");
}
export async function post<T, E>(
	props: APIProps,
): Promise<APIResult<T, E | Error>> {
	return safeFetch<T, E>(props, "POST");
}
export async function put<T, E>(
	props: APIProps,
): Promise<APIResult<T, E | Error>> {
	return safeFetch<T, E>(props, "PUT");
}
export async function patch<T, E>(
	props: APIProps,
): Promise<APIResult<T, E | Error>> {
	return safeFetch<T, E>(props, "PATCH");
}
export async function del<T, E>(
	props: APIProps,
): Promise<APIResult<T, E | Error>> {
	return safeFetch<T, E>(props, "DELETE");
}

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
