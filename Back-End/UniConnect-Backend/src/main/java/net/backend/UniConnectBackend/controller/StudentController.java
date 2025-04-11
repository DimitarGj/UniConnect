package net.backend.UniConnectBackend.controller;

import lombok.AllArgsConstructor;
import net.backend.UniConnectBackend.dto.PostDto;
import net.backend.UniConnectBackend.dto.StudentDTO;
import net.backend.UniConnectBackend.entity.Post;
import net.backend.UniConnectBackend.entity.Student;
import net.backend.UniConnectBackend.mapper.PostMapper;
import net.backend.UniConnectBackend.mapper.StudentMapper;
import net.backend.UniConnectBackend.service.StudentService;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/student")
public class StudentController {
    private StudentService studentService;

    //Build Add Student REST API
    @PostMapping
    public ResponseEntity<StudentDTO> createStudent(@RequestBody StudentDTO studentDTO) {
        StudentDTO savedStudent = studentService.createStudent(studentDTO);
        return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
    }

    @PostMapping("/{student_id}/{follower_id}")
    public ResponseEntity<StudentDTO> addFollower (@PathVariable("student_id") Long student_id, @PathVariable("follower_id") Long follower_id) {
        studentService.addFollower(student_id, follower_id);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @DeleteMapping("/{student_id}/{follower_id}")
    public ResponseEntity<StudentDTO> removeFollower(@PathVariable("student_id") Long student_id, @PathVariable("follower_id") Long follower_id){
        studentService.removeFollower(student_id, follower_id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("/{email}/{password}")
    public ResponseEntity<StudentDTO> getStudentByEmailAndPass
            (@PathVariable("email") String email, @PathVariable("password") String pass) {
        StudentDTO savedStudent = studentService.getStudentByEmailAndPass(email, pass);
        return ResponseEntity.ok(savedStudent);
    }
    @PutMapping("/")
    public ResponseEntity<StudentDTO> editName(@RequestBody StudentDTO studentDTO){
        studentService.editStudent(StudentMapper.mapToStudent(studentDTO));
        return new ResponseEntity<>(HttpStatus.OK);

    }
    @GetMapping("/")
    public ResponseEntity<List<Student>> getAllStudent() {
        List<Student> students = studentService.findAllStudents();
        return new ResponseEntity<>(students, HttpStatus.OK);
    }
    @GetMapping("/following/{student_id}")
    public ResponseEntity<Set<Student>> getFollowing(@PathVariable("student_id") Long studentId){
        Set<Student> following = new HashSet<>();
        following.addAll(studentService.getFollowing(studentId));
        return new ResponseEntity<>(following, HttpStatus.OK);
    }
    @GetMapping("/followers/{follower_id}")
    public ResponseEntity<Set<Student>> getFollowers(@PathVariable("follower_id") Long studentId){
        Set<Student> followers = new HashSet<>();
        followers.addAll(studentService.getFollowers(studentId));
        return new ResponseEntity<>(followers, HttpStatus.OK);
    }
}
