import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
	selector: 'app-contact-us',
	templateUrl: 'contact-us.html',
	styleUrls: ['contact-us.scss'],
})
export class ContactUsComponent implements OnInit {
	@Input() torgButton = 'false';

	constructor() {}

	public async ngOnInit(): Promise<void> {}

}
