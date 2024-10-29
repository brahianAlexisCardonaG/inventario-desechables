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
  totalVentasFecha:number=0;

  constructor(
    private ventaService: VentaService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.formVenta = this.formBuilder.group({
      fecha: [''],
    })

  }

  filtrar() {
    const dataFilter = this.formVenta.getRawValue();
    for (const key in dataFilter) {
      if (!dataFilter[key]) {
        delete dataFilter[key];
      }
    }
    this.ventaService.get('api/venta/listar', dataFilter).subscribe((data) => {
      this.sale = data;
      if(data){
        this.sumarPrecios(data);
      }
    })
  }

  sumarPrecios(data:any) {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
        total += data[i].valorTotal;
    }
    this.totalVentasFecha=total;
}

  limpiar(){
    this.formVenta.reset();
  }

}
