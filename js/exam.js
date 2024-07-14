// $(".click-icon").click(closeSidebar);
// function closeSidebar() {
//   let width = $(".coloring-option").outerWidth(true);
//   let left = $(".coloring-option").css("left") == `0px` ? `-${width}px` : "0";
//   console.log(left);
//   $(".icon").addClass("fa-close");
//   $(".icon").removeClass("fa-bar");

//   $(".coloring-option").animate({ left }, 100);
// }

function close() {
  let width = $(".coloring-option").outerWidth(true);
  let left = $(".coloring-option").css("left", `-${width}px`);

  $(".icon").removeClass("fa-close");
  $(".icon").addClass("fa-bar");
  $(".coloring-option").animate({ left }, 100);
  for (let i = 0; i < 5; i++) {
    $(".coloring-option li a")
      .eq(i)
      .animate(
        {
          bottom: -300,
        },
        (i + 5) * 100
      );
  }
}

if ($(".coloring-option").css("left") == `0px`) {
  $(window).on({
    load: () => {
      close();
    },
  });
}
function closeSidebar() {
  let width = $(".coloring-option").outerWidth(true);
  $(".click-icon").on({
    click: () => {
      if ($(".coloring-option").css("left") == `0px`) {
        let left = $(".coloring-option").css("left", `-${width}px`);

        $(".icon").removeClass("fa-close");
        $(".icon").addClass("fa-bar");
        $(".coloring-option").animate({ left }, 300);
        for (let i = 0; i < 5; i++) {
          $(".coloring-option li a")
            .eq(i)
            .animate(
              {
                bottom: -300,
              },
              (i + 5) * 100
            );
        }
      }

      if ($(".coloring-option").css("left") == `-250px`) {
        let left = $(".coloring-option").css("left", `0`);
        $(".icon").addClass("fa-close");
        $(".icon").removeClass("fa-bar");

        $(".coloring-option").animate({ left }, 300);

        for (let i = 0; i < 5; i++) {
          $(".coloring-option li a")
            .eq(i)
            .animate(
              {
                bottom: 0,
              },
              (i + 5) * 100
            );
        }
      }
    },
  });
}

closeSidebar();

/** ! * >>>>>>>>>>>>>><<<<<<<<<<<<<<<<<( Fetch & DISPLAY )>>>>>>>>>>>>>><<<<<<<<<<<<<<<<< */
let detailsSec = document.querySelector(".details");
let homeSec = document.querySelector(".display");
let categorySec = document.querySelector(".category");
let loader = document.querySelector("#loader");

// let search = $("#search");
let category = $("#category");
let area = $("#area");
let ingredient = $("#ingredient");
let contact = $("#contact");

/** * ?>>>>>>>>>>>>> (Fetch name for search data:)  <<<<<<<<<<<<<<<<< */

