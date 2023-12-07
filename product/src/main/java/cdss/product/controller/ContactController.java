package cdss.product.controller;

import cdss.product.dto.ContactDTO;
import cdss.product.dto.UserDTO;
import cdss.product.service.ContactService;
import cdss.product.utils.DecodedToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/contact")
@CrossOrigin(origins = "*")
public class ContactController {

	@Autowired
	ContactService contactService;

	@GetMapping("")
	@PreAuthorize("hasAuthority('STAFF')")
	ResponseEntity<List<ContactDTO>> getContact() {
		List<ContactDTO> dto = contactService.getContact();
		return new ResponseEntity<>(dto, HttpStatus.CREATED);
	}

	@PostMapping("")
	@PreAuthorize("hasAuthority('PATIENT')")
	ResponseEntity<ContactDTO> createContact(@RequestHeader(name = "Authorization") String stringToken, @Valid @RequestBody ContactDTO contact) {
		DecodedToken token = DecodedToken.getDecoded(stringToken);
		ContactDTO dto = contactService.createContact(token.sub, contact);
		return new ResponseEntity<>(dto, HttpStatus.CREATED);
	}
}
