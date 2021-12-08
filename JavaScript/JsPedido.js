const CarritoPedidos = document.querySelector(".CarritoPedido");
var Total = document.querySelector(".AquiTotal");
var Tamaño = localStorage.getItem("Tamaño");
var Carrito = [[]], CrearMas = [[]], Auxiliar = [[]], CrearMenos = [[]];
Total.innerHTML = localStorage.getItem("Total");
var BotonMas = [[]];
var XFormato = document.querySelector(".XFormato");
var Inicial = document.querySelector("#Inicial");
var MasCopia = [[]], MenosCopia =[[]];
var Lista = document.querySelector(".Lista");
var Borrar = [[]];
var Contador = [[]];
var BotonDatos = document.querySelector(".BotonDatos");
var Formato = document.querySelector(".Formato");
var Hijos = Lista.children;
var Mas = Hijos[0];
var Menos = Hijos[1];
var Enviar = document.querySelector(".Mandar");
Lista.style.display = 'none';
for(var i=1;i< Tamaño;i++)
{
	Carrito.push([[]]);
	CrearMas.push([[]]);
	CrearMenos.push([[]]);
	Auxiliar.push([[]]);
 	BotonMas.push([[]]);
 	MenosCopia.push([[]]);
 	MasCopia.push([[]]);
 	Borrar.push([[]]);
 	Contador.push([[]]);
	for(var j=0;j<30;j++)
	{
		Carrito[i][j] = localStorage.getItem("Carrito"+i+j);
		if(Carrito[i][j]!=null)
		{
			HacerCaja(i,j);
		}
	}
}
Enviar.addEventListener('click',()=>
{
	Formato.classList.toggle("Verse");
});
XFormato.addEventListener('click',()=>
{
	Formato.classList.toggle("Verse");
});
BotonDatos.addEventListener('click',()=>
{
	Formato.classList.toggle("Verse");
});
function SumarRestar(i,j)
{
	MasCopia[i][j].addEventListener('click',()=>
	{
		var Numero = localStorage.getItem("Contador"+i+j);
		localStorage.setItem("Contador"+i+j,parseInt(Numero)+1);
		var Total = parseInt(localStorage.getItem("Unitario"+i+j));
		var TotalPagina = parseInt(localStorage.getItem("Total"));
		var Resultado = TotalPagina+Total;
		localStorage.setItem("Total",Resultado);
		HacerCajaMas(i,j);
		Poner();
	});
	MenosCopia[i][j].addEventListener('click',()=>
	{
		var Numero = localStorage.getItem("Contador"+i+j);
		localStorage.setItem("Contador"+i+j,parseInt(Numero)-1);
		var Total = parseInt(localStorage.getItem("Unitario"+i+j));
		var TotalPagina = parseInt(localStorage.getItem("Total"));
		var Resultado = TotalPagina-Total;
		localStorage.setItem("Total",Resultado);
		HacerCajaMenos(i,j);
		Poner();
	});
}	
			
function Poner()
{
	Total.innerHTML = localStorage.getItem("Total");
}

