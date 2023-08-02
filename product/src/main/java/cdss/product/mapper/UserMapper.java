package cdss.product.mapper;

import cdss.product.dto.UserDTO;
import cdss.product.exception.UserException;
import cdss.product.model.User;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component
public class UserMapper {
	private static final Logger logger = LoggerFactory.getLogger(UserMapper.class);

	@Autowired
	ModelMapper modelMapper;

	public UserDTO convertToDto(User user) {
		try {
			UserDTO userDTO = modelMapper.map(user, UserDTO.class);

			return userDTO;
		} catch (Exception ex) {
			logger.warn(ex.getMessage());
			throw new UserException(UserException.ERR_CONVERT_DTO_ENTITY_FAIL);
		}
	}

	public User convertToEntity(UserDTO userDTO) {
		try {
			User user = modelMapper.map(userDTO, User.class);
			return user;
		} catch (Exception ex) {
			logger.warn(ex.getMessage());
			throw new UserException(UserException.ERR_CONVERT_DTO_ENTITY_FAIL);
		}
	}
}
