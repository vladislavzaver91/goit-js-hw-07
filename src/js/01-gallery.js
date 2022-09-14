import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
const itemsMarkup = createGalleryItemsMarkup(galleryItems);

galleryContainer.addEventListener('click', onGalleryContainerClick);
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

function onGalleryContainerClick(evt) {
    evt.preventDefault();

    if (evt.target.nodeName !== 'IMG') return;

    const instance = basicLightbox.create(`
        <img 
        src="${evt.target.dataset.source}"
        />
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
    };

    instance.show();
};