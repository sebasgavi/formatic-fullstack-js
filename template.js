window.addEventListener('load', () => {

    function getCatElement(obj, openCatModal) {
        var { id, name, origin, weight: { metric } } = obj;
        var col = document.createElement('div');
        col.setAttribute('class', 'col-3 mt-4');
        col.innerHTML = `
            <article class="card h-100">
                <div class="card-body">
                    <h4 class="card-title">${name}</h4>
                    <p class="card-text">
                        Origen: ${origin} <br/>
                        Peso: ${metric} kilos
                    </p>
                    <button class="btn btn-primary">
                        Ver más
                    </button>
                </div>
            </article>
        `;
        col.querySelector('button').addEventListener('click', () => {
            openCatModal(obj);
        });
        return col;
    }
    window.getCatElement = getCatElement;


    window.getCatModal = function ({ name, description }, callback) {
        var parent = this.document.createElement('div');
        parent.innerHTML = `
            <div class="modal close-cat" style="display:block">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${name}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" class="close-cat">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>${description}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary close-cat" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop show"></div>
        `;
        parent.querySelector('.modal').addEventListener('click', close);
        function close(event) {
            if(event.target.classList.contains('close-cat')){
                parent.remove();
                document.body.classList.toggle('modal-open', false);
            }
        }
        document.body.classList.toggle('modal-open', true);

        callback((carousel) => {
            parent.querySelector('.modal-body').append(carousel);
        });

        return parent;
    }


    window.getCatCarousel = function(images){
        var carousel = this.document.createElement('div');
        carousel.setAttribute('class', 'carousel slide');
        carousel.setAttribute('data-ride', 'carousel');
        carousel.innerHTML = `
            <div class="carousel-inner">
                ${images.map(({ url }) => `
                    <div class="carousel-item active">
                        <img src="${url}" class="d-block w-100" alt="...">
                    </div>
                `).join('')}
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        `;
        return carousel;
    }

});