# AttachmentControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**delete1**](#delete1) | **DELETE** /api/v1/attachments/{attachmentId} | |
|[**download**](#download) | **GET** /api/v1/attachments/{attachmentId}/download | |
|[**getAttachments**](#getattachments) | **GET** /api/v1/attachments/applications/{applicationId} | |
|[**upload**](#upload) | **POST** /api/v1/attachments/applications/{applicationId} | |

# **delete1**
> delete1()


### Example

```typescript
import {
    AttachmentControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AttachmentControllerApi(configuration);

let attachmentId: string; // (default to undefined)

const { status, data } = await apiInstance.delete1(
    attachmentId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **attachmentId** | [**string**] |  | defaults to undefined|


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

# **download**
> File download()


### Example

```typescript
import {
    AttachmentControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AttachmentControllerApi(configuration);

let attachmentId: string; // (default to undefined)

const { status, data } = await apiInstance.download(
    attachmentId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **attachmentId** | [**string**] |  | defaults to undefined|


### Return type

**File**

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

# **getAttachments**
> Array<AttachmentResponse> getAttachments()


### Example

```typescript
import {
    AttachmentControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AttachmentControllerApi(configuration);

let applicationId: string; // (default to undefined)

const { status, data } = await apiInstance.getAttachments(
    applicationId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **applicationId** | [**string**] |  | defaults to undefined|


### Return type

**Array<AttachmentResponse>**

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

# **upload**
> AttachmentResponse upload()


### Example

```typescript
import {
    AttachmentControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AttachmentControllerApi(configuration);

let applicationId: string; // (default to undefined)
let file: File; // (default to undefined)

const { status, data } = await apiInstance.upload(
    applicationId,
    file
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **applicationId** | [**string**] |  | defaults to undefined|
| **file** | [**File**] |  | defaults to undefined|


### Return type

**AttachmentResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

