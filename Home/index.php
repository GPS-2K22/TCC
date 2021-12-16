<?php include 'style.php'; ?>
<html>
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">



<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script>
	function submitForm(paramAct){ //submete o formulario mas passando...
		document.getElementById('Act').value = paramAct; //o valor do campo de texto escondido para o valor do botao clicado para selecionar a acao e...
		document.getElementById('form').submit(); //efetua a submissao do formulario
	}
	</script>
	<?php session_start(); //inicia a sessao ?>
</head>
<body>

	<form name="f" id="form" method="post" action="crud.php">
		<input type="text" name="nome" value="" placeholder="Nome" class="inpuTxt"></input><br>
		<input type="text" name="imagem" value="" placeholder="Imagem" class="inpuTxt" ></input><br>
		<input type="text" name="idade" value="" placeholder="Idade" class="inpuTxt"></input><br>
		<input type="text" name="Act" id="Act" style="display:none"></input><br>



		<input type="button" value="Create" onclick="submitForm('c');" class="buttonAss" id="btnC" ></input>
		<input type="button" value="Restore" onclick="submitForm('r');"  class="buttonAss" id="btnR"></input>
		<input type="button" value="Update" onclick="submitForm('u');"  class="buttonAss" id="btnU"></input>
		<input type="button" value="Delete" onclick="submitForm('d');"   class="buttonAss"id="btnD"></input>
	</form>
	<br><br>
	<?php
		if(isset($_SESSION["aviso"])){ //Se a variavel aviso foi criada na pagina anterior...
			echo($_SESSION["aviso"]); //imprime o aviso e...
			unset($_SESSION["aviso"]); //exclui o aviso da memoria
		} 
	?>
	<hr /><br>
   <?php
  
		$con = new mysqli("127.0.0.1:3306", "root", "", "banco"); //executa a conexao com o banco
		$sql = "select * from produtos"; // seleciona todos os dados ta tabela produtos
		$res = $con->query($sql); //executa a consulta SQL
		if(mysqli_num_rows($res) > 0){ //checa se foram encontrados resultados
			echo("<div id='tbEx'>");
			echo("<table>"); //daqui pra baixo estamos montando a tabela
			echo("<tr><th>idprod</th><th>nome</th><th>idade</th><th>imagem</th></tr>"); //cabecalho da tabela
			while($campo = $res->fetch_assoc()){ //para cada linha de resultado recuperada da consulta monta uma linha em <table>
				echo("<tr>");
				echo("<td>".$campo["idprod"]."</td>"); //seleciona o valor no campo 'idprod' para a execucao do laco atual do while
				echo("<td>".$campo["nome"]."</td>"); //seleciona o valor no campo 'nome' para a execucao do laco atual do while
				echo("<td>".$campo["idade"]."</td>");
				echo("<td>".$campo["imagem"]."</td>"); //seleciona o valor no campo 'imagem' para a execucao do laco atual do while
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