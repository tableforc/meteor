Resolutions = new Mongo.Collection('resolutions'); /*new collection*/
// run meteor then open another cmd and meteor mongo
// db.resolutions.insert({ title: "Hello Resolutions", createdAt:new Date() });

if (Meteor.isClient) {
  Template.body.helpers({
    resolutions: function() {
      
      if (Session.get('hideFinished')) {/*retrieve session var value*/
        return Resolutions.find({checked:{$ne:true}});/* mongodb method for not equal, $ne : only look for objects where checked is true*/
      } else {
        return Resolutions.find();
      }
    },
    
    hideFinished:function(){/*it's unintuitive but, must define helper 'hideFinished' to use the helper*/
      return Session.get('hideFinished');
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
       },

       'change .hide-finished': function(event) {
        Session.set('hideFinished'/*name of session var*/, event.target.checked/* set value of sessions var to t/f if checked*/);/*set session variable*/
       }
  });

  Template.resolution.events({ /*inside the resolution not body*/
    'click .toggle-checked':function(){
        Resolutions.update(this._id, /*current item*/{$set: {checked: !this.checked}})/*inverse the checked value: false=true*/
    }, /*need comma to separate 2 properties*/
    'click .delete':function(){ /*listen for click event class delete*/
        Resolutions.remove(this._id); /*in collection named Resolutions, remove the current key's id*/
    }
  });

  Accounts.ui.config({
    passwordSignupFields:"USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
