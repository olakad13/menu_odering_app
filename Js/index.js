import {menuArray} from "./data.js"

//Array of selected menu
const selectedMenu = []

//This event listne, listens for all click event on the page
document.addEventListener("click", (e) => {
    if (e.target.dataset.uuid) {

        handleAddBtnClick(e.target.dataset.uuid);
        document.getElementById("hidden-message-el").style.display = "none";

    } else if (e.target.dataset.deleteId) {

        handleDeleteBtnClick(e.target.dataset.deleteId);

    } else if (e.target.id === "order-btn") {
        document.getElementById("hidden-form").style.display = "flex"
    } else if (e.target.id === "hidden-form") {
        e.target.style.display = "none"
    }
})
//This event listners is triggered when the payment form is submitted
document.getElementById("payment-form").addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("hidden-message-el").style.display = "block";
    document.getElementById("hidden-form").style.display="none"
    selectedMenu.length = 0;
    render()
})


//This function enables an ittem to be added to the food list order
function handleAddBtnClick(menuId) {
    const menuItem = menuArray.filter((menu) => {
        return menu.id == menuId
    })[0];
    
    menuItem.id = selectedMenu.length
    selectedMenu.push({
        name: menuItem.name,
        ingredients: menuItem.ingredients,
        id: selectedMenu.length,
        price: menuItem.price,
        emoji: menuItem.emoji
    })
    render()
    document.getElementById("order-section").style.display = "block"   
}


//function that handles the deletion of item ordered
function handleDeleteBtnClick(deleteId) {
    const menuSelected = selectedMenu.filter((menu) => {
        return deleteId == menu.id
    })[0]
    const indexOfItem = selectedMenu.indexOf(menuSelected)
    selectedMenu.splice(indexOfItem,1);
    render()
    document.getElementById("order-section").style.display = "block"
    if(selectedMenu.length === 0) {
        document.getElementById("order-section").style.display = "none"
    }
}

//This function forms the html string that is rendered inside the element with menu-container id
function getHtml() {
    let containerHtml = "";

    menuArray.forEach((menu) => {
        containerHtml += `
            <div class="menu" >
                <div class="menu-emoji">${menu.emoji}</div>
                <div class="menu-description">
                    <span>${menu.name}</span>
                    <span class="ingredients">${menu.ingredients}</span>
                    <span>$${menu.price}</span>
                </div>
                <div class="add-btn" data-uuid="${menu.id}">
                    +
                </div>
            </div>
        `;

    })

    let orderItemHtml = ""
    let totalPrice = 0
    

    selectedMenu.forEach((item) => {
        orderItemHtml += `
        <div class="order-item">
            <div>${item.name}</div>
            <button data-delete-id="${item.id}" class="remove-btn">remove</button>
            <div>$${item.price}</div>
        </div>
        `
        totalPrice += item.price
    })

    containerHtml += `
    <div id="order-section" class="order-section">
        <h4>Your Order</h4>
        <div class="order">
            ${orderItemHtml}
        </div>
        <div class="total-price-section">
            <div class="total-price-label">Total price:</div>
            <div class="tatal-price">$${totalPrice}</div>
        </div>
        <button id="order-btn" class="order-btn">complete order</button>
    </div>
    `

    return containerHtml
}

//This funtion renders the getHtml()  function out on the application
function render() {
    
    document.getElementById("menu-container").innerHTML = getHtml();

}

render()