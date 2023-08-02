package cdss.product.algo;

import java.util.*;

public class HeartDiseaseEvaluation {

    private HashMap<Set<String>, Integer> itemSetCountMap = new HashMap<>();

    public double evaluate(List<Set<String>> transactions, Set<String> symptoms) {
        for (Set<String> transaction : transactions) {
            getAllSubsets(transaction).forEach(itemSet ->
                    itemSetCountMap.put(itemSet, itemSetCountMap.getOrDefault(itemSet, 0) + 1));
        }

        Set<String> symptomsWithDisease = new HashSet<>(symptoms);
        symptomsWithDisease.add("HeartDisease");

        // Support of item set is the number of transactions that contain the item set
        double symptomsSupport = itemSetCountMap.getOrDefault(symptoms, 0);
        double symptomsWithDiseaseSupport = itemSetCountMap.getOrDefault(symptomsWithDisease, 0);

        if (symptomsSupport == 0) {
            return 0.0;
        }

        // Confidence(A => B) = support(A ∪ B) / support(A)
        double confidence = symptomsWithDiseaseSupport / symptomsSupport;
        return confidence * 100;
    }

    private Set<Set<String>> getAllSubsets(Set<String> set) {
        Set<Set<String>> subsetCollection = new HashSet<>();

        if (set.isEmpty()) {
            subsetCollection.add(new HashSet<>());
            return subsetCollection;
        }

        List<String> list = new ArrayList<>(set);

        String first = list.get(0);
        Set<String> rest = new HashSet<>(list.subList(1, list.size()));

        for (Set<String> subset : getAllSubsets(rest)) {
            subsetCollection.add(subset);

            Set<String> subsetWithFirst = new HashSet<>(subset);
            subsetWithFirst.add(first);
            subsetCollection.add(subsetWithFirst);
        }

        return subsetCollection;
    }

    public static void main(String[] args) {
        List<Set<String>> transactions = Arrays.asList(
                new HashSet<>(Arrays.asList("Symptom1", "Symptom2", "HeartDisease")),
                new HashSet<>(Arrays.asList("Symptom1", "Symptom3")),
                new HashSet<>(Arrays.asList("Symptom2", "Symptom3", "HeartDisease")),
                new HashSet<>(Arrays.asList("Symptom1", "Symptom2", "Symptom3", "HeartDisease")),
                new HashSet<>(Arrays.asList("Symptom1", "Symptom2")),
                new HashSet<>(Arrays.asList("Symptom4", "HeartDisease")),
                new HashSet<>(Arrays.asList("Symptom2", "Symptom4", "HeartDisease")),
                new HashSet<>(Arrays.asList("Symptom5", "Symptom6")),
                new HashSet<>(Arrays.asList("Symptom6")),
                new HashSet<>(Arrays.asList("Symptom7", "HeartDisease")),
                new HashSet<>(Arrays.asList("Symptom8", "Symptom1", "Symptom2")),
                new HashSet<>(Arrays.asList("Symptom9", "Symptom3", "Symptom4")),
                new HashSet<>(Arrays.asList("Symptom10", "Symptom5", "Symptom6",  "HeartDisease")),
                new HashSet<>(Arrays.asList("Symptom1",  "Symptom3", "Symptom5", "HeartDisease")),
                new HashSet<>(Arrays.asList("Symptom2",  "Symptom4", "Symptom6")),
                new HashSet<>(Arrays.asList("Symptom3","Symptom4", "Symptom5")),
                new HashSet<>(Arrays.asList("Symptom5",  "Symptom6", "Symptom7", "HeartDisease")),
                new HashSet<>(Arrays.asList("Symptom9",  "HeartDisease")),
                new HashSet<>(Arrays.asList("Symptom2")),
                new HashSet<>(Arrays.asList("Symptom10", "Symptom5", "Symptom6", "Symptom7", "Symptom1", "HeartDisease")),
                new HashSet<>(Arrays.asList("Symptom8")),
                new HashSet<>(Arrays.asList("Symptom2",  "Symptom3", "Symptom5", "HeartDisease")),
                new HashSet<>(Arrays.asList("Symptom7"))
        );

        Set<String> symptoms = new HashSet<>(Arrays.asList("Symptom1", "Symptom8"));

        HeartDiseaseEvaluation evaluation = new HeartDiseaseEvaluation();
        double percentage = evaluation.evaluate(transactions, symptoms);

        System.out.println("The percentage of patients with symptoms " + symptoms + " getting heart disease is: " + percentage + "%");
    }
}
