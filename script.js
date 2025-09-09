const categoryContainer = document.getElementById('categoryContainer')


const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/plants')
    .then(res => res.json())
    .then(data => {
      const plants = data.plants
      // console.log(plants)
      showCategory(plants)
      
    })
    .catch(err => {
     console.log(err);
    });
  };

const showCategory = (plants) => {
  plants.forEach(plan => {
    categoryContainer.innerHTML += `
        <li id="${plan.id}" class="px-3 py-2 bg-green-100 rounded hover:bg-green-200 text-left">
          ${plan.title}
        </li>`
    
});

    categoryContainer.addEventListener('click', (e) =>{
      if (e.target === 'li');
      console.log(e.target)
      e.target.classList.add('border-b-4')
    })
}


loadCategory ();

  
  
  
  
  
  
  
  
  
  
  
  // Example JS: Button interaction
    // document.getElementById('getInvolvedBtn').addEventListener('click', () => {
    //   alert("Thank you for joining the mission! 🌱");
    // });
 
