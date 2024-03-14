package ma.fstm.ilisi.studentmanagement.service;

import ma.fstm.ilisi.studentmanagement.dto.StudentDTO;
import ma.fstm.ilisi.studentmanagement.exception.StudentNotFoundException;
import ma.fstm.ilisi.studentmanagement.model.Student;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface StudentServiceInterface {

    List<StudentDTO> findAll();
    StudentDTO findById(Long id) throws StudentNotFoundException;
    StudentDTO create(StudentDTO studentDTO);
    StudentDTO update(StudentDTO studentDTO, Long id) throws StudentNotFoundException;
    StudentDTO delete(Long id) throws StudentNotFoundException;

    StudentDTO mapToStudentDTO(Student student);
    Student mapToStudent(StudentDTO studentDTO);
}
