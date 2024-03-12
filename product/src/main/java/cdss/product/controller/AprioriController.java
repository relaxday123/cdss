package cdss.product.controller;

import cdss.product.dto.DiagnoseDTO;
import cdss.product.dto.RecordDTO;
import cdss.product.model.Record;
import cdss.product.model.Rule;
import cdss.product.service.AprioriService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/apriori")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AprioriController {

    @Autowired
    private AprioriService aprioriService;

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('PATIENT', 'STAFF')")
    ResponseEntity<List<Rule>> matchingRules(@PathVariable("id") Long id) {
        return new ResponseEntity<List<Rule>>(aprioriService.matchingRules(id), HttpStatus.OK);
    }

    @PostMapping("/run")
    @PreAuthorize("hasAnyAuthority('PATIENT', 'STAFF')")
    ResponseEntity<List<Rule>> calculateRecord(@Valid @RequestBody RecordDTO record) {
        return new ResponseEntity<List<Rule>>(aprioriService.matchingRules(record), HttpStatus.OK);
    }

    @GetMapping("/diagnose/{id}")
    @PreAuthorize("hasAuthority('PATIENT')")
    ResponseEntity<?> diagnoseRecord(@PathVariable("id") Long id) {
        return new ResponseEntity<DiagnoseDTO>(aprioriService.diagnoseRecord(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Map<Set<String>, Map<Set<String>, Double>>> runApriori(@RequestParam double minSupport, @RequestParam double minConf, @RequestParam int numItems) {
        return ResponseEntity.ok(aprioriService.runApriori(minSupport, minConf, numItems));
    }

    @GetMapping("/test/")
    public ResponseEntity<List<Record>> runApriori() {
        return ResponseEntity.ok(aprioriService.get());
    }

    @GetMapping("/prepro/")
    public ResponseEntity<String> prepro() {
        return ResponseEntity.ok(aprioriService.preprocessingData());
    }
}
