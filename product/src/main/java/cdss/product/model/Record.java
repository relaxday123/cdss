package cdss.product.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "records")
public class Record implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "age")
    private int age;

    @Column(name = "sex")
    private String sex;

    @Column(name = "cp")
    private String cp;

    @Column(name = "trestbps")
    private int trestbps;

    @Column(name = "chol")
    private int chol;

    @Column(name = "fbs")
    private String fbs;

    @Column(name = "restecg")
    private String restecg;

    @Column(name = "thalach")
    private int thalach;

    @Column(name = "exang")
    private String exang;

    @Column(name = "oldpeak")
    private double oldpeak;

    @Column(name = "slope")
    private String slope;

    @Column(name = "ca")
    private Integer ca;

    @Column(name = "thal")
    private String thal;

    @Column(name = "classify")
    private String classify;

    @Column(name = "type")
    private String type;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @ManyToOne
    @JoinColumn(name="user_id", nullable=false, referencedColumnName = "user_id")
    private User user;
}
