import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const UpdateForm = props => {

    const location = useLocation();
    const params = useParams();
    const { push } = useHistory();
    const [ item, setItem ] = useState(initialMovie);

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === "metascore"){
            value = parseInt(value, 10)
        }

        setItem({
            ...item,
            [e.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`htto://localhost:5000/api/movies${item.id}`, item)
            .then(res => {
                props.setItems(res.data);
                push(`update-movie/${item.id}`);
            })
            .catch(err => console.log(err));
    }


    return(
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Movie Title"
                    onChange={changeHandler}
                    value={item.title}
                />
                <input
                    type="text"
                    name="director"
                    placeholder="Director"
                    onChange={changeHandler}
                    value={item.director}
                />
                <input
                    type="number"
                    name="metascore"
                    placeholder="Metascore"
                    onChange={changeHandler}
                    value={item.metascore}
                />
                <input
                    type="text"
                    name="stars"
                    placeholder="Stars"
                    onChange={changeHandler}
                    value={item.stars}
                />

                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateForm;