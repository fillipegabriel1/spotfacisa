package com.spotfacisa.spotfacisa.service;

import com.spotfacisa.spotfacisa.entity.Artista;
import com.spotfacisa.spotfacisa.entity.Musica;
import com.spotfacisa.spotfacisa.repository.ArtistaRepository;
import org.springframework.stereotype.Service;
import com.spotfacisa.spotfacisa.exception.ResourceNotFoundException;

import java.util.List;

@Service
public class ArtistaService {

    private final ArtistaRepository artistaRepository;

    public ArtistaService(ArtistaRepository artistaRepository) {
        this.artistaRepository = artistaRepository;
    }

    public List<Artista> listarTodos() {
        return artistaRepository.findAll();
    }

    public Artista buscarPorId(Long id) {
        return artistaRepository.findById(id)
        		.orElseThrow(() -> new ResourceNotFoundException("Artista não encontrado"));
    }

    public Artista criar(Artista artista) {
        return artistaRepository.save(artista);
    }

    public Artista atualizar(Long id, Artista artista) {

        Artista artistaExistente = artistaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Música não encontrada"));

        if (artista.getNome() != null) {
            artistaExistente.setNome(artista.getNome());
        }

        if (artista.getGenero() != null) {
            artistaExistente.setGenero(artista.getGenero());
        }

        if (artista.getNacionalidade() != null) {
            artistaExistente.setNacionalidade(artista.getNacionalidade());
        }

        if (artista.getDescricao() != null) {
            artistaExistente.setDescricao(artista.getDescricao());
        }

        return artistaRepository.save(artistaExistente);
    }

    public void deletar(Long id) {

        Artista artista = buscarPorId(id);

        artistaRepository.delete(artista);
    }
}