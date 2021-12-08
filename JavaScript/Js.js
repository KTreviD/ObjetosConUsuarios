function Ajax(_URL)
{
	var http = new XMLHttpRequest();
	var url = _URL;

	http.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			console.log(this.responseText + "h");
		}
	}

	http.open('GET',_URL);
	http.send();
}


var EtiquetaTarjeta = [], BtnAgregarCarritoHTML = [], Tam = [], SeleccionarCategoria = [], CodigoHTML = [],NombreTarjetaHTML = [], PrecioTarjetaHTML = [], RazaHTML = [], ImagenCodigoHTML = [];
var BorrarArticuloCarrito = [[]], ContadorArticulos = [[]], ContadorLocal = [[]], BtnBorrarCarrito = [[]];
var Total = 0, CategoriaSeleccionada;
var ImagenTarjetaHTML = [];
var Iniciador = localStorage.getItem("Total");
var IniciadorID = localStorage.getItem("Id");
const CarritoAgregar = document.querySelector(".CarritoAgregar");
const DivCategorias = document.querySelector(".DivCategorias");
const DivTarjetasArticulos = document.querySelector(".Div_Agregar");
const TotalMostrar = document.querySelector("#Total");
const IconoCarrito = document.querySelector(".CarritoChiquito");
const Mensaje = document.querySelector(".Mensaje");
const Carrito = document.querySelector(".Carrito");
const Fondo = document.querySelector(".Fondo");
const PrecioTotalCarrito = document.querySelector("#Precio");

TotalMostrar.style.display = "inline-block";
PrecioTotalCarrito.style.display = "inline-block";

Inicial();

IconoCarrito.addEventListener('click', () =>
{
	Carrito.classList.toggle("None");
});

function Inicial()
{
	Fondo.classList.toggle("Fondo");
	if(Iniciador)
	{
		Total = localStorage.getItem("Total");
		PrecioTotalCarrito.innerHTML = Total;
	}
	else
	{
		localStorage.setItem("Total",0);
		Total = 0;
		PrecioTotalCarrito.innerHTML = Total;
	}
	if(IniciadorID)
	{
		CategoriaSeleccionada = localStorage.getItem("Id");
	}
	else
	{
		localStorage.setItem("Id",1);
		CategoriaSeleccionada = 1;
	}
}

function CreaTodo(_NumCategoria, _TotalAdentroDeCategoria)
{
	ContadorArticulos.push([]);
	ContadorLocal.push([]);
	BorrarArticuloCarrito.push([]);
	BtnBorrarCarrito.push([]);

	for(var j = 0 ; j < _TotalAdentroDeCategoria ; j++)
	{
		let VerificarContador = localStorage.getItem("Contador" + [_NumCategoria] + [j]);
		if(VerificarContador == undefined)
		{		
			ContadorArticulos[_NumCategoria][j] = 0;
		}
		else
		{
			ContadorArticulos[_NumCategoria][j] = VerificarContador;
		}
	}

	for(var j = 0 ; j < _TotalAdentroDeCategoria ; j++)
	{
		let VerificarCarritoExiste = localStorage.getItem("Carrito" + [_NumCategoria] + [j]);
		if(VerificarCarritoExiste != null)
		{
			let ArticuloEnCarrito = document.createElement('div');
			let Compra = document.createElement('p');
			BtnBorrarCarrito[_NumCategoria][j] = document.createElement('div');

			ArticuloEnCarrito.setAttribute("id", "Id" + _NumCategoria + j);

			Compra.style.display = "inline-block";
			BtnBorrarCarrito[_NumCategoria][j].classList.toggle("CarritoX");
			BtnBorrarCarrito[_NumCategoria][j].innerHTML = "X";
			Compra.innerHTML = VerificarCarritoExiste + parseInt(localStorage.getItem("Contador" + _NumCategoria + j));

			ArticuloEnCarrito.classList.toggle("CarritoAdentro");
			Compra.classList.toggle("CarritoTexto");

			ArticuloEnCarrito.appendChild(Compra);
			ArticuloEnCarrito.appendChild(BtnBorrarCarrito[_NumCategoria][j]);
			CarritoAgregar.appendChild(ArticuloEnCarrito);
			CrearBtnBorrarCarrito(_NumCategoria, j);
		}
	}
	SeleccionarCategoria[_NumCategoria] = document.createElement('div');
	SeleccionarCategoria[_NumCategoria].setAttribute("id", "Caja" + _NumCategoria);
	CategoriaSeleccionada =  parseInt(localStorage.getItem("Id"));
	if(_NumCategoria == CategoriaSeleccionada)
	{
		SeleccionarCategoria[CategoriaSeleccionada].classList.toggle("CategoriaSeleccionada");
	}
	else
	{
		SeleccionarCategoria[_NumCategoria].classList.toggle("Categorias");
	} 
	SeleccionarCategoria[_NumCategoria].innerHTML = CategoriasInfo[_NumCategoria].Categoria;
	DivCategorias.appendChild(SeleccionarCategoria[_NumCategoria]);
	SeleccionarCategoria[_NumCategoria].addEventListener('click', () =>
	{
		SeleccionarCategoria[CategoriaSeleccionada].classList.toggle("CategoriaSeleccionada");
		SeleccionarCategoria[CategoriaSeleccionada].classList.toggle("Categorias");
		SeleccionarCategoria[_NumCategoria].classList.toggle("Categorias");
		SeleccionarCategoria[_NumCategoria].classList.toggle("CategoriaSeleccionada");
		CategoriaSeleccionada = _NumCategoria;
		localStorage.setItem("Id", _NumCategoria);

		while(DivTarjetasArticulos.firstChild)
		{
			DivTarjetasArticulos.removeChild(DivTarjetasArticulos.firstChild);
		}

		CrearTarjetas(_NumCategoria);

		for(var i = 0 ; i < _TotalAdentroDeCategoria ; i++)
		{
			CrearBotonAgregarCarrito(_NumCategoria, i);
		}
	});
}

