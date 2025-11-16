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
    if (!container || !container.classList.contains("carts")) return;  // return ; rir bach ila l9ach la condition ihbes

    try {
        const API = `https://debuggers-games-api.duckdns.org/api/games?page=${page}&limit=21`;
        const response = await fetch(API);
        const data = await response.json();
      
        if (!data.results) return;
        
        trie(data)

        data.results.forEach(result => {

            const cartWrapper = document.createElement("div");
            cartWrapper.classList.add("cart");

            const title = result.name || "Sans titre";
            const image = result.background_image || "";
            const description = result.description ? result.description.slice(0, 100) : "Pas de description";
            const date = result.released || "N/A";
            const rating = Math.round(result.rating) || 0;
            const genre = result.genres && result.genres[0] ? result.genres[0].name : "N/A";
            const plateforme = result.parent_platforms ? result.parent_platforms.map(p => p.platform.name).join(" ,") : "N/A";

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
                            <strong>Plateforme:</strong> <p>${plateforme}</p>
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


        //   le mis ajour
            setupFavSystem(cartWrapper, {
                title, image, description, date, genre, rating, plateforme
            });

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
        // la forme resumer de if 
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
        
        // Vérifier si le jeu est déjà dans les favoris
        //some ka return true ila can element wahed vrai 
        const isAlready = favList.some(game => game.title === gameData.title);
        if (!isAlready) {
            //katpushi game data f favoList
            favList.push(gameData);
            localStorage.setItem("favorites", JSON.stringify(favList));
            console.log("les favorites:", gameData.title);
        } else {
            console.log("Game already in favorites:", gameData.title);
        }
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

                        <h2 class="text-[30px] lg:text-[40px] font-['Jolly_Lodger']">${game.title ? game.title.slice(0, 10) : "Sans titre"}</h2>

                        <p class="mb-2 text-zinc-400 text-sm">${game.description || "Pas de description"}...</p>

                        <div class="border-b-2 mb-2 w-full flex justify-center">
                            <strong>Genre:</strong> <p>${game.genre || "N/A"}</p>
                        </div>
                        <div class="border-b-2 mb-2 w-full flex justify-center">
                            <strong>Plateforme:</strong> <p>${game.plateforme || "N/A"}</p>
                        </div>

                        <div class="border-b-2 mb-2 w-full flex justify-center">
                            <strong>Date:</strong> <p>${game.date || "N/A"}</p>
                        </div>

                        <div class="mb-2 border-b-2 w-full justify-center">
                            ${'<i class="fa-solid fa-star text-yellow-300"></i>'.repeat(game.rating || 0)}
                            ${'<i class="fa-solid fa-star text-gray-300"></i>'.repeat(6 - (game.rating || 0))}
                        </div>

                        <div class="like-btn cursor-pointer text-[30px]">
                            <i class="fa-solid fa-heart text-red-500"></i>
                        </div>

                    </div>
                </div>
            `;

        container.appendChild(card);

    });
    // localStorage.clear(); // had fonction katsupprimer les favorit
}

function trie(game) {
    const select = document.querySelector("#trie");
    if (!select) return;

    const valeur = select.value; 
    if (!game.results) return;

   
    let sortedResults = [...game.results];

   
    if (valeur === "AZ") {
        sortedResults.sort((a, b) => a.name.localeCompare(b.name));

    } else if (valeur === "ZA") {
        sortedResults.sort((a, b) => b.name.localeCompare(a.name));

    } else if (valeur === "genre") {
        sortedResults.sort((a, b) => 
            (a.genres?.[0]?.name || "").localeCompare(b.genres?.[0]?.name || "")
        );

    } else if (valeur === "plateforme") {
        sortedResults.sort((a, b) =>
            (a.parent_platforms?.[0]?.platform?.name || "")
            .localeCompare(b.parent_platforms?.[0]?.platform?.name || "")
        );

    } else if (valeur === "note") {
        sortedResults.sort((a, b) => a.rating - b.rating);
    }

  
    const container = document.querySelector(".carts");
    if (!container) return;
    container.innerHTML = "";

   
    sortedResults.forEach(result => {
        const cartWrapper = document.createElement("div");
        cartWrapper.classList.add("cart");

        const title = result.name || "Sans titre";
        const image = result.background_image || "";
        const description = result.description ? result.description.slice(0, 100) : "Pas de description";
        const date = result.released || "N/A";
        const rating = Math.round(result.rating) || 0;
        const genre = result.genres?.[0]?.name || "N/A";
        const plateforme = result.parent_platforms?.map(p => p.platform.name).join(", ") || "N/A";

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
                        <strong>Plateforme:</strong> <p>${plateforme}</p>
                    </div>
                    <div class="border-b-2 mb-2 w-full flex justify-center">
                        <strong>Date:</strong> <p>${date}</p>
                    </div>
                    <div class="mb-2 border-b-2 w-full justify-center">
                        ${'<i class="fa-solid fa-star text-yellow-300"></i>'.repeat(rating)}
                        ${'<i class="fa-solid fa-star text-gray-300"></i>'.repeat(5 - rating)}
                    </div>
                    <div class="like-btn cursor-pointer text-[30px]">
                        <i class="fa-solid fa-heart"></i>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(cartWrapper);
  //hadi kadir le mis ajour bach maytrawch des bug
        setupFavSystem(cartWrapper, {
            title, image, description, date, genre, rating, plateforme
        });
    });
}

// Ajouter l'événement pour le tri
if (document.querySelector("#trie")) {
    document.querySelector("#trie").addEventListener("change", () => {
        // Recharger les données pour appliquer le tri
        if (container && container.classList.contains("carts")) {
            loadData();
        }
    });
}