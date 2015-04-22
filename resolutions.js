Resolutions = new Mongo.Collection('resolutions'); /*new collection*/
// run meteor then open another cmd and meteor mongo
// db.resolutions.insert({ title: "Hello Resolutions", createdAt:new Date() });

if (Meteor.isClient) {
  Template.body.helpers({
    resolutions: function() {
      return Resolutions.find();
    }
  });

  Template.body.events({
      'submit .new-resolution' :function(event){
          var title = event.target.title.value;

          Resolutions.insert({
            title/*of Resolutions*/: title, /*var title*/
            createdAt: new Date()
          });

          event.target.title.value =""; /*clear form*/
          return false;/*prevent refresh due to submit button*/
      }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