function CrearBtnBorrarCarrito(_NumCategoria, _NumAdentroDeCategoria)
{
	BtnBorrarCarrito[_NumCategoria][_NumAdentroDeCategoria].addEventListener('click', () =>
	{
		Total = parseInt(localStorage.getItem("Total"));

		ContadorLocal[_NumCategoria][_NumAdentroDeCategoria] = parseInt(localStorage.getItem("Contador" + [_NumCategoria] + [_NumAdentroDeCategoria]));

		Total -= ((CategoriasInfo[_NumCategoria].Precio[_NumAdentroDeCategoria]) * (ContadorLocal[_NumCategoria][_NumAdentroDeCategoria]));

		localStorage.setItem("Total",Total);
		Total = parseInt(localStorage.getItem("Total"));
		PrecioTotalCarrito.innerHTML = Total;

		localStorage.removeItem("Contador" + [_NumCategoria] + [_NumAdentroDeCategoria]);
		localStorage.removeItem("Carrito" + [_NumCategoria] + [_NumAdentroDeCategoria]);
		localStorage.removeItem("Unitario" + [_NumCategoria] + [_NumAdentroDeCategoria]);

		BorrarArticuloCarrito[_NumCategoria][_NumAdentroDeCategoria] = document.getElementById("Id" + _NumCategoria + _NumAdentroDeCategoria);
		CarritoAgregar.removeChild(BorrarArticuloCarrito[_NumCategoria][_NumAdentroDeCategoria]);
		ContadorArticulos[_NumCategoria][_NumAdentroDeCategoria] = 0;
	});
}

