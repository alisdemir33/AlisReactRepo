import React, { Component } from "react";
import Posts from "./Posts/Posts";
import { Route, Link, Switch,Redirect } from "react-router-dom";
import "./Blog.css";
import NewPost from "./NewPost/NewPost";
import FullPost from "./FullPost/FullPost";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: null,
    errorBody: null,
    isAuth:false
  };

  render() {
    /*  let postsBody = null;

    if (this.state.error) {
      postsBody = (
        <div style={{ textAlign: "center" }}>
          Error Occurred!..{this.state.errorBody}
        </div>
      );
    } else {
      postsBody = <section className="Posts">{posts}</section>;
    } */

    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/posts">Posts</Link>
              </li>
              <li>
                <Link to="/new-post">New Post</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          
         {this.state.isAuth ?  <Route path="/new-post" component={NewPost} /> : null}
          <Route path="/posts" component={Posts} />
          <Route render={ ()=>  <h1>Not Found!</h1>}/>
        {/*   <Redirect from='/' to = '/posts'/>> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
