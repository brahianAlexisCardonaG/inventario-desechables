import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/core/services/venta.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {

  sale: any;

  constructor(
    private ventaService: VentaService,
  ) { }

  ngOnInit(): void {
    this.ventaService.get('api/venta/listar')
      .subscribe((res) => {
        this.sale = res;
      })
  }
}
