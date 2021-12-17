
<?php session_start();  //inicia a sessao ?>
<?php include 'style.php'; ?>
<html>
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
        integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script>
	function submitForm(paramAct){ //submete o formulario mas passando...
		document.getElementById('Act').value = paramAct; //o valor do campo de texto escondido para o valor do botao clicado para selecionar a acao e...
		document.getElementById('form').submit(); //efetua a submissao do formulario
	}
    


	</script>
	

</head>
<body>
<div class="container">
        <div class="content first-content">
            <div class="first-column">
                <h2 class="title title-primary">Bem-vindo de volta!</h2>
                <p class="description description-primary">Se mantenha conectado conosco,</p>
                <p class="description description-primary">caso possua uma conta clique no botão abaixo</p>
                <button id="signin" class="btn btn-primary">Log In</button>
            </div>    
            <div class="second-column">
                <h2 class="title title-second">Registrar Agora!</h2>
               
                <p class="description description-second">Insira as informações abaixo:</p>
                <form class="form" name="f" id="form" method="post" action="crudFromLogIn.php">
                    <label class="label-input" for="">
                        <i class="far fa-user icon-modify"></i>
                        <input type="text"   name="name" placeholder="Nome">
                    </label>
                    
                    <label class="label-input" for="">
                        <i class="far fa-envelope icon-modify"></i>
                        <input type="email" name="email" placeholder="Email">
                    </label>
                    
                    <label class="label-input" for="">
                        <i class="fas fa-lock icon-modify"></i>
                        <input type="password"name="password" placeholder="Senha">
                    </label>
                    
                    <input type="text" name="Act" id="Act" style="display:none"></input><br>

                    <button class="btn btn-second"  onclick="submitForm('c');">Criar!</button>        
                </form>
            </div><!-- second column -->
        </div><!-- first content -->
        <div class="content second-content">
            <div class="first-column">
                <h2 class="title title-primary">Ei!</h2>
                <p class="description description-primary">Se você não possui conta que tal criar uma? </p>
                <p class="description description-primary">clique no botão abaixo para começar!</p>
                <button id="signup" class="btn btn-primary">Cadastrar</button>
            </div>
            <div class="second-column">
                <h2 class="title title-second">entre em sua conta</h2>
               
                <p class="description description-second">use seu email e senha de cadastro nos espaços abaixo:</p>
                <form class="form" name="f" id="forml" method="post" action="crudFromLogIn.php"">
                
                    <label class="label-input" for="">
                        <i class="far fa-envelope icon-modify"></i>
                        <input type="email"  name="emailLog" value="" placeholder="Email">
                    </label>
                
                    <label class="label-input" for="">
                        <i class="fas fa-lock icon-modify"></i>
                        <input type="password" placeholder="Senha"  name="passwordLog" value="" >
                    </label>
					
					
					<input type="text" name="Act" id="ActL" style="display:none"></input><br>
                    <a class="password" href="#">Esqueceu a senha?</a>


                    <button  class="btn btn-second"   onclick="submitFormLog('l');">Logar!</button>

					<?php
if(isset($_SESSION["aviso"])){ //Se a variavel aviso foi criada na pagina anterior...
    echo("<p class='description description-second'>".$_SESSION["aviso"]."</p>"); //imprime o aviso e...
    unset($_SESSION["aviso"]); //exclui o aviso da memoria
} 
?>
                </form>
            </div><!-- second column -->
        </div><!-- second-content -->
    </div>
<script>


var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");


btnSignin.addEventListener("click", function () {
   body.className = "sign-in-js"; 
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
})

</script>


<script>
function submitFormLog(paramAct){ //submete o formulario mas passando...
document.getElementById('ActL').value = paramAct; //o valor do campo de texto escondido para o valor do botao clicado para selecionar a acao e...
document.getElementById('forml').submit(); //efetua a submissao do formulario
}



</script>

<?php

$con = new mysqli("127.0.0.1:3306", "root", "", "users"); //executa a conexao com o banco
$sql = "select * from usersreg"; // seleciona todos os dados ta tabela produtos
$res = $con->query($sql); //executa a consulta SQL
if(mysqli_num_rows($res) > 0){ //checa se foram encontrados resultados
    echo("<div id='tbEx'>");
    echo("<table>"); //daqui pra baixo estamos montando a tabela
    echo("<tr><th>Id</th><th>Nome</th><th>Email</th><th>Senha</th></tr>"); //cabecalho da tabela
    while($campo = $res->fetch_assoc()){ //para cada linha de resultado recuperada da consulta monta uma linha em <table>
        echo("<tr>");
        echo("<td>".$campo["idUser"]."</td>"); //seleciona o valor no campo 'idprod' para a execucao do laco atual do while
        echo("<td>".$campo["name"]."</td>"); //seleciona o valor no campo 'nome' para a execucao do laco atual do while
        echo("<td>".$campo["email"]."</td>");
        echo("<td>".$campo["pwd"]."</td>"); //seleciona o valor no campo 'imagem' para a execucao do laco atual do while
        echo("</tr>");
    }
    echo("</table>"); //finaliza a tabela
    echo("</div>");
}
else{ //nenhum dado na tabela
    echo "nenhum dado inserido por enquanto";
}

?>
	
<body>
</html>