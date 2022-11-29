import './main.scss';

async function fetchAsync() {
    let response = await fetch(
      "https://random-data-api.com/api/users/random_user?size=50"
    );
    let dataUser = await response.json();
    let section = document.querySelector(".section");
    const addCart = document.querySelector("#addCart");
    const removeCart = document.querySelector("#removeCart");
    const fillSection = document.querySelector("#fillSection");
    const clearSection = document.querySelector("#clearSection");
    let modal = document.querySelector(".openModal");
    let hoverBody = document.querySelector(".hover");
    let counter = 0;
    let imgC = 0;
  
    function addCartToSection() {
      let cart = document.createElement("div");
      let NameUser = document.createElement("div");
      let gender = document.createElement("div");
      let userName = document.createElement("div");
      let emailUser = document.createElement("div");
      let passUser = document.createElement("div");
      let btnDelete = document.createElement("button");
      let moreInfo = document.createElement("button");
  
      cart.classList.add(`cart`);
  
      NameUser.innerText = `Name: ${dataUser[counter].first_name} ${dataUser[counter].last_name}`;
      gender.innerText = `Gender: ${dataUser[counter].gender}`;
      userName.innerText = `UserName: ${dataUser[counter].username}`;
      emailUser.innerText = `email: ${dataUser[counter].email}`;
      passUser.innerText = `password: ${dataUser[counter].password}`;
      btnDelete.innerText = `DELETE`;
      moreInfo.innerText = `More Info`;

      moreInfo.classList.add('moreInfo')
  
      cart.appendChild(NameUser);
      cart.appendChild(gender);
      cart.appendChild(userName);
      cart.appendChild(emailUser);
      cart.appendChild(passUser);
      cart.appendChild(btnDelete);
      cart.appendChild(moreInfo);
      section.appendChild(cart);
  
      NameUser.classList.add("bg");
      gender.classList.add("bg");
      userName.classList.add("bg");
      emailUser.classList.add("bg");
      passUser.classList.add("bg");
      btnDelete.classList.add("bg");
      moreInfo.classList.add("bg");
  
      btnDelete.addEventListener("click", removeCurrentCart);
  
      // document.querySelectorAll('.cart').forEach((e,i)=>{
      //   e.addEventListener('click', ()=> imgC = i )
      // })

      
  
      document.querySelectorAll('.moreInfo').forEach((e,i)=> {
        e.addEventListener('click', () => imgC = i)
        
      })

      moreInfo.addEventListener("click", function () {
        
        hoverBody.classList.add("active");
        modal.classList.add("active");
        document.querySelector('.userAvatar').classList.add('bg');
        document
          .querySelector(".userAvatar img")
          .setAttribute("src", dataUser[imgC].avatar);
        document.querySelector(".close").addEventListener("click", function () {
          hoverBody.classList.remove("active");
          modal.classList.remove("active");
        });
        setTimeout(() => {
          document.querySelector('.userAvatar').classList.remove("cart", "bg");
        }, 3000);
      });
  
      function removeCurrentCart() {
        let currentCart = this.parentElement;
        currentCart.remove();
      }
  
      setTimeout(() => {
        NameUser.classList.remove("cart", "bg");
        gender.classList.remove("cart", "bg");
        userName.classList.remove("cart", "bg");
        emailUser.classList.remove("cart", "bg");
        passUser.classList.remove("cart", "bg");
        btnDelete.classList.remove("cart", "bg");
        moreInfo.classList.remove("cart", "bg");
      }, 3000);
    }
  
    addCart.addEventListener("click", function () {
      if (counter >= 50) {
        counter = 0;
        addCartToSection();
      } else {
        addCartToSection();
        counter++;
      }
    });
  
    removeCart.addEventListener("click", function () {
      section.removeChild(document.querySelector(".cart"));
    });
  
    fillSection.addEventListener("change", function () {
      let sectionHeight = section.offsetHeight;
      let startAddCarts = null;
      if (this.checked) {
        counter++;
        addCartToSection();
  
        startAddCarts = setInterval(() => {
          counter++;
          addCartToSection();
          sectionHeight = section.offsetHeight;
          if (sectionHeight >= window.screen.height || !this.checked) {
            clearInterval(startAddCarts);
            section.removeChild(document.querySelector(".cart"));
          }
        }, 1000);
      }
    });
  
    clearSection.addEventListener("click", function () {
      document.querySelector("#fillSection").checked = false;
      let cartCounter = document.querySelectorAll(".cart");
      for (let i = 0; i < cartCounter.length; i++) {
        if (i == 0) continue;
        else cartCounter[i].remove();
      }
    });
  
    function populate() {
      while (true) {
        let windowRelativeBottom =
          document.documentElement.getBoundingClientRect().bottom;
        if (windowRelativeBottom > document.documentElement.clientHeight + 100)
          break;
        let sectionWidth = section.clientWidth;
        let cartWidth = document.querySelector(".cart").clientWidth;
        let sectionListCart = Math.floor(sectionWidth / cartWidth);
        for (let i = 0; i < sectionListCart - 1; i++) {
          counter++;
          addCartToSection();
        }
      }
    }
  
    window.addEventListener("scroll", function () {
      if (document.querySelector("#fillSection").checked) populate();
    });
  }
  function loadData() {
    return new Promise((resolve, reject) => {
      fetchAsync();
      setTimeout(resolve, 2000);
    });
  }
  
  loadData().then(() => {
    let preloaderEl = document.getElementById("preloader");
    preloaderEl.classList.add("hidden");
    preloaderEl.classList.remove("visible");
  });
  