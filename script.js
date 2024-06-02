document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartItemsContainer = document.querySelector('.cart-items');

    // Загрузка товаров из localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Функция для отображения товаров в корзине
    const renderCartItems = () => {
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            cartItems.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <p>${item.name}</p>
                    <button class="remove-btn" data-index="${index}">Удалить</button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });

            // Добавление обработчиков событий к кнопкам удаления
            const removeButtons = document.querySelectorAll('.remove-btn');
            removeButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const index = event.target.getAttribute('data-index');
                    removeFromCart(index);
                });
            });
        }
    };

    // Функция для добавления товара в корзину
    const addToCart = (product) => {
        cartItems.push(product);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
    };

    // Функция для удаления товара из корзины
    const removeFromCart = (index) => {
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
    };

    // Добавление обработчиков событий к кнопкам "Добавить в корзину"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            const productName = button.getAttribute('data-product-name');
            const product = { id: productId, name: productName };
            addToCart(product);
        });
    });

    // Отображение товаров в корзине при загрузке страницы
    renderCartItems();
});
