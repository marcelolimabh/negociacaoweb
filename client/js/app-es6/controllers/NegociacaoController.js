import {ListaNegociacoes} from '../models/ListaNegociacoes.js'
import {Mensagem} from '../models/Mensagem.js'
import {NegociacoesView} from '../views/NegociacoesView.js'
import {MensagemView} from '../views/MensagemView.js'
import {NegociacaoService} from '../services/NegociacaoService.js'
import {DateHelper} from '../helpers/DateHelper.js'
import {Bind} from '../helpers/Bind.js'
import {Negociacao} from '../models/Negociacao.js'

export class NegociacaoController {

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

        this._service = new NegociacaoService();

        this._init();






    }

    _init() {

        this._service
            .lista()
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => {
                console.log(erro);
                this._mensagem.texto = erro;
            });

        setInterval(this.importaNegociacoes(), 30000);



    }




    adiciona(event) {

        event.preventDefault();

        let negociacao = this._criaNegociacao();
        this._service.cadastra(negociacao)
            .then(() => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = "Negociação adicionada com sucesso!!";
                this._limpaFormulario();
                console.log(this._listaNegociacoes);
            })
            .catch(erro =>{
                 this._mensagem.texto = erro;
                 this._limpaFormulario();
            });



    }

    importaNegociacoes() {
        this._service
            .obterNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negocicao =>
                    !this._listaNegociacoes.negociacoes.some(negociacaoExistente =>
                        JSON.stringify(negocicao) == JSON.stringify(negociacaoExistente)))
            )
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociações do período importadas'
            }))
            .catch(erro => this._mensagem.texto = erro);
    }

    apaga() {

        
           this._service
            .apaga()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            }).catch(erro => {
                this._mensagem.texto = erro;
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