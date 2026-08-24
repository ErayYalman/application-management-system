package com.cybersoft.application_management.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.cybersoft.application_management.dto.request.ApplicationSearchRequest;
import com.cybersoft.application_management.dto.request.CreateApplicationFormRequest;
import com.cybersoft.application_management.dto.request.UpdateApplicationRequest;
import com.cybersoft.application_management.dto.response.ApplicationAuditLogResponse;
import com.cybersoft.application_management.dto.response.ApplicationResponse;
import com.cybersoft.application_management.service.ApplicationFormService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/applications")
@RequiredArgsConstructor
public class ApplicationFormController {
        private final ApplicationFormService applicationFormService;

        @PostMapping("/create")
        @PreAuthorize("hasRole('PERSONNEL')")
        public ResponseEntity<ApplicationResponse> create(@Valid @RequestBody CreateApplicationFormRequest request) {
                ApplicationResponse response = applicationFormService.create(request);
                return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }

        @GetMapping("/my")
        @PreAuthorize("hasRole('PERSONNEL')")
        public ResponseEntity<Page<ApplicationResponse>> getMyApplications(ApplicationSearchRequest request,
                        @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
                return ResponseEntity.ok(applicationFormService.getMyApplications(request, pageable));

        }

        @GetMapping("/all")
        @PreAuthorize("hasRole('ADMIN')")
        public ResponseEntity<Page<ApplicationResponse>> getAllApplications(
                        ApplicationSearchRequest request,
                        @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {

                return ResponseEntity.ok(
                                applicationFormService.getAllApplications(
                                                request,
                                                pageable));
        }

        @GetMapping("/{applicationId}")
        @PreAuthorize("hasAnyRole('PERSONNEL', 'ADMIN')")
        public ResponseEntity<ApplicationResponse> getById(
                        @PathVariable UUID applicationId) {

                return ResponseEntity.ok(
                                applicationFormService.getById(applicationId));
        }

        @PutMapping("/{applicationId}")
        @PreAuthorize("hasRole('PERSONNEL')")
        public ResponseEntity<ApplicationResponse> update(
                        @PathVariable UUID applicationId,
                        @Valid @RequestBody UpdateApplicationRequest request) {

                return ResponseEntity.ok(
                                applicationFormService.updateApplicationForm(
                                                applicationId,
                                                request));
        }

        @DeleteMapping("/{applicationId}")
        @PreAuthorize("hasRole('PERSONNEL')")
        @ResponseStatus(HttpStatus.NO_CONTENT)
        public void delete(
                        @PathVariable UUID applicationId) {

                applicationFormService.deleteApplicationForm(
                                applicationId);
        }

        @PatchMapping("/{applicationId}/cancel")
        @PreAuthorize("hasRole('PERSONNEL')")
        public ResponseEntity<ApplicationResponse> cancel(
                        @PathVariable UUID applicationId) {

                return ResponseEntity.ok(
                                applicationFormService.cancelApplication(
                                                applicationId));
        }

        @PatchMapping("/{applicationId}/review")
        @PreAuthorize("hasRole('ADMIN')")
        public ResponseEntity<ApplicationResponse> moveToReview(
                        @PathVariable UUID applicationId) {

                return ResponseEntity.ok(
                                applicationFormService.moveToReview(
                                                applicationId));
        }

        @PatchMapping("/{applicationId}/approve")
        @PreAuthorize("hasRole('ADMIN')")
        public ResponseEntity<ApplicationResponse> approve(
                        @PathVariable UUID applicationId) {

                return ResponseEntity.ok(
                                applicationFormService.approveApplication(
                                                applicationId));
        }

        @PatchMapping("/{applicationId}/reject")
        @PreAuthorize("hasRole('ADMIN')")
        public ResponseEntity<ApplicationResponse> reject(
                        @PathVariable UUID applicationId) {

                return ResponseEntity.ok(
                                applicationFormService.rejectApplication(
                                                applicationId));
        }

        @GetMapping("/{applicationId}/history")
        @PreAuthorize("hasAnyRole('PERSONNEL', 'ADMIN')")
        public ResponseEntity<List<ApplicationAuditLogResponse>> getHistory(
                        @PathVariable UUID applicationId) {
                return ResponseEntity.ok(applicationFormService.getApplicationHistory(applicationId));
        }

}
