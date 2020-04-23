import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjetService } from '../../../service/ImplementationService/projet.service'
import { Task } from 'src/app/service/Interfaces/task';
import { Metauser } from 'src/app/service/Interfaces/metauser';
import { User } from 'src/app/service/Interfaces/user';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import  Swal  from 'sweetalert2';
import { PriceService } from 'src/app/service/PriceService/price.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductvisiteurComponent implements OnInit {
  id: number ;
  tasks: Task[];
  task: Task[]; 
  meta:Metauser[];
  Like : boolean = false ; 
  heartChange = 'far'
  rating:number
  starChangeOne = 'far'
  starChangeTwo = 'far'
  starChangeThree = 'far'
  starChangeFour = 'far'
  starChangeFive = 'far'
  user:User
  vendId:number
  idprod:number = +this.route.snapshot.paramMap.get('id')
  similiar: Task[]
  message:string;

  
  constructor(private price: PriceService , private route:ActivatedRoute ,private resourceService:ProjetService) { }
  slideConfig = {"slidesToShow": 5, "slidesToScroll": 4};
  ngOnInit() {
    this.price.currentMessage.subscribe(message => this.message = message) ; 

    this.id = +this.route.snapshot.paramMap.get('id') ;
    console.log(this.id)
    this.getTask(this.id)
    console.log(this.tasks)
    this.similiarproducts(this.id)
  
  this.resourceService
  .getTasks()
  .subscribe((data: Task[]) => {
    this.task = data;
    this.task.forEach(n => {
      if(n.produitId ==  this.idprod)
          {
            console.log("ok")
            this.vendId = n.vendeurId ;
            this.getUser(this.vendId)
          }
      });
  });
  
  console.log(this.vendId)
  }

  getUser(vendId) : void{
    this.resourceService.getUser(this.vendId).subscribe(user => (this.user = user))
  }

  getTask (idprod): void {
    this.resourceService.getTask(idprod).subscribe(tasks => (this.tasks = tasks))
  }

  similiarproducts(idprod):void{
    this.resourceService.similiarproducts(idprod).subscribe(similiar => (this.similiar = similiar))
  }

  Alert(){
    Swal.fire({
      icon: 'error',
      title: 'You Are Not Authentified!',
      text: 'You Have to authentified',
      footer: '<a href="/app-register">You Can Register in our website here</a>'
    })
      
  }

  
}

