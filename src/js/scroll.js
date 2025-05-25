const scrollButton = document.querySelector('.scroll_button');
window.onscroll = function () {
    scrollFunction();
};
function scrollFunction() {
    if (document.body.scrollTop >= 300 || document.documentElement.scrollTop >= 300 && window.innerWidth <= 768) {
            scrollButton.classList.add('show_scroll_button');
        } else   {
            scrollButton.classList.remove('show_scroll_button');
        }
    }

scrollButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    })
});
