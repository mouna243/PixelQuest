const container = document.querySelector(".carts");
async function loadData() {
    try {
        let page = 1;
        

        let API = `https://debuggers-games-api.duckdns.org/api/games?page=${page}&limit=21`
        const url = await fetch(API);
        let data = await url.json();
        console.log(page)

        console.log(data.results);
        data.results.forEach((result) => {
            const cart = document.createElement("div");
            console.log(cart);
            const description = result.description.slice(0, 100) || "pas de result";
            const titre = result.name.slice(0, 10) || "pas de result";
            const url = result.background_image || "pas de result";
            const date = result.released || "pas de result";
            const genre = result.genre || "pas de result";
            const rating = result.rating || "pas de result";

            cart.innerHTML = `
            <div class="cart font-['Roboto'] group relative h-[386px] w-[288px] bg-green-500 rounded-[20px] text-center overflow-hidden md:h-[350px] w-[200px] m-5 lg:w-[288px] h-[386px]">
            <img src="${url}" alt="${titre}" class="rounded-[20px] h-full w-full object-cover">
            
            <!-- div qui apparaît au hover -->
            <div class="absolute inset-0 bg-black/70 flex flex-col justify-center items-center text-white 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
            
            <h2 class="px-2 py-1 rounded mb-2 text-[30px] lg:text-[40px] font-['Jolly_Lodger']">${titre}</h2>
            
            <p class="mb-2 text-zinc-400 text-sm text-['Roboto']">${description}...</p>            
            <div class="border-b-2 mb-2 w-full flex justify-center">
            <strong>Éditeur / Studio :</strong>
            <p>${genre}</p>
            </div>
            
            <div class="mb-2 border-b-2 w-full flex justify-center">
            <strong>Date de sortie :</strong>
            <p>${date}</p>
            </div>
            
            <div class="mb-2 border-b-2 w-full justify-center"> ${'<i class="fa-solid fa-star text-yellow-300"></i>'.repeat(rating) + '<i class="fa-solid fa-star text-gray-300"></i>'.repeat(6 - rating)}</div>
            <div><i class="like fa-solid fa-heart" ></i></div>
            </div>
            </div>
            `;
            document.querySelector('#hhh').style.display = "none";
            container.appendChild(cart);
       
               
 });
    } catch {
        console.log("erreur de fetching");
    }

         const next = document.querySelector("#next");
        next.addEventListener('click', (page) => {
            page++;
            loadData()
                    })
}
  const next = document.querySelector("#next");
        next.addEventListener('click', (page) => {
            page++;
            loadData()
                    })

                


loadData();
