$(document).ready(function() {
    
    // Initialize Slick carousels with navigation arrows
    $('.slick-carousel').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev">Previous</button>',
        nextArrow: '<button type="button" class="slick-next">Next</button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // Quotes Section
    $('#quotes-loader').show(); // Shows the loader

    $.ajax({
        url: 'https://smileschool-api.hbtn.info/quotes',
        method: 'GET'
    }).done(function(response) {
        // Clear existing carousel
        $('.carousel-quotes').empty();

        // Add items from the API
        response.forEach((quote, index) => {
            let activeClass = index === 0 ? ' active' : ''; // Set the first item as active
            $('.carousel-quotes').append(`
                <div class="carousel-item${activeClass}">
                    <div class="row mx-auto align-items-center">
                        <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                            <img src="${quote.pic_url}" class="d-block align-self-center" alt="Profile Pic" />
                        </div>
                        <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                            <div class="quote-text">
                                <p class="text-white">« ${quote.text} »</p>
                                <h4 class="text-white font-weight-bold">${quote.name}</h4>
                                <span class="text-white">${quote.title}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        });

        // Restart the carousel with new changes
        $('#carouselExampleControls').carousel('dispose');
        $('#carouselExampleControls').carousel();
    }).fail(function() {
        $('#error-message').text('Failed to load quotes');
    }).always(function() {
        $('#quotes-loader').hide(); // Hide the loader
    });

    // Tutorials Section
    $('#tutorials-loader').show(); // Shows the loader

    $.ajax({
        url: 'https://smileschool-api.hbtn.info/popular-tutorials',
        method: 'GET'
    }).done(function(response) {
        // Clear existing carousel
        $('.carousel-tutorials').empty();

        let $currentSlide;
        response.forEach((item, index) => {
            if (index % 4 === 0) {
                // This ensures the carousel only shows 4 cards per slide
                $currentSlide = $('<div>', { class: 'carousel-item' });
                if (index === 0) {
                    $currentSlide.addClass('active'); // Sets the first item as active
                }
                $currentSlide.append('<div class="row no-gutters"></div>');
                $('.carousel-tutorials').append($currentSlide);
            }
            
            // Create card HTML
            const $card = $(`
                <div class="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center">
                    <div class="card">
                        <img src="${item.thumb_url}" class="card-img-top" alt="Video thumbnail">
                        <div class="card-img-overlay text-center">
                            <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title font-weight-bold">${item.title}</h5>
                            <p class="card-text text-muted">${item["sub-title"]}</p>
                            <div class="creator d-flex align-items-center">
                                <img src="${item.author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle">
                                <h6 class="pl-3 m-0 main-color">${item.author}</h6>
                            </div>
                            <div class="info pt-3 d-flex justify-content-between">
                                <div class="rating">
                                    ${Array.from({ length: 5 }, (_, i) => i < item.star ? '<img src="images/star_on.png" alt="star on" width="15px">' : '<img src="images/star_off.png" alt="star off" width="15px">').join('')}
                                </div>
                                <span class="main-color">${item.duration}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `);
            
            // Append card to the current slide
            $currentSlide.find('.row').append($card);
        });

        // Restart the carousel with new changes
        $('#carouselExampleControls').carousel('dispose');
        $('#carouselExampleControls').carousel();
    }).fail(function() {
        $('#error-message').text('Failed to load tutorials');
    }).always(function() {
        $('#tutorials-loader').hide(); // Hide the loader
    });

    // Latest Videos Section
    $('#videos-loader').show(); // Shows the loader

    $.ajax({
        url: 'https://smileschool-api.hbtn.info/latest-videos',
        method: 'GET'
    }).done(function(response) {
        // Clear existing carousel
        $('.carousel-videos').empty();

        let $currentSlide;
        response.forEach((item, index) => {
            if (index % 4 === 0) {
                // This ensures the carousel only shows 4 cards per slide
                $currentSlide = $('<div>', { class: 'carousel-item' });
                if (index === 0) {
                    $currentSlide.addClass('active'); // Sets the first item as active
                }
                $currentSlide.append('<div class="row no-gutters"></div>');
                $('.carousel-videos').append($currentSlide);
            }
            
            // Create card HTML
            const $card = $(`
                <div class="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center">
                    <div class="card">
                        <img src="${item.thumb_url}" class="card-img-top" alt="Video thumbnail">
                        <div class="card-img-overlay text-center">
                            <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title font-weight-bold">${item.title}</h5>
                            <p class="card-text text-muted">${item["sub-title"]}</p>
                            <div class="creator d-flex align-items-center">
                                <img src="${item.author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle">
                                <h6 class="pl-3 m-0 main-color">${item.author}</h6>
                            </div>
                            <div class="info pt-3 d-flex justify-content-between">
                                <div class="rating">
                                    ${Array.from({ length: 5 }, (_, i) => i < item.star ? '<img src="images/star_on.png" alt="star on" width="15px">' : '<img src="images/star_off.png" alt="star off" width="15px">').join('')}
                                </div>
                                <span class="main-color">${item.duration}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `);
            
            // Append card to the current slide
            $currentSlide.find('.row').append($card);
        });

        // Restart the carousel with new changes
        $('#carouselExampleControls').carousel('dispose');
        $('#carouselExampleControls').carousel();
    }).fail(function() {
        $('#error-message').text('Failed to load videos');
    }).always(function() {
        $('#videos-loader').hide(); // Hide the loader
    });
});
