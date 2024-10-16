// script.js

document.addEventListener("DOMContentLoaded", function() {
  const productList = document.getElementById('product-list');
  const addProductBtn = document.getElementById('add-product-btn');

  // Load products from local storage on page load
  const products = JSON.parse(localStorage.getItem('products')) || [];
  products.forEach(product => addProductToDOM(product));

  // Add new product
  addProductBtn.addEventListener('click', function() {
      const productName = prompt("Enter product name:");
      const productDescription = prompt("Enter product description:");
      const productPrice = prompt("Enter product price:");
      const productImage = prompt("Enter product image URL:");

      // Ensure all fields are filled
      if (productName && productDescription && productPrice && productImage) {
          const product = {
              id: Date.now().toString(),
              name: productName,
              description: productDescription,
              price: productPrice,
              image: productImage
          };
          addProductToDOM(product);
          saveProductToLocalStorage(product);
      } else {
          alert("Please fill in all fields.");
      }
  });

  // Function to add product to the DOM
  function addProductToDOM(product) {
      const productContainer = document.createElement('div');
      productContainer.className = 'col-md-4 mb-4';
      productContainer.innerHTML = `
          <div class="card glass-effect" data-id="${product.id}">
              <span class="delete-btn" onclick="deleteProduct('${product.id}')">&times;</span> <!-- Trash button -->
              <img src="${product.image}" alt="${product.name}" class="card-img-top">
              <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text">${product.description}</p>
                  <p class="card-text"><strong>Price: ₱${product.price}</strong></p>
                  <button class="btn btn-success" onclick="addToCart('${product.id}')"><i class="fas fa-cart-plus"></i> Add to Cart</button>
                  <button class="btn btn-warning" onclick="editProduct('${product.id}')">Edit</button>
              </div>
          </div>
      `;
      productList.appendChild(productContainer);
  }

  function saveProductToLocalStorage(product) {
      const products = JSON.parse(localStorage.getItem('products')) || [];
      products.push(product);
      localStorage.setItem('products', JSON.stringify(products));
  }
});

// Delete product function
function deleteProduct(productId) {
  let products = JSON.parse(localStorage.getItem('products')) || [];
  products = products.filter(product => product.id !== productId);
  localStorage.setItem('products', JSON.stringify(products));

  // Remove the product element from the DOM
  const productElement = document.querySelector(`[data-id="${productId}"]`);
  if (productElement) {
      productElement.remove();
  }
}

// Edit product function
function editProduct(productId) {
  let products = JSON.parse(localStorage.getItem('products')) || [];
  const product = products.find(p => p.id === productId);

  if (product) {
      const newName = prompt("Edit product name:", product.name);
      const newDescription = prompt("Edit product description:", product.description);
      const newPrice = prompt("Edit product price:", product.price);
      const newImage = prompt("Edit product image URL:", product.image);

      // Update product if fields are filled
      if (newName && newDescription && newPrice && newImage) {
          product.name = newName;
          product.description = newDescription;
          product.price = newPrice;
          product.image = newImage;

          // Save the updated product back to local storage
          localStorage.setItem('products', JSON.stringify(products));
          location.reload(); // Reload page to update UI
      } else {
          alert("Please fill in all fields.");
      }
  }
}

// Dummy add to cart function
function addToCart(productId) {
  console.log(`Product ${productId} added to cart`);
}