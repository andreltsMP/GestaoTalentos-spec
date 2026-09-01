package br.mp.mpms.exemploservico.v1.model.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record PessoaResponse(
        UUID id,
        String nome,
        String email,
        LocalDateTime dataCriacao
) {
}
