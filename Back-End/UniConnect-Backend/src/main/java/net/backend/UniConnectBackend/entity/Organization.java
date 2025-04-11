package net.backend.UniConnectBackend.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "StudentOrg")
public class Organization{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email")
    private String email;
    @Column(name = "pass", nullable = false)
    private String pass;
    @Column(name = "org_name")
    private String org_name;
    @Column(name = "org_abrv")
    private String org_abrv;
    @Column(name = "org_category")
    private String org_category;
    @Column(name = "pres_fname")
    private String pres_fname;
    @Column(name = "pres_lname")
    private String pres_lname;
    @Column(name = "pres_email")
    private String pres_email;
    @Column(name = "tres_fname")
    private String tres_fname;
    @Column(name = "tres_lname")
    private String tres_lname;
    @Column(name = "tres_email")
    private String tres_email;
}
