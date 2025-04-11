package net.backend.UniConnectBackend.mapper;

import net.backend.UniConnectBackend.dto.OrganizationDTO;
import net.backend.UniConnectBackend.entity.Organization;

public class OrganizationMapper {
    public static OrganizationDTO orgMapToOrgDto(Organization org){
        return new OrganizationDTO(
                org.getId(), org.getEmail(), org.getPass(), org.getOrg_name(), org.getOrg_abrv(),
                org.getOrg_category(), org.getPres_fname(), org.getPres_lname(), org.getPres_email(),
                org.getTres_fname(), org.getTres_lname(), org.getTres_email()
        );
    }
    public static Organization orgDtoMapToOrg(OrganizationDTO org){
        return new Organization(
                org.getId(), org.getEmail(), org.getPass(), org.getOrg_name(), org.getOrg_abrv(),
                org.getOrg_category(), org.getPres_fname(), org.getPres_lname(), org.getPres_email(),
                org.getTres_fname(), org.getTres_lname(), org.getTres_email()
        );
    }
}