function CrearBotonAgregarCarrito(_NumCategoria, _NumAdentroDeCategoria)
{
	BtnAgregarCarritoHTML[_NumAdentroDeCategoria].addEventListener('click', () =>
	{	
		Quitar();
		setTimeout(Quitar,1500);
		Total = parseInt(localStorage.getItem("Total"));
		Total += CategoriasInfo[_NumCategoria].Precio[_NumAdentroDeCategoria];
		localStorage.setItem("Total", Total);
		Total = localStorage.getItem("Total");
		PrecioTotalCarrito.innerHTML = Total;

		let ArticuloEnCarrito = document.createElement('div');
		let Compra = document.createElement('p');
		BtnBorrarCarrito[_NumCategoria][_NumAdentroDeCategoria] = document.createElement('div');

		ArticuloEnCarrito.setAttribute("id", "Id" + _NumCategoria + _NumAdentroDeCategoria);

		BorrarArticuloCarrito[_NumCategoria][_NumAdentroDeCategoria] = document.getElementById("Id" + _NumCategoria + _NumAdentroDeCategoria);

		BtnBorrarCarrito[_NumCategoria][_NumAdentroDeCategoria].classList.toggle("CarritoX");
		BtnBorrarCarrito[_NumCategoria][_NumAdentroDeCategoria].innerHTML = "X";

		localStorage.setItem("Contador" + [_NumCategoria] + [_NumAdentroDeCategoria], (parseInt(ContadorArticulos[_NumCategoria][_NumAdentroDeCategoria]) + 1));
		ContadorLocal[_NumCategoria][_NumAdentroDeCategoria] = localStorage.getItem("Contador" + [_NumCategoria] + [_NumAdentroDeCategoria]);

		localStorage.setItem("Carrito" + [_NumCategoria] + [_NumAdentroDeCategoria], CategoriasInfo[_NumCategoria].Nombre[_NumAdentroDeCategoria] + " x ");
		var CarritoLocal = localStorage.getItem("Carrito" + [_NumCategoria] + [_NumAdentroDeCategoria]);

		localStorage.setItem("Unitario" + [_NumCategoria] + [_NumAdentroDeCategoria], (CategoriasInfo[_NumCategoria].Precio[_NumAdentroDeCategoria]));

		Compra.innerHTML = CarritoLocal + ContadorLocal[_NumCategoria][_NumAdentroDeCategoria];
		ArticuloEnCarrito.classList.toggle("CarritoAdentro");
		Compra.classList.toggle("CarritoTexto");
		ArticuloEnCarrito.appendChild(Compra);
		ArticuloEnCarrito.appendChild(BtnBorrarCarrito[_NumCategoria][_NumAdentroDeCategoria]);
		if(ContadorArticulos[_NumCategoria][_NumAdentroDeCategoria] == 0)
		{
			CarritoAgregar.appendChild(ArticuloEnCarrito);
			ContadorArticulos[_NumCategoria][_NumAdentroDeCategoria]++;
		}
		else
		{
			if(BorrarArticuloCarrito[_NumCategoria][_NumAdentroDeCategoria])
			{
				ContadorArticulos[_NumCategoria][_NumAdentroDeCategoria]++;
				CarritoAgregar.replaceChild(ArticuloEnCarrito, BorrarArticuloCarrito[_NumCategoria][_NumAdentroDeCategoria]);
			}
		}
		CrearBtnBorrarCarrito(_NumCategoria, _NumAdentroDeCategoria);
		Ajax("GetBaseDeDatos.php");
	});
}

