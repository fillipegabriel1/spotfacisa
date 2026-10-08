
package com.spotfacisa.spotfacisa.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "artistas")
public class Artista {

    @Id
    private Long id;

    private String nome;
    private String genero;
    private String nacionalidade;
    private String descricao;

    public Artista() {
    }

    public Artista(
            Long id,
            String nome,
            String genero,
            String nacionalidade,
            String descricao
    ) {
        this.id = id;
        this.nome = nome;
        this.genero = genero;
        this.nacionalidade = nacionalidade;
        this.descricao = descricao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getNacionalidade() {
        return nacionalidade;
    }

    public void setNacionalidade(String nacionalidade) {
        this.nacionalidade = nacionalidade;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
