// Load cart data from localStorage
function loadCheckoutData() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const tbody = document.getElementById('checkout-items');
    const totalPrice = document.getElementById('checkout-total');
    let total = 0;
  
    tbody.innerHTML = ''; // Clear previous items
  
    cart.forEach(item => {
      const row = document.createElement('tr');
      const subtotal = item.price * item.quantity;
      total += subtotal;
  
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>$${subtotal.toFixed(2)}</td>
      `;
  
      tbody.appendChild(row);
    });
  
    totalPrice.textContent = `$${total.toFixed(2)}`;
  }
  
  // Handle form submission
  document.getElementById('checkout-form').addEventListener('submit', event => {
    event.preventDefault();
  
    // Capture form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment').value;
  
    alert(`Order placed successfully!\nName: ${name}\nEmail: ${email}\nAddress: ${address}\nPayment Method: ${paymentMethod}`);
  
    // Clear cart after order
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
  });
  
  // Initialize Checkout Page
  loadCheckoutData();
  