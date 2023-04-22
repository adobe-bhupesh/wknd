export default async function decorate(block) {
    const slider = document.createElement('div');
    slider.classList.add('slider');

    const slides = document.createElement('div');
    slides.classList.add('slides');

    slides.innerHTML = block.innerHTML;
    block.innerHTML = '';

    const sliderIndicatorEl = document.createElement('div');
    sliderIndicatorEl.classList.add('slider-indicator');

    [...slides.children].forEach((item, index) => {
        const currentId = `slide_${index + 1}`
        item.id = currentId;

        const a = document.createElement('a');
        a.classList.add('carousel-circle');
        a.href = `#${currentId}`;
        sliderIndicatorEl.append(a);

        decorateSlide(item);
    });
    slider.append(slides);
    slider.append(sliderIndicatorEl);
    block.append(slider);
}

function decorateSlide(slideEl) {
    debugger;
    const slideWrapper = document.createElement('div');
    slideWrapper.classList.add('slide-wrapper');

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('slide-content-wrapper');

    const parentEl = slideEl.children[0];
    const slideImgWrap = parentEl.children[0];
    const slideTitle = parentEl.children[1];
    const slideDesc = parentEl.children[2];
    const slideButton = parentEl.children[3];

    contentWrapper.append(slideTitle);
    contentWrapper.append(slideDesc);
    contentWrapper.append(slideButton);

    slideImgWrap.classList.add('slide-image-parent');
    slideTitle.classList.add('slide-title');
    slideDesc.classList.add('slide-desc');
    slideButton.classList.add('slide-button');

    slideWrapper.append(slideImgWrap);
    slideWrapper.append(contentWrapper);

    slideEl.innerHTML = '';
    slideEl.append(slideWrapper);
}
