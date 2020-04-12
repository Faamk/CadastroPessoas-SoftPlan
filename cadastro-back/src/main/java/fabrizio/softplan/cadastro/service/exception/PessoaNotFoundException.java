package fabrizio.softplan.cadastro.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Pessoa não encontrada")
public class PessoaNotFoundException extends Exception {
}
