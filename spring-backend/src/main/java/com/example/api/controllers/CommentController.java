package com.example.api.controllers;

import com.example.api.models.Comment;
import com.example.api.services.CommentService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @GetMapping("/{movieId}")
    public List<Comment> getComments(@PathVariable String movieId) {
        return this.commentService.getMovieComments(movieId);
    }

    @PostMapping("/{movieId}")
    public Comment addComment(@PathVariable String movieId, @RequestBody String text, HttpServletRequest request) {
        final String userId = request.getAttribute("userId").toString();
        return this.commentService.addComment(userId, movieId, text);
    }

    @DeleteMapping("/{commentId}")
    public void deleteComment(@PathVariable String commentId) {
        this.commentService.deleteComment(commentId);
    }
}
