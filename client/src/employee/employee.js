import React, {Component} from 'react'
import axios from 'axios';
class Employee extends Component {
    constructor() {
        super();
        this.state = {
            employees: [],
        }
    }

    async componentDidMount(){
            try{
                const res = await axios.get("/employees");
                console.log(res.data)
                this.setState({
                    employees: res.data
                })
            }catch (error){
                console.error(error)
            }
        }

        handleChange = (event) => {
                console.log(event.target.name)
                console.log(event.target.value)
                this.setState({
                    [event.target.value]:event.target.value
                })

        }

        addEmployee = async (event)  => {
            event.preventDefault();
            const {Name, EmpCode, Salary} = this.state
            try {
                await axios.post('/employees', {Name, EmpCode, Salary})
                alert()

            }catch (error){
                console.log(error)
            }
        }

        

         deleteEmployee = async id => {
            try{
                await axios.delete(`/employees/${id}`);
                console.log(`ID: ${id} was deleted`);
                this.refresh();

            }catch(error){
                console.error(error);
            }
        }

        refresh = async () => {

            try {
                const res = await axios.get("/employees")
                this.setState({

                    employees: res.data
                })
            }catch (error){
        }
    }

         render(){
        if(this.state.employees.length){
              return(
                <div>
                    <ul>
                {this.state.employees.map( el => {
                    return <li  key= {el.EmpID}>Name: {el.Name}EmpCode:{el.EmpCode} Salary:{el.Salary}
                    <button type = "button" onClick = {()=> this.deleteEmployee(el.EmpID)}></button></li>
                    })}
        
                </ul>
                <form>
                    <input name = "Name" placeholder = "Please enter the employees name here"/>
                    <input name = "" placeholder = "Please enter the employees code here"/>
                    <input name = "Salary" placeholder = "Please enter the salary name here"/>
                </form>
                </div>
            )
        }else{
            return(
                <div> There isn't any employees</div>
            )
        }
        }

    }

export default Employee;