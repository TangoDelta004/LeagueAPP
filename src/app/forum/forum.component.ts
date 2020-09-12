import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { FunctionsService } from "../functions.service";


interface Post {
  username:string
  _id: string
  title: string
  body: string
  counter: number
  vote:number
}

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  posts = []
  counter = 0
  constructor(private http: HttpClient,private functions: FunctionsService) { }


  upvote(id){
    let vote = parseInt(this.posts[id].vote)
    vote+=1
    this.posts[id].vote = vote
    console.log(this.posts[id].vote)
    let post = {
      id: this.posts[id].id,
      vote: this.posts[id].vote
    }
    const request = this.http.post('http://localhost:3000/api/updatevote/',post).subscribe((responseData)=>{
      console.log(responseData)
    })
  }

  downvote(id){
    let vote = parseInt(this.posts[id].vote)
    vote-=1
    this.posts[id].vote = vote
    console.log(this.posts[id].vote)
    let post = {
      id: this.posts[id].id,
      vote: this.posts[id].vote
    }
    const request = this.http.post('http://localhost:3000/api/updatevote/',post).subscribe((responseData)=>{
      console.log(responseData)
  })
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

  ngOnInit() {
    const request = this.http.get<{message:string; posts: Post[]}>('http://localhost:3000/api/getposts').pipe(map(postData => {
      return postData.posts.map(post => {
        return {
          username:post.username,
          id:post._id,
          title:post.title,
          body: post.body,
          vote: post.vote
        }
      })
    })).subscribe((responseData) => {
      console.log(responseData)
      for (let i=0; i<responseData.length; i++){
        this.posts.push(responseData[i])
        this.posts[i].postid = i
      }
      console.log(this.posts)
    })

  }

}
