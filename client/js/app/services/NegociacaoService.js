class NegociacaoService{


    obterNegociacoesDaSemana(cb){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semana');
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    console.log('Obtendo as negociações do servidor.');
               cb(null, JSON.parse(xhr.responseText)
                .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                

                } else {
                    console.log(xhr.responseText);
                    cb('Não foi possível obter as negociações do servidor.',null);
                }
            }
        }
        xhr.send();
    }


    obterNegociacoesDaSemanaAnterior(cb){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/anterior');
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    console.log('Obtendo as negociações do servidor.');
               cb(null, JSON.parse(xhr.responseText)
                .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                

                } else {
                    console.log(xhr.responseText);
                    cb('Não foi possível obter as negociações da semana anterior no servidor.',null);
                }
            }
        }
        xhr.send();
    }


     obterNegociacoesDaSemanaRetrasada(cb){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/retrasada');
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    console.log('Obtendo as negociações do servidor.');
               cb(null, JSON.parse(xhr.responseText)
                .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                

                } else {
                    console.log(xhr.responseText);
                    cb('Não foi possível obter as negociações da semana retrasada no servidor.',null);
                }
            }
        }
        xhr.send();
    }
 }
