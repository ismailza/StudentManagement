package ma.fstm.ilisi.studentmanagement.service;

import ma.fstm.ilisi.studentmanagement.dto.StudentDTO;
import ma.fstm.ilisi.studentmanagement.exception.StudentNotFoundException;
import ma.fstm.ilisi.studentmanagement.model.Student;
import ma.fstm.ilisi.studentmanagement.repository.StudentRepositoryInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentService implements StudentServiceInterface {
    @Autowired
    StudentRepositoryInterface studentRepository;

    public StudentService(StudentRepositoryInterface studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public List<StudentDTO> findAll() {
        return this.studentRepository.findAll().stream().map(this::mapToStudentDTO).collect(Collectors.toList());
    }

    @Override
    public StudentDTO findById(Long id) throws StudentNotFoundException {
        Optional<Student> studentOptional = this.studentRepository.findById(id);
        if (studentOptional.isEmpty())
            throw new StudentNotFoundException("Student with id " + id + " not found!");
        return this.mapToStudentDTO(studentOptional.get());
    }

    @Override
    public StudentDTO create(StudentDTO studentDTO) {
        return this.mapToStudentDTO(this.studentRepository.save(this.mapToStudent(studentDTO)));
    }

    @Override
    public StudentDTO update(StudentDTO studentDTO, Long id) throws StudentNotFoundException {
        Optional<Student> studentOptional = this.studentRepository.findById(id);
        if (studentOptional.isEmpty())
            throw new StudentNotFoundException("Student with id " + id + " not found!");
        Student student = studentOptional.get();
        student.setFirstname(studentDTO.getFirstname());
        student.setLastname(studentDTO.getLastname());
        student.setBirthday(studentDTO.getBirthday());
        student.setCne(studentDTO.getCne());
        student.setEmail(studentDTO.getEmail());
        return this.mapToStudentDTO(this.studentRepository.save(student));
    }

    @Override
    public StudentDTO delete(Long id) throws StudentNotFoundException {
        Optional<Student> studentOptional = this.studentRepository.findById(id);
        if (studentOptional.isEmpty())
            throw new StudentNotFoundException("Student with id " + id + " not found!");
        this.studentRepository.deleteById(id);
        return this.mapToStudentDTO(studentOptional.get());
    }

    @Override
    public StudentDTO mapToStudentDTO(Student student) {
        return StudentDTO.builder()
                .id(student.getId())
                .firstname(student.getFirstname())
                .lastname(student.getLastname())
                .birthday(student.getBirthday())
                .cne(student.getCne())
                .email(student.getEmail())
                .build();
    }

    @Override
    public Student mapToStudent(StudentDTO studentDTO) {
        return Student.builder()
                .id(studentDTO.getId())
                .firstname(studentDTO.getFirstname())
                .lastname(studentDTO.getLastname())
                .birthday(studentDTO.getBirthday())
                .cne(studentDTO.getCne())
                .email(studentDTO.getEmail())
                .build();
    }
}
