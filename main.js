let width = $("#nav").innerWidth();
var AllItems = [];





$("#nav").animate({ left: `-${width}` }, 0);
$(".nav-side").animate({ left: `-${width}` }, 0);
$(".nav-social").animate({ left: `-${width}` }, 0);



$(".open").click(function () {


    if ($("#nav").css("left") == "0px") {


        $("#nav").animate({ left: `-${width}` }, 500);
        $(".nav-side").animate({ left: `-180` }, 500);
        $(".nav-social").animate({ left: `-180` }, 500);

        $('.nav-link').animate({ paddingBottom: '80px' }, 1500);




    } else {
        $("#nav").animate({ left: 0 }, 500);
        $(".nav-side").animate({ left: 0 }, 500);
        $(".nav-social").animate({ left: 0 }, 500);

        $('.nav-link').animate({ paddingBottom: '80px' }, 1500);

        $(".open").animate({ left: `${width}` }, 500).fadeOut(100, function () {
            $("#close").animate({ left: `${width}` }, 500).fadeIn(100);


        })




    }
});


$("#close").click(function () {

    $("#nav").animate({ left: `-${width}` }, 500);
    $(".nav-side").animate({ left: `-${width}` }, 500);
    $(".nav-social").animate({ left: `-${width}` }, 500);



    $("#close").animate({ left: 0 }, 500).fadeOut(100, function () {
        $(".open").animate({ left: 0 }, 200).fadeIn(100);

    });



});

$(document).ready(function () {
    $(".loading").fadeOut(1000)
    $("body").css("overflow", "visible")

})






//home

home("beef")

async function home(x) {
    if (x) {
        $(".loading").fadeIn(1000)
        let t = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`);
        let z = await t.json()
        if (z.meals) {
            displayHome(z.meals)
        }
        $(".loading").fadeOut(1000)
    }
}




function displayHome(AllItems) {

    let show = '';


    for (var i = 5; i < 20; i++) {
        show +=
            `    <div class="col-md-6 col-lg-3 col-sm-12 col-xs-12 my-3   shadow">
         <div onclick="Meals('${AllItems[i].idMeal}')" class=" shadow rounded position-relative">
             <div class="show ">
                 <img src='${AllItems[i].strMealThumb}' class="w-100 rounded" >
                 <div class="layer d-flex align-items-center ">
                     <div class="info p-2">
                         <h2>${AllItems[i].strMeal}</h2>
                     </div>
                 </div>
             </div>
         </div>
     </div>

`;

        document.getElementById('row').innerHTML = show;


    }


}

















//search




async function searchName(x) {
    if (x) {
        $(".loading").fadeIn(100)
        let t = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`);
        let z = await t.json();

        displayLetter(z.meals)

        $(".loading").fadeOut(100)

    }
}

