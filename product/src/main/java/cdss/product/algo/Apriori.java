package cdss.product.algo;

import cdss.product.dto.PreproDataDTO;
import cdss.product.dto.RecordDTO;
import cdss.product.mapper.RecordMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

public class Apriori {

    private final List<Set<String>> transactions;
    private final int numItems;
    private final int minSupport;

    public Apriori(List<PreproDataDTO> transactions, double minSupportPercentage, int numItems) {
        this.transactions = new ArrayList<>();
        RecordMapper recordMapper = new RecordMapper();
        for (PreproDataDTO transaction : transactions) {
            Set<String> convertedTransaction = recordMapper.convertToSetString(transaction);
            this.transactions.add(convertedTransaction);
        }
        this.minSupport = (int) Math.ceil(minSupportPercentage * transactions.size());
        this.numItems = numItems;
    }

    public Set<Set<String>> run() {
        Set<Set<String>> candidates = new HashSet<>();
        for (Set<String> transaction : transactions) {
            for (String item : transaction) {
                candidates.add(Collections.singleton(item));
            }
        }

        Set<Set<String>> frequentItemsets = findFrequentItemsets(candidates);
        Set<Set<String>> allFrequentItemsets = new HashSet<>(frequentItemsets);

        int k = 2;
        while (!frequentItemsets.isEmpty()) {
            candidates = generateCandidates(frequentItemsets, k);
            frequentItemsets = findFrequentItemsets(candidates);
//            allFrequentItemsets.addAll(frequentItemsets);
            for (Set<String> itemset : frequentItemsets) {
                if (itemset.size() > numItems) {
                    allFrequentItemsets.add(itemset);
                }
            }

            k++;
        }

        return allFrequentItemsets;
    }

    private Set<Set<String>> findFrequentItemsets(Set<Set<String>> candidates) {
        Map<Set<String>, Integer> counts = new HashMap<>();

        for (Set<String> transaction : transactions) {
            for (Set<String> candidate : candidates) {
                if (transaction.containsAll(candidate)) {
                    counts.put(candidate, counts.getOrDefault(candidate, 0) + 1);
                }
            }
        }

        Set<Set<String>> frequentItemsets = new HashSet<>();
        for (Map.Entry<Set<String>, Integer> entry : counts.entrySet()) {
            if (entry.getValue() >= minSupport) {
                frequentItemsets.add(entry.getKey());
            }
        }

        return frequentItemsets;
    }

    private Set<Set<String>> generateCandidates(Set<Set<String>> frequentItemsets, int length) {
        Set<Set<String>> candidates = new HashSet<>();

        for (Set<String> itemset1 : frequentItemsets) {
            for (Set<String> itemset2 : frequentItemsets) {
                if (itemset1.size() == length - 1 && itemset2.size() == length - 1) {
                    Set<String> union = new HashSet<>(itemset1);
                    union.addAll(itemset2);

                    if (union.size() == length) {
                        candidates.add(union);
                    }
                }
            }
        }

        return candidates;
    }

    private double calculateSupport(Set<String> itemset) {
        double count = 0;

        for (Set<String> transaction : transactions) {
            if (transaction.containsAll(itemset)) {
                count++;
            }
        }

        return count / transactions.size();
    }

    public Map<Set<String>, Map<Set<String>, Double>> calculateConfidence(Set<Set<String>> frequentItemsets, double minConfidence) {
        Map<Set<String>, Map<Set<String>, Double>> allConfidences = new HashMap<>();

        for (Set<String> itemset : frequentItemsets) {
            if (itemset.size() <= 1) continue;  // No point calculating confidence for single-item itemsets

            Map<Set<String>, Double> itemConfidences = new HashMap<>();

            for (String item : itemset) {
                if(!itemset.contains("sick")) continue;
                Set<String> subset = new HashSet<>(itemset);
                subset.remove(item);  // Create subset by removing the current item

                if(subset.contains("sick")) continue;

                double confidence = calculateSupport(itemset) / calculateSupport(subset);
                if(confidence >= minConfidence) {
                    itemConfidences.put(subset, confidence);
                }
            }

            if(!itemConfidences.isEmpty()) {
                allConfidences.put(itemset, itemConfidences);
            }
        }

        return allConfidences;
    }
}

