import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ProductoAddComponent } from 'src/app/modules/producto/producto-add/producto-add.component';
import { ProductoDeleteComponent } from 'src/app/modules/producto/producto-delete/producto-delete.component';
import { ProductoEditComponent } from 'src/app/modules/producto/producto-edit/producto-edit.component';
import { VentaMedicamentoComponent } from 'src/app/modules/venta/venta-medicamento/venta-medicamento.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  defaultOptions = { disableClose: true };

  constructor(
    private matDialog: MatDialog,
  ) { }

  assignOptions(newInformation: any) {
    return Object.assign({}, this.defaultOptions, newInformation);
  }

  guardarMedicamentoDialog() {
    let dialogRef: MatDialogRef<ProductoAddComponent>;
    dialogRef = this.matDialog.open(ProductoAddComponent, this.defaultOptions);
    return dialogRef.afterClosed();
  }

  eliminarMedicamentoDialog(data: any) {
    let dialogRef: MatDialogRef<ProductoDeleteComponent>;
    dialogRef = this.matDialog.open(
      ProductoDeleteComponent,
      this.assignOptions({
        data: { data }
      })
    );
    return dialogRef.afterClosed();
  }

  editarMedicamentoDialog(data: any) {
    let dialogRef: MatDialogRef<ProductoEditComponent>;
    dialogRef = this.matDialog.open(
      ProductoEditComponent,
      this.assignOptions({
        data: { data }
      })
    );
    return dialogRef.afterClosed();
  }

  venderMedicamentoDialog(data: any) {
    let dialogRef: MatDialogRef<VentaMedicamentoComponent>;
    dialogRef = this.matDialog.open(
      VentaMedicamentoComponent,
      this.assignOptions({
        data: { data }
      })
    );
    return dialogRef.afterClosed();
  }

}
