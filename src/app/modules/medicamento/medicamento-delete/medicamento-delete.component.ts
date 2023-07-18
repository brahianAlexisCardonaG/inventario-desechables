import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MedicamentoService } from 'src/app/core/services/medicamento.service';

@Component({
  selector: 'app-medicamento-delete',
  templateUrl: './medicamento-delete.component.html',
  styleUrls: ['./medicamento-delete.component.scss']
})
export class MedicamentoDeleteComponent implements OnInit {

  dataMedicamento:any;
  mensajeError:any;

  constructor(
    public dialogRef: MatDialogRef<MedicamentoDeleteComponent>,
    private medicamentoService:MedicamentoService,
    private toasterService:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.dataMedicamento = data.data
    }

  ngOnInit(): void {

  }

  onFormSubmit() {
    if (navigator.onLine) {
      this.mensajeError = null;
      this.medicamentoService.delete(this.dataMedicamento.id).subscribe({
        next: (medicamento) => {
          this.dialogRef.close(medicamento);
          this.toasterService.success('medicamento eliminado exitosamente')
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
