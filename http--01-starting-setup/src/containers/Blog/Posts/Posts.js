import React, { Component } from 'react';
import axios from "axios";
import Post from '../../../components/Post/Post'
import './Posts.css'
import {Route,Link,Switch} from 'react-router-dom'
import FullPost from '../FullPost/FullPost'

export default class Posts extends Component {
   
    state={
        posts:[],
       
    }

    componentDidMount() {
        console.log(this.props)
        axios
          .get("https://jsonplaceholder.typicode.com/posts")
          .then(response => {
            const posts = response.data.slice(0, 4);
            const updatedPosts = posts.map(post => {
              return {
                ...post,
                author: "max"
              };
            });
    
            this.setState({ posts: updatedPosts });
          })
          .catch(error => {
            this.setState({ error: true, errorBody: error.message });
            console.log(error);
          });
      }

    postSelectedHandler = id => {
        //this.setState({ selectedPostId: id });
        this.props.history.push('/posts/'+id);
       
      };
   
    render() {
       
        const posts = this.state.posts.map(post => {
            return (
            // <Link to={'/posts/'+post.id} key={post.key}>
              <Post  key={post.key}             
                Title={post.title}
                Author={post.author}
                clicked={() => this.postSelectedHandler(post.id)}
              />
             // </Link>
            );
          });
       
        return (
            <div>
                <section className="Posts">
                {posts}
                </section> 
                <Route path={this.props.match.url+'/:id'} exact  component ={FullPost}/>                 
            </div>
        )
    }
}
