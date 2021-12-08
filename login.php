<?php
	if(isset($_POST['Login']))
	{
		if(isset($_POST['EmailLogin'],$_POST['ContraLogin']) && !empty($_POST['EmailLogin']) && !empty($_POST['ContraLogin']))
		{
			$Email = trim($_POST['EmailLogin']);
			$PasswordLogin = trim($_POST['ContraLogin']);
	 
			if(filter_var($Email, FILTER_VALIDATE_EMAIL))
			{
				$sql = "select * from usuariocuenta where Email = :Email ";
				$handle = $pdo->prepare($sql);
				$params = ['Email'=>$Email];
				$handle->execute($params);
				if($handle->rowCount() > 0)
				{
					$getRow = $handle->fetch(PDO::FETCH_ASSOC);
					if(password_verify($PasswordLogin, $getRow['Password']))
					{
						unset($getRow['Password']);
						$_SESSION = $getRow;
						header('location:Compra.php');
						exit();
					}
					else
					{
						$errorsLogin[] = "Error en  Email o Password";
					}
				}
				else
				{
					$errorsLogin[] = "Error Email o Password";
				}
				
			}
			else
			{
				$errorsLogin[] = "Email no valido";	
			}
	 
		}
		else
		{
			$errorsLogin[] = "Email y Password son requeridos";	
		}
	}

	
							
?>