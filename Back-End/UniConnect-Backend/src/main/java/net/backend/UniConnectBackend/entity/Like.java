package net.backend.UniConnectBackend.entity;

import jakarta.annotation.sql.DataSourceDefinition;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "likes")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // You might want to add additional attributes like timestamp, etc.

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
}
