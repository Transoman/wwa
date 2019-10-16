var smartgrid = require('smart-grid');

/* It's principal settings in smart grid project */
var settings = {
  outputStyle: 'sass', /* less || scss || sass || styl */
  columns: 12, /* number of grid columns */
  offset: '30px', /* gutter width px || % || rem */
  mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
  container: {
    maxWidth: '1740px', /* max-width оn very large screen */
    fields: '30px' /* side fields */
  },
  breakPoints: {
    xl: {
      width: '1780px', /* -> @media (max-width: 1680px) */
    },
    lg: {
      width: '1260px', /* -> @media (max-width: 1100px) */
    },
    md: {
      width: '1010px'
    },
    sm: {
      width: '767px',
      fields: '15px' /* set fields only if you want to change container.fields */
    },
    xs: {
      width: '576px'
    }
    /*
    We can create any quantity of break points.

    some_name: {
        width: 'Npx',
        fields: 'N(px|%|rem)',
        offset: 'N(px|%|rem)'
    }
    */
  }
};

smartgrid('./app/static/sass/_parts', settings);