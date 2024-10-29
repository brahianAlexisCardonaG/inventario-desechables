import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { every } from 'rxjs';
import { DialogService } from 'src/app/core/services/dialog.service';
import { MedicamentoService } from 'src/app/core/services/medicamento.service';
import { VentaService } from 'src/app/core/services/venta.service';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  products: any;
  formProducto!: FormGroup;
  formCantidadVender!: FormGroup;
  formCodProducto!: FormGroup;
  urlAction!: string;
  filasSeleccionadas: any[] = [];
  dataFila: any;
  visible: boolean = false;
  visibleListadoVenta: boolean = false;
  productosVenta: any[] = [];
  cantidadesOriginales: number[] | any = [];
  isCantidadInputDetail:boolean = false;

  constructor(
    private medicamentoService: MedicamentoService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toasterService: ToastrService,
    private ventaService: VentaService,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.urlAction = event.url;
      }

    })
  }

  ngOnInit(): void {

    this.formProducto = this.formBuilder.group({
      nombre: [''],
      laboratorioFabrica: [''],
      codigoProducto: ['']
    })

    this.formCantidadVender = this.formBuilder.group({
      cantidadVender: [1, [Validators.required, Validators.min(1)]]
    })
  }

  clickDetalleVenta(product: any) {
    if (product) {
      this.dataFila = product;
      this.visible = true;
    }
  }

  clickListadoVentaProducto(): void {
    this.visibleListadoVenta = true;
    this.formCodProducto = this.formBuilder.group({
      codigoProducto: ['']
    });
  }

  actualizarCantidades() {

    this.cantidadesOriginales = this.productosVenta.map(producto => producto.cantidad);

    for (let i = 0; i < this.productosVenta.length; i++) {
      this.productosVenta[i].cantidad = this.cantidadesOriginales[i];
    }
    this.guardarlistadoVentasProductos(this.productosVenta);
  }

  guardarlistadoVentasProductos(productosVenta: any): void {
    if (productosVenta.length > 0) {
      const listadoVentas = this.productosVenta.map((el: any) => ({
        idProducto: el.id,
        nombreProducto: el.nombre,
        valorUnitario: el.valorUnitario,
        fecha: null,
        cantidad: el.cantidad,
        valorTotal: el.cantidad * el.valorUnitario
      }));

      this.ventaService.sale('api/venta/crear', listadoVentas)
        .subscribe({
          next: (venta) => {
            this.toasterService.success('Venta creada exitosamente');
            this.cancelarVentaListado();
          },
          error: (error) => {
            try {
              for (let field of error) {
                this.toasterService.error(field.message, 'Error');
              }
            } catch (e) {
            }
          },
        });
    } else {
      this.toasterService.error('Error, no haz seleccionado ningun producto para vender');
    }
  }

  AceptarCodProdcuto(prueba: any): void {
    let codProduct = this.formCodProducto.get("codigoProducto")!.value;
    if (codProduct) {
      let data = this.formCodProducto.value;
      this.medicamentoService.filterInventario('api/inventario/listar', data).subscribe((data) => {
        if (data) {
          this.clickVender(data[0]);
          this.formCodProducto.get("codigoProducto")?.setValue("");
        }
      })
    }
  }

  clickVender(product: any): void {
    let cantidadVender = this.formCantidadVender.get('cantidadVender')?.value
    if (cantidadVender) {
      product.cantidad = cantidadVender;
    } else {
      product.cantidad = 1;
    }

    let productoExisteArray = this.productosVenta.some(e => e.id === product.id);
    if (productoExisteArray) {
      this.toasterService.error('El producto ya se encuentra en la lista para realizar la venta');
    } else {
      this.productosVenta.push(product);
      this.visible = false;
    }

  }

  filter() {
    let data = this.formProducto.value;
    if (data) {
      if (this.formProducto.get("codigoProducto")?.value) {
        data.codigoProducto = +this.formProducto.get("codigoProducto")?.value;
      }
      for (const key in data) {
        if (!data[key]) {
          delete data[key];
        }
      }
      this.medicamentoService.filterInventario('api/inventario/listar', data).subscribe((data) => {
        this.products = data;
      })
    }
  }

  limpiar() {
    this.formProducto.get('nombre')?.setValue('');
    this.formProducto.get('laboratorioFabrica')?.setValue('');
  }

  guardarMedicamentoDialog() {
    this.dialogService
      .guardarMedicamentoDialog()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  eliminarMedicamentoDialog(data: any) {
    this.dialogService
      .eliminarMedicamentoDialog(data)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  editarMedicamentoDialog(data: any) {
    this.dialogService
      .editarMedicamentoDialog(data)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  venderMedicamentoDialog(data: any) {
    this.dialogService
      .venderMedicamentoDialog(data)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  cerrarModal(): void {
    this.visible = false;
  }

  cerrarModalListadoVenta(): void {
    this.visibleListadoVenta = false;
  }

  cancelarVentaListado(): void {
    this.cerrarModalListadoVenta();
    this.productosVenta = [];
  }

  eliminarVentaListado(i: number): void {
    this.productosVenta.splice(i, 1);
  }

  validarCantidad(data:any):void {
    if(data.data <=0 || data.data == null) {
      this.isCantidadInputDetail = true;
    }else{
      this.isCantidadInputDetail = false;
    }
  }

}
