import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Loan } from './model/Loan';
import { LoanPage } from './model/LoanPage';
import { LOAN_DATA } from './model/mock-loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(
    private http: HttpClient
  ) { }

  getLoans(pageable: Pageable, gameID?:number, clientID?:number, date?:Date): Observable<LoanPage> {
    return this.http.post<LoanPage>(this.composeFindUrl(gameID, clientID, date), {pageable:pageable});
  }

  getLoansPage(pageable: Pageable): Observable<LoanPage> {
    return this.http.post<LoanPage>('http://localhost:8080/loan', {pageable:pageable});  
  }
    
  

  saveLoan(loan: Loan): Observable<Loan> {
    let url = 'http://localhost:8080/loan';
        if (loan.id != null) url += '/'+loan.id;

        return this.http.put<Loan>(url, loan);
  }

  deleteLoan(idLoan : number): Observable<void> {
    return this.http.delete<void>('http://localhost:8080/loan/'+idLoan);
  }

  private composeFindUrl(gameID?: number, clientID?: number, date?: Date) : string {
    let params = '';

    if (gameID != null) {
        params += 'idGame='+ gameID;
    }

    if (clientID != null) {
        if (params != '') params += "&";
        params +="idClient=" + clientID;
    }

    if (date != null) {
      if (params != '') params += "&";
      params += "date=" + date.toLocaleDateString();
  }

    let url = 'http://localhost:8080/loan'

    if (params == '') return url;
    else return url + '?'+params;
}
} 
