class Producto {
    constructor(codigo, nombre, cantidad, costo){
      this.codigo=codigo;
      this.nombre=nombre;
      this.cantidad = cantidad;
      this.costo=costo;
    }
    info(){
      return `Codigo: ${this.codigo} Nombre: ${this.nombre} Cantidad:${this.cantidad} Costo: $${this.costo}`;
    }
    infoHtml(){
      return `<article class = 'product'><div><h3>Codigo: ${this.codigo} </h3>
                <p>Nombre: ${this.nombre}</p>
                <p>Cantidad: ${this.cantidad}</p>
                <p>Costo: ${this.costo}</p></div><br></article>`;
    }
  }
 
  class Inventario{
    constructor(){
      this.datos=[];
    }
    agregar(producto){
      let encontrado = this.buscarBinario(this.datos,producto.codigo)
      if(!encontrado.encontrado){
        this.datos.push(producto);
        this.datos = this._ordenarArray();
        return true
      }else
        return false
    }
    _ordenarArray (){
      let arrOrdenado = []
      let posicion = null
      arrOrdenado[0] = this.datos[0];
      for (let i = 1; i < this.datos.length; i++){
        if (this.datos[i].codigo >= arrOrdenado[arrOrdenado.length - 1].codigo){
          arrOrdenado.push(this.datos[i]);
      }else{
          posicion = this.buscarBinario(arrOrdenado,this.datos[i].codigo).limInferior
          this._insertar(arrOrdenado,this.datos[i],posicion)
        }
      }
      return arrOrdenado
  }
    extraerUltimoProducto(){
      let extraer = this.datos.pop()
      return extraer
    }
    extraerPrimerProductoHTML(){
        let extraer = this.datos[0]
        for (let i = 0; i < this.datos.length; i++)
                this.datos[i]= this.datos[i+1]
            this.datos.pop()
        return extraer
    }
    eliminar(codigo){
      let buscar = this.buscarBinario(this.datos,codigo)
      let elemento = buscar.medio
      let encontrada = buscar.encontrado
      if(encontrada){
          for (let f = elemento; f < this.datos.length-1; f++)
                this.datos[f] = this.datos[f + 1];
                this.datos.pop();
      }
          return encontrada
    }
    buscarBinario(array,codigo){
        let limInferior = 0
        let limSuperior = array.length - 1
        let encontrado = false
        let medio = null
        let elemento = null
        while(limInferior <= limSuperior && !encontrado){
          medio = Math.floor((limInferior + limSuperior) / 2)
            if(array[medio].codigo == codigo){
              encontrado = true
              elemento = array[medio]
            }
             else if(array[medio].codigo < codigo)
                    limInferior = medio + 1
                    else
                        limSuperior = medio - 1
                        }
                        return {encontrado , elemento, medio, limInferior};
    }
    listar(){
      let res="";
      for (let i=0; i<this.datos.length; i++)
        if (this.datos[i])
            res += this.datos[i].infoHtml();
      return res;
    }
    listarInvertido(){
      let res="";
      for (let i = this.datos.length -1; i>=0; i--)
        if (this.datos[i])
            res += this.datos[i].infoHtml();
      return res;
    }
    _insertar(arreglo,valor,posicion){
      for (let i = arreglo.length;i > posicion; i--)
          arreglo[i] = arreglo[i-1]
      arreglo[posicion] = valor
  }  
}
 
 let inventario = new Inventario()

 function obtenerValores() {
  let cod=parseInt(document.getElementById('codigo').value);
  let nom=document.getElementById('nombre').value;
  let cant=parseInt(document.getElementById('cantidad').value);
  let cost=parseFloat(document.getElementById('costo').value);
  return {cod, nom, cant, cost};
}
function limpiarCasillas() {
  document.getElementById('codigo').value='';
  document.getElementById('nombre').value='';
  document.getElementById('cantidad').value='';
  document.getElementById('costo').value='';
}
  document.getElementById('formSubmit').addEventListener('submit',function (e){
    e.preventDefault();
    // recuperar cajas de texto y crear objeto
    let { cod, nom, cant, cost } = obtenerValores();
    let nuevo=new Producto(cod,nom,cant,cost);
    //agregar
    let div=document.getElementById('detalles');
    let agregado = inventario.agregar(nuevo)
    agregado ?  div.innerHTML = '<p>Nuevo</p>' + nuevo.infoHtml() : 
    div.innerHTML = '<p>Ya existe</p>'
    limpiarCasillas()
  });
 
  const btnList=document.getElementById('btnList');
  btnList.addEventListener('click',()=>{
      let div=document.getElementById('detalles');
    div.innerHTML=inventario.listar();
  });
  // lsitar invertido
  const btnListInv=document.getElementById('btnListInv');
  btnListInv.addEventListener('click',()=>{
      let div=document.getElementById('detalles');
    div.innerHTML=inventario.listarInvertido();
  });
//   extraer prim
  const btnExtr = document.getElementById('btnExtr');
  btnExtr.addEventListener('click',()=>{
      let div=document.getElementById('detalles');
      let extraido = inventario.extraerPrimerProductoHTML();
      extraido ? div.innerHTML =`<h3>Elemento extraído:</h3>${extraido.infoHtml()}`: 
      div.innerHTML = '<h3>Ningún elemento extraído</h3>'  
    });
  // extraer ultimo
  const btnExtrUlt = document.getElementById('btnExtrUlt');
  btnExtrUlt.addEventListener('click',()=>{
      let div=document.getElementById('detalles');
      let extraido = inventario.extraerUltimoProducto();
      extraido ? div.innerHTML =`<h3>Elemento extraído:</h3>${extraido.infoHtml()}`: 
      div.innerHTML = '<h3>Ningún elemento extraído</h3>'

  });
 //   eliminar
 const btnElim = document.getElementById('btnElim');
 btnElim.addEventListener('click',()=>{
    let elemento=document.getElementById('eliminar').value;
    let encontrado = inventario.eliminar(elemento);
    let div=document.getElementById('detalles');
    encontrado ? div.innerHTML=inventario.listar() : div.innerHTML = '<p>Codigo a eliminar no encontrado</p>';
 });
//  buscar
 const btnBusc = document.getElementById('btnBusc');
 btnBusc.addEventListener('click',()=>{
    let elemento=document.getElementById('buscar').value;
    
    let div=document.getElementById('detalles');
    let elementoEncontrado = inventario.buscarBinario(inventario.datos,elemento).elemento
    div.innerHTML = elementoEncontrado ? elementoEncontrado.infoHtml() : '<p>No encontrada</p>';
 });
