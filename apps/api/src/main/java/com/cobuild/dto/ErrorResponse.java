package com.cobuild.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {
    private String code;
    private String message;
    private List<String> details;
    private String correlationId;
    @Builder.Default
    private Instant timestamp = Instant.now();
}
