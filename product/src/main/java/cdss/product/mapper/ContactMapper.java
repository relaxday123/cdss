package cdss.product.mapper;

import cdss.product.dto.ContactDTO;
import cdss.product.dto.UserDTO;
import cdss.product.exception.UserException;
import cdss.product.model.ContactRequest;
import cdss.product.model.User;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ContactMapper {
	private static final Logger logger = LoggerFactory.getLogger(ContactMapper.class);

	@Autowired
	ModelMapper modelMapper;

	public ContactDTO convertToDto(ContactRequest contact) {
		try {
			ContactDTO contactDTO = modelMapper.map(contact, ContactDTO.class);

			return contactDTO;
		} catch (Exception ex) {
			logger.warn(ex.getMessage());
			throw new UserException(UserException.ERR_CONVERT_DTO_ENTITY_FAIL);
		}
	}

	public ContactRequest convertToEntity(ContactDTO contactDTO) {
		try {
			ContactRequest contact = modelMapper.map(contactDTO, ContactRequest.class);
			return contact;
		} catch (Exception ex) {
			logger.warn(ex.getMessage());
			throw new UserException(UserException.ERR_CONVERT_DTO_ENTITY_FAIL);
		}
	}
}
