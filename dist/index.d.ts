export type Success<T> = {
    data: T;
    error: null;
};
export type Failure<E> = {
    data: null;
    error: E;
};
export type APIResult<T, E> = Success<T> | Failure<E>;
export interface APIProps {
    url: string;
    headers?: HeadersInit;
    body?: BodyInit;
}
export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export declare function safeFetch<T, E>({ url, headers, body }: APIProps, method: HTTPMethod): Promise<APIResult<T, E>>;
