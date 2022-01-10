import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeadDisplayPipe } from './headDisplay.pipe';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HeadDisplayPipe ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
