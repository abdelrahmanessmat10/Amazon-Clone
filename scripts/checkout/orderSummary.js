import { cart, deleteFromCart, updateDeliveryOption, updateQuantity } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js'
import { renderPaymentSummary } from './paymentSummary.js';



export function renderOrderSummary() {

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryTime, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');


    cartSummaryHTML += `
      <div class="cart-item-container
      js-cart-item-container js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: ${dateString}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
              ${matchingProduct.name}
              </div>
              <div class="product-price">
               ${matchingProduct.getPrice()}
              </div>
              <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                <span>
                  Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                  Update
                </span>
                <select class="quantity-input js-quantity-input-${matchingProduct.id}">
                  <option value="1" ${cartItem.quantity === 1 ? 'selected' : ''}>1</option>
                  <option value="2" ${cartItem.quantity === 2 ? 'selected' : ''}>2</option>
                  <option value="3" ${cartItem.quantity === 3 ? 'selected' : ''}>3</option>
                  <option value="4" ${cartItem.quantity === 4 ? 'selected' : ''}>4</option>
                  <option value="5" ${cartItem.quantity === 5 ? 'selected' : ''}>5</option>
                  <option value="6" ${cartItem.quantity === 6 ? 'selected' : ''}>6</option>
                  <option value="7" ${cartItem.quantity === 7 ? 'selected' : ''}>7</option>
                  <option value="8" ${cartItem.quantity === 8 ? 'selected' : ''}>8</option>
                  <option value="9" ${cartItem.quantity === 9 ? 'selected' : ''}>9</option>
                  <option value="10" ${cartItem.quantity === 9 ? 'selected' : ''}>10</option>
                </select>
                <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">
                  Save
                </span>
                <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}" >
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
          </div>
        </div>
    `;
  });

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;


  //show input field when clicking update
  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
    });
  });

  document.querySelectorAll('.js-save-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      const newQuantity = Number(quantityInput.value);

      // ensure value is between 1 and 9
      if (newQuantity <= 0 || newQuantity >= 11 || isNaN(newQuantity)) {
        alert('Quantity must be between 1 and 9');
        return;
      }

      updateQuantity(productId, newQuantity);

      // Remove editing class
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');

      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
      quantityLabel.innerHTML = newQuantity;

      renderPaymentSummary();
    });
  });





  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryTime, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      const priceSrting = deliveryOption.priceCents !== 0 ? `${formatCurrency(deliveryOption.priceCents)} -` : 'FREE';

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
                  <div class="delivery-option js-delivery-option"
                  data-product-id="${matchingProduct.id}"
                  data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio" 
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        ${dateString}
                      </div>
                      <div class="delivery-option-price">
                        $${priceSrting} Shipping
                      </div>
                    </div>
                  </div>
      `;
    });

    return html;
  }

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      deleteFromCart(productId);



      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();

      renderPaymentSummary();

    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();

    });
  });

}