async function searchByName(name) {
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`,
    {
      method: "GET",
    }
  );
  const response = await api.json();
  loaderHandler(homeSec, loader);

  // console.log(response);
  return response;
}

/** * ? >>>>>>>>>>>>>  ( Display search data:)  <<<<<<<<<<<<<<<< <*/

function displayAllMeals(data) {
  let x = ``;
  loaderHandler(loader, homeSec);

  let box = document.querySelector(".display .row");
  if (data === null) {
    box.innerHTML = "";
  } else {
    for (let i = 0; i < data.length; i++) {
      x += `
       <div onclick= "setDetails(${data[i].idMeal})"  class="meal col-md-3  col-lg-3 my-2 ">
                <div class="image text-center position-relative rounded-3">
                      <img class="w-100" src="${data[i].strMealThumb}" alt="">
                       <div class="overlay">
                           <p>${data[i].strMeal}</p>
                       </div>
                </div>

        </div>  
      `;
      box.innerHTML = x;
    }
  }
}

/* * ?>>>>>>>>>>>>> (Function for excute name search display:)  <<<<<<<<<<<<<<<<< */

async function display(name = "") {
  this.loaderHandler(homeSec, loader);

  // let searchData = await searchByName(name);
  console.log(searchByName(name));
  searchByName(name).then((data) => {
    // console.log(data.meals);
    this.displayAllMeals(data.meals);
  });
}
display();

/** * ?>>>>>>>>>>>>> (Fetch name for search data:)  <<<<<<<<<<<<<<<<< */

async function searchByLetter(letter) {
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,
    {
      method: "GET",
    }
  );
  const response = await api.json();
  loaderHandler(homeSec, loader);
  return response;
}

/* * ?>>>>>>>>>>>>> (Function for excute  letter search display:)  <<<<<<<<<<<<<<<<< */
async function displayLetter(letter) {
  this.loaderHandler(homeSec, loader);

  searchByLetter(letter == "" ? "a" : letter).then((data) => {
    console.log(data.meals);
    this.displayAllMeals(data.meals);
  });
}
// displayLetter()
/* * ? >>>>>>>>>>>>> (Fetch id for get data:)  <<<<<<<<<<<<<<<< */

async function getDetails(id) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const options = {
    method: "GET",
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

/** * ? >>>>>>>>>>>>>  ( Display id details data:)  <<<<<<<<<<<<<<<< <*/

function displayDetailes(data) {
  let save = document.querySelector(".details .row");
  loaderHandler(loader, detailsSec);
  $(".search").addClass("d-none");

  let dataBox = "";
  dataBox += `<div class="col-md-4">
    <div class="detaile-title  images d-flex flex-column  ">
     
        <img src="${
          data[0].strMealThumb
        }" class="img-fluid rounded-4 my-2" alt="...">
        <h2> ${data[0].strMeal} </h2>
    </div>
   </div>
  <div class=" col-md-8 my-4">
    <div class="text d-flex flex-column  ">

        <h4>Instructions: </h4>
        <p>
        ${data[0].strInstructions}
        </p>
        <p class="title">
            Area:
            <span>
             ${data[0].strArea}
            </span>
        </p>
        <p class="title">
            Category:
            <span>
                ${data[0].strCategory} 
            </span>
        </p>
        <p class="long"><span class="title">Recipes:</span> <br>
        <div class="container">
            <div class="row">
                <div class="col-md  d-flex  flex-wrap">
                   ${generateRecipeList(data)}
                </div>
            </div>
        </div>

        </p>
       <span class=" title d-flex  flex-wrap">Tags:</span>
        <ul class=" list-unstyled  d-flex  flex-wrap"> 
            <br>
             ${tagList(data)}
        </ul>
         <ul class=" list-unstyled  d-flex  flex-wrap"> 
            <br>
            <li class="show btn btn-success me-3" > <a target="_blank" href="${
              data[0].strSource
            }"> Source </a>  </li>
            <li class="show btn btn-danger " > <a target="_blank" href="${
              data[0].strYoutube
            }"> Youtube </a>  </li>
        </ul>
       
    </div>
  </div>
`;
  save.innerHTML = dataBox;
}

//------
function generateRecipeList(meal) {
  let list = "";
  for (let i = 1; i <= 20; i++) {
    if (meal[0][`strMeasure${i}`] && meal[0][`strIngredient${i}`]) {
      list += `<span id="${i}" class=" alert alert-info m-2 p-1"> ${
        meal[0][`strMeasure${i}`]
      } ${meal[0][`strIngredient${i}`]}</span>`;
    }
  }
  return list;
}

function tagList(meal) {
  let list = "";
  if (meal[0][`strTags`]) {
    let tag = meal[0][`strTags`].split(",");
    for (let i = 0; i < tag.length; i++) {
      list += `<li  id="${[i]}"  class=" tag alert alert-danger m-2 p-1">${
        tag[i]
      }</li>`;
    }
  }

  return list;
}

/** * ?>>>>>>>>>>>>> (loader and display details:)  <<<<<<<<<<<<<<<<< */

function setDetails(id) {
  this.loaderHandler(homeSec, loader);
  // console.log(id);

  getDetails(id).then((data) => {
    // console.log(data.meals);
    this.displayDetailes(data.meals);
    close();
  });
}
/** * ?>>>>>>>>>>>>> (Fetch categories:)  <<<<<<<<<<<<<<<<< */

async function categories() {
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`,
    {
      method: "GET",
    }
  );
  const response = await api.json();
  return response;
}