function CrearTarjetas(_NumCategoria)
{
	CategoriasInfo[_NumCategoria].Nombre.map((caja,i)=>
	{	
		//Crear los elementos HTML
		let TarjetaCreada = document.createElement('div');
		NombreTarjetaHTML[i] = document.createElement('h6');
		PrecioTarjetaHTML[i] = document.createElement('h6');
		ImagenTarjetaHTML[i] = document.createElement('img');
		ImagenCodigoHTML[i] = document.createElement('img');
		CodigoHTML[i] = document.createElement('p');
		RazaHTML[i] = document.createElement('p');
	 	BtnAgregarCarritoHTML[i] = document.createElement('div');
	 	//Llenando los HTML con los datos correspondientes
	 	NombreTarjetaHTML[i].innerHTML = CategoriasInfo[_NumCategoria].Nombre[i];
	 	PrecioTarjetaHTML[i].innerHTML = "$ " + CategoriasInfo[_NumCategoria].Precio[i];
	 	ImagenTarjetaHTML[i].src = CategoriasInfo[_NumCategoria].Imagen[i];
	 	switch(_NumCategoria)
	 	{
	 		case 1: ImagenCodigoHTML[i].src = "https://img.icons8.com/color/48/000000/armored-helmet.png";
	 		        break; 
	 		case 2: ImagenCodigoHTML[i].src = "https://img.icons8.com/color/48/000000/necklace.png";
	 		        break;
	 		case 3: ImagenCodigoHTML[i].src = "https://img.icons8.com/color/48/000000/halloween-costume.png";
	 		        break;
	 		case 4: ImagenCodigoHTML[i].src = "https://img.icons8.com/plasticine/100/000000/armored-breastplate.png";
	 		        break;
	 		case 5: ImagenCodigoHTML[i].src = "https://img.icons8.com/fluency/48/000000/womens-belt.png";
	 		        break;
	 		case 6: ImagenCodigoHTML[i].src = "https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-pants-clothing-justicon-flat-justicon.png";
	 		        break;
	 		case 7: ImagenCodigoHTML[i].src = "https://img.icons8.com/color/48/000000/one-ring.png";
	 		        break; 
	 		case 8: ImagenCodigoHTML[i].src = "https://img.icons8.com/color/48/000000/sapphire.png";
	 		        break; 
	 	}
	 	CodigoHTML[i].innerHTML = " #" + CategoriasInfo[_NumCategoria].Codigo[i];
	 	RazaHTML[i].innerHTML = CategoriasInfo[_NumCategoria].Raza[i];
		BtnAgregarCarritoHTML[i].innerHTML = "+"; 
	 	//Agregando los estilos a los HTML
	 	NombreTarjetaHTML[i].classList.toggle("ActualizarCajas");
	 	PrecioTarjetaHTML[i].classList.toggle("Precio");
	 	ImagenCodigoHTML[i].classList.toggle("ImagenCodigo");
	 	ImagenTarjetaHTML[i].classList.toggle("ImagenTarjeta");
	 	CodigoHTML[i].classList.toggle("Codigo");
	 	RazaHTML[i].classList.toggle("Raza");
	 	//TODO CAMBIAR NOMBRE DE LOS CASOS Y ESE PONER EN EL RAZAHTML
	 	switch(CategoriasInfo[_NumCategoria].Raza[i])
	 	{
	 		case 'Pers': RazaHTML[i].classList.toggle("Raza1");
	 		        break; 
	 		case 'Trepas': RazaHTML[i].classList.toggle("Raza2");
	 		        break;
	 		case 'Ruams': RazaHTML[i].classList.toggle("Raza3");
	 		        break;
	 		case 'Aztes': RazaHTML[i].classList.toggle("Raza4");
	 		        break;
	 		case 'Retes': RazaHTML[i].classList.toggle("Raza5");
	 		        break;
	 		case 'Voladores': RazaHTML[i].classList.toggle("Raza6");
	 		        break;
	 		case 'Mongos': RazaHTML[i].classList.toggle("Raza7");
	 		        break; 
	 	}
		BtnAgregarCarritoHTML[i].classList.toggle("BotonMas");
		//Meter los HTML a la tarjeta
		TarjetaCreada.appendChild(ImagenCodigoHTML[i]);
		TarjetaCreada.appendChild(CodigoHTML[i]);
		TarjetaCreada.appendChild(RazaHTML[i]);
		TarjetaCreada.appendChild(NombreTarjetaHTML[i]);
		TarjetaCreada.appendChild(ImagenTarjetaHTML[i]);
		TarjetaCreada.appendChild(PrecioTarjetaHTML[i]);
		TarjetaCreada.appendChild(BtnAgregarCarritoHTML[i]);
		
		TarjetaCreada.style.display = "inline-block";

		TarjetaCreada.classList.toggle("Tarjetas");
		DivTarjetasArticulos.appendChild(TarjetaCreada);
		
	});
}

function Quitar()
{
	Mensaje.classList.toggle("Aparece");
}
//////////////////////////////////////////////////////////////////////////////Desencriptar Informacion///////////////////////////////////////////////////////////////////////////////////
var Leer = document.querySelector(".Informacion");
var Longitud = Leer.innerHTML.length;
var ContadorArregloCajas = 0, ContadorCategorias = 1, ContadorCosto = 0, ContadorNombre = 0, ContadorCriptado = 0, ContadorImagen = 0, ContadorRaza = 0; 
var CategoriasInfo = [], ArregloCategorias = [], ArregloCosto = [], ArregloNombre = [], ArregloCriptado = [], ArregloImagen = [], ArregloRaza = [];
var Nombre = "a", Criptado = "a", CategoriaNombre = "", Imagen = "a", Costo = 0, Raza = "a";
var Bandera;

