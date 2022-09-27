import { useEffect, useState } from 'react';
import '../App.css';

const Home = () => {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [task, setTask] = useState();
    const [subtask, setSubtask] = useState();
    const [complete, setComplete] = useState(0);

    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }


    window.onclick = function (event) {
        if (!event.target.matches('#dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('hide')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    const AddTask = (e) => {
        e.preventDefault();
        const data1 = { task }
        fetch('http://localhost:9000/tasks', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data1)
        })
        alert("Task has beeen added successfully");
        window.location.reload(false);
    }

    const AddSubTask = (e) => {
        e.preventDefault();
        const data2 = { subtask }
        // alert(data2.subtask)
        fetch('http://localhost:9000/tasks', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data2)
        })
        alert("Sub Task has beeen added successfully");
        window.location.reload(false);
    }

    const CountComplete = () => {
        var a= document.forms["subtask"];
        var x = a.querySelectorAll('input[type="checkbox"]:checked');
        setComplete(x.length);
    }

    useEffect(() => {
        fetch('http://localhost:9000/tasks')
            .then((res) => {
                return res.json();
            })
            .then(data => {
                setData(data);
                console.log(data)
                
            })
            .catch((err) => {
                console.log(err);
            })

        fetch('http://localhost:7000/subtasks')
            .then((res) => {
                return res.json();
            })
            .then(data1 => {
                setData1(data1);
                console.log(data1);
                console.log(data1.length)
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <div className='container-fluid'>
            <h1 style={{ textAlign: "center", marginBottom: 10 }}>Todo App</h1>
            <form style={{ marginBottom: 10 }} onSubmit={AddTask}>
                <label style={{ marginRight: 10, fontSize: 20 }} htmlFor="taskname">Task Name</label>
                <input style={{ marginRight: 10, height: 30 }} type="text" name='taskname' placeholder='Enter Task Name' 
                value={task} onChange={(e) => setTask(e.target.value)} required />
                <button type='submit'>New List</button>
            </form>

            {data.map((item, index) => {
                return (
                    <div className='card'>
                        <h4 key={index}>
                            <input style={{ margin: 10 }} type="checkbox" />{item.task}
                            <span style={{marginLeft: 10, fontSize: 15}}>{complete} of {data1.length} completed</span>
                            <span style={{ marginLeft: 50 }} onClick={() =>{
                                alert(JSON.stringify(item));
                                //alert(JSON.stringify(item.subtask[0].subtask))
                                alert(JSON.stringify(item.task))
                                myFunction();
                                //alert("test");
                            }
                                } id="dropbtn" className="glyphicon">&#xe114;</span></h4>

                        <div id="myDropdown" className="dropdown-content">
                            <form name="subtask" onSubmit={AddSubTask}>
 
                                <label style={{ marginLeft: 10, marginRight: 10, fontSize: 20 }} htmlFor="subtaskname">Sub Task Name</label>
                                <input style={{ marginRight: 10, height: 30 }} type="text" name='subtask' placeholder='Enter Sub-task Name' 
                                value={subtask} onChange={(e) => setSubtask(e.target.value)} required />
                                <button style={{ marginRight: 10 }} type='submit'>New Step</button>
                                
                                    
                                    <h4><input style={{ margin: 10 }} onChange={() => 
                                        {

                                            alert(item.subtask[0].subtask);
                                            alert(item.task);
                                            CountComplete();
                                        }
                                        } type="checkbox" />{item.task}</h4>
                                   
                                
                                
                            </form>
                        </div>
                    </div>
                )
            })}
            <br />

        </div>
    );
}

export default Home;