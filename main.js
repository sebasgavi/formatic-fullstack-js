window.addEventListener('load', () => {

    // thecatapi.com
    var breeds;

    var getBtn = document.querySelector('#get-cats');
    getBtn.addEventListener('click', () => {
        api.getBreeds()
            .then(data => {
                console.log(data);
                breeds = data;
                setCatElements();
            });
    });

    function setCatElements(){
        var row = document.querySelector('.row');
        breeds.forEach(obj => {
            row.append( getCatElement(obj, openCatModal) );
        });
    }

    function openCatModal(obj){
        var modal = getCatModal(obj, (addCarousel) => {
            api.getImages(obj.id)
                .then(images => {
                    var carousel = getCatCarousel(images);
                    addCarousel(carousel);
                });
        });
        document.body.append(modal);
    }

});