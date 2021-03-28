import { Component } from '@angular/core';
import { ItemModel } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RentACar-FrontEnd';
  public items: ItemModel[] = [
    {
      text: 'Cut'
  },
  {
      text: 'Copy'
  },
  {
      text: 'Paste'
  }];
}