console.log(categories());

/** * ? >>>>>>>>>>>>>  ( Display category data:)  <<<<<<<<<<<<<<<< <*/

function displayCategory(data) {
  let x = ``;
  loaderHandler(loader, categorySec);

  let box = document.querySelector(".category .row");

  for (let i = 0; i < data.length; i++) {
    x += `
       <div id="${data[i].strCategory}"   class="col-md-3  col-lg-3 my-2 ">
                <div data-name= "${
                  data[i].strCategory
                }" class="test image text-center position-relative rounded-3">
                      <img class="w-100" src="${
                        data[i].strCategoryThumb
                      }" alt="">
                       <div class="overlay p-2">
                           <h3>${data[i].strCategory}</h3>
                           <p class="cat-text">${data[i].strCategoryDescription
                             .split(" ")
                             .slice(0, 20)
                             .join(" ")}</p>
                       </div>
                </div>

        </div>  
      `;
    box.innerHTML = x;
  }
  return box;
}

/** * ?>>>>>>>>>>>>> (Fetch for filter by categories:)  <<<<<<<<<<<<<<<<< */

async function filterCategories(name) {
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`,
    {
      method: "GET",
    }
  );
  const response = await api.json();
  return response;
}

console.log(filterCategories());

/** * ?>>>>>>>>>>>>> (Fetch for Areas:)  <<<<<<<<<<<<<<<<< */

async function selectAreas(name) {
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`,
    {
      method: "GET",
    }
  );
  const response = await api.json();
  return response;
}

console.log(selectAreas());

// ---------------------------------------
async function Areas() {
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`,
    {
      method: "GET",
    }
  );
  const response = await api.json();
  return response;
}

console.log(Areas());

// /** * ? >>>>>>>>>>>>>  ( Display Area data:)  <<<<<<<<<<<<<<<< <*/

function displayAreas(data) {
  let x = ``;
  loaderHandler(loader, homeSec);

  let box = document.querySelector(".display .row");
  for (let i = 0; i < data.length; i++) {
    x += `
       <div  class="meal col-md-3  col-lg-3 my-2 ">
                <div data-area= "${data[i].strArea}" class="areas image text-center position-relative rounded-3">
                     
                     <i class="fa-solid fa-house-laptop fa-4x"></i>
                           <p>${data[i].strArea}</p>
                      
                </div>

        </div>  
      `;
    box.innerHTML = x;
  }
}
/** * ?>>>>>>>>>>>>> (Fetch for ingredient:)  <<<<<<<<<<<<<<<<< */

async function selectIngredient(name) {
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`,
    {
      method: "GET",
    }
  );
  const response = await api.json();
  return response;
}

console.log(selectIngredient());

