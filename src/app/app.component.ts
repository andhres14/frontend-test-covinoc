import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.sass' ]
})
export class AppComponent implements OnInit {
  constructor(private metaTagService: Meta) {}

  ngOnInit(): void {
    this.metaTagService.addTags([
      { name: 'keywords', content: 'Covinoc Fronted, Tareas Covinoc, Gestion de Tareas - Covinoc, Prueba Tecnica Covinoc Abuitrago' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Andres Buitrago' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2022-04-29', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' },
    ]);
  }
}
