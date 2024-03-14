package ma.fstm.ilisi.studentmanagement.repository;

import ma.fstm.ilisi.studentmanagement.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepositoryInterface extends JpaRepository<Course, Long> {

}
