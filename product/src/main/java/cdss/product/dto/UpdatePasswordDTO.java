package cdss.product.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UpdatePasswordDTO {

    private String oldPassword;

    private String newPassword;
}
