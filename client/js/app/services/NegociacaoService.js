class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            this._http.get('negociacoes/semana')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana do servidor.');
                });
        });
    }


    obterNegociacoesDaSemanaAnterior() {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            this._http.get('negociacoes/anterior')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana anterior do servidor.');
                });
        });
    }


    obterNegociacoesDaSemanaRetrasada() {
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            this._http.get('negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana retrasada do servidor.');
                });
        });
    }

    obterNegociacoes() {

        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), [])
                .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor));

            return negociacoes;
        }).catch(erro => {
            throw new Error(erro);
        });
    }

    lista() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações')
            });
    }

    cadastra(negociacao) {
        return ConnectionFactory.getConnection().then((connection) => {

            let dao = new NegociacaoDAO(connection);
            dao.adiciona(negociacao)
                .then(() => "Negociação adicionada com sucesso!!");

        }).catch(erro => {
            console.log(erro);
            throw new Error('Não foi possivel adicionar a Negociação!');
        });

    }


    apaga() {
       return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.apagaTodos())
            .then(() => "Negociações excluidas com sucesso!")
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível apagar as negociações');
            });
    }
}
