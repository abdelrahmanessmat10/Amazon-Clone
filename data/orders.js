export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order); //add to the fron of the array 
  saveToStorage(order);
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}