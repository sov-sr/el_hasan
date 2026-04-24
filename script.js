// Product Data English
const productsEN = [
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

// Product Data Arabic
const productsAR = [
    {
        id: 1,
        name: "كرسي تنفيذي",
        price: 299.99,
        emoji: "💺",
        description: "كرسي جلدي تنفيذي فاخر مع دعم أسفل الظهر"
    },
    {
        id: 2,
        name: "كرسي الألعاب",
        price: 249.99,
        emoji: "🎮",
        description: "كرسي الألعاب عالي الأداء مع تصميم ergonomic"
    },
    {
        id: 3,
        name: "كرسي المكتب",
        price: 199.99,
        emoji: "💼",
        description: "كرسي مكتب مريح مثالي للعمل طوال اليوم"
    },
    {
        id: 4,
        name: "كرسي الطعام",
        price: 149.99,
        emoji: "🍽️",
        description: "كرسي طعام أنيق مع تصميم كلاسيكي"
    },
    {
        id: 5,
        name: "كرسي هزاز",
        price: 179.99,
        emoji: "🪑",
        description: "كرسي هزاز مريح لغرفة المعيشة الخاصة بك"
    },
    {
        id: 6,
        name: "كرسي بيضاوي",
        price: 129.99,
        emoji: "🛋️",
        description: "كرسي بيضاوي مريح للجلوس العارض"
    },
    {
        id: 7,
        name: "مقعد البار",
        price: 99.99,
        emoji: "🍺",
        description: "مقعد بار أنيق مع ارتفاع قابل للتعديل"
    },
    {
        id: 8,
        name: "كرسي متحرك",
        price: 459.99,
        emoji: "♿",
        description: "كرسي متحرك بمستوى راحة فاخر"
    }
];

let products = productsEN;
let cart = [];
let currentLanguage = 'en';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadLanguage();
    loadProducts();
    setupModalControls();
});

// Switch language
function switchLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update products
    products = lang === 'ar' ? productsAR : productsEN;
    document.getElementById('products-grid').innerHTML = '';
    loadProducts();
    
    // Update all text elements
    updatePageText(lang);
}

// Load saved language preference
function loadLanguage() {
    const savedLang = localStorage.getItem('language') || 'en';
    currentLanguage = savedLang;
    document.documentElement.lang = savedLang;
    
    // Update products
    products = savedLang === 'ar' ? productsAR : productsEN;
    
    // Set active button
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach((btn, index) => {
        btn.classList.remove('active');
        if ((savedLang === 'en' && index === 0) || (savedLang === 'ar' && index === 1)) {
            btn.classList.add('active');
        }
    });
    
    // Update page text
    updatePageText(savedLang);
}

// Update all page text
function updatePageText(lang) {
    const isArabic = lang === 'ar';
    
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = isArabic ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    });
    
    document.querySelectorAll('[data-en-placeholder]').forEach(el => {
        el.placeholder = isArabic ? el.getAttribute('data-ar-placeholder') : el.getAttribute('data-en-placeholder');
    });
    
    document.querySelectorAll('[data-en-text]').forEach(el => {
        const cartCount = document.getElementById('cart-count').textContent;
        el.innerHTML = (isArabic ? el.getAttribute('data-ar-text') : el.getAttribute('data-en-text')) + '<span id="cart-count">' + cartCount + '</span>';
    });
}

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
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">${currentLanguage === 'ar' ? 'أضف إلى السلة' : 'Add to Cart'}</button>
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
    const message = currentLanguage === 'ar' 
        ? `تم إضافة ${product.name} إلى السلة!`
        : `${product.name} added to cart!`;
    showNotification(message);
}

// Update cart count badge
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Open cart
function openCart() {
    displayCartItems();
    openModal('cart-modal');
}

// Display cart items
function displayCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    
    if (cart.length === 0) {
        const emptyText = currentLanguage === 'ar' ? 'سلتك فارغة' : 'Your cart is empty';
        cartItemsDiv.innerHTML = `<p>${emptyText}</p>`;
        return;
    }
    
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        const removeText = currentLanguage === 'ar' ? 'حذف' : 'Remove';
        itemDiv.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name} x${item.quantity}</div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">${removeText}</button>
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
        const msg = currentLanguage === 'ar' ? 'سلتك فارغة!' : 'Your cart is empty!';
        alert(msg);
        return;
    }
    
    closeModal('cart-modal');
    openModal('checkout-modal');
}

// Setup modal controls
function setupModalControls() {
    const closeButtons = document.querySelectorAll('.close');
    const checkoutForm = document.getElementById('checkout-form');
    
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
        const msg = currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill in all fields';
        alert(msg);
        return;
    }
    
    // Simulate payment processing
    const totalPrice = document.getElementById('total-price').textContent;
    const msgPrefix = currentLanguage === 'ar' ? 'معالجة الدفع...\n\nشكراً لك على شرائك!\nإجمالي الطلب: $' : 'Processing payment...\n\nThank you for your purchase!\nOrder Total: $';
    alert(msgPrefix + totalPrice);
    
    // Clear cart and close modal
    cart = [];
    updateCartCount();
    closeModal('checkout-modal');
    document.getElementById('checkout-form').reset();
    
    const successMsg = currentLanguage === 'ar' ? 'تم وضع الطلب بنجاح!' : 'Order placed successfully!';
    showNotification(successMsg);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    const isArabic = currentLanguage === 'ar';
    notification.style.cssText = `
        position: fixed;
        ${isArabic ? 'left' : 'right'}: 20px;
        top: 20px;
        background: #667eea;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
        direction: ${isArabic ? 'rtl' : 'ltr'};
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