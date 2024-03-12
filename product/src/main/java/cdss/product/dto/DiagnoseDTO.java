package cdss.product.dto;

import cdss.product.model.Rule;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Data
@Getter
@Setter
public class DiagnoseDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;

    @NotBlank(message = "The age is required.")
    @Min(20)
    @Max(79)
    private int age;

    @NotBlank(message = "The sex is required.")
    private String sex;

    @NotBlank(message = "The cp is required.")
    private String cp;

    @NotBlank(message = "The trestbps is required.")
    private int trestbps;

    @NotBlank(message = "The chol is required.")
    private int chol;

    @NotBlank(message = "The fbs is required.")
    private String fbs;

    @NotBlank(message = "The restecg is required.")
    private String restecg;

    @NotBlank(message = "The thalach is required.")
    private int thalach;

    private String exang;

    private double oldpeak;

    private String slope;

    private Integer ca;

    private String thal;

    private String result;

    private LocalDate date;

    private String classify;

    private List<Rule> rules;
}
