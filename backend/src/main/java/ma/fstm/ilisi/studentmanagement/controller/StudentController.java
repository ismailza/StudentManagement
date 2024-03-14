package ma.fstm.ilisi.studentmanagement.controller;

import ma.fstm.ilisi.studentmanagement.dto.StudentDTO;
import ma.fstm.ilisi.studentmanagement.exception.StudentNotFoundException;
import ma.fstm.ilisi.studentmanagement.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(value = "*")
public class StudentController {
    @Autowired
    private StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/students")
    public List<StudentDTO> getAllStudents() {
        return this.studentService.findAll();
    }

    @GetMapping("/student/{id}")
    public StudentDTO getStudent(@PathVariable Long id) throws StudentNotFoundException {
        return this.studentService.findById(id);
    }

    @PostMapping("/student")
    public StudentDTO saveStudent(@RequestBody StudentDTO studentDTO) {
        return this.studentService.create(studentDTO);
    }

    @PutMapping("/student/{id}")
    public StudentDTO updateStudent(@RequestBody StudentDTO studentDTO, @PathVariable Long id) throws StudentNotFoundException {
        return this.studentService.update(studentDTO, id);
    }

    @DeleteMapping("/student/{id}")
    public StudentDTO deleteStudent(@PathVariable Long id) throws StudentNotFoundException {
        return this.studentService.delete(id);
    }
}
