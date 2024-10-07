import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ProviderService } from '../../services/provider.service';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent {
   public _router: Router = inject(Router);
   private provider: ProviderService = inject(ProviderService);

   _data: any[] = [];
   columns: any[] = [];
   ui_data!: MatTableDataSource<any>;

   @Output() eliminar = new EventEmitter<any>
   @Output() clicktabla = new EventEmitter<any>
   @Input() filters: any = [];
   @Input({ required: true }) data: any[] = [];

   @ViewChild(MatSort) sort!: MatSort;
   @ViewChild(MatPaginator) paginator!: MatPaginator;

   async ngOnInit() {
      // Actualización de datos en la tabla
      this._data = await this.provider.request('POST','usuario','GetAll');

      this.ui_data = await new MatTableDataSource(this._data);
      this.ui_data.paginator = await this.paginator;
      this.ui_data.sort = await this.sort;
    this.columns = Object.keys(this._data[0] ?? {}).filter(column => column !== 'password' && column !== 'id');
      // this.columns = await Object.keys(this._data[0] ?? []);
      this.columns.push('Acciones');
   }


   async filter(query: string) {
      this.ui_data.filter = await query
         .trim()
         .normalize('NFD')
         .replace(/[\u0300-\u036f]/g, '')
         .toLowerCase();

      if (this.ui_data.paginator) await this.ui_data.paginator.firstPage();
   }
   clickElemento(elemento: any){
    this.clicktabla.emit(elemento);
    this._router.navigate(["privado", "usuarios","editar",elemento.id]);
   }

   async eliminarElemento(elemento:any){
    this.eliminar.emit(elemento);
    await this.provider.request('POST','usuario','Delete', {id:elemento.id})
    this.ngOnInit();
   }

   async detalle(elemento: any){
    this.eliminar.emit(elemento);
    this._router.navigate(["privado", "usuarios","detalle",elemento.id]);
   }

}
