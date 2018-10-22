import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuario-item',
  templateUrl: './usuario-item.component.html',
  styles: []
})
export class UsuarioItemComponent implements OnInit {

  @Input() username:any;
  usuario:any;
  constructor(private userService:UsuarioService) { }

  ngOnInit() {
    this.userService.getUsuarioByUsername(this.username).subscribe((res:any)=>{
      this.usuario=res;
    })
  }

}
