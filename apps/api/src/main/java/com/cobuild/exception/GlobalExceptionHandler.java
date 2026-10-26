package com.cobuild.exception;

import com.cobuild.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<String> details = ex.getBindingResult().getAllErrors().stream()
                .map(error -> {
                    String fieldName = error instanceof FieldError ? ((FieldError) error).getField() : error.getObjectName();
                    return fieldName + ": " + error.getDefaultMessage();
                })
                .collect(Collectors.toList());

        ErrorResponse error = ErrorResponse.builder()
                .code("VALIDATION_FAILED")
                .message("Request input validation failed")
                .details(details)
                .correlationId(UUID.randomUUID().toString())
                .build();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentials(BadCredentialsException ex) {
        ErrorResponse error = ErrorResponse.builder()
                .code("INVALID_CREDENTIALS")
                .message("Invalid email or password")
                .correlationId(UUID.randomUUID().toString())
                .build();

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(AccessDeniedException ex) {
        ErrorResponse error = ErrorResponse.builder()
                .code("FORBIDDEN")
                .message("Access denied: You do not have permission to perform this action")
                .correlationId(UUID.randomUUID().toString())
                .build();

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgument(IllegalArgumentException ex) {
        ErrorResponse error = ErrorResponse.builder()
                .code("BAD_REQUEST")
                .message(ex.getMessage())
                .correlationId(UUID.randomUUID().toString())
                .build();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(Exception ex) {
        ErrorResponse error = ErrorResponse.builder()
                .code("INTERNAL_SERVER_ERROR")
                .message("An unexpected error occurred. Please contact platform support.")
                .details(List.of(ex.getMessage() != null ? ex.getMessage() : "Unknown error"))
                .correlationId(UUID.randomUUID().toString())
                .build();

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
