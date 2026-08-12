package com.cybersoft.application_management.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cybersoft.application_management.dto.request.ApplicationReportRequest;
import com.cybersoft.application_management.dto.response.ApplicationReportResponse;
import com.cybersoft.application_management.service.ApplicationReportService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/reports")
@RequiredArgsConstructor
public class ApplicationReportController {

    private final ApplicationReportService applicationReportService;

    @GetMapping("/applications")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApplicationReportResponse> getApplicationReport(
            ApplicationReportRequest request) {
                
        return ResponseEntity.ok(
                applicationReportService.getApplicationReport(
                        request));
    }

}
