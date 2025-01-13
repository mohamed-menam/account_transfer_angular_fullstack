import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  account: any = null;
  error: string = '';

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the account number from the URL parameter
    const accountNumber = this.route.snapshot.paramMap.get('account_number')!;

    // Fetch the account details
    this.accountService.getAccount(accountNumber).subscribe(
      (data) => {
        this.account = data;
      },
      (err) => {
        this.error = err.error.error || 'Failed to fetch account data';
      }
    );
  }
}
