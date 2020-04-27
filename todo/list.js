// reference to the add button
document.getElementById('add').addEventListener('click',function(){
	
	var task = document.getElementById('task').value;
	if(task){
		addTodoTask(task);
		document.getElementById('task').value='';
	} 
});


// function to remove task
function removeTask(){
	var Task = this.parentNode.parentNode.parentNode;
	var list = Task.parentNode;
	list.removeChild(Task);
}
//   function for completeTask
function completeTask(){
	var Task = this.parentNode.parentNode.parentNode;
	var list = Task.parentNode;
	var list_id = list.id;

	var target_list = (list_id === 'todo') ? document.getElementById('completed') : document.getElementById('todo')
	
	list.removeChild(Task);
	target_list.insertBefore(Task,target_list.childNodes[0]);
	}
//    adding the task to the list
function addTodoTask(text){
	var list = document.getElementById('todo');
    // creating new Element
	 var item = document.createElement('li');

   //  creatig rows and column to hold the new list
	var row = document.createElement('div');
	row.classList.add('row');

	var task = document.createElement('div');
	task.classList.add('col-md-8');
	task.classList.add('col-sm-8');
	task.classList.add('col-xs-8');
	task.classList.add('task');
	task.innerText = text;

	//   columns created to hold buttons
	var buttons = document.createElement('div');
	buttons.classList.add('col-md-4');
	buttons.classList.add('col-sm-4');
	buttons.classList.add('col-xs-4');

	//  creating variable to attach new element
	var trash = document.createElement('a');
	trash.classList.add('trash');
	trash.innerHTML='<i class="fa fa-trash-o" aria-hidden="true"></i>';
	 
	// clearing list
	trash.addEventListener('click',removeTask);


	var check = document.createElement('a');
	check.classList.add('check');
	check.innerHTML = '<i class="fa fa-check-circle-o" aria-hidden="true"></i>'
//    checking the completed task 
	check.addEventListener('click',completeTask);

//    inserting the following  buttons,check, trash,row
	buttons.appendChild(check);
	buttons.appendChild(trash);
	row.appendChild(task);
	row.appendChild(buttons);
	item.appendChild(row);

	list.insertBefore(item, list.childNodes[0]);

}
