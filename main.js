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
        var modal = getCatModal(obj);
        document.body.append(modal);
        
        api.getImages(obj.id)
            .then(images => {
                var carousel = getCatCarousel(images);
                modal.querySelector('.modal-body').append(carousel);
            });
    }

});