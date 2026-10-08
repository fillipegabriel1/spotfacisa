
package com.spotfacisa.spotfacisa.service;

import com.spotfacisa.spotfacisa.entity.DatabaseSequence;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class SequenceGeneratorService {

    private final MongoOperations mongoOperations;

    public SequenceGeneratorService(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    public long generateSequence(String sequenceName) {

        DatabaseSequence counter = mongoOperations.findAndModify(
                Query.query(Criteria.where("_id").is(sequenceName)),
                new Update().inc("seq", 1),
                FindAndModifyOptions.options()
                        .returnNew(true)
                        .upsert(true),
                DatabaseSequence.class
        );

        if (counter == null) {
            throw new IllegalStateException(
                    "Não foi possível gerar o ID para: " + sequenceName
            );
        }

        return counter.getSeq();
    }
}
