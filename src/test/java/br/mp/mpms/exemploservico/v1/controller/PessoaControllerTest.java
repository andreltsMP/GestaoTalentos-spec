package br.mp.mpms.exemploservico.v1.controller;

import br.mp.mpms.exemploservico.infra.config.SecurityConfig;
import br.mp.mpms.exemploservico.v1.model.dto.PessoaResponse;
import br.mp.mpms.exemploservico.v1.service.PessoaService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PessoaController.class)
@Import(SecurityConfig.class)
class PessoaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private PessoaService pessoaService;

    @Test
    @DisplayName("deve retornar 201 ao criar pessoa com dados validos")
    void deveRetornar201AoCriarPessoaValida() throws Exception {
        PessoaResponse response = new PessoaResponse(
                UUID.randomUUID(), "Joao Silva", "joao@email.com", LocalDateTime.now());
        when(pessoaService.criar(any())).thenReturn(response);

        mockMvc.perform(post("/api/v1/pessoas")
                        .with(jwt())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "nome": "Joao Silva",
                                    "cpf": "12345678901",
                                    "email": "joao@email.com"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.nome").value("Joao Silva"));
    }

    @Test
    @DisplayName("deve retornar 422 quando nome esta vazio")
    void deveRetornar422QuandoNomeVazio() throws Exception {
        mockMvc.perform(post("/api/v1/pessoas")
                        .with(jwt())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "nome": "",
                                    "cpf": "12345678901",
                                    "email": "joao@email.com"
                                }
                                """))
                .andExpect(status().isUnprocessableEntity());
    }

    @Test
    @DisplayName("deve retornar 401 sem autenticacao")
    void deveRetornar401SemAutenticacao() throws Exception {
        mockMvc.perform(get("/api/v1/pessoas"))
                .andExpect(status().isUnauthorized());
    }
}