function HacerCaja(i,j)
{

	MasCopia[i][j] = Mas.cloneNode(true);
	MenosCopia[i][j] = Menos.cloneNode(true);
			
	let CrearCarrito = document.createElement('div');
	Auxiliar[i][j] = document.createElement('div');

	CrearCarrito.innerHTML = Carrito[i][j] + parseInt(localStorage.getItem("Contador"+i+j));
	CrearCarrito.classList.toggle("ListaCarrito");

	Auxiliar[i][j].appendChild(CrearCarrito);

	Auxiliar[i][j].classList.toggle("Auxiliar");
	MasCopia[i][j].classList.toggle("Mas");
	MenosCopia[i][j].classList.toggle("Menos");

	Auxiliar[i][j].appendChild(MasCopia[i][j]);
	Auxiliar[i][j].appendChild(MenosCopia[i][j]);

	Auxiliar[i][j].setAttribute("id","Id"+i+j);
	Borrar[i][j] = document.querySelector("#Id"+i+j);

	Contador[i][j] = parseInt(localStorage.getItem("Contador"+i+j));
	CarritoPedidos.appendChild(Auxiliar[i][j]);
	SumarRestar(i,j);
}
function HacerCajaMas(i,j)
{

	MasCopia[i][j] = Mas.cloneNode(true);
	MenosCopia[i][j] = Menos.cloneNode(true);
			
	let CrearCarrito = document.createElement('div');
	Auxiliar[i][j] = document.createElement('div');

	Contador[i][j] = parseInt(localStorage.getItem("Contador"+i+j));
	CrearCarrito.innerHTML = Carrito[i][j] + Contador[i][j];
	CrearCarrito.classList.toggle("ListaCarrito");

	Auxiliar[i][j].appendChild(CrearCarrito);

	Auxiliar[i][j].classList.toggle("Auxiliar");
	MasCopia[i][j].classList.toggle("Mas");
	MenosCopia[i][j].classList.toggle("Menos");
	Auxiliar[i][j].appendChild(MasCopia[i][j]);
	Auxiliar[i][j].appendChild(MenosCopia[i][j]);
	Auxiliar[i][j].setAttribute("id","Id"+i+j);
	Borrar[i][j] = document.querySelector("#Id"+i+j);
	
	CarritoPedidos.replaceChild(Auxiliar[i][j],Borrar[i][j]);
	MasCopia[i][j].addEventListener('click',()=>
	{
		var Total = parseInt(localStorage.getItem("Unitario"+i+j));
		var TotalPagina = parseInt(localStorage.getItem("Total"));
		var Resultado = TotalPagina+Total;
		localStorage.setItem("Total",Resultado);
		Contador[i][j]++;
		localStorage.setItem("Contador"+i+j,Contador[i][j]);
		HacerCajaMas(i,j);
		Poner();
	});
	MenosCopia[i][j].addEventListener('click',()=>
		{
			var Total = parseInt(localStorage.getItem("Unitario"+i+j));
			var TotalPagina = parseInt(localStorage.getItem("Total"));
			var Resultado = TotalPagina-Total;
			localStorage.setItem("Total",Resultado);
			Contador[i][j]--;
			localStorage.setItem("Contador"+i+j,Contador[i][j]);
			HacerCajaMenos(i,j);
			Poner();
		});
}

function HacerCajaMenos(i,j)
{
	var Verificar = parseInt(localStorage.getItem("Contador"+i+j));
	if(Verificar==0)
	{
		CarritoPedidos.removeChild(Auxiliar[i][j]);
		localStorage.removeItem("Contador"+[i]+[j]);
		localStorage.removeItem("Carrito"+[i]+[j]);
		localStorage.removeItem("Unitario"+[i]+[j]);
	}
	else
	{
		MasCopia[i][j] = Mas.cloneNode(true);
		MenosCopia[i][j] = Menos.cloneNode(true);
				
		let CrearCarrito = document.createElement('div');
		Auxiliar[i][j] = document.createElement('div');

		Contador[i][j] = parseInt(localStorage.getItem("Contador"+i+j));
		CrearCarrito.innerHTML = Carrito[i][j] + Contador[i][j];
		CrearCarrito.classList.toggle("ListaCarrito");

		Auxiliar[i][j].appendChild(CrearCarrito);

		Auxiliar[i][j].classList.toggle("Auxiliar");
		MasCopia[i][j].classList.toggle("Mas");
		MenosCopia[i][j].classList.toggle("Menos");
		Auxiliar[i][j].appendChild(MasCopia[i][j]);
		Auxiliar[i][j].appendChild(MenosCopia[i][j]);
		Auxiliar[i][j].setAttribute("id","Id"+i+j);
		Borrar[i][j] = document.querySelector("#Id"+i+j);
		
		CarritoPedidos.replaceChild(Auxiliar[i][j],Borrar[i][j]);
		MasCopia[i][j].addEventListener('click',()=>
		{
			var Total = parseInt(localStorage.getItem("Unitario"+i+j));
			var TotalPagina = parseInt(localStorage.getItem("Total"));
			var Resultado = TotalPagina+Total;
			localStorage.setItem("Total",Resultado);
			Contador[i][j]++;
			localStorage.setItem("Contador"+i+j,Contador[i][j]);
			HacerCajaMas(i,j);
			Poner();
		});
		MenosCopia[i][j].addEventListener('click',()=>
		{
			var Total = parseInt(localStorage.getItem("Unitario"+i+j));
			var TotalPagina = parseInt(localStorage.getItem("Total"));
			var Resultado = TotalPagina-Total;
			localStorage.setItem("Total",Resultado);
			Contador[i][j]--;
			localStorage.setItem("Contador"+i+j,Contador[i][j]);
			HacerCajaMenos(i,j);
			Poner();
		});
	}
}