package com.example.api.models.movie;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class MovieWithFavourite extends Movie {
    private boolean favourite;
}