async function searchLetter(l) {
    if (l) {
        $(".loading").fadeIn(1000)
        let t = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`)
        let z = await t.json()
        if (z.meals) {
            displayLetter(z.meals)
        }
        $(".loading").fadeOut(1000)
    }
}




function displayLetter(AllItems) {

    let show = '';


    for (var i = 0; i < 10; i++) {
        show +=
            `    <div class="col-md-6 col-lg-3 col-sm-12 col-xs-12my-3   shadow">
         <div onclick="Meals('${AllItems[i].idMeal}')" class=" shadow rounded position-relative">
             <div class="show ">
                 <img src='${AllItems[i].strMealThumb}' class="w-100 rounded" >
                 <div class="layer d-flex align-items-center ">
                     <div class="info p-2">
                         <h2>${AllItems[i].strMeal}</h2>
                     </div>
                 </div>
             </div>
         </div>
     </div>

`;

        document.getElementById('row').innerHTML = show;

    }
}

async function Meals(id) {
    $(".loading").fadeIn(100)
    let t = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    t = await t.json()
    display(t.meals[0])
    $(".loading").fadeOut(500)
}



function display(details) {

    let cartoona = ``;
    let R = ""
    for (let i = 1; i <= 20; i++) {
        if (details[`strIngredient${i}`]) {
            R += `<ul class="d-flex " id="recipes"><li class="my-3 mx-1 p-1 alert-success rounded"></ul>
        ${details[`strMeasure${i}`]} 
        ${details[`strIngredient${i}`]}
        </li>`
        }
    }

    let t = details.strTags
    let tStr = ''


    for (let i = 0; i < 20; i++) {
        tStr += `<ul class="d-flex " id="tags"><li class="my-3 mx-1 p-1 alert-danger rounded">${t[i]}</li></ul>`

    }
    for (let i = 1; i < 10; i++) {
        cartoona = `<div class="col-md-12 col-lg-4 my-3  col-sm-12 shadow">
       
            <img src='${details.strMealThumb}' class="w-100 rounded "alt=""
            srcset="" >
                   
               
                </div>
                <div class='  shadow col-md-8 col-sm-12 myM text-white text-left'>
                <h2>Instructions</h2>
                <p>${details.strInstructions}</p>

              
        
                            <p><b class="fw-bolder">Area :</b> ${details.strArea}</p>
                            <p><b class="fw-bolder">Category :</b> ${details.strCategory}</p>
                            <h3>Recipes :</h3>
                            <ul class="d-flex " id="recipes">
                            </ul>

                            <h3 class="my-2 mx-1 p-1">Tags :</h3>
                            <ul class="d-flex " id="tags">
                            </ul>


                            <a class="btn btn-success text-white" target="_blank" href="${details.strSource}">Source</a>
                            <a class="btn  btn-danger youtube text-white" target="_blank" href="${details.strYoutube}">Youtub</a>
                        </div>`


        document.getElementById('row').innerHTML = cartoona
        document.getElementById("recipes").innerHTML = R
        document.getElementById("tags").innerHTML = t


    }
}




















//categories

async function categories(filter) {
    t = await fetch(`https://www.themealdb.com/api/json/v1/1/${filter}`);



    t = await t.json()
    return t;

}

function displayCategories() {
    let cartoona = '';


    for (var i = 0; i < 10; i++) {
        cartoona +=
            `    <div class="col-md-6 col-lg-3 col-sm-12 col-xs-12 my-3   shadow">
         <div onclick="Meals('${AllItems[i].idCategory}')" class=" shadow rounded position-relative">
             <div class="show ">
             <div onclick="categoryName('${AllItems[i].strCategory}')" class="post">

                 <img src='${AllItems[i].strCategoryThumb}' class="w-100 rounded" >
                 <div class="layer d-flex align-items-center ">
                     <div class="info p-2">
                     <h3>${AllItems[i].strCategory}</h3>
                         <span>${AllItems[i].strCategoryDescription.split(" ").slice(0, 40).join(" ")}</span>
                     </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>

`;

        document.getElementById('row').innerHTML = cartoona

    }

}





async function categoryName(category) {
    $(".loading").fadeIn(100)
    let t = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    t = await t.json()
    displayLetter(t.meals)
    $(".loading").fadeOut(500)
}











//Area

function displayArea() {
    let cartoona = ""
    for (var i = 0; i < AllItems.length; i++) {
        cartoona += `
        <div class="col-md-6 col-sm-12 col-lg-3 my-3 myM  shadow">
        <div class="movie shadow rounded position-relative">
    <div onclick=(Area('${AllItems[i].strArea}')) class="post ">
        <i class="fa-solid fa-city fa-3x"></i>
        <h2 class="text-white">${AllItems[i].strArea}</h2>
    </div>
</div>
</div>`;

        document.getElementById('row').innerHTML = cartoona
    }

}



async function Area(location) {
    $(".loading").fadeIn(100)
    let t = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${location}`)
    t = await t.json();
    displayLetter(t.meals.slice(0, 10))
    $(".loading").fadeOut(500)
}












//ingrediants




function displayIngrediant() {

    let cartoona = ``;


    for (var i = 0; i < 10; i++) {

        cartoona +=
            `    <div class="col-md-6 col-lg-3 col-sm-12 col-xs-12 my-3   shadow">
         <div onclick="Ingredient('${AllItems[i].strIngredient}')" class=" shadow rounded position-relative">
             <div class="show text-center ">
             <i class="fa-solid fa-bowl-food fa-3x"></i>
             <div>

                 <h2 class="text-white">('${AllItems[i].strIngredient}')</h2>
                 <p class="text-white ">('${AllItems[i].strDescription.split(' ').splice(0, 20).join(' ')}')</p>
             </div>
             </div>
         </div>
     </div>

`;
        document.getElementById('row').innerHTML = cartoona;

    }


}


async function Ingredient(x) {
    $(".loading").fadeIn(100)
    let t = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${x}`)
    t = await t.json()
    displayLetter(t.meals)
    $(".loading").fadeOut(500)
}




