
package com.spotfacisa.spotfacisa.repository;

import com.spotfacisa.spotfacisa.entity.Musica;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MusicaRepository extends MongoRepository<Musica, Long> {
}
