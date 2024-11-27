/*
This is beging if the check out
*/

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const state = document.getElementById('state');
    const zip = document.getElementById('zip');
    const cardName = document.getElementById('cardName');
    const cardNumber = document.getElementById('cardNumber');
    const expMonth = document.getElementById('expMonth');
    const expYear = document.getElementById('expYear');
    const cvv = document.getElementById('cvv');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear any previous error messages
        document.querySelectorAll('.error').forEach(el => el.remove());

        let isValid = true;

        // Check if fields are empty or invalid
        if (fullName.value.trim() === '' || /\d/.test(fullName.value)) {
            showError(fullName, 'Full Name is required and cannot contain numbers');
            isValid = false;
        }
        if (email.value.trim() === '') {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email.value)) {
            showError(email, 'Invalid email format');
            isValid = false;
        }
        if (address.value.trim() === '') {
            showError(address, 'Address is required');
            isValid = false;
        }
        if (city.value.trim() === '' || /\d/.test(city.value)) {
            showError(city, 'City is required and cannot contain numbers');
            isValid = false;
        }
        if (state.value.trim() === '' || /\d/.test(state.value)) {
            showError(state, 'State is required and cannot contain numbers');
            isValid = false;
        }
        if (zip.value.trim() === '') {
            showError(zip, 'Zip Code is required');
            isValid = false;
        } else if (!validateZip(zip.value)) {
            showError(zip, 'Invalid Zip Code');
            isValid = false;
        }
        if (cardName.value.trim() === '' || /\d/.test(cardName.value)) {
            showError(cardName, 'Name on Card is required and cannot contain numbers');
            isValid = false;
        }
        if (cardNumber.value.trim() === '') {
            showError(cardNumber, 'Credit Card Number is required');
            isValid = false;
        } else if (!validateCardNumber(cardNumber.value)) {
            showError(cardNumber, 'Invalid Credit Card Number');
            isValid = false;
        }
        if (expMonth.value.trim() === '') {
            showError(expMonth, 'Exp. Month is required');
            isValid = false;
        } else if (!validateExpMonth(expMonth.value)) {
            showError(expMonth, 'Invalid Exp. Month');
            isValid = false;
        }
        if (expYear.value.trim() === '') {
            showError(expYear, 'Exp. Year is required');
            isValid = false;
        } else if (!validateExpYear(expYear.value)) {
            showError(expYear, 'Invalid Exp. Year');
            isValid = false;
        }
        if (cvv.value.trim() === '') {
            showError(cvv, 'CVV is required');
            isValid = false;
        } else if (!validateCVV(cvv.value)) {
            showError(cvv, 'Invalid CVV');
            isValid = false;
        }

        if (isValid) {
            alert('Congratulations! Your form has been submitted successfully.');
            form.submit();
        }
    });

    function showError(input, message) {
        const error = document.createElement('span');
        error.classList.add('error');
        error.textContent = message;
        input.parentElement.appendChild(error);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validateZip(zip) {
        const re = /^\d{4,5}(-\d{4})?$/;
        return re.test(String(zip));
    }

    function validateCardNumber(cardNumber) {
        const re = /^\d{12}$/;
        return re.test(String(cardNumber));
    }

    function validateExpMonth(month) {
        const re = /^(0?[1-9]|1[0-2])$/;
        return re.test(String(month));
    }

    function validateExpYear(year) {
        const re = /^(20[2-9][3-9])$/;
        return re.test(String(year));
    }

    function validateCVV(cvv) {
        const re = /^\d{3,4}$/;
        return re.test(String(cvv));
    }

    // Add input restrictions
    function restrictInputToNumbers(input) {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/\D/g, '');
        });
    }

    function restrictInputToLetters(input) {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
        });
    }

    // Apply restrictions
    restrictInputToLetters(fullName);
    restrictInputToLetters(city);
    restrictInputToLetters(state);
    restrictInputToLetters(cardName);

    restrictInputToNumbers(zip);
    restrictInputToNumbers(cardNumber);
    restrictInputToNumbers(expMonth);
    restrictInputToNumbers(expYear);
    restrictInputToNumbers(cvv);
});

