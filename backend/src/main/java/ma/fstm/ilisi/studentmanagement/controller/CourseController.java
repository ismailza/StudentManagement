package ma.fstm.ilisi.studentmanagement.controller;

import ma.fstm.ilisi.studentmanagement.dto.CourseDTO;
import ma.fstm.ilisi.studentmanagement.exception.CourseNotFoundException;
import ma.fstm.ilisi.studentmanagement.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(value = "*")
public class CourseController {
    @Autowired
    private CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/courses")
    public List<CourseDTO> getAllCourses() {
        return this.courseService.findAll();
    }

    @GetMapping("/course/{id}")
    public CourseDTO getCourse(@PathVariable Long id) throws CourseNotFoundException {
        return this.courseService.findById(id);
    }

    @PostMapping("/course")
    public CourseDTO saveCourse(@RequestBody CourseDTO courseDTO) {
        return this.courseService.create(courseDTO);
    }

    @PutMapping("/course/{id}")
    public CourseDTO updateCourse(@RequestBody CourseDTO courseDTO, @PathVariable Long id) throws CourseNotFoundException {
        return this.courseService.update(courseDTO, id);
    }

    @DeleteMapping("/course/{id}")
    public CourseDTO deleteCourse(@PathVariable Long id) throws CourseNotFoundException {
        return this.courseService.delete(id);
    }
}
