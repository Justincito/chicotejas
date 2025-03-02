let cart = [];

// Función para cargar el carrito desde el localStorage al cargar la página
window.onload = function() {
  let savedCart = JSON.parse(localStorage.getItem('cart'));
  if (savedCart) {
    cart = savedCart;
    renderCart();
  }
}

function addToCart(productId) {
  let productDiv = document.querySelector(`[data-id="${productId}"]`);
  let productName = productDiv.dataset.name;
  let productPrice = parseFloat(productDiv.dataset.price);
  let productImg = productDiv.dataset.img;

  let product = {
    id: productId,
    name: productName,
    price: productPrice,
    quantity: 1,
    img: productImg
  };

  let existingProduct = cart.find(item => item.id === productId);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push(product);
  }

  saveCartToLocalStorage();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCartToLocalStorage();
  renderCart();
}

function updateQuantity(productId, quantity) {
  let product = cart.find(item => item.id === productId);
  if (product) {
    product.quantity = quantity;
  }
  saveCartToLocalStorage();
  renderCart();
}

function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
  let cartDiv = document.getElementById('cart');
  cartDiv.innerHTML = '';

  cart.forEach(item => {
    let total = item.price * item.quantity;
    cartDiv.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}" alt="Producto ${item.id}">
        <p>${item.name} s/${total} Cantidad: 
        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
          <button onclick="removeFromCart(${item.id})">Eliminar</button>
        </p>
      </div>
    `;
  });

  let totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  cartDiv.innerHTML += `<h3>SubTotal: $${totalAmount}</h3>`;
}