// Preload the pop sound
    const popSound = new Audio('sounds/pop.mp3');
    popSound.load();

// Initialize an empty array to store cart items
let cart = [];

// Reset the audio to the start
function playPopSound() {
    const popSound = new Audio('onclickSound.wav');
    popSound.play();
}

// Function to add product to cart
function addToCart(name, title, price, image) {
  const item = { name, title, price, image, quantity: 1 };

  // Check if item already exists in cart
  const existingItem = cart.find(cartItem => cartItem.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push(item);
  }

  updateCart();
  updateCartQuantity(); // Update cart quantity display
}

// Function to update cart display
function updateCart() {
  const cartTable = document.getElementById("cart").getElementsByTagName("tbody")[0];
  cartTable.innerHTML = ""; // Clear existing items

  // Loop through cart items and add them to the table
  for (const item of cart) {
    const tableRow = document.createElement("tr");

    const removeCell = document.createElement("td");
    const removeLink = document.createElement("a");
    removeLink.href = "#"; // Prevent default link behavior (optional)
    removeLink.innerHTML = "<i class='far fa-times-circle'></i>";
    removeLink.addEventListener("click", () => removeFromCart(item.name));
    removeCell.appendChild(removeLink);
    tableRow.appendChild(removeCell);

    const imageCell = document.createElement("td");
    const imgElement = document.createElement("img");
    imgElement.src = item.image;
    imgElement.alt = "Product Image";
    imgElement.style.width = "50px"; // Set image width
    imgElement.style.height = "50px"; // Set image height
    imageCell.appendChild(imgElement);
    tableRow.appendChild(imageCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = item.title;
    tableRow.appendChild(nameCell);

    const priceCell = document.createElement("td");
    priceCell.textContent = `$${item.price}`;
    tableRow.appendChild(priceCell);

    const quantityCell = document.createElement("td");
    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.min = 1;
    quantityInput.value = item.quantity;
    quantityInput.addEventListener("change", () => updateQuantity(item.name, quantityInput.value));
    quantityCell.appendChild(quantityInput);
    tableRow.appendChild(quantityCell);

    const subtotalCell = document.createElement("td");
    subtotalCell.textContent = `$${item.price * item.quantity}`;
    tableRow.appendChild(subtotalCell);

    cartTable.appendChild(tableRow);
  }

  calculateCartTotal();
}

// Function to remove product from cart
function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  updateCart();
  updateCartQuantity(); // Update cart quantity display
}

// Function to update product quantity in cart
function updateQuantity(name, quantity) {
  const item = cart.find(cartItem => cartItem.name === name);
  if (item) {
    item.quantity = parseInt(quantity);
    updateCart();
  }
}

// Function to update the displayed cart quantity
function updateCartQuantity() {
  const cartQuantityElement = document.getElementById('cart-quantity'); // Assuming there's an element with id 'cart-quantity' in your HTML
  cartQuantityElement.textContent = cart.length; // Update the text content to show the number of items in the cart
}

// Function to calculate cart total
function calculateCartTotal() {
  let subtotal = 0;
  for (const item of cart) {
    subtotal += item.price * item.quantity;
  }

  const subtotalElement = document.getElementById("subtotal").getElementsByTagName("tr")[0].getElementsByTagName("td")[1];
  subtotalElement.textContent = `$${subtotal}`;

  // Update total considering potential discount (code for discount functionality not provided)
  const discount = 0; // Replace with logic to calculate discount based on applied coupon
  const total = subtotal - discount;
  const totalElement = document.getElementById("subtotal").getElementsByTagName("tr")[3].getElementsByTagName("td")[1];
  totalElement.textContent = `$${total}`;
}

// Initial page load (optional)
updateCart();
updateCartQuantity(); // Initialize cart quantity display













