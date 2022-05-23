import { setNewsData } from ".";

export async function fetchNewsD() {
        return fetch("https://api.github.com/users/harshal")
            .then((response) => {response.json()})
            .then((data) => {return {type:'SET_NEWSDATA',payload:data}})
            .catch((err) => {
                throw err;
            });
}