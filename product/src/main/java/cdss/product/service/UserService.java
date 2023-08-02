package cdss.product.service;


import cdss.product.dto.UpdatePasswordDTO;
import cdss.product.dto.UserDTO;
import cdss.product.exception.UserException;
import cdss.product.mapper.UserMapper;
import cdss.product.model.User;
import cdss.product.payload.request.SignupRequest;
import cdss.product.payload.response.MessageResponse;
import cdss.product.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    private UserMapper userMapper;

    public UserDTO createUser(UserDTO user) {
        String strRoles;
        if (user.getRoles() != null) {
            strRoles = user.getRoles();
        } else {
            strRoles = "PATIENT";
        }

        User entity = userMapper.convertToEntity(user);
        entity.setUsername(user.getUsername());
        entity.setPassword(encoder.encode(user.getPassword()));

        switch (strRoles) {
            case "ADMIN":
                entity.setRoles(User.ERole.ADMIN.toString());
                break;
                case "PATIENT":
                    entity.setRoles(User.ERole.PATIENT.toString());
                    break;
                default:
                    throw new UserException(UserException.USER_TYPE_NOT_FOUND);
            }

        if (userRepository.existsByUsername(user.getUsername())) {
            throw new UserException(UserException.USER_EXISTED);
        }

        try {
            User saveUser = userRepository.save(entity);
            return userMapper.convertToDto(saveUser);
        }
        catch (Exception ex) {
            throw new UserException(UserException.USER_CREATE_DATA_FAIL);
        }
    }

    public UpdatePasswordDTO changePassword(String username, UpdatePasswordDTO updatePasswordDTO) {
            Optional<User> existedUser = userRepository.findByUsername(username);
            if (!existedUser.isPresent()) {
                throw new UserException(UserException.USER_NOT_FOUND);
            }
            User user = existedUser.get();
            if (!this.encoder.matches(updatePasswordDTO.getOldPassword(), user.getPassword())) {
                throw new UserException(UserException.ERR_WRONG_OLD_PASSWORD);
            } else if (updatePasswordDTO.getNewPassword().equals(updatePasswordDTO.getOldPassword())) {
                throw new UserException(UserException.PASSWORD_DOES_NOT_CHANGE);
            } else {
                user.setPassword(encoder.encode(updatePasswordDTO.getNewPassword()));
                userRepository.save(user);
            }

            return updatePasswordDTO;
    }
}
