let page = 1;
// dawr dyalo howa i3ref achmn page kaynin fiha hna 
let container = null;
if (document.querySelector(".carts")) {
    container = document.querySelector(".carts");
} else if (document.querySelector(".like")) {
    container = document.querySelector(".like");
}



async function loadData() {
    // bach tchequer lina ila cant had function fiha cart oula la hadi rir bach tndem liya la page de favo
    if (!container.classList.contains("carts")) return;  // return ; rir bach ila l9ach la condition ihbes

    try {
        const API = `https://debuggers-games-api.duckdns.org/api/games?page=${page}&limit=21`;
        const response = await fetch(API);
        const data = await response.json();

        data.results.forEach(result => {

            const cartWrapper = document.createElement("div");
            cartWrapper.classList.add("cart");

            const title = result.name || "Sans titre";
            const image = result.background_image || "";
            const description = result.description.slice(0, 100) || "Pas de description";
            const date = result.released || "N/A";
            const rating = result.rating || 0;
            const genre = result.genre || "N/A";

            //  bach ired lina titre miniscule bach manl9ach mochkil f le recherch 
            cartWrapper.setAttribute("data-title", title.toLowerCase());

            cartWrapper.innerHTML = `
                <div class="font-['Roboto'] group relative h-[386px] w-[288px] rounded-[20px] text-center overflow-hidden m-5">
                    <img src="${image}" class="rounded-[20px] h-full w-full object-cover">

                    <div class="absolute inset-0 bg-black/70 flex flex-col justify-center items-center text-white 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">

                        <h2 class="text-[30px] lg:text-[40px] font-['Jolly_Lodger']">${title.slice(0, 10)}</h2>

                        <p class="mb-2 text-zinc-400 text-sm">${description}...</p>

                        <div class="border-b-2 mb-2 w-full flex justify-center">
                            <strong>Genre:</strong> <p>${genre}</p>
                        </div>

                        <div class="border-b-2 mb-2 w-full flex justify-center">
                            <strong>Date:</strong> <p>${date}</p>
                        </div>

                        <div class="mb-2 border-b-2 w-full justify-center">
                            ${'<i class="fa-solid fa-star text-yellow-300"></i>'.repeat(rating)}
                            ${'<i class="fa-solid fa-star text-gray-300"></i>'.repeat(6 - rating)}
                        </div>

                        <div class="like-btn cursor-pointer text-[30px]">
                            <i class="fa-solid fa-heart"></i>
                        </div>

                    </div>
                </div>
            `;

            container.appendChild(cartWrapper);
            /////////attention
            setupFavSystem(cartWrapper, {
                title, image, description, date, genre, rating
            });
            /////////attention
        });
        const loading = document.querySelector("#hhh");
        if (loading) loading.style.display = "none";

    } catch (error) {
        console.log("Erreur fetching:", error);
    }
}

if (container && container.classList.contains("carts")) {
    loadData();
}



if (document.querySelector("#next")) {
    document.querySelector("#next").addEventListener('click', () => {
        page++;
        loadData();
    });
}



function searchGames() {
    const searchValue = document.querySelector("#input").value.toLowerCase();
    const cards = document.querySelectorAll(".carts > .cart");

    cards.forEach(card => {
        const title = card.getAttribute("data-title");
        card.style.display = title.includes(searchValue) ? "" : "none";
    });
}

if (document.querySelector("#input")) {
    document.querySelector("#input").addEventListener("input", searchGames);
}


function setupFavSystem(cartWrapper, gameData) {
    const btnLike = cartWrapper.querySelector(".like-btn");

    btnLike.addEventListener("click", () => {
        btnLike.style.color = "red";

        let favList = JSON.parse(localStorage.getItem("favorites")) || [];
        favList.push(gameData);

        localStorage.setItem("favorites", JSON.stringify(favList));

        console.log("Added to favorites:", favList);
    });
}



if (container && container.classList.contains("like")) {

    let favList = JSON.parse(localStorage.getItem("favorites")) || [];

    container.innerHTML = "";

    favList.forEach(game => {

        const card = document.createElement("div");

        card.innerHTML = `
                <div class="font-['Roboto'] group relative h-[386px] w-[288px] rounded-[20px] text-center overflow-hidden m-5">
                    <img src="${game.image}" class="rounded-[20px] h-full w-full object-cover">

                    <div class="absolute inset-0 bg-black/70 flex flex-col justify-center items-center text-white 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">

                        <h2 class="text-[30px] lg:text-[40px] font-['Jolly_Lodger']">${game.title.slice(0, 10)}</h2>

                        <p class="mb-2 text-zinc-400 text-sm">${game.description}...</p>

                        <div class="border-b-2 mb-2 w-full flex justify-center">
                            <strong>Genre:</strong> <p>${game.genre}</p>
                        </div>

                        <div class="border-b-2 mb-2 w-full flex justify-center">
                            <strong>Date:</strong> <p>${game.date}</p>
                        </div>

                        <div class="mb-2 border-b-2 w-full justify-center">
                            ${'<i class="fa-solid fa-star text-yellow-300"></i>'.repeat(game.rating)}
                            ${'<i class="fa-solid fa-star text-gray-300"></i>'.repeat(6 - game.rating)}
                        </div>

                        <div class="like-btn cursor-pointer text-[30px]">
                            <i class="fa-solid fa-heart text-red-500"></i>
                        </div>

                    </div>
                </div>
            `;

        container.appendChild(card);
     
    });
    localStorage.clear()
}
