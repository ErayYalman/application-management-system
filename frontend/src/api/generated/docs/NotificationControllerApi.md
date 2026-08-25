# NotificationControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**delete1**](#delete1) | **DELETE** /api/v1/notifications/{notificationId} | |
|[**deleteAll**](#deleteall) | **DELETE** /api/v1/notifications | |
|[**getMyNotifications**](#getmynotifications) | **GET** /api/v1/notifications | |
|[**getUnreadCount**](#getunreadcount) | **GET** /api/v1/notifications/unread-count | |
|[**markAllAsRead**](#markallasread) | **PATCH** /api/v1/notifications/read-all | |
|[**markAsRead**](#markasread) | **PATCH** /api/v1/notifications/{notificationId}/read | |
|[**subscribeToNotifications**](#subscribetonotifications) | **GET** /api/v1/notifications/stream | |

# **delete1**
> delete1()


### Example

```typescript
import {
    NotificationControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationControllerApi(configuration);

let notificationId: string; // (default to undefined)

const { status, data } = await apiInstance.delete1(
    notificationId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **notificationId** | [**string**] |  | defaults to undefined|


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

# **deleteAll**
> deleteAll()


### Example

```typescript
import {
    NotificationControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationControllerApi(configuration);

const { status, data } = await apiInstance.deleteAll();
```

### Parameters
This endpoint does not have any parameters.


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

# **getMyNotifications**
> Array<NotificationResponse> getMyNotifications()


### Example

```typescript
import {
    NotificationControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationControllerApi(configuration);

const { status, data } = await apiInstance.getMyNotifications();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<NotificationResponse>**

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

# **getUnreadCount**
> number getUnreadCount()


### Example

```typescript
import {
    NotificationControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationControllerApi(configuration);

const { status, data } = await apiInstance.getUnreadCount();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**number**

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

# **markAllAsRead**
> markAllAsRead()


### Example

```typescript
import {
    NotificationControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationControllerApi(configuration);

const { status, data } = await apiInstance.markAllAsRead();
```

### Parameters
This endpoint does not have any parameters.


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

# **markAsRead**
> markAsRead()


### Example

```typescript
import {
    NotificationControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationControllerApi(configuration);

let notificationId: string; // (default to undefined)

const { status, data } = await apiInstance.markAsRead(
    notificationId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **notificationId** | [**string**] |  | defaults to undefined|


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

# **subscribeToNotifications**
> SseEmitter subscribeToNotifications()


### Example

```typescript
import {
    NotificationControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationControllerApi(configuration);

const { status, data } = await apiInstance.subscribeToNotifications();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**SseEmitter**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/event-stream


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

