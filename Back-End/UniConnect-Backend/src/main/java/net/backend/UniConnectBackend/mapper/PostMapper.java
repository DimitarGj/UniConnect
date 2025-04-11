package net.backend.UniConnectBackend.mapper;

import net.backend.UniConnectBackend.dto.PostDto;
import net.backend.UniConnectBackend.entity.Post;

import java.util.ArrayList;
import java.util.List;

public class PostMapper {

    public static PostDto toPostDto(Post post){

        return new PostDto(
          post.getId(),post.getContent(), post.getStudent(),post.isPost(), post.getCreatedAt()
        );
    }

    public static List<PostDto> toPostDtos(List<Post> posts){
        List<PostDto> postDtos = new ArrayList<>();

        for(Post post: posts){
            PostDto temp = toPostDto(post);
            postDtos.add(temp);
        }
        return postDtos;
    }
}
