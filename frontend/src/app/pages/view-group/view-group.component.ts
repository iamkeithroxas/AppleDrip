import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router"
@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.css']
})
export class ViewGroupComponent {

  constructor(private route: ActivatedRoute) {

  }
  ngOnInit(){
    this.route.params.subscribe(params=>{
      let id = params['id'];
      console.log(id);
    })
  }
}
