package fabrizio.softplan.cadastro.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Dados de Pessoa Inválidos")

public class DadosInvalidosException extends Exception {
}
