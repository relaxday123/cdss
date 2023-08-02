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
@Table(name = "rule")
public class Rule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "antecedent")
    private String antecedent;

    @Column(name = "consequent")
    private String consequent;

    @Column(name = "support")
    private Double support;

    @Column(name = "confidence")
    private Double confidence;
}
