import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ClientService} from '../../../Services/client-service';
import { Client } from '../../../Models/client';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {
  private clients: Client[];
  @Output() clickEvent: EventEmitter<Client> = new EventEmitter<Client>();

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.initClients();
  }

  initClients() {
    this.clientService.readClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  onClick(client: Client) {
    this.clickEvent.emit(client);
    this.initClients();
  }

  onRefresh() {
    this.initClients();
  }

}
