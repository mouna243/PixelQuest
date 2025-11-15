const container = document.querySelector(".carts");
let page = 1;

// LOAD DATA 

async function loadData() {
    try {
        const API = `https://debuggers-games-api.duckdns.org/api/games?page=${page}&limit=21`;
        const response = await fetch(API);
        const data = await response.json();

        console.log("page", page, data.results);

        data.results.forEach(result => {

            const cartWrapper = document.createElement("div");

            const title = result.name || "Sans titre";
            const image = result.background_image || "";
            const description = result.description?.slice(0, 100) || "Pas de description";
            const date = result.released || "N/A";
            const rating = result.rating || 0;
            const genre = result.genre || "N/A";

            // mahima f recherch (hit katred les alphabet miniscule)
            cartWrapper.setAttribute("data-title", title.toLowerCase());            
            
            cartWrapper.innerHTML = `
            <div class="cart font-['Roboto'] group relative h-[386px] w-[288px] rounded-[20px] text-center overflow-hidden m-5">
            <img src="${image}" class="rounded-[20px] h-full w-full object-cover">
            
            <div class="absolute inset-0 bg-black/70 flex flex-col justify-center items-center text-white 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
            
            <h2 class="text-[30px] lg:text-[40px] font-['Jolly_Lodger']">${title.slice(0, 10)}</h2>
            
            <p class="mb-2 text-zinc-400 text-sm">${description}...</p>
            
            <div class="border-b-2 mb-2 w-full flex justify-center">
            <strong>Éditeur:</strong> <p>${genre}</p>
            </div>
            
            <div class="border-b-2 mb-2 w-full flex justify-center">
            <strong>Date:</strong> <p>${date}</p>
            </div>
            
            <div class="mb-2 border-b-2 w-full justify-center">
            ${'<i class="fa-solid fa-star text-yellow-300"></i>'.repeat(rating)}
            ${'<i class="fa-solid fa-star text-gray-300"></i>'.repeat(6 - rating)}
            </div>
            
            <div class="like-btn cursor-pointer">
            <i class="fa-solid fa-heart"></i>
            </div>
            </div>
            </div>
            `;
            
            container.appendChild(cartWrapper);
            container.querySelector("#hhh").style.display="none"
        });

    } catch (error) {
        console.log("Erreur de fetching :", error);
    }
}

loadData();

// next btn

document.querySelector("#next").addEventListener('click', () => {
    page++;

    loadData();
});

// function recherch 

function searchGames() {
    const searchValue = document.querySelector("#input").value.toLowerCase();
    console.log(searchValue)
    const cards = document.querySelectorAll(".carts > div");

    cards.forEach(card => {
        const title = card.getAttribute("data-title");

// include katrje3 lina true or false y3ni ila kan rir un alphabet f l name of game readi tbiyno lina 
        if (title.includes(searchValue)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}
document.querySelector("#input").addEventListener("input", searchGames);
