import axios from "axios";
import {CreateDataPointRequest, DataPointDto, DataPointValueType, TimeSeriesClient, TimeSeriesError} from "../../types";
import {createTimeSeriesClient} from "../timeSeriesClient";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>

const fakeEndpoint = "https://foo.bar/api/v1";

describe("TimeSeriesClient", () => {
  let client: TimeSeriesClient;
  let request: CreateDataPointRequest;
  let expectedResult: DataPointDto;
  beforeEach(() => {
    client = createTimeSeriesClient({endpoint: fakeEndpoint});
    const now = new Date();

    request = {
      locator: {
        namespace: "myapp.com/foo",
        entityType: "SomeType",
        entityId: "12345",
      },
      measuredAt: now,
      dataPointValueType: DataPointValueType.Numeric,
      numericValue: 42.3,
    };

    expectedResult = {
      ...request,
      recordId: "abc-xyz-pdq",
      createdAt: new Date(now.getTime() + 5000),
    };

  });

  describe("createDataPoint", () => {
    it("should return a new DataPointDto when successful", async () => {
      mockedAxios.post.mockResolvedValueOnce({data: expectedResult, status: 201});

      const result = await client.createDataPoint(request);

      expect(mockedAxios.post).toHaveBeenCalledWith(`${fakeEndpoint}/datapoints/search`, request, expect.anything());
      expect(result).toEqual(expectedResult);
    });

    it("should throw an exception when the server indicates an improper request (HTTP 400)", async () => {
      const status = 400;
      const statusText = "Improperly formed request";
      mockedAxios.post.mockResolvedValueOnce({data: expectedResult, status, statusText});

      await expect(() => client.createDataPoint(request)).rejects.toThrowError(expect.objectContaining<Partial<TimeSeriesError>>({
        name: "TimeSeriesError",
        statusCode: status,
        message: `Create DataPoint Request failed: ${statusText}`,
      }))
    })
  })
})
