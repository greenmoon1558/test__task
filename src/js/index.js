let sidebar = document.getElementById("sidebar");
let main = document.getElementById("main");
 
 function sidebar_toggle(e){
    if(!sidebar.style.display) {
        sidebar.style.display = "flex";
        main.style.marginLeft = "80px";
    } else {
        sidebar.style.display = "";
        main.style.marginLeft = "0px";
    }
}

 document.getElementById("menu__toggle_button").onclick = sidebar_toggle;