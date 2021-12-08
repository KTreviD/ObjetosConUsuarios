<?php
	require_once("con_db.php");
	
	if(isset($_POST['Registrar']))
	{
		if(strlen($_POST['Usuario']) >= 1 && strlen($_POST['Email']) >= 1 && strlen($_POST['Contra']) >= 8 &&  strlen($_POST['RepetirContra']) >= 8 && $_POST['Contra'] == $_POST['RepetirContra'])
		{
			$Usuario = trim($_POST['Usuario']);
			$Email = trim($_POST['Email']);
			$Password = trim($_POST['Contra']);
			$HashPassword = password_hash($Password, PASSWORD_BCRYPT);
			$FechaReg = date('d/m/y H:i:s');
			if(filter_var($Email,FILTER_VALIDATE_EMAIL))
			{
				$Sql = 'select * from usuariocuenta where Email = :Email';
				$Stmt = $pdo->prepare($Sql);
				$P = ['Email'=>$Email];
				$Stmt->execute($P);

				if($Stmt->rowCount() == 0)
				{
					$Sql = "INSERT INTO usuariocuenta (Nombre, Email, `Password`, created_at,updated_at) values(:vnombre,:email,:pass,:created_at,:updated_at)";
					try{
                    $handle = $pdo->prepare($Sql);
                    $params = [
                        ':vnombre'=>$Usuario,
                        ':email'=>$Email,
                        ':pass'=>$HashPassword,
                        ':created_at'=>$FechaReg,
                        ':updated_at'=>$FechaReg
                    ];
                    
                    $handle->execute($params);
                    
                    $success = 'Usuario creado correctamente!!';
                    
                }
	                catch(PDOException $e){
	                    $errors[] = $e->getMessage();
	                }
	            }
	            else
	            {
	                $valFirstName = $Usuario;
	                $valEmail = '';
	                $valPassword = $Password;
	 
	                $errors[] = 'El Email ya esta registrado';
	            }
	        }
	        else
	        {
	            $errors[] = "El Email no es valido.";
	        }
	    }
	    else
	    {
	        if(!isset($_POST['Usuario']) || empty($_POST['Usuario']))
	        {
	            $errors[] = 'El nombre es requerido.';
	        }
	        else
	        {
	            $valFirstName = $_POST['Usuario'];
	        }
	        if(!isset($_POST['Email']) || empty($_POST['Email']))
	        {
	            $errors[] = 'Email es requerido.';
	        }
	        else
	        {
	            $valEmail = $_POST['Email'];
	        }
	 
	        if(!isset($_POST['Contra']) || empty($_POST['Contra']))
	        {
	            $errors[] = 'El Password es requerido.';
	        }
	        else
	        {
	            $valPassword = $_POST['Contra'];
	            if(strlen($_POST['Contra']) < 8 || strlen($_POST['RepetirContra']) < 8)
	        	{
	        	    $errors[] = 'La contraseña minima son 8 caracteres.';
	        	}
	        	else
	        	{
	        		if($_POST['Contra'] != $_POST['RepetirContra'])
	      			{
	        	    	$errors[] = 'Las contraseñas deben coincidir.';
	        		}
	        	}
	        }

	        
	    }
	 
	}

	
?>