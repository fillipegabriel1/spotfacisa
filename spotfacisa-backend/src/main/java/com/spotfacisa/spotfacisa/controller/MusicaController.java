package com.spotfacisa.spotfacisa.controller;

import com.spotfacisa.spotfacisa.entity.Musica;
import com.spotfacisa.spotfacisa.service.MusicaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/musicas")
public class MusicaController {

    private final MusicaService musicaService;

    public MusicaController(MusicaService musicaService) {
        this.musicaService = musicaService;
    }

    @GetMapping
    public ResponseEntity<List<Musica>> listarTodos() {
        return ResponseEntity.ok(musicaService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Musica> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(musicaService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Musica> criar(@RequestBody Musica musica) {
        return ResponseEntity.ok(musicaService.criar(musica));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Musica> atualizar(
            @PathVariable Long id,
            @RequestBody Musica musica) {

        return ResponseEntity.ok(
                musicaService.atualizar(id, musica)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {

        musicaService.deletar(id);

        return ResponseEntity.noContent().build();
    }
}