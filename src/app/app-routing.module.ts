import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SocialImpactCollectorComponent } from './Components/social-impact-collector/social-impact-collector.component';
import { SocialImpactComponent } from './Components/social-impact/social-impact.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: SocialImpactCollectorComponent},
  { path: 'uploaded-successfully', component: SocialImpactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
