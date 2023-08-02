package cdss.product.controller;

import cdss.product.dto.RecordDTO;
import cdss.product.dto.UserDTO;
import cdss.product.service.RecordService;
import cdss.product.service.UserService;
import cdss.product.utils.DecodedToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/records")
@CrossOrigin(origins = "*")
public class RecordController {

    @Autowired
    RecordService recordService;

    @GetMapping("")
    @PreAuthorize("hasAuthority('PATIENT')")
    ResponseEntity<List<RecordDTO>> getRecord(@RequestHeader(name = "Authorization") String stringToken) {
        DecodedToken token = DecodedToken.getDecoded(stringToken);
        List<RecordDTO> listDto = recordService.getRecord(token.sub);

        return new ResponseEntity<>(listDto, HttpStatus.OK);
    }

    @PostMapping("")
    @PreAuthorize("hasAuthority('PATIENT')")
    ResponseEntity<RecordDTO> postRecord(@RequestHeader(name = "Authorization") String stringToken,
                                         @Valid @RequestBody RecordDTO record) {
        DecodedToken token = DecodedToken.getDecoded(stringToken);
        RecordDTO dto = recordService.postRecord(token.sub, record);

        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

//    @PutMapping("")
//    @PreAuthorize("hasAuthority('PATIENT')")
//    ResponseEntity<RecordDTO> putRecord(@RequestHeader(name = "Authorization") String stringToken, @Valid @RequestBody RecordDTO record) {
//        DecodedToken token = DecodedToken.getDecoded(stringToken);
//        RecordDTO dto = recordService.putRecord(token.sub, record);
//
//        return new ResponseEntity<>(dto, HttpStatus.OK);
//    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('PATIENT')")
    ResponseEntity<RecordDTO> deleteRecord(@PathVariable("id") Long id) {
        return new ResponseEntity<RecordDTO>(recordService.disableRecord(id), HttpStatus.OK);
    }
}
