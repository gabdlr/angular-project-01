import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    templateUrl: 'header.component.html',
    selector: 'app-header',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    constructor(private dataStorageServ: DataStorageService, private authService: AuthService){

    }

    toggleList = false;
    smallScreenMenu = false;
    isAuthenticated = false;
    private userSub: Subscription;

    ngOnInit(){
        this.userSub = this.authService.user.subscribe(
            user => {
                this.isAuthenticated = !!user;
            }
        );
    }


    openToggleList() {
        this.toggleList = !this.toggleList;
    }
    displaySmallScreenMenu() {
        this.smallScreenMenu  = !this.smallScreenMenu;
    }

    onSaveData(){
        this.dataStorageServ.storeRecipes();
    }

    onFetchData(){
        this.dataStorageServ.fetchRecipes().subscribe();
    }
    onLogout() {
        this.authService.logout()
    }
    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}