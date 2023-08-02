package cdss.product.service;

import cdss.product.dto.RecordDTO;
import cdss.product.dto.UserDTO;
import cdss.product.exception.RecordException;
import cdss.product.exception.UserException;
import cdss.product.mapper.RecordMapper;
import cdss.product.model.User;
import cdss.product.model.Record;
import cdss.product.repository.RecordRepository;
import cdss.product.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class RecordService {

    @Autowired
    private RecordRepository recordRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecordMapper recordMapper;


    public List<RecordDTO> getRecord(String username) {
        Optional<User> user = userRepository.findByUsername(username);

        List<Record> records = recordRepository.findAllByUserId(user.get().getUserId());

        List<RecordDTO> recordDTOList = records.stream()
                .filter(record -> !record.getIsDeleted())
                .map(record -> recordMapper.convertToDto(record))
                .collect(Collectors.toList());

        return recordDTOList;
    }

    public RecordDTO postRecord(String username, RecordDTO record) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UserException(UserException.USER_NOT_FOUND));

        Record recordEntity = recordMapper.convertToEntity(record);
        try {
            recordEntity.setIsDeleted(false);
            recordEntity.setUser(user);
            recordEntity.setDate(LocalDate.now());
            return recordMapper.convertToDto(recordRepository.save(recordEntity));
        } catch (Exception ex) {
            throw new RecordException(RecordException.CREATE_RECORD_FAIL);
        }
    }

    public RecordDTO disableRecord(Long id) {
        Record toDisableRecord = recordRepository.findById(id)
                .orElseThrow(() -> new RecordException(RecordException.RECORD_NOT_FOUND));
        toDisableRecord.setIsDeleted(true);
        RecordDTO result = recordMapper.convertToDto(recordRepository.save(toDisableRecord));
        return result;
    }
}
