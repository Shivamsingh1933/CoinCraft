const BASE_URL= "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg= document.querySelector(".msg");



for(let select of dropdowns){
    for(currcode in countrylist){
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.name === "from" && currcode === "USD"){
            newOption.selected="selected";
        } else if(select.name === "to" && currcode === "INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    });

}

const updatexchangerate = async() => {
    let amount= document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval ==="" || amtval<1){
        amtval=1;
        amount.value="1";
    }

    const URL= `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data= await response.json();
    let rate= data[ tocurr.value.toLowerCase()];
    let finalamount = amtval*rate;
    msg.innerText=`${amtval} ${fromcurr.value} =${finalamount} ${tocurr.value}`;
};

const updateflag =(element) =>{
    let  currcode = element.value;
    let countrycode = countrylist[currcode];
    let newSrc =`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc
    
}

btn.addEventListener("click", (evt) =>{
    evt.preventDefault();
    updatexchangerate();
});



window.addEventListener("load", () =>{
    updatexchangerate();
})
