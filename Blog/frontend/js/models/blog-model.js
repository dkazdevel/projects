class BlogModel {

  async sendSignUpData(data) {
    let response = await fetch("https://blog-dkaz-api.herokuapp.com/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });

    return response.ok ? response.json() : response.ok;
  }

  async sendLogInData(data) {
    let response = await fetch("https://blog-dkaz-api.herokuapp.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });

    return response.ok ? response.json() : response.ok;
  }

  async sendPostData(blogData, token) {
    let formData = new FormData();

    for (let key in blogData) {
      formData.append(key, blogData[key]);
    }

    let response = await fetch("https://blog-dkaz-api.herokuapp.com/blog/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return response;
  }

  async editPostData(data, token) {
    let formData = new FormData();

    for (let key in data) {
      formData.append(key, data[key]);
    }

    let response = await fetch("https://blog-dkaz-api.herokuapp.com/blog/", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return response;
  }

  async removePostData(slug, token) {
    let response = await fetch(`https://blog-dkaz-api.herokuapp.com/blog/${slug}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }

  async getAllPosts() {
    let response = await fetch("https://blog-dkaz-api.herokuapp.com/blog");
    let data = await response.json();

    return data;
  }

  async getAllMyPosts(token) {
    let response = await fetch("https://blog-dkaz-api.herokuapp.com/blog/my-posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await response.json();

    return data;
  }

  async getPostBySLug(slug, token) {
    let response = await fetch(`https://blog-dkaz-api.herokuapp.com/blog/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await response.json();

    return data;
  }
}

export default BlogModel;
