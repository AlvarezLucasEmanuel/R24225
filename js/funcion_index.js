document.addEventListener("DOMContentLoaded", () => 
    {
    
    const productosContainer = document.getElementById("grid-container-producto");
  
    function fetchProductos() 
    {

      fetch("https://dummyjson.com/products?limit=20")
        .then((response) => response.json())
        .then((data) => {
          const productos = data.products;
          let columnRow = 0;
          let divRow;
          
          productosContainer.innerHTML = "";

          
          
          productos.forEach((product) => 
          {
            if (columnRow == 0) {
              divRow = document.createElement('div');
              divRow.className = 'row';
            }
            
            const cardDiv = document.createElement("div");
            cardDiv.className = "col-md-4"; // es una clase de bootstrap
  
            cardDiv.innerHTML = `
              <div class="card mt-3">
                <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text">${product.description}</p>
                  <p class="card-text fw-bold">Precio: $${product.price}</p>
                  <button class="btn btn-success mt-auto">Agregar</button>
                </div>
              </div>
            `;
  
            
            const botonAgregar = cardDiv.querySelector("button");
            botonAgregar.addEventListener("click", () => 
            {
              agregarAlCarrito(product);
            });
  
            
            divRow.appendChild(cardDiv)
            columnRow+= 1;

            if (columnRow === 3) {
              productosContainer.appendChild(divRow);
              columnRow = 0;
            }
          });
        })
        .catch((error) => console.error("Error", error));
    }
  
    
    function agregarAlCarrito(product) 
    {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      
      cart.push(product);      
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.title} ha sido agregado al carrito!`);
    }
  
    
    fetchProductos();
  });
  