package com.cybersoft.application_management.dto.request;

import com.cybersoft.application_management.enums.ApplicationStatus;

import io.micrometer.common.lang.NonNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateApplicationStatusRequest { //admin request
    
    @NonNull
    private ApplicationStatus status;

}
