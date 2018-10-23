const breakpoint = {
    small: 576,
    medium: 768,
    large: 992,
    x_large: 1200
};

$(document).ready(function(){
        loadMaterializeFeatures();
        disableProjects();
        initParallax();
        initSmoothScroll();
        handleFormSubmit();
});


function loadMaterializeFeatures(){
    $('.modal').modal();
}

function disableProjects() {
    // Disable user interaction with projects on smaller screens
    if ($(window).width() < breakpoint.large) {
        $('a.disabled').click(function () {
            return false;
        });
    } else {
        $('a.disabled').removeClass('disabled');
    }
}

function initParallax() {
    // Parallax scrolling only allowed on medium and larger devices
    if ($(window).width() > breakpoint.small) {
        let headerHeight = $('.header-top').height();

        $(document).scroll(function () {
            let pos = $(document).scrollTop();
            let parallax = parseInt(pos * -0.3) + 'px';
            let rgba = (pos / headerHeight) * 0.8;

            $('.zohdy').css('margin-top', parallax);
            $('.header-top').css('background', 'rgba(0,0,0,' + rgba);
        });
    }
}

function initSmoothScroll(){
    $('.email').click(function() {
        $("html, body").animate({
                scrollTop: $(document).height()
            }, 500);
    });
}


function handleFormSubmit() {
    if($(window).width() > breakpoint.medium) {
        $('.contact-btn').click(function () {
            clearAnimation();
        });
        $('.btn-submit').click(function (){
            clearAnimation();
            if(checkInputFields()){
                $('.send-success').removeClass('fade-in');
                window.requestAnimationFrame(function () {
                    $('.send-success').addClass('fade-in').show();
                });
                clearInputFields();
            } else {
                $('.send-failure').removeClass('shake-horizontal');
                window.requestAnimationFrame(function () {
                    $('.send-failure').addClass('shake-horizontal').show();
                });
            }
        });
        // If window is too small to fit the image just display a toast
    } else {
        $('.btn-submit').click(function () {
            if (checkInputFields()) {
                M.toast({
                    html: "Thanks, you'll be hearing from me shortly!",
                    classes: 'success-toast'
                });
                clearInputFields();
            } else {
                M.toast({
                    html: "Something went wrong while sending the message, please try again!",
                    classes: 'failure-toast'
                });
            }
        });
    }
}

/************************************** /
            HELPER FUNCTIONS
/**************************************/

function checkInputFields() {
    let formStatus;

    let nameField = document.querySelector('#name');
    let emailField = document.querySelector('#email');
    let phoneField = document.querySelector('#telephone');
    let textArea = document.querySelector('#message');

    formStatus = nameField.classList.contains('valid')
        && emailField.classList.contains('valid')
        && phoneField.classList.contains('valid')
        && textArea.classList.contains('valid');

    return formStatus;
}


function clearInputFields() {
    $(':input').each(function (index, item) {
        item.value = '';
        item.classList.remove('valid');
    });
}

function clearAnimation() {
    $('.send-success').hide().removeClass('fade-in');
    $('.send-failure').hide().removeClass('shake-horizontal');
}



