![WaterClick Logo](https://github.com/waterclick/waterclick/raw/main/external/timeseries/clients/javascript/docs/images/waterclick-logo.png)

# WaterClick TimeSeries API Client

Client library used by WaterClick partners to submit TimeSeries
data into WaterClick's TimeSeries database service.

## Installation

For yarn:
```shell
yarn add @waterclick/timeseries-client
```

For npm:
```shell
npm install @waterclick/timeseries-client --save
```

## Usage

```typescript
import { createTimeSeriesClient } from "@waterclick/timeseries-client";

var client = createTimeSeriesClient({endpoint: "https://foo.bar/api/v1"});

const newDataPoint = await client.createDataPoint({
  locator: {
    namespace: "myapp.com/foo",
    entityType: "SomeType",
    entityId: "12345",
  },
  measuredAt: new Date(),
  dataPointValueType: DataPointValueType.Numeric,
  numericValue: 42.3,
});
```
