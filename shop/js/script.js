'use strict';

const navbarTogglerIcon = document.querySelector('.navbar-toggler-icon');
navbarTogglerIcon.addEventListener('click', () => {
  navbarTogglerIcon.classList.toggle('btn-close');
});

/* swiper js discount =========================================================== */
var swiper = new Swiper('.discount-swiper', {
  spaceBetween: 50,
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 2000,
  },
  /*     pagination: {
      el: ".swiper-pagination",
      clickable: true,
    }, */
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
    },
    480: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 5,
    },
  },
});

/* swiper js fashion =========================================================== */
var swiper = new Swiper('.fashion-swiper', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 2000,
  },
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

/* register/form validation =========================================================== */
const form = document.querySelector('.register-form');
const email = document.querySelector('.register-email input');
const password = document.querySelector('.register-pass input');
const passwordRepeat = document.querySelector('.register-pass-2 input');
const submit = document.querySelector('.register-submit');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formValidation();
});

/* check if is email or not ==========*/
const isEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/* error function ========= */
const setError = (element, message) => {
  element.nextElementSibling.innerText = message;
  element.nextElementSibling.classList.remove('visually-hidden');
  element.classList.add('error');
  element.classList.remove('success');
};

/* success function ========= */
const setSuccess = (element) => {
  element.nextElementSibling.innerText = '';
  element.classList.add('success');
  element.classList.remove('error');
};

/* form validation function */
const formValidation = () => {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const passwordRepeatValue = passwordRepeat.value.trim();

  if (emailValue === '') {
    setError(email, 'لطفا ایمیل خود را وارد کنید');
  } else if (!isEmail(emailValue)) {
    setError(email, 'ایمیل وارد شده معتبر نیست');
  } else {
    setSuccess(email);
  }

  if (passwordValue === '') {
    setError(password, 'لطفا رمز خود را وارد کنید');
  } else if (passwordValue.length < 8) {
    setError(
      password,
      'رمز عبور صحیح نیست(رمز باید حداقل دارای هشت کاراکتر باشد)'
    );
  } else {
    setSuccess(password);
  }

  if (passwordRepeatValue === '') {
    setError(passwordRepeat, 'لطفا رمز خود را وارد کنید');
  } else if (passwordRepeatValue !== passwordValue) {
    setError(passwordRepeat, 'رمز عبور با تکرار آن مطابقت ندارد');
  } else {
    setSuccess(passwordRepeat);
  }
};

/* dark/light mood =========================================================== */
const darkMood = document.querySelector('.dark-mood-container');
const darkMoodIcon = document.querySelector('.dark-mood-icon');
const lightMoodIcon = document.querySelector('.light-mood-icon');

const darkMoodChildren = darkMood.querySelectorAll('.mood-icon');

darkMoodChildren.forEach((icon) => {
  icon.addEventListener('click', (e) => {
    darkMoodIcon.classList.toggle('d-none');
    lightMoodIcon.classList.toggle('d-none');

    if (e.target.classList.contains('dark-mood-icon')) {
      document.documentElement.style.setProperty('--primary-color', '#2b2d42');
      document.documentElement.style.setProperty(
        '--secondary-color',
        '#e0dfdf85'
      );
      document.documentElement.style.setProperty('--black-color', '#fff');
      document.documentElement.style.setProperty('--white-color', '#000');
    } else {
      document.documentElement.style.setProperty(
        '--secondary-color',
        '#2b2d42'
      );
      document.documentElement.style.setProperty(
        '--primary-color',
        '#e0dfdf85'
      );
      document.documentElement.style.setProperty('--white-color', '#fff');
      document.documentElement.style.setProperty('--black-color', '#000');
    }
  });
});

/* shopping cart =========================================================== */
const shopCartContainer = document.querySelector('.shopping-cart-container');
const shopCartBtn = document.querySelector('.shopping-cart-btn');
const shop = document.querySelector('.shop');
const shopContainer = document.querySelector('.shop-container');
const shopBtnClose = document.querySelector('.shop-btn-close');
const navbarSection = document.querySelector('.navbar-section');
const cardRow = document.querySelector('.card-product-row');
const shopCartCount = document.querySelector('.shopping-cart-count');
const mainBtn = document.querySelectorAll('.main-btn');
const totalQuantity = document.querySelector('.total-quantity');
const totalBenefit = document.querySelector('.total-benefit');
const totalPrice = document.querySelector('.total-price');
let count = 0;
let cardItems = [];

/* open shop part ========== */
shopCartContainer.addEventListener('click', () => {
  shop.classList.remove('d-none');
  shopContainer.classList.add('active');
  navbarSection.classList.remove('sticky-top');
});

/* close shop part by btn ========== */
shopBtnClose.addEventListener('click', () => {
  shop.classList.add('d-none');
  navbarSection.classList.add('sticky-top');
});

/* close shop part ========== */
shop.addEventListener('click', (e) => {
  if (e.target.closest('.shop') && !e.target.closest('.shop-container')) {
    shop.classList.add('d-none');
    navbarSection.classList.add('sticky-top');
  }
});

mainBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    const parent = btn.closest('.card-product');
    const product = {
      name: parent.querySelector('.card-product-title').innerText,
      image: parent.querySelector('.card-product-img').getAttribute('src'),
      value: parent.getAttribute('value'),
      quantity: parent.getAttribute('data-quantity'),
      price: parent.querySelector('.card-product-price-after').innerText,
      discount: parent.querySelector('.card-product-price-before').innerText,
    };

    const exist =
      cardItems.filter((item) => item.value === product.value).length > 0;
    /*       cardItems.some((item) => item.value === product.value);
     */
    if (!exist) {
      cardItems.push(product);
      addToDom(product);
    } else {
      alert('این محصول در سبد موجود است');
    }

    const cardDomItem = document.querySelectorAll('.shop-card');
    cardDomItem.forEach((item) => {
      if (item.getAttribute('value') === product.value) {
        increase(item, product);
        decrease(item, product);
        removeAll(item, product);
      }
    });

    calculateTotal();
  });
});
/* add product to dom =============== */
const addToDom = (pro) => {
  let html = `
  <div class="card shop-card px-0 mb-3 w-100 data-quantity="1"  value="${pro.value}">
  <div class="row g-0">
      <div class="col-sm-3 shop-card-img-container">
          <img src="${pro.image}" class="rounded-start shop-card-img" alt="...">
      </div>
      <div class="col-sm-9 d-flex align-items-center shop-card-body-container">
          <div class="card-body shop-card-body">
              <div class="card-text shop-card-text d-flex justify-content-evenly align-items-baseline">
                  <span class="category-name fw-bold">${pro.name}</span>
                  <span class="minus bg-warning fs-5">&minus;</span>
                  <span class="quantity">${pro.quantity}</span>
                  <span class="plus bg-success fs-5">&plus;</span>
                  <span class="price">${pro.price}</span>
                  <span class="remove-all bg-danger fs-5">&times;</span>
              </div>
          </div>
      </div>
  </div>
</div>
  `;
  cardRow.insertAdjacentHTML('beforeend', html);
};

/* calculate total numbers =============== */
const calculateTotal = () => {
  let total = 0;
  let totalDis = 0;
  let totalNumber = 0;

  cardItems.forEach((card) => {
    total += card.quantity * card.price;
    totalDis += card.quantity * card.discount;
    totalNumber += +card.quantity;
  });
  totalPrice.innerText = total;
  totalBenefit.innerText = totalDis - total;
  totalQuantity.innerText = +totalNumber;
  shopCartCount.innerText = +totalNumber;
};
/* change numbers =============== */
const increase = (item, pro) => {
  item.querySelector('.plus').addEventListener('click', () => {
    cardItems.forEach((cartItem) => {
      if (cartItem.value === pro.value) {
        item.querySelector('.quantity').innerText = ++cartItem.quantity;

        calculateTotal();
      }
    });
  });
};

const decrease = (item, pro) => {
  item.querySelector('.minus').addEventListener('click', () => {
    cardItems.forEach((cartItem) => {
      if (cartItem.value === pro.value) {
        if (cartItem.quantity > 1) {
          item.querySelector('.quantity').innerText = --cartItem.quantity;
        } else {
          cardItems = cardItems.filter(
            (element) => element.value !== pro.value
          );
          item.remove();
        }

        calculateTotal();
      }
    });
  });
};

/* remove a product */
const removeAll = (item, pro) => {
  item.querySelector('.remove-all').addEventListener('click', () => {
    cardItems.forEach((cartItem) => {
      if (cartItem.value === pro.value) {
        cardItems = cardItems.filter((element) => element.value !== pro.value);

        item.remove();
        calculateTotal();
      }
    });
  });
};

/* filter product ==================================================== */
const cardProduct = document.querySelectorAll('.card-product');
const filterBtn = document.querySelectorAll('.filter-btn');
filterBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    cardProduct.forEach((card) => {
      let title = card.querySelector('.card-product-title').innerText;
      if (btn.innerText !== title) {
        card.parentElement.classList.add('d-none');
      }
      if (btn.innerText === title) {
        card.parentElement.classList.remove('d-none');
      }
      if (btn.innerText === 'همه') {
        card.parentElement.classList.remove('d-none');
      }
    });
  });
});

/* calculate and add discount to DOM ================================= */
const calculateDiscount = () => {
  let htmlBadge = `
  <span class="badge text-bg-danger position-absolute"></span>
  `;
  cardProduct.forEach((card) => {
    const priceAfter = card.querySelector(
      '.card-product-price-after'
    ).innerText;
    const priceBefore = card.querySelector(
      '.card-product-price-before'
    ).innerText;
    const finalPrice = (100 - (priceAfter * 100) / priceBefore).toFixed();

    const cardProductBody = card.querySelector('.card-product-body');
    addDiscount(finalPrice, cardProductBody);
  });
};
const addDiscount = (price, cardBody) => {
  let htmlBadge = `
  <span class="badge text-bg-danger position-absolute">${price}%</span>
  `;

  cardBody.insertAdjacentHTML('beforebegin', htmlBadge);
};

calculateDiscount();


/* progress bar ================================= */
const progressBar = document.querySelector('.progress-bar');
window.addEventListener('scroll', () => {
  let totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scroll = window.scrollY;
  let bar=112 * (scroll / totalHeight);
  console.log(bar);
  progressBar.style.width = `${bar}%`;
});
