package net.backend.UniConnectBackend.repository;

import net.backend.UniConnectBackend.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByIsPostTrueOrderByCreatedAtDesc();
}
