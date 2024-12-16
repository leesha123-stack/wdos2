// Load medicines from JSON file
async function loadMedicines() {
  try {
    const response = await fetch('medicine.json'); // Fetch the JSON file
    if (!response.ok) throw new Error('Failed to load JSON file');
    const data = await response.json();
    renderCategories(data.categories); // Pass the categories to render function
  } catch (error) {
    console.error('Error loading medicines:', error);
    alert('Unable to load medicines. Please try again later.');
  }
}

let cart = [];
let favoriteOrder = JSON.parse(localStorage.getItem('favoriteOrder')) || [];

// Render categories and medicines
function renderCategories(categories) {
  const container = document.getElementById('categories-container');
  container.innerHTML = '';

  categories.forEach((category) => {
    const section = document.createElement('div');
    section.className = 'category-section';

    section.innerHTML = `<h3>${category.name}</h3>`;
    const categoryContainer = document.createElement('div');
    categoryContainer.className = 'medicines-container';

    category.items.forEach((medicine, index) => {
      const item = document.createElement('div');
      item.className = 'medicine-item';

      item.innerHTML = `
        <img src="${medicine.image}" alt="${medicine.name}" class="medicine-image">
        <p class="medicine-name">${medicine.name}</p>
        <p class="medicine-price">$${medicine.price}</p>
        <input type="number" min="1" value="1" class="quantity-input" id="quantity-${category.name}-${index}">
        <button class="add-to-cart" onclick="addToCart('${category.name}-${index}', '${medicine.name}', ${medicine.price})">Add</button>
      `;
      categoryContainer.appendChild(item);
    });

    section.appendChild(categoryContainer);
    container.appendChild(section);
  });
}

// Add item to cart
function addToCart(id, name, price) {
  const quantityInput = document.querySelector(`#quantity-${id}`);
  const quantity = parseInt(quantityInput.value);

  if (quantity <= 0) {
    alert('Quantity must be at least 1!');
    return;
  }

  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ id, name, price, quantity });
  }

  renderCart();
  alert(`${name} added to cart!`);
}

// Render cart
function renderCart() {
  const tbody = document.getElementById('order-items');
  tbody.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const row = document.createElement('tr');
    const subtotal = item.price * item.quantity;
    total += subtotal;

    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price}</td>
      <td>${item.quantity}</td>
      <td>$${subtotal.toFixed(2)}</td>
      <td><button class="remove-button" onclick="removeFromCart(${index})">Remove</button></td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById('total-price').textContent = `$${total.toFixed(2)}`;
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

// Save favorites
document.getElementById('add-favorite').addEventListener('click', () => {
  if (cart.length > 0) {
    localStorage.setItem('favoriteOrder', JSON.stringify(cart));
    alert('Favorite order saved!');
  } else {
    alert('Your cart is empty, nothing to save!');
  }
});

// Apply favorites
document.getElementById('apply-favorite').addEventListener('click', () => {
  const favoriteOrder = JSON.parse(localStorage.getItem('favoriteOrder')) || [];

  if (favoriteOrder.length > 0) {
    cart = [...favoriteOrder];
    renderCart();
    alert('Favorite order applied!');
  } else {
    alert('No favorite order found!');
  }
});

// Navigate to checkout page
document.getElementById('buy-now').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
  } else {
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart for checkout
    window.location.href = 'checkout.html'; // Redirect to checkout page
  }
});

// Initialize
loadMedicines();
