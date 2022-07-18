import Component from "../component";
import moment from "moment";

import BlogModel from "../../models/blog-model";
import { getUserToken } from "../../helpers/utils";

class MyPosts extends Component {
  constructor() {
    super();

    this.model = new BlogModel();
  }

  async getData() {
    const token = getUserToken();

    return new Promise((resolve) =>
      this.model.getAllMyPosts(token).then((data) => resolve(data))
    );
  }

  render(data) {
    return new Promise((resolve) => {
      resolve(this.getPostsHTML(data.posts));
    });
  }

  afterRender() {
    super.afterRender();

    this.setActions();
  }

  getPostsHTML(posts) {
    const html = [];
    posts.forEach((post) => {
      html.push(`
        <div class="row g-5 center">
        <div class="col-md-8"> 
         <article class="blog-post">
          <h2 class="blog-post-title mb-1">${post.title}</h2>
          <p class="blog-post-meta">${moment(post.createAt).format(
            "DD-MM-YYYY hh:mm"
          )} by ${post.author.username}</p>
          <p>${post.text}</p>
          ${
            post.media.endsWith(".webp")
              ? `<img className="article-img" src="${post.media}">`
              : `<video controls="controls" className="article-img"><source src=${post.media}></video>`
          }
          <div class="myPosts-action-buttons">
            <a href="#/edit/${
              post.slug
            }" class="w-100 btn btn-primary btn-lg editButton">Edit</a>
            <button data-slug="${
              post.slug
            }" class="w-100 btn btn-primary btn-lg deleteButton">Delete</button>
          </div>
          <hr>
        </article>
      </div>
    </div>
      `);
    });

    return html.join("\n");
  }

  setActions() {
    const deleteButtons = document.getElementsByClassName("deleteButton");

    for (let button of deleteButtons) {
      button.addEventListener("click", (event) => {
        const target = event.target;

        this.setRemoveAction(target);
      });
    }
  }

  setRemoveAction(target) {
    const token = getUserToken();

    this.model.removePostData(target.dataset.slug, token).then((response) => {
      if (response.ok) {
        alert("Your post has been successfully deleted");
        location.reload();
      } else {
        alert(response.message);
      }
    });
  }
}

export default MyPosts;
