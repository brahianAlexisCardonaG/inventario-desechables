import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/core/services/dialog.service';
import { MedicamentoService } from 'src/app/core/services/medicamento.service';

@Component({
  selector: 'app-medicamento',
  templateUrl: './medicamento.component.html',
  styleUrls: ['./medicamento.component.scss']
})
export class MedicamentoComponent implements OnInit {

  products: any;
  formMedicamento!: FormGroup;

  constructor(
    private medicamentoService: MedicamentoService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {

    this.formMedicamento = this.formBuilder.group({
      nombre: [''],
    })

    this.listMedicamentos();

    this.formMedicamento.get('nombre')?.valueChanges.subscribe((data) => {

      if (data != null && data != '' && data) {
        this.filterByNombre(data);
      }else {
        this.listMedicamentos();
      }
    })
  }

  filterByNombre(data: string) {
    this.medicamentoService.filterNombre('api/medicamento/listarNombre', data).subscribe((data) => {
      this.products = data;
    })
  }

  listMedicamentos() {
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
