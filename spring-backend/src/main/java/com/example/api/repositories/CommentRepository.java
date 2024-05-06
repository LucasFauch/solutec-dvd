package com.example.api.repositories;

import com.example.api.models.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findAllByMovieId(String movieId);
}
