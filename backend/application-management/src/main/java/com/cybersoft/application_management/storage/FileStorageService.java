package com.cybersoft.application_management.storage;

import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {

    String store(MultipartFile file, UUID applicationId);  //save the file to the storage and return the file path

    void delete(String filePath);           //delete the file from the storage

    Resource load(String filePath);         //load the file from the storage and return it as a Resource

}
