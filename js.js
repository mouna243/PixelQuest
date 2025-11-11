
 const container = document.querySelector(".carts")
async function  loadData (){
    try{
    const url = await fetch('https://debuggers-games-api.duckdns.org/api/games?page=2&limit=5');
    let data  = await url.json() ;

    console.log(data.results) ;
    data.results.forEach((result) =>{
       const cart = document.createElement('div');
       console.log(cart)
       const description = result.description || 'pas de result';
       const titre = result.name || 'pas de result';
       const url = result.background_image_additional|| 'pas de result';
       const date = result.released || 'pas de result';
       const studio = result.developers.name || 'pas de result' ;
       const rating = result.rating || 'pas de result';
       cart.innerHTML=( `<div class="cart w-[288px] h-[386px]">
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