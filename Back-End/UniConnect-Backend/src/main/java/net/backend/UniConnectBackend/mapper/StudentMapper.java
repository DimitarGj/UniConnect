package net.backend.UniConnectBackend.mapper;

import net.backend.UniConnectBackend.dto.StudentDTO;
import net.backend.UniConnectBackend.entity.Student;

public class StudentMapper {
    public static StudentDTO mapToStudentDto(Student student){
        //get student and convert to StudentDto
        return new StudentDTO(
                student.getId(), student.getEmail(), student.getPassword(), student.getFirstName(), student.getLastName(),
                student.getMajor(), student.getMinor(), student.getDOB(), student.getPfp(), student.getPosts(), student.getLikes(), student.getFollowers(), student.getFollowing()
        );
    }

    //convert StudentDTO back to student
    public static Student mapToStudent(StudentDTO studentDto){
        return new Student(
                studentDto.getId(), studentDto.getEmail(), studentDto.getPassword(), studentDto.getFirstName(), studentDto.getLastName(),
                studentDto.getMajor(), studentDto.getMinor(), studentDto.getDOB(), studentDto.getPfp(), studentDto.getPosts(), studentDto.getLikes(), studentDto.getFollowers(), studentDto.getFollowing()
        );
    }
}
