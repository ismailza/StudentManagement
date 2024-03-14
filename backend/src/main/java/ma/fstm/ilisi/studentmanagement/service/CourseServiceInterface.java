package ma.fstm.ilisi.studentmanagement.service;

import ma.fstm.ilisi.studentmanagement.dto.CourseDTO;
import ma.fstm.ilisi.studentmanagement.exception.CourseNotFoundException;
import ma.fstm.ilisi.studentmanagement.model.Course;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CourseServiceInterface {
    List<CourseDTO> findAll();
    CourseDTO findById(Long id) throws CourseNotFoundException;
    CourseDTO create(CourseDTO courseDTO);
    CourseDTO update(CourseDTO courseDTO, Long id) throws CourseNotFoundException;
    CourseDTO delete(Long id) throws CourseNotFoundException;

    CourseDTO mapToCourseDTO(Course course);
    Course mapToCourse(CourseDTO courseDTO);
}
