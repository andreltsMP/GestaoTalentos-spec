package br.mp.mpms.exemploservico.v1.service;

import br.mp.mpms.exemploservico.infra.exception.ConflictException;
import br.mp.mpms.exemploservico.infra.exception.ResourceNotFoundException;
import br.mp.mpms.exemploservico.v1.model.dto.CriarPessoaRequest;
import br.mp.mpms.exemploservico.v1.model.dto.PessoaResponse;
import br.mp.mpms.exemploservico.v1.model.entity.Pessoa;
import br.mp.mpms.exemploservico.v1.repository.PessoaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class PessoaService {

    private final PessoaRepository pessoaRepository;

    @Transactional
    public PessoaResponse criar(CriarPessoaRequest request) {
        if (pessoaRepository.existsByCpf(request.cpf())) {
            throw new ConflictException("Pessoa com este CPF ja esta cadastrada");
        }

        Pessoa pessoa = Pessoa.builder()
                .nome(request.nome())
                .cpf(request.cpf())
                .email(request.email())
                .build();

        Pessoa salva = pessoaRepository.save(pessoa);
        log.info("Pessoa criada com id={}", salva.getId());

        return toResponse(salva);
    }

    @Transactional(readOnly = true)
    public PessoaResponse buscarPorId(UUID id) {
        Pessoa pessoa = pessoaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pessoa nao encontrada"));
        return toResponse(pessoa);
    }

    @Transactional(readOnly = true)
    public Page<PessoaResponse> listar(String nome, Pageable pageable) {
        if (nome != null && !nome.isBlank()) {
            return pessoaRepository.buscarPorNomeParcial(nome, pageable)
                    .map(this::toResponse);
        }
        return pessoaRepository.findAll(pageable).map(this::toResponse);
    }

    private PessoaResponse toResponse(Pessoa pessoa) {
        return new PessoaResponse(
                pessoa.getId(),
                pessoa.getNome(),
                pessoa.getEmail(),
                pessoa.getDataCriacao()
        );
    }
}
