package com.example.demo.comment;

import java.util.List;

import com.example.demo.models.Comment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
//These methods query the database for comment related requests.
public interface CommentRepository extends CrudRepository<Comment, Long>{

    // Used to return a list of all comments that belong to a specific post.
    List<Comment> findByBlog_Id(Long id);


    Long deleteCommentById(Long id);


    Long deleteCommentByIdAndMyUsers_Id(Long commentId, Long myUsersId);


    Long deleteCommentsByBlog_Id(Long blogId);

}
