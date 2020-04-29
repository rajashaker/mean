import { Injectable } from '@angular/core';
import { CanActivate ,ActivatedRouteSnapshot,RouterStateSnapshot,Router} from '@angular/router';
import{ProductService} from '../product.service'
 @Injectable()
export class DashboardGaurd implements CanActivate{
    constructor(
private poductservice: ProductService,
private router:Router
    ){}
    canActivate(){
        if(this.poductservice.isLoggedIn()){
            return true;
        }
        this.router.navigate(['/labour']);
        return false;
    }
}