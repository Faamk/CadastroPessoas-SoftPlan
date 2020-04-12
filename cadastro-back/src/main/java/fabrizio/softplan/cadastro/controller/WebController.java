package fabrizio.softplan.cadastro.controller;

import fabrizio.softplan.cadastro.service.exception.DadosInvalidosException;
import fabrizio.softplan.cadastro.service.exception.SameCPFException;
import fabrizio.softplan.cadastro.model.Pessoa;
import fabrizio.softplan.cadastro.service.PessoaService;
import fabrizio.softplan.cadastro.service.exception.PessoaNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;


@Controller
@RequestMapping(path = "/api")
public class WebController {

    @Autowired
    private PessoaService pessoaService;


    @GetMapping("/pessoa")
    public @ResponseBody
    List<Pessoa> getAllPosts() {
        return pessoaService.getAllPessoas();
    }

    @RequestMapping("/pessoa/{id}")
    public ResponseEntity<Pessoa> getPessoa(@PathVariable Long id) throws PessoaNotFoundException {
        Pessoa pessoa = pessoaService.findById(id);
        return ResponseEntity.ok().body(pessoa);
    }

    @PostMapping(path = "/pessoa")
    public ResponseEntity<Pessoa> addPessoa( @Valid @RequestBody Pessoa pessoa) throws URISyntaxException, SameCPFException, DadosInvalidosException {
        pessoaService.savePessoa(pessoa);
        return ResponseEntity.created(new URI("/pessoa/" + pessoa.getId()))
                .body(pessoa);
    }


    @PutMapping("/pessoa/{id}")
    public ResponseEntity<Pessoa> updatePessoa(@Valid @RequestBody Pessoa pessoa) throws SameCPFException, DadosInvalidosException {
        pessoaService.savePessoa(pessoa);
        return ResponseEntity.ok().body(pessoa);
    }

    @DeleteMapping(path = "/pessoa/{id}")
    public ResponseEntity<Pessoa> deletePessoa(@PathVariable Long id) {
        pessoaService.deleteById(id);
        return ResponseEntity.ok().build();
    }


    @DeleteMapping("/clean")
    public ResponseEntity<String> clean() {
        pessoaService.deleteAll();
        return new ResponseEntity<>("Database Clean", HttpStatus.OK);
    }
}
