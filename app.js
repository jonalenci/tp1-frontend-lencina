// Datos de ejemplo del frontend: cada arreglo contiene al menos 8 registros.
// 8 personas (la clase base del diagrama).
const personas = [
 {nombre:"Carla",apellido:"Méndez",email:"carla@ejemplo.com"},
 {nombre:"Diego",apellido:"Sosa",email:"diego@ejemplo.com"},
 {nombre:"Elena",apellido:"Vera",email:"elena@ejemplo.com"},
 {nombre:"Marcos",apellido:"Gil",email:"marcos@ejemplo.com"},
 {nombre:"Lucía",apellido:"Paz",email:"lucia@ejemplo.com"},
 {nombre:"Tomás",apellido:"Ríos",email:"tomas@ejemplo.com"},
 {nombre:"Valeria",apellido:"Luna",email:"valeria@ejemplo.com"},
 {nombre:"Bruno",apellido:"Díaz",email:"bruno@ejemplo.com"}
];

const proveedores = [
 {proveedor_id:1,nombre:"Juan Pérez",empresa:"Distribuidora Norte",rubro:"Alimentos"},
 {proveedor_id:2,nombre:"María Gómez",empresa:"Tecno Hogar",rubro:"Electrónica"},
 {proveedor_id:3,nombre:"Pedro López",empresa:"Textil Sur",rubro:"Indumentaria"},
 {proveedor_id:4,nombre:"Laura Díaz",empresa:"Limpieza Total",rubro:"Limpieza"},
 {proveedor_id:5,nombre:"Pablo Ruiz",empresa:"Casa y Cocina",rubro:"Hogar"},
 {proveedor_id:6,nombre:"Marta Gil",empresa:"Verde Natural",rubro:"Alimentos"},
 {proveedor_id:7,nombre:"Diego Vera",empresa:"Mundo Digital",rubro:"Electrónica"},
 {proveedor_id:8,nombre:"Sonia Paz",empresa:"Moda Urbana",rubro:"Indumentaria"}
];

const clientes = [
 {cliente_id:1,nombre:"Ana Díaz",tipoCliente:"minorista",ciudad:"Paraná"},
 {cliente_id:2,nombre:"Luis Ruiz",tipoCliente:"mayorista",ciudad:"Santa Fe"},
 {cliente_id:3,nombre:"Sofía Torres",tipoCliente:"vip",ciudad:"Rosario"},
 {cliente_id:4,nombre:"Juan Sosa",tipoCliente:"minorista",ciudad:"Córdoba"},
 {cliente_id:5,nombre:"Carla Méndez",tipoCliente:"mayorista",ciudad:"Paraná"},
 {cliente_id:6,nombre:"Pedro Gil",tipoCliente:"vip",ciudad:"Santa Fe"},
 {cliente_id:7,nombre:"Elena Vera",tipoCliente:"minorista",ciudad:"Rosario"},
 {cliente_id:8,nombre:"Marcos León",tipoCliente:"mayorista",ciudad:"Córdoba"}
];

const productos = [
 {producto_id:1,nombre:"Arroz",categoria:"Alimentos",precio:1200,stock:40,proveedor_id:1},
 {producto_id:2,nombre:"Fideos",categoria:"Alimentos",precio:950,stock:60,proveedor_id:1},
 {producto_id:3,nombre:"Auriculares",categoria:"Electrónica",precio:15000,stock:15,proveedor_id:2},
 {producto_id:4,nombre:"Teclado",categoria:"Electrónica",precio:22000,stock:10,proveedor_id:2},
 {producto_id:5,nombre:"Remera",categoria:"Indumentaria",precio:8500,stock:25,proveedor_id:3},
 {producto_id:6,nombre:"Detergente",categoria:"Limpieza",precio:1800,stock:30,proveedor_id:4},
 {producto_id:7,nombre:"Sartén",categoria:"Hogar",precio:12500,stock:12,proveedor_id:5},
 {producto_id:8,nombre:"Yerba",categoria:"Alimentos",precio:3200,stock:50,proveedor_id:6}
];

