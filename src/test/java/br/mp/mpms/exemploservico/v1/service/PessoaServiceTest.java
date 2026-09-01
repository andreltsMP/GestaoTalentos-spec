package br.mp.mpms.exemploservico.v1.service;

import br.mp.mpms.exemploservico.infra.exception.ConflictException;
import br.mp.mpms.exemploservico.infra.exception.ResourceNotFoundException;
import br.mp.mpms.exemploservico.v1.model.dto.CriarPessoaRequest;
import br.mp.mpms.exemploservico.v1.model.dto.PessoaResponse;
import br.mp.mpms.exemploservico.v1.model.entity.Pessoa;
import br.mp.mpms.exemploservico.v1.repository.PessoaRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PessoaServiceTest {

    @Mock
    private PessoaRepository pessoaRepository;

    @InjectMocks
    private PessoaService pessoaService;

    @Test
    @DisplayName("deve criar pessoa quando CPF nao existe")
    void deveCriarPessoaQuandoCpfNaoExiste() {
        CriarPessoaRequest request = new CriarPessoaRequest("Joao Silva", "12345678901", "joao@email.com");
        Pessoa pessoaSalva = Pessoa.builder()
                .id(UUID.randomUUID())
                .nome("Joao Silva")
                .cpf("12345678901")
                .email("joao@email.com")
                .dataCriacao(LocalDateTime.now())
                .build();

        when(pessoaRepository.existsByCpf("12345678901")).thenReturn(false);
        when(pessoaRepository.save(any(Pessoa.class))).thenReturn(pessoaSalva);

        PessoaResponse response = pessoaService.criar(request);

        assertThat(response.nome()).isEqualTo("Joao Silva");
        assertThat(response.id()).isNotNull();
    }

    @Test
    @DisplayName("deve lancar ConflictException quando CPF ja existe")
    void deveLancarConflictQuandoCpfJaExiste() {
        CriarPessoaRequest request = new CriarPessoaRequest("Joao Silva", "12345678901", "joao@email.com");
        when(pessoaRepository.existsByCpf("12345678901")).thenReturn(true);

        assertThatThrownBy(() -> pessoaService.criar(request))
                .isInstanceOf(ConflictException.class)
                .hasMessage("Pessoa com este CPF ja esta cadastrada");
    }

    @Test
    @DisplayName("deve retornar pessoa quando ID existe")
    void deveRetornarPessoaQuandoIdExiste() {
        UUID id = UUID.randomUUID();
        Pessoa pessoa = Pessoa.builder()
                .id(id)
                .nome("Maria Santos")
                .email("maria@email.com")
                .dataCriacao(LocalDateTime.now())
                .build();

        when(pessoaRepository.findById(id)).thenReturn(Optional.of(pessoa));

        PessoaResponse response = pessoaService.buscarPorId(id);

        assertThat(response.nome()).isEqualTo("Maria Santos");
    }

    @Test
    @DisplayName("deve lancar ResourceNotFoundException quando ID nao existe")
    void deveLancarNotFoundQuandoIdNaoExiste() {
        UUID id = UUID.randomUUID();
        when(pessoaRepository.findById(id)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> pessoaService.buscarPorId(id))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Pessoa nao encontrada");
    }
}
