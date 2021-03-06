import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocialImpactComponent } from './Components/social-impact/social-impact.component';
import { SocialImpactCollectorComponent } from './Components/social-impact-collector/social-impact-collector.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { VideoGuidelineComponent } from './Components/video-guideline/video-guideline.component';
import { LoaderComponent } from './Components/Loader/my-loader.component';
import { LoaderService } from './loader.service';
import { ErrorMessageComponent } from './Components/error-message/error-message.component';
@NgModule({
  declarations: [
    AppComponent,
    SocialImpactCollectorComponent,
    FooterComponent,
    HeaderComponent,
    VideoGuidelineComponent,
    LoaderComponent,
    ErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    LoaderService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SocialImpactComponent,
    VideoGuidelineComponent
  ]
})
export class AppModule { }
