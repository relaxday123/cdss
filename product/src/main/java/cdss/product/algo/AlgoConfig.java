package cdss.product.algo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class AlgoConfig {

	@Bean
	public Map<String, String> labelMap() {
		Map<String, String> labelMapping = new HashMap<>();
		labelMapping.put("A0", "Age < 40");
		labelMapping.put("A1", "Age from 40 to 60");
		labelMapping.put("A2", "Age > 60");

		labelMapping.put("B0", "Male");
		labelMapping.put("B1", "Female");

		labelMapping.put("C0", "Cp: Typical");
		labelMapping.put("C1", "Cp: Atypical");
		labelMapping.put("C2", "Cp: Non-Anginal Pain");
		labelMapping.put("C3", "Cp: Asymptomatic");

		labelMapping.put("D0", "Trestbps: Normal");
		labelMapping.put("D1", "Trestbps: At Risk");
		labelMapping.put("D2", "Trestbps: High Blood Pressure");

		labelMapping.put("E0", "Chol: Normal");
		labelMapping.put("E1", "Chol: Borderline High");
		labelMapping.put("E2", "Chol: High");

		labelMapping.put("F0", "Fbs: True");
		labelMapping.put("F1", "Fbs: False");

		labelMapping.put("G0", "Restecg: Normal");
		labelMapping.put("G1", "Restecg: Abnormality");
		labelMapping.put("G2", "Restecg: Left Ventricular Hypertrophy");

		labelMapping.put("H0", "Thalach: < 150");
		labelMapping.put("H1", "Thalach: >= 150");

		labelMapping.put("I0", "Exang: True");
		labelMapping.put("I1", "Exang: False");

		labelMapping.put("K0", "Slope: Upsloping");
		labelMapping.put("K1", "Slope: Flat");
		labelMapping.put("K2", "Slope: Downsloping");

		labelMapping.put("L0", "Ca: 1");
		labelMapping.put("L1", "Ca: 2");
		labelMapping.put("L2", "Ca: 3");

		return labelMapping;
	}
}
