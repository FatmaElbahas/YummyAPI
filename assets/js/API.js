function showLoader() {
  $(".loading").fadeIn(500);
  $("body").addClass("no-scroll"); // يمنع التمرير
}

function hideLoader() {
  $(".loading").fadeOut(300);
  $("body").removeClass("no-scroll"); // يرجّع التمرير
}
async function getMeals() {
try{
    showLoader();
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  const data = await response.json();
   displayMeals(data.meals);
}
catch(error){
console.log(error)
}
finally
{
  hideLoader();

}
}

function displayMeals(meals) {
  const container = $(".jscontainer");
  container.empty();
  const html = meals
    .map(
      (meal) => `
  <a href="#" class="meal-link" data-idMeal="${meal.idMeal}">
    <div class="inner">
      <div class="card meal-card">
        <div class="image position-relative">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-100 d-block">
          <div class="overlay text-center d-flex flex-column justify-content-center">
            <h2>${meal.strMeal}</h2>
          </div>
        </div>
      </div>
    </div>
  </a>
`
    )
    .join(""); // استخدام join لتحويل الـ array إلى string
  container.html(html);
}
getMeals();
$(document).on("click", ".meal-link", async function (e) {
  e.preventDefault();
  const mealId = $(this).data("idmeal");
try{
    showLoader();
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  const data = await response.json();
  if (data.meals && data.meals.length > 0) {
    const meal = data.meals[0];
    console.log(meal);
    displayMealDetails(meal);
}
}
catch(error){
console.log(error)
} finally{
    hideLoader();

}
    hideLoader();
  }
);

function displayMealDetails(meal) {
  const container = $(".jscontainer");
  const container1 = $(".meal-details");
  container.empty();
  container1.empty();
  // استخراج المكونات (strIngredient1 إلى strIngredient20)
  let ingredients = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients += `<span class="badge bg-info text-dark m-1">${measure} ${ingredient}</span>`;
    }
  }

  // كود HTML لتفاصيل الوجبة
  const html = `
    <div class="row text-white">
      <div class="col-12 col-lg-4 details">
        <img src="${meal.strMealThumb}" alt="${
    meal.strMeal
  }" class="w-100 rounded-3">
        <h2 class="mt-3">${meal.strMeal}</h2>
      </div>
      <div class="col-12 col-lg-8">
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
        <h5><strong>Area :</strong> ${meal.strArea}</h5>
        <h5><strong>Category :</strong> ${meal.strCategory}</h5>
        <h5><strong>Recipes :</strong></h5>
        <div class="d-flex flex-wrap">
          ${ingredients}
        </div>
        <h5 class="mt-3"><strong>Tags :</strong> ${
          meal.strTags ? meal.strTags : "None"
        }</h5>
        <div class="mt-3">
          ${
            meal.strSource
              ? `<a href="${meal.strSource}" target="_blank" class="btn btn-success me-2">Source</a>`
              : ""
          }
          ${
            meal.strYoutube
              ? `<a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>`
              : ""
          }
        </div>
      </div>
    </div>
  `;

  $(".meal-details").html(html);
}

$("#showCategories").on("click", async function (e) {
  e.preventDefault();
 try{
   showLoader();
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const data = await response.json();
  console.log(data);
  displayCategories(data.categories);
 }
 catch(error){
  console.log(error)
 }
 finally{
    hideLoader();
 }
});
function displayCategories(categories) {
  const container = $(".jscontainer");
const container1 = $(".meal-details");

  container.empty();
  container1.empty();

  const html = categories
    .map(
      (category) => `
    <div class="inner">
      <a href="#" class="text-decoration-none category-item" data-category="${
        category.strCategory
      }">
        <div class="card bg-black">
          <div class="image position-relative">
            <img src="${category.strCategoryThumb}" alt="${
        category.strCategory
      }" class="w-100 d-block">
            <div class="overlay text-center overflow-hidden p-2 text-white">
              <h2>${category.strCategory}</h2>
              <p>${category.strCategoryDescription
                .split(" ")
                .slice(0, 20)
                .join(" ")}...</p>
            </div>
          </div>
        </div>
      </a>
    </div>
  `
    )
    .join("");

  container.html(html);
}
$(document).on("click", ".category-item", async function (e) {
  e.preventDefault(); // علشان الـ <a> ميعملش reload للصفحة

  const categoryName = $(this).data("category");
try{
    showLoader();
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );
  const data = await response.json();

  if (data.meals) {
    displayMeals(data.meals); // دي فانكشن الكروت بتاعة الوجبات
  }
}
catch(error){
console.log(error)
}
finally{
    hideLoader();
}});

$("#showArea").on("click", async function (e) {
  e.preventDefault();
try{
    showLoader();
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  const data = await response.json();
  console.log(data);
  displayAreas(data.meals);
}
catch(error){
console.log(error);

}finally{
  hideLoader();
}
});

