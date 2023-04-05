import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoanService } from '../loan.service';
import { Loan } from '../model/Loan';
import { GameService } from '../../game/game.service';
import { Game } from '../../game/model/Game';
import { ClientService } from '../../client/client.service';
import { Client } from '../../client/model/Client';

@Component({
  selector: 'app-loan-edit',
  templateUrl: './loan-edit.component.html',
  styleUrls: ['./loan-edit.component.scss']
})
export class LoanEditComponent implements OnInit{

  loan : Loan;
  games: Game[];
  clients: Client[];
  returnPreviousBorrowed: boolean;
  moreThan14Days: boolean;
  validations: boolean;
  errorValidations: String;

    constructor(
        public dialogRef: MatDialogRef<LoanEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private loanService: LoanService,
        private gameService: GameService,
        private clientService: ClientService
    ) { }

    ngOnInit(): void {
        if (this.data.loan != null) {
            this.loan = Object.assign({}, this.data.loan);
        }
        else {
            this.loan = new Loan();
        }

        this.gameService.getGames().subscribe(
            games => {
                this.games = games;

                if (this.loan.game != null) {
                    let gameFilter: Game[] = games.filter(game => game.id == this.data.loan.game.id);
                    if (gameFilter != null) {
                        this.loan.game = gameFilter[0];
                    }
                }
            }
        );

        this.clientService.getClients().subscribe(
            clients => {
                this.clients = clients;

                if (this.loan.client != null) {
                    let clientFilter: Client[] = clients.filter(client => client.id == this.data.loan.client.id);
                    if (clientFilter != null) {
                        this.loan.client = clientFilter[0];
                    }
                }
            }
        );

    }

    validaciones(){
        const borrowedDate = this.loan.borrowedDate.getTime();
        const returnDate = this.loan.returnDate.getTime();
        var dif = (returnDate - borrowedDate)/(1000*60*60*24);
        this.returnPreviousBorrowed = false;
        this.moreThan14Days = false;
        
        if(dif < 0){
            this.returnPreviousBorrowed = true;
        }
        else if(dif > 14){
            this.moreThan14Days = true;
        }
    }

    onSave() {
        if( !this.returnPreviousBorrowed && !this.moreThan14Days){
            this.loanService.saveLoan(this.loan).subscribe({
                next: (res:Loan) => {
                    this.validations =false;
                    this.dialogRef.close();
                  },
                  error: (err) => {
                    this.validations =true;
                    this.errorValidations = err.error.message
                  }
        }); 
    }
}  

    onClose() {
        this.dialogRef.close();
    }

    

}