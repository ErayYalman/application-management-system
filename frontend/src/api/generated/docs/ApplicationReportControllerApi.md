# ApplicationReportControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getApplicationReport**](#getapplicationreport) | **GET** /api/v1/reports/applications | |

# **getApplicationReport**
> ApplicationReportResponse getApplicationReport()


### Example

```typescript
import {
    ApplicationReportControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ApplicationReportControllerApi(configuration);

let startDate: string; // (optional) (default to undefined)
let endDate: string; // (optional) (default to undefined)
let status: 'NEW' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED' | 'CANCELLED'; // (optional) (default to undefined)
let formTypeId: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.getApplicationReport(
    startDate,
    endDate,
    status,
    formTypeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **startDate** | [**string**] |  | (optional) defaults to undefined|
| **endDate** | [**string**] |  | (optional) defaults to undefined|
| **status** | [**&#39;NEW&#39; | &#39;IN_REVIEW&#39; | &#39;APPROVED&#39; | &#39;REJECTED&#39; | &#39;CANCELLED&#39;**]**Array<&#39;NEW&#39; &#124; &#39;IN_REVIEW&#39; &#124; &#39;APPROVED&#39; &#124; &#39;REJECTED&#39; &#124; &#39;CANCELLED&#39;>** |  | (optional) defaults to undefined|
| **formTypeId** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ApplicationReportResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