for (var i = 0; i < Longitud; i++) 
{
    if (Leer.innerHTML[i] == "!") {
        Bandera = "C";
    }
    else if (Leer.innerHTML[i] == "@") {
        if (Nombre != "a") {
            ArregloNombre[ContadorNombre] = Nombre;
            ContadorNombre++;
        }
        Nombre = "";
        Bandera = "N";
    }
    else if (Leer.innerHTML[i] == "#") {
        if (Costo != 0) {
            ArregloCosto[ContadorCosto] = parseInt(Costo);
            ContadorCosto++;
        }
        Costo = "";
        Bandera = "P";
    }
    else if (Leer.innerHTML[i] == "$") {
        if (Criptado != "a") {
            ArregloCriptado[ContadorCriptado] = Criptado;
            ContadorCriptado++;
        }
        Criptado = "";
        Bandera = "K";
    }
    else if (Leer.innerHTML[i] == "^") {
        if (Imagen != "a") {
            ArregloImagen[ContadorImagen] = Imagen;
            ContadorImagen++;
        }
        Imagen = "";
        Bandera = "I";
    }
    else if (Leer.innerHTML[i] == "*") {
        if (Raza != "a") {
            ArregloRaza[ContadorRaza] = Raza;
            ContadorRaza++;
        }
        Raza = "";
        Bandera = "R";
    }
    else if (Leer.innerHTML[i] == "(") {
        ArregloCriptado[ContadorCriptado] = Criptado;
        ArregloCriptado = [];
        ContadorCriptado = 0;
        ArregloCosto[ContadorCosto] = parseInt(Costo);
        ContadorCosto++;
        ArregloCosto = [];
        ContadorCosto = 0;
        ArregloNombre[ContadorNombre] = Nombre;
        ArregloNombre = [];
        ContadorNombre = 0;
        ArregloImagen[ContadorImagen] = Imagen;
        ArregloImagen = [];
        ContadorImagen = 0; 
        ArregloRaza[ContadorRaza] = Raza;
        ArregloRaza = [];
        ContadorRaza = 0; 
        ContadorCategorias++;
        ContadorArregloCajas = 0;
        CategoriaNombre = "";
        Costo = "";
        Criptado = "a";
        Nombre = "a";
        Imagen = "a";
        Raza = "a";
        ArregloCategorias = [];
    }
    else if (Bandera == "C") {
        CategoriaNombre += Leer.innerHTML[i];
        ArregloCategorias[ContadorArregloCajas] = CategoriaNombre;
        CategoriasInfo[ContadorCategorias] = { Categoria: ArregloCategorias, Nombre: this.ArregloNombre, Precio: this.ArregloCosto, Codigo: this.ArregloCriptado, Imagen: this.ArregloImagen, Raza: this.ArregloRaza };
    }
    else if (Bandera == "N") {
        Nombre += Leer.innerHTML[i];
        CategoriasInfo[ContadorCategorias] = { Categoria: this.ArregloCategorias, Nombre: ArregloNombre, Precio: this.ArregloCosto, Codigo: this.ArregloCriptado, Imagen: this.ArregloImagen, Raza: this.ArregloRaza };
    }
    else if (Bandera == "P") {
        Costo += Leer.innerHTML[i];
        CategoriasInfo[ContadorCategorias] = { Categoria: this.ArregloCategorias, Nombre: this.ArregloNombre, Precio: ArregloCosto, Codigo: this.ArregloCriptado, Imagen: this.ArregloImagen, Raza: this.ArregloRaza };
    }
    else if (Bandera == "K") {
        Criptado += Leer.innerHTML[i];
        CategoriasInfo[ContadorCategorias] = { Categoria: this.ArregloCategorias, Nombre: this.ArregloNombre, Precio: this.ArregloCosto, Codigo: ArregloCriptado, Imagen: this.ArregloImagen, Raza: this.ArregloRaza };
    }
    else if (Bandera == "I") {
        Imagen += Leer.innerHTML[i];
        CategoriasInfo[ContadorCategorias] = { Categoria: this.ArregloCategorias, Nombre: this.ArregloNombre, Precio: this.ArregloCosto, Codigo: this.ArregloCriptado, Imagen: ArregloImagen, Raza: this.ArregloRaza };
    }
    else if (Bandera == "R") {
        Raza += Leer.innerHTML[i];
        CategoriasInfo[ContadorCategorias] = { Categoria: this.ArregloCategorias, Nombre: this.ArregloNombre, Precio: this.ArregloCosto, Codigo: this.ArregloCriptado, Imagen: this.ArregloImagen, Raza: ArregloRaza };
    }
}

