import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VentaService } from 'src/app/core/services/venta.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {

  sale: any;
  formVenta!: FormGroup;

  constructor(
    private ventaService: VentaService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.formVenta = this.formBuilder.group({
      fecha: [''],
    })

    this.listVentas();

    this.formVenta.get('fecha')?.valueChanges.subscribe((data) => {

      if (data != null && data != '' && data) {
        this.filterByFecha(data);
      } else {
        this.listVentas();
      }
    })

  }

  filterByFecha(data: string) {
    this.ventaService.filterFecha('api/venta/listarFecha', data).subscribe((data) => {
      this.sale = data;
    })
  }

  listVentas() {
    this.ventaService.get('api/venta/listar')
      .subscribe((res) => {
        this.sale = res;
      })
  }
}
