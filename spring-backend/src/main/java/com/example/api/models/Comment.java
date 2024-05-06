package com.example.api.models;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Comment {
    @Id
    private String id;
    @Indexed
    private String movieId;
    private String authorId;
    private String authorName;
    @NotBlank(message = "The comment text is required")
    private String text;
}
