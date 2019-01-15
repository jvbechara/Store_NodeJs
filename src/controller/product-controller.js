const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repository/product-repository');
const azure = require('azure-storage');
const guid = require('guid');
var config = require('../config');

const get = async(req, res, next) => { // Obter informações
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({
            message: 'Falha na requisição!'
        });
    };
}

const getBySlug = async(req, res, next) => {
    try{
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({
            message: 'Falha na requisição!'
        });
    };
}

const getById = async(req, res, next) => {
    try{
        var data = repository.getById(reqs.params.id);
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({
            message: 'Falha na requisição!'
        });
    };
}

const getByTag = async(req, res, next) => {
    try{
        var data = repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({
            message: 'Falha na requisição!'
        });
    };
}

const post = async(req, res, next) => { // Envia
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'Obkh título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O Slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A description deve conter pelo menos 3 caracteres');

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
    }

    try {
        // Cria o Blob Service
         const blobSvc = azure.createBlobService(config.containerConnectionString);

        let filename = guid.raw().toString() + '.jpg';
        let rawdata = req.body.image;
        let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let type = matches[1];
        let buffer = new Buffer(matches[2], 'base64');

        // Salva a Imagem
        await blobSvc.createBlockBlobFromText('product-images', filename, buffer, {
             contentType: type
        }, function (error, result, response) {
            if(error) {
                filename = 'default-product.png'
            }
         });

        //var product = new Product(req.body);
        // product.title = req.body.title; //Caso não queira passar tudo
        await repository.create({
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            price: req.body.price,
            active: true,
            tags: req.body.tags,
            image: 'https://jvbechara.blob.core.windows.net/product-images/' + filename
        });
        res.status(201).send({message: 'Produto cadastrado com sucesso!'});
    } catch(e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha na requisição!'
        });
    };
};

const put = async(req, res, next) => { // Atualiza
    try{
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Produto atualizado com Sucesso!'
        });
    } catch(e) {
        res.status(500).send({
            message: 'Falha na requisição!'
        });
    };
};

const del = async(req, res, next) => { // Deleta
    try{ 
        await repository.delete(req.body.id)
        res.status(200).send({
            message: 'Produto removido com Sucesso!'
        });
    } catch(e) {
        res.status(500).send({
            message: 'Falha na requisição!'
        });
    };
};

module.exports = {
    post,
    put,
    delete: del,
    get,
    getBySlug,
    getById, 
    getByTag
}