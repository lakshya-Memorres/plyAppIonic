import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: '[appAutowidth]',
})
export class AutowidthDirective {
	constructor(private el: ElementRef) {}

	@HostListener('keyup') onKeyUp() {
		this.resize();
	}

	@HostListener('focus') onFocus() {
		this.resize();
	}

	private resize() {
		let length = this.el.nativeElement.value.length;

		this.el.nativeElement.setAttribute(
			'size',
			this.el.nativeElement.value.length
		);
		this.el.nativeElement.setAttribute(
			'style',
			'width:' + (length + 2) * 10 + 'px'
		);
	}
}
