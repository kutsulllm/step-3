const btn = document.querySelector(".fork-app-dropdown")
const menu = document.querySelector(".fork-app-menu")
const li = document.querySelectorAll(".fork-app-menu-div li")
const body = document.querySelector("body")
btn.addEventListener("click", ()=>{
       btn.classList.toggle("closed")
       menu.classList.toggle("open")
       event.stopPropagation()
})
li.forEach(element =>{
    element.addEventListener('click', () => {
     li.forEach(element=>{
        element.classList.remove("fork-app-selected")     
     })
       element.classList.add('fork-app-selected')
    })
})

document.addEventListener('click', function(event) {
   const isClickInsideMenu = menu.contains(event.target);
 
   if (!isClickInsideMenu) {
      menu.classList.remove('open');
      btn.classList.add('closed')
      
   }
 });
 