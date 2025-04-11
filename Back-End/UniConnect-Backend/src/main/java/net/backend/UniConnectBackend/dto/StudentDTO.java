package net.backend.UniConnectBackend.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
//import net.backend.UniConnectBackend.entity.Like;
import net.backend.UniConnectBackend.entity.Like;
import net.backend.UniConnectBackend.entity.Post;
import net.backend.UniConnectBackend.entity.Student;

import java.sql.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {
    private Long id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String major;
    private String minor;
    private Date DOB;
    private String pfp;
    private List<Post> posts;
    private List<Like> likes;
    private Set<Student> followers = new HashSet<>();
    private Set<Student> following = new HashSet<>();

}
