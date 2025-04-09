"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const index_1 = require("./index");
globalThis.fetch = vitest_1.vi.fn();
(0, vitest_1.describe)("safeFetch", () => {
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.resetAllMocks();
    });
    (0, vitest_1.it)("should return data correctly if the response is successful", async () => {
        const mockData = { message: "all good" };
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        fetch.mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => mockData,
        });
        const result = await (0, index_1.safeFetch)({ url: "https://api.fake.com" }, "GET");
        (0, vitest_1.expect)(result.data).toEqual(mockData);
        (0, vitest_1.expect)(result.error).toBeNull();
    });
    (0, vitest_1.it)("should return error if the response fails", async () => {
        const mockError = { message: "not found" };
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 404,
            json: async () => mockError,
        });
        const result = await (0, index_1.safeFetch)({ url: "https://api.fake.com/404" }, "GET");
        (0, vitest_1.expect)(result.data).toBeNull();
        (0, vitest_1.expect)(result.error).toEqual(mockError);
    });
    (0, vitest_1.it)("should return a generic exception if an exception occurs", async () => {
        const mockException = new Error("boom");
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        fetch.mockRejectedValueOnce(new Error("boom"));
        const result = await (0, index_1.safeFetch)({ url: "https://api.fake.com" }, "GET");
        (0, vitest_1.expect)(result.data).toBeNull();
        (0, vitest_1.expect)(result.error).toBeNull();
        (0, vitest_1.expect)(result.exception).toEqual(mockException);
    });
});
(0, vitest_1.describe)("safePromise", () => {
    (0, vitest_1.it)("should return data correctly if the promise resolves", async () => {
        const mockData = { message: "success" };
        const mockPromise = Promise.resolve(mockData);
        const result = await (0, index_1.safePromise)(mockPromise);
        (0, vitest_1.expect)(result.data).toEqual(mockData);
        (0, vitest_1.expect)(result.error).toBeNull();
    });
    (0, vitest_1.it)("should return error if the promise rejects", async () => {
        const mockError = new Error("failure");
        const mockPromise = Promise.reject(mockError);
        const result = await (0, index_1.safePromise)(mockPromise);
        (0, vitest_1.expect)(result.data).toBeNull();
        (0, vitest_1.expect)(result.error).toEqual(mockError);
    });
});
