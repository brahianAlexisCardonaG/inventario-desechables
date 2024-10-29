import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { VentaService } from 'src/app/core/services/venta.service';
import { VentaComponent } from '../venta.component';

@Component({
  selector: 'app-venta-medicamento',
  templateUrl: './venta-medicamento.component.html',
  styleUrls: ['./venta-medicamento.component.scss']
})
export class VentaMedicamentoComponent {
  formAddVentaMedicamento!: FormGroup;
  mensajeError = null;
  dataVentaMedicamento: any;
  precioTotalMedicamento: any = 0;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<VentaMedicamentoComponent>,
    private ventaService: VentaService,
    private toasterService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dataVentaMedicamento = data.data
  }

  ngOnInit(): void {
    this.formAddVentaMedicamento = this.formBuilder.group({
      cantidad: ['', [Validators.required]],
    });
    this.formAddVentaMedicamento.get('cantidad')?.valueChanges.subscribe((data: any) => {
      this.ventaMedicamentoTotal(data);
    })
  }

  ventaMedicamentoTotal(data: any) {
    this.precioTotalMedicamento = data * this.dataVentaMedicamento.valorUnitario;
  }

  get form() {
    return this.formAddVentaMedicamento.controls;
  }

  onFormSubmit() {
    if (navigator.onLine) {
      this.mensajeError = null;
      const newVenta = Object.assign(
        {},
        this.formAddVentaMedicamento.getRawValue()
      );

      let ventaData = {
        idProducto: this.dataVentaMedicamento.id,
        nombreProducto: this.dataVentaMedicamento.nombre,
        valorUnitario: this.dataVentaMedicamento.valorUnitario,
        fecha: null,
        cantidad: newVenta.cantidad,
        valorTotal: this.precioTotalMedicamento
      }

      let ventas:any[] = [];
      ventas.push(ventaData);

      this.ventaService.sale('api/venta/crear', ventas)
        .subscribe({
          next: (venta) => {
            console.log(venta)
            console.log("entra")
            this.dialogRef.close();
            this.toasterService.success('Venta creada exitosamente');
          },
          error: (error) => {
            try {
              for (let field of error) {
                this.toasterService.error(field.message, 'Error');
              }
            } catch (e) {
              this.mensajeError = error.message;
            }
          },
        });
    } else {
      this.toasterService.error(
        'Por favor, revisa tu conexión a internet',
        'Error'
      );
    }
  }

}
