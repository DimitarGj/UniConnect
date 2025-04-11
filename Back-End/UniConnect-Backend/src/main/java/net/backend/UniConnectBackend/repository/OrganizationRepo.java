package net.backend.UniConnectBackend.repository;

import net.backend.UniConnectBackend.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizationRepo extends JpaRepository<Organization, Long> {
    Organization getOrganizationByEmailAndPass(String email, String pass);
}
