$(function() {
    $('nav a:first').css('color', 'red'); //colors the first element a in nav
    $('nav a:last').css('color', 'green'); //colors the last element a in nav


    $('main .top').eq(0).addClass('active');
    $('main .panel').eq(0).show();
    //the first .top will be 'active' and the first .panel will be visible

    $('main .top').click(function() {
        $(this).next('.panel').slideToggle('slow').siblings('.panel:visible').slideUp('slow'); 
        //when .top clicked, the next element .panel (that is son of main = sibling of .top) slides down/up. Next all siblings .panel that are visible will slide up

        $(this).toggleClass('active'); 
        //adds/removes class 'activ' from .top

        $(this).siblings('.top').removeClass('active');
        //when .top clicked, all siblings of .top will remove class 'active'
    });


    
    var currentSlide = 0; //index of first slide
    var totalSlides = $(".galery img").length; //number of slides

    function showSlide(slideIndex) {
        currentSlide = slideIndex - 1;
        //gives an index to current slide

        var slideImage = $(".galery img").eq(currentSlide).attr("src");
        $(".zdj_g").attr("src", slideImage);
    }

    function nextSlide() {
        if (currentSlide < totalSlides - 1) { 
            currentSlide++;
        //if index of current slide is less than number of slides (is not the last slide), the index of slide will increment

        } else {
            currentSlide = 0;
        }
        //if current slide is the last one, change it to 0 (will show the first slide)

        var nextImage = $(".galery img").eq(currentSlide).attr("src");
        //takes the src from image with current index

        $(".zdj_g").attr("src", nextImage);
        //adds src of current image to main img

    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
        //if index of slide is more than 0 (is not the first slide) the slide index will decrement

        } else {
            currentSlide = totalSlides - 1;
        }
        //if current slide is the first one, next show the last one
        
        var prevImage = $(".galery img").eq(currentSlide).attr("src"); 
        $(".zdj_g").attr("src", prevImage);
    }

    $(".galery .next").click(function() {
        nextSlide();
    });

    $(".galery .prev").click(function() {
        prevSlide();
    });

    $(".galery img").click(function() {
        var slideIndex = $(this).index();
        showSlide(slideIndex);
    });



    var carPrices = {
        'motocykl1': '200zł',
        'motocykl2': '250zł',
        'autoosobowe1': '500zł',
        'autoosobowe2': '400zł',
        'autodostawcze1': '700zł',
        'autodostawcze2': '650zł',
        'autoelektryczne1': '300zł',
        'autoelektryczne2': '350zł',
        'taczka1': '40zł',
        'taczka2': '1000zł',
        'wozek1': '70zł',
        'wozek2': '100zł'
    };
    //object gives cars its prices based on an option's value

    function updatePrice() {
        var selectedCar = $('.car-select').val(); // gets the value of selected option
        var price = carPrices[selectedCar]; // gets price from object and gives it according to an option's value
        $('.car-price').text(price); // writes the price in span
    }

    $('.car-select').change(function(){
        updatePrice(); //update price when the selection changes
    });

    //updates price on page load
    updatePrice();


    var today = new Date().toISOString().split('T')[0]; //creates new date (current date and time), then converts it into ISO string and separates the date from time; then chooses the 0 index which is date 
    $('.pickup-date').attr('min', today);
    $('.return-date').attr('min', today);
    //adds min value to pick up and return dates

    $.validator.addMethod( "lettersonly", function( value, element ) {
        return this.optional( element ) || /^[a-zA-ZąęćżźńłóśĄĆĘŁŃÓŚŹŻ\s]+$/i.test( value );
    }, "Proszę nie wpisywać liczb." );
    //adds method that will validate polish letters
    
    $("form").validate({
        rules: {
            firstname: {
                required: true,
                nowhitespace: true,
                lettersonly: true,
                minlength: 2
            },
            lastname: {
                required: true,
                nowhitespace: true,
                lettersonly: true,
                minlength: 2
            },
            email: {
                required: true,
                nowhitespace: true,
                email: true
            },
            "car-select": {
                required: true
            },
            "pickup-date": {
                required: true,
                date: true
            },
            "return-date": {
                required: true,
                date: true,
                greaterThan: ".pickup-date"
            }
        },
        messages: {
            firstname: {
                required: "Proszę podać imię",
                nowhitespace: "Proszę bez spacji",
                minlength: "Imię musi mieć co najmniej 2 znaki"
            },
            lastname: {
                required: "Proszę podać nazwisko",
                nowhitespace: "Proszę bez spacji",
                minlength: "Nazwisko musi mieć co najmniej 2 znaki"
            },
            email: {
                required: "Proszę podać e-mail",
                nowhitespace: "Proszę bez spacji",
                email: "Proszę podać prawidłowy adres e-mail"
            },
            "car-select": {
                required: "Proszę wybrać pojazd"
            },
            "pickup-date": {
                required: "Proszę podać datę odbioru",
                date: "Proszę podać prawidłową datę"
            },
            "return-date": {
                required: "Proszę podać datę zwrotu",
                date: "Proszę podać prawidłową datę",
                greaterThan: "Data zwrotu musi być po dacie odbioru"
            }
        },
        errorClass: "error",    
        errorElement: "div"
    });

    $('.submit').click(function(){
        console.log($('form').valid());
    });
    //made with validation plugin
});