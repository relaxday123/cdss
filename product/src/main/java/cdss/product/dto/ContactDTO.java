package cdss.product.dto;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ContactDTO {

	private Long id;

	private String name;

	private String email;

	private String phone;

	private String symptom;
}
