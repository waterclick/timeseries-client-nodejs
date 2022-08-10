
export type TimeSeriesOptions = {
  // A URL pointing to the base of the TimeSeries API, with no trailing slash.
  // For example:  https://api.waterclick.tech/timeseries/v1
  endpoint: string;
};

export enum DataPointValueType {
  Text = "Text",
  Numeric = "Numeric",
  Boolean = "Boolean",
  Date = "Date",
  Time = "Time",
  DateTime = "DateTime",
  Json = "Json",
}

export type LocalDate = {
  IS_LOCAL_DATE: true;
  year: number;
  month: number;
  day: number;
  toString: () => string;
}

export const isLocalDate = (o: any): o is LocalDate => o.IS_LOCAL_DATE !== undefined && o.IS_LOCAL_DATE;

export type LocalTime = {
  IS_LOCAL_TIME: true;
  hour: number;
  minute: number;
  second: number;
  millisecond?: number | null;
  toString: () => string;
}

export const isLocalTime = (o: any): o is LocalDate => o.IS_LOCAL_TIME !== undefined && o.IS_LOCAL_TIME;

export type LocatorDto = {
  namespace: string;
  entityType: string;
  entityId: string;
};

export type LocatorDtoWithOptionalEntityId = Omit<LocatorDto, "entityId"> & {
  entityId?: string | null;
};

type BaseDataPointDto = {
  locator: LocatorDto;
  measuredAt: Date;
  dataPointValueType: DataPointValueType;
  jsonValue?: any;
  numericValue?: number;
  textValue?: string;
  booleanValue?: boolean;
  dateValue?: LocalDate;
  timeValue?: LocalTime;
  dateTimeValue?: Date;
  tags?: string[];
};

export type CreateDataPointRequest = BaseDataPointDto;

export type DataPointDto = BaseDataPointDto & {
  recordId: string;
  createdAt: Date;
};

export class TimeSeriesError extends Error {
  constructor(public readonly statusCode: number, message: string) {
    super(message);
    this.name = TimeSeriesError.name;
    
    // See https://github.com/Microsoft/TypeScript-wiki/blob/main/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, TimeSeriesError.prototype);
  }
}

export interface TimeSeriesClient {
  createDataPoint(createRequest: CreateDataPointRequest): Promise<DataPointDto>;
}
