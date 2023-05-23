class Presupuesto {
    constructor() {
      this.productos = [];
      this.precios = [];
    }
  
    agregarProducto(producto, precio) {
      this.productos.push(producto);
      this.precios.push(precio);
    }
  
    eliminarProducto(index) {
      this.productos.splice(index, 1);
      this.precios.splice(index, 1);
    }
  
    modificarProducto(index, producto, precio) {
      this.productos[index] = producto;
      this.precios[index] = precio;
    }
  
    calcularTotal() {
      let total = 0;
  
      for (let i = 0; i < this.precios.length; i++) {
        total += this.precios[i];
      }
  
      const recargo = total * 0.21;
      total += recargo;
  
      return total.toFixed(2);
    }
  }
  
  class PresupuestoApp {
    constructor() {
      this.presupuesto = new Presupuesto();
      this.indiceModificacion = null;
      this.productoInput = document.getElementById("producto");
      this.precioInput = document.getElementById("precio");
      this.presupuestoDiv = document.getElementById("presupuesto");
  
      this.agregarBtn = document.getElementById("agregarBtn");
      this.agregarBtn.addEventListener("click", this.agregarProducto.bind(this));
  
      this.modificarBtn = document.getElementById("modificarBtn");
      this.modificarBtn.addEventListener("click", this.modificarProducto.bind(this));
  
      this.eliminarBtn = document.getElementById("eliminarBtn");
      this.eliminarBtn.addEventListener("click", this.eliminarProducto.bind(this));
  
      this.refrescarBtn = document.getElementById("refrescarBtn");
      this.refrescarBtn.addEventListener("click", this.refrescarPresupuesto.bind(this));
  
      this.mostrarPresupuesto();
    }
  
    agregarProducto() {
      const producto = this.productoInput.value;
      const precio = parseFloat(this.precioInput.value);
  
      if (this.indiceModificacion === null) {
        this.presupuesto.agregarProducto(producto, precio);
      } else {
        this.presupuesto.modificarProducto(this.indiceModificacion, producto, precio);
        this.indiceModificacion = null;
      }
  
      this.productoInput.value = "";
      this.precioInput.value = "";
  
      this.guardarPresupuesto();
      this.mostrarPresupuesto();
    }
  
    eliminarProducto() {
      if (this.indiceModificacion !== null) {
        this.indiceModificacion = null;
      } else {
        const index = parseInt(prompt("Ingrese el índice del producto a eliminar:"));
        if (index >= 0 && index < this.presupuesto.productos.length) {
          this.presupuesto.eliminarProducto(index);
          this.guardarPresupuesto();
          this.mostrarPresupuesto();
        } else {
          alert("Índice inválido");
        }
      }
    }
  
    modificarProducto() {
      if (this.indiceModificacion !== null) {
        const producto = this.productoInput.value;
        const precio = parseFloat(this.precioInput.value);
  
        this.presupuesto.modificarProducto(this.indiceModificacion, producto, precio);
        this.indiceModificacion = null;
  
        this.productoInput.value = "";
        this.precioInput.value = "";
  
        this.guardarPresupuesto();
        this.mostrarPresupuesto();
      } else {
        const index = parseInt(prompt("Ingrese el índice del producto a modificar:"));
        if (index >= 0 && index < this.presupuesto.productos.length) {
          const producto = this.presupuesto.productos[index];
          const precio = this.presupuesto.precios[index];
  
          this.productoInput.value = producto;
          this.precioInput.value = precio;
  
          this.indiceModificacion = index;
        } else {
          alert("Índice inválido");
        }
      }
    }
  
    refrescarPresupuesto() {
      this.presupuesto = new Presupuesto();
      this.guardarPresupuesto();
      this.mostrarPresupuesto();
    }
  
    guardarPresupuesto() {
      localStorage.setItem("presupuesto", JSON.stringify(this.presupuesto));
    }
  
    cargarPresupuesto() {
      const presupuestoGuardado = localStorage.getItem("presupuesto");
      if (presupuestoGuardado) {
        this.presupuesto = Object.assign(new Presupuesto(), JSON.parse(presupuestoGuardado));
      }
    }
  
    mostrarPresupuesto() {
      this.cargarPresupuesto();
  
      this.presupuestoDiv.innerHTML = "";
  
      for (let i = 0; i < this.presupuesto.productos.length; i++) {
        const producto = this.presupuesto.productos[i];
        const precio = this.presupuesto.precios[i];
  
        const item = document.createElement("p");
        item.textContent = `${i + 1}. ${producto} - $${precio.toFixed(2)}`;
  
        this.presupuestoDiv.appendChild(item);
      }
  
      const total = this.presupuesto.calcularTotal();
  
      const totalElement = document.createElement("p");
      totalElement.textContent = `Total (incluye recargo del 21%): $${total}`;
      this.presupuestoDiv.appendChild(totalElement);
    }
  }
  
  const app = new PresupuestoApp();
  