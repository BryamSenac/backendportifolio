const cors = require('cors');
const express = require('express');

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

class Projeto {
    constructor(titulo, descricao, img) {
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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/pegaCards', (req, res) => {
    res.status(200).json({ projetos });
});

app.post('/addCard', (req, res) => {
    const { nome, descricao, img } = req.body;

    if (nome && descricao && img) {
        const novoProjeto = new Projeto(nome, descricao, img);
        projetos.push(novoProjeto);
        res.status(201).json({ message: 'Projeto adicionado com sucesso!', projeto: novoProjeto });
    } else {
        res.status(400).json({ error: 'Faltando dados obrigatórios' });
    }
});

app.post('/deleteCard', (req, res) => {
    const { card } = req.body;
    const index = projetos.findIndex(p => p.titulo === card);
    if (index !== -1) {
        const projetoRemovido = projetos.splice(index, 1);
        res.status(200).json({ message: 'Projeto removido com sucesso!', projeto: projetoRemovido });
    } else {
        res.status(400).json({ error: 'Projeto não encontrado' });
    }
});

app.use((req, res) => {
    res.status(404).send('Função não encontrada...');
});

app.listen(port, hostname, () => {
    console.log(`Server rodando em http://${hostname}:${port}/`);
});
