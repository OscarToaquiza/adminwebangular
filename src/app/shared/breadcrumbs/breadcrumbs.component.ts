import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter,map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {


  public titulo: string;
  public titulosSubs$: Subscription;

  constructor( private router:Router, private title: Title, private meta : Meta ) { 

   this.titulosSubs$ = this.getDataRouter().subscribe(
      data => {
        console.log(data);
        this.titulo = data.titulo;
        this.title.setTitle(this.titulo);

        const metaTag: MetaDefinition = {
          name:'description',
          content:this.titulo + "ECUADOR 2020"
        };

        this.meta.updateTag(metaTag)

      }
    );

  }
  ngOnDestroy(): void {
    this.titulosSubs$.unsubscribe();
  }

  ngOnInit(): void {
  }


  getDataRouter(){
    return this.router.events
    .pipe(
      filter(
        respo => respo instanceof ActivationEnd  
      ),
      filter(
        (respo: ActivationEnd) => respo.snapshot.firstChild === null
      ),
      map(
        (respo: ActivationEnd) => respo.snapshot.data 
      ),
    )
  }

}
