import BlogModel from "../../models/blog-model";
import { parseRequestURL } from "../../helpers/utils";
import Component from "../../views/component";
import { maxFileSize } from "../../constants/constants";
import { getUserToken } from "../../helpers/utils";

class Post extends Component {
  constructor() {
    super();

    this.model = new BlogModel();
  }

  async getData() {
    const token = getUserToken();

    if (parseRequestURL().slug) {
      return new Promise((resolve) =>
        this.model
          .getPostBySLug(parseRequestURL().slug, token)
          .then((data) => resolve(data))
      );
    }
  }

  render(data) {
    return new Promise((resolve) => {
      resolve(`
    <div class="row g-5 maxHeight">
        <div class="col-md-5 col-lg-4 order-md-last">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-primary">What's going on?</span>
        </h4>
        ${
          parseRequestURL().slug
            ? "<p>Here you can edit your post. The file can be also edited. After that, everyone will see your edited post :)</p>"
            : "<p>Here you can create a post, Add a title, a message text and a file. The file can be either a picture or a video. After that, everyone will see your post :)</p>"
        }
      </div>
        <div class="col-md-7 col-lg-8">
         ${
           parseRequestURL().slug
             ? ' <h4 class="mb-3">Edit your post</h4>'
             : '<h4 className="mb-3">Create your post</h4>'
         }
        <form class="needs-validation postForm" novalidate>
          <div class="row g-3">
            <div class="col-sm-6">
              <label for="title" class="form-label">Title</label>
              <input type="text" class="form-control" id="title" placeholder="title"  value='${
                parseRequestURL().slug ? data.title : ""
              }' required>
              <div class="invalid-feedback titleMessage">
                  The valid title is required. Max characters - 100.
                </div>
            </div>
            <div class="col-12">
              <label for="text" class="form-label">Text</label>
              <div class="input-group has-validation">
                <input type="text" class="form-control" id="text" placeholder="text" value='${
                  parseRequestURL().slug ? data.text : ""
                }' required>
              <div class="invalid-feedback textMessage">
                  The valid text is required. Max characters - 1000.
                </div>
              </div>
            </div>
            <div class="col-12">
              
              ${
                parseRequestURL().slug
                  ? `<h2>Your file:</h2>
                ${
                  data.media.endsWith(".webp")
                    ? `<img style="width: 60%; margin: 30px 0" className="article-img" src="${data.media}">`
                    : `<video style="width: 60%; margin: 30px 0" controls="controls" className="article-img"><source src=${data.media}></video>`
                }
                <h3 style="margin-bottom:30px">To edit your exist file:</h3>`
                  : '<label for="file" class="form-label">File</label>'
              }
              <input type="file" class="form-control" id="file" accept="image/*,video/*">
              <div class="invalid-feedback fileMessage">
                  The valid file is required.
                </div>
            </div>
          <hr class="my-4">
          <h2 class="d-flex justify-content-between align-items-center mb-3 requestErrorMessage"></h2>
          <button disabled class="w-100 btn btn-primary btn-lg submitButton" ${
            parseRequestURL().slug ? `data-slug='${data.slug}'` : ""
          } data-action=${
        parseRequestURL().slug ? "edit" : "create"
      } type="submit">${parseRequestURL().slug ? "Edit" : "Create"}</button>
        </form>
      </div>
  </div>
                    `);
    });
  }

  afterRender() {
    super.afterRender();
    this.setActions();
  }

  setActions() {
    const postForm = document.getElementsByClassName("postForm")[0];

    postForm.addEventListener("change", (event) => {
      const target = event.target,
        requestMessage = document.getElementsByClassName(
          "requestErrorMessage"
        )[0],
        messageField = document.getElementsByClassName(
          `${target.id}Message`
        )[0];

      requestMessage.innerHTML = "";
      this.validateFormData(target, messageField);
      this.isSubmitButtonActive(postForm);
    });

    postForm.addEventListener("submit", (event) => {
      const submitButton = document.getElementsByClassName("submitButton")[0];
      event.preventDefault();

      this.setNewPostData(postForm, submitButton);
    });
  }

  validateFormData(target, messageField) {
    switch (true) {
      case target.id === "title":
        if (target.value.length <= 2 || target.value.length > 100) {
          target.value = "";
          messageField.classList.add("displayBlock");
        } else {
          messageField.classList.remove("displayBlock");
        }

        break;

      case target.id === "text":
        if (target.value.length <= 2 || target.value.length > 1000) {
          target.value = "";
          messageField.classList.add("displayBlock");
        } else {
          messageField.classList.remove("displayBlock");
        }

        break;

      case target.id === "file":
        if (
          (!parseRequestURL().slug && !target.files.length) ||
          target.files[0].size > maxFileSize
        ) {
          target.value = "";
          messageField.classList.add("displayBlock");
        } else {
          messageField.classList.remove("displayBlock");
        }

        break;
    }
  }
  isSubmitButtonActive(form) {
    const inputsArr = form.getElementsByTagName("INPUT"),
      submitButton = document.getElementsByClassName("submitButton")[0];

    let counter = 0;

    for (let input of inputsArr) {
      if (
        (input.type === "text" && input.value) ||
        (input.type === "file" && input.files.length) ||
        parseRequestURL().slug
      ) {
        counter++;
      }
    }

    counter === inputsArr.length
      ? (submitButton.disabled = false)
      : (submitButton.disabled = true);
  }

  setNewPostData(form, submitButton) {
    const inputs = form.getElementsByTagName("INPUT"),
      requestMessage = document.getElementsByClassName(
        "requestErrorMessage"
      )[0],
      objToSend = {};

    if (!getUserToken()) {
      requestMessage.innerHTML = "You have to be authorized";
      location.hash = "#/log-in";
    } else {
      this.sendNewPostData(
        inputs,
        requestMessage,
        objToSend,
        getUserToken(),
        submitButton
      );
    }
  }

  sendNewPostData(inputs, requestMessage, objToSend, token, submitButton) {
    for (let input of inputs) {
      objToSend[input.id] =
        input.type === "text" ? input.value : input.files[0];
    }

    if (submitButton.dataset.action === "create") {
      this.model.sendPostData(objToSend, token).then((response) => {
        if (response.ok) {
          requestMessage.innerHTML = "Your post has been successfully saved";
          for (let input of inputs) {
            input.value = "";
          }
        } else {
          requestMessage.innerHTML = response.message;
        }
      });
    } else if (submitButton.dataset.action === "edit") {
      !objToSend.file && delete objToSend.file;
      objToSend.slug = submitButton.dataset.slug;

      this.model.editPostData(objToSend, token).then((response) => {
        if (response.ok) {
          requestMessage.innerHTML = "Your post has been successfully edited";
          location.reload();
        } else {
          requestMessage.innerHTML = response.message;
        }
      });
    }
  }
}

export default Post;
