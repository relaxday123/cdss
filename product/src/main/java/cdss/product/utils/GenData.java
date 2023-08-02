package cdss.product.utils;

import java.util.*;

public class GenData {
    private static final Random RANDOM = new Random();
    private static final List<String> SYMPTOMS = Arrays.asList(
            "\"Chest Pain\"", "\"High BP\"", "\"Heart Disease\"", "\"Smoking\"", "\"Obesity\"",
            "\"Diabetes\"", "\"Symptom 7\"", "\"Symptom 8\"", "\"Symptom 9\"", "\"Symptom 10\"",
            "\"Symptom 11\"", "\"Symptom 12\"", "\"Symptom 13\"", "\"Symptom 14\"", "\"Symptom 15\""
    );

    private static Set<String> generatePatientRecord() {
        List<String> copyOfSymptoms = new ArrayList<>(SYMPTOMS);
        Collections.shuffle(copyOfSymptoms);  // Randomize the list

        Random random = new Random();

        return new HashSet<>(copyOfSymptoms.subList(0, (random.nextInt(10 - 2) + 2)));  // Get the first 10 symptoms
    }

    public static void main(String[] args) {
        List<Set<String>> patientRecords = new ArrayList<>();
        for (int i = 0; i < 1000; i++) {
            patientRecords.add(generatePatientRecord());
        }

        // Print the patient records
        for (Set<String> patientRecord : patientRecords) {
            System.out.println(patientRecord + ",");
        }
    }
}
