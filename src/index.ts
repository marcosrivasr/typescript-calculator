import Calculator from './calculator';

const input: HTMLInputElement = <HTMLInputElement>document.querySelector('#input');
const solve:HTMLInputElement = <HTMLInputElement>document.querySelector('#btn');
const result:HTMLElement = <HTMLElement>document.querySelector('#result');

solve.addEventListener('click', e => {
    const app:Calculator = new Calculator(input.value!!);
    result.textContent = String(app.solve());
});