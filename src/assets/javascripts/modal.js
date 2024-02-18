let body = document.querySelector("body")
let calc;
let modal;
let btnCancel;
let btnConfirm;

const createCalc = ()=>{
    calc = document.createElement("div");
    calc.classList.add("calc")
    body.append(calc);

    calc.addEventListener("click", (event)=>{
        event.stopPropagation();
        calc.remove();
        
    })
}

const createModal = (question)=>{
    modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `<p>${question}</p>`

    btnCancel = document.createElement("button");
    btnCancel.innerText = "Annuler"
    btnCancel.classList.add("btn", "btn-secondary")
    btnConfirm = document.createElement("button")
    btnConfirm.innerText = "Confirmer"
    btnConfirm.classList.add("btn", "btn-primary")
    calc.append(modal)
    modal.append(btnCancel,btnConfirm);

     modal.addEventListener("click", (event) => {
       event.stopPropagation();
     });

     
}

export function openModal(question){
    // console.log("Ma boite Modal")
    createCalc();
    createModal(question)

    return new Promise((resolve, reject) =>{
        btnCancel.addEventListener("click", () => {
          resolve(false);  
          calc.remove();
        });

        btnConfirm.addEventListener("click", () => {
          resolve(true)
          calc.remove();
        });
    })
}