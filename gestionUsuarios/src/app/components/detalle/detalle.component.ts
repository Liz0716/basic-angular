import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent {
  private provider: ProviderService = inject(ProviderService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  public _router: Router = inject(Router);

  usuarios: any;

  async ngOnInit(): Promise<void> {
   const prodId = this.activatedRoute.snapshot.paramMap.get('id');
   this.usuarios = await this.provider.request('POST','usuario','GetId',{id:prodId});
  }

  clickElemento(id: any){
    this._router.navigate(["privado", "usuarios","editar",id]);
  }

}
