enum Operator {
    Empty,
    Sum,
    Substraction,
    Multiplier
};
class Calculator{

    private _input:string;
    

    constructor(input: string = ''){
        this._input = input;
    }

    public solve(): number{
        
        if (this._input === null) throw new Error('Not value provided');
        let items: string[] = this._input.split('');
        let number:number = 0;
        let multiplier:number = 1;
        let operator:Operator = Operator.Empty;
        let result:number = 0;
        
        while(items.length != 0){
            const item = items.pop();

            if(isNaN(Number(item))){
                //not a number
                switch(item){
                    case '+':
                        operator = Operator.Sum;
                    break;

                    case '-':
                        operator = Operator.Substraction;
                    break;

                    case '*':
                        operator = Operator.Multiplier;
                    break;

                    default:
                        throw new Error(`Symbol '${item}' not recognized`);
                }
                result += number;
                number = 0;
                multiplier = 1;
            }else{
                number += Number(item) * multiplier;
                multiplier *= 10;
            }
        }

        switch(operator){
            case Operator.Sum:
                result += number;
            break;

            case Operator.Substraction:
                result = number - result;
            break;

            case Operator.Multiplier:
                result = number * result;
            break;

            default:
        }

        return result;
    }
}

export default Calculator;