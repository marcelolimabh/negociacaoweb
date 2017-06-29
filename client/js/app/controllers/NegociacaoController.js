class NegociacaoController {

    constructor(){
        let $ = document.querySelector.bind(document);

        this._data = $("#data");
        this._quantidade = $("#quantidade");
        this._valor = $("#valor");

    }

    adciona(event){
        
        event.preventDefault();
         

        let negociacao = new Negociacao(
            DateHelper.textoParaData(this._data.value),
            this._quantidade,
            this._valor
            );
        console.log(negociacao); 
        console.log(DateHelper.dataParaTexto(negociacao.data));



    }
}