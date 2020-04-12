package fabrizio.softplan.cadastro.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Pessoa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter
    private Long id;
    @Getter @Setter
    private String Nome;
    @Getter @Setter
    private char sexo;
    @Getter @Setter
    private String Email;
    @Getter@Setter
    private LocalDateTime Datanasc;
    @Getter@Setter
    private String Naturalidade;
    @Getter@Setter
    private String Nacionalidade;
    @Getter@Setter
    private String Cpf;

    public Pessoa() {
    }
}
