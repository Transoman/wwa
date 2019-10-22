global.jQuery = require('jquery');
var svg4everybody = require('svg4everybody'),
  popup = require('jquery-popup-overlay'),
  Swiper = require('swiper'),
  Simplebar = require('simplebar'),
  fancybox = require('@fancyapps/fancybox'),
  iMask = require('imask'),
  jQueryBridget = require('jquery-bridget'),
  validate = require('jquery-validation');

jQuery(document).ready(function($) {

  // jQueryBridget( 'validate', validate, $ );

  // Toggle nav menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.nav').toggleClass('open');
    $('html').toggleClass('nav-open');
  });

  $('.nav__close').on('click', function (e) {
    e.preventDefault();
    $('.nav-toggle').removeClass('active');
    $('.nav').removeClass('open');
    $('html').removeClass('nav-open');
  });

  // Modal
  $('.modal').popup({
    transition: 'all 0.3s',
    scrolllock: true,
    onclose: function() {
      $(this).find('label.error').remove();
    }
  });

  // Input mask
  let inputMask = function() {
    let phoneInputs = $('input[type="tel"]');
    let maskOptions = {
      mask: '+{7} (000) 000-0000'
    };

    if (phoneInputs) {
      phoneInputs.each(function(i, el) {
        IMask(el, maskOptions);
      });
    }
  };

  new Swiper('.portfolio-slider', {
    simulateTouch: false,
    navigation: {
      nextEl: '.portfolio-slider__slider-controls .swiper-button-next',
      prevEl: '.portfolio-slider__slider-controls .swiper-button-prev',
    },
    pagination: {
      el: '.portfolio-slider__slider-controls .swiper-pagination',
      type: 'fraction',
      formatFractionCurrent: function(number) {
        if (number < 10) {
          return '0' + number;
        }
        else {
          return number;
        }
      },
      formatFractionTotal: function(number) {
        if (number < 10) {
          return '0' + number;
        }
        else {
          return number;
        }
      }
    },
  });

  new Swiper('.portfolio-example-slider', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  new Swiper('.review-slider', {
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
      formatFractionCurrent: function(number) {
        if (number < 10) {
          return '0' + number;
        }
        else {
          return number;
        }
      },
      formatFractionTotal: function(number) {
        if (number < 10) {
          return '0' + number;
        }
        else {
          return number;
        }
      }
    },
    thumbs: {
      swiper: {
        el: '.review-thumb-slider',
        spaceBetween: 40,
        slidesPerView: 2,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
        breakpoints: {
          1260: {
            slidesPerView: 3,
            slidesPerColumn: 2,
          },
          1780: {
            slidesPerView: 4,
            slidesPerColumn: 2,
          }
        }
      }
    }
  });

  // Tabs
  let tabs = function(parentEl, listEl, contentItemsEl) {
    let parent = $(parentEl);
    let list = $(listEl);
    let contentItems = parent.find(contentItemsEl);

    contentItems.hide().eq(list.find('li.active').index()).show();

    list.on('click', 'a', function(e) {
      e.preventDefault();
    });

    list.on('click', 'li:not(.active)', function(e) {
      e.preventDefault();
      $(this)
        .addClass('active').siblings().removeClass('active');
      contentItems.hide().eq($(this).index()).fadeIn('slow');
    });
  };
  
  // Chosen hover effect
  let chosenHover = function () {
    let item = $('.chosen-list__item');
    let img = $('.chosen__img');

    item.hover(function () {
      let color = $(this).data('color');

      img.attr("data-color", color).addClass('active');
    });

    item.mouseleave(function () {
      img.removeClass('active');
    });
  };

  // Steps
  let currentTab = 0; // Current tab is set to be the first tab (0)
  showTab(currentTab); // Display the current tab

  function progress() {
    let count = $('.steps-calculate__item').length;

    $('.progress__line').css({
      width: (100/count) * (currentTab + 1) + '%'
    });
  };

  $('.steps-calculate__btn--prev').click( function(e) {
    e.preventDefault();
    if (currentTab == 0) {
      return false;
    }
    nextPrev(-1);
  } );

  $('.steps-calculate__btn--next').click( function(e) {
    e.preventDefault();

    if ( (currentTab + 1) >  $('.steps-calculate__item').length - 1  ) {
      // $('.constructor-form').submit();
      return false;
    }

    nextPrev(1);
  } );

  function showTab(n) {
    // This function will display the specified tab of the form ...
    let x = $('.steps-calculate__item');

    let countStep = x.length;
    let currentStep = n + 1;

    $('.progress__step-current').text(currentStep);
    $('.progress__step-total').text(countStep);
    progress();

    $(x[n]).css('display', 'block');
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
      $('.steps-calculate__btn--prev').css('display', 'none');
    } else {
      $('.steps-calculate__btn--prev').css('display', 'inline');
    }
    if (n == (x.length - 1)) {
      $('.steps-calculate__btn--next').css('display', 'none');
    } else {
      $('.steps-calculate__btn--next').css('display', 'inline');
    }
  }

  function nextPrev(n) {

    // This function will figure out which tab to display
    let x = $('.steps-calculate__item');

    // Hide the current tab:
    $(x[currentTab]).css('display', 'none');
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
      //...the form gets submitted:
      return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
  }

  // Input file
  let inputFile = function() {
    let inputs = $('input[type="file"]');

    if (inputs.length) {
      inputs.each(function(index, input) {
        let label = $(this).parent();
        let labelVal = label.find('span').text();

        $(input).change(function(e) {
          let fileName = '';

          if (e.target.files.length) {
            fileName = e.target.files[0].name;
          }

          if (fileName) {
            label.find('span').text(fileName);
          }
          else {
            label.find('span').text(labelVal);
          }
        });
      });
    }
  };

  // Accordion
  let accordion = function(item) {
    let el = $(item);
    let elTitle = el.find('h3');
    let content = elTitle.next();

    el.find('.active').find(content).slideDown(500);

    elTitle.click(function() {
      if ($(this).parent().hasClass('active')) {
        $(this).parent().removeClass('active');
        $(this).next().slideUp(500);
      }
      else {
        $(this).parent().addClass('active');
        content.not($(this).next()).slideUp(500);
        elTitle.not($(this)).parent().removeClass('active');
        $(this).next().slideDown(500);
      }
    });
  };

  // Smooths scroll
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();

          let offset = 0;

          if ($(window).width() > 991) {
            offset = 90;
          }
          else if ($(window).width() > 767) {
            offset = 80;
          }
          else {
            offset = 70;
          }

          $('.nav-toggle').removeClass('active');
          $('.nav').removeClass('open');
          $('html').removeClass('nav-open');

          $('html, body').animate({
            scrollTop: target.offset().top - offset
          }, 1000);
        }
      }
    });

  // Fixed header
  let fixedHeader = function(e) {
    let header = $('.header');

    if (e.scrollTop() > 150) {
      header.addClass('fixed');
    }
    else {
      header.removeClass('fixed');
    }
  };

  // Validate form
  let validateForm = function() {
    jQuery.validator.addMethod("phoneno", function(phone_number, element) {
      return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}/);
    }, "Введите Ваш телефон");

    $('.form-ajax').each(function(i, el) {

      $(this).addClass('form-ajax-' + i);

      $('.form-ajax-' + i).validate({
        rules: {
          phone: {
            phoneno: true
          },
          email: {
            email: true
          }
        },
        messages: {
          name: 'Это поле обязательно к заполнению.',
          phone: 'Это поле обязательно к заполнению.',
          email: 'Это поле обязательно к заполнению.'
        },
        submitHandler: function(form) {
          let data = $('.form-ajax-' + i).serialize();

          ajaxSend(form, data);
        }
      });

      toggleSubmit( $(this) );

      $(this).on( 'click', '.check', function() {
        toggleSubmit( $(el) );
      } );

    });

    $('.steps-calculate').validate({
      rules: {
        phone: {
          phoneno: true
        },
        email: {
          email: true
        }
      },
      messages: {
        name: 'Это поле обязательно к заполнению.',
        phone: 'Это поле обязательно к заполнению.',
        email: 'Это поле обязательно к заполнению.'
      },
      submitHandler: function(form) {
        let data = new FormData($('.steps-calculate').get(0));

        ajaxSend(form, data);
      }
    });

    function toggleSubmit(form) {
      let button = form.find('button[type="submit"]');

      if (form.find('.check').length) {
        if (form.find('.check__input').is(':checked')) {
          button.prop('disabled', false);
        } else {
          button.prop('disabled', true);
        }
      }
    }

    function ajaxSend(formName, data) {
      jQuery.ajax({
        type: "POST",
        url: "sendmail.php",
        contentType: false,
        processData: false,
        data: data,
        success: function() {
          $(".modal").popup("hide");
          $("#thanks").popup("show");
          setTimeout(function() {
            $(formName).trigger('reset');
          }, 2000);
        }
      });
    }
  };

  let inputSubject = $('#services-modal input[name="subject"]');
  let oldVal =  inputSubject.val();
  $('.services-modal_open').click(function() {
    let title = $(this).data('title');

    inputSubject.val(oldVal);

    inputSubject.val(function(i, v) {
      return v.replace('{service}', title);
    }).val();
  });

  tabs('.portfolio-tabs', '.portfolio-tabs-list', '.portfolio-tabs__item');
  tabs('.services-tabs', '.services-tabs-list', '.services-tabs__item');
  chosenHover();
  inputFile();
  accordion('.faq-list');
  fixedHeader($(this));
  inputMask();
  validateForm();

  $(window).scroll(function() {
    fixedHeader($(this));
  });

  // SVG
  svg4everybody({});

});