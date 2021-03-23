function display_toggle(element, hierarchy){
    element.nextElementSibling.classList.toggle("display");
    element.nextElementSibling.style.paddingLeft = hierarchy * 5 + "px";
}