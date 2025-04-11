package net.backend.UniConnectBackend.controller;


import lombok.AllArgsConstructor;
import net.backend.UniConnectBackend.dto.PostDto;
import net.backend.UniConnectBackend.entity.Post;
import net.backend.UniConnectBackend.entity.Student;
import net.backend.UniConnectBackend.mapper.PostMapper;
import net.backend.UniConnectBackend.mapper.StudentMapper;
import net.backend.UniConnectBackend.service.PostService;
import net.backend.UniConnectBackend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/posts")
public class PostController {


    private PostService postService;
    private StudentService studentService;


    @PostMapping("/create")
    public ResponseEntity<PostDto> createPost(@RequestBody PostDto req){

        PostDto post = postService.createPost(req);

        return new ResponseEntity<>(post, HttpStatus.CREATED);

    }

    @GetMapping("/{studentId}")
    public ResponseEntity<List<PostDto>> findByStudentId(@PathVariable Long studentId){
        List<Post> posts = postService.findByStudent_Id(studentId);
        List<PostDto> postDtos = new ArrayList<>();
        for (Post post:posts){
            postDtos.add(PostMapper.toPostDto(post));
        }
        Collections.reverse(postDtos); 
        return new ResponseEntity<>(postDtos, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<PostDto>> getAllPosts(){
        List<Post> posts = postService.findAllPosts();

        List<PostDto> postDtos = PostMapper.toPostDtos(posts);

        return new ResponseEntity<>(postDtos, HttpStatus.OK);
    }
}
