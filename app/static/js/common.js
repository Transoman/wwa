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

  tabs('.portfolio-tabs', '.portfolio-tabs-list', '.portfolio-tabs__item');
  chosenHover();

  // SVG
  svg4everybody({});

});