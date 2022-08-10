import {isDevMode, isProdMode} from "../util";

describe("util", () => {
  describe("isDevMode", () => {
    it("should be true if the current NODE_ENV is 'development'", () => {
      expect(isDevMode("development")).toBe(true);
    });
    it("should be true if the current NODE_ENV is 'test'", () => {
      expect(isDevMode("test")).toBe(true);
    });
    it("should be true if the current NODE_ENV is 'Development'", () => {
      expect(isDevMode("Development")).toBe(true);
    });
    it("should be false if the current NODE_ENV is 'production'", () => {
      expect(isDevMode("production")).toBe(false);  
    });
    it("should be false if the current NODE_ENV is 'Prod'", () => {
      expect(isDevMode("Prod")).toBe(false);
    });
  });

  describe("isProdMode", () => {
    it("should be false if the current NODE_ENV is 'development'", () => {
      expect(isProdMode("development")).toBe(false);
    });
    it("should be false if the current NODE_ENV is 'test'", () => {
      expect(isProdMode("test")).toBe(false);
    });
    it("should be false if the current NODE_ENV is 'Development'", () => {
      expect(isProdMode("Development")).toBe(false);
    });
    it("should be true if the current NODE_ENV is 'production'", () => {
      expect(isProdMode("production")).toBe(true);
    });
    it("should be true if the current NODE_ENV is 'Prod'", () => {
      expect(isProdMode("Prod")).toBe(true);
    });
  });
});
