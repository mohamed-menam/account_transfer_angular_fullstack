import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-transfer-funds',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transfer-funds.component.html',
  styleUrls: ['./transfer-funds.component.css'],
})
export class TransferFundsComponent {
  transferForm: FormGroup;
  message: string = '';
  error: string = '';

  constructor(private fb: FormBuilder, private accountService: AccountService) {
    this.transferForm = this.fb.group({
      sender_account_number: ['', Validators.required],
      recipient_account_number: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.transferForm.valid) {
      const { sender_account_number, recipient_account_number, amount } =
        this.transferForm.value;

      this.accountService
        .transferFunds(sender_account_number, recipient_account_number, amount)
        .subscribe(
          (response) => {
            this.message = response.message;
            this.error = '';
            this.transferForm.reset();
          },
          (error) => {
            this.error = error.error?.error || 'An error occurred';
            this.message = '';
          }
        );
    }
  }
}
