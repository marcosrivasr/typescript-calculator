enum Operator {
    Empty,
    Sum,
    Substraction,
    Multiplication,
    division

};
enum Side{
    Left,
    Right
};
class Calculator{

    private _input:string;
    

    constructor(input: string = ''){
        this._input = input.trim().replace(' ', '');
    }

    public solve(): number{
        
        if (this._input === null) throw new Error('Not value provided');

        let stack:number[]   = [];
        let items: string[]  = this.normalize(this._input.split(''));
        let postfix:string[] = this.toPostfix(items);
        console.log(postfix);

        while(postfix.length > 0){
            const item:string = <string>postfix.shift();
            console.log(item);
            if(this.isNumber(item)){
                
                stack.push(Number(item));
                console.log('   = es un numero, se añade al stack', stack);
            }else if(this.isOperator(item)){
                console.log('   = es un operador, saco numeros del stack');
                const n1:number = <number>stack.pop();
                const n2:number = <number>stack.pop();
                const op:string = item;
                const partial = this.getPartial(n1,n2,op);
                stack.push(partial);
                console.log(`   = el resultado de ${n1} ${op} ${n2} es ${partial}`);
                console.log('   = se añade al stack', stack);  
            }
        }
        return <number>stack.pop();
    }

    private getPartial(n1:number, n2:number, op:string):number{
        switch(op){
            case '+':
                return n1 + n2;
                break;
            case '-':
                return n1 - n2;
                break;
            case '*':
                return n1 * n2;
                break;
            case '/':
                return n1 / n2;
                break;
            case '^':
                return n1 ^ n2;
                break;
            case '%':
                return n1 % n2;
                break;
            default:
                throw new Error(`Symbol '${op}' not recognized`);
        }
    }

    /*
    *
    Read all the symbols one by one from left to right in the given Infix Expression.
    If the reading symbol is operand, then directly print it to the result (Output).
    If the reading symbol is left parenthesis '(', then Push it on to the Stack.
    If the reading symbol is right parenthesis ')', then Pop all the contents of stack until respective left parenthesis 
        is poped and print each poped symbol to the result.
    If the reading symbol is operator (+ , - , * , / etc.,), then Push it on to the Stack. However, 
        first pop the operators which are already on the stack that have higher or equal precedence 
        than current operator and print them to the result.
        http://btechsmartclass.com/data_structures/infix-to-postfix.html
    */

    private toPostfix(list:string[]): string[]{
        let output:string[] = [];
        let stack:string[] = [];

        for(let i = 0; i < list.length; i++){
            let item = list[i];

            if(this.isNumber(item)){
                output.push(item);
            }else if(item === '('){
                stack.unshift(item);
            }else if(item === ')'){
                //pop all the contents of stack until left parenthesis is poped
                let itemStack:string = <string>stack.shift();
                while(itemStack != '('){
                    output.push(itemStack);
                    itemStack = <string>stack.shift();
                }
            }else if(this.isOperator(item)){
                if(this.isEmpty(stack)){
                    stack.unshift(item);
                }else{
                    while(stack.length > 0){
                        if( this.getPrecedence(item) === this.getPrecedence(stack[0]) ){
                            if(item === '-' && stack[0] === '+'){
                                output.push(<string>stack.shift());    
                            }
                        }else if( this.getPrecedence(item) > this.getPrecedence(stack[0]) ){
                            break;
                        }else if( this.getPrecedence(item) < this.getPrecedence(stack[0]) ){
                            output.push(<string>stack.shift());
                        }
                    }
                    stack.unshift(item);
                    
                }
            }else{
                throw new Error(`Symbol '${item}' not recognized`);
            }
        }

        while(stack.length > 0){
            output.push(<string>stack.shift());
        }

        return output;
    }

    private getPrecedence(item:string):number{
        switch(item){
            case '+':
                return 1;
            break;
            case '-':
                return 1;
            break;
            case '*':
                return 2;
            break;
            case '/':
                return 3;
            break;
            case '^':
                return 4;
            break;
            case '%':
                return 5;
            break;
            default:
                throw new Error(`Symbol '${item}' not recognized`);
        }
    }

    private isEmpty<T>(array:T[]):boolean{
        return array.length === 0;
    }

    private isOperator(item:string):boolean{
        if(item === '+' || item === '-' || item === '*' || item === '/' || item === '^' || item === '%') return true;

        return false;
    }

    private isNumber(value:string):boolean{
        return !isNaN(Number(value));
    }

    private normalize(items:string[]):string[]{
        let res:string[] = [];
        let item:string = '';
        let number:number = 0;
        let multiplier:number = 1;
        let digit:boolean = false;

        while(items.length > 0){
            item = items.pop() as string;
            
            //console.log(item);

            if(this.isNumber(item)){
                //console.log('   = es numero');
                digit = true;
                number = Number(item) * multiplier;
                multiplier *= 10;

            }else if(item === '+' || item === '-' || item === '*' || item === '/' || 
                    item === '(' || item === ')' || item === '^' || item === '%'){
                //console.log('   = es una operacion');
                if(digit){
                    //console.log('   = primero guardo el número ', number);
                    res.unshift(String(number));
                    digit = false;
                    number = 0;
                    multiplier = 1;
                    //console.log('   = ahora añado el operador ', item);
                    res.unshift(item);
                    //console.log('res: ', res);
                }else{
                    //console.log('   = no hay número guardado, se añade el operador ', item);
                    res.unshift(item);
                }
            }else{
                throw new Error(`Symbol '${item}' not recognized`);
            }
        }

        if(digit){
            //console.log('   = falta de agregar ', number);
            res.unshift(String(number));
            digit = false;
            number = 0;
            multiplier = 1;
        }
        return res;
    }
}

export default Calculator;