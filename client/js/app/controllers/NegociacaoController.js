class NegociacaoController {

    constructor(){
        let $ = document.querySelector.bind(document);

        this._data = $("#data");
        this._quantidade = $("#quantidade");
        this._valor = $("#valor");
        this._listaNegociacoes = new ListaNegociacoes();

    }

    adciona(event){
        
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());    
        this._limpaFormulario();
        console.log(this._listaNegociacoes); 

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