package com.example.api.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document("userfavourites")
public class UserFavourites {
    @Id
    private String id;
    @Indexed(unique = true)
    private String userId;
    private List<String> favourites;
}
