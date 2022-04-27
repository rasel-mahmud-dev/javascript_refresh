




function setTheme(){
  const darkThemeBtn = document.querySelector(".dark-mode-icon") as HTMLAnchorElement
  const lightThemeBtn = document.querySelector(".light-mode-icon") as HTMLAnchorElement
  
  
  const html = document.querySelector("html") as HTMLHtmlElement
  
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
  let n: any;
  navItems.forEach((item: any)=>{
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


function toggleSubNavMenu(){
  let sub_menu_item = document.querySelector(".sub_menu_item") as HTMLLIElement
  sub_menu_item.addEventListener("click", function (e){
    let subMenu  = sub_menu_item.nextElementSibling as HTMLDivElement
    
    if(subMenu.classList.contains("open_submenu")){
      subMenu.classList.add("hide_submenu")
      subMenu.classList.remove("open_submenu")
    } else {
      subMenu.classList.add("open_submenu")
      subMenu.classList.remove("hide_submenu")
    }
    // alert("df")
  })
}

function toggleCollapseNavigationBar(){
  let menuBarsIcon = document.querySelector(".menu-bars-icon") as HTMLDivElement
  let menuNav = document.querySelector(".menu_nav") as HTMLDivElement
  
  menuBarsIcon.addEventListener("click", function (){
    if(menuNav.classList.contains("mobile_nav_expand")){
      menuNav.classList.remove("mobile_nav_expand")
      menuNav.classList.add("mobile_nav_collapse")
      menuNav.style.height = String(0)
    } else {
      menuNav.classList.remove("mobile_nav_collapse")
      menuNav.classList.add("mobile_nav_expand")
      menuNav.style.height = menuNav.scrollHeight + "px"
    }
  })
}

function handleWindowResizeEvent(){
  
  let main = document.querySelector("main.container") as HTMLDivElement
  let navigation = document.querySelector("#navigation") as HTMLDivElement
  const contentHeight = main.offsetHeight + navigation.offsetHeight;
  if(contentHeight < window.innerHeight){
    let footer = document.querySelector(".footer") as HTMLDivElement
    main.style.minHeight = `calc(100vh - ${navigation.offsetHeight + footer.offsetHeight}px)`
  }
  
  let menuNav = document.querySelector(".menu_nav") as HTMLDivElement
  window.addEventListener("resize", function(e){
    if(window.innerWidth < 600){
      menuNav.classList.remove("mobile_nav_expand")
      // @ts-ignore
      menuNav.style.height = 0
    }
  })
  
}


document.addEventListener("DOMContentLoaded", function(){

  handleWindowResizeEvent()
  
  setTheme()
  handleChangeNavigationActive()
  toggleSubNavMenu()
  toggleCollapseNavigationBar()
  
  window.document.addEventListener("scroll", (e)=>{
     const navigation = document.getElementById("navigation") as HTMLDivElement
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