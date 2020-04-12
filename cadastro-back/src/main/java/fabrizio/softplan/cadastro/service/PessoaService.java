package fabrizio.softplan.cadastro.service;

import br.com.caelum.stella.validation.CPFValidator;
import br.com.caelum.stella.validation.InvalidStateException;
import fabrizio.softplan.cadastro.service.exception.DadosInvalidosException;
import fabrizio.softplan.cadastro.service.exception.SameCPFException;
import fabrizio.softplan.cadastro.model.Pessoa;
import fabrizio.softplan.cadastro.repository.PessoaRepository;
import fabrizio.softplan.cadastro.service.exception.PessoaNotFoundException;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PessoaService {

    @Autowired
    PessoaRepository pessoaRepository;

    public Pessoa findById(long id) throws PessoaNotFoundException {
        return pessoaRepository.findById(id).orElseThrow(PessoaNotFoundException::new);
    }

    public Pessoa savePessoa(Pessoa pessoa) throws SameCPFException, DadosInvalidosException {
        Pessoa preExistente = pessoaRepository.findByCpf(pessoa.getCpf());
        if (preExistente != null) {
            if (pessoa.getId() == null) {
                throw new SameCPFException();
            }
            if (pessoa.getId() != preExistente.getId()) {
                throw new SameCPFException();
            }
        }
        CPFValidator cpfValidator = new CPFValidator();

        try {
            cpfValidator.assertValid(pessoa.getCpf());
        } catch (InvalidStateException e) {
            throw new DadosInvalidosException();

        }

        if (!EmailValidator.getInstance().isValid(pessoa.getEmail())) {
            throw new DadosInvalidosException();
        }

        if (null == pessoa.getDatanasc()) {
            throw new DadosInvalidosException();
        }

        if (StringUtils.isEmpty(pessoa.getNome())) {
            throw new DadosInvalidosException();
        }
        return pessoaRepository.save(pessoa);
    }

    public List<Pessoa> getAllPessoas() {
        List<Pessoa> allPessoas = new ArrayList<Pessoa>();
        pessoaRepository.findAll().forEach(allPessoas::add);
        return allPessoas;
    }

    public void deleteById(long id) {
        pessoaRepository.deleteById(id);
    }


    public void deleteAll() {
        pessoaRepository.deleteAll();
    }
}
