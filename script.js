const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links a');
const navbar = document.querySelector('.navbar');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ScrollReveal configuration
ScrollReveal().reveal('.feature-card', {
    duration: 1000,
    distance: '20px',
    interval: 200
});

// Smooth parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(el => {
        const speed = el.dataset.speed;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Interactive menu items
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', e => {
        e.currentTarget.querySelector('.menu-details').style.opacity = '1';
        e.currentTarget.querySelector('img').style.transform = 'scale(1.1)';
    });
    
    item.addEventListener('mouseleave', e => {
        e.currentTarget.querySelector('.menu-details').style.opacity = '0';
        e.currentTarget.querySelector('img').style.transform = 'scale(1)';
    });
});

const cart = document.querySelector('.cart');
const cartCount = document.querySelector('.cart-count');
const cartModal = document.querySelector('.cart-modal');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartCloseButton = document.querySelector('.cart-close');
let cartItems = [];

document.querySelectorAll('.menu-item').forEach(item => {
    const increaseButton = item.querySelector('.increase');
    const decreaseButton = item.querySelector('.decrease');
    const quantityDisplay = item.querySelector('.quantity');

    increaseButton.addEventListener('click', () => {
        const itemName = item.dataset.name;
        const itemPrice = parseFloat(item.dataset.price);
        addItemToCart(itemName, itemPrice);
        quantityDisplay.textContent = getItemQuantity(itemName);
    });

    decreaseButton.addEventListener('click', () => {
        const itemName = item.dataset.name;
        removeItemFromCart(itemName);
        quantityDisplay.textContent = getItemQuantity(itemName);
    });
});

cart.addEventListener('click', () => {
    cartModal.classList.toggle('active');
});

cartCloseButton.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

function addItemToCart(name, price) {
    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ name, price, quantity: 1 });
    }
    updateCart();
}

function removeItemFromCart(name) {
    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity--;
        if (existingItem.quantity === 0) {
            cartItems = cartItems.filter(item => item.name !== name);
        }
    }
    updateCart();
}

function getItemQuantity(name) {
    const item = cartItems.find(item => item.name === name);
    return item ? item.quantity : 0;
}

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cartItems.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h4>${item.name}</h4>
            <p class="price">${item.price} ريال × ${item.quantity}</p>
            <button class="remove-item" data-name="${item.name}">إزالة</button>
        `;
        cartItem.querySelector('.remove-item').addEventListener('click', () => {
            removeItemFromCart(item.name);
            document.querySelector(`.menu-item[data-name="${item.name}"] .quantity`).textContent = getItemQuantity(item.name);
        });
        cartItemsContainer.appendChild(cartItem);
    });
    cartTotal.textContent = `المجموع: ${total} ريال`;
    cartCount.textContent = cartItems.length;
}
