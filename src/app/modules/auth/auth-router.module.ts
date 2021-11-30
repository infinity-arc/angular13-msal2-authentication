import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";

const authRoutes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
			{
				path: 'Home',
				component: HomeComponent
			},
			{
				path: 'profile',
				component: ProfileComponent
			}
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(authRoutes)],
	exports: [RouterModule]
})
export class AuthRouterModule { }