const $ = (id) => document.getElementById(id);
const nombreProveedor = (id) => proveedores.find(p => p.proveedor_id === id)?.empresa ?? "Proveedor no encontrado";
const dinero = (n) => "$" + Number(n).toLocaleString("es-AR");

function cargarOpciones(id, valores, etiquetaInicial) {
  const select = $(id);
  valores.forEach(valor => {
    const option = document.createElement("option");
    option.value = valor; option.textContent = valor;
    select.appendChild(option);
  });
}
function mostrarProductos() {
  const texto = $("busqueda").value.trim().toLowerCase();
  const categoria = $("filtroCategoria").value;
  const filtrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(texto) && (!categoria || p.categoria === categoria)
  );
  $("tablaProductos").innerHTML = filtrados.map(p => `
    <tr><td>${p.producto_id}</td><td>${p.nombre}</td><td>${p.categoria}</td>
    <td>${dinero(p.precio)}</td><td>${p.stock}</td><td>${nombreProveedor(p.proveedor_id)}</td></tr>
  `).join("");
  $("sinResultados").hidden = filtrados.length !== 0;
}
function mostrarProveedores() {
  const rubro = $("filtroRubro").value;
  const filtrados = proveedores.filter(p => !rubro || p.rubro === rubro);
  $("listaProveedores").innerHTML = filtrados.map(p =>
    `<li><strong>${p.empresa}</strong> — ${p.nombre} — ${p.rubro} (ID ${p.proveedor_id})</li>`
  ).join("");
}
function mostrarPersonas() {
  $("listaPersonas").innerHTML = personas.map(p =>
    `<li>${p.nombre} ${p.apellido} — ${p.email}</li>`
  ).join("");
}
function mostrarClientes() {
  $("listaClientes").innerHTML = `<ul>${clientes.map(c =>
    `<li>${c.nombre} — ${c.tipoCliente} — ${c.ciudad}</li>`).join("")}</ul>`;
}
$("busqueda").addEventListener("input", mostrarProductos);
$("filtroCategoria").addEventListener("change", mostrarProductos);
$("filtroRubro").addEventListener("change", mostrarProveedores);

$("formProducto").addEventListener("submit", (evento) => {
  const form = evento.currentTarget;
  const datos = new FormData(form);
  const nombre = String(datos.get("nombre")).trim();
  const precio = Number(datos.get("precio"));
  const stock = Number(datos.get("stock"));
  const id = Number(datos.get("producto_id"));
  const proveedorId = Number(datos.get("proveedor_id"));
  const errores = [];
  if (!nombre) errores.push("El nombre del producto no puede estar vacío.");
  if (!(precio > 0)) errores.push("El precio debe ser mayor a 0.");
  if (!Number.isInteger(stock) || stock < 0) errores.push("El stock debe ser un entero mayor o igual a 0.");
  if (!Number.isInteger(id) || id <= 0) errores.push("El producto_id debe ser un entero mayor a 0.");
  if (!Number.isInteger(proveedorId) || proveedorId <= 0) errores.push("El proveedor_id debe ser un entero mayor a 0.");
  if (!String(datos.get("categoria")).trim()) errores.push("La categoría no puede estar vacía.");
  if (errores.length) {
    evento.preventDefault();
    $("mensajeValidacion").hidden = false;
    $("mensajeValidacion").textContent = errores.join(" ");
  } else {
    $("mensajeValidacion").hidden = true;
  }
});

cargarOpciones("filtroCategoria", [...new Set(productos.map(p => p.categoria))]);
cargarOpciones("filtroRubro", [...new Set(proveedores.map(p => p.rubro))]);
mostrarProductos(); mostrarProveedores(); mostrarClientes(); mostrarPersonas();
