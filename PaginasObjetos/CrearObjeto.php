<?php
	
	function CrearArchivo($CodigoFuncion,$ImagenFuncion,$IconoFuncion,$RazaFuncion,$MaterialFuncion,$PrecioFuncion)
	{
		$PaginaCreada = fopen("$CodigoFuncion" . ".html","x");
		fwrite($PaginaCreada,'<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>'.$CodigoFuncion.'</title>
	<link rel="stylesheet" type="text/css" href="BaseCss.css">
</head>

<body>
	<header class="Header">
		<h3 class="CodigoTitulo">'.$CodigoFuncion.'</h3>
	</header>
	<div class="DivMayor">
		<div class="DivImagenMayor">
			<img class="DivImagen" src="../Img/'.$ImagenFuncion.'">	
		</div>
		
		<div class="DivInfo">
			<img class="DivIcono"src="../Img/'.$IconoFuncion.'">
			<p>'.$RazaFuncion.'</p>
			<p>'.$MaterialFuncion.'</p>
			<p>'.$PrecioFuncion.'</p>
		</div>
	</div>
	<script type="text/javascript" src="PaginaBase.js"></script>
</body>

</html>');
		fclose($PaginaCreada);
	}

	if(isset($_POST['CrearObj']))
	{
		$Codigo = trim($_POST['Codigo']);
		$Raza = trim($_POST['Raza']);
		$Material = trim($_POST['Material']);
		$NombreImagen = trim($_POST['NombreImagen']);
		$Precio = trim($_POST['Precio']);
		$NombreIcono = trim($_POST['NombreIcono']);
		$FechaReg = date('d/m/y H:i:s');

		$Sql = 'select * from objetos where Codigo = :Codigo';
		$Stmt = $pdo->prepare($Sql);
		$P = ['Codigo'=>$Codigo];
		$Stmt->execute($P);

		if($Stmt->rowCount() == 0)
		{
			$Sql = "INSERT INTO objetos (Codigo, Raza, Material, NombreImagen, Precio, NombreIcono, FechaReg) values(:vCodigo, :vRaza, :vMaterial,:vNombreImagen, :vPrecio, :vNombreIcono, :vFechaReg)";
			try{
                    $handle = $pdo->prepare($Sql);
                    $params = [
                        ':vCodigo'=>$Codigo,
                        ':vRaza'=>$Raza,
                        ':vMaterial'=>$Material,
                        ':vNombreImagen'=>$NombreImagen,
                        ':vPrecio'=>$Precio,
                        ':vNombreIcono'=>$NombreIcono,
                        ':vFechaReg'=>$FechaReg,
                    ];
                    
                    $handle->execute($params);


                    CrearArchivo("$Codigo","$NombreImagen","$NombreIcono","$Raza","$Material","$Precio");

                    $success = 'Usuario creado correctamente!!';
                    
                }
	                catch(PDOException $e)
	                {
	                    $errors[] = $e->getMessage();
	                }
	    }
	    
	}

?>