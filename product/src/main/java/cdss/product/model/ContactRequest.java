package cdss.product.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Optional;

@Getter
@Setter
@Entity
@Table(name = "contact_request")
public class ContactRequest {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "name")
	private String name;

	@Column(name = "email")
	private String email;

	@Column(name = "phone")
	private String phone;

	@Column(name = "symptom")
	private String symptom;

	@Column(name = "date")
	private LocalDate date;

	@Column(name = "state")
	@Enumerated(EnumType.STRING)
	private ContactState state;

	@ManyToOne
	@JoinColumn(name="user_id", nullable=false, referencedColumnName = "user_id")
	private User user;

	public enum ContactState{
		ACCEPT, DECLINE, ON_HOLD, DELETE;
		public static Optional<ContactState> check(String val) {
			try {
				return Optional.of(ContactState.valueOf(val));
			}
			catch (Exception e) {
				e.printStackTrace();
				return Optional.empty();
			}
		}
	}

}
