import {CreateDataPointRequest, DataPointDto, TimeSeriesOptions, TimeSeriesClient, TimeSeriesError} from "../types";
import https from "https";
import {isProdMode} from "./util";
import axios, {AxiosRequestConfig} from "axios";

export const createTimeSeriesClient = (options: TimeSeriesOptions): TimeSeriesClient => {
  return new TimeSeriesClientImpl(options);
}

class TimeSeriesClientImpl implements TimeSeriesClient {
  private readonly httpsAgent: https.Agent;

  constructor(private readonly options: TimeSeriesOptions) {
    this.httpsAgent = new https.Agent({
      rejectUnauthorized: isProdMode(), // (NOTE: this will disable client verification in development or test)
    });
  }

  public async createDataPoint(createRequest: CreateDataPointRequest): Promise<DataPointDto> {
    const serviceURI = "/datapoints/search";
    const url = `${this.options.endpoint}${serviceURI}`;

    const {
      data,
      status,
      statusText,
    } = await axios.post<DataPointDto>(url, createRequest,
      this.axiosConfig<CreateDataPointRequest>());

    if (status !== 201) {
      throw new TimeSeriesError(status, `Create DataPoint Request failed: ${statusText}`);
    }
    
    return data;
  }

  private axiosConfig<ReqPayloadT = any>(): AxiosRequestConfig<ReqPayloadT> {
    return {
      httpsAgent: this.httpsAgent,
      validateStatus: (status) => status < 500, // for anything 500 or higher, Axios throws, we'll handle the rest
    };
  }
}
