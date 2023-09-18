import './css/styles.scss';
import logo from './img/globe-solid.png';
import NewsApiService from "./js/news-service";
import articlesTpl from "./templates/articles.handlebars";
import LoadMoreBtn from "./js/load-more-btn";

const logoLink = document.createElement('link');
logoLink.rel = 'icon';
logoLink.type = 'image/png';
logoLink.href = logo;
document.head.appendChild(logoLink);

const refs = {
    searchForm: document.querySelector('.js-search-form'),
    articlesContainer: document.querySelector('.js-acticles-container'),
    errorMessage: document.querySelector('.js-error-message'),

    gitHub: document.querySelector('#gitHub'),
    instagram: document.querySelector('#instagram'),
    tikTok: document.querySelector('#tikTok')
};
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true
});
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(e){
    e.preventDefault();

    newsApiService.query = e.currentTarget.elements.query.value;
    if (newsApiService.query === ''){
        refs.errorMessage.innerHTML = 'Enter what you are looking for';
        return;
    }

    loadMoreBtn.show();
    newsApiService.resetPage();
    clearArticlesMarkup();
    fetchArticles();
}

function fetchArticles() {
    loadMoreBtn.disable();
    newsApiService.fetchArticles().then(articles => {
        refs.errorMessage.innerHTML = '';
        appendArticlesMarkup(articles);
        if (refs.articlesContainer.innerHTML === ''){
            refs.errorMessage.innerHTML = 'Nothing...';
            loadMoreBtn.hide();
        }
        loadMoreBtn.enable();
    }).catch(error => {
        console.log(error.message);
        refs.errorMessage.innerHTML = error.message;
    });
}

function appendArticlesMarkup(articles){
    refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles));
}

function clearArticlesMarkup(){
    refs.articlesContainer.innerHTML = '';
    loadMoreBtn.disable();
}

// SOCIAL MEDIA

refs.gitHub.addEventListener('click', ()=> window.open('https://github.com/QDeNySQ','GitHub','width=800,height=600,resizable=yes,scrollbars=yes'));
refs.instagram.addEventListener('click', ()=> window.open('https://www.instagram.com/denys_3075/','Instagram', 'width=800,height=600,resizable=yes,scrollbars=yes'));
refs.tikTok.addEventListener('click', ()=> window.open('https://www.tiktok.com/@denys_3075','TikTok','width=800,height=600,resizable=yes,scrollbars=yes'));