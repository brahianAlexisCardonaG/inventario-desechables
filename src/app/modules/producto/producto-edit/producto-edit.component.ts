import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MedicamentoService } from 'src/app/core/services/medicamento.service';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.scss']
})
export class ProductoEditComponent implements OnInit{

  formEditMedicamento!: FormGroup;
  mensajeError = null;
  dataMedicamento: any;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ProductoEditComponent>,
    private medicamentoService: MedicamentoService,
    private toasterService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dataMedicamento = data.data
  }

  ngOnInit(): void {
    this.formEditMedicamento = this.formBuilder.group({
      nombre: [this.dataMedicamento.nombre, [Validators.required]],
      laboratorioFabrica: [this.dataMedicamento.laboratorioFabrica, [Validators.required]],
      fechaFabricacion: [this.dataMedicamento.fechaFabricacion, [Validators.required]],
      fechaVencimiento: [this.dataMedicamento.fechaVencimiento, [Validators.required]],
      cantidadStock: [this.dataMedicamento.cantidadStock, [Validators.required, , Validators.pattern(/^[1-9]\d*$/)]],
      valorUnitario: [this.dataMedicamento.valorUnitario, [Validators.required]],
    });
  }

  get form() {
    return this.formEditMedicamento.controls;
  }

  onFormSubmit() {
    if (navigator.onLine) {
      this.mensajeError = null;
      const newMedicamento = Object.assign(
        {},
        this.formEditMedicamento.value
      );

      let dataMedicamentos = {
        id: this.dataMedicamento.id,
        nombre: newMedicamento.nombre,
        laboratorioFabrica: newMedicamento.laboratorioFabrica,
        fechaFabricacion: newMedicamento.fechaFabricacion,
        fechaVencimiento: newMedicamento.fechaFabricacion,
        cantidadStock: newMedicamento.cantidadStock,
        valorUnitario: newMedicamento.valorUnitario
      }

      this.medicamentoService.update('api/inventario/actualizar', dataMedicamentos).subscribe({
        next: (medicamento) => {
          console.log(medicamento)
          this.dialogRef.close(medicamento);
          this.toasterService.success('producto actualizado exitosamente')
        },
        error: (error) => {
          try {
            for (let field of error.error.errors) {
              this.toasterService.error(field.message, 'Error');
            }
          } catch (e) {
            this.mensajeError = error.error.message;
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
