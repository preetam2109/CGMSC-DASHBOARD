import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-public',
  standalone: true,
  imports: [RouterModule], // ✅ Add RouterModule here
  templateUrl: './sidebar-public.component.html',
  styleUrl: './sidebar-public.component.css'
})
export class SidebarPublicComponent { }
