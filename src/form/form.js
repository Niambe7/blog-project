import "../assets/styles/styles.scss";
import "./form.scss";

import { openModal } from "../assets/javascripts/modal";

const form = document.querySelector("form");
const cancel = document.querySelector(".btn-secondary");
const errorElement = document.querySelector("#errors");
let errors = [];
let articleId;

const fillForm = (article)=>{
  const author = document.querySelector('input[name="author"]');
  const img = document.querySelector('input[name="img"]');
  const category = document.querySelector('input[name="category"]');
  const title = document.querySelector('input[name="title"]');
  const content = document.querySelector("textarea");

  author.value = article.author || "";
  img.value = article.img || "";
  category.value = article.category || "";
  title.value = article.title || "";
  content.value = article.content || "";

}

const initFormId = async()=>{
  const url = new URL(location.href);
  // console.log(url)
  articleId = url.searchParams.get("id")
try{
  const response = await fetch(`https://restapi.fr/api/article/${articleId}`);
  const article = await response.json();
  console.log(article)
  fillForm(article);
}catch(e){
  console.error("err :", e)
}
  
}

initFormId();

cancel.addEventListener("click", async ()=>{
  const result = await openModal("Si vous quittez La page vous allez perdre vos données déja insérées");
  if(result === true){
    location.assign("../index.html");
  }
})

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const article = Object.fromEntries(formData.entries());
  if (formIsValid(article)) {
    try {
      const json = JSON.stringify(article);
      let response;
      if(articleId){
         response = await fetch(`https://restapi.fr/api/article/${articleId}`, {
           method: "PUT",
           body: json,
           headers: {
             "Content-Type": "application/json",
           },
         });
      } else{
          response = await fetch("https://restapi.fr/api/article", {
            method: "POST",
            body: json,
            headers: {
              "Content-Type": "application/json",
            },
          });
      }
       

      if(response.status< 299){
        location.assign("../index.html");
      }
      const body = await response.json();
      console.log(body);
    } catch (e) {
      console.error("e : ", e);
    }
  }
});

const formIsValid = (article) => {
  if (
    !article.author ||
    !article.category ||
    !article.content ||
    !article.img ||
    !article.title
  ) {
    errors.push("Vous devez renseigner tous les champs");
  } else {
    errors = [];
  }
  if (errors.length) {
    let errorHTML = "";
    errors.forEach((e) => {
      errorHTML += `<li>${e}</li>`;
    });
    errorElement.innerHTML = errorHTML;
    return false;
  } else {
    errorElement.innerHTML = "";
    return true;
  }
};
