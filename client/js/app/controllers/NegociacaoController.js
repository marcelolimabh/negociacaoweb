class NegociacaoController {

    constructor(){
        let $ = document.querySelector.bind(document);

        this._data = $("#data");
        this._quantidade = $("#quantidade");
        this._valor = $("#valor");
        this._listaNegociacoes = new ListaNegociacoes(model =>
            this.negociacoesView.update(model));
        this.negociacoesView = new NegociacoesView($("#negociacoesView"));
        this.negociacoesView.update(this._listaNegociacoes);
        this._mensagem = new Mensagem();
        this.mensagemView = new MensagemView($("#mensagemView"));
        let self = this;
        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {

        get(target, prop, receiver) {

            if(['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)) {

                return function(){

                console.log(`método '${prop}' interceptado`);

                Reflect.apply(target[prop], target, arguments);

                self.negociacoesView.update(target);

                }
        }

        return Reflect.get(target, prop, receiver);
    }
    });

    }

       
    

    adciona(event){
        
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao()); 
        //this.negociacoesView.update(this._listaNegociacoes); 
        this._mensagem.texto ="Negociação adicionada com sucesso!!";
        this.mensagemView.update(this._mensagem);  
        this._limpaFormulario();
        console.log(this._listaNegociacoes); 

    }

    apaga(){
        this._listaNegociacoes.deletaLista();
        //this.negociacoesView.update(this._listaNegociacoes);
        this._mensagem.texto = "Negociações apagadas com sucesso!!";
        this.mensagemView.update(this._mensagem);
    }

    _limpaFormulario(){
        this._data.value = '';
        this._quantidade.value = 1;
        this._valor.value = 0.0;
        this._data.focus();
    }


    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._data.value),
            this._quantidade.value,
            this._valor.value
            );

    }

   
}