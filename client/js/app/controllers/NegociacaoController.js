class NegociacaoController {

    constructor(){
        let $ = document.querySelector.bind(document);

        this._data = $("#data");
        this._quantidade = $("#quantidade");
        this._valor = $("#valor");


        this._listaNegociacoes = new Bind (
                new ListaNegociacoes(),
                new NegociacoesView($('#negociacoesView')),
                'adiciona', 'esvazia');

         this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');


    }

       
    

    adiciona(event){
        
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao()); 
        this._mensagem.texto ="Negociação adicionada com sucesso!!";
        this._limpaFormulario();
        console.log(this._listaNegociacoes);

    }

    importaNegociacoes(){
       let service = new NegociacaoService();


       Promise.all(
           [
               service.obterNegociacoesDaSemana(),
               service.obterNegociacoesDaSemanaAnterior(),
               service.obterNegociacoesDaSemanaRetrasada()

           ]
       ).then(negociacoes => {
           negociacoes.reduce((arrayAchatado, array) =>arrayAchatado.concat(array),[]) 
           .forEach(negociacao=>this._listaNegociacoes.adiciona(negociacao));
           this._mensagem.texto="Negociações importadas com sucesso!";
            }
       ).catch(erro=>this._mensagem.texto = err0);
    }

    apaga(){
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = "Negociações apagadas com sucesso!!";
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