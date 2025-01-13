import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-import-accounts',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './import-accounts.component.html',
  styleUrls: ['./import-accounts.component.css'],
})
export class ImportAccountsComponent {
  selectedFile: File | null = null;
  message: string | null = null;

  constructor(private accountService: AccountService) {}

  // Handle file selection
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Submit the form to import accounts
  onSubmit(): void {
    if (this.selectedFile) {
      this.accountService.importAccounts(this.selectedFile).subscribe(
        (response) => {
          this.message = response.message;
        },
        (error) => {
          this.message = 'Error importing accounts';
        }
      );
    }
  }
}
