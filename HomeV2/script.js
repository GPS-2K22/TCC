var pi = ["PRINT"];
var js = ["CONSOLE.LOG"];
var php = ["ECHO"]
function translateCommand(){
    let errorMessage = document.getElementById('errorMessage')
    let command = document.getElementById("command").value.toUpperCase();
        let translate = document.getElementById("commandTranslated");
        let strings = command.split("'")[1];
        let AfeterBrackets = command.split("'")[2];
        let Commands = command.split("(")[0];
        let exp = document.getElementById('explanation');
    
    for (let i = 0; i < command.length; i++) {
      
        if(command[i]== "(" && command[command.length-2] == ")"){
          
            
        }
        // more statements
     }
    if(js.includes(Commands)  || php.includes(Commands)){   
        translate.value =  (pi[0] + "('" + strings  + "'"+ AfeterBrackets).toLowerCase();
        exp.style.display  = "block";
      
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



