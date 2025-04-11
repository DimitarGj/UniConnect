package net.backend.UniConnectBackend.repository;

import net.backend.UniConnectBackend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

//In here, we add, delete, basically modify the database
public interface StudentRepo extends JpaRepository<Student, Long> {
    Student findByEmailAndPassword(String email, String pass);
}
