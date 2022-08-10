const list = document.querySelector('.slide__list');
const items = document.querySelectorAll('.slide__item');

const buttons = document.querySelector('.buttons');

const paginations = document.querySelector('.paginations');

const lastIndex = items.length - 1;
let selected = 0;
let interval;

// value값으로 style.transition 지정
const setTransition = (value) => {
  list.style.transition = value;
};

// index를 통해 위치를 조정하는 것. 
const setTranslate = ({ index, reset }) => {
  if (reset) list.style.transform = `translate(-${list.clientWidth}px, 0)`;
  else list.style.transform = `translate(-${(index + 1) * list.clientWidth}px, 0)`;
};

// 위치 이동기 live한 값을 on이라 지칭(=> 내가 hidden으로 컨트롤하는 것과 같은 느낌.)
const activePagination = (index) => {
  [...paginations.children].forEach((pagination) => {
    pagination.classList.remove('on');
  });
  paginations.children[index].classList.add('on');
};

// <-- 나머지 함수는 여기부터 작성해 주세요!

// Make prev and next buttons.
const handlePrev = () => {
    selected -= 1;
    setTransition('transform 0.3s linear');
    setTranslate({ index: selected });
    if (selected < 0) {
      selected = lastIndex;
      setTimeout(() => {
        setTransition('');
        setTranslate({ index: selected });
      }, 300);
    }
    if (selected >= 0) activePagination(selected);
};
  
const handleNext = () => {
    console.log(selected);
    selected += 1;
    setTransition('transform 0.3s linear');
    setTranslate({ index: selected });
    if (selected > lastIndex) {
        selected = 0;
        setTimeout(() => {
        setTransition('');
        setTranslate({ index: selected });
        }, 300);
    }
    if (selected <= lastIndex) activePagination(selected);
};

const makeButton = () => {
    if (items.length > 1) {
        const prevButton = document.createElement('button');
        prevButton.classList.add('buttons__prev');
        prevButton.innerHTML = '<i class="fas fa-arrow-left"></i>';
        prevButton.addEventListener('click', handlePrev);

        const nextButton = document.createElement('button');
        nextButton.classList.add('buttons__next');
        nextButton.innerHTML = '<i class="fas fa-arrow-right"></i>';
        nextButton.addEventListener('click', handleNext);

        buttons.appendChild(prevButton);
        buttons.appendChild(nextButton);
    }
};

const handlePagination = (e) => {
    if (e.target.dataset.num) {
        selected = parseInt(e.target.dataset.num);
        setTransition('all 0.3s linear');
        setTranslate({ index: selected });
        activePagination(selected);
    }
};

const makePagination = () => {
    if (items.length > 1) {
        for (let i = 0; i < items.length; i++) {
        const button = document.createElement('button');
        button.dataset.num = i;
        button.classList.add('pagination');
        if (i === 0) {
            button.classList.add('on');
        }
        paginations.appendChild(button);
        paginations.addEventListener('click', handlePagination);
        }
    }
};

const cloneElement = () => {
    list.prepend(items[lastIndex].cloneNode(true));
    list.append(items[0].cloneNode(true));
    setTranslate({ reset: true });
};

const autoplayIterator = () => {
    selected += 1;
    setTransition('all 0.3s linear');
    setTranslate({ index: selected });
    if (selected > lastIndex) {
        activePagination(0);
        clearInterval(interval);
        setTimeout(() => {
        selected = 0;
        setTransition('');
        setTranslate({ reset: true });
        autoplay({ duration: 2000 });
        }, 300);
    }
    if (selected <= lastIndex) activePagination(selected);
};

const autoplay = ({ duration }) => {
    interval = setInterval(autoplayIterator, duration);
};

const render = () => {
    makeButton();
    makePagination();
    cloneElement();
    autoplay({ duration: 2000 });
};

render();