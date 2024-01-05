import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './components/details/details.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ListComponent, DetailsComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  isLoading: boolean = false;

  constructor(private readonly _loaderService: LoaderService) {
    effect(() => {
      this.isLoading = _loaderService.isLoading()
      console.log(this.isLoading)
    })
  }
}
