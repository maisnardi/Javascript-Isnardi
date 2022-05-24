//variables
let CantidadUnidades=0;
let ValorCompra=0;
let ModoPago=0;
let Compra=false;
let SeguirComprando=0;

//Clases
class Productos{
    constructor(id,producto,marca,precio,cantidad)
    {
        this.id=id;
        this.producto=producto;
        this.marca=marca;
        this.precio=precio;
        this.cantidad=cantidad;
    }

}
//Obetos
const Auriculares = new Productos(001,"auriculares","sony",10000,0);
const Cargador = new Productos (002,"cargador","samsung",2000,0);
const Batería = new Productos(003,"batería", "xiaomi",5000,0);

//Arrays
const Carrito =[];
const ArrayProductos=[Auriculares,Cargador,Batería];
console.log(ArrayProductos);

//Programa

MenuCompra();
VolverAComprar();
ValorCompra=CostoDelCarrito();
MenuPago();


// FUNCIONES
function MenuCompra(){          //Menú de compra
    let menu=Number(prompt(`Lista de productos:  
    1. Auriculares,
    2. Cargador,
    3. Batería,
    4. Ver carrito,
    5. Quitar producto del carrito,
    6. Buscar por marca,
    7. Cancelar`));
  
    switch(menu){
        case 1:
            alert("El valor unitario del producto es de $10,000");
            CantidadUnidades=SolicitarUnidades();
            Auriculares.cantidad+=CantidadUnidades;
            AgregarAlCarrito(Auriculares);
            CantidadUnidades=0;
            break;
        case 2:
            alert("El valor unitario del producto es de $2000");
            CantidadUnidades=SolicitarUnidades();
            Cargador.cantidad+=CantidadUnidades;
            AgregarAlCarrito(Cargador);
            CantidadUnidades=0;
            break;
        case 3:
            alert("El valor unitario del producto es de $5000");
            CantidadUnidades=SolicitarUnidades();
            Batería.cantidad+=CantidadUnidades;
            AgregarAlCarrito(Batería);
            CantidadUnidades=0;
            break;
        case 4:
            if(Carrito.length===0)
            {
                alert("El carrito esta vacío");
            }
            else
            {
                MostrarCarrito(Carrito);
            }
            break;

        case 5:
            QuitarDelCarrito();
            break;
        case 6:
            buscarMarca(ArrayProductos);
            break;
        case 7:
            alert("Opción cancelada");
            Compra=false;
            break;
        default:
            alert("Opción no valida");
            Compra=false;
            break;
    }
  }

function MenuPago() //Función que se encarga del pago en efectivo y con tarjeta
{
    if(Compra== true)               //si el usuario seleccionó correctamente un producto desde el menú
    {
        ModoPago = FormaDePago();   //la funcion Formadepago() devuelve la forma de pago seleccionada por el usaurio
        if(ModoPago == 1){          //Si el pago es en efectivo
            ValidarDinero(SolicitarDinero(ValorCompra), ValorCompra);
        }
        else if(ModoPago == 2){     //Si el pago es con tarjeta de crédito
            let ValorCompraConTarjeta= ValorCompra*1.1;             //Se agrega un 10% adicional
            let ValorCompraEnCuotas= ValorCompraConTarjeta/3;       //Se divide en 3 para obtener el valor de las cuotas
            let Mensaje = "El precio final es de $"+ValorCompraConTarjeta+" en 3 cuotas de $"+ValorCompraEnCuotas.toFixed(2);   //Con .tofixed(2 se musetran solo dos decimales)
            alert(Mensaje);
        }
        else{
            alert("Metodo de pago inválido");
        }
    }
    else{     
        alert("Compra cancelada"); //Si el usuario seleccionó una opcion incorrecta del menú se cancela la compra
    }
}

function SolicitarDinero(ValorCompra)   //Función que solicita el importe de dinero en efectivo al usaurio.
{
  let Dinero=Number(prompt("Ingrese $"+ValorCompra));
  return Dinero;
}

 function SolicitarUnidades()   //Función que solicita la cantidad de unidades.
{
    Compra=true;
    Unidades=Number(prompt("Ingrese la cantidad de unidades deseadas"));
    if(isNaN(Unidades) || Unidades<0)         //Si el usuario ingresa un caracater aparece una alerta de Error y se cancela la compra. 
    {
        alert("ERROR, dato no permitido.");
        Compra=false;
        return 0
    }
    else if(Unidades == 0)      //Si las unidades seleccionadas por el usuario son 0
    {
        let DatoValido=0;
        let Intentos=2;
        alert("La cantidad de unidades es muy baja, vuelva ingresar las unidades")
        while(Intentos>0)       //Le permite al usurio hacer dos intentos más
        {   
            Unidades=Number(prompt("Ingrese la cantidad de unidades deseadas"));
            if( Unidades>0){
                Intentos=0;
                DatoValido=1;                
            }
            else{
                Intentos--;
            }
        }
        if(DatoValido==1)
        {
            return Unidades;
        }
        else{
            alert("ERROR, dato no permitido. Compra cancelada");
            Compra=false;
            return 0
        }
    }
    else                        //Si no devuelve la cantidad ingresada por el usaurio.
    {
        return Unidades         
        
    }
}

