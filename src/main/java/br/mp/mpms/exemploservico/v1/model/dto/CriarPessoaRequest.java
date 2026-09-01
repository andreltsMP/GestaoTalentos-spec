package br.mp.mpms.exemploservico.v1.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CriarPessoaRequest(
        @NotBlank(message = "Nome e obrigatorio")
        @Size(min = 3, max = 200, message = "Nome deve ter entre 3 e 200 caracteres")
        String nome,

        @NotBlank(message = "CPF e obrigatorio")
        @Pattern(regexp = "\\d{11}", message = "CPF deve conter exatamente 11 digitos")
        String cpf,

        @Email(message = "Email invalido")
        String email
) {
}
