import { useEffect, useState } from 'react';
import '../App.css';

const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/blogs')
            .then((res) => {
                return res.json();
            })
            .then(data => {
                setData(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <div className='container-fluid'>
            <h1 style={{ textAlign: "center"}}>Blog Details</h1>
            {data.map((item) => {
                return (
                    <div className='card'>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                    </div>
                )
            })}
            <br/>
        </div>
    );
}

export default Home;