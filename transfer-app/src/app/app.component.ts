import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ImportAccountsComponent } from './import-accounts/import-accounts.component';
import { AccountsListComponent } from './accounts-list/accounts-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'transfer-app';
}
