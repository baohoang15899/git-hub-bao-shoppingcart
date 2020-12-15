let buttonOrder = document.querySelectorAll(".order__content-btn")
let order =document.querySelector('#orderList')
let final = document.querySelector('.cart__total-final')
let sub = document.querySelector('.cart__total-subTotal')
let itemInCart = document.querySelector('.numberCart')
let checkOutBtn = document.querySelector('.cart__total-checkout')
let message = document.querySelector('.cart__total-message')
let menuBtn = document.querySelector('.fa-bars')
let menuContent = document.querySelector('.header__content-menu')
let slideBtn = document.querySelectorAll('.slide__content-dot')
let cartMobile = document.querySelector('.mobile-cart')
let slideImg = document.querySelectorAll('.slide__content-dish')
///-------------------------------SHOPPING CART-------------------------------

let cart = {
    init:function(){
        add()
        display()
    }
}

function item(name,price,quantity,id){
    this.id = id
    this.name = name
    this.price = price
    this.quantity = quantity
}

function checkOut(number){
    if (checkOutBtn) {
        checkOutBtn.addEventListener("click",()=>{
            if (number > 0) {
                message.style.color="rgb(23, 247, 23)"
                message.innerText = "Success !"
                localStorage.removeItem("bao_shopping_cart_food")
                localStorage.removeItem("bao_shopping_cart_inCart")
            }
            else{
                message.style.color="rgb(241, 21, 21)"
                message.innerText = "Your Cart Is Empty !"
            }
            display()
        })
    }
}

function updateQuantity(i,quantity){
    let food
    if (localStorage.getItem("bao_shopping_cart_food")===null) {
        food=[]
    } else {
        food = JSON.parse(localStorage.getItem("bao_shopping_cart_food"))
    }
    if (quantity <1) {
        return
    }
    food[i].quantity = quantity
    localStorage.setItem("bao_shopping_cart_food",JSON.stringify(food))
    display()
}

function inCartItem(item){
    let number
    if (localStorage.getItem("bao_shopping_cart_inCart")===null) {
        number=0
    } else {
        number = JSON.parse(localStorage.getItem("bao_shopping_cart_inCart"))
    }
    number = item
    itemInCart.innerText = number
    cartMobile.innerText = number
    localStorage.setItem("bao_shopping_cart_inCart",JSON.stringify(number))
}
//----------------------- render ----------------------
function display(){
    let inCart = 0
    let total = 0
    let ship = 10
    let food
    if (localStorage.getItem("bao_shopping_cart_food")===null) {
        food=[]
    } else {
        food = JSON.parse(localStorage.getItem("bao_shopping_cart_food"))
    }
    let content = food.map(item=>
        `<li>
        <span class="name">${item.name}</span>
        <span class="quantity">
            <button class="ins">+</button>
            <input class="box" type="number" name="" id="" min="1" max="99" value=${item.quantity}>
            <button class="des">-</button>
        </span>
        <span class="price">${ item.price*item.quantity+"$"}</span>
        <span class="delete">
            <button class="remove">Delete</button>
        </span>
    </li>`
    )
    if (order) {
        order.innerHTML = content.join('')
    }
    let box = document.querySelectorAll('.box')
    box.forEach((box,index)=>{
        box.addEventListener('change',()=>{
            if (box.value <= 0) {
                return box.value = 1
            }
            updateQuantity(index, parseInt(box.value))
        })
    })

    let insBtn = document.querySelectorAll('.ins')
    insBtn.forEach((btn,index)=>{
        btn.addEventListener('click',()=>{
            updateQuantity(index, ++food[index].quantity)
        })
    })

    let desBtn = document.querySelectorAll('.des')
    desBtn.forEach((btn,index)=>{
        btn.addEventListener('click',()=>{
            updateQuantity(index, --food[index].quantity)
        })
    })

    let removeBtn = document.querySelectorAll('.remove')
    removeBtn.forEach((btn,index)=>{
        btn.addEventListener("click",()=>{
            remove(index)
        })
    })

    food.forEach(perFood=>{
        total += perFood.quantity*perFood.price
        inCart += perFood.quantity
    })

    inCartItem(inCart)
    checkOut(inCart)
    let price = total + ship

    if (sub) {
        sub.innerText = "Sub Total: "+parseInt(total) +" $ "
    }

    if (final) {
        final.innerText = "Total: "+parseInt(price) +" $ "
    }
}

function remove(index){
    let food
    if (localStorage.getItem("bao_shopping_cart_food")===null) {
        food=[]
    } else {
        food = JSON.parse(localStorage.getItem("bao_shopping_cart_food"))
    }
    food.splice(index,1)
    localStorage.setItem("bao_shopping_cart_food",JSON.stringify(food))
    display()
}

function save(data){
    let food
    if (localStorage.getItem("bao_shopping_cart_food")===null) {
        food=[]
    } else {
        food = JSON.parse(localStorage.getItem("bao_shopping_cart_food"))
    }
    let check = food.find(id => id.id === data.id)
    if (check) {
       check.quantity+=1
    }else{
        food.push(data)
    }
    localStorage.setItem("bao_shopping_cart_food",JSON.stringify(food))
}


function add(){
    buttonOrder.forEach((btn,i)=>{
        btn.addEventListener('click',(e)=>{
            let clicked = e.target
            let parent = clicked.parentElement.parentElement
            let name = parent.querySelector('.order__content-foodTitle').innerText
            let price = parent.querySelector('.order__content-foodDescription').innerText
            let Item = new item()
            Item.id = i+5
            Item.name = name
            Item.price = parseInt(price)
            Item.quantity = 1
            save(Item)
            display()
        })
    })
}

cart.init()
///-------------------------------MENU-------------------------------
let menu = {
    show:()=>{
        menuBtn.addEventListener('click',()=>{
            menuContent.classList.toggle('show')
        })
    }
}
menu.show()

let slide = {
    init:()=>{
        if(slideBtn){
            slideBtn.forEach((btn,index)=>{
                slideImg[1].classList.add('show')
                slideBtn[1].classList.add('show')
                btn.addEventListener('click',()=>{
                    slideBtn.forEach((bt,index)=>{
                        slideImg[index].classList.remove('show')
                        bt.classList.remove('show')
                    })
                    btn.classList.add('show')
                    slideImg[index].classList.add('show')
                })
            })
        }
        if(slideImg){
            slideImg.forEach((img,index)=>{
                img.addEventListener("click",()=>{
                    slideImg.forEach((bt,index)=>{
                        slideBtn[index].classList.remove('show')
                        bt.classList.remove('show')
                    })
                    slideBtn[index].classList.add('show')
                    img.classList.add('show')
                })
            })
        }
    }
}
slide.init()