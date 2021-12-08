<?php
	session_start();
	require_once('con_db.php');
	require_once('CrearObjeto.php');
?>
<!DOCTYPE html>
<html>
<head>
<title>Title of the document</title>
</head>

<body>
	<form class="LoginMeterDatos" method="post">
		<p class="LoginTitulo">Objetos</p>
		<input type="text" name="Codigo" placeholder="Codigo">
    	<input type="text" name="Raza" placeholder="Raza">
    	<input type="text" name="Material" placeholder="Material">
    	<input type="text" name="NombreImagen" placeholder="NombreImagen">
    	<input type="text" name="Precio" placeholder="Precio">
    	<input type="text" name="NombreIcono" placeholder="NombreIcono">
       	<button type="submit" name="CrearObj" style="">Crear objeto</button>
    </form> 
    <script type="text/javascript" src="Paginabase.js"></script>
</body>

</html>