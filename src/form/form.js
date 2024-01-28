import "../assets/styles/styles.scss";
import "./form.scss";

const form = document.querySelector("form")
const errorElement = document.getElementById("errors");

let errors = [];

form.addEventListener("submit", async (event)=>{
    event.preventDefault();
    errors = [];
    const formData = new FormData(form);
    const article = Object.fromEntries(formData.entries());

    if(formIsvalid(article)){

        try{
            const json = JSON.stringify(article);
            const response = await fetch("https://restapi.fr/api/articles", {
              method: "POST",
              body: json,
              headers: {
                "Content-Type": "application/json",
              },
            });
            const body = await response.json();
            console.log(body); 
        }catch(error){
            console.error("error: ",error)
        }

      
    }

})

const formIsvalid = article =>{
    if(!article.author || !article.category || !article.content){
        errors.push("Veuillez remplir tous les champs svp")
    } else{
        errors = [];
    } 

    if(errors.length){
        let errorHtml= "";
        errors.forEach(error => {
            errorHtml += `<li>${error}</li>` 
        });

        errorElement.innerHTML = errorHtml;
        return false;
        
    } else{
        errorElement.innerHTML = "";
        return true;
    }
}