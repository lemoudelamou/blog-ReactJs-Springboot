package com.example.demo.blogs;

import com.example.demo.models.Blogs;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BlogsRepository extends CrudRepository<Blogs, Long> {

    List<Blogs> findAllByMyUsers_UserName(String userName);

    List<Blogs> findAllByOrderByPublishedDateDesc();


    Blogs findBlogsById(Long id);

    List<Blogs> findBlogsByMyUsers_Id(Long myUsersId);


    Long deleteBlogsByIdAndMyUsers_Id(Long blogId, Long myUsersId);
}