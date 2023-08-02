package cdss.product.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "name", length = 50)
    @NotNull
    private String name;

    @Column(name = "username")
    @NotNull
    private String username;

    @Column(name = "password")
    @NotNull
    private String password;

    @Column(name = "role", length = 50)
    @NotNull
    private String roles;

    @Column(name = "email")
    @NotNull
    private String email;

    @OneToMany(mappedBy="user", cascade = CascadeType.ALL)
    private List<Record> records;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public enum ERole {
        ADMIN, PATIENT
    }
}
