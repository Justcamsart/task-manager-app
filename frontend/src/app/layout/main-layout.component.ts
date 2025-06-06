import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive  } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink,
    RouterLinkActive,],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {}
