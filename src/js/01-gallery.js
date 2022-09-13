import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
const itemsMarkup = createGalleryItemsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', itemsMarkup);

function createGalleryItemsMarkup (galleryItems) {
    return galleryItems.map(({preview, original, description}) => {
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
    }).join('');
}
console.log(itemsMarkup);


galleryContainer.addEventListener('click', onGalleryContainerClick);

function onGalleryContainerClick(evt) {
    evt.praventDefault();
    if (evt.target.nodeName !== 'IMG') {
        return;
    }
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
            instance.element().querySelector('img').onClick = instance.close
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

