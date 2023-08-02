package cdss.product.repository;

import cdss.product.model.PreproData;
import cdss.product.model.Record;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PreproDataRepository extends JpaRepository<PreproData, Long> {
    List<PreproData> findAll();
}