//public class Apriori {
//
//    private final List<Set<String>> transactions;
//    private Map<Set<String>, List<Set<String>>> itemsetTransactions;
//    private final int minSupport;
//    private final int numItems;
//
//    public Apriori(List<RecordDTO> transactions, int minSupport, int numItems) {
//        this.transactions = new ArrayList<>();
//        RecordMapper recordMapper = new RecordMapper();
//        for (RecordDTO transaction : transactions) {
//            Set<String> convertedTransaction = recordMapper.preprocessing(transaction);
//            this.transactions.add(convertedTransaction);
//        }
//        this.minSupport = minSupport;
//        this.numItems = numItems;
//        this.itemsetTransactions = new HashMap<>();
//    }
//
//    public Set<Set<String>> run() {
//        this.itemsetTransactions.clear();
//        Set<Set<String>> candidates = generateInitialCandidates();
//        Set<Set<String>> frequentItemsets = findFrequentItemsets(candidates);
//        int k = 2;
//        while (!frequentItemsets.isEmpty()) {
//            candidates = generateCandidates(frequentItemsets, k);
//            frequentItemsets = findFrequentItemsets(candidates);
//            k++;
//        }
//
//        return itemsetTransactions.keySet().stream()
//                .filter(itemset -> itemset.size() >= numItems)
//                .collect(Collectors.toSet());
//    }
//
//    private Set<Set<String>> generateInitialCandidates() {
//        Set<Set<String>> candidates = new HashSet<>();
//        for (Set<String> transaction : transactions) {
//            for (String item : transaction) {
//                Set<String> candidate = Collections.singleton(item);
//                candidates.add(candidate);
//                itemsetTransactions.computeIfAbsent(candidate, k -> new ArrayList<>()).add(transaction);
//            }
//        }
//        return candidates;
//    }
//
//    private Set<Set<String>> findFrequentItemsets(Set<Set<String>> candidates) {
//        Map<Set<String>, Integer> counts = new HashMap<>();
//
//        for (Set<String> candidate : candidates) {
//            for (Set<String> transaction : transactions) {
//                if (transaction.containsAll(candidate)) {
//                    counts.put(candidate, counts.getOrDefault(candidate, 0) + 1);
//                    itemsetTransactions.computeIfAbsent(candidate, k -> new ArrayList<>()).add(transaction);
//                }
//            }
//        }
//
//        Set<Set<String>> frequentItemsets = new HashSet<>();
//        for (Map.Entry<Set<String>, Integer> entry : counts.entrySet()) {
//            if (entry.getValue() >= minSupport) {
//                frequentItemsets.add(entry.getKey());
//            }
//        }
//        return frequentItemsets;
//    }
//
//    private Set<Set<String>> generateCandidates(Set<Set<String>> frequentItemsets, int length) {
//        Set<Set<String>> candidates = new HashSet<>();
//        for (Set<String> itemset1 : frequentItemsets) {
//            for (Set<String> itemset2 : frequentItemsets) {
//                Set<String> union = new HashSet<>(itemset1);
//                union.addAll(itemset2);
//                if (union.size() == length) {
//                    candidates.add(union);
//                }
//            }
//        }
//        return candidates;
//    }
//
//    public Map<Set<String>, Map<Set<String>, Double>> calculateConfidence(Set<Set<String>> frequentItemsets, double minConfidence) {
//        Map<Set<String>, Map<Set<String>, Double>> allConfidences = new HashMap<>();
//        for (Set<String> itemset : frequentItemsets) {
//            if (itemset.size() < 2) continue;
//            Map<Set<String>, Double> itemConfidences = new HashMap<>();
//            for (String item : itemset) {
//                if(!itemset.contains("sick")) continue;
//
//                Set<String> subset = new HashSet<>(itemset);
//                subset.remove(item);
//
//                if(subset.contains("sick")) continue;
//
//                double confidence = calculateSupport(itemset) / calculateSupport(subset);
//                if (confidence >= minConfidence) {
//                    itemConfidences.put(subset, confidence);
//                }
//            }
//            if (!itemConfidences.isEmpty()) {
//                allConfidences.put(itemset, itemConfidences);
//            }
//        }
//        return allConfidences;
//    }
//
//    private double calculateSupport(Set<String> itemset) {
//        List<Set<String>> transactionList = itemsetTransactions.get(itemset);
//        return transactionList != null ? (double) transactionList.size() / transactions.size() : 0;
//    }
//}


