import Component from "../component";
import moment from "moment";

import BlogModel from "../../models/blog-model";

class Blog extends Component {
  constructor() {
    super();

    this.model = new BlogModel();
  }

  async getData() {
    return new Promise((resolve) =>
      this.model.getAllPosts().then((data) => resolve(data))
    );
  }

  render(data) {
    return new Promise((resolve) => {
      resolve(this.getPostsHTML(data.posts));
    });
  }

  afterRender() {
    super.afterRender();
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
            post.media.endsWith('.webp')
              ? `<img className="article-img" src="${post.media}">`
              : `<video controls="controls" className="article-img"><source src=${post.media}></video>`
          }
           <hr>
        </article>
      </div>
    </div>
      `);
    });

    return html.join('\n');
  }
}

export default Blog;
