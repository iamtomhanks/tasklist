Tasks = new Mongo.Collection("tasks");


if (Meteor.isClient){
	Template.tasks.helpers({
		tasks: function(){
			return Tasks.find({}, {sort: {createdAt: -1}});
		}
	});
	
	Template.tasks.events({
		"submit .add-task": function(event){
			var name = event.target.name.value;
			
			
			
			Meteor.call('addTask', name);
			
			event.target.name.value = '';
			
			return false;
				
		},
		
		"click .delete-task": function(event){
			if(confirm('Delete Task?')){
				Meteor.call('deleteTask', this._Id);	
			}
			
			
			
			return false;
				
		}
		
		
	});
}


Meteor.methods({
	addTask: function(name){
		if(!Meteor.userId()) {
			throw new Meteor.error('No Access!');
		}	
		
		Tasks.insert({
			name: name,
			createdAt: new Date(),
			userId: Meteor.userId()
		});
	},
	
	deleteTask: function(taskId){
		Tasks.remove(taskId);	
	}
});

