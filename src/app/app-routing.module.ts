import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SocialImpactCollectorComponent } from './Components/social-impact-collector/social-impact-collector.component';
import { SocialImpactComponent } from './Components/social-impact/social-impact.component';
import { ErrorMessageComponent } from './Components/error-message/error-message.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: SocialImpactCollectorComponent},
  { path: 'uploaded-successfully', component: SocialImpactComponent },
  { path: 'error', component: ErrorMessageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
