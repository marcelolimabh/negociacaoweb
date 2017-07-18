import {NegociacaoController} from './controllers/NegociacaoController.js'
import {} from './pollyfill/fetch.js'


let negociacaoController = new NegociacaoController();

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);