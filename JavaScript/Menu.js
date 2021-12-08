const MenuIcono = document.querySelector('.IconoMenu');
const Menu = document.querySelector('.Menu-Navegacion');
var TomarId = [];
MenuIcono.addEventListener('click',()=>
{
	Menu.classList.toggle("Spread");
});

window.addEventListener('click',e =>
{
	if(Menu.classList.contains('Spread')
		&& e.target != Menu	&& e.target != MenuIcono)
	{
		Menu.classList.toggle("Spread");
	}
});
for(var i=1;i<=8;i++)
{
	TomarId[i] = document.querySelector("#Categoria"+i);
}
for(var i=1;i<=8;i++)
{
	ElegirId(i);
}
function ElegirId(Valor1)
{
	TomarId[Valor1].addEventListener('click',()=>
	{
		localStorage.setItem("Id",Valor1);
	});
}