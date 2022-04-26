function setTheme(){
  const darkThemeBtn = document.querySelector(".dark-mode-icon")
  const lightThemeBtn = document.querySelector(".light-mode-icon")
  
  
  const html = document.querySelector("html")
  
  let theme = localStorage.getItem("theme")
  if(theme){
    if(theme === "light"){
      darkThemeBtn.classList.add("shown")
      lightThemeBtn.classList.add("hidden")
      html.setAttribute("data-theme","light")
      
    } else if(theme === "dark"){
      darkThemeBtn.classList.add("hidden")
      lightThemeBtn.classList.add("shown")
      lightThemeBtn.classList.remove("hidden")
      
      html.setAttribute("data-theme","dark")
    }
  }
  
  darkThemeBtn.addEventListener("click", function (e){
    darkThemeBtn.classList.add("hidden")
    if(lightThemeBtn.classList.contains("hidden")) {
      lightThemeBtn.classList.remove("hidden")
    }
    lightThemeBtn.classList.add("shown")
    html.setAttribute("data-theme","dark")
    localStorage.setItem("theme", "dark")
  })
  
  lightThemeBtn.addEventListener("click", function (e){
    if( darkThemeBtn.classList.contains("hidden")) {
      darkThemeBtn.classList.remove("hidden")
    }
    darkThemeBtn.classList.add("shown")
    lightThemeBtn.classList.add("hidden")
    html.setAttribute("data-theme","light")
    localStorage.setItem("theme", "light")
  })
}

function handleChangeNavigationActive(){
  
  const navItems = document.querySelectorAll(".menu_nav li a")
  
  //we add active class in last match nav items. because home / always match
  let n;
  navItems.forEach(item=>{
    let isActive = window.location.pathname.indexOf((item as HTMLAnchorElement).pathname)
    if(isActive !== -1){
      n = item.parentElement
      item.parentElement.classList.remove("active")
    } else {
      item.parentElement.classList.remove("active")
    }
  })
  if(n){
    console.log(n)
    n.classList.add("active")
  }
}


document.addEventListener("DOMContentLoaded", function(){

  setTheme()
  handleChangeNavigationActive()
  
  window.document.addEventListener("scroll", (e)=>{
     const navigation = document.getElementById("navigation")
     const scrollTop = document.body.scrollTop
     if(scrollTop > 300){
       // shown navigation bar when body scroll top 1500px
        if(!navigation.classList.contains("fixed-navigation")){
          navigation.classList.remove("fixed-navigation__remove")
          navigation.classList.add("fixed-navigation")
        }
      } else if(scrollTop < 400) {
       // reverse hidden navigation bar
        navigation.classList.remove("fixed-navigation")
        navigation.classList.add("fixed-navigation__remove")

      } if(scrollTop < 10){
      // shown navigation bar and position fixed remove when body scroll top 1500px
        navigation.classList.remove("fixed-navigation")
        navigation.classList.remove("fixed-navigation__remove")
      }

   })
  
  
})