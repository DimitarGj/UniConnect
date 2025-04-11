package net.backend.UniConnectBackend.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import net.backend.UniConnectBackend.entity.Like;
import net.backend.UniConnectBackend.entity.Student;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@Data
@AllArgsConstructor
@Setter
@Getter
public class PostDto {

    private Long id;

    private String content;

    private Student student;
    //private List<Like> likes;

    private boolean isPost;

    private LocalDateTime createdAt;
}
