import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

/** Root component of the Pluto app, hosting the router. */
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	imports: [RouterOutlet],
})
export class AppComponent {}
