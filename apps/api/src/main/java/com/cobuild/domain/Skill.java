package com.cobuild.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Document(collection = "skills")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Skill {

    @Id
    private String id;

    @Indexed(unique = true)
    private String canonicalName;

    @Builder.Default
    private Set<String> aliases = new HashSet<>();

    private String category;

    @Builder.Default
    private String status = "ACTIVE";
}
