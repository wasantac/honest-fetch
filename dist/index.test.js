"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
(0, vitest_1.describe)("basic test", () => {
    (0, vitest_1.it)("should run", () => {
        (0, vitest_1.expect)(1 + 1).toBe(2);
    });
});
