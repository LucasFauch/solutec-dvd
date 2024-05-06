package com.example.api.services;

import com.example.api.models.Comment;
import com.example.api.models.user.User;
import com.example.api.repositories.CommentRepository;
import com.example.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private UserRepository userRepository;

    public List<Comment> getMovieComments(String movieId){
        return this.commentRepository.findAllByMovieId(movieId);
    }

    public Comment addComment(String userId, String movieId, String text){
        Comment comment = new Comment();
        comment.setAuthorId(userId);
        comment.setMovieId(movieId);
        comment.setText(text);

        User user = this.userRepository.findById(userId).get();
        comment.setAuthorName(user.getUsername());
        return this.commentRepository.save(comment);
    }

    public void deleteComment(String commentId){
        this.commentRepository.deleteById(commentId);
    }

}
