import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators'


interface Post {
  id: string
  title: string
  body: string
  counter: number
}

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  posts = []
  counter = 0
  constructor(private http: HttpClient) { }


  upvote(id){
    this.posts[id].counter+=1
  }

  downvote(id){
    this.posts[id].counter-=1
  }

  ngOnInit() {
    const request = this.http.get<{message:string; posts: Post[]}>('http://localhost:3000/api/getposts').pipe(map(postData => {
      return postData.posts.map(post => {
        return {
          title:post.title,
          body: post.body
        }
      })
    })).subscribe((responseData) => {
      console.log(responseData)
      for (let i=0; i<responseData.length; i++){
        this.posts.push(responseData[i])
        this.posts[i].id = i
        this.posts[i].counter = 0
        console.log(this.posts[i].id)
      }
      console.log(this.posts)
    })

  }

}
