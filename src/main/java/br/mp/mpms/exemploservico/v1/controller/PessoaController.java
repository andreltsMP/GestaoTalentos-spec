package br.mp.mpms.exemploservico.v1.controller;

import br.mp.mpms.exemploservico.v1.model.dto.CriarPessoaRequest;
import br.mp.mpms.exemploservico.v1.model.dto.PessoaResponse;
import br.mp.mpms.exemploservico.v1.service.PessoaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/pessoas")
@RequiredArgsConstructor
public class PessoaController {

    private final PessoaService pessoaService;

    @PostMapping
    public ResponseEntity<PessoaResponse> criar(@Valid @RequestBody CriarPessoaRequest request) {
        PessoaResponse response = pessoaService.criar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PessoaResponse> buscarPorId(@PathVariable UUID id) {
        PessoaResponse response = pessoaService.buscarPorId(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Page<PessoaResponse>> listar(
            @RequestParam(required = false) String nome,
            Pageable pageable) {
        Page<PessoaResponse> response = pessoaService.listar(nome, pageable);
        return ResponseEntity.ok(response);
    }
}
