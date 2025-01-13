import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-accounts-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './accounts-list.component.html',
  styleUrl: './accounts-list.component.css',
})
export class AccountsListComponent implements OnInit {
  accounts: any[] = [];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe((data) => {
      this.accounts = data;
    });
  }
}
