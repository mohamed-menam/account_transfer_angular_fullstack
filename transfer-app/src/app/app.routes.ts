import { Routes } from '@angular/router';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { ImportAccountsComponent } from './import-accounts/import-accounts.component';
import { TransferFundsComponent } from './transfer-funds/transfer-funds.component';
import { AccountComponent } from './account/account.component';

export const routes: Routes = [
  { path: '', component: AccountsListComponent },
  { path: 'import', component: ImportAccountsComponent },
  { path: 'transfer-funds', component: TransferFundsComponent },
  { path: 'account/:account_number', component: AccountComponent },
];
