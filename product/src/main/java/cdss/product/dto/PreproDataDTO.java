package cdss.product.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

@Data
@Getter
@Setter
public class PreproDataDTO {

    private String age;

    private String sex;

    private String cp;

    private String trestbps;

    private String chol;

    private String fbs;

    private String restecg;

    private String thalach;

    private String exang;

    private String oldpeak;

    private String slope;

    private String ca;

    private String thal;

    private String classify;

    private String type;
}
