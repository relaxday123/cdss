package cdss.product.service;

import cdss.product.algo.Apriori;
import cdss.product.dto.PreproDataDTO;
import cdss.product.dto.RecordDTO;
import cdss.product.mapper.RecordMapper;
import cdss.product.model.PreproData;
import cdss.product.model.Record;
import cdss.product.model.Rule;
import cdss.product.repository.PreproDataRepository;
import cdss.product.repository.RecordRepository;
import cdss.product.repository.RuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AprioriService {

    @Autowired
    private RecordRepository recordRepository;

    @Autowired
    private PreproDataRepository preproDataRepository;

    @Autowired
    private RuleRepository ruleRepository;

    @Autowired
    private RecordMapper recordMapper;

    public List<Rule> matchingRules(Long id) {

        Optional<Record> record = recordRepository.findById(id);

        List<String> processedRecord = recordMapper.preprocessing(record.get());

        // Step 4: Query the Database
//        List<Rule> rules = ruleRepository.findAllByConsequent("sick"); // Use appropriate query methods based on your data model
        List<Rule> rules = ruleRepository.findAll(); // Use appropriate query methods based on your data model

        // Step 5: Apply Filtering
        double threshold = 0.5;
//        List<Rule> matchingRules = new ArrayList<>();
        Map<Rule, Double> ruleMatchingPercentageMap = new HashMap<>();
        for (Rule rule : rules) {
            String ant = rule.getAntecedent();
            String[] antecedent = ant.split(", ");

            // Create a list to store the individual parts
            List<String> antecedents = new ArrayList<>();

            // Add each part to the list
            for (String att : antecedent) {
                antecedents.add(att);
            }

            int totalAntecedents = antecedents.size();
            int matchedAntecedents = 0;

            for (String attribute : processedRecord) {
                if (antecedents.contains(attribute)) {
                    matchedAntecedents++;
                }
            }

            double matchingPercentage = (double) matchedAntecedents / totalAntecedents;
            if (matchingPercentage >= threshold) {
//                matchingRules.add(rule);
                ruleMatchingPercentageMap.put(rule, matchingPercentage);
            }
        }

        List<Map.Entry<Rule, Double>> sortedMatchingRules = new ArrayList<>();
        for (Map.Entry<Rule, Double> entry : ruleMatchingPercentageMap.entrySet()) {
            Rule rule = entry.getKey();
            double matchingPercentage = entry.getValue();

            if (matchingPercentage >= threshold) {
                sortedMatchingRules.add(entry);
            }
        }

        // Sort the matchingRules list based on matchingPercentage in descending order
        Collections.sort(sortedMatchingRules, new Comparator<Map.Entry<Rule, Double>>() {
            @Override
            public int compare(Map.Entry<Rule, Double> entry1, Map.Entry<Rule, Double> entry2) {
                // Sort in descending order based on matchingPercentage
                return Double.compare(entry2.getValue(), entry1.getValue());
            }
        });

        List<Map.Entry<Rule, Double>> filterMostMatchPercentage = sortedMatchingRules
                .stream().filter(map -> map.getValue().equals(sortedMatchingRules.get(0).getValue()))
                .sorted(new Comparator<Map.Entry<Rule, Double>>() {
                    @Override
                    public int compare(Map.Entry<Rule, Double> o1, Map.Entry<Rule, Double> o2) {
                        if (o1.getKey().getAntecedent().length() < o2.getKey().getAntecedent().length()) {
                            return 1;
                        } else if (o1.getKey().getAntecedent().length() > o2.getKey().getAntecedent().length()) {
                            return -1;
                        } else {
                            return 0;
                        }
                    }
                })
                .collect(Collectors.toList());

//        List<Rule> matchingRules = new ArrayList<>();
//        for (Map.Entry<Rule, Double> entry : ruleMatchingPercentageMap.entrySet()) {
//            Rule rule = entry.getKey();
//            double matchingPercentage = entry.getValue();
//
//            if (matchingPercentage >= threshold) {
//                matchingRules.add(rule);
//            }
//        }

        List<Rule> matchingRules = new ArrayList<>();
        for (Map.Entry<Rule, Double> entry : filterMostMatchPercentage) {
            Rule rule = entry.getKey();
            matchingRules.add(rule);
        }

        // Step 6: Rank the Rules
//        matchingRules.sort(Comparator.comparing(Rule::getConfidence).reversed()
//                .thenComparing(Comparator.comparing(Rule::getSupport).reversed()));

        return matchingRules;
    }

    public List<Rule> matchingRules(RecordDTO record) {

        List<String> processedRecord = recordMapper.preprocessing(record);

        // Step 4: Query the Database
//        List<Rule> rules = ruleRepository.findAllByConsequent("sick"); // Use appropriate query methods based on your data model
        List<Rule> rules = ruleRepository.findAll(); // Use appropriate query methods based on your data model

        // Step 5: Apply Filtering
        double threshold = 0.5;
        Map<Rule, Double> ruleMatchingPercentageMap = new HashMap<>();

        // filter rules that have larger matching threshold
        for (Rule rule : rules) {
            String ant = rule.getAntecedent();
            String[] antecedent = ant.split(", ");

            // Create a list to store the individual parts
            List<String> antecedents = new ArrayList<>();

            // Add each part to the list
            for (String att : antecedent) {
                antecedents.add(att);
            }

            int totalAntecedents = antecedents.size();
            int matchedAntecedents = 0;

            for (String attribute : processedRecord) {
                if (antecedents.contains(attribute)) {
                    matchedAntecedents++;
                }
            }

            double matchingPercentage = (double) matchedAntecedents / totalAntecedents;
            if (matchingPercentage >= threshold) {
//                matchingRules.add(rule);
                ruleMatchingPercentageMap.put(rule, matchingPercentage);
            }
        }

        List<Map.Entry<Rule, Double>> sortedMatchingRules = new ArrayList<>();
        for (Map.Entry<Rule, Double> entry : ruleMatchingPercentageMap.entrySet()) {
            Rule rule = entry.getKey();
            double matchingPercentage = entry.getValue();

            if (matchingPercentage >= threshold) {
                sortedMatchingRules.add(entry);
            }
        }

        // Sort the matchingRules list based on matchingPercentage in descending order
        Collections.sort(sortedMatchingRules, new Comparator<Map.Entry<Rule, Double>>() {
            @Override
            public int compare(Map.Entry<Rule, Double> entry1, Map.Entry<Rule, Double> entry2) {
                // Sort in descending order based on matchingPercentage
                return Double.compare(entry2.getValue(), entry1.getValue());
            }
        });

        // Only get rules that have most match percentage and sort by antecedent length
        List<Map.Entry<Rule, Double>> filterMostMatchPercentage = sortedMatchingRules
                .stream().filter(map -> map.getValue().equals(sortedMatchingRules.get(0).getValue()))
                .sorted(new Comparator<Map.Entry<Rule, Double>>() {
                    @Override
                    public int compare(Map.Entry<Rule, Double> o1, Map.Entry<Rule, Double> o2) {
                        if (o1.getKey().getAntecedent().length() < o2.getKey().getAntecedent().length()) {
                            return 1;
                        } else if (o1.getKey().getAntecedent().length() > o2.getKey().getAntecedent().length()) {
                            return -1;
                        } else {
                            return 0;
                        }
                    }
                })
                .collect(Collectors.toList());

//        List<Rule> matchingRules = new ArrayList<>();
//        for (Map.Entry<Rule, Double> entry : ruleMatchingPercentageMap.entrySet()) {
//            Rule rule = entry.getKey();
//            double matchingPercentage = entry.getValue();
//
//            if (matchingPercentage >= threshold) {
//                matchingRules.add(rule);
//            }
//        }

        List<Rule> matchingRules = new ArrayList<>();
        for (Map.Entry<Rule, Double> entry : filterMostMatchPercentage) {
            Rule rule = entry.getKey();
            matchingRules.add(rule);
        }

        // Step 6: Rank the Rules
//        matchingRules.sort(Comparator.comparing(Rule::getConfidence).reversed()
//                .thenComparing(Comparator.comparing(Rule::getSupport).reversed()));

        return matchingRules;
    }

    public String preprocessingData() {
        List<Record> records = recordRepository.findAll();
        List<RecordDTO> transactions = new ArrayList<>();
        for (Record record : records) {
            RecordDTO recordDTO = recordMapper.convertToDto(record);
            transactions.add(recordDTO);
        }

        for (RecordDTO transaction : transactions) {
            PreproDataDTO dto = recordMapper.convertToPreproDataDto(transaction);
            PreproData entity = recordMapper.convertToPreproData(dto);
            PreproData preproData = preproDataRepository.save(entity);

            if (preproData.equals(null)) {
                return "failed";
            }
        }

        return "success";
    }

    public Map<Set<String>, Map<Set<String>, Double>> runApriori(double minSupport, double minConf, int numItems) {
//        Pageable limit = PageRequest.of(0, 100);
//        List<Record> records = recordRepository.findByAgeLessThanOrderByAgeDesc("50");
//        List<Record> records = recordRepository.findAll();
//        for (Record record : records) {
//            RecordDTO recordDTO = recordMapper.convertToDto(record);
//            transactions.add(recordDTO);
//        }
//
//        for (RecordDTO transaction : transactions) {
//            PreproDataDTO dto = recordMapper.convertToPreproDataDto(transaction);
//            PreproData entity = recordMapper.convertToPreproData(dto);
//            preproDataRepository.save(entity);
//        }

        List<PreproData> datas = preproDataRepository.findAll();
        List<PreproDataDTO> transactions = new ArrayList<>();
        for (PreproData data : datas) {
            PreproDataDTO dto = recordMapper.convertToPreproDataDto(data);
            transactions.add(dto);
        }

        Apriori apriori = new Apriori(transactions, minSupport, numItems);
        Set<Set<String>> frequentItemsets = apriori.run();
        Map<Set<String>, Map<Set<String>, Double>> confidences = apriori.calculateConfidence(frequentItemsets, minConf);

        return confidences;
    }

    public List<Record> get() {
        return recordRepository.findByAgeLessThanOrderByAgeDesc("50");
    }
}
