package net.backend.UniConnectBackend.service;

import net.backend.UniConnectBackend.controller.StudentController;
import net.backend.UniConnectBackend.dto.StudentDTO;
import net.backend.UniConnectBackend.entity.Student;
import java.util.List;
import java.util.Set;

public interface StudentService {
    StudentDTO createStudent(StudentDTO studentDTO);

    Student editStudent(Student student);

    void addFollower(Long student_id, Long follower_id);

    Set<Student> getFollowers(Long student_id);
    Set<Student> getFollowing(Long student_id);
    StudentDTO getStudentByEmailAndPass(String email, String pass);

    List<Student> findAllStudents();

    void removeFollower(Long student_id, Long follower_id);

    //TO-DO
    //Add ability to follow other students/orgs

}
