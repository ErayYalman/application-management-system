package com.cybersoft.application_management.storage;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class LocalFileStorageService implements FileStorageService {

    private final Path rootLocation;

    public LocalFileStorageService(     // create a directory to store files if it doesn't exist
            @Value("${file.storage.location}") String storageLocation) {

        this.rootLocation = Paths.get(storageLocation)
                .toAbsolutePath()
                .normalize();
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new IllegalStateException(
                    "Could not initialize file storage.",
                    e);
        }
    }

    @Override
    public String store(
            MultipartFile file,
            UUID applicationId) {

        try {
            String storedName = UUID.randomUUID()
                    + getExtension(file.getOriginalFilename());

            Path applicationDirectory = rootLocation.resolve(
                    applicationId.toString());

            Files.createDirectories(applicationDirectory);

            Path target = applicationDirectory.resolve(storedName);

            Files.copy(
                    file.getInputStream(),
                    target,
                    StandardCopyOption.REPLACE_EXISTING);

            return applicationId.toString() + "/" + storedName;

        } catch (IOException e) {
            throw new IllegalStateException(
                    "Could not store file.",
                    e);
        }
    }

    @Override
    public void delete(String filePath) {

        try {
            Path path = rootLocation.resolve(filePath)
                    .normalize();

            if(!path.startsWith(rootLocation)) {
                throw new IllegalStateException(
                        "Invalid file path.");
            }

            Files.deleteIfExists(path);

        } catch (IOException e) {
            throw new IllegalStateException(
                    "Could not delete file.",
                    e);
        }
    }

    @Override
    public Resource load(String filePath) {

        try {
            Path path = rootLocation.resolve(filePath)
                    .normalize();

            if(!path.startsWith(rootLocation)) {
                throw new IllegalStateException(
                        "Invalid file path.");
            }

            Resource resource = new UrlResource(path.toUri());

            if (!resource.exists()) {
                throw new IllegalStateException(
                        "File not found.");
            }

            return resource;

        } catch (MalformedURLException e) {
            throw new IllegalStateException(
                    "Could not load file.",
                    e);
        }
    }

    private String getExtension(String fileName) {

        if (fileName == null || fileName.isBlank()) {
            return "";
        }

        int lastDot = fileName.lastIndexOf('.');

        if (lastDot == -1) {
            return "";
        }

        return fileName.substring(lastDot);
    }

}