function ValidarDinero(MontoIngresado, ValorCompra){     //Función que valida el pago en efectivo. Dependiendo del valor ingresado mustra un mensaje.
    let Saldo=0;
    if(MontoIngresado>ValorCompra)    //El monto ingresado es suaperior al de los productos
    {
        alert("Gracias por su compra su vuelto es: $"+(MontoIngresado-ValorCompra));
    }
    else if (MontoIngresado == ValorCompra){  //El monto ingresado es igual al de los productos
        alert("Gracias por su compra");
    }
    else if (isNaN(MontoIngresado))           //Si el usaurio ingresa un caracter en vez de un número
    {
        alert("El importe ingresado no es un número");
    }
    else
    {
        alert("El dinero ingresado es insuficiente");   //El monto ingresado es inferior al de los productos 
    }
}

function FormaDePago(){   //Funcion que ofrece las distintas formas de pago y devuelve la opción seleccionada por el usuario.
  alert("La forma de pago con tarjeta de credito tiene un recargo de 10% y 3 cuotas")
  let Pago=Number(prompt(`Ingrese la forma de pago:
  1. Efectivo
  2. Tarjeta de crédito en 3 cuotas`));
  return Pago;
}



function AgregarAlCarrito(Productos){       //funcion que verifica si el producto se encuentra en el carrito, y si no lo esta lo agreguega
    if(!(Carrito.includes(Productos)))
    {
        Carrito.push(Productos);
    }    
}


function MostrarCarrito(carro)                   //funcion que muestra por consola los productos del carrito
{
    console.log(`Los productos del carrito son:`)
    carro.forEach(Productos => {
        console.log(Productos)
    });
}

function CostoDelCarrito()                  //funcion que recorre el array del carrito, devuelve el valor total de los productos del carrito
{
    let ValorTotalCompra=0;
    for(let i=0;i<Carrito.length;i++)
    {
        console.log(Carrito.length);
        ValorTotalCompra= ValorTotalCompra + ((Carrito[i].cantidad)*(Carrito[i].precio));
    }
    return ValorTotalCompra;

}
function VolverAComprar(){                  //funcion recurrente que le permite al usuario seguir comprando.
    SeguirComprando=Number(prompt(`Desea seguir comprando?
                                    1. SI
                                    2. NO`))
    if(SeguirComprando==1)
    {
        MenuCompra();
        VolverAComprar();
    }   
}

function QuitarDelCarrito()                 //funcion que permite borra elementos del carrito
{
    let index=0;
    let unidadesAQuitar=0;
    let quitar= Number(prompt(`Seleccione el producto que desea eliminar del carrito:
                                1. Auriculares,
                                2. Cargador,
                                3. Batería`));
    switch(quitar){
        case 1:
            if(Carrito.includes(Auriculares)){
                unidadesAQuitar=Number(prompt("Cuántas unidades desea eliminar?"));
                Auriculares.cantidad-=unidadesAQuitar;
                if(Auriculares.cantidad<=0){        //Si la cantidad de productos es menor o igual a 0 se pone en 0 las unidades y se quita del array del carrito de compras
                    Auriculares.cantidad=0;
                    index=Carrito.indexOf(Auriculares);
                    Carrito.splice(index);

                }
            }
            else{
                alert("No hay auriculares en el carrito")
            }
            break;
        case 2:
            if(Carrito.includes(Cargador)){
                unidadesAQuitar=Number(prompt("Cuántas unidades desea eliminar?"));
                Cargador.cantidad-=unidadesAQuitar;
                if(Cargador.cantidad<0){        //Si la cantidad de productos es menor o igual a 0 se pone en 0 las unidades y se quita del array del carrito de compras
                    Cargador.cantidad=0;
                    index=Carrito.indexOf(Cargador);
                    Carrito.splice(index);
                }
                }
            else{
                alert("No hay cargadores en el carrito")
            }
            break;
        case 3:
             if(Carrito.includes(Batería)){
                unidadesAQuitar=Number(prompt("Cuántas unidades desea eliminar?"));
                Batería.cantidad-=unidadesAQuitar;
                if(Batería.cantidad<0){     //Si la cantidad de productos es menor o igual a 0 se pone en 0 las unidades y se quita del array del carrito de compras
                    Batería.cantidad=0;
                    index=Carrito.indexOf(Batería);
                    Carrito.splice(index);
                }
            }
            else{
                alert("No hay baterias en el carrito")
            }
            break;
        default:
            alert("Opción no valida");
            break;
    }                        
}

function buscarMarca(array){            //funcion que busca en el array de productos por marca
    let marca= prompt("ingrese una marca");
    const productosEncontrados =array.filter((a)=>a.marca.includes(marca.toLocaleLowerCase()));
    console.log(productosEncontrados);
}
