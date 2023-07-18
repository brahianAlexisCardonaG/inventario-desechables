import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/core/services/dialog.service';
import { MedicamentoService } from 'src/app/core/services/medicamento.service';

@Component({
  selector: 'app-medicamento',
  templateUrl: './medicamento.component.html',
  styleUrls: ['./medicamento.component.scss']
})
export class MedicamentoComponent implements OnInit {

  products: any;

  constructor(
    private medicamentoService: MedicamentoService,
    private dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
    this.medicamentoService.get('api/medicamento/listar')
      .subscribe((res) => {
        this.products = res;
      })
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

}
