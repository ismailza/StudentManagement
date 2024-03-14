package ma.fstm.ilisi.studentmanagement.repository;

import ma.fstm.ilisi.studentmanagement.model.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GradeRepositoryInterface extends JpaRepository<Grade, Long> {

}
