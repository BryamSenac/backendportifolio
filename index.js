const cors = require('cors');
const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require ('./autorizacaoFirebase.json'); 

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/pegaCards', async (req, res) => {
    try{
        const resposta = await db.collection('projetos').get();
        const projetos = resposta.docs.map(doc => ({
            id:doc.id, ...doc.data()
        }));
        res.status(200).json({projetos});
    }catch (erro){
        res.status(500).json({erro: erro});
    }
});

app.post('/addCard', async (req, res) => {
    const { nome, descricao, img } = req.body;

    if (nome && descricao && img) {
        try {
            const docRef = await db.collection('projetos').add({ titulo: nome, descricao, img });
            res.status(201).json({ message: 'Projeto adicionado com sucesso!', id: docRef.id });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao salvar dados' });
        }
    } else {
        res.status(400).json({ error: 'Faltando dados obrigatórios' });
    }
});

app.post('/deleteCard', async (req, res) => {
    const { cardId } = req.body;

    if (cardId) {
        try {
            await db.collection('projetos').doc(cardId).delete();
            res.status(200).json({ message: 'Projeto removido com sucesso!' });
        } catch (error) {
            console.error("Erro ao deletar do Firestore:", error);
            res.status(500).json({ error: 'Erro ao deletar projeto' });
        }
    } else {
        res.status(400).json({ error: 'ID do projeto não fornecido' });
    }
});


app.use((req, res) => {
    res.status(404).send('Funçãclso não encontrada...');
});

app.listen(port, hostname, () => {
    console.log(`Server rodando em http://${hostname}:${port}/`);
});













// class Projeto {
//     constructor(titulo, descricao, img) {
//         this.titulo = titulo;
//         this.descricao = descricao;
//         this.img = img;
//     }
// }

// let projetos = [
//     new Projeto('MAÇÃ', 'Aqui vai a descrição do projeto com informações de linguagem funcionamento e objetivo..', '../../../assets/img/img_base.svg'),
//     new Projeto('PERA', 'Aqui vai a descrição do projeto com informações de linguagem funcionamento e objetivo..', '../../../assets/img/img_base.svg'),
//     new Projeto('ABACAXI', 'Aqui vai a descrição do projeto com informações de linguagem funcionamento e objetivo..', '../../../assets/img/img_base.svg'),
//     new Projeto('MELÂNCIA', 'Aqui vai a descrição do projeto com informações de linguagem funcionamento e objetivo..', '../../../assets/img/img_base.svg'),
//     new Projeto('COCÔ', 'Aqui vai a descrição do projeto com informações de linguagem funcionamento e objetivo..', '../../../assets/img/img_base.svg'),
//     new Projeto('KIWI', 'Aqui vai a descrição do projeto com informações de linguagem funcionamento e objetivo..', '../../../assets/img/img_base.svg'),
//     new Projeto('MANGA', 'Aqui vai a descrição do projeto com informações de linguagem funcionamento e objetivo..', '../../../assets/img/img_base.svg'),
//     new Projeto('AMEIXA', 'Aqui vai a descrição do projeto com informações de linguagem funcionamento e objetivo..', '../../../assets/img/img_base.svg'),
//     new Projeto('ABACATE', 'Aqui vai a descrição do projeto com informações de linguagem funcionamento e objetivo..', '../../../assets/img/img_base.svg'),
// ];