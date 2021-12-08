
<?php
	session_start();
	require_once('con_db.php');
	require_once('registrar.php');
	require_once('login.php');
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href='https://unpkg.com/boxicons@2.0.5/css/boxicons.min.css' rel='stylesheet'>
	<title>ElAlquimista</title>
	<link rel="stylesheet" type="text/css" href="Css/Prueba.css">
	<link rel="icon" href="Img/caballero.ico">
</head>
<body>
	
	<div class="Nav">
		<a class="Link" href="index.html" >ElAlquimista</a>
		<div class="AbrirCarrito">
			<i class='bx bx-cart-alt CarritoChiquito' ></i>
		</div>
		<?php
			if($_SESSION)
			{
				echo '<a href="logout.php" class="Logout QuitarFORMS">Log out</a>';
				echo '
						<div class="LoginLogeado">
							<i class="bx bx-user UsuarioIcono"></i> 
							<div class="LoginEscrito">
								';
				echo ucfirst($_SESSION['Nombre']);
				echo '
							</div>
						</div>
					 ';
				
			}
			else
			{
				echo '
						<div class="Login">
							<i class="bx bx-user UsuarioIcono"></i> 
							<div class="LoginEscrito">
								Login
							</div>
						</div>
					 ';
			}
		?>
	</div>

	<div class="Mensaje">
		Se agrego con exito al carrito
	</div>
	<div class="Fondo">
		<form class="LoginMeterDatos" method="post">
			<i class='bx bx-x CerrarLogin'></i>
			<p class="LoginTitulo">Usuario</p>
			<input type="text" name="EmailLogin" placeholder="Email">
    	    <input type="password" name="ContraLogin" placeholder="Password">
       		<button type="submit" name="Login">Login</button> 
       		<a href="index.html" class="OlvidasteCont">¿Olvidaste tu contraseña?</a>
       		<div class="RegistrarInput">
       			Crear cuenta
       		</div> 
       		<?php
    			if(isset($errorsLogin) && count($errorsLogin) > 0) 
    			{
      				foreach ($errorsLogin as $error_msgLogin) 
      	   	 	{
          				echo '<div class="Alert">' . $error_msgLogin . '</div>';
       				}
    			}
			?> 
		</form>
		<form class="LoginRegistrarDatos" method="post">
			<i class='bx bx-x CerrarRegistrar'></i>
			<i class='bx bx-arrow-back RegresarLogin'></i>
			<p class="RegistrarTitulo">Crear cuenta</p>
			<input type="textR" name="Usuario" placeholder="Nombre de usuario" id="Borrar">
			<input type="textR" name="Email" placeholder="Email">
    	    <input type="passwordR" name="Contra" placeholder="Contraseña">
    	    <input type="passwordR" name="RepetirContra" placeholder="Repita la contraseña">
       		<button type="submit" name="Registrar">Registrarse</button>
       		<?php
    			if(isset($errors) && count($errors) > 0) 
    			{
      				foreach ($errors as $error_msg) 
      	   	 	{
          				echo '<div class="Alert">' . $error_msg . '</div>';
       				}
    			}
			?> 
		</form>
	</div>

	<div class="DivCategorias">
	
	</div>

	<div class="Div_Agregar">
		
	</div>	

	<p class="Informacion">!Todos(!Casco@Aluminio#70$P34^Img/Casco.png*Retes@Cuero#20$iY2^Img/Casco.png*Pers@Platino#30$iY2^Img/Casco.png*Trepas@Acero#30$3Y8^Img/Casco.png*Ruams@Adamantium#20$1B7^Img/Casco.png*Aztes@Obsidiana#20$iY2^Img/Casco.png*Retes@Hierro#30$4M2^Img/Casco.png*Voladores@Oro#20$1B7^Img/Casco.png*Mongos(!Collar@Mallas#20$iY2^Img/Collar.png*Trepas@Adamantium#30$9P2^Img/Collar.png*Ruams@Oro#20$1B7^Img/Collar.png*Aztes@Cuero#20$iY2^Img/Collar.png*Retes@Adamantium#30$3Y8^Img/Collar.png*Voladores@Esmeralda#20$1B7^Img/Collar.png*Mongos@Mallas#20$iY2^Img/Collar.png*Pers(!Capa@Cuero#20$iY2^Img/Capa.png*Ruams@Hierro#30$4M2^Img/Capa.png*Aztes@Diamante#20$4M2^Img/Capa.png*Retes@Mallas#20$iY2^Img/Capa.png*Voladores@Obsidiana#30$9P2^Img/Capa.png*Mongos@Esmeralda#20$4M2^Img/Capa.png*Pers@Cuero#20$iY2^Img/Capa.png*Trepas(!Peto@Cuero#20$iY2^Img/Pecho.png*Aztes@Hierro#30$9P2^Img/Pecho.png*Retes@Diamante#20$1B7^Img/Pecho.png*Voladores@Cuero#20$iY2^Img/Pecho.png*Mongos@Oro#30$9P2^Img/Pecho.png*Pers@Esmeralda#20$3Y8^Img/Pecho.png*Trepas@Cuero#20$iY2^Img/Pecho.png*Ruams(!Cinturon@Cuero#20$iY2^Img/Cinturon.png*Aztes@Obsidiana#30$4M2^Img/Cinturon.png*Retes@Diamante#20$1B7^Img/Cinturon.png*Voladores@Obsidiana#30$4M2^Img/Cinturon.png*Mongos@Obsidiana#30$4M2^Img/Cinturon.png*Pers@Obsidiana#30$4M2^Img/Cinturon.png*Trepas@Obsidiana#30$4M2^Img/Cinturon.png*Ruams(!Botas@Obsidiana#20$iY2^Img/Pantalones.png*Retes@Adamantium#30$1B7^Img/Pantalones.png*Voladores@Diamante#20$3Y8^Img/Pantalones.png*Mongos@Obsidiana#20$iY2^Img/Pantalones.png*Pers@Obsidiana#20$iY2^Img/Pantalones.png*Trepas@Obsidiana#20$iY2^Img/Pantalones.png*Ruams@Obsidiana#20$iY2^Img/Pantalones.png*Aztes(!Anillo@Mallas#20$iY2^Img/Anillo.png*Voladores@Obsidiana#30$4M2^Img/Anillo.png*Mongos@Hierro#20$3Y8^Img/Anillo.png*Pers@Mallas#20$iY2^Img/Anillo.png*Trepas@Mallas#20$iY2^Img/Anillo.png*Ruams@Mallas#20$iY2^Img/Anillo.png*Aztes@Mallas#20$iY2^Img/Anillo.png*Retes(!Gemas@Mallas#20$iY2^Img/Gema.png*Mongos@Adamantium#30$9P2^Img/Gema.png*Pers@Oro#20$3Y8^Img/Gema.png*Trepas@Adamantium#30$9P2^Img/Gema.png*Ruams@Adamantium#30$9P2^Img/Gema.png*Aztes@Adamantium#30$9P2^Img/Gema.png*Retes@Adamantium#30$9P2^Img/Gema.png*Voladores(</p>

	<div class="Carrito None">
		<h4 class="Art">Estos son tus articulos</h4>
		<div class="Pedido">
			<a href="Pedido.html" class="PedidoLetras">  Hacer pedido  </a>
		</div>
		<p id="Total">Total: <p id="Precio"></p>
		<div class="CarritoAgregar">

		</div>
	</div>
	<script type="text/javascript" src="JavaScript/Js.js"></script>
</body>
</html>