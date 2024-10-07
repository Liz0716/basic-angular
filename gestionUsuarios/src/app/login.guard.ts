import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inyectamos el Router

  if (localStorage.getItem("APP_USER")) {
    return true;
  }else{
    router.navigateByUrl("/login")
    return false;
  }

};
