package cdss.product.repository;

import cdss.product.model.ContactRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<ContactRequest, Long> {

}
