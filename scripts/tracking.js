import { getOrder } from '../data/orders.js';
import { getProduct, loadProducts } from '../data/products.js';
import { calculateCartQuantity } from '../data/cart.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

async function loadPage() {
  await new Promise((resolve) => {
    loadProducts(() => {
      resolve();
    });
  });

  // 1. Get query parameters from URL
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = getOrder(orderId);
  const product = getProduct(productId);

  if (!order || !product) {
    document.querySelector('.js-order-tracking').innerHTML = `
      <div class="page-title">Order or product not found.</div>
      <a class="back-to-orders-link link-primary" href="orders.html">View all orders</a>
    `;
    return;
  }

  // 2. Find product details inside the order
  let productDetails;
  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details;
    }
  });

  // 3. Calculate delivery progress percentage
  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);

  const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;
  const progressClamped = Math.min(Math.max(percentProgress, 0), 100);

  const deliveryTimeString = deliveryTime.format('dddd, MMMM D');

  // 4. Render tracking UI
  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${deliveryTimeString}
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
      <div class="progress-label ${progressClamped < 50 ? 'current-status' : ''}">
        Preparing
      </div>
      <div class="progress-label ${progressClamped >= 50 && progressClamped < 100 ? 'current-status' : ''}">
        Shipped
      </div>
      <div class="progress-label ${progressClamped >= 100 ? 'current-status' : ''}">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${progressClamped}%;"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
  document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();
}

loadPage();

document.querySelector('.search-button').addEventListener('click', () => {
  const search = document.querySelector('.search-bar').value;
  window.location.href = `index.html?search=${search}`;
});

document.querySelector('.search-bar').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const search = document.querySelector('.search-bar').value;
    window.location.href = `index.html?search=${search}`;
  }
});
