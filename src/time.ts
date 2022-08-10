import {LocalDate, LocalTime} from "./types";
import Timezone from "timezone-enum";
import {DateTime} from "luxon";

const padTime = (timeUnit: number, digits: number = 2): string => String(timeUnit).padStart(digits, "0");

function localDateToString(this: LocalDate) {
  return `${this.year}-${padTime(this.month)}-${padTime(this.day)}`;
}

function localTimeToString(this: LocalTime) {
  return `${padTime(this.hour)}:${padTime(this.minute)}:${padTime(this.second)}.${padTime(this.millisecond ?? 0, 3)}`;
}


const getInputDateTime = (d: Date | string, timeZone?: Timezone): DateTime => {
  let dt: DateTime;
  if (typeof d == "string") {
    dt = DateTime.fromISO(d);
  } else {
    dt = DateTime.fromJSDate(d, {zone: timeZone});
  }

  return dt;
};

export function createLocalDate(d: Date, timeZone: Timezone): LocalDate;
export function createLocalDate(iso8601String: string): LocalDate;
export function createLocalDate(d: Date | string, timeZone?: Timezone): LocalDate {
  const {year, month, day} = getInputDateTime(d, timeZone);

  return {
    year,
    month,
    day,
    IS_LOCAL_DATE: true,
    toString: localDateToString,
  }
}

export function createLocalTime(d: Date, timeZone: Timezone): LocalTime;
export function createLocalTime(iso8601String: string): LocalTime;
export function createLocalTime(d: Date | string, timeZone?: Timezone): LocalTime {
  const {
    hour,
    minute,
    second,
    millisecond,
  } = getInputDateTime(d, timeZone);

  return {
    hour,
    minute,
    second,
    millisecond,
    IS_LOCAL_TIME: true,
    toString: localTimeToString,
  }
}
