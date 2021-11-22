const searchbtn = document.getElementById("search-btn");
const mealList = document.getElementById('meal');
const mealDetailscontent = document.querySelector('.meal-details-content');
const recipeClosebtn = document.getElementById('recipe-close-btn');
//event
searchbtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);



// get
function getMealList(){
    let searchinputTxt = document.getElementById
    ('search-input').value.trim()


    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchinputTxt}`)
    .then(meal => meal.json())
    .then(data => {
    let html = '';
    if(data.meals){
        data.meals.forEach(meal => {
            html += `
            <div class="meal-item" data-id="${meal.idMeal}">
                <div class="meal-img">
                    <img width="100%" height="100%" src="${meal.strMealThumb}" alt="meal">
                </div>
                <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href="#" class="recipe-btn">get recipe</a>
                </div>
        </div>
        `;
        });
        mealList.classList.remove('notFound');
    } else{
        html = "uzur bu narsa topilmadi!!!";
        mealList.classList.add("notFound")
    }
    mealList.innerHTML= html
    });
}

///get recipe
function getMealRecipe(e) {
    e.preventDefault();
    if(e.target.classList.contains("recipe-btn")){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(res => res.json())
        .then(data => mealRecipeModal(data.meals));
    }
    
}


