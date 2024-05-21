package cdss.product.service;


import cdss.product.dto.UpdatePasswordDTO;
import cdss.product.dto.UserDTO;
import cdss.product.exception.UserException;
import cdss.product.mapper.UserMapper;
import cdss.product.model.User;
import cdss.product.payload.request.SignupRequest;
import cdss.product.payload.response.MessageResponse;
import cdss.product.repository.UserRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
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

    @Autowired
    private JavaMailSender mailSender;

    public UserDTO createUser(UserDTO user, String siteURL) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new UserException(UserException.USER_EXISTED);
        }

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

        try {
            String randomCode = RandomString.make(64);
            entity.setVerificationCode(randomCode);
            entity.setEnabled(false);
            User saveUser = userRepository.save(entity);
            sendVerificationEmail(entity, siteURL);

            return userMapper.convertToDto(saveUser);
        }
        catch (Exception ex) {
            throw new UserException(UserException.USER_CREATE_DATA_FAIL);
        }
    }

    private void sendVerificationEmail(User user, String siteURL)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = "Admin@gmail.com";
        String senderName = "Your company name";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Your company name.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getName());
        String verifyURL = siteURL + "/users/verify?code=" + user.getVerificationCode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);

    }

    public boolean verify(String verificationCode) {
        User user = userRepository.findByVerificationCode(verificationCode);

        if (user == null || user.isEnabled()) {
            return false;
        } else {
            user.setVerificationCode(null);
            user.setEnabled(true);
            userRepository.save(user);

            return true;
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
