
package com.spotfacisa.spotfacisa.repository;

import com.spotfacisa.spotfacisa.entity.Artista;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ArtistaRepository extends MongoRepository<Artista, Long> {
}
