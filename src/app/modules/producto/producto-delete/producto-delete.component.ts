import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MedicamentoService } from 'src/app/core/services/medicamento.service';

@Component({
  selector: 'app-producto-delete',
  templateUrl: './producto-delete.component.html',
  styleUrls: ['./producto-delete.component.scss']
})
export class ProductoDeleteComponent {

  
  dataMedicamento: any;
  mensajeError: any;

  constructor(
    public dialogRef: MatDialogRef<ProductoDeleteComponent>,
    private medicamentoService: MedicamentoService,
    private toasterService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dataMedicamento = data.data
  }

  ngOnInit(): void {

  }

  onFormSubmit() {
    if (navigator.onLine) {
      this.mensajeError = null;
      this.medicamentoService.delete("api/inventario/eliminar", this.dataMedicamento.id).subscribe({
        next: (medicamento) => {
          this.dialogRef.close(medicamento);
          this.toasterService.success('producto eliminado exitosamente')
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
