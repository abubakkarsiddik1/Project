z





// const loadLessons = () => {
//     fetch("https://openapi.programming-hero.com/api/plants")
//     .then((res) => res.json())
//     .then((json) => displayLesson(json.data));  
// };

// const lodeLevelWord = (lessons) => {
//     // 1. get the container & empty
//     const cartSpinner = document.getElementById("cart-spinner")
//     cartSpinner.innerHTML= "";
//     // 2. get into every lessons
//     for(let lesson of lessons){
//     // 3. create Element

//     const btnDiv= document.createElement("div");
//     btnDiv.innerHTML= `
//     `;
//     // 4. fa-circle-question
//     }
   

//     const url = `https://openapi.programming-hero.com/api/categories`;
//     fetch(url)
//     .then(res=>res.json())
//     .then(data=>displyLevelWord(data.data));
// };

// loadLessons();


const plants = json.data || [];
renderCards(plants.slice(0,9));
}catch(e){ cardsEl.innerHTML = '<div class="text-red-600">Failed to load plants.</div>' }
finally{ show(dataSpinner,false) }
}


async function loadPlantsByCategory(id){
show(dataSpinner,true); cardsEl.innerHTML='';
try{
const res = await fetch(API_BASE + '/category/' + id);
const json = await res.json();
const plants = json.data || [];
renderCards(plants.slice(0,9));
}catch(e){ cardsEl.innerHTML = '<div class="text-red-600">Failed to load plants for this category.</div>' }
finally{ show(dataSpinner,false) }
}


function renderCards(items){
if(!items || items.length===0){ cardsEl.innerHTML = '<div class="text-sm text-gray-600">No trees found.</div>'; return }
cardsEl.innerHTML = '';
items.forEach(it=>{
const card = document.createElement('article');
card.className = 'bg-white p-4 rounded shadow flex flex-col';
const img = document.createElement('div'); img.className='h-40 bg-gray-100 rounded mb-3 flex items-center justify-center text-gray-300'; img.textContent='Image';
if(it.image || it.img) img.style.backgroundImage = `url(${it.image||it.img})`, img.style.backgroundSize='cover', img.textContent='';
const title = document.createElement('h4'); title.className='font-semibold text-emerald-800 cursor-pointer'; title.textContent = it.name || it.plant_name || 'Tree';
title.addEventListener('click', ()=>openModal(it));
const desc = document.createElement('p'); desc.className='text-sm text-gray-600 flex-1 mt-2'; desc.textContent = (it.description || it.short_description || 'A healthy, native sapling for reforestation.').slice(0,120) + '...';
const meta = document.createElement('div'); meta.className='mt-3 flex items-center justify-between gap-3';
const cat = document.createElement('div'); cat.className='text-xs text-gray-500'; cat.textContent = 'Category: ' + (it.category || it.cat || 'General');
const price = document.createElement('div'); price.className='font-semibold text-emerald-700'; price.textContent = '$' + (Number(it.price || it.cost) || (5 + Math.floor(Math.random()*15)));
const btn = document.createElement('button'); btn.className='mt-3 py-2 px-3 rounded bg-emerald-700 text-white text-sm'; btn.textContent='Add to Cart';
btn.addEventListener('click', ()=>{ addToCart({id: it.id||it.plant_id||Math.random().toString(36).slice(2), name: it.name||it.plant_name||'Tree', price: Number(it.price||it.cost) || (5 + Math.floor(Math.random()*15)) }) });


meta.appendChild(cat); meta.appendChild(price);
card.appendChild(img); card.appendChild(title); card.appendChild(desc); card.appendChild(meta); card.appendChild(btn);
cardsEl.appendChild(card);
});
}


// Modal
const modal = document.getElementById('modal'); const modalBody = document.getElementById('modal-body');
function openModal(item){ modalBody.innerHTML = '';
const title = document.createElement('h3'); title.className='text-lg font-semibold'; title.textContent = item.name || item.plant_name;
const img = document.createElement('div'); img.className='h-48 bg-gray-100 rounded mt-2 mb-3 flex items-center justify-center text-gray-300'; if(item.image||item.img){ img.style.backgroundImage = `url(${item.image||item.img})`; img.style.backgroundSize='cover'; img.textContent=''; }
const p = document.createElement('p'); p.className='text-sm text-gray-700'; p.textContent = item.description || item.long_description || 'Full details not available.';
const price = document.createElement('div'); price.className='mt-3 font-semibold text-emerald-700'; price.textContent = '$' + (Number(item.price||item.cost) || (5 + Math.floor(Math.random()*15)));
const addBtn = document.createElement('button'); addBtn.className='mt-4 py-2 px-3 rounded bg-emerald-700 text-white'; addBtn.textContent='Add to Cart'; addBtn.addEventListener('click', ()=>{ addToCart({id:item.id||item.plant_id||Math.random().toString(36).slice(2), name:item.name||item.plant_name, price: Number(item.price||item.cost) || (5 + Math.floor(Math.random()*15)) }); closeModal(); });
modalBody.appendChild(title); modalBody.appendChild(img); modalBody.appendChild(p); modalBody.appendChild(price); modalBody.appendChild(addBtn);
modal.classList.remove('hidden'); modal.classList.add('flex');
}
document.getElementById('close-modal').addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });
function closeModal(){ modal.classList.add('hidden'); modal.classList.remove('flex'); }


// Cart functions
function renderCart(){
cartItemsEl.innerHTML='';
if(CART.length===0){ cartItemsEl.textContent='No items yet'; cartTotalEl.textContent = '0.00'; return }
CART.forEach((it, idx)=>{
const row = document.createElement('div'); row.className='flex items-center justify-between';
const left = document.createElement('div'); left.className='text-sm'; left.textContent = it.name;
const right = document.createElement('div'); right.className='flex items-center gap-2';
const price = document.createElement('div'); price.className='text-sm font-semibold'; price.textContent = '$' + Number(it.price).toFixed(2);
const rem = document.createElement('button'); rem.className='text-sm text-red-600'; rem.textContent='❌'; rem.addEventListener('click', ()=>{ removeFromCart(idx) });
right.appendChild(price); right.appendChild(rem);
row.appendChild(left); row.appendChild(right);
cartItemsEl.appendChild(row);
});
const total = CART.reduce((s,i)=>s + Number(i.price || 0), 0);
cartTotalEl.textContent = total.toFixed(2);
}
function addToCart(item){ CART.push(item); renderCart(); flashCart(); }
function removeFromCart(index){ CART.splice(index,1); renderCart(); }
function flashCart(){ const cartEl = document.querySelector('aside.md\:col-span-2.bg-white'); cartEl.style.boxShadow = '0 8px 30px rgba(6,95,70,0.25)'; setTimeout(()=> cartEl.style.boxShadow = '', 600); }


// Form
document.getElementById('donation-form').addEventListener('submit', (e)=>{ e.preventDefault(); const name = document.getElementById('donor-name').value; const email = document.getElementById('donor-email').value; const count = document.getElementById('donor-count').value; alert(`Thank you ${name}! You sponsored ${count} tree(s). Confirmation will be sent to ${email}.`); e.target.reset(); });


// initial load
loadCategories(); loadAllPlants();

