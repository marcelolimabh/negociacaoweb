"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        var $ = document.querySelector.bind(document);

        this._data = $("#data");
        this._quantidade = $("#quantidade");
        this._valor = $("#valor");

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

        this._service = new NegociacaoService();

        this._init();
    }

    _createClass(NegociacaoController, [{
        key: "_init",
        value: function _init() {
            var _this = this;

            this._service.lista().then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    return _this._listaNegociacoes.adiciona(negociacao);
                });
            }).catch(function (erro) {
                console.log(erro);
                _this._mensagem.texto = erro;
            });

            setInterval(this.importaNegociacoes(), 30000);
        }
    }, {
        key: "adiciona",
        value: function adiciona(event) {
            var _this2 = this;

            event.preventDefault();

            var negociacao = this._criaNegociacao();
            this._service.cadastra(negociacao).then(function () {
                _this2._listaNegociacoes.adiciona(negociacao);
                _this2._mensagem.texto = "Negociação adicionada com sucesso!!";
                _this2._limpaFormulario();
                console.log(_this2._listaNegociacoes);
            }).catch(function (erro) {
                _this2._mensagem.texto = erro;
                _this2._limpaFormulario();
            });
        }
    }, {
        key: "importaNegociacoes",
        value: function importaNegociacoes() {
            var _this3 = this;

            this._service.obterNegociacoes().then(function (negociacoes) {
                return negociacoes.filter(function (negocicao) {
                    return !_this3._listaNegociacoes.negociacoes.some(function (negociacaoExistente) {
                        return JSON.stringify(negocicao) == JSON.stringify(negociacaoExistente);
                    });
                });
            }).then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    _this3._listaNegociacoes.adiciona(negociacao);
                    _this3._mensagem.texto = 'Negociações do período importadas';
                });
            }).catch(function (erro) {
                return _this3._mensagem.texto = erro;
            });
        }
    }, {
        key: "apaga",
        value: function apaga() {
            var _this4 = this;

            this._service.apaga().then(function (mensagem) {
                _this4._mensagem.texto = mensagem;
                _this4._listaNegociacoes.esvazia();
            }).catch(function (erro) {
                _this4._mensagem.texto = erro;
            });
        }
    }, {
        key: "_limpaFormulario",
        value: function _limpaFormulario() {
            this._data.value = '';
            this._quantidade.value = 1;
            this._valor.value = 0.0;
            this._data.focus();
        }
    }, {
        key: "_criaNegociacao",
        value: function _criaNegociacao() {
            return new Negociacao(DateHelper.textoParaData(this._data.value), this._quantidade.value, this._valor.value);
        }
    }]);

    return NegociacaoController;
}();
//# sourceMappingURL=NegociacaoController.js.map