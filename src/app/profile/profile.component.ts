import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionsService } from "../functions.service";
import { HttpClient, HttpRequest,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'



interface Post {
  username:string
  _id: string
  title: string
  body: string
  counter: number
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  posts = []
  counter = 0

  constructor(public router: Router, private functions: FunctionsService,private http: HttpClient) { }


  upvote(id){
    this.posts[id].counter+=1
  }

  downvote(id){
    this.posts[id].counter-=1
  }

  delete(id){
    console.log(this.posts[id].id)

    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.functions.gettoken());

    const httpOptions = {
      headers: headers_object
    };

    const request = this.http.delete('http://localhost:3000/api/deletepost/'+this.posts[id].id,httpOptions).subscribe((responseData)=>{
      console.log(responseData)
    })
  }

  logout(){
    console.log('logging out')
    this.functions.storeloggedin('false')
    this.functions.storetoken('')
    this.router.navigate(['mainpage']);
  }

  ngOnInit() {
    let userpost = {username: this.functions.getusername()}
    const request = this.http.post<{message:string; posts: Post[]}>('http://localhost:3000/api/getusersposts',userpost).pipe(map(postData => {
      return postData.posts.map(post => {
        return {
          username:post.username,
          id:post._id,
          title:post.title,
          body: post.body
        }
      })
    })).subscribe((responseData) => {
      console.log(responseData)
      for (let i=0; i<responseData.length; i++){
        this.posts.push(responseData[i])
        this.posts[i].counter = 0
        this.posts[i].postid = i
      }
      console.log(this.posts)
    })
  }

}
