package com.example.demo.comment;

import com.example.demo.models.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/comment")
@RestController
public class CommentController {
    @Autowired
    CommentRepository commentRepository;

    @Autowired
    CommentService commentService;


    // Get a list of a post's comments based on the post ID.
    @GetMapping("/show/{id}")
    public ResponseEntity<Object> getPostComments(@PathVariable("id") Long blog_id) {
        List<Comment> postComments = commentService.findPostComments(blog_id);
        return ResponseEntity.ok(postComments);
    }

    /*
    Post a comment
     */
    @PostMapping("/create")
    public Comment createComment(@RequestBody Comment comment) {
        return commentService.saveComment(comment);
    }


    @DeleteMapping ("/delete/{id}")
    public Long deleteComment(@PathVariable("id") Long id){
        return commentService.deleteComment(id);

    }

    @DeleteMapping("/deleteComm/{id}/{myUsersId}")
    public  Long deleteComm(@PathVariable("id") Long id, @PathVariable("myUsersId") Long myUsersId){
        return commentService.deleteComm(id, myUsersId);
    }

    @DeleteMapping("/deleteCommBlog/{blogId}")
    public Long deleteCommBlog(@PathVariable("blogId") Long blogId){
        return  commentService.deleteCommentsBlog(blogId);
    }


}