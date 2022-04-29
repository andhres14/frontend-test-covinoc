import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorCatchingInterceptor } from './core/interceptors/error-catching.interceptor';

import { AppComponent } from './app.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListFilterPipe } from './shared/pipes/list-filter.pipe';
import { FloatButtonComponent } from './shared/components/float-button/float-button.component';


@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent,
    CreateTaskComponent,
    HeaderComponent,
    FooterComponent,
    ListFilterPipe,
    FloatButtonComponent
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        FormsModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
