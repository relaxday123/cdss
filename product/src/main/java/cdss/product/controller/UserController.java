package cdss.product.controller;

import cdss.product.dto.RecordDTO;
import cdss.product.dto.UpdatePasswordDTO;
import cdss.product.dto.UserDTO;
import cdss.product.model.User;
import cdss.product.service.UserService;
import cdss.product.utils.DecodedToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("")
    ResponseEntity<UserDTO> processRegister(@Valid @RequestBody UserDTO user, HttpServletRequest request)
            throws UnsupportedEncodingException, MessagingException {
        UserDTO dto = userService.createUser(user, getSiteURL(request));

        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();

        return siteURL.replace(request.getServletPath(), "");
    }

    @GetMapping("/verify")
    @PreAuthorize("permitAll()")
    public ResponseEntity<String> verifyUser(@Param("code") String code) {
        if (userService.verify(code)) {
            return new ResponseEntity<>("verify_success", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("verify_fail", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/change-password")
    @PreAuthorize("hasAuthority('PATIENT')")
    ResponseEntity<?> changePassword(@RequestHeader(name = "Authorization") String stringToken
            , @RequestBody UpdatePasswordDTO passwordDTO) {
        DecodedToken token = DecodedToken.getDecoded(stringToken);

        return new ResponseEntity<>(userService.changePassword(token.sub, passwordDTO), HttpStatus.OK);
    }

    @GetMapping("/ad")
    @PreAuthorize("hasAuthority('ADMIN')")
    String testad() {
        return "admin Board.";
    }

    @GetMapping("/pa")
    @PreAuthorize("hasAuthority('PATIENT')")
    String testpa() {
        return "patient Board.";
    }
}
