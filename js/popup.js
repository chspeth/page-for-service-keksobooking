import {createSimilarAds} from './data.js';

const TYPES_RUS = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const similarAdsTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarAdsList = document.querySelector('#map-canvas');

const similarAds = createSimilarAds();

const getPopup = (data) => {
  const adsElement = similarAdsTemplate.cloneNode(true);
  adsElement.querySelector('.popup__title').textContent = data.offer.title;
  adsElement.querySelector('.popup__text--address').textContent = data.offer.address;
  adsElement.querySelector('.popup__text--price').textContent = `${data.offer.price} ₽/ночь`;
  adsElement.querySelector('.popup__type').textContent = TYPES_RUS[data.offer.type];
  adsElement.querySelector('.popup__text--capacity').textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  adsElement.querySelector('.popup__text--time').textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  const descriptionContainer = adsElement.querySelector('.popup__description');
  descriptionContainer.textContent = data.offer.description;

  if (!data.offer.description) {
    descriptionContainer.remove();
  }

  const featuresContainer = adsElement.querySelector('.popup__features');
  const featuresListFragment = document.createDocumentFragment();
  const features = data.offer.features;
  features.forEach((feature) => {
    const featuresListItem = featuresContainer.querySelector(`.popup__feature--${feature}`);
    if (featuresListItem) {
      featuresListFragment.append(featuresListItem);
    }
  });
  featuresContainer.innerHTML = '';
  featuresContainer.append(featuresListFragment);

  if (!features) {
    featuresContainer.remove();
  }

  const photosContainer = adsElement.querySelector('.popup__photos');
  const photosListFragment = document.createDocumentFragment();
  const photos = data.offer.photos;
  for (let i = 0; i < photos.length; i++) {
    const photosListItem = photosContainer.querySelector('.popup__photo').cloneNode(true);
    photosListItem.src = photos[i];
    photosListFragment.append(photosListItem);
  }
  photosContainer.innerHTML = '';
  photosContainer.append(photosListFragment);

  if (!photos) {
    photosContainer.remove();
  }

  const avatar = adsElement.querySelector('.popup__avatar');
  avatar.src = data.author.avatar;

  similarAdsList.appendChild(adsElement);
};

for (let i = 0; i < similarAds.length; i++) {
  getPopup(similarAds[i]);
}