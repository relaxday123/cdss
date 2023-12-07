package cdss.product.service;

import cdss.product.dto.ContactDTO;
import cdss.product.dto.RecordDTO;
import cdss.product.exception.ContactException;
import cdss.product.exception.RecordException;
import cdss.product.exception.UserException;
import cdss.product.mapper.ContactMapper;
import cdss.product.model.ContactRequest;
import cdss.product.model.Record;
import cdss.product.model.User;
import cdss.product.repository.ContactRepository;
import cdss.product.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ContactService {

	@Autowired
	ContactRepository contactRepository;

	@Autowired
	ContactMapper contactMapper;

	@Autowired
	UserRepository userRepository;

	public List<ContactDTO> getContact() {
		try {
			List<ContactRequest> contactList = contactRepository.findAll();

			List<ContactDTO> contactDTOList = contactList.stream()
					.filter(contact -> !contact.getState().equals(ContactRequest.ContactState.DELETE))
					.map(record -> contactMapper.convertToDto(record))
					.collect(Collectors.toList());

			return contactDTOList;
		} catch (Exception ex) {
			throw new ContactException(ContactException.CONTACT_NOT_FOUND);
		}
	}

	public ContactDTO createContact(String username, ContactDTO contactDTO) {
		User user = userRepository.findByUsername(username).orElseThrow(() -> new UserException(UserException.USER_NOT_FOUND));

		try {
			ContactRequest contact = contactMapper.convertToEntity(contactDTO);
			contact.setState(ContactRequest.ContactState.ON_HOLD);
			contact.setUser(user);
			contact.setDate(LocalDate.now());

			return contactMapper.convertToDto(contactRepository.save(contact));
		} catch (Exception ex) {
			throw new ContactException(ContactException.CREATE_CONTACT_FAIL);
		}
	}
}
