const cors = require('cors');
const express = require('express');

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

class Projeto{
    constructor(titulo, descricao, img){
        this.titulo = titulo;
        this.descricao = descricao;
        this.img = img;
    }
}

let projetos = [
    new Projeto('MAÇÃ', 'Aqui vai a descrição do projeto com informações de linguagem funcionamento e objetivo..', '../../../assets/img/img_base.svg'),
    new Projeto('PERA', 'Aqui vai a descrição do projeto com informações de linguagem funcionamento e objetivo..', '../../../assets/img/img_base.svg'),
    new Projeto('ABACAXI', 'Aqui vai a descrição do projeto com informações de linguagem funcionamento e objetivo..', '../../../assets/img/img_base.svg'),
    new Projeto('MELÂNCIA', 'Aqui vai a descrição do projeto com informações de linguagem funcionamento e objetivo..', '../../../assets/img/img_base.svg'),
    new Projeto('COCÔ', 'Aqui vai a descrição do projeto com informações de linguagem funcionamento e objetivo..', '../../../assets/img/img_base.svg'),
    new Projeto('KIWI', 'Aqui vai a descrição do projeto com informações de linguagem funcionamento e objetivo..', '../../../assets/img/img_base.svg'),
    new Projeto('MANGA', 'Aqui vai a descrição do projeto com informações de linguagem funcionamento e objetivo..', '../../../assets/img/img_base.svg'),
    new Projeto('AMEIXA', 'Aqui vai a descrição do projeto com informações de linguagem funcionamento e objetivo..', '../../../assets/img/img_base.svg'),
    new Projeto('ABACATE', 'Aqui vai a descrição do projeto com informações de linguagem funcionamento e objetivo..', '../../../assets/img/img_base.svg'),
];

app.use(cors());
app.use(express.urlencoded({extended: true}));

app.get('/pegaCards', (req, res) =>{
    res.status(200).json({projetos});
});

app.post('/addCard', (rq, res)=>{
    const nome = req.query.nome;
    const descricao = req.query.descricao;
    const img = req.query.img;

    projetos.push(new Projeto(nome, descricao, img));
    res.status(201).json({message: 'deu boa!!!', nome: nome, descricao:descricao, img:img,});
});

app.post('/deleteCard', (req, res)=>{
    const valor = req.query.card;
    const index = projetos.findIndex(p => p.nome == valor);
    projetos.splice(index, 1);
    res.status(201).json({message: 'deu boa!!!', nome: projetos[index].nome, descricao: projetos[index].descricao, img: projetos[index].img});
});

app.use((req, res) => {
    res.status(404).send('Função não encontrada...');
});

app.listen(port, hostname, () => {
    console.log(`Server rodano em http://${hostname}:${port}/`);
});