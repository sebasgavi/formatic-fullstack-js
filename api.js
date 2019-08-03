window.addEventListener('load', () => {

    const base = 'https://api.thecatapi.com/v1/';

    window.api = {
        getBreeds: () => {
            return fetch(base + 'breeds')
                .catch(error => {
                    console.error(error);
                })
                .then(response => {
                    return response.json();
                });
        },

        getImages: (breedId, limit = 5) => {
            return fetch(`${base}images/search?breed_id=${breedId}&limit=${limit}`)
                .catch(error => {
                    console.error(error);
                })
                .then(response => {
                    return response.json();
                });
        }
    }

});