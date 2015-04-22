Resolutions = new Mongo.Collection('resolutions'); /*new collection*/
// run meteor then open another cmd and meteor mongo
// db.resolutions.insert({ title: "Hello Resolutions", createdAt:new Date() });

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
