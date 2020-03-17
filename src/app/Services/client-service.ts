import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Client} from '../Models/client';

const URI = 'http://localhost:8080/api/client/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clients: Client[];
  private client: Client;
  constructor(private http: HttpClient) { }

  public getClients() {
    return this.clients;
  }

  public getClient() {
    return this.client;
  }

  public readClients() {
    return this.http.get<Client[]>(URI).subscribe( x => this.clients = x);
  }

  public readClient(id: number) {
    return this.http.get<Client>(URI + id).subscribe( x => this.client = x);
  }

  public createClient(idClient: number, client: Client) {
    const clientDto = {
      nomClient: client.nomClient,
      prenomClient: client.prenomClient,
      telephone: client.telephone,
      dateNaissanceClient: client.dateNaissanceClient
    };
    return this.http.post(URI, clientDto, httpOptions);
  }

  public updateClient(id: number, client: Client) {
    const clientDto = {
      nomClient: client.nomClient,
      prenomClient: client.prenomClient,
      telephone: client.telephone,
      dateNaissanceClient: client.dateNaissanceClient
    };
    return this.http.put(URI + id, clientDto, httpOptions);
  }

  public deleteClient(id: number) {
    return this.http.delete(URI + id);
  }
}
