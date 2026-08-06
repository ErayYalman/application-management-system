package com.cybersoft.application_management.security.hash;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.stereotype.Service;

@Service
public class Sha256HashService implements HashService {

     @Override
    public String hash(String value) {

        try {

            MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");

            byte[] hashedBytes = messageDigest.digest(
                    value.getBytes(StandardCharsets.UTF_8)
            );

            return bytesToHex(hashedBytes);

        } catch (NoSuchAlgorithmException ex) {
            throw new IllegalStateException("SHA-256 algorithm is not available.", ex);
        }
    }

    private String bytesToHex(byte[] bytes) {

        StringBuilder builder = new StringBuilder();

        for (byte b : bytes) {
            builder.append(String.format("%02x", b));
        }

        return builder.toString();
    }
    

}
