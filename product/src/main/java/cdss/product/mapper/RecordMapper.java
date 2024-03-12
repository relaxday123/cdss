package cdss.product.mapper;

import cdss.product.dto.DiagnoseDTO;
import cdss.product.dto.PreproDataDTO;
import cdss.product.dto.RecordDTO;
import cdss.product.exception.RecordException;
import cdss.product.model.PreproData;
import cdss.product.model.Record;
import cdss.product.service.UserService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class RecordMapper {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    ModelMapper modelMapper;

    public RecordDTO convertToDto(Record record) {
        try {
            RecordDTO dto = modelMapper.map(record, RecordDTO.class);
            dto.setDate(record.getDate());

            return dto;
        }
        catch (Exception ex) {
            throw new RuntimeException("Failed to convert record");
        }
    }

    public DiagnoseDTO convertToDiagnose(RecordDTO dto) {
        try {
            return modelMapper.map(dto, DiagnoseDTO.class);
        }
        catch (Exception ex) {
            logger.warn(ex.getMessage());
            throw new RecordException(RecordException.ERR_CONVERT_DTO_ENTITY_FAIL);
        }
    }

    public Record convertToEntity(RecordDTO dto) {
        try {
            return modelMapper.map(dto, Record.class);
        }
        catch (Exception ex) {
            logger.warn(ex.getMessage());
            throw new RecordException(RecordException.ERR_CONVERT_DTO_ENTITY_FAIL);
        }
    }

    public PreproDataDTO convertToPreproDataDto(RecordDTO record) {
        try {
            PreproDataDTO dto = new PreproDataDTO();
            dto.setAge(discretizeAge(record.getAge()));
            dto.setSex(discretizeSex(record.getSex()));
            dto.setCp(discretizeCp(record.getCp()));
            dto.setTrestbps(discretizeTrestbps(record.getTrestbps()));
            dto.setChol(discretizeChol(record.getChol()));
            dto.setFbs(discretizeFbs(record.getFbs()));
            dto.setRestecg(discretizeRestecg(record.getRestecg()));
            dto.setThalach(discretizeThalach(record.getThalach()));
            dto.setExang(discretizeExang(record.getExang()));
//            dto.setOldpeak(discretizeOldpeak(record.getOldpeak()));
            dto.setSlope(discretizeSlope(record.getSlope()));
//            dto.setCa(discretizeCa(record.getCa()));
//            dto.setThal(discretizeThal(record.getThal()));
            dto.setClassify(String.valueOf(record.getClassify()));

            return dto;
        }
        catch (Exception ex) {
            throw new RuntimeException("Failed to convert prepro data");
        }
    }

    public PreproDataDTO convertToPreproDataDto(PreproData data) {
        try {

            return modelMapper.map(data, PreproDataDTO.class);
        }
        catch (Exception ex) {
            throw new RuntimeException("Failed to convert prepro data");
        }
    }

    public PreproData convertToPreproData(PreproDataDTO data) {
        try {
            return modelMapper.map(data, PreproData.class);
        }
        catch (Exception ex) {
            throw new RuntimeException("Failed to convert prepro data");
        }
    }

    public Set<String> convertToSetString(PreproDataDTO data) {
        // Convert each field of the record into a string and add it to the set
        // Example: recordSet.add("age_" + record.getAge());
        // Modify based on your RecordDTO class structure
        return new HashSet<>(
                Arrays.asList(
                        String.valueOf(data.getAge()),
                        String.valueOf(data.getSex()),
                        String.valueOf(data.getCp()),
                        String.valueOf(data.getTrestbps()),
                        String.valueOf(data.getChol()),
                        String.valueOf(data.getFbs()),
                        String.valueOf(data.getRestecg()),
                        String.valueOf(data.getThalach()),
                        String.valueOf(data.getExang()),
//                        String.valueOf(data.getOldpeak()),
                        String.valueOf(data.getSlope())
//                        String.valueOf(data.getCa()),
//                        String.valueOf(data.getThal()),
//                        String.valueOf(data.getClassify())
                )
        );
    }

    public List<String> preprocessing(RecordDTO record) {

        return new ArrayList<>(
                Arrays.asList(
                        discretizeAge(record.getAge()),
                        discretizeSex(record.getSex()),
                        discretizeCp(record.getCp()),
                        discretizeTrestbps(record.getTrestbps()),
                        discretizeChol(record.getChol()),
                        discretizeFbs(record.getFbs()),
                        discretizeRestecg(record.getRestecg()),
                        discretizeThalach(record.getThalach()),
                        discretizeExang(record.getExang()),
//                        discretizeOldpeak(record.getOldpeak()),
                        discretizeSlope(record.getSlope())
//                        discretizeCa(record.getCa())
//                        discretizeThal(record.getThal())
                )
        );
    }

    public List<String> preprocessing(Record record) {

        return new ArrayList<>(
                Arrays.asList(
                        discretizeAge(record.getAge()),
                        discretizeSex(record.getSex()),
                        discretizeCp(record.getCp()),
                        discretizeTrestbps(record.getTrestbps()),
                        discretizeChol(record.getChol()),
                        discretizeFbs(record.getFbs()),
                        discretizeRestecg(record.getRestecg()),
                        discretizeThalach(record.getThalach()),
                        discretizeExang(record.getExang()),
//                        discretizeOldpeak(record.getOldpeak()),
                        discretizeSlope(record.getSlope())
//                        discretizeCa(record.getCa())
//                        discretizeThal(record.getThal())
                )
        );
    }

    static String discretizeAge(int value) {
        if (value <= 40) {
            return "A0";
        } else if (value < 60) {
            return "A1";
        } else {
            return "A2";
        }
    }

//    static String discretizeAge(int value) {
//        if (value <= 54) {
//            return "A0";
//        } else {
//            return "A1";
//        }
//    }

    static String discretizeSex(String value) {
        if (value.equals("male")) {
            return "B0";
        } else {
            return "B1";
        }
    }

    static String discretizeCp(String value) {
        return switch (value) {
            case "angina" -> "C0";
            case "abnang" -> "C1";
            case "notang" -> "C2";
            case "asympt" -> "C3";
            default -> "";
        };
    }

    static String discretizeTrestbps(int value) {
        if (value < 90) {
            return "D0";
        } else if (value < 120) {
            return "D1";
        } else {
            return "D2";
        }
    }

//    static String discretizeTrestbps(int value) {
//        if (value <= 130) {
//            return "D0";
//        } else {
//            return "D1";
//        }
//    }

    static String discretizeChol(int value) {
        if (value < 190) {
            return "E0";
        } else if (value < 240) {
            return "E1";
        } else {
            return "E2";
        }
    }

//    static String discretizeChol(int value) {
//        if (value <= 230) {
//            return "E0";
//        } else {
//            return "E1";
//        }
//    }

    static String discretizeFbs(String value) {
        if (value.equals("true")) {
            return "F0";
        } else {
            return "F1";
        }
    }

    static String discretizeRestecg(String value) {
        return switch (value) {
            case "norm" -> "G0";
            case "abn" -> "G1";
            case "hyp" -> "G2";
            default -> "";
        };
    }

    static String discretizeThalach(int value) {
        if (value < 110) {
            return "H0";
        } else if (value < 150) {
            return "H1";
        } else {
            return "H2";
        }
    }

//    static String discretizeThalach(int value) {
//        if (value <= 140) {
//            return "H0";
//        } else {
//            return "H1";
//        }
//    }

    static String discretizeExang(String value) {
        if (value.equals("true")) {
            return "I0";
        } else {
            return "I1";
        }
    }

    static String discretizeOldpeak(double value) {
        if (value <= 0.8) {
            return "J0";
        } else {
            return "J1";
        }
    }

    static String discretizeSlope(String value) {
        return switch (value) {
            case "up" -> "K0";
            case "flat" -> "K1";
            case "down" -> "K2";
            default -> "";
        };
    }

    static String discretizeCa(Integer value) {
        return switch (value) {
            case 0 -> "L0";
            case 1 -> "L1";
            case 2 -> "L2";
            case 3 -> "L3";
            default -> "";
        };
    }

    static String discretizeThal(String value) {
        return switch (value) {
            case "norm" -> "M0";
            case "fix" -> "M1";
            case "rev" -> "M2";
            default -> "";
        };
    }
}
