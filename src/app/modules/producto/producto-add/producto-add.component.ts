import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MedicamentoService } from 'src/app/core/services/medicamento.service';

@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.component.html',
  styleUrls: ['./producto-add.component.scss']
})
export class ProductoAddComponent {

  formAddMedicamento!: FormGroup;
  mensajeError = null;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ProductoAddComponent>,
    private medicamentoService: MedicamentoService,
    private toasterService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.formAddMedicamento = this.formBuilder.group({
      codigoProducto:['', [Validators.required]],
      nombre: ['', [Validators.required]],
      laboratorioFabrica: ['', [Validators.required]],
      fechaFabricacion: ['', [Validators.required]],
      fechaVencimiento: ['', [Validators.required]],
      cantidadStock: ['', [Validators.required, , Validators.pattern(/^[1-9]\d*$/)]],
      valorUnitario: ['', [Validators.required]],
    });
  }

  get form() {
    return this.formAddMedicamento.controls;
  }

  onFormSubmit() {
    if (navigator.onLine) {
      this.mensajeError = null;
      const newMedicamento = Object.assign(
        {},
        this.formAddMedicamento.value
      );
      this.medicamentoService.save('api/inventario/crear', newMedicamento).subscribe({
        next: (medicamento) => {
          this.dialogRef.close(medicamento);
          this.toasterService.success('producto guardado exitosamente')
        },
        error: (error) => {
          this.toasterService.error(
            error.error
          );
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
