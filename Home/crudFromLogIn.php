<!-- executar, verificar se está tudo certo, em seguida acrescentar campo "idade" alterando código dos arquivos -->

<?php

	//Recuperando valor das variaveis do formulario
	$name = $_POST["name"];
	$email = $_POST["email"];
	$pwd = $_POST["password"];
	$act = $_POST["Act"];

    
	$emailLOG = $_POST["emailLog"];
	$pwdLOG = $_POST["passwordLog"];


	//Abrindo a conexao com o banco de dados
	$con = new mysqli("127.0.0.1:3306", "root", "", "users");
	// 127.0.0:3306 endereço banco de dados porta padrão 
	// root é o administrador do bd e "" não requer senha
	// minhaloja é o nome do banco de dados
	session_start(); //inicia a sessao

    if($act == "l"){
        $sql = "select email,pwd,name from usersreg where email='$emailLOG'";
    
        $resEmail = $con->query($sql);
        $resPwd = $con->query($sql);
        $resName = $con->query($sql);
        $rowEmail =  $resEmail->fetch_array()[0];
        $rowPWD =  $resPwd->fetch_array()[1];
        $rowName =  $resName->fetch_array()[2];
       
       if($emailLOG == $rowEmail && $pwdLOG == $rowPWD){
             
        $_SESSION["aviso"] = "Bem-vindo(a) ".$rowName;
          
           
       }
       else{
        $_SESSION["aviso"] = "Desculpe, mas suas credenciais  não existem ou estão incorretas";


       }
       header("location: ".$_SERVER['HTTP_REFERER']);



        //echo ($row);
    }
	
	if($act == "c"){ //se a acao for para inserir (cadastrar)
		$sql = "insert into usersreg (name, email, pwd) values ('$name', '$email','$pwd')"; //SQL utilizado para consulta
		$res = $con->query($sql); //Excecuta o comando no banco de dados e armazena a resposta em $res
		$_SESSION["aviso"] = "O cadastro foi efetuado com sucesso"; //salva um aviso para ser impresso na pagina inicial e...
		header("location: ".$_SERVER['HTTP_REFERER']); //redireciona de volta para a pagina inicial
	}
	if($act == "r"){ //se a acao for para recuperar/ler dados
		$sql = "select * from usersreg where name='$name'"; //SQL utilizado para a consulta
		$res = $con->query($sql); //Excecuta o comando no banco de dados e armazena a resposta em $res
		if(mysqli_num_rows($res) > 0){ //checa se foram encontrados resultados
			echo("<table>");
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
		}
		else{
			echo "nenhum resultado encontrado buscando por: $name";
		}
		
		echo("<br><br><a href='".$_SERVER['HTTP_REFERER']."'>Voltar a pagina inicial</a>"); //cria um link para voltar a pagina inicial
	}
	if($act == "u"){ //se a acao for atualizar dados
		$sql = "update usersreg set email='$email' where name='$name'"; //SQL para a consulta
		$sql2 = "update usersreg set pwd='$pwd' where name='$name'"; //SQL para a consulta
		$res = $con->query($sql); //executa a consulta
		$res = $con->query($sql2); //executa a consulta
		$_SESSION["aviso"] = "O item foi alterado com sucesso"; //salva um aviso para ser impresso na pagina inicial e...
		header("location: ".$_SERVER['HTTP_REFERER']); //Redireciona para a pagina inicial
	}
	if($act == "d"){ //se a acao for deletar dados
		$sql = "delete from usersreg where name='$name'"; //SQL para a consulta
		$res = $con->query($sql); //executa a consulta
		$_SESSION["aviso"] = "Foi deletado um total de ".$con->affected_rows." itens"; //salva um aviso para ser impresso na pagina inicial e...
		header("location: ".$_SERVER['HTTP_REFERER']); //Redireciona para a pagina inicial
	}
	
	$con->close(); //fecha a conexao com o banco

?>