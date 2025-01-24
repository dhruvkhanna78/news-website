const apikey = "dc6e5e1add72477ebe083108fe2510e6";

const blockContainer = document.getElementById("block-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");



// This function will show random articles on homepage

async function fetchRandomNews() {
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;  //this 'articles' is not variable name. This is an array which contains all the information of response
    } catch(error){
        console.error("ERROR fetching random news", error);
        return [];
    }
}

// This will take search/query as an input

searchButton.addEventListener("click", async () =>{ //here, we are using arrow function () =>
    const query = searchField.value.trim()
    if(query !== ""){ //If query isn't empty
        try{
            const articles = await fetchNewsQuery(query);
            displayBlocks(articles) 
        }catch(error){
            console.error("Enter something", error);
            return[];
        }
    }
})
async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=15&apikey=${apikey}`; //we are making dynamic url using ${query} whre value = query we entered
        const response = await fetch(apiUrl); //if we wnt to use "await", function should be aync
        const data = await response.json();
        return data.articles
    }catch(error){
        console.error("ERROR fetching random news", error);
        return [];
    }
}

function displayBlocks(articles) {
    blockContainer.innerHTML = ""; //clear previous content

    articles.forEach((article) => {
        const blockCard = document.createElement("div");
        blockCard.classList.add("block-card");
        const img = document.createElement("img");
        img.src = article.urlToImage; //api attributes
        img.alt = article.title; //if image is not loaded it will replace image with title
        const title = document.createElement("h2");
        // title.textContent = article.title;
        const truncatedTitle = article.title.length > 30? article.title.slice(0,30) + "...." : article.title;
        title.textContent = truncatedTitle;

        const description = document.createElement("p");
        // description.textContent = article.description;
        const truncatedDes = article.description.length > 120? article.description.slice(0,120) + "...." : article.description;
        description.textContent = truncatedDes;

        blockCard.appendChild(img);
        blockCard.appendChild(title);
        blockCard.appendChild(description);
        blockCard.addEventListener('click', () => { //If we click on any article it will be opened in new window
            window.open(article.url, "_blank");
        });
        blockContainer.appendChild(blockCard); //all the cards are adding in blockContainer

    });
}

// This function will be executed automatically unlike ordinary function

(async ()=>{
    try{
        const articles = await fetchRandomNews(); //this 'articles' is variable name
        displayBlocks(articles);
    }catch(error){
        console.error("ERROR fetching random news", error);
    }
})();