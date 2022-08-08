
const route = event => {
    event = event || window.event; 
    // Internet Explorer에는 event가 존재하지 않아 필요한 문법. 
    event.preventDefault();
    // button에서는 submit을 막는다. 
    window.history.pushState({}, "", event.target.href);
    handleLocation(); 
}

const routes = {
    404: "/pages/404.html",
    "/": "/pages/index.html",
    "/about": "/pages/about.html",
    "/lorem": "/pages/lorem.html",
}

const handleLocation = async () => {
    const path = window.location.pathname; 
    const route = routes[path] || routes[404]; 
    const html = await fetch(route).then((data) => data.text()); 
    document.getElementById("main-page").innerHTML = html; 
}

window.onpopstate = handleLocation; 
window.route = route; 

handleLocation(); 