// ---------------------------------------
async function ingredients() {
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`,
    {
      method: "GET",
    }
  );
  const response = await api.json();
  return response;
}

console.log(ingredients());

// /** * ? >>>>>>>>>>>>>  ( Display Area data:)  <<<<<<<<<<<<<<<< <*/

function displayIngredient(data) {
  let x = ``;
  loaderHandler(loader, homeSec);

  let box = document.querySelector(".display .row");
  for (let i = 0; i < 20; i++) {
    x += `
       <div  class="meal col-md-3  col-lg-3 my-2 ">
                <div data-area= "${
                  data[i].strIngredient
                }" class=" ingredients image text-center position-relative rounded-3">
                     
                     <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                           <h3>${data[i].strIngredient}</h3>
                           <p>${
                             data[i].strDescription
                               ? data[i].strDescription
                                   .split(" ")
                                   .slice(0, 20)
                                   .join(" ")
                               : ""
                           }</p>
                      
                </div>

        </div>  
      `;
    box.innerHTML = x;
  }
}

/** ! * >>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>><<<<<<<<<<<<<<<<< */
/** * ? =>=>=>=>=>=>=>=>  Function for (add & remove) loader: <=<=<=<=<=<=<=<=< */

function loaderHandler(addDisplay, removeDisplay) {
  addDisplay.classList.add("d-none");
  removeDisplay.classList.remove("d-none");
}

/** ! * >>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>><<<<<<<<<<<<<<<<< */

/** * ? =>=>=>=>=>=>=>=> (Events)  <=<=<=<=<=<=<=<=< */

$("#name").on({
  input: () => {
    let searchTerm = $("#name");
    display($(searchTerm).val());
  },
});

$("#letter").on({
  input: () => {
    let searchTerm = $("#letter");

    displayLetter($(searchTerm).val());
  },
});

let search = document.querySelector("#search");

search.addEventListener("click", () => {
  $(".search").removeClass("d-none");
  $(".display").addClass("d-none");
  categorySec.classList.add("d-none");
  document.querySelector(".details").classList.add("d-none");
  document.querySelector(".contact").classList.add("d-none");
  close();
});

$("#category").on({
  click: () => {
    loaderHandler(homeSec, loader);
    $(".search").addClass("d-none");
    document.querySelector(".details").classList.add("d-none");
    document.querySelector(".contact").classList.add("d-none");
    close();

    categories().then((data) => {
      displayCategory(data.categories);

      $(".test").on("click", function () {
        let name = this.getAttribute("data-name");
        loaderHandler(homeSec, loader);

        filterCategories(name).then(function (data) {
          $(".search").addClass("d-none");
          categorySec.classList.add("d-none");
          document.querySelector(".details").classList.add("d-none");

          displayAllMeals(data.meals);
        });
      });
    });
  },
});

$("#area").on({
  click: () => {
    close();

    loaderHandler(homeSec, loader);
    $(".search").addClass("d-none");
    document.querySelector(".details").classList.add("d-none");
    document.querySelector(".contact").classList.add("d-none");

    Areas().then((data) => {
      displayAreas(data.meals);

      $(".areas").on("click", function () {
        let name = this.getAttribute("data-area");
        console.log(this.getAttribute("data-area"));
        loaderHandler(homeSec, loader);

        selectAreas(name).then(function (data) {
          $(".search").addClass("d-none");
          categorySec.classList.add("d-none");
          document.querySelector(".details").classList.add("d-none");

          console.log(data.meals);

          displayAllMeals(data.meals);
        });
      });
    });
  },
});

$("#ingredient").on({
  click: () => {
    close();

    loaderHandler(homeSec, loader);
    document.querySelector(".contact").classList.add("d-none");

    $(".search").addClass("d-none");
    document.querySelector(".details").classList.add("d-none");

    ingredients().then((data) => {
      displayIngredient(data.meals);

      $(".ingredients").on("click", function () {
        let name = this.getAttribute("data-area");
        console.log(this.getAttribute("data-area"));
        loaderHandler(homeSec, loader);

        selectIngredient(name).then(function (data) {
          $(".search").addClass("d-none");
          categorySec.classList.add("d-none");
          document.querySelector(".details").classList.add("d-none");

          console.log(data.meals);

          displayAllMeals(data.meals);
        });
      });
    });
  },
});

$("#contact").on({
  click: () => {
    document.querySelector(".contact").classList.remove("d-none");
    document.querySelector(".display ").classList.add("d-none");
    document.querySelector(".details").classList.add("d-none");
    document.querySelector(".search").classList.add("d-none");
    categorySec.classList.add("d-none");
    close();
  },
});
/** ! * >>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>><<<<<<<<<<<<<<<<< */
/** * ? =>=>=>=>=>=>=>=>  Validation : <=<=<=<=<=<=<=<=< */
let nameInput = document.querySelector("#NameInput");
let emailInput = document.querySelector("#EmailInput");
let phoneInput = document.querySelector("#PhoneInput");
let ageInput = document.querySelector("#AgeInput");
let passwordInput = document.querySelector("#PasswordInput");
let repasswordInput = document.querySelector("#repasswordInput");

let nameInputAlert = document.querySelector("#NameAlert");
let emailInputAlert = document.querySelector("#EmailAlert");
let phoneInputAlert = document.querySelector("#PhoneAlert");
let ageInputAlert = document.querySelector("#AgeAlert");
let passwordInputAlert = document.querySelector("#PasswordAlert");
let repasswordInputAlert = document.querySelector("#repasswordAlert");
let submitBtn = document.querySelector("#submitBtn");

function nameValidation() {
  return /^[a-zA-Z].{2,}$/.test(nameInput.value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    emailInput.value
  );
}

function phoneValidation() {
  return /^01[0125][0-9]{8}$/.test(phoneInput.value);
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(ageInput.value);
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
    passwordInput.value
  );
}

function repasswordValidation() {
  return repasswordInput.value == passwordInput.value;
}
$("input").on({
  input: function () {
    let name = this.getAttribute("id") == "NameInput";

    if (name) {
      $(nameInput).on({
        input: () => {
          if (nameInput != "") {
            if (!nameValidation()) {
              nameInputAlert.classList.remove("d-none");
            } else {
              nameInputAlert.classList.add("d-none");
            }
          }
        },
      });
    }

    if (this.getAttribute("id") == "EmailInput") {
      $(emailInput).on({
        input: () => {
          if (emailInput != "") {
            if (!emailValidation()) {
              emailInputAlert.classList.remove("d-none");
            } else {
              emailInputAlert.classList.add("d-none");
            }
          }
        },
      });
    }

    if (this.getAttribute("id") == "PhoneInput") {
      $(phoneInput).on({
        input: () => {
          if (phoneInput != "") {
            if (!phoneValidation()) {
              phoneInputAlert.classList.remove("d-none");
            } else {
              phoneInputAlert.classList.add("d-none");
            }
          }
        },
      });
    }
    if (this.getAttribute("id") == "AgeInput") {
      $(ageInput).on({
        input: () => {
          if (nameInput != "") {
            if (!ageValidation()) {
              ageInputAlert.classList.remove("d-none");
            } else {
              ageInputAlert.classList.add("d-none");
            }
          }
        },
      });
    }
    if (this.getAttribute("id") == "PasswordInput") {
      $(passwordInput).on({
        input: () => {
          if (passwordInput != "") {
            if (!passwordValidation()) {
              passwordInputAlert.classList.remove("d-none");
            } else {
              passwordInputAlert.classList.add("d-none");
            }
          }
        },
      });
    }
    if (this.getAttribute("id") == "repasswordInput") {
      $(repasswordInput).on({
        input: () => {
          if (repasswordInput != "") {
            if (!repasswordValidation()) {
              repasswordInputAlert.classList.remove("d-none");
            } else {
              repasswordInputAlert.classList.add("d-none");
            }
          }
        },
      });
    }

    if (
      nameValidation() &&
      emailValidation() &&
      phoneValidation() &&
      ageValidation() &&
      passwordValidation() &&
      repasswordValidation()
    ) {
      submitBtn.removeAttribute("disabled");
      document
        .querySelector("#submitBtn .disabled")
        .classList.remove("disabled");
    } else {
      submitBtn.setAttribute("disabled", true);
      document.querySelector("#submitBtn .disabled").classList.add("disabled");
    }
  },
});
