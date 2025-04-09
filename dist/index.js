"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeFetch = safeFetch;
async function safeFetch({ url, headers, body }, method) {
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
                error: result,
            };
        }
        return {
            data: result,
            error: null,
        };
    }
    catch (error) {
        return {
            data: null,
            error: error,
        };
    }
}
