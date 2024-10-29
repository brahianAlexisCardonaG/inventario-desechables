import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  items!: MenuItem[];
  nombreUser:string = "";

  constructor(
    private router : Router
  ) {
    this.items = [
      { label: 'Gestionar Inventario', icon: 'pi pi-box', url: '/gestionar-inventario', target: "_self" },
      { label: 'Realizar Ventas', icon: 'pi pi-tags', url: '/realizar-ventas', target: "_self" },
      { label: 'Listado Ventas', icon: 'pi pi-tags', url: '/listado-ventas', target: "_self" }
    ]
    this.items[0]
  }

  ngOnInit(){
    const userStr = sessionStorage.getItem('user');
    if (userStr !== null) {
      const user = JSON.parse(userStr);
      this.nombreUser = user.nickname;
    }
  }

  isAccordionOpen = false;

  toggleAccordion() {
    this.isAccordionOpen = !this.isAccordionOpen;
  }

  cerrarSesion():void {
    sessionStorage.setItem("user", '');
    this.router.navigate(['/']);
  }

}
