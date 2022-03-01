var pi = ["PRINT"];
var js = ["CONSOLE.LOG"];
var php = ["ECHO"]

function whatIs(what){
    if(what == 'command'){
        return "A função print() é uma das funções mais importantes e usadas na linguagem Python. Sua função é, basicamente, exibir mensagens na tela ou enviá-las para outro dispositivo, como imprimir dentro de arquivos de texto"
    }
    if(what == 'string'){
        return 'String é uma sequência de caracteres, é uma forma de designar uma coleção de dados heterogêneos com um significado especial e muito usado em códigos. Então o valor que compõe um texto qualquer tem esse nome, e muitas vezes o tipo do objeto que tem essa informação é também chamada de string ou String em algumas linguagens.'
    }
    if(what == ''){
        return ''
    }
}

function translateCommand(){
    let errorMessage = document.getElementById('errorMessage')
    let command = document.getElementById("command").value;
        let translate = document.getElementById("commandTranslated");
        let strings = command.split("'")[1];
        let AfterBrackets = command.split("'")[2];
        let Commands = command.split("(")[0].toUpperCase();
        let exp = document.querySelector('.explanation');

    if(js.includes(Commands)  || php.includes(Commands)){   
        let translatedCommands = pi[0].toLowerCase() + "('" + strings  + "'"+ AfterBrackets;
        translate.value =  translatedCommands;
        exp.style.display  = "block";

        for (let i = 1; i <= 3; i++) {
            let order = document.querySelector('.order--' + i)
            //console.log(order)
            if(i == 1){
                order.textContent = pi[0].toLowerCase();
                order.style.color = "#61afef";
            } 
            if(i == 2){
                order.textContent = "('" + strings + "'" + AfterBrackets;
                order.style.color = "#98c379";
            }   
            if(i == 3){
                //order.textContent = whatIs('command');
                order.style.color = "#61afef";
                order.style.fontSize = "40%";
                order.style.marginTop = "10px";
            }
         }
      
    }
    else{
        translate.value = "";
        exp.style.display  = "none";
        errorMessage.style.display = "block";
    }
}
function closeError(){
    let errorMessage = document.getElementById('errorMessage')
    errorMessage.style.display= "none";
}


//A fazer - explanation, mais comandos e organização


var order = document.querySelector(".order--3")
var item = document.querySelector(".order--1");
var item2 = document.querySelector(".order--2");
item.addEventListener("mouseover", changeToCommand, false);
item2.addEventListener("mouseover", changeToString, false);


function changeToCommand()
{  
    order.textContent = whatIs('command');
    order.style.color = "#61afef";
}

function changeToString()
{  
    order.textContent = whatIs('string');
    order.style.color = "#98c379";
}