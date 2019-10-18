global.jQuery = require('jquery');
var svg4everybody = require('svg4everybody'),
popup = require('jquery-popup-overlay'),
Swiper = require('swiper'),
Simplebar = require('simplebar'),
fancybox = require('@fancyapps/fancybox');

jQuery(document).ready(function($) {

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
    onclose: function() {
      $(this).find('label.error').remove();
    }
  });

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


  tabs('.portfolio-tabs', '.portfolio-tabs-list', '.portfolio-tabs__item');
  tabs('.services-tabs', '.services-tabs-list', '.services-tabs__item');
  chosenHover();
  inputFile();

  // SVG
  svg4everybody({});

});