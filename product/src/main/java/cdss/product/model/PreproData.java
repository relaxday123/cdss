package cdss.product.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "preprodata")
public class PreproData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "age")
    private String age;

    @Column(name = "sex")
    private String sex;

    @Column(name = "cp")
    private String cp;

    @Column(name = "trestbps")
    private String trestbps;

    @Column(name = "chol")
    private String chol;

    @Column(name = "fbs")
    private String fbs;

    @Column(name = "restecg")
    private String restecg;

    @Column(name = "thalach")
    private String thalach;

    @Column(name = "exang")
    private String exang;

    @Column(name = "oldpeak")
    private String oldpeak;

    @Column(name = "slope")
    private String slope;

    @Column(name = "ca")
    private String ca;

    @Column(name = "thal")
    private String thal;

    @Column(name = "classify")
    private String classify;

    @Column(name = "type")
    private String type;
}
