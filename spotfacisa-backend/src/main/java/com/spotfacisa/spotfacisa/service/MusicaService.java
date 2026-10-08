
package com.spotfacisa.spotfacisa.service;

import com.spotfacisa.spotfacisa.entity.Musica;
import com.spotfacisa.spotfacisa.exception.ResourceNotFoundException;
import com.spotfacisa.spotfacisa.repository.MusicaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MusicaService {

    private final MusicaRepository musicaRepository;
    private final SequenceGeneratorService sequenceGeneratorService;

    public MusicaService(
            MusicaRepository musicaRepository,
            SequenceGeneratorService sequenceGeneratorService
    ) {
        this.musicaRepository = musicaRepository;
        this.sequenceGeneratorService = sequenceGeneratorService;
    }

    public List<Musica> listarTodos() {
        return musicaRepository.findAll();
    }

    public Musica buscarPorId(Long id) {
        return musicaRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Música não encontrada")
                );
    }

    public Musica criar(Musica musica) {

        if (musica.getId() == null) {
            musica.setId(
                    sequenceGeneratorService.generateSequence("musicas")
            );
        }

        return musicaRepository.save(musica);
    }

    public Musica atualizar(Long id, Musica musica) {

        Musica musicaExistente = buscarPorId(id);

        if (musica.getTitulo() != null) {
            musicaExistente.setTitulo(musica.getTitulo());
        }

        if (musica.getDuracao() != null) {
            musicaExistente.setDuracao(musica.getDuracao());
        }

        if (musica.getGenero() != null) {
            musicaExistente.setGenero(musica.getGenero());
        }

        if (musica.getAnoLancamento() != null) {
            musicaExistente.setAnoLancamento(musica.getAnoLancamento());
        }

        if (musica.getArtista() != null) {
            musicaExistente.setArtista(musica.getArtista());
        }

        return musicaRepository.save(musicaExistente);
    }

    public void deletar(Long id) {
        Musica musica = buscarPorId(id);
        musicaRepository.delete(musica);
    }
}
