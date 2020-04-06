import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SocialImpactComponent } from './Components/social-impact/social-impact.component';
import { SocialImpactCollectorComponent } from './Components/social-impact-collector/social-impact-collector.component';


const routes: Routes = [
  {path: '', component: SocialImpactCollectorComponent},
  {path: 'success-message', component: SocialImpactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
