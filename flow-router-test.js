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
  });
}


/* *** ROUTE STUFF *** */

var someGroup = FlowRouter.group({
  triggersEnter: [function(context, redirect) {
    console.log('context: ', context);
    
    if('/countries/poland' == context.path) {
      redirect('/');
    }
    
    // if( /^en|ru$/.test(locale) ) {
    //   ;
    // } else {
    //   console.log('someGroup triggersEnter reditect');
    //   redirect('/');
    // }
  }],
  // prefix: '/',
  name: 'someGroup'
});

someGroup.route('/', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {main: 'hello'});
  },
  name: 'indexPage'
});

someGroup.route('/contact', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {main: 'contact'});
  },
  name: 'contact'
});

var countriesGroup = someGroup.group({
  prefix: '/countries',
  name: 'countriesGroup'
});

countriesGroup.route('/', {
  action:function(params, queryParams) {
    BlazeLayout.render('layout', {main: 'countries'});
  },
  name: 'countries'
});

FlowRouter.route('/poland', {
  action:function(params, queryParams) {
    this.group = this.group || {};
    this.group.name = 'countries';
    this.group.callSubscriptions = function() {return;};
    
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