const PseudoCode =[
    // Prints
    {name : "print", syntax : 'Escrever', usage: "Escrever uma mensagem no console"},
    {name : "print", syntax :'Escrever("mensagem")',
     usage: "Escrever uma mensagem no console", howUse: 'Troque o parametro "mensagem" por um texto desejados'},
    {name : "print", syntax :'Escrever("mensagem", variavel)', 
    usage: "Escrever uma mensagem no console", howUse:'Troque os parametos "mensagem" e "variavel" por valores desejados'},
    // Conditionals
    {name : "if", syntax : 'Se', usage: "Condicional"},
    {name : "if", syntax :'Se("valor_1" == "valor_2")', 
    usage: "Condicional", howUse: 'Troque os parametros "valor_1", "valor_2" e a "condição" pelos valores e condições desejados'},
	
	{name : "for", syntax :'Para', usage: "Count"},
	{name : "for", syntax :'Para(contar = inicio ;contar < fim; contar++ )',
     usage: "Count", howUse: 'Troque parametro "inicio" e o "fim" pelos valores desejados'},
	
	{name : "while", syntax :'Enquanto', usage: "loop conditional"},
	{name : "while", syntax :'Enquanto(contar < fim)', usage: "loop conditional", 
    howUse: 'Troque os parametros "contar" e "fim" por valores desejados'},

    {name : "switch", syntax :'Escolha-Caso', usage: "loop conditional"},
	{name : "switch", syntax :'Escolha-Caso("case1"; "case2"; "case3"; "case3"; "case4" )', 
    usage: "loop conditional", howUse: 'Troque os parametos "case" pelos casos desejados'}
];
const simbols =["=","==",">=","<=",">","<"];
const JAVA_api = [
    {name:"public_void", syntax: "public static void main(String args[])", usage:""},
    {name:"print", syntax: "System.out.println", usage:""},
    {name:"start_class", syntax: "class", usage:""},
    {name:"str", syntax: "String", usage:""},
    {name:"if", syntax: "if", usage:""},
	{name:"for", syntax: "for", usage:""},
    {name:"while", syntax: "while", usage:""},
]
const Python_api = [
    {name: "print", syntax: "print",usage:""},
    {name: "if", syntax: "if",usage:""},
    {name:"for", syntax: "for", usage:""},
    {name:"while", syntax: "while", usage:""},
    {name: "switch", syntax: "if", usage: ""}
]
const JS_api=[
    {name:"print",syntax:"console.log",usage:""},
    {name:"var",syntax:"var",usage:""},
    {name:"if",syntax:"if",usage:""},
    {name:"while", syntax: "while", usage:""},
    {name:"for", syntax: "for", usage:""},
    {name: "switch", syntax: "switch", usage: ""}
]
class Translate {
    command(com,lang){
        if(lang == "JAVA"){
            return JAVA_api.find(element => element.name == com).syntax
        }
        if(lang == "PYTHON"){
            return Python_api.find(element => element.name == com).syntax
        }
        if(lang == "JS"){
            return JS_api.find(element => element.name == com).syntax
        }
        }
    identyType(rawcommand){

        function whatIs(par,per){
            for(let i =0;  i< per.length;i++){
                if(par == per[i].syntax){
                      return per[i].name
                }
            }
        }
        
        let command = whatIs(rawcommand.split("(")[0], PseudoCode);
        if(command == 'if'){
            return "if"    
        }
        if(command == 'while'){
            return "while"    
        }
		if(command == 'for'){
            return "for"    
        }
        if(command == 'print'){
            let string = rawcommand.split('"')[1];
            let variable = rawcommand.split(',')[1];
            if(string != undefined && variable != undefined){
                return "print_var";
            
            }
            else if(string != undefined && variable == undefined){
                return "print_no_var"
            }
            else{
                return "error";
            }
        }
    }
    identyCommand(command,lang){
        function verifyConditional(par, per){
            for(let i =0; i<= per.length;i++){
                if(par.indexOf(per[i]) > -1)      
                    return per[i]
            }
        }
        function hare(request){
            let command = request.split("(")[0]
            for(let i = 0;i <= PseudoCode.length;i++){
                if(command == PseudoCode[i].syntax){
                    return PseudoCode[i].name;
                }
            }
        }
        if(lang == "JAVA"){ // -> Tortoise
			
            if(this.identyType(command) == "print_var"){
                let variable = command.split(',')[1].replace(')','');
                let string = command.split('"')[1];
                for(let i = 0; i <= JAVA_api.length; i++){
                    if(JAVA_api[i].name == hare(command)){ 
                        return [JAVA_api[i].syntax,variable,string]
                    }    
                }
            }
            if(this.identyType(command) == "print_no_var"){
                let string = command.split('"')[1];
                for(let i = 0; i <= JAVA_api.length; i++){
                    if(JAVA_api[i].name == hare(command)){ 
                        return [JAVA_api[i].syntax,string]
                    }    
                }
            }
			if(this.identyType(command) == "for"){
                for(let i = 0; i <= JAVA_api.length; i++){
					let afterCommand = command.split("(")[1].replace(')', '')
					let init = afterCommand.split(';')[0]
					let init_1 = init.split(verifyConditional(init,simbols))[0]
					let init_2 = init.split(verifyConditional(init,simbols))[1]
					let init_cond = verifyConditional(init,simbols)
					
					let mid = afterCommand.split(';')[1]
					let mid_1 = mid.split(verifyConditional(mid,simbols))[0]
					let mid_2 = mid.split(verifyConditional(mid,simbols))[1]
					let mid_cond = verifyConditional(mid,simbols)
					
					let end = afterCommand.split(';')[2]
                    if(JAVA_api[i].name == hare(command)){ 
                        return [JAVA_api[i].syntax,init_1,init_2,init_cond,  mid_1,mid_2,mid_cond, 	end]
                    }    
                }
            }
            else if(this.identyType(command) == "if"){
                let afterCommand = command.split("(")[1].replace(')', '')
                let conditional = verifyConditional(afterCommand,simbols)
                if(conditional == "=")
                    conditional = "=="
                let value_1 = afterCommand.split(conditional)[0]
                let value_2 = afterCommand.split(conditional)[1]
               
                for(let i = 0; i <= JAVA_api.length; i++){
                    if(JAVA_api[i].name == hare(command)){
                        return [JAVA_api[i].syntax,value_1,value_2,conditional]
                    }    
                }
            }
            else if(this.identyType(command) == "while"){
                let afterCommand = command.split("(")[1].replace(')', '')
                let conditional = verifyConditional(afterCommand,simbols)
                if(conditional == "=")
                    conditional = "=="
                let value_1 = afterCommand.split(conditional)[0]
                let value_2 = afterCommand.split(conditional)[1]
               
                for(let i = 0; i <= JAVA_api.length; i++){
                    if(JAVA_api[i].name == hare(command)){
                        return [JAVA_api[i].syntax,value_1,value_2,conditional]
                    }    
                }
            }
        }
        else if(lang == "PYTHON"){
            if(this.identyType(command) == "print_var"){
                let variable = command.split(',')[1].replace(')','');
                let string = command.split('"')[1];
                for(let i = 0; i <= Python_api.length; i++){
                    if(Python_api[i].name == hare(command)){
                        return [Python_api[i].syntax,variable,string]
                    }    
                }
            }
            if(this.identyType(command) == "for"){
                for(let i = 0; i <= Python_api.length; i++){
					let afterCommand = command.split("(")[1].replace(')', '')
					let init = afterCommand.split(';')[0]
					let init_1 = init.split(verifyConditional(init,simbols))[0]
					let init_2 = init.split(verifyConditional(init,simbols))[1]
					let init_cond = verifyConditional(init,simbols)
					
					let mid = afterCommand.split(';')[1]
					let mid_1 = mid.split(verifyConditional(mid,simbols))[0]
					let mid_2 = mid.split(verifyConditional(mid,simbols))[1]
					let mid_cond = verifyConditional(mid,simbols)
					
					let end = afterCommand.split(';')[2]
                    if(Python_api[i].name == hare(command)){ 
                        return [Python_api[i].syntax,init_1,init_2,init_cond, mid_1,mid_2,mid_cond, end]
                    }    
                }
            }
            else if(this.identyType(command) == "while"){
                let afterCommand = command.split("(")[1].replace(')', '')
                let conditional = verifyConditional(afterCommand,simbols)
                if(conditional == "=")
                    conditional = "=="
                let value_1 = afterCommand.split(conditional)[0]
                let value_2 = afterCommand.split(conditional)[1]
               
                for(let i = 0; i <= Python_api.length; i++){
                    if(Python_api[i].name == hare(command)){
                        return [Python_api[i].syntax,value_1,value_2,conditional]
                    }    
                }
            }
            if(this.identyType(command) == "print_no_var"){
                let string = command.split('"')[1];
                for(let i = 0; i <= Python_api.length; i++){
                    if(Python_api[i].name == hare(command)){
                        return [Python_api[i].syntax,string]
                    }    
                }
            }
            else if(this.identyType(command) == "if"){
                let afterCommand = command.split("(")[1].replace(')', '')
                let value_1 = afterCommand.split(verifyConditional(afterCommand,simbols))[0]
                let value_2 = afterCommand.split(verifyConditional(afterCommand,simbols))[2]
                let conditional = verifyConditional(afterCommand,simbols)
                if(conditional == "=")
                     conditional = "=="
                for(let i = 0; i <= Python_api.length; i++){
                    if(Python_api[i].name == hare(command)){
                        return [Python_api[i].syntax,value_1,value_2,conditional]
                    }    
                }
            }
        }
        else if(lang == "JS"){
            if(this.identyType(command) == "print_var"){
                let variable = command.split(',')[1].replace(')','');
                let string = command.split('"')[1];
                for(let i = 0; i <= JS_api.length; i++){
                    if(JS_api[i].name == hare(command)){
                        return [JS_api[i].syntax,variable,string]
                    }    
                }
            }
            if(this.identyType(command) == "print_no_var"){
                let string = command.split('"')[1];
                for(let i = 0; i <= JS_api.length; i++){
                    if(JS_api[i].name == hare(command)){
                        return [JS_api[i].syntax,string]
                    }    
                }
            }
            else if(this.identyType(command) == "if"){
                let afterCommand = command.split("(")[1].replace(')', '')
                let value_1 = afterCommand.split(verifyConditional(afterCommand,simbols))[0]
                let value_2 = afterCommand.split(verifyConditional(afterCommand,simbols))[2]
                let conditional = verifyConditional(afterCommand,simbols)
                if(conditional == "=")
                    conditional = "=="
                for(let i = 0; i <= JS_api.length; i++){
                    if(JS_api[i].name == hare(command)){
                        return [JS_api[i].syntax,value_1,value_2,conditional]
                    }    
                }
            }
            if(this.identyType(command) == "for"){
                for(let i = 0; i <= JS_api.length; i++){
					let afterCommand = command.split("(")[1].replace(')', '')
					let init = afterCommand.split(';')[0]
					let init_1 = init.split(verifyConditional(init,simbols))[0]
					let init_2 = init.split(verifyConditional(init,simbols))[1]
					let init_cond = verifyConditional(init,simbols)
					
					let mid = afterCommand.split(';')[1]
					let mid_1 = mid.split(verifyConditional(mid,simbols))[0]
					let mid_2 = mid.split(verifyConditional(mid,simbols))[1]
					let mid_cond = verifyConditional(mid,simbols)
					
					let end = afterCommand.split(';')[2]
                    if(Python_api[i].name == hare(command)){ 
                        return [Python_api[i].syntax,init_1,init_2,init_cond,  mid_1,mid_2,mid_cond,end]
                    }    
                }
            }
            else if(this.identyType(command) == "while"){
                let afterCommand = command.split("(")[1].replace(')', '')
                let conditional = verifyConditional(afterCommand,simbols)
                if(conditional == "=")
                    conditional = "=="
                let value_1 = afterCommand.split(conditional)[0]
                let value_2 = afterCommand.split(conditional)[1]
               
                for(let i = 0; i <= JS_api.length; i++){
                    if(JS_api[i].name == hare(command)){
                        return [JS_api[i].syntax,value_1,value_2,conditional]
                    }    
                }
            }
        }
    }
    structure(rawCommand,command, lang){
        function count(num){
            for(let i = 1; i <= num; i++){
                let codeEnd = document.getElementById("end");
                codeEnd.innerText += "}\n"
            }
        }
    
        let codeStart = document.getElementById("start");
        let codeMid = document.getElementById("mid");
        let codeEnd = document.getElementById("end");
        if(lang == "JAVA"){
            codeStart.innerText = ``;
            codeStart.innerText += `${this.command("start_class","JAVA")} Primeira_Classe{`;
            codeStart.innerText += `\n${this.command("public_void","JAVA")}{`
            if(codeEnd.innerHTML == ""){
                count(2)
            }
            if(this.identyType(rawCommand) == "print_var"){
                codeMid.innerText += `${this.command("str","JAVA")} first_var = ${command[1]}\n`
                codeMid.innerText += `${command[0]}("${command[2]}", first_var)\n`
                let inp = document.getElementById("cond")
                let btn = document.getElementById("condButton");
      
                
                
            }
            if(this.identyType(rawCommand) == "print_no_var"){
                codeMid.innerHTML += `<print>${command[0]}</print>`
                codeMid.innerHTML += ` (<string>"${command[1]}"</string>)\n`
                
                let inp = document.getElementById("cond")
                let btn = document.getElementById("condButton");
                btn.style.display = "none"
                inp.style.display = "none"
                
            }
			if(this.identyType(rawCommand) == "for"){
				let init_1 = command[1]
                let init_2 = command[2]
                let init_cond = command[3]
				
				let mid_1 = command[4]
                let mid_2 = command[5]
                let mid_cond = command[6]
				
				let end = init_1.replace(" ","")
				let cmd = `${command[0]}(${init_1} ${init_cond} ${init_2}; ${init_1} ${mid_cond} ${mid_2}; ${end}++)  `
				let cg = document.getElementById("command")
				cg.value = `Para(${init_1} ${init_cond} ${init_2}; ${init_1} ${mid_cond} ${mid_2}; ${end}++)`
                
				codeMid.innerText += `${command[0]}(${init_1} ${init_cond} ${init_2}; ${init_1} ${mid_cond} ${mid_2}; ${end}++){\n   `
				count(1)
				let inp = document.getElementById("cond")
                let btn = document.getElementById("condButton");
                btn.style.display= "block"
                inp.style.display= "block"
                btn.onclick = function()
                {
                    translateCallBack(inp.value, "JAVA")

                }
			}
            if(this.identyType(rawCommand) == "while"){
                let val_1 = command[1]
                let val_2 = command[2]
                let cond = command[3]
                let inp = document.getElementById("cond")
                let btn = document.getElementById("condButton");
                btn.style.display= "block"
                inp.style.display= "block"
                btn.onclick = function()
                {
                    translateCallBack(inp.value, "JAVA")

                }
                codeMid.innerText += `${command[0]}(${val_1} ${cond} ${val_2}){\n   `
                count(1)
            }
            if(this.identyType(rawCommand) == "if"){
                let val_1 = command[1]
                let val_2 = command[2]
                let cond = command[3]
                let inp = document.getElementById("cond")
                let btn = document.getElementById("condButton");
                btn.style.display= "block"
                inp.style.display= "block"
                btn.onclick = function()
                {
                    translateCallBack(inp.value, "JAVA")

                }
                codeMid.innerText += `${command[0]}(${val_1} ${cond} ${val_2}){\n   `
                count(1)
            }
           
        }
        if(lang == "PYTHON"){
            if(this.identyType(rawCommand) == "print_var"){
                codeMid.innerText += `first_var = ${command[1]}`
                codeMid.innerText += `\n${command[0]}("${command[2]}", first_var)\n`
                let inp = document.getElementById("cond")
                let btn = document.getElementById("condButton");
                btn.style.display= "none"
                inp.style.display= "none"
                
            }
            if(this.identyType(rawCommand) == "print_no_var"){
                codeMid.innerHTML += `<print>${command[0]}</print>(<string>"${command[1]}"</string>)\n`
                let inp = document.getElementById("cond")
                let btn = document.getElementById("condButton");
                btn.style.display= "none"
                inp.style.display= "none"
                
            }
            if(this.identyType(rawCommand) == "if"){
                let val_1 = command[1]
                let val_2 = command[2]
                let cond = command[3]
                let inp = document.getElementById("cond")
                let btn = document.getElementById("condButton");
                btn.style.display= "block"
                inp.style.display= "block"
                btn.onclick = function()
                {
                    translateCallBack(inp.value, "PYTHON")

                }
                codeMid.innerHTML += `<loop>${command[0]}</loop>
                 <string>${val_1} </string> ${cond} <string>${val_2}</string>:\n   `
            }
            if(this.identyType(rawCommand) == "for"){
				let init_1 = command[1]
                let init_2 = command[2]
                let init_cond = command[3]
				
				let mid_1 = command[4]
                let mid_2 = command[5]
                let mid_cond = command[6]
			
				let end = init_1.replace(" ","")    
				let cg = document.getElementById("command")
				cg.value = `Para(${init_1} ${init_cond} ${init_2}; ${init_1} ${mid_cond} ${mid_2}; ${end}++)`
                
				codeMid.innerHTML += `<loop>${command[0]}</loop><string>${init_2}</string> in range <string>${mid_2}</string>:\n   `
				let inp = document.getElementById("cond")
                let btn = document.getElementById("condButton");
                btn.style.display= "block"
                inp.style.display= "block"
                btn.onclick = function()
                {
                    translateCallBack(inp.value, "PYTHON")
                }
			}
            if(this.identyType(rawCommand) == "while"){
                let val_1 = command[1]
                let val_2 = command[2]
                let cond = command[3]
                let inp = document.getElementById("cond")
                let btn = document.getElementById("condButton");
                let lb = document.getElementById("label-cond");
                btn.style.display= "block"
                inp.style.display= "block"
                lb.style.display = "block"
                btn.onclick = function()
                {
                    translateCallBack(inp.value, "PYTHON")

                }
                codeMid.innerHTML += `<loop>${command[0]}</loop>(<string>${val_1}</string> ${cond} <string>${val_2}</string>):\n   `
  
            }
        }
        if(lang == "JS"){
            if(this.identyType(rawCommand) == "print_var"){
                codeMid.innerText += `${this.command("var","JS")} first_var = ${command[1]}`
                codeMid.innerText += `\n${command[0]}("${command[2]}", first_var)\n`
                let inp = document.getElementById("cond")
                let btn = document.getElementById("condButton");
                btn.style.display= "none"
                inp.style.display= "none"
                
            }
            if(this.identyType(rawCommand) == "print_no_var"){
                codeMid.innerHTML += `<print>${command[0]}</print>(<string>"${command[1]}"</string>)\n`
                let inp = document.getElementById("cond")
                let btn = document.getElementById("condButton");
                btn.style.display= "none"
                inp.style.display= "none"
                
            }
            if(this.identyType(rawCommand) == "for"){
				let init_1 = command[1]
                let init_2 = command[2]
                let init_cond = command[3]
				
				let mid_1 = command[4]
                let mid_2 = command[5]
                let mid_cond = command[6]
				
				let end = init_1.replace(" ","")
				let cmd = `${command[0]}(${init_1} ${init_cond} ${init_2}; ${init_1} ${mid_cond} ${mid_2}; ${end}++)  `
				let cg = document.getElementById("command")
				cg.value = `Para(${init_1} ${init_cond} ${init_2}; ${init_1} ${mid_cond} ${mid_2}; ${end}++)`
                
				codeMid.innerText += `${command[0]}(${init_1} ${init_cond} ${init_2}; ${init_1} ${mid_cond} ${mid_2}; ${end}++){\n   `
				count(1)
				let inp = document.getElementById("cond")
                let btn = document.getElementById("condButton");
                btn.style.display= "block"
                inp.style.display= "block"
                btn.onclick = function()
                {
                    translateCallBack(inp.value, "JS")

                }
			}
            if(this.identyType(rawCommand) == "if"){
                let val_1 = command[1]
                let val_2 = command[2]
                let cond = command[3]
                let inp = document.getElementById("cond")
                let btn = document.getElementById("condButton");
                btn.style.display= "block"
                inp.style.display= "block"
                btn.onclick = function()
                {
                    translateCallBack(inp.value, "JS")
                    

                }
                codeMid.innerText += `${command[0]}(${val_1} ${cond} ${val_2}){\n   `
                count(1)
            }
            if(this.identyType(rawCommand) == "while"){
                let val_1 = command[1]
                let val_2 = command[2]
                let cond = command[3]
                let inp = document.getElementById("cond")
                let btn = document.getElementById("condButton");
                btn.style.display= "block"
                inp.style.display= "block"
                btn.onclick = function()
                {
                    translateCallBack(inp.value, "JS")

                }
                codeMid.innerText += `${command[0]}(${val_1} ${cond} ${val_2}){\n   `
                count(1)
            }
        }
    }
    translate(userCommand, lang){
        if(lang == "JAVA")
            this.structure(userCommand,this.identyCommand(userCommand,lang), lang)
        if(lang == "PYTHON")
            this.structure(userCommand,this.identyCommand(userCommand,lang), lang)
        if(lang == "JS")
            this.structure(userCommand,this.identyCommand(userCommand,lang), lang)
    }
    
}
var codeTranslate = new Translate();
function translateCallBack(command, lang){
   return codeTranslate.translate(command, lang)
}   
$(function(){
    $('#command').autocomplete({
        minLength: 2,
		source: function (request, response) {
			response($.map(PseudoCode, function (obj, key) {
				
				var name = obj.syntax.toUpperCase();
				
				if (name.indexOf(request.term.toUpperCase()) != -1) {				
					return {
						label: obj.syntax,
                        desc: obj.usage,
                        use: obj.howUse
					}
				} else {
					return null;
				}
			}));			
		}
    }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
        return $( "<li></li>" )
            .data( "item.autocomplete", item )
            .append( "<a>" + item.label + "<p>"+ item.desc + "</p> <f>"+ item.use + "</f>" )
            .append( "</a>" )
            .appendTo( ul );
            
    };

    $('#cond').autocomplete({
        minLength: 2,
		source: function (request, response) {
			response($.map(PseudoCode, function (obj, key) {
				
				var name = obj.syntax.toUpperCase();
				
				if (name.indexOf(request.term.toUpperCase()) != -1) {				
					return {
						label: obj.syntax,
                        desc: obj.usage,
                        use: obj.howUse
					}
				} else {
					return null;
				}
			}));			
		}
    }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
        return $( "<li></li>" )
            .data( "item.autocomplete", item )
            .append( "<a>" + item.label + "<p>"+ item.desc + "</p> <p>"+ item.use + "</p>" )
            .append( "</a>" )
            .appendTo( ul );
            
    };
});
function translateCommand(){
        cleanCode();
        let LangSelect = document.querySelector('input[name="lang"]:checked').value;
        let commandFromUser = document.getElementById("command").value;
        switch(LangSelect){
            case 'Python':
                codeTranslate.translate(commandFromUser, "PYTHON");
                break;
            case 'JAVA':
                codeTranslate.translate(commandFromUser, "JAVA");
                break;
            case 'JS':
                codeTranslate.translate(commandFromUser, "JS")
                break;
        
        }
}

const cleanCode = () =>{
    document.getElementById("start").innerText = ``
    document.getElementById("mid").innerText = ``
    document.getElementById("end").innerText = ``
}
