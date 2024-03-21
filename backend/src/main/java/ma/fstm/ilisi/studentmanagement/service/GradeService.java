package ma.fstm.ilisi.studentmanagement.service;

import ma.fstm.ilisi.studentmanagement.dto.CourseDTO;
import ma.fstm.ilisi.studentmanagement.dto.GradeDTO;
import ma.fstm.ilisi.studentmanagement.dto.StudentDTO;
import ma.fstm.ilisi.studentmanagement.exception.GradeNotFoundException;
import ma.fstm.ilisi.studentmanagement.model.Course;
import ma.fstm.ilisi.studentmanagement.model.Grade;
import ma.fstm.ilisi.studentmanagement.model.Student;
import ma.fstm.ilisi.studentmanagement.repository.GradeRepositoryInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GradeService implements GradeServiceInterface {
    @Autowired
    private GradeRepositoryInterface gradeRepository;

    @Override
    public GradeDTO create(GradeDTO gradeDTO) {
        return this.mapToGradeDTO(this.gradeRepository.save(this.mapToGrade(gradeDTO)));
    }

    @Override
    public GradeDTO update(GradeDTO gradeDTO, Long id) throws GradeNotFoundException {
        Optional<Grade> gradeOptional = this.gradeRepository.findById(id);
        if (gradeOptional.isEmpty())
            throw new GradeNotFoundException("Grade with id " + id + " not found!");
        Grade grade = gradeOptional.get();
        grade.setGrade(gradeDTO.getGrade());
        return this.mapToGradeDTO(this.gradeRepository.save(grade));
    }

    @Override
    public GradeDTO delete(Long id) throws GradeNotFoundException {
        Optional<Grade> gradeOptional = this.gradeRepository.findById(id);
        if (gradeOptional.isEmpty())
            throw new GradeNotFoundException("Grade with id " + id + " not found!");
        this.gradeRepository.deleteById(id);
        return this.mapToGradeDTO(gradeOptional.get());
    }

    @Override
    public GradeDTO mapToGradeDTO(Grade grade) {
        return GradeDTO.builder()
                .id(grade.getId())
                .grade(grade.getGrade())
                .course(CourseDTO.builder()
                        .id(grade.getCourse().getId())
                        .name(grade.getCourse().getName())
                        .build())
                .student(StudentDTO.builder()
                        .id(grade.getStudent().getId())
                        .firstname(grade.getStudent().getFirstname())
                        .lastname(grade.getStudent().getLastname())
                        .birthday(grade.getStudent().getBirthday())
                        .cne(grade.getStudent().getCne())
                        .email(grade.getStudent().getEmail())
                        .build())
                .build();
    }

    @Override
    public Grade mapToGrade(GradeDTO gradeDTO) {
        return Grade.builder()
                .id(gradeDTO.getId())
                .grade(gradeDTO.getGrade())
                .course(Course.builder()
                        .id(gradeDTO.getCourse().getId())
                        .name(gradeDTO.getCourse().getName())
                        .build())
                .student(Student.builder()
                        .id(gradeDTO.getStudent().getId())
                        .firstname(gradeDTO.getStudent().getFirstname())
                        .lastname(gradeDTO.getStudent().getLastname())
                        .birthday(gradeDTO.getStudent().getBirthday())
                        .cne(gradeDTO.getStudent().getCne())
                        .email(gradeDTO.getStudent().getEmail())
                        .build())
                .build();
    }
}
