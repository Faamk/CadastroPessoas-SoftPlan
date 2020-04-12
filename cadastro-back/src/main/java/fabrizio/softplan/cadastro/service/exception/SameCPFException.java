package fabrizio.softplan.cadastro.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.EXPECTATION_FAILED, reason = "CPF Já consta na base de dados")
public class SameCPFException extends Exception {
}
