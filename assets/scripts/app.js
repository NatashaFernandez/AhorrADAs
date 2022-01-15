/*
  Datos Precargados
*/

const vendedoras = ['Ada', 'Grace', 'Hedy', 'Sheryl'];

const ventas = [
  // tener en cuenta que Date guarda los meses del 0 (enero) al 11 (diciembre)
  {
    id: 1,
    fecha: new Date(2019, 1, 4),
    nombreVendedora: 'Grace',
    sucursal: 'Centro',
    componentes: ['Monitor GPRS 3000', 'Motherboard ASUS 1500'],
  },
  {
    id: 2,
    fecha: new Date(2019, 0, 1),
    nombreVendedora: 'Ada',
    sucursal: 'Centro',
    componentes: ['Monitor GPRS 3000', 'Motherboard ASUS 1500'],
  },
  {
    id: 3,
    fecha: new Date(2019, 0, 2),
    nombreVendedora: 'Grace',
    sucursal: 'Caballito',
    componentes: ['Monitor ASC 543', 'Motherboard MZI'],
  },
  {
    id: 4,
    fecha: new Date(2019, 0, 10),
    nombreVendedora: 'Ada',
    sucursal: 'Centro',
    componentes: ['Monitor ASC 543', 'Motherboard ASUS 1200'],
  },
  {
    id: 5,
    fecha: new Date(2019, 0, 12),
    nombreVendedora: 'Grace',
    sucursal: 'Caballito',
    componentes: [
      'Monitor GPRS 3000',
      'Motherboard ASUS 1200',
      'Monitor GPRS 3000',
      'Motherboard ASUS 1500',
    ],
  },
];

const articulos = [
  { item: 'Monitor GPRS 3000', precio: 200 },
  { item: 'Motherboard ASUS 1500', precio: 120 },
  { item: 'Monitor ASC 543', precio: 250 },
  { item: 'Motherboard ASUS 1200', precio: 100 },
  { item: 'Motherboard MZI', precio: 30 },
  { item: 'HDD Toyiva', precio: 90 },
  { item: 'HDD Wezter Dishital', precio: 75 },
  { item: 'RAM Quinston', precio: 110 },
  { item: 'RAM Quinston Fury', precio: 230 },
];

const sucursales = ['Centro', 'Caballito'];

/* precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.

*/



const precioMaquina = (listaComponentes) => {
  let sumaPrecios = 0;
  for (const componente of listaComponentes) {
    for (const articulo of articulos) {
      if (articulo.item === componente) {
        sumaPrecios += articulo.precio;
      }
    }
  }
  return sumaPrecios
}
console.log(precioMaquina(['Monitor GPRS 3000', 'Motherboard ASUS 1500'])); // 320 ($200 del monitor + $120 del motherboard)

/*cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas.

*/
const cantidadVentasComponente = (componente) => {
  let acc = 0
  for (const venta of ventas) {
    for (const item of venta.componentes) {
      if (item === componente) {
        acc++
      }
    }
  }
  return acc
}

console.log(cantidadVentasComponente('Monitor ASC 543')); // 2


//vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const vendedoraDelMes = (mes, anio) => {

  let ventasPorVendedora = [];
  let ventasFiltradas = ventas.filter(venta => venta.fecha.getMonth() == mes + 1 && venta.fecha.getFullYear() == anio);
  for (const vendedora of vendedoras) {
    ventasPorVendedora.push({ vendedora: vendedora, total: 0 });
  }
  for (const venta of ventasFiltradas) {
    let i = vendedoras.indexOf(venta.nombreVendedora);//busca y devuelve el valor de la posicion de la vendedora dentro del array ventasPorVendedora
    ventasPorVendedora[i].total += precioMaquina(venta.componentes);
  }
  let vendedoraMes = ventasPorVendedora[0];
  for (const item of ventasPorVendedora) {
    if (vendedoraMes.total < item.total) {
      vendedoraMes = item;
    }
  }
  return vendedoraMes.vendedora;
}

console.log(vendedoraDelMes(1, 2019)); // "Ada" (vendio por $670, una máquina de $320 y otra de $350)