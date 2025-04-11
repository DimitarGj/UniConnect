package net.backend.UniConnectBackend.service;

import net.backend.UniConnectBackend.dto.OrganizationDTO;
import net.backend.UniConnectBackend.entity.Organization;

import java.util.List;

public interface OrganizationService {
    OrganizationDTO createOrganization(OrganizationDTO orgDto);
    OrganizationDTO getByEmailAndPass(String email, String pass);

    List<Organization> getAllOrgs();
}
