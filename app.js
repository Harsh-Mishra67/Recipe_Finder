const appId = "135b93b9";
const appKey = "595a0341f6465e29b0ad6fa43e74cc27";
const baseUrl = 'https://api.edamam.com/api/recipes/v2?type=public';// important
const recipeContainer= document.querySelector("#Recipe-Conatiner");
const txtSearch=document.querySelector("#txtSearch");
const btnFind=document.querySelector(".btn");

btnFind.addEventListener("click",()=>loadRecipes(txtSearch.value));
txtSearch.addEventListener("keyup", (e)=>{
  const inputVal=txtSearch.value;
  if (e.keyCode === 13){
    loadRecipes(inputVal);
  }
});
const setScrollPosition = () => {
  recipeContainer.scrollTo({ top: 0, behavior: "smooth" });
};
function loadRecipes(type="paneer") {
  const url = `${baseUrl}&q=${type}&app_id=${appId}&app_key=${appKey}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => renderRecipes(data.hits))
    .catch((error) => console.log(error))
    .finally(() => setScrollPosition());
}
loadRecipes();
function getRecipeStepStr(ingredientLines=[]){
  let str="";
  for(var step of ingredientLines){
    str=str+`<li>${step}</li>`;
  }
  return str;
};
function renderRecipes(recipeList = []){
  recipeContainer.innerHTML="";
  recipeList.forEach((recipeObj) => {
    const { 
      label: recipeTitle, 
      ingredientLines, 
      image: recipeImage } = recipeObj.recipe;
      const recipeStepStr=getRecipeStepStr(ingredientLines)
    const htmlStr = `<div class="Recipe">
      <div class="Recipe-Title">${recipeTitle}</div>
      <div class="Recipe-Image">
        <img src="${recipeImage}" />   
      </div>
      <div class="Recipe-Text">
        <ul>
          ${recipeStepStr}
        </ul>
      </div>
    </div>`;
    recipeContainer.insertAdjacentHTML("beforeend",htmlStr);// watch video
  });
}




