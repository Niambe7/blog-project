import "./assets/styles/styles.scss";
import "/index.scss"

const createArticles = (articles)=>{
const articleContainerElement = document.querySelector(".articles-container");

const articlesDOM = articles.map((article) =>{
    const articleDOM = document.createElement("div");
    articleDOM.classList.add("article")
    articleDOM.innerHTML = `
            
            <img
              src="${article.img}"
              alt="profile"
            />
            <h2>${article.title}</h2>
            <p class="article-author">${article.author} - ${article.category}</p>
            <p class="article-content">${article.content}</p>
            <div class="article-actions">
              <button class="btn btn-danger" data-id="${article._id}">Supprimer</button>
            </div>
    `;
    
    return articleDOM;

})
articleContainerElement.innerHTML = "";
articleContainerElement.append(...articlesDOM);
const deleteBTN = articleContainerElement.querySelectorAll(".btn-danger");

console.log(deleteBTN);

deleteBTN.forEach(button => {
    button.addEventListener("click", async (event)=>{
        let target = event.target;
        let articleId = target.dataset.id;
        console.log(articleId)

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
    })
});

}


const  fetchArticle = async()=>{
    try{
        const response = await fetch("https://restapi.fr/api/article");
        const articles = await response.json();
        console.log(articles)
        createArticles(articles)
    }catch(e){
        console.error(e)
    }

}

fetchArticle();