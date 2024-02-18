// Files Imports
import "./assets/styles/styles.scss";
import "/index.scss"

// Functions Imports
import {openModal} from "./assets/javascripts/modal"


let articles;
let filter;
let sortedBy= "desc" ;
let select = document.querySelector("select");
console.log(sortedBy);

select.addEventListener("change", ()=>{
  sortedBy = select.value;
  fetchArticle()
  // console.log(sortedBy);
})

const fetchArticle = async () => {
  try {
    const response = await fetch(
      `https://restapi.fr/api/article?sort=createdAt:${sortedBy}`
    );
    articles = await response.json();
    // console.log(articles)
    createArticles();
    createMenuArticles();
  } catch (e) {
    console.error(e);
  }
};

fetchArticle();


const createArticles = ()=>{
const articleContainerElement = document.querySelector(".articles-container");

// let filteredArticles = articles;

// if (filter) {
//     filteredArticles = articles.filter((article) => {
//       return article.category === filter;
//     });
  
// }


const articlesDOM = articles.filter(article =>{
  if(filter){
      return article.category === filter;
  } else{
    return true;
  }
}).map((article) =>{
    const articleDOM = document.createElement("div");
    articleDOM.classList.add("article")
    articleDOM.innerHTML = `
            
            <img
              src="${article.img}"
              alt="profile"
            />
            <h2>${article.title}</h2>
            <p class="article-author">${article.author} - ${
      article.category
    } </p>
            <p class="article-author">${new Date(
              article.createdAt
            ).toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}</p>
            <p class="article-content">${article.content}</p>
            <div class="article-actions">
              <button class="btn btn-danger" data-id="${
                article._id
              }">Supprimer</button>
              <button class="btn btn-primary" data-id="${
                article._id
              }">Modifier</button>
            </div>
    `;
    
    return articleDOM;

})


articleContainerElement.innerHTML = "";
articleContainerElement.append(...articlesDOM);

const deleteBTN = articleContainerElement.querySelectorAll(".btn-danger");
const btnUpdate = document.querySelectorAll(".btn-primary");


// console.log(btnUpdate);

deleteBTN.forEach(button => {
    button.addEventListener("click", async (event)=>{
        let target = event.target;
        let articleId = target.dataset.id;

       const result = await openModal("Etes vous sure de vouloir supprimer cet article");
        if(result === true){
           try{
             const response = await fetch(
               `https://restapi.fr/api/article/${articleId}`,
               {
                 method: "DELETE"
               }
             );
             const body = await response.json();
             console.log(body)
             fetchArticle();
           }
           catch(error){
            console.error("error: ", error)
           }
        }
    })
});

btnUpdate.forEach(btn => {
  btn.addEventListener("click", (event)=>{
    const articleId = event.target.dataset.id;
    location.assign(`./form/form.html?id=${articleId}`)
  })
});

}

const displayMenuCategories = categoriesArr =>{
  const categorieContainer = document.querySelector(".categories");
  const liElements = categoriesArr.map(categorie => {
    const li = document.createElement("li");
    li.innerHTML = `<li>${categorie[0]} (<strong>${categorie[1]}</strong>)</li>`;
  
    li.addEventListener("click", ()=>{
      if(filter=== categorie[0]){
        filter = null;
        li.classList.remove("active")
        createArticles()
      }
      else{
        filter = categorie[0];
        createArticles();
        liElements.forEach((li) => {
          li.classList.remove("active");
        });
        li.classList.add("active");
      }
      
    })
    return li;
  }
  );
  //  console.log(liElements)

  categorieContainer.innerHTML = "";
  categorieContainer.append(...liElements); 

  
}

const createMenuArticles = () =>{
  // console.log(articles);

  const categories = articles.reduce((acc,article)=> {

    if(acc[article.category]){
      acc[article.category]++;
    }else{
      acc[article.category] = 1;
    }
    return acc;
  }, {})

  // console.log(categories);

  const categoriesArr = Object.entries(categories);
  categoriesArr.sort((a,b)=>{
    return a[0] - b[0]
  })
  
  displayMenuCategories(categoriesArr);
  // console.log(categoriesArr);
}
