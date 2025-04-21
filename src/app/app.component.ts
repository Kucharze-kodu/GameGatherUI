import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./ui/menu/menu.component";
import { LoginPageComponent } from "./authentication/ui/login-page/login-page.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, LoginPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GameGatherUI';
}
