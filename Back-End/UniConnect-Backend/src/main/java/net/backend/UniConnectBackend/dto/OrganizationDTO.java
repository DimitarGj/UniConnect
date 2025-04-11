package net.backend.UniConnectBackend.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrganizationDTO {
    private Long id;
    private String email;
    private String pass;
    private String org_name;
    private String org_abrv;
    private String org_category;
    private String pres_fname;
    private String pres_lname;
    private String pres_email;
    private String tres_fname;
    private String tres_lname;
    private String tres_email;
}
