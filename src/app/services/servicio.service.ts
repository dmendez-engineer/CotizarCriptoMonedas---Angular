import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  url:string="https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

  constructor(private _http:HttpClient) { }

  public ObtenerCritpo():Observable<any>{
    return this._http.get(this.url);
  }
  public CotizarCostos(monedaCripto:string,moneda:string):Observable<any>{

    const url=`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${monedaCripto}&tsyms=${moneda}`;
    return this._http.get(url);

  }
}
