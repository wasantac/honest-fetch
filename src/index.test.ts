import { afterEach, describe, expect, it, vi } from "vitest";

import { safeFetch, safePromise } from "./index";

globalThis.fetch = vi.fn();
type Response = { message: string };

describe("safeFetch", () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	it("should return data correctly if the response is successful", async () => {
		const mockData = { message: "all good" };

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		(fetch as any).mockResolvedValueOnce({
			ok: true,
			status: 200,
			json: async () => mockData,
		});

		const result = await safeFetch<Response, Response>(
			{ url: "https://api.fake.com" },
			"GET",
		);

		expect(result.data).toEqual(mockData);
		expect(result.error).toBeNull();
	});

	it("should return error if the response fails", async () => {
		const mockError = { message: "not found" };

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		(fetch as any).mockResolvedValueOnce({
			ok: false,
			status: 404,
			json: async () => mockError,
		});

		const result = await safeFetch<null, { message: string }>(
			{ url: "https://api.fake.com/404" },
			"GET",
		);

		expect(result.data).toBeNull();
		expect(result.error).toEqual(mockError);
	});

	it("should return a generic exception if an exception occurs", async () => {
		const mockException = new Error("boom");
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		(fetch as any).mockRejectedValueOnce(new Error("boom"));

		const result = await safeFetch<Response, { message: string } | Error>(
			{ url: "https://api.fake.com" },
			"GET",
		);

		expect(result.data).toBeNull();
		expect(result.error).toBeNull();
		expect(result.exception).toEqual(mockException);
	});
});
describe("safePromise", () => {
	it("should return data correctly if the promise resolves", async () => {
		const mockData = { message: "success" };
		const mockPromise = Promise.resolve(mockData);

		const result = await safePromise<typeof mockData, Error>(mockPromise);

		expect(result.data).toEqual(mockData);
		expect(result.error).toBeNull();
	});

	it("should return error if the promise rejects", async () => {
		const mockError = new Error("failure");
		const mockPromise = Promise.reject(mockError);

		const result = await safePromise<null, Error>(mockPromise);

		expect(result.data).toBeNull();
		expect(result.error).toEqual(mockError);
	});
});
