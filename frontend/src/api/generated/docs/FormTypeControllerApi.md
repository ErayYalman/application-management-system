# FormTypeControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**activate**](#activate) | **PATCH** /api/v1/form-types/{formTypeId}/activate | |
|[**create**](#create) | **POST** /api/v1/form-types | |
|[**deactivate**](#deactivate) | **PATCH** /api/v1/form-types/{formTypeId}/deactivate | |
|[**getAll**](#getall) | **GET** /api/v1/form-types | |
|[**getById**](#getbyid) | **GET** /api/v1/form-types/{formTypeId} | |
|[**update**](#update) | **PUT** /api/v1/form-types/{formTypeId} | |

# **activate**
> activate()


### Example

```typescript
import {
    FormTypeControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FormTypeControllerApi(configuration);

let formTypeId: string; // (default to undefined)

const { status, data } = await apiInstance.activate(
    formTypeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **formTypeId** | [**string**] |  | defaults to undefined|


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
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **create**
> FormTypeResponse create(createFormTypeRequest)


### Example

```typescript
import {
    FormTypeControllerApi,
    Configuration,
    CreateFormTypeRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new FormTypeControllerApi(configuration);

let createFormTypeRequest: CreateFormTypeRequest; //

const { status, data } = await apiInstance.create(
    createFormTypeRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createFormTypeRequest** | **CreateFormTypeRequest**|  | |


### Return type

**FormTypeResponse**

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

# **deactivate**
> deactivate()


### Example

```typescript
import {
    FormTypeControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FormTypeControllerApi(configuration);

let formTypeId: string; // (default to undefined)

const { status, data } = await apiInstance.deactivate(
    formTypeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **formTypeId** | [**string**] |  | defaults to undefined|


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
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAll**
> Array<FormTypeResponse> getAll()


### Example

```typescript
import {
    FormTypeControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FormTypeControllerApi(configuration);

const { status, data } = await apiInstance.getAll();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<FormTypeResponse>**

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

# **getById**
> FormTypeResponse getById()


### Example

```typescript
import {
    FormTypeControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FormTypeControllerApi(configuration);

let formTypeId: string; // (default to undefined)

const { status, data } = await apiInstance.getById(
    formTypeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **formTypeId** | [**string**] |  | defaults to undefined|


### Return type

**FormTypeResponse**

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

# **update**
> FormTypeResponse update(updateFormTypeRequest)


### Example

```typescript
import {
    FormTypeControllerApi,
    Configuration,
    UpdateFormTypeRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new FormTypeControllerApi(configuration);

let formTypeId: string; // (default to undefined)
let updateFormTypeRequest: UpdateFormTypeRequest; //

const { status, data } = await apiInstance.update(
    formTypeId,
    updateFormTypeRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateFormTypeRequest** | **UpdateFormTypeRequest**|  | |
| **formTypeId** | [**string**] |  | defaults to undefined|


### Return type

**FormTypeResponse**

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

