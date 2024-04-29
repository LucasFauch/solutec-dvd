package com.example.api.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class MovieRent {
    @Id
    private String id;
    private String movieId;
    @Indexed
    private String userId;
    private String rentType;
}
