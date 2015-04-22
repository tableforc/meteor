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
      'submit .new-resolution' :function(event){ /*key for this object is an event string: submit, look for .new-resolution, triggers event function below*/
          var title = event.target.title.value;/*target event, get title (name of field), and value submitted*/

          Resolutions.insert({/*save new key to db*/
            title/*of Resolutions*/: title, /*var title*/
            createdAt: new Date()
          });

          event.target.title.value =""; /*clear input field in form*/
          return false;/*prevent refresh due to submit button*/
       }
  });

  Template.resolution.events({ /*inside the resolution not body*/
    'click .toggle-checked':function(){
        Resolutions.update(this._id, {$set: {checked: !this.checked}})
    }, /*need comma to separate 2 properties*/
    'click .delete':function(){ /*listen for click event class delete*/
        Resolutions.remove(this._id); /*in collection named Resolutions, remove the current key's id*/
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
