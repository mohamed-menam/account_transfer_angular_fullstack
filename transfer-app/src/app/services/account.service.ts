import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/accounts/`);
  }

  getAccount(accountNumber: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/accounts/${accountNumber}/`);
  }

  transferFunds(
    sender: string,
    recipient: string,
    amount: number
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/transfer/`, {
      sender_account_number: sender,
      recipient_account_number: recipient,
      amount,
    });
  }

  importAccounts(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.apiUrl}/import/`, formData);
  }
}
