import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { FunctionsService } from "../functions.service";


interface Post {
  username: string
  _id: string
  title: string
  body: string
  counter: number
  vote: number
  voters: Array<String>
}

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  posts = []
  counter = 0
  constructor(private http: HttpClient, private functions: FunctionsService) { }

  updatevote(id, isUpvote) {
    if (isUpvote) {
      let vote = parseInt(this.posts[id].vote)
      vote += 1
      this.posts[id].vote = vote
      console.log(this.posts[id].vote)
      // if its an upvote, we add the 'up' tag to the voting list so we can still rescend that upvote with a downvote later.
      let votestring = "up:" + this.functions.getusername()
      this.posts[id].voters.push(votestring)
    }
    else {
      let vote = parseInt(this.posts[id].vote)
      vote -= 1
      this.posts[id].vote = vote
      // if its an upvote, we add the 'down' tag to the voting list so we can still rescend that downvote with a upvote later.
      console.log(this.posts[id].vote)
      let votestring = "down:" + this.functions.getusername()
      this.posts[id].voters.push(votestring)


    }
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.functions.gettoken());

    const httpOptions = {
      headers: headers_object
    };

    let post = {
      id: this.posts[id].id,
      vote: this.posts[id].vote,
      voters: this.posts[id].voters
    }
    const request = this.http.post('http://localhost:3000/api/updatevote/', post,httpOptions).subscribe((responseData) => {
      console.log(responseData)
    })
  }

  rescendvote(id, isUpvote) {
    // loop through each element in the voterlist, and look for the current user in the list, when found, remove them from the list and adjust the vote accordingly
    for (let i = 0; i < this.posts[id].voters.length; i++) {
      this.posts[id].voters.forEach((item, index) => {
        let splitvoter = item.split(":")[1]
        console.log(splitvoter)
        if (splitvoter === this.functions.getusername()) {
          console.log(splitvoter)
          this.posts[id].voters.splice(index, 1);
          //if we rescend an upvote, we must decrement the vote
          if (isUpvote) {
            let vote = parseInt(this.posts[id].vote)
            vote -= 1
            this.posts[id].vote = vote
          }
          //otherwise, it is rescending a downvote, so we must increment the vote
          else {
            let vote = parseInt(this.posts[id].vote)
            vote += 1
            this.posts[id].vote = vote
          }
          let post = {
            id: this.posts[id].id,
            vote: this.posts[id].vote,
            voters: this.posts[id].voters
          }

          var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.functions.gettoken());

          const httpOptions = {
            headers: headers_object
          };

          const request = this.http.post('http://localhost:3000/api/updatevote/', post, httpOptions).subscribe((responseData) => {
            console.log(responseData)
          })
        }
      });

    }
  }

  upvote(id) {
    if (this.functions.getusername() != '') {

      // first check if the current user exists in the voter list. if that user does not, upvote properly, otherwise, rescend their vote and make the proper vote
      console.log(this.posts[id].voters)
      if (this.posts[id].voters.length != 0) {
        for (let i = 0; i < this.posts[id].voters.length; i++) {
          //when users vote, their vote is tagged in the database as 'votetype:username' ex. 'up:tangodelta'. we will split this vote to obtain the tag and voter separately
          let splitvoter = this.posts[id].voters[i].split(":")[1]
          let tag = this.posts[id].voters[i].split(":")[0]
          if (splitvoter == this.functions.getusername()) {
            // if tag is 'up' then we will rescend the upvote. this means we already upvoted the post and want to be neutral 
            if (tag == "up") {
              this.rescendvote(id, true)
              return
            }
            //if tag is down then we need to rescend the downvote and replace it with an upvote
            else {
              this.rescendvote(id, false)
              //continue to below code to increment
            }
          }

        }
        // increment vote and add them to the list of voters
        this.updatevote(id, true)
      }
      // if there are no voters yet, increment vote and add to list
      else {
        this.updatevote(id, true)
      }
    }

  }



  downvote(id) {
    if (this.functions.getusername() != '') {
      // first check if the current user exists in the voter list. if that user does not, downvote properly, otherwise, rescend their vote and make the proper vote
      console.log(this.posts[id].voters)
      if (this.posts[id].voters.length != 0) {
        for (let i = 0; i < this.posts[id].voters.length; i++) {
          let splitvoter = this.posts[id].voters[i].split(":")[1]
          let tag = this.posts[id].voters[i].split(":")[0]
          if (splitvoter == this.functions.getusername()) {
            // if tag is 'up' then we will rescend the downvote. this means we already downvoted the post and want to be neutral 
            if (tag == "down") {
              this.rescendvote(id, false)
              return
            }
            //if tag is 'up' then we need to rescend the upvote and replace it with an downvote
            else {
              this.rescendvote(id, true)
              //continue to below code to decrement
            }
          }

        }
        // increment vote and add them to the list of voters
        this.updatevote(id, false)
      }
      // if there are no voters yet, increment vote and add to list
      else {
        this.updatevote(id, false)
      }
    }
  }

  ngOnInit() {
    const request = this.http.get<{ message: string; posts: Post[] }>('http://localhost:3000/api/getposts').pipe(map(postData => {
      return postData.posts.map(post => {
        return {
          username: post.username,
          id: post._id,
          title: post.title,
          body: post.body,
          vote: post.vote,
          voters: post.voters
        }
      })
    })).subscribe((responseData) => {
      console.log(responseData)
      for (let i = 0; i < responseData.length; i++) {
        this.posts.push(responseData[i])
        this.posts[i].postid = i
      }
      console.log(this.posts)
    })

  }

}
