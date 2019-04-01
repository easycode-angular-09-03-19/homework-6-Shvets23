import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { User } from '../../interfaces/User'
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  public edit = false;
  user: User;
  editUser = {
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    id: ''
  }
  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private _flashMessagesService: FlashMessagesService,
    private router: Router
  ) { }
  editStart() {
    this.edit = !this.edit
  }
  editSubmit() {
    console.log(this.editUser);
    this.userService.editUser(this.editUser).subscribe((data) => {
    this._flashMessagesService.show('User info was change', { cssClass: 'alert-success my-flash', timeout: 2000 });
    this.edit = !this.edit;
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    })
  }
  backToHome() {
    this.router.navigate(['/']);
  }
  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.userService.getuserById(id).subscribe((data: User) => {
      this.user = data;
      this.editUser.name = this.user.name;
      this.editUser.username = this.user.username;
      this.editUser.email = this.user.email;      
      this.editUser.phone = this.user.phone;      
      this.editUser.id = this.user.id;      

    }, (err) => {
      console.log(err);
    });
    

  }

}
