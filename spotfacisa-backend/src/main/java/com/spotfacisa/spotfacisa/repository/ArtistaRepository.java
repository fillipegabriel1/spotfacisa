package com.spotfacisa.spotfacisa.repository;

import com.spotfacisa.spotfacisa.entity.Artista;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistaRepository extends JpaRepository<Artista, Long> {
}