$(".nav-item a").click(async (e) => {
    let filter = e.target.getAttribute("data-list")
    document.getElementById("search").innerHTML = ""
    document.getElementById('row').innerHTML = ""
    $("#nav").animate({ left: `-${width}` }, 500);
    $(".nav-side").animate({ left: `-${width}` }, 500);
    $(".nav-social").animate({ left: `-${width}` }, 500);



    $("#close").animate({ left: 0 }, 100).fadeOut(100, function () {
        $(".open").animate({ left: 0 }, 100).fadeIn(100);
    })

    let ret;

    if (filter == "Search") {

        document.getElementById('row').innerHTML = ""

        document.getElementById("search").innerHTML = `
        <div class="col-md-12 col-lg-6 col-sm-12  s col-xs-12">
        <input id="searchName" class="form-control" placeholder="Search by Name">
    </div>
    <div class="col-md-12 col-lg-6 col-sm-12 s col-xs-12">
        <input id="searchLetter" class="form-control"  placeholder="Search by First Letter">
    </div>`

        $("#searchName").keyup((e) => {
            searchName(e.target.value)
        })
        $("#searchLetter").keyup((e) => {
            searchLetter(e.target.value)
        })

        $('#searchLetter').on("input", function () {
            if (this.value.length > 1)
                this.value = this.value.slice(0, 1);
        });

    }
    else if (filter == "Categories") {
        document.getElementById('row').innerHTML = ""
        $(".loading").fadeIn(100)

        ret = await categories(filter + ".php")
        AllItems = ret.categories.splice(0, 20);
        displayCategories()

        $(".loading").fadeOut(500)

    } else if (filter == "Area") {
        document.getElementById('row').innerHTML = ""

        $(".loading").fadeIn(100)

        ret = await categories("list.php?a=list")
        AllItems = ret.meals.splice(0, 20);
        displayArea()
        $(".loading").fadeOut(500)
    } else if (filter == "Ingrediant") {
        document.getElementById('row').innerHTML = ""

        $(".loading").fadeIn(100)

        ret = await categories("list.php?i=list")
        AllItems = ret.meals.splice(0, 20);
        displayIngrediant();
        $(".loading").fadeOut(500)
    }

     else if (filter == "ContactUs") {

        document.getElementById('row').innerHTML  = `
        <section id="CnotactUs" class="container myM w-75 mx-auto mb-5 ">
		<div class="p-2">
			<h2 class="text-light mb-5">ContacUs...</h2>
			<div class="row">
				<div class="col-md-6 se col-sm-12 ">
					<div class="form-group">
						<input class="form-control shadow " onkeyup="validation()" id="name"
							placeholder="Enter Your Name">
						<div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
							Special Characters and Numbers not allowed
						</div>
					</div>
				</div>
				<div class="col-md-6 se col-sm-12">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="email" placeholder="Enter Email">
						<div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
							Enter valid email. *Ex: xxx@yyy.zzz
						</div>
					</div>
				</div>
				<div class="col-md-6 se col-sm-12">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="phone" placeholder="Enter phone">
						<div class="alert mt-1 alert-danger  d-none" id="phonealert" role="alert">
							Enter valid Phone Number
						</div>
					</div>
				</div>
				<div class="col-md-6 se col-sm-12">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" id="age" placeholder="Enter Age">
						<div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
							Enter valid Age
						</div>
					</div>
				</div>
				<div class="col-md-6 se col-sm-12">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" type="password" id="password"
							placeholder="Enter Password">
						<div class="alert mt-1 alert-danger  d-none" id="passwordalert" role="alert">
							Enter valid password *Minimum eight characters, at least one letter and one number:*
						</div>
					</div>
				</div>
				<div class="col-md-6 se col-sm-12">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control" type="password" id="rePassword"
							placeholder="Enter RePassword">
						<div class="alert mt-1 alert-danger  d-none" id="repasswordalert" role="alert">
							Enter valid Repassword
						</div>
					</div>
				</div>


			</div>

			<button type="submit"  mx-5 disabled id="submitBtn" class="btn btn-outline-danger">Submit</button>
		</div>

	</section>`
        userName = document.getElementById("name"),
            userEmail = document.getElementById("email"),
            userPhone = document.getElementById("phone"),
            userAge = document.getElementById("age"),
            userPassword = document.getElementById("password"),
            userRePassword = document.getElementById("rePassword"),
            userNameAlert = document.getElementById("namealert"),
            userEmailAlert = document.getElementById("emailalert"),
            userPhoneAlert = document.getElementById("phonealert"),
            userAgeAlert = document.getElementById("agealert"),
            userpasswordAlert = document.getElementById("passwordalert"),
            userRepasswordAlert = document.getElementById("repasswordalert");

        userName.addEventListener("focus", () => {
            nameToached = true
        })
        userEmail.addEventListener("focus", () => {
            emailToached = true
        })
        userPhone.addEventListener("focus", () => {
            phoneToached = true
        })
        userAge.addEventListener("focus", () => {
            ageToached = true
        })
        userPassword.addEventListener("focus", () => {
            passwordToached = true
        })
        userRePassword.addEventListener("focus", () => {
            repasswordToached = true
        })
    }





})










