Resolutions = new Mongo.Collection('resolutions'); /*new collection*/



if (Meteor.isClient) {
  Template.body.helpers({
    resolutions: function() {
      return Resolutions.find();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
