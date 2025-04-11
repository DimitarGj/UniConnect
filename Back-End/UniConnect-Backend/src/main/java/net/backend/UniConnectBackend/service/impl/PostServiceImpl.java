package net.backend.UniConnectBackend.service.impl;

import lombok.AllArgsConstructor;
import net.backend.UniConnectBackend.dto.PostDto;
import net.backend.UniConnectBackend.entity.Post;
import net.backend.UniConnectBackend.entity.Student;
import net.backend.UniConnectBackend.exception.ResourceNotFoundException;
import net.backend.UniConnectBackend.mapper.PostMapper;
import net.backend.UniConnectBackend.mapper.StudentMapper;
import net.backend.UniConnectBackend.repository.PostRepository;
import net.backend.UniConnectBackend.repository.StudentRepo;
import net.backend.UniConnectBackend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@Service
@AllArgsConstructor
public class PostServiceImpl implements PostService {


    private PostRepository postRepository;

    private StudentRepo studentRepo;
    @Override
    public PostDto createPost(PostDto req) throws ResourceNotFoundException {
        Student student = studentRepo.findById(req.getStudent().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + req.getStudent().getId()));

        Post post = new Post();
        post.setContent(req.getContent());
        post.setCreatedAt(LocalDateTime.now());
        post.setStudent(student);
        post.setPost(true);

        postRepository.save(post);
        return null;
    }

    @Override
    public List<Post> findAllPosts() {
        return postRepository.findAllByIsPostTrueOrderByCreatedAtDesc();
    }

    @Override
    public List<Post> findByStudent_Id(Long StudentId) throws ResourceNotFoundException {
        Student student = studentRepo.findById(StudentId).orElseThrow();

        return student.getPosts();
    }


}
