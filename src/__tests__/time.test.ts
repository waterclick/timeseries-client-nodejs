import {createLocalDate, createLocalTime} from "../time";
import Timezone from "timezone-enum";

describe("Time utils", () => {
  describe("LocalDate", () => {
    describe("createLocalDate", () => {
      it("should create an object with a functional toString", () => {
        const d = createLocalDate(new Date(), Timezone["America/New_York"]);
        expect(d.toString).toBeDefined();
      });

      it("should return the proper date", () => {
        const now = new Date("2022-05-01T00:00:00.0000Z");
        const d = createLocalDate(now, Timezone["America/New_York"]);

        // Back one day due to new york being back 4 hours at the given time of year
        expect(d.year).toEqual(2022);
        expect(d.month).toEqual(4);
        expect(d.day).toEqual(30);
      });
    });
    
    it("should format the proper date in toString()", () => {
      const now = new Date("2022-05-01T00:00:00.0000Z");
      const d = createLocalDate(now, Timezone["America/New_York"]);

      // Back one day due to new york being back 4 hours at the given time of year
      expect(d.toString()).toMatch("2022-04-30");
    });
  });

  describe("LocalTime", () => {
    describe("createLocalTime", () => {
      it("should create an object with a functional toString", () => {
        const d = createLocalTime(new Date(), Timezone["America/New_York"]);
        expect(d.toString).toBeDefined();
      });

      it("should return the proper time", () => {
        const now = new Date("2022-05-01T00:00:00.0000Z");
        const d = createLocalTime(now, Timezone["America/New_York"]);

        // Back 4 hours based on offset for tz and time of year
        expect(d.hour).toEqual(20);
        expect(d.minute).toEqual(0);
        expect(d.second).toEqual(0);
        expect(d.millisecond).toEqual(0);
      });
    });

    it("should format the proper time in toString()", () => {
      const now = new Date("2022-05-01T00:00:00.0000Z");
      const d = createLocalTime(now, Timezone["America/New_York"]);

      // Back 4 hours based on offset for tz and time of year
      expect(d.toString()).toMatch("20:00:00.000");
    });
  });
});
