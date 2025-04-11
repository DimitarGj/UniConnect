package net.backend.UniConnectBackend.service.impl;

import lombok.AllArgsConstructor;
import net.backend.UniConnectBackend.dto.StudentDTO;
import net.backend.UniConnectBackend.entity.Student;
import net.backend.UniConnectBackend.exception.ResourceNotFoundException;
import net.backend.UniConnectBackend.mapper.StudentMapper;
import net.backend.UniConnectBackend.repository.StudentRepo;
import net.backend.UniConnectBackend.service.StudentService;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {
    private StudentRepo studentRepo;
    @Override
    public StudentDTO createStudent(StudentDTO studentDto) {
        Student student = StudentMapper.mapToStudent(studentDto);
        studentRepo.save(student);
        return null;
    }

    @Override
    public Student editStudent(Student student) {
        Student savedStudent = studentRepo.findById(student.getId()).orElseThrow();
        savedStudent.setFirstName(student.getFirstName());
        savedStudent.setLastName(student.getLastName());

        studentRepo.save(savedStudent);
        return null;
    }

    @Override
    public StudentDTO getStudentByEmailAndPass(String email, String pass) {
        Student savedStudent = studentRepo.findByEmailAndPassword(email, pass);
        if(savedStudent == null){
            throw(new ResourceNotFoundException("User not found with given email and password"));
        }
        return StudentMapper.mapToStudentDto(savedStudent);
    }

    @Override
    public List<Student> findAllStudents() {
        return studentRepo.findAll();
    }

    @Override
    public void removeFollower(Long student_id, Long follower_id) {
        Student follower = studentRepo.findById(follower_id).orElseThrow();
        Student student = studentRepo.findById(student_id).orElseThrow();

        follower.getFollowing().remove(student);
        student.getFollowers().remove(follower);

        studentRepo.save(follower);
        studentRepo.save(student);

    }

    @Override
    public void addFollower(Long studentId, Long followerId) {
        Student student = studentRepo.findById(studentId).orElseThrow();
        Student follower = studentRepo.findById(followerId).orElseThrow();

        student.getFollowers().add(follower);
        follower.getFollowing().add(student);

        studentRepo.save(student);
        studentRepo.save(follower);
    }
    @Override
    public Set<Student> getFollowers(Long studentId) {
        Student student = studentRepo.findById(studentId).orElseThrow();
        return student.getFollowers();
    }
    @Override
    public Set<Student> getFollowing(Long studentId) {
        Student student = studentRepo.findById(studentId).orElseThrow();
        return student.getFollowing();
    }


}
