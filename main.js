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
        var carousel;

        function voteUp() {
            api.voteImage(carousel.getActiveId(), 1);
        }

        function voteDown() {
            api.voteImage(carousel.getActiveId(), 0);
        }

        var modal = getCatModal(obj, voteUp, voteDown, (addCarousel) => {
            api.getImages(obj.id)
                .then(images => {
                    carousel = getCatCarousel(images);
                    addCarousel(carousel);
                });
        });
        document.body.append(modal);
    }

});