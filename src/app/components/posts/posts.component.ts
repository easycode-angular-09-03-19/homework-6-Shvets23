import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {PostsService} from "../../services/posts.service";
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  currentUserId: string;
  posts;
  user;
  name;
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe((param: ParamMap) => {
      this.currentUserId = param.get('userId');
      this.postsService.getPostsByUserId(this.currentUserId).subscribe((data) => {
        this.posts = data;
        console.log(this.posts);

        this.userService.getuserById(this.currentUserId).subscribe(data => {
          this.user = data;
          this.name = this.user.name
          console.log(this.user, 'user')
        }, (err) => {
          console.log(err);
        });
      });
    })
  }
}
