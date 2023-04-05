import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';
import { Pageable } from '../../core/model/page/Pageable';
import { LoanEditComponent } from '../loan-edit/loan-edit.component';
import { LoanService } from '../loan.service';
import { GameService } from '../../game/game.service';
import { ClientService } from '../../client/client.service';
import { Game } from '../../game/model/Game';
import { Client } from '../../client/model/Client';
import { Loan } from '../model/Loan';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit{
  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  filterClient: Client;
  filterGame: Game;
  clients : Client[];
  games : Game[];
  loans: Loan[];
  filterDate: Date;
  

  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = ['id', 'game','client', 'borrowedDate', 'returnDate', 'action'];

  constructor(
      private loanService: LoanService,
      private gameService: GameService,
      private clientService: ClientService,
      public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadPage();
    this.gameService.getGames().subscribe(
        games => this.games = games
    );

    this.clientService.getClients().subscribe(
        clients => this.clients = clients
    );

    this.loadPage();
      
  }

  loadPage(event?: PageEvent) {

      let pageable : Pageable =  {
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          sort: [{
              property: 'id',
              direction: 'ASC'
          }]
      }

      if (event != null) {
          pageable.pageSize = event.pageSize
          pageable.pageNumber = event.pageIndex;
      }

      this.loanService.getLoansPage(pageable).subscribe(data => {
          this.dataSource.data = data.content;
          this.pageNumber = data.pageable.pageNumber;
          this.pageSize = data.pageable.pageSize;
          this.totalElements = data.totalElements;
      });

  }  

  createLoan() {      
      const dialogRef = this.dialog.open(LoanEditComponent, {
          data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
          this.ngOnInit();
      });      
  }  

  deleteLoan(loan: Loan) {    
      const dialogRef = this.dialog.open(DialogConfirmationComponent, {
          data: { title: "Eliminar préstamo", description: "Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?" }
      });

      dialogRef.afterClosed().subscribe(result => {
          if (result) {
              this.loanService.deleteLoan(loan.id).subscribe(result =>  {
                  this.ngOnInit();
              }); 
          }
      });
  }  

  onCleanFilter(): void {
    this.filterGame = null;
    this.filterClient = null;
    this.filterDate = null;

    this.onSearch();
}

onSearch(): void {

    let date = this.filterDate; 
    let gameId = this.filterGame != null ? this.filterGame.id : null;
    let clientId = this.filterClient != null ? this.filterClient.id : null;

    let pageable : Pageable =  {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        sort: [{
            property: 'id',
            direction: 'ASC'
        }]
    }



    this.loanService.getLoans(pageable, gameId, clientId, date).subscribe(data => {
        this.dataSource.data = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
    });
}

}