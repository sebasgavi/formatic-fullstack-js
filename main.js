window.addEventListener('load', () => {

    // thecatapi.com
    var breeds;

    api.getBreeds()
        .then(data => {
            breeds = data;
            breeds.push({
                name: 'Criollo Alemán',
                origin: 'Cali',
                weight: {
                    metric: '5',
                }
            });
            breeds.push({
                name: 'Gato Cansón',
                origin: 'Cali',
                weight: {
                    metric: '5',
                }
            });
            breeds.push({
                name: 'Brasileño áíóÖ',
                origin: 'Cali',
                weight: {
                    metric: '5',
                }
            });
            breeds = breeds.map(cat => {
                return { 
                    ...cat,
                    normalized: _.deburr(cat.name),
                };
            });
            setCatElements(breeds);
        });

    var modified = debounce(() => {
        if(input.value.length < 3){
            setCatElements(breeds);
        } else {
            var filtered = breeds.filter(({ normalized, origin }) => {
                let reg = new RegExp(_.deburr(input.value), 'i');
                return reg.test(normalized) || reg.test(origin);
            });
            setCatElements(filtered, input.value);
        }
    }, 300);

    var input = document.querySelector('#search-input');
    input.addEventListener('input', modified);

    function debounce(otherFunction, timer){
        var iden;

        function timeout() {
            clearTimeout(iden);
            iden = setTimeout(() => {
                otherFunction();
            }, timer);
        }

        return timeout;
    }


    function setCatElements(list, search){
        var row = document.querySelector('.row.cats-grid');
        row.innerHTML = '';
        list.forEach(obj => {
            row.append( getCatElement(obj, openCatModal) );
        });
        if(list.length === 0){
            row.innerHTML = `
            <div class="col mt-4">
                <div class="alert alert-info">
                    Lo sentimos, no encontramos gatos para la búsqueda <strong>${search}</strong>
                </div>
            </div>
            `;
        }
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