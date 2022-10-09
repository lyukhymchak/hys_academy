export function paginator(selector,data) {
    let paginatorDiv = document.getElementById(selector);
    paginatorDiv.appendChild(createBlogHtml(data));
}

function createBlogHtml(data) {
  let ul = document.createElement('ul');
  ul.classList.add('blog__list');
  
  for (let i = 0; i < 2; i++){
    let li= document.createElement('li');
    li.classList.add('blog__item');
    li.innerHTML = createCardTemplate(data[i]);
    ul.appendChild(li);
  }

  let li= document.createElement('li');
  li.appendChild(createNumberSlider());
  ul.appendChild(li);

  return ul;
}

function createCardTemplate(card) {
    return `<div class="blog__block">
                  <h4 class="blog__header">${card.category}</h4>
                  <img
                    class="blog__image"
                    src="${card.url}"
                    width="259"
                    alt="working at laptop"
                  />
                  <div class="blog__block-bottom">
                    <div class="blog__mentor-image">
                      <img
                        src="${card.userImage}"
                        width="48"
                        alt="mentor of design"
                      />
                    </div>
                    <div>
                      <h3 class="blog__title">
                       ${card.title}
                      </h3>
                      <a class="blog__link" href="${card.redirectLink}">Read Now</p>
                    </div>
                  </div>
                </div>
            `
}

function createNumberSlider() {
    let ul = document.createElement('ul');
    ul.classList.add('number-slider');
    for (let i = 0; i < 5; i++){
      let li = document.createElement('li');
      li.classList.add('number-slider-item');

      let button = document.createElement('button');
      button.classList.add('btn-number-slider');
        
      button.innerHTML = i+1;
      li.appendChild(button);
      ul.appendChild(li);  
    }   
    return ul;
}