function displayAreas(areas) {
  const container = $(".jscontainer");
  const container1 = $(".meal-details");
  container.empty();
  container1.empty();

  const html = areas
    .map(
      (area) => `
    <div class="inner col-md-3">
      <a href="#" class="area-item text-decoration-none">
        <div class="card bg-black text-white text-center p-4" data-area="${area.strArea}">
          <div class="image position-relative">
            <i class="fa-solid fa-house-laptop fa-3x mb-3"></i>
            <h2>${area.strArea}</h2>
          </div>
        </div>
      </a>
    </div>
  `
    )
    .join("");

  container.html(html);
}
$(document).on("click", ".area-item", async function (e) {
  e.preventDefault();
try{
    showLoader();
  const areaName = $(this).find(".card").data("area");

  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
  );
  const data = await response.json();

  if (data.meals) {
    displayMeals(data.meals); // نفس الفانكشن اللي بتعرض كروت الوجبات
  }
}
catch(error){
console.log(error);
}
finally{
    hideLoader();
}
});

$("#showIngredients").on("click", async function (e) {
  e.preventDefault();
 try{
   showLoader();
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  const data = await response.json();
  console.log(data);
  displayIngredients(data.meals);
 }
 catch(error){
console.log(error);

 }finally{
    hideLoader();
 }
});

function displayIngredients(Ingredients) {
  const container = $(".jscontainer");
  const container1 = $(".meal-details");
  container.empty();
  container1.empty();

  const html = Ingredients.map((Ingredient) => {
    if (!Ingredient.strDescription || Ingredient.strDescription.trim() === "") {
      return "";
    }

    return `
      <div class="inner col-md-3">
        <a href="#" class="ingredient-item text-decoration-none">
          <div class="card bg-black text-white text-center overflow-hidden p-4" data-ingredient="${
            Ingredient.strIngredient
          }">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h2>${Ingredient.strIngredient}</h2>
            <p>${Ingredient.strDescription.substring(0, 100)}...</p>
          </div>
        </a>
      </div>
    `;
  }).join("");

  container.html(html);
}
$(document).on("click", ".ingredient-item", async function (e) {
  e.preventDefault();
try{
    showLoader();
  const ingredient = $(this).find(".card").data("ingredient");

  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  const data = await response.json();

  if (data.meals) {
    displayMeals(data.meals); // يعرض الوجبات اللي فيها المكون ده
  }
}
catch(error){
console.log(error);

}finally{
 hideLoader();
}
});

$("#showSearch").on("click", function (e) {
  e.preventDefault();

  $(".jscontainer").empty(); // مسح الوجبات لما نفتح البحث
  displaysearch(); // عرض فورم البحث

  // نخلي الحدث يتفعل بعد ما الفورم يتعرض
  $(document).on("input", "#searchByName", async function () {
    const searchTerm = $(this).val().trim().toLowerCase();
    showLoader();
    if (searchTerm) {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const data = await response.json();

      if (data.meals) {
        const filteredMeals = data.meals.filter((meal) =>
          meal.strMeal.toLowerCase().includes(searchTerm)
        );
        $(".jscontainer").empty();
        displayMeals(filteredMeals);
        hideLoader();
      } else {
        $(".jscontainer")
          .empty()
          .append("<p class='text-white'>لا توجد نتائج.</p>");
      }
    } else {
      $(".jscontainer").empty();
    }
  });
$(document).on("input", "#searchByFirstLetter", async function () {
  let firstLetter = $(this).val().trim().toLowerCase();

  // خليه حرف واحد بس
  if (firstLetter.length > 1) {
    firstLetter = firstLetter.charAt(0);
    $(this).val(firstLetter); // نرجع القيمة للحرف الأول فقط
  }

  // تحقق إنه حرف إنجليزي فقط
  if (firstLetter.length === 1 && /^[a-zA-Z]$/.test(firstLetter)) {
 try{
     showLoader();
    const response = await fetch(
`      https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}
`    );
    const data = await response.json();

    $(".jscontainer").empty();

    if (data.meals) {
      displayMeals(data.meals);
    } else {
      $(".jscontainer").html("<p class='text-white'>لا توجد نتائج.</p>");
    }
 }catch(error){
console.log(error);

 }
finally{
      hideLoader();
}
  } else {
    $(".jscontainer").empty();
  }
});
});

function displaysearch() {
  const container1 = $("#searchbox");
    const container2 = $(".meal-details");

  container1.empty();
  container2.empty();

  const html = `
  <div class=" col-md-6 col-sm-12 mb-2">
        <input type="text" id="searchByName" class="form-control mb-2 w-100" placeholder="Search By Name">
    </div>
    <div class=" col-md-6 col-sm-12 ">
          <input type="text" id="searchByFirstLetter" class="form-control mb-2 w-100" placeholder="Search By First Letter">
    </div>
  
  `;
  container1.html(html);
}
