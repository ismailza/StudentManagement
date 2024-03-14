package ma.fstm.ilisi.studentmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentDTO {
    private Long id;
    private String firstname;
    private String lastname;
    private LocalDate birthday;
    private String cne;
    private String email;
    private List<GradeDTO> grades;

}
