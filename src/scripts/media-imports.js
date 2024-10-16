import padletLogo from '../style/logo/Crane.svg';

const logoElements = document.querySelectorAll('img.padlet_logo');

logoElements.forEach((element) => {
    element.src = padletLogo;
    element.alt = 'Padlet Logo';
    element.title = 'Padlet Logo';
});