var NumDeCategorias = CategoriasInfo.length;
localStorage.setItem("Tamaño", NumDeCategorias);

for(var i = 1 ; i < NumDeCategorias ; i++)
{
	Tam[i] = (CategoriasInfo[i].Nombre.length);
}

for(var i = 1 ; i < NumDeCategorias ; i++)
{
	CreaTodo(i, Tam[i]);
}

var Texto = document.querySelector(".Texto");

var EscojerId = localStorage.getItem("Id");

if(EscojerId != null)
{
	var Numero = parseInt(EscojerId);

	CrearTarjetas(Numero);
	for(var i = 0 ; i < Tam[Numero] ; i++)
	{
		CrearBotonAgregarCarrito(Numero, i);
	}
}

//////////////////////////////////////////////////////////////////////Login////////////////////////////////////////////////////////////////////////////////////////////////////
const CrearCuenta = document.querySelector(".RegistrarInput");
const RegistrarDatosForm = document.querySelector(".LoginRegistrarDatos");
const FlechaRegresarLogin = document.querySelector(".RegresarLogin");
const LoginLogeado = document.querySelector(".LoginLogeado");
const LoginMeterDatos = document.querySelector(".LoginMeterDatos");
const Login = document.querySelector(".Login");
const CerrarLogin = document.querySelector(".CerrarLogin");
const CerrarRegistrar = document.querySelector(".CerrarRegistrar");
const LoginLogo = document.querySelector(".LoginEscrito");
const LoginEscrito = document.querySelector(".UsuarioIcono");
const QuitarForms = document.querySelector(".QuitarFORMS");

if(LoginLogeado != null)
{
	LoginLogeado.addEventListener("mouseover", () =>
	{
		LoginEscrito.classList.toggle("ColorCambio");
		LoginLogo.classList.toggle("ColorCambio"); 
	});

	LoginLogeado.addEventListener("mouseout", () =>
	{
		LoginEscrito.classList.toggle("ColorCambio");
		LoginLogo.classList.toggle("ColorCambio"); 
	});
}

if(Login != null)
{
	Login.addEventListener("mouseover", () =>
	{
		LoginEscrito.classList.toggle("ColorCambio");
		LoginLogo.classList.toggle("ColorCambio"); 
	});

	Login.addEventListener("mouseout", () =>
	{
		LoginEscrito.classList.toggle("ColorCambio");
		LoginLogo.classList.toggle("ColorCambio"); 
	});

	Login.addEventListener("click", () =>
	{
		LoginMeterDatos.classList.toggle("AlternarLogin");
		Fondo.classList.toggle("Fondo");
		localStorage.setItem("LoginFORM",true);
	});
}

if(localStorage.getItem("RegistrarFORM") == "true")
{
	RegistrarDatosForm.classList.toggle("AlternarLogin");
	localStorage.setItem("RegistrarFORM",true);
	Fondo.classList.toggle("Fondo");
}
else
{
	localStorage.setItem("RegistrarFORM",false);
}

if(localStorage.getItem("LoginFORM") == "true" && QuitarForms == null)
{
	LoginMeterDatos.classList.toggle("AlternarLogin");
	Fondo.classList.toggle("Fondo");
}
else
{
	localStorage.setItem("LoginFORM",false);
}
CrearCuenta.addEventListener("click", () =>
{
	LoginMeterDatos.classList.toggle("AlternarLogin");
	RegistrarDatosForm.classList.toggle("AlternarLogin");
	localStorage.setItem("RegistrarFORM",true);
	localStorage.setItem("LoginFORM",false);
});

CerrarLogin.addEventListener("click", () =>
{
	LoginMeterDatos.classList.toggle("AlternarLogin");
	Fondo.classList.toggle("Fondo");
	localStorage.setItem("LoginFORM",false);
});

CerrarRegistrar.addEventListener("click", () =>
{
	RegistrarDatosForm.classList.toggle("AlternarLogin");
	Fondo.classList.toggle("Fondo");
	localStorage.setItem("RegistrarFORM",false);
});

FlechaRegresarLogin.addEventListener("click", () =>
{
	RegistrarDatosForm.classList.toggle("AlternarLogin");
	LoginMeterDatos.classList.toggle("AlternarLogin");
	localStorage.setItem("RegistrarFORM",false);
	localStorage.setItem("LoginFORM",true);
});