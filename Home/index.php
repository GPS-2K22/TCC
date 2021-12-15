<?php
		if(isset($_SESSION["aviso"])){ //Se a variavel aviso foi criada na pagina anterior...
			echo($_SESSION["aviso"]); //imprime o aviso e...
			unset($_SESSION["aviso"]); //exclui o aviso da memoria
		} 
	?>
    