package cdss.product.controller;

import cdss.product.dto.RecordDTO;
import cdss.product.dto.UpdatePasswordDTO;
import cdss.product.dto.UserDTO;
import cdss.product.service.UserService;
import cdss.product.utils.DecodedToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("")
    ResponseEntity<UserDTO> createUser(@Valid @RequestBody UserDTO user) {
        UserDTO dto = userService.createUser(user);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
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
