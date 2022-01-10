import { Component, Output, EventEmitter } from '@angular/core';


@Component({
    templateUrl: 'header.component.html',
    selector: 'app-header',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    @Output() featureSelected = new EventEmitter<string>();

    onSelected(feature: string) {
        this.featureSelected.emit(feature);
    }
}