if (Meteor.isClient) {
  ClientDebugger.debugMode = true;
  Session.set('debug_template', '*' );
  
  Meteor.startup(function () {
    Tracker.autorun(function(){ 
      FlowRouter.watchPathChange();
      
      try {
        console.log('FlowRouter: ', FlowRouter.current().route.name); 
      } catch( e ) { console.log('throw'); };
    });
    
    Tracker.autorun(function(){ 
      var lang = TAPi18n.getLanguage();
      var locale = FlowRouter.current().route.group && FlowRouter.current().route.group.name;
      
      if(locale && locale != lang)
        FlowRouter.go(FlowRouter.current().route.name, {locale: lang}, FlowRouter.current().queryParams);
    });
  });
  
  //Global template helpers
  Template.registerHelper('lang', function(argument){
    return TAPi18n.getLanguage();
  });
  
  
  
  Template.layout.events({ 
    'click .lang': function(event, template){ 
       event.preventDefault();
       TAPi18n.setLanguage(event.target.innerText);
    } 
  }); 
}


/* *** ROUTE STUFF *** */

var langRoutes = FlowRouter.group({
  triggersEnter: [function(context, redirect) {
    var locale = context.params.locale;
    var currLang = TAPi18n.getLanguage();
    
    if( /^en|ru$/.test(locale) ) {
      if(currLang != locale) {
        TAPi18n.setLanguage(locale);
      }
    } else {
      console.log('langRoutes triggersEnter reditect');
      redirect('/' + currLang + context.path);
    }
  }],
  prefix: '/:locale?',
  name: 'langRoutes'
});

langRoutes.route('/', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {main: 'hello'});
  },
  name: 'indexPage'
});

langRoutes.route('/contact', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {main: 'contact'});
  },
  name: 'contact'
});

var countriesGroup = langRoutes.group({
  prefix: '/countries',
  name: 'countriesGroup'
});

countriesGroup.route('/', {
  action:function(params, queryParams) {
    BlazeLayout.render('layout', {main: 'countries'});
  },
  name: 'countries'
});

countriesGroup.route('/poland', {
  action:function(params, queryParams) {
    BlazeLayout.render('layout', {main: 'poland'});
  },
  name: 'countries.poland'
});

countriesGroup.route('/latvia', {
  action:function(params, queryParams) {
    BlazeLayout.render('layout', {main: 'latvia'});
  },
  name: 'countries.latvia'
});