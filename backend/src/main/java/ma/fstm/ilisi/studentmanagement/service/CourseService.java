package ma.fstm.ilisi.studentmanagement.service;

import ma.fstm.ilisi.studentmanagement.dto.CourseDTO;
import ma.fstm.ilisi.studentmanagement.exception.CourseNotFoundException;
import ma.fstm.ilisi.studentmanagement.model.Course;
import ma.fstm.ilisi.studentmanagement.repository.CourseRepositoryInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CourseService implements CourseServiceInterface {
    @Autowired
    private CourseRepositoryInterface courseRepository;

    public CourseService(CourseRepositoryInterface courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Override
    public List<CourseDTO> findAll() {
        return this.courseRepository.findAll().stream().map(this::mapToCourseDTO).collect(Collectors.toList());
    }

    @Override
    public CourseDTO findById(Long id) throws CourseNotFoundException {
        Optional<Course> courseOptional = this.courseRepository.findById(id);
        if (courseOptional.isEmpty())
            throw new CourseNotFoundException("Course not found!");
        return this.mapToCourseDTO(courseOptional.get());
    }

    @Override
    public CourseDTO create(CourseDTO courseDTO) {
        return this.mapToCourseDTO(this.courseRepository.save(this.mapToCourse(courseDTO)));
    }

    @Override
    public CourseDTO update(CourseDTO courseDTO, Long id) throws CourseNotFoundException {
        Optional<Course> courseOptional = this.courseRepository.findById(id);
        if (courseOptional.isEmpty())
            throw new CourseNotFoundException("Course not found!");
        Course course = courseOptional.get();
        course.setName(courseDTO.getName());
        return this.mapToCourseDTO(this.courseRepository.save(course));
    }

    @Override
    public CourseDTO delete(Long id) throws CourseNotFoundException {
        Optional<Course> courseOptional = this.courseRepository.findById(id);
        if (courseOptional.isEmpty())
            throw new CourseNotFoundException("Course not found!");
        this.courseRepository.deleteById(id);
        return this.mapToCourseDTO(courseOptional.get());
    }

    @Override
    public CourseDTO mapToCourseDTO(Course course) {
        return CourseDTO.builder()
                .id(course.getId())
                .name(course.getName())
                .grades(course.getGrades().stream().map(grade -> new GradeService().mapToGradeDTO(grade)).collect(Collectors.toList()))
                .build();
    }

    @Override
    public Course mapToCourse(CourseDTO courseDTO) {
        return Course.builder()
                .id(courseDTO.getId())
                .name(courseDTO.getName())
                .grades(courseDTO.getGrades().stream().map(gradeDTO -> new GradeService().mapToGrade(gradeDTO)).collect(Collectors.toList()))
                .build();
    }
}
