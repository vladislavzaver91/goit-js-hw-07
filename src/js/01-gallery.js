import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
const itemsMarkup = galleryItems.map(createGalleryItemsMarkup).join('');

galleryContainer.addEventListener('click', onGalleryContainerClick);
galleryContainer.insertAdjacentHTML('afterbegin', itemsMarkup);

function createGalleryItemsMarkup({preview, original, description}) {
    return `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
    />
    </a>
    </div>`;
};
// console.log(itemsMarkup);

function onGalleryContainerClick(evt) {
    evt.praventDefault();

    if (evt.target.nodeName !== 'IMG') return;

    const instance = basicLightbox.create(`
    <div class="modal">
        <img class="modal__image"
        src="${evt.target.dataset.source}"
        />
    </div>
    `,
    {
        onShow: instance => {
            window.addEventListener('keydown', onEscKeyPress);
            instance.element().querySelector('img').onclick = instance.close
        },
        onClose: instance => {
            window.removeEventListener('keydown', onEscKeyPress);
        },
    }
    );

    function onEscKeyPress(evt) {
        if (evt.code === 'Escape') {
            instance.close();
        }
    }
    instance.show();
};

