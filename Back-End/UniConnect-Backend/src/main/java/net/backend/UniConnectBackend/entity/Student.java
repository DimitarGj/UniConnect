package net.backend.UniConnectBackend.entity;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Student")
public class Student{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "email")
    private String email;
    @Column(name = "pass", nullable = false)
    private String password;
    @Column(name = "fname")
    private String firstName;
    @Column(name = "lname")
    private String lastName;
    @Column(name = "major")
    private String major;
    @Column(name = "minor")
    private String minor;
    @Column(name = "dob")
    private Date DOB;

    @Column(name = "pfp")
    private String pfp;
    @JsonIgnore
    @OneToMany(mappedBy = "student", cascade=CascadeType.ALL)
    private List<Post> posts = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "student", cascade=CascadeType.ALL)
    private List<Like> likes = new ArrayList<>();

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "followers",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "follower_id")
    )
    private Set<Student> followers = new HashSet<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "followers")
    private Set<Student> following = new HashSet<>();

}
