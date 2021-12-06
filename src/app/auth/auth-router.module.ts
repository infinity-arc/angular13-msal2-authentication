import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MsalGuard } from "@azure/msal-angular";
import { AuthComponent } from "./components/auth.component";
import { ProfileComponent } from "./profile/profile.component";

const authRoutes: Routes = [
	{
		path: '',
		component: AuthComponent,
		pathMatch: 'full',
		children: [
			{
				path: 'profile',
				component: ProfileComponent,
				canActivate: [MsalGuard]
			}
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(authRoutes)],
	exports: [RouterModule]
})
export class AuthRouterModule { }
