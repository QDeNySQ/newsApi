const API_KEY = ''; //WRITE YOUR API KEY!!!
const BASE_URL = 'https://newsapi.org/v2';

const options = {
    headers: {
        Authorization: API_KEY,
    },
};

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    fetchArticles(){
        console.log(this);
        const url = `${BASE_URL}/everything?q=${this.searchQuery}&page=${this.page}&pageSize=6`;

        return fetch(url, options)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.incrementPage();
                return data.articles;
            });
    }
    incrementPage(){
        this.page += 1;
    }

    resetPage(){
        this.page = 1;
    }
    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}