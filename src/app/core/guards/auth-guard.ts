import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userStr = sessionStorage.getItem('user');
    if (userStr !== null) {
      const user = JSON.parse(userStr);
      if (user) {
        if (user.rol === 'ADMIN') {
          return true;
        } else if (user.rol === 'VENDEDOR' && state.url === '/realizar-ventas') {
          return true;
        } else if (user.rol === 'VENDEDOR' && state.url === '/listado-ventas') {
          return true;
        } else if (user.rol === 'VENDEDOR' && state.url === '/page-not-found') {
          return true;
        }
      }
    }

    this.router.navigate(['/page-not-found']);
    return false;
  }
}
