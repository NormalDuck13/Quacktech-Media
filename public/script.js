document.addEventListener('DOMContentLoaded', () => {
    const settingsBtn = document.querySelector('.settings');
    const body = document.body;

    settingsBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    });
});
