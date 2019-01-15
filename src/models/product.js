const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    
    slug: { // exemplo Cadeira Gamer = cadeira-gamer
        type: String,
        required: [true, 'O Slug é obrigatório'],
        trim: true, // tira os espaços
        index: true,
        unique: true 
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    active: {
        type: Boolean,
        required: true,
        default: true
    }, 
    tags: [{
        type: String,
        required: true
    }],
    image: {
        type: String,
        required: true,
        trim: true
    }
});


/*
    Exemplo
{
    "title": "titulo",
    "description": "xpto",
    "tags": [
        "teste", "123", "pessoas"
    ]  
}*/

module.exports = mongoose.model('Product', schema); // Nome do nosso model é Product