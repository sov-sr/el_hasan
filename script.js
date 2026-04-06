// Product Data
const products = [
    {
        id: 1,
        name: "Executive Chair",
        price: 299.99,
        emoji: "💺",
        description: "Premium leather executive chair with lumbar support"
    },
    {
        id: 2,
        name: "Gaming Chair",
        price: 249.99,
        emoji: "🎮",
        description: "High-performance gaming chair with ergonomic design"
    },
    {
        id: 3,
        name: "Office Chair",
        price: 199.99,
        emoji: "💼",
        description: "Comfortable office chair perfect for all-day work"
    },
    {
        id: 4,
        name: "Dining Chair",
        price: 149.99,
        emoji: "🍽️",
        description: "Elegant dining chair with classic design"
    },
    {
        id: 5,
        name: "Rocking Chair",
        price: 179.99,
        emoji: "🪑",
        description: "Relaxing rocking chair for your living room"
    },
    {
        id: 6,
        name: "Bean Bag Chair",
        price: 129.99,
        emoji: "🛋️",
        description: "Comfortable bean bag chair for casual seating"
    },
    {
        id: 7,
        name: "Bar Stool",
        price: 99.99,
        emoji: "🍺",
        description: "Stylish bar stool with adjustable height"
    },
    {
        id: 8,
        name: "Wheelchair",
        price: 459.99,
        emoji: "♿",
        description: "Mobility wheelchair with premium comfort"
    }
];

let cart = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupModalControls();
});

// Load and display products
function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-description">${product.description}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

// Update cart count badge
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Display cart items
function displayCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty</p>';
        return;
    }
    
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name} x${item.quantity}</div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });
    
    updateTotalPrice();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    displayCartItems();
}

// Calculate and display total price
function updateTotalPrice() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('total-price').textContent = total.toFixed(2);
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    closeModal('cart-modal');
    openModal('checkout-modal');
}

// Setup modal controls
function setupModalControls() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeButtons = document.querySelectorAll('.close');
    const checkoutForm = document.getElementById('checkout-form');
    
    // Open cart modal
    cartIcon.addEventListener('click', function() {
        displayCartItems();
        openModal('cart-modal');
    });
    
    // Close modals
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal.id);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('active');
        }
    });
    
    // Handle checkout form submission
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        processPayment();
    });
}

// Open modal
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Process payment (simulated)
function processPayment() {
    const formInputs = document.querySelectorAll('#checkout-form input');
    let isValid = true;
    
    formInputs.forEach(input => {
        if (input.value.trim() === '') {
            isValid = false;
            input.style.borderColor = '#ff6b6b';
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    if (!isValid) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate payment processing
    alert('Processing payment...\n\nThank you for your purchase!\nOrder Total: $' + document.getElementById('total-price').textContent);
    
    // Clear cart and close modal
    cart = [];
    updateCartCount();
    closeModal('checkout-modal');
    document.getElementById('checkout-form').reset();
    
    showNotification('Order placed successfully!');
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #667eea;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
