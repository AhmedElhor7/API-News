const news = document.querySelector(".news-container");
const counteryLinks = document.querySelectorAll("nav ul li a");
const categoryLinks = document.querySelectorAll("aside ul li a");
let currentCountryCode = "eg";
let currentCategoryCode = "Business";


const defaultImge =
  "https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1";

async function getNews(country , category) {
    let response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=3089a20fa2c646e7a3ab678ccc6aac6c`
    );
      let returnData = await response.json();
      console.log(returnData);
      displayNews(returnData.articles);
}



function displayNews(arr) {
    news.innerHTML = '';
        for (let i = 0; i < arr.length; i++) {
      news.innerHTML += `
       <article class="col-md-4">
                        <div class="inner shadow">
                            <img src="${
                              arr[i].urlToImage || defaultImge
                            }" class="w-100" alt="">
                            <div class="article-bode p-2">
                                <h2 class="h5">${arr[i].title}</h2>
                                <p>${arr[i].description}</p>
                                <a href="" class="btn btn-primary">Read More</a>
                            </div>
                        </div>
                    </article>
      `;
    }
}

getNews("eg", "Business");


// loop At CountryLinks Links TO Add Event 
for (let i = 0; i < counteryLinks.length; i++) {
  counteryLinks[i].addEventListener('click', (e) => {
    let elmentHaveActive = document.querySelector("nav ul li a.active");
    elmentHaveActive.classList.remove("active");
    let addActive = e.target.classList.add("active"); 
    currentCountryCode = e.target.getAttribute("country-code");
    getNews(currentCountryCode, currentCategoryCode);
  })
}
// loop At Category Links TO Add Event 
for (let i = 0; i < categoryLinks.length; i++) {
  categoryLinks[i].addEventListener("click", (e) => {
    let elmentHaveActive = document.querySelector("aside ul li a.active");
    elmentHaveActive.classList.remove("active");
    let addActive = e.target.classList.add("active");
    console.log(categoryLinks[i].text);
     currentCategoryCode = categoryLinks[i].text;
     getNews(currentCountryCode, currentCategoryCode);
  });
}