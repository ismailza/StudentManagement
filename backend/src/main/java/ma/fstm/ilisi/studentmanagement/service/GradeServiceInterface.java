package ma.fstm.ilisi.studentmanagement.service;

import ma.fstm.ilisi.studentmanagement.dto.GradeDTO;
import ma.fstm.ilisi.studentmanagement.exception.GradeNotFoundException;
import ma.fstm.ilisi.studentmanagement.model.Grade;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface GradeServiceInterface {

    GradeDTO create(GradeDTO gradeDTO);
    GradeDTO update(GradeDTO gradeDTO, Long id) throws GradeNotFoundException;
    GradeDTO delete(Long id) throws GradeNotFoundException;

    GradeDTO mapToGradeDTO(Grade grade);
    Grade mapToGrade(GradeDTO gradeDTO);

}
