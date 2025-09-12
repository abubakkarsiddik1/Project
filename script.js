const categoriesList = document.getElementById('categories');
const cardsContainer = document.getElementById('cardsContainer');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

let cart = []; 


const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data => {
      const plants = data.plants;
      showCategory(plants);
    })
    .catch((err) => {
      console.log(err);
    });
};

const showCategory = (plants) => {
  categoriesList.innerHTML = "";
  plants.forEach((plan) => {
    categoriesList.innerHTML += `
      <li id="${plan.id}" class="px-3 py-2 bg-green-100 rounded hover:bg-green-200 border-red-600 text-left cursor-pointer">
        ${plan.title}
      </li>`;
  });

  categoriesList.addEventListener('click', (e) => {
    const allLi = document.querySelectorAll('#categories li');
    allLi.forEach((li) => {
      li.classList.remove('border-b-4')
    });

    if (e.target.tagName === 'LI') {
      e.target.classList.add('border-b-4');
      loadGreenByCategory(e.target.id)
    }
  });
};

// Load by category
const loadGreenByCategory = (categoryid) => {
  fetch(`https://openapi.programming-hero.com/api/category/${categoryid}`)
    .then((res) => res.json())
    .then(data => {
      showGreenByCategory(data.plants)
    })
    .catch(err => {
      console.log(err)
    })
};


const showGreenByCategory = (plants) => {
  cardsContainer.innerHTML = "";
  plants.forEach(plant => {
    const card = document.createElement("div");
    card.className = "mt-4";

    card.innerHTML = `
      <div class="text-lg md:text-xl font-semibold">
        <img src="${plant.image}" alt="${plant.name}" class="mx-auto mb-2 w-full h-30 object-cover rounded">
        <h4 class="text-lg md:text-xl font-semibold">${plant.name}</h4>
        <p class="text-gray-600 text-sm md:text-base mt-1">${plant.description}</p>
        <p class="bg-[#DCFCE7] px-3 py-1 rounded-full text-xs md:text-sm ">${plant.category}</p>
        <p class="text-gray-800 font-bold ">${plant.price}</p>
        <button 
          data-id="${plant.id}"
          data-name="${plant.name}"
          data-price="${plant.price}"
          class="add-to-cart w-full py-2 mt-2 rounded font-semibold cta-yellow bg-[#15803D] rounded-full text-white">
          Add to Cart
        </button>
      </div> 
    `;

    cardsContainer.appendChild(card);
  });

 
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const name = e.target.dataset.name;
      const price = parseFloat(e.target.dataset.price);

      addToCart({ id, name, price });
    });
  });
};


const addToCart = (plant) => {
  const existing = cart.find(item => item.id === plant.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...plant, quantity: 1 });
  }
  renderCart();
};


const removeFromCart = (id) => {
  cart = cart.filter(item => item.id !== id);
  renderCart();
};


const renderCart = () => {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "No items yet";
  } else {
    cart.forEach(item => {
      cartItemsContainer.innerHTML += `
        <div class="flex justify-between items-center bg-green-50 px-2 py-1 rounded">
          <div>
            <p>${item.name}</p>
            <p class="text-gray-600 text-xs">${item.price} × ${item.quantity}</p>
          </div>
          <button onclick="removeFromCart('${item.id}')" class="text-black"> X </button>
        </div>
      `;
    });
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotalElement.textContent = total.toFixed(2);
};

loadCategory();
loadGreenByCategory('1');
