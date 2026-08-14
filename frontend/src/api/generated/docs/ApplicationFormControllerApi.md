# ApplicationFormControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**_delete**](#_delete) | **DELETE** /api/v1/applications/{applicationId} | |
|[**approve**](#approve) | **PATCH** /api/v1/applications/{applicationId}/approve | |
|[**cancel**](#cancel) | **PATCH** /api/v1/applications/{applicationId}/cancel | |
|[**create1**](#create1) | **POST** /api/v1/applications/create | |
|[**getAllApplications**](#getallapplications) | **GET** /api/v1/applications/all | |
|[**getById1**](#getbyid1) | **GET** /api/v1/applications/{applicationId} | |
|[**getMyApplications**](#getmyapplications) | **GET** /api/v1/applications/my | |
|[**moveToReview**](#movetoreview) | **PATCH** /api/v1/applications/{applicationId}/review | |
|[**reject**](#reject) | **PATCH** /api/v1/applications/{applicationId}/reject | |
|[**update1**](#update1) | **PUT** /api/v1/applications/{applicationId} | |

# **_delete**
> _delete()


### Example

```typescript
import {
    ApplicationFormControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ApplicationFormControllerApi(configuration);

let applicationId: string; // (default to undefined)

const { status, data } = await apiInstance._delete(
    applicationId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **applicationId** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | No Content |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **approve**
> ApplicationResponse approve()


### Example

```typescript
import {
    ApplicationFormControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ApplicationFormControllerApi(configuration);

let applicationId: string; // (default to undefined)

const { status, data } = await apiInstance.approve(
    applicationId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **applicationId** | [**string**] |  | defaults to undefined|


### Return type

**ApplicationResponse**

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

# **cancel**
> ApplicationResponse cancel()


### Example

```typescript
import {
    ApplicationFormControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ApplicationFormControllerApi(configuration);

let applicationId: string; // (default to undefined)

const { status, data } = await apiInstance.cancel(
    applicationId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **applicationId** | [**string**] |  | defaults to undefined|


### Return type

**ApplicationResponse**

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

# **create1**
> ApplicationResponse create1(createApplicationFormRequest)


### Example

```typescript
import {
    ApplicationFormControllerApi,
    Configuration,
    CreateApplicationFormRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ApplicationFormControllerApi(configuration);

let createApplicationFormRequest: CreateApplicationFormRequest; //

const { status, data } = await apiInstance.create1(
    createApplicationFormRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createApplicationFormRequest** | **CreateApplicationFormRequest**|  | |


### Return type

**ApplicationResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAllApplications**
> PageApplicationResponse getAllApplications()


### Example

```typescript
import {
    ApplicationFormControllerApi,
    Configuration,
    ApplicationSearchRequest,
    Pageable
} from './api';

const configuration = new Configuration();
const apiInstance = new ApplicationFormControllerApi(configuration);

let request: ApplicationSearchRequest; // (default to undefined)
let pageable: Pageable; // (default to undefined)

const { status, data } = await apiInstance.getAllApplications(
    request,
    pageable
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ApplicationSearchRequest** |  | defaults to undefined|
| **pageable** | **Pageable** |  | defaults to undefined|


### Return type

**PageApplicationResponse**

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

# **getById1**
> ApplicationResponse getById1()


### Example

```typescript
import {
    ApplicationFormControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ApplicationFormControllerApi(configuration);

let applicationId: string; // (default to undefined)

const { status, data } = await apiInstance.getById1(
    applicationId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **applicationId** | [**string**] |  | defaults to undefined|


### Return type

**ApplicationResponse**

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

# **getMyApplications**
> PageApplicationResponse getMyApplications()


### Example

```typescript
import {
    ApplicationFormControllerApi,
    Configuration,
    ApplicationSearchRequest,
    Pageable
} from './api';

const configuration = new Configuration();
const apiInstance = new ApplicationFormControllerApi(configuration);

let request: ApplicationSearchRequest; // (default to undefined)
let pageable: Pageable; // (default to undefined)

const { status, data } = await apiInstance.getMyApplications(
    request,
    pageable
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **request** | **ApplicationSearchRequest** |  | defaults to undefined|
| **pageable** | **Pageable** |  | defaults to undefined|


### Return type

**PageApplicationResponse**

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

# **moveToReview**
> ApplicationResponse moveToReview()


### Example

```typescript
import {
    ApplicationFormControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ApplicationFormControllerApi(configuration);

let applicationId: string; // (default to undefined)

const { status, data } = await apiInstance.moveToReview(
    applicationId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **applicationId** | [**string**] |  | defaults to undefined|


### Return type

**ApplicationResponse**

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

# **reject**
> ApplicationResponse reject()


### Example

```typescript
import {
    ApplicationFormControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ApplicationFormControllerApi(configuration);

let applicationId: string; // (default to undefined)

const { status, data } = await apiInstance.reject(
    applicationId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **applicationId** | [**string**] |  | defaults to undefined|


### Return type

**ApplicationResponse**

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

# **update1**
> ApplicationResponse update1(updateApplicationRequest)


### Example

```typescript
import {
    ApplicationFormControllerApi,
    Configuration,
    UpdateApplicationRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ApplicationFormControllerApi(configuration);

let applicationId: string; // (default to undefined)
let updateApplicationRequest: UpdateApplicationRequest; //

const { status, data } = await apiInstance.update1(
    applicationId,
    updateApplicationRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateApplicationRequest** | **UpdateApplicationRequest**|  | |
| **applicationId** | [**string**] |  | defaults to undefined|


### Return type

**ApplicationResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

