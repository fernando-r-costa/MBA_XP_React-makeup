// CÓDIGO PARA CARREGAR DADOS
function fetchJson(url) {
  return fetch(url).then((r) => {
    return r.json();
  });
}

let db = "";

async function fetchDB() {
  db = await fetchJson(`http://makeup-api.herokuapp.com/api/v1/products.json`);
  products(db.sort((a, b) => b.rating - a.rating));
};

function products(data) {
  let product = productItem(data);
  document.getElementById("product").innerHTML = product;
}

fetchDB();


// filtro = dados.filter(product => product.name.includes("Smudgeliner"));

// CÓDIGO PARA UM PRODUTO
function productItem(product) {
  const item = product.map(product => {
    return `<div class="product" data-name=${product.name} data-brand=${product.brand} data-type=${product.product_type} tabindex=${product.id}>
    <figure class="product-figure">
    <img src=${product.api_featured_image} width="215" height="215" alt=${product.name} onerror="javascript:this.src='img/unavailable.png'">
        </figure>
        <section class="product-description">
          <h1 class="product-name">${product.name}</h1>
          <div class="product-brands">
            <span class="product-brand background-brand">${product.brand}</span>
            <span class="product-brand background-price">${((product.price) * 5.5).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
        </section>
        <section class="product-details">
          <div class="details-row">
            <div>Brand</div>
            <div class="details-bar">
              <div class="details-bar-bg" style="width= 250">${product.brand}
              </div>
            </div>
          </div>
          <div class="details-row">
            <div>Price</div>
            <div class="details-bar">
              <div class="details-bar-bg" style="width= 250">${((product.price) * 5.5).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </div>
            </div>
          </div>
          <div class="details-row">
            <div>Rating</div>
            <div class="details-bar">
              <div class="details-bar-bg" style="width= 250">${product.rating == null ? 0 : product.rating}
              </div>
            </div>
          </div>
          <div class="details-row">
            <div>Category</div>
            <div class="details-bar">
              <div class="details-bar-bg" style="width= 250">${product.category == "" ? "-" : product.category}
              </div>
            </div>
          </div>
          <div class="details-row">
            <div>Product_type</div>
            <div class="details-bar">
              <div class="details-bar-bg" style="width= 250">${product.product_type == "" ? "-" : product.product_type}
              </div>
            </div>
          </div>
        </section>
      </div>`;
  });
  return `${item.join("")}`
};

// CÓDIGO PARA CLASSIFICAR
let sort = document.getElementById("sort-type");

function sort() {
  
}

sort.addEventListener('change', )