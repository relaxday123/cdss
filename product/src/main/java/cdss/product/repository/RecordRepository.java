package cdss.product.repository;

import cdss.product.model.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RecordRepository extends JpaRepository<Record, Long> {
//    @Query(nativeQuery = true, value = "SELECT * FROM Record LIMIT 100")
    List<Record> findAll();

    @Query(value = "SELECT * FROM records r INNER JOIN user u ON r.user_id = u.user_id WHERE r.user_id != 0", nativeQuery = true)
    List<Record> findRecordsWithUserIdNotZeroAndFetchUser();

    //    @Query("FROM Record r where r.age < 50 order by r.age")
    List<Record> findByAgeLessThanOrderByAgeDesc(String age);

    @Query(value = "SELECT * FROM records r WHERE r.user_id = ?1", nativeQuery = true)
    List<Record> findAllByUserId(Long id);

    Optional<Record> findRecordById(Long id);

//    List<Record> findByAgeLessThanGreaterThanOrderByAgeDesc(String upperAge, String lowerAge);
}
