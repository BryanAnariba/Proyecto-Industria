import { Component, OnInit } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit {
  userId: string = null;
  userData: any = [];

  constructor(private usersService: UsersServiceService , private imgSanitizer: DomSanitizer) {
    this.userId = localStorage.getItem('Id');
    this.getUserData();
  }

  ngOnInit(): void {
  }

  getUserData () {
    // console.log(this.userId);
    this.usersService.getUserData(this.userId)
    .subscribe(
      (userData: any) => {
        console.log(userData);
        if (userData) {
          this.userData = userData;
        }
      } ,
      (error) => {
        console.log(error);
      }
    );
  }


  imageSanitizer (photoUser) {
    return this.imgSanitizer.bypassSecurityTrustUrl(photoUser);
  }

}
