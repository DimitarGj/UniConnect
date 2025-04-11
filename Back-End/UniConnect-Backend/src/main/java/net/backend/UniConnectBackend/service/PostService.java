package net.backend.UniConnectBackend.service;

import net.backend.UniConnectBackend.dto.PostDto;
import net.backend.UniConnectBackend.entity.Post;
import net.backend.UniConnectBackend.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

public interface PostService {
    PostDto createPost(PostDto req) throws ResourceNotFoundException;
    List<Post> findAllPosts();
    List<Post> findByStudent_Id(Long StudentId) throws ResourceNotFoundException;

}
