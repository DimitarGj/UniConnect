package net.backend.UniConnectBackend.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import net.backend.UniConnectBackend.entity.Student;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "posts")
@Getter
@Setter
public class Post{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "content")
    private String content;

    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    //@OneToMany(mappedBy = "post")
    //private List<Like> likes = new ArrayList<>();

    private boolean isPost;

    private LocalDateTime createdAt;
}