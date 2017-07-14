class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._data = $("#data");
        this._quantidade = $("#quantidade");
        this._valor = $("#valor");


        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia');

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');

        ConnectionFactory
            .getConnection()
            .then(connection => {
                let dao = new NegociacaoDAO(connection)

                dao.listaTodos()
                    .then(negociacoes => {
                        negociacoes.forEach(negociacao =>
                            this._listaNegociacoes.adiciona(negociacao))
                    }
                    )
            }).catch(erro => {
                console.log(erro);
                this_mensagem.texto = 'Não foi possivel obter as negociações';
            });



    }




    adiciona(event) {

        event.preventDefault();

        ConnectionFactory.getConnection().then((connection) => {

            let dao = new NegociacaoDAO(connection);
            let negociacao = this._criaNegociacao();
            dao.adiciona(negociacao).then(() => {

                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = "Negociação adicionada com sucesso!!";
                this._limpaFormulario();
                console.log(this._listaNegociacoes);
            });

        }).catch(erro => this._mensagem.texto = erro);



    }

    importaNegociacoes() {
        let service = new NegociacaoService();


        Promise.all(
            [
                service.obterNegociacoesDaSemana(),
                service.obterNegociacoesDaSemanaAnterior(),
                service.obterNegociacoesDaSemanaRetrasada()

            ]
        ).then(negociacoes => {
            negociacoes.reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = "Negociações importadas com sucesso!";
        }
            ).catch(erro => this._mensagem.texto = err0);
    }

    apaga() {

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.apagaTodos())
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            });

    }

    _limpaFormulario() {
        this._data.value = '';
        this._quantidade.value = 1;
        this._valor.value = 0.0;
        this._data.focus();
    }


    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._data.value),
            this._quantidade.value,
            this._valor.value
        );

    }


}