//contact





let nameToached = false,
    emailToached = false,
    phoneToached = false,
    ageToached = false,
    passwordToached = false,
    repasswordToached = false;

function validation() {

    if (nameToached) {
        if (userNameValid()) {
            userName.classList.remove("is-invalid")
            userName.classList.add("is-valid")
            userNameAlert.classList.replace("d-block", "d-none")
            userNameAlert.classList.replace("d-block", "d-none")

        } else {
            userName.classList.replace("is-valid", "is-invalid")
            userNameAlert.classList.replace("d-none", "d-block")
        }
    }

    if (emailToached) {
        if (userEmailValid()) {
            userEmail.classList.remove("is-invalid")
            userEmail.classList.add("is-valid")
            userEmailAlert.classList.replace("d-block", "d-none")
            userEmailAlert.classList.replace("d-block", "d-none")
        } else {
            userEmail.classList.replace("is-valid", "is-invalid")
            userEmailAlert.classList.replace("d-none", "d-block")
        }
    }

    if (phoneToached) {
        if (userPhoneValid()) {
            userPhone.classList.remove("is-invalid")
            userPhone.classList.add("is-valid")
            userPhoneAlert.classList.replace("d-block", "d-none")
            userPhoneAlert.classList.replace("d-block", "d-none")
        } else {
            userPhone.classList.replace("is-valid", "is-invalid")
            userPhoneAlert.classList.replace("d-none", "d-block")
        }
    }

    if (ageToached) {
        if (userAgeValid()) {
            userAge.classList.remove("is-invalid")
            userAge.classList.add("is-valid")
            userAgeAlert.classList.replace("d-block", "d-none")
            userAgeAlert.classList.replace("d-block", "d-none")
        } else {
            userAge.classList.replace("is-valid", "is-invalid")
            userAgeAlert.classList.replace("d-none", "d-block")
        }
    }

    if (passwordToached) {
        if (userPasswordValid()) {
            userPassword.classList.remove("is-invalid")
            userPassword.classList.add("is-valid")
            userpasswordAlert.classList.replace("d-block", "d-none")
            userpasswordAlert.classList.replace("d-block", "d-none")
        } else {
            userPassword.classList.replace("is-valid", "is-invalid")
            userpasswordAlert.classList.replace("d-none", "d-block")
        }
    }

    if (repasswordToached) {
        if (userRePasswordValid()) {
            userRePassword.classList.remove("is-invalid")
            userRePassword.classList.add("is-valid")
            userRepasswordAlert.classList.replace("d-block", "d-none")
            userRepasswordAlert.classList.replace("d-block", "d-none")
        } else {
            userRePassword.classList.replace("is-valid", "is-invalid")
            userRepasswordAlert.classList.replace("d-none", "d-block")
        }
    }

    if(userNameValid() && userEmailValid() && userPhoneValid() && userAgeValid() && userPasswordValid() && userRePasswordValid()){
        document.getElementById("submitBtn").removeAttribute("disabled")
    }else{
        document.getElementById("submitBtn").setAttribute("disabled","true")
    }

}

function userNameValid() {
    return /^[a-zA-Z ]+$/.test(userName.value)
}

function userEmailValid() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail.value)
}

function userPhoneValid() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(userPhone.value)
}

function userAgeValid() {
    return /^[1-9][0-9]?$|^100$/.test(userAge.value)
}

function userPasswordValid() {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword.value)
}

function userRePasswordValid() {
    return userPassword.value == userRePassword.value
}
