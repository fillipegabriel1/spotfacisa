package com.spotfacisa.spotfacisa.controller;

import com.spotfacisa.spotfacisa.entity.Artista;
import com.spotfacisa.spotfacisa.service.ArtistaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/artistas")
public class ArtistaController {

    private final ArtistaService artistaService;

    public ArtistaController(ArtistaService artistaService) {
        this.artistaService = artistaService;
    }

    @GetMapping
    public ResponseEntity<List<Artista>> listarTodos() {
        return ResponseEntity.ok(artistaService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Artista> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(artistaService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Artista> criar(@RequestBody Artista artista) {
        return ResponseEntity.ok(artistaService.criar(artista));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Artista> atualizar(
            @PathVariable Long id,
            @RequestBody Artista artista) {

        return ResponseEntity.ok(
                artistaService.atualizar(id, artista)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {

        artistaService.deletar(id);

        return ResponseEntity.noContent().build();
    }
}