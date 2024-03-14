package ma.fstm.ilisi.studentmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GradeDTO {
    private Long id;
    private float grade;
    private StudentDTO student;
    private CourseDTO course;

}
