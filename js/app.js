// CÓDIGO PARA CARREGAR DADOS
function fetchJson(url) {
  return fetch(url).then((r) => {
    return r.json();
  });
}

function getValues(data, property) {
  const values = new Set();
  data.forEach(item => {
    const value = item[property];
    if (value !== null) {
      values.add(value.toUpperCase());
    }
  });
  const valuesArray = [...values];
  valuesArray.sort((a, b) => a.localeCompare(b));
  return valuesArray;
}

let db = "";
let allBrands = "";
let allProductTypes = "";

async function fetchDB() {
  db = await fetchJson(`http://makeup-api.herokuapp.com/api/v1/products.json`);
  let dbSortRating = db.sort((a, b) => b.rating - a.rating);
  allBrands = getValues(db, 'brand');
  allProductTypes = getValues(db, 'product_type');
  products(dbSortRating);
  brands(allBrands);
  types(allProductTypes);
};

function products(data) {
  let product = productItem(data);
  document.getElementById("product").innerHTML = product;
}

function brands(data) {
  let brand = brandItem(data);
  document.getElementById("filter-brand").innerHTML = brand;
}

function types(data) {
  let type = typeItem(data);
  document.getElementById("filter-type").innerHTML = type;
}

fetchDB();

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

// CÓDIGO PARA TODAS AS MARCAS
function typeItem(data) {
  const type = data.map(type => {
    return `<option value="${type}">${type}</option>`
  });
  return `${type.join("")}`
};

// CÓDIGO PARA TODOS OS TIPOS
function brandItem(data) {
  const brand = data.map(brand => {
    return `<option value="${brand}">${brand}</option>`
  });
  return `${brand.join("")}`
};

// CÓDIGO PARA FILTRAR POR NOME
function filterByName(name) {
  let dbFilteredName = db.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
  products(dbFilteredName);
}

let inputFilterName = document.getElementById("filter-name");

inputFilterName.addEventListener("input", function () {
  filterByName(inputFilterName.value)
});

// CÓDIGO PARA FILTRAR POR MARCA
function filterByBrand(brand) {
  let dbFilteredBrand = db.filter(product => product.brand && product.brand.toLowerCase().includes(brand.toLowerCase()));
  products(dbFilteredBrand);
}

let inputFilterBrand = document.getElementById("filter-brand");

inputFilterBrand.addEventListener("input", function () {
  filterByBrand(inputFilterBrand.value)
});

// CÓDIGO PARA FILTRAR POR TIPO
function filterByType(type) {
  let dbFilteredType = db.filter(product => product.product_type && product.product_type.toLowerCase().includes(type.toLowerCase()));
  products(dbFilteredType);
}

let inputFilterType = document.getElementById("filter-type");

inputFilterType.addEventListener("input", function () {
  filterByType(inputFilterType.value)
});
