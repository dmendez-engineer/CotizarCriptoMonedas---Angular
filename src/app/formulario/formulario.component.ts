import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Moneda } from '../interfaces/moneda';
import { ServicioService } from '../services/servicio.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  labelMoneda:string='Elige tu moneda';
  labelMonedaCripto:string='Elige tu criptoMoneda';
  miFormulario:FormGroup=this.fb.group({
    moneda:['',[Validators.required]],
    monedaCripto:['',[Validators.required]]

  });

   monedas:Moneda[]=[
    {id:'USD',nombre:'Dolar de Estados Unidos'},
    {id:'MXN',nombre:'Peso Mexicano'},
    {id:'EUR',nombre:'Euro'},
    {id:'CRC',nombre:'Colon costarricense'}
]
  monedasCritpo:any[]=[];
  resultadoCotizacion:any={};

  constructor(private fb:FormBuilder,private monedaService:ServicioService) { }

  ngOnInit(): void {
    this.monedaService.ObtenerCritpo().subscribe(info=>{
      this.monedasCritpo=info.Data.map((data:any)=>{
          return data.CoinInfo;
      });

    });
  }
  public Cotizar():void{
    const moneda=this.miFormulario.controls['moneda'].value;
    const monedaCripto=this.miFormulario.controls['monedaCripto'].value;

  //  console.log("Enviando Formulario: ");
   // console.log(moneda,monedaCripto);

    this.monedaService.CotizarCostos(monedaCripto,moneda).subscribe(data=>{
        this.resultadoCotizacion=data.DISPLAY[monedaCripto][moneda];
      console.log(this.resultadoCotizacion);
    });

  }


}
