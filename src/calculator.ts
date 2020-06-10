enum Operator {
    Empty,
    Sum,
    Substraction,
    Multiplier
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

        let items: string[]     = this._input.split('');
        let number1:number      = 0;
        let number2:number      = 0;
        let multiplier:number   = 1;
        let operation:Operator  = Operator.Empty;
        let side:Side           = Side.Right;
        let result:number       = 0;

        while(items.length != 0){
            const item:string = items.pop() as string;
            

            if(this.isNumber(item)){ //its a number
                if(side === Side.Right){
                    number1 += (Number(item) * multiplier);
                }else{
                    number2 += (Number(item) * multiplier);
                }
                multiplier *= 10;
            }else{ // it's an operator
                if(operation != Operator.Empty){ //operation pending
                    const partial = this.solvePartial(number1, number2, operation);
                    number1 = partial;
                    number2 = 0;
                    side    = Side.Left;
                    operation = this.getOperator(item);
                }else{
                    operation = this.getOperator(item);
                    if(side === Side.Right){
                        side = Side.Left;
                    }else{
                        side = Side.Right;
                    }
                }    
                multiplier = 1;
            }
        }
        result = this.solvePartial(number1, number2, operation);

        return result;
    }

    private solvePartial(number1:number, number2:number, operation:Operator): number{
        switch(operation){
            case Operator.Sum:
                return number1 + number2;
            break;
            case Operator.Substraction:
                return number2 - number1;
            break;
            case Operator.Multiplier:
                return number1 * number2;
            break;
            default:
                return 0;
        }
    }

    private getOperator(item:string):Operator{
        switch(item){
            case '+':
                return Operator.Sum;
                break;
            case '-':
                return Operator.Substraction;
                break;
            case '*':
                return Operator.Multiplier;
                break;
            default:
                throw new Error(`Symbol '${item}' not recognized`);
        }
    }

    private isNumber(value:string):boolean{
        return !isNaN(Number(value));
    }
}

export default Calculator;