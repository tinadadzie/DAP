// Variables
const bodyShop = document.querySelector('#bodyShop-list'),
      shoppingCartContent = document.querySelector('#cart-content tbody'),
      clearCartBtn = document.querySelector('#clear-cart');



// Listeners

loadEventListeners();

function loadEventListeners() {
     // When a new item  is added
     bodyShop.addEventListener('click', buyBodyCream);

     // When the remove button is clicked
     shoppingCartContent.addEventListener('click', removeBodycream);

     // Clear Cart Btn
     clearCartBtn.addEventListener('click', clearCart);

     // Document Ready
     document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}





// Functions
function buyBodyCream(e) {
     e.preventDefault();
     // Use delegation to find the item that was added
     if(e.target.classList.contains('add-to-cart')) {
          // read the item values
          const bodyCream = e.target.parentElement.parentElement;
      

          // read the values
          getBodyCreamInfo(bodyCream);
     }
}
// Reads the HTML information of the selected item
function getBodyCreamInfo(bodyCream) {
     // Create an Object with Cream Data
     const bodyCreamInfo = {
          image: bodyCream.querySelector('img').src,
          title: bodyCream.querySelector('h4').textContent,
          price: bodyCream.querySelector('.price span').textContent,
          id: bodyCream.querySelector('a').getAttribute('data-id')
     }
     // Insert into the shopping cart
     addIntoCart(bodyCreamInfo);
}
// Display the selected course into the shopping cart

function addIntoCart(bodyCream) {
     // create a <tr>
     const row = document.createElement('tr');

     // Build the template
     row.innerHTML = `
          <tr>
               <td>
                    <img src="${bodyCream.image}" width=100>
               </td>
               <td>${bodyCream.title}</td>
               <td>${bodyCream.price}</td>
               <td>
                    <a href="#" class="remove" data-id="${bodyCream.id}">X</a>
               </td>
          </tr>
     `;
     // Add into the shopping cart
     shoppingCartContent.appendChild(row);

     // Add item into Storage
     saveIntoStorage(bodyCream);
}

// Add the item  into the local storage

function saveIntoStorage(bodyCream) {
     let bodyShop = getBodyShopFromStorage()

     // add the item into the array
     bodyShop.push(bodyCream);

     // since storage only saves strings, we need to convert JSON into String
     localStorage.setItem('bodyShop', JSON.stringify(bodyShop) );
}

// Get the contents from storage
function getBodyShopFromStorage() {

     let bodyShop;

     // if something exist on storage then we get the value, otherwise create an empty array
     if(localStorage.getItem('bodyShop') === null) {
          bodyShop = [];
     } else {
          bodyShop = JSON.parse(localStorage.getItem('bodyShop') );
     }
     return bodyShop;

}

// remove item from the dom
function removeBodycream(e) {
     let bodyCream, bodyCreamId;

     // Remove from the dom
     if(e.target.classList.contains('remove')) {
          e.target.parentElement.parentElement.remove();
          
          bodyCream = e.target.parentElement.parentElement;
          bodyCreamId = course.querySelector('a').getAttribute('data-id');
     }
     console.log(bodyCreamId);
     // remove from the local storage
     removeBodyCreamLocalStorage(bodyCreamId);
}
// remove from local storage
function removeBodyCreamLocalStorage(id) {
     // get the local storage data
     let bodyShopLS = getBodyShopFromStorage();

     // loop trought the array and find the index to remove
     bodyShopLS.forEach(function(bodyShopLS, index) {
          if(bodyShopLS.id === id) {
               bodyShopLS.splice(index, 1);
          }
     });

     // Add the rest of the array
     localStorage.setItem('bodyShop', JSON.stringify(bodyShopLS));
}

// Clears the shopping cart
function clearCart() {
     // shoppingCartContent.innerHTML = '';

     while(shoppingCartContent.firstChild) {
          shoppingCartContent.removeChild(shoppingCartContent.firstChild);
     }

     // Clear from Local Storage
     clearLocalStorage();
}
// Clears the whole local storage
function clearLocalStorage() {
     localStorage.clear();
}

// Loads when document is ready and print item into shopping cart

function getFromLocalStorage() {
     let bodyShopLS = getBodyShopFromStorage();

     // LOOP throught the item and print into the cart
     bodyShopLS.forEach(function(bodyCream) {
          // create the <tr>
          const row = document.createElement('tr');

          // print the content
          row.innerHTML = `
               <tr>
                    <td>
                         <img src="${bodyCream.image}" width=100>
                    </td>
                    <td>${bodyCream.title}</td>
                    <td>${bodyCream.price}</td>
                    <td>
                         <a href="#" class="remove" data-id="${bodyCream.id}">X</a>
                    </td>
               </tr>
          `;
          shoppingCartContent.appendChild(row);
     });
}