package com.cybersoft.application_management.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cybersoft.application_management.dto.request.CreateFormTypeRequest;
import com.cybersoft.application_management.dto.request.UpdateFormTypeRequest;
import com.cybersoft.application_management.dto.response.FormTypeResponse;
import com.cybersoft.application_management.service.FormTypeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/form-types")
@RequiredArgsConstructor
public class FormTypeController {

    private final FormTypeService formTypeService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'PERSONNEL')")
    public ResponseEntity<List<FormTypeResponse>> getAll() {

        return ResponseEntity.ok(
                formTypeService.getAll());
    }

    @GetMapping("/{formTypeId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'PERSONNEL')")
    public ResponseEntity<FormTypeResponse> getById(
            @PathVariable UUID formTypeId) {

        return ResponseEntity.ok(
                formTypeService.getById(formTypeId));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FormTypeResponse> create(
            @Valid @RequestBody CreateFormTypeRequest request) {

        FormTypeResponse response = formTypeService.create(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{formTypeId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FormTypeResponse> update(
            @PathVariable UUID formTypeId,
            @Valid @RequestBody UpdateFormTypeRequest request) {

        return ResponseEntity.ok(
                formTypeService.update(
                        formTypeId,
                        request));
    }

    @PatchMapping("/{formTypeId}/activate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> activate(
            @PathVariable UUID formTypeId) {

        formTypeService.activate(formTypeId);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{formTypeId}/deactivate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deactivate(
            @PathVariable UUID formTypeId) {

        formTypeService.deactivate(formTypeId);

        return ResponseEntity.noContent().build();
    }

}
