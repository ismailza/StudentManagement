package ma.fstm.ilisi.studentmanagement.repository;

import ma.fstm.ilisi.studentmanagement.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepositoryInterface extends JpaRepository<Student, Long> {

}
