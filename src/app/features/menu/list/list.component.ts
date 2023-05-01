import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { headerObject } from 'src/app/shared/data-grid/data-grid.type';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {


  constructor(private router:Router) {}

  dummyData = [
    {name: 'vishal', age: 20, },
    {name: 'vishal', age: 20, },
  ]

  headers: headerObject[] = [
    {
    name: 'name',
    title: 'Name',
    visible: true
  },
  {
    name: 'age',
    title: 'Age',
    visible: true
  }
]


handleAdd() {
  this.router.navigate(['/menu/add'])
}

}
