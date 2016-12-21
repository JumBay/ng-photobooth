import {Component} from "@angular/core";

@Component({
  selector: 'pb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  width: number = 1280;

  setSizeDone: boolean = false;

  onSubmit() {
    this.setSizeDone = true;
  }
}
