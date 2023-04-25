package com.example.demo.comment;


import java.util.List;

import com.example.demo.models.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepo;

    // Creates a comment
    public Comment saveComment(Comment comment) {
        return commentRepo.save(comment);
    }

    // Returns a list of all comments that belong to a post.
    public List<Comment> findPostComments(Long id) {
        return commentRepo.findByBlog_Id(id);
    }


    public Long deleteComment(Long id){
        return commentRepo.deleteCommentById(id);
    }

    public Long deleteComm(Long commentId, Long myUsersId) {return  commentRepo.deleteCommentByIdAndMyUsers_Id(commentId, myUsersId);}

    public Long deleteCommentsBlog(Long blogId){ return  commentRepo.deleteCommentsByBlog_Id(blogId);}


}
