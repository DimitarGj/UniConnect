package net.backend.UniConnectBackend.service.impl;

import lombok.AllArgsConstructor;
import net.backend.UniConnectBackend.dto.OrganizationDTO;
import net.backend.UniConnectBackend.dto.StudentDTO;
import net.backend.UniConnectBackend.entity.Organization;
import net.backend.UniConnectBackend.entity.Student;
import net.backend.UniConnectBackend.exception.ResourceNotFoundException;
import net.backend.UniConnectBackend.mapper.OrganizationMapper;
import net.backend.UniConnectBackend.mapper.StudentMapper;
import net.backend.UniConnectBackend.repository.OrganizationRepo;
import net.backend.UniConnectBackend.repository.StudentRepo;
import net.backend.UniConnectBackend.service.OrganizationService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class OrganizationServiceImpl implements OrganizationService {
    /*TODO Implement this file*/
    private OrganizationRepo organizationRepo;

    @Override
    public OrganizationDTO createOrganization(OrganizationDTO orgDto) {
        Organization organization = OrganizationMapper.orgDtoMapToOrg(orgDto);
        organizationRepo.save(organization);
        return null;
    }

    @Override
    public OrganizationDTO getByEmailAndPass(String email, String pass) {
        Organization savedOrg = organizationRepo.getOrganizationByEmailAndPass(email, pass);
        if(savedOrg == null){
            throw(new ResourceNotFoundException("Organization not found with email and pass"));
        }
        return OrganizationMapper.orgMapToOrgDto(savedOrg);
    }

    @Override
    public List<Organization> getAllOrgs() {
        return organizationRepo.findAll();
    }
}
