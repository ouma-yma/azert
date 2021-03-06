import axios from 'axios';
import React,{PropTypes,Component} from 'react';
import ReactDOM from 'react-dom';
import {Table,Button,Modal, ModalHeader, ModalBody, ModalFooter,Input,FormGroup,Label}from 'reactstrap';
export default class Example extends Component{
  constructor(){
      super()
      this.state={
          tasks:[],
          newTaskModal:false, 
          newTaskData:{
              name:"",
              description:""
          },
          editTaskModal:false,
          editTaskData:{
               id:"",
               name:"",
               description:""
          }
          
      }
  }
    LoadTask(){
        axios.get('http://127.0.0.1:8000/api/tasks').then((response) => {
            this.setState({
                tasks:response.data
        })
    })
    }    
    addTask(){
        axios.post('http://127.0.0.1:8000/api/task',this.state.newTaskData).then((response)=>{
            let{ tasks }=this.state
            this.LoadTask()
 
            this.setState({
                tasks,
                newTaskModal:false,
                newTaskData:{
                    name:"",
                    description:""
                }

            })
        })
    }
    componentDidMount(){
        this.LoadTask();
      } 

    taggleEditTaskModal(){
        this.setState({
            editTaskModal:!this.state.editTaskModal
        })
    }       
    taggleNewTaskModal(){
        this.setState({
            newTaskModal:!this.state.newTaskModal
        })

    }
    editTask(id,name,description){
        console.log(id);
        this.setState({
            editTaskData:{
            id,
            name,
            description
        },
        editTaskModal:!this.state.editTaskModal
        })
    }
    updateTask(){
        let{ taskId,name,description}=this.state.editTaskData

        axios.put('http://127.0.0.1:8000/api/task/'+this.state.editTaskData.id,
        {name,
        description
        }).then((response)=>{
            this.LoadTask() 

            this.setState({
                editTaskModal:false,
                editTaskData:{
                    id:"",
                    name:"",
                    description:""
                }
            })
        })
    }
    deleteTask(id){
        axios.delete('http://127.0.0.1:8000/api/task/'+id).then((response)=>{
            this.LoadTask()
        })
    }
    render(){
        
        let tasks=this.state.tasks.map((task)=>{
            return(
                <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>
                    <Button color="success" size="sm" className="mr-2" onClick={this.editTask.bind(this,task.id,task.name,task.description)}>Edit</Button>
                    <Button color="danger" size="sm" onClick={this.deleteTask.bind(this,task.id)}>Delete</Button>
                </td>
            </tr>
            )
        })
    return (
        <div className="container">
            <h1>To do liste</h1>
            <Button color="primary" onClick={this.taggleNewTaskModal.bind(this)}>Add task</Button>
            <Modal isOpen={this.state.newTaskModal} toggle={this.taggleNewTaskModal.bind(this)}>
            <ModalHeader toggle={this.taggleNewTaskModal.bind(this)}>task</ModalHeader>
            <ModalBody>
               <FormGroup>
                   <Label for="name">Name</Label>
                   <Input 
                        id="name"
                        value={this.state.newTaskData.name}
                        onChange={(e) => {
                            let{ newTaskData}=this.state
                            newTaskData.name= e.target.value
                            this.setState({newTaskData})
                        }}
                        ></Input>
               </FormGroup>
               <FormGroup>
                   <Label for="description">Description</Label>
                   <Input 
                        id="description"
                        value={this.state.newTaskData.description}
                        onChange={(e)=>{
                            let{ newTaskData}= this.state
                            newTaskData.description=e.target.value
                            this.setState([{newTaskData}])
                        }}
                       ></Input>
               </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.addTask.bind(this)}>Add Task</Button>{' '}
                <Button color="secondary" onClick={this.taggleNewTaskModal.bind(this)}>Cancel</Button>
            </ModalFooter>
            </Modal>
            <Modal isOpen={this.state.editTaskModal} toggle={this.taggleEditTaskModal.bind(this)}>
            <ModalHeader toggle={this.taggleEditTaskModal.bind(this)}> Edit task</ModalHeader>
            <ModalBody>
               <FormGroup>
                   <Label for="name">Name</Label>
                   <Input 
                        id="name"
                        value={this.state.editTaskData.name}
                        onChange={(e) => {
                            let{ editTaskData}=this.state
                            editTaskData.name= e.target.value
                            this.setState({editTaskData})
                        }}
                        ></Input>
               </FormGroup>
               <FormGroup>
                   <Label for="description">Description</Label>
                   <Input 
                        id="description"
                        value={this.state.editTaskData.description}
                        onChange={(e)=>{
                            let{ editTaskData}= this.state
                            editTaskData.description=e.target.value
                            this.setState([{editTaskData}])
                        }}
                       ></Input>
               </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.updateTask.bind(this)}>Edit Task</Button>{' '}
                <Button color="secondary" onClick={this.taggleEditTaskModal.bind(this)}>Cancel</Button>
            </ModalFooter>
            </Modal>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
            <tbody>
                {tasks}
            </tbody>
            </Table>
        </div>
    );
    }
}
if (document.getElementById('example')) {
    ReactDOM.render(<Example/>, document.getElementById('example'));
}
