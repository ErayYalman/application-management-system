# DashboardControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getDashboard**](#getdashboard) | **GET** /api/v1/dashboard | |

# **getDashboard**
> DashboardResponse getDashboard()


### Example

```typescript
import {
    DashboardControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DashboardControllerApi(configuration);

const { status, data } = await apiInstance.getDashboard();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**DashboardResponse**

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

