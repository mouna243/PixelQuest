
 const container = document.querySelector(".carts")
async function  loadData (){
    try{
    const url = await fetch('https://debuggers-games-api.duckdns.org/api/games?page=2&limit=1');
    let data  = await url.json() ;

    console.log(data.results) ;
    data.results.forEach((result) =>{
       const cart = document.createElement('div');
       console.log(cart)
       const description = result.description ;
       const titre = result.name ;
       const image = result.background_image_additional;
       const date = result.released ;
       const studio = result.platforme ;
       cart.innerHTML=(` <div class="cart w-[288px] h-[386px]">
        <img src="${image}" alt="${titre} class="w-[288px] h-[386px]"">
        <div>
        <h2 class="bg-red-500">${titre}</h2>
        <p class='text-['Inter']'>${description}...</p>
        <div>
        <strong>Éditeur / Studio :</strong><p>${studio}</p>
        </div>
        <div>
        <strong>Date de sortie :</strong><p>${date}</p>
        </div>
        <div>⭐⭐⭐⭐</div>
        <div>🤍</div>
        </div>
        </div>`)
        container.appendChild(cart)

    })}catch{
       console.log("erreur de fetching");
    }
   

}

loadData() ;