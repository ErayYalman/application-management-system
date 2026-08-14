# ApplicationReportResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**startDate** | **string** |  | [optional] [default to undefined]
**endDate** | **string** |  | [optional] [default to undefined]
**totalApplications** | **number** |  | [optional] [default to undefined]
**newApplications** | **number** |  | [optional] [default to undefined]
**inReviewApplications** | **number** |  | [optional] [default to undefined]
**approvedApplications** | **number** |  | [optional] [default to undefined]
**rejectedApplications** | **number** |  | [optional] [default to undefined]
**cancelledApplications** | **number** |  | [optional] [default to undefined]
**applicationsByFormType** | [**Array&lt;ApplicationFormTypeReport&gt;**](ApplicationFormTypeReport.md) |  | [optional] [default to undefined]

## Example

```typescript
import { ApplicationReportResponse } from './api';

const instance: ApplicationReportResponse = {
    startDate,
    endDate,
    totalApplications,
    newApplications,
    inReviewApplications,
    approvedApplications,
    rejectedApplications,
    cancelledApplications,
    applicationsByFormType,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
