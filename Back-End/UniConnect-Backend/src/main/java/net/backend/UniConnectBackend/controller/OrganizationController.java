package net.backend.UniConnectBackend.controller;

import lombok.AllArgsConstructor;
import net.backend.UniConnectBackend.dto.OrganizationDTO;
import net.backend.UniConnectBackend.entity.Organization;
import net.backend.UniConnectBackend.service.OrganizationService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/student_org")
public class OrganizationController {
    private OrganizationService organizationService;
    @PostMapping
    public ResponseEntity<OrganizationDTO> createOrganization(@RequestBody OrganizationDTO organizationDTO){
        OrganizationDTO savedOrg = organizationService.createOrganization(organizationDTO);
        return new ResponseEntity<>(savedOrg, HttpStatus.CREATED);
    }
    @GetMapping("/{email}/{password}")
    public ResponseEntity<OrganizationDTO> getOrganizationByEmailAndPass(@PathVariable("email") String email, @PathVariable("password") String pass){
        OrganizationDTO savedOrg = organizationService.getByEmailAndPass(email,pass);
        return ResponseEntity.ok(savedOrg);
    }
    @GetMapping("/")
    public ResponseEntity<List<Organization>> getAllOrgs(){
        List<Organization> orgs = organizationService.getAllOrgs();
        return ResponseEntity.ok(orgs);
    }
}
