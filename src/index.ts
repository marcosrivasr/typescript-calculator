import Calculator from './calculator';

const input: HTMLInputElement = <HTMLInputElement>document.querySelector('#input');
const solve:HTMLInputElement = <HTMLInputElement>document.querySelector('#btn');

solve.addEventListener('click', e => {
    const app:Calculator = new Calculator(input.value!!);
    console.log(app.solve());
});