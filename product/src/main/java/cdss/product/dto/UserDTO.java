package cdss.product.dto;


import cdss.product.model.User;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import javax.validation.constraints.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.Set;

@Data
@Getter
@Setter
@ToString
public class UserDTO {

	@NotNull
	private String name;

	@NotNull
	private String username;

	@NotNull
	private String password;

	@NotNull
	private String email;

	@NotBlank(message = "Role can not be empty")
	private String roles;
}
