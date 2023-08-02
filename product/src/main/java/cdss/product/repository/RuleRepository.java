package cdss.product.repository;

import cdss.product.model.Rule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RuleRepository extends JpaRepository<Rule, Long> {

    @Query(value = "SELECT * FROM rule r WHERE r.consequent = ?1", nativeQuery = true)
    List<Rule> findAllByConsequent(String value);
}
