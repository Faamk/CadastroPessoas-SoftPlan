package fabrizio.softplan.cadastro.repository;


import fabrizio.softplan.cadastro.model.Pessoa;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


public interface PessoaRepository extends CrudRepository<Pessoa,Long> {
    public static final String FIND_BY_CPF = "SELECT * FROM pessoa WHERE CPF=?1";

    @Query(value = FIND_BY_CPF, nativeQuery = true)
    Pessoa findByCpf(String cpf);
}
