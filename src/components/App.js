
import React, { useState } from "react";
import "./App.css";

function App() {
    const [fields, setFields] = useState([
        { id: 1, name: "", age: "" }
    ]);

    const addFields = () => {
        setFields((prevFields) => [
            ...prevFields,
            {
                id: Date.now() + Math.random(),
                name: "",
                age: ""
            }
        ]);
    };

    const removeFields = (id) => {
        setFields((prevFields) =>
            prevFields.filter((field) => field.id !== id)
        );
    };

    const handleChange = (id, event) => {
        const { name, value } = event.target;

        setFields((prevFields) =>
            prevFields.map((field) =>
                field.id === id
                    ? { ...field, [name]: value }
                    : field
            )
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = fields.map(({ name, age }) => ({
            name,
            age
        }));

        console.log(formData);
    };

    return (
        <div className="container">
            <h1>Dynamic Fields</h1>

            <form onSubmit={handleSubmit}>
                {fields.map((field, index) => (
                    <div className="field-group" key={field.id}>
                        <h3>Person {index + 1}</h3>

                        <label htmlFor={`name-${field.id}`}>
                            Name
                        </label>

                        <input
                            id={`name-${field.id}`}
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={field.name}
                            onChange={(event) =>
                                handleChange(field.id, event)
                            }
                            required
                        />

                        <label htmlFor={`age-${field.id}`}>
                            Age
                        </label>

                        <input
                            id={`age-${field.id}`}
                            type="number"
                            name="age"
                            placeholder="Enter age"
                            value={field.age}
                            onChange={(event) =>
                                handleChange(field.id, event)
                            }
                            min="0"
                            required
                        />

                        <button
                            type="button"
                            className="remove-btn"
                            onClick={() => removeFields(field.id)}
                            disabled={fields.length === 1}
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <div className="actions">
                    <button
                        type="button"
                        onClick={addFields}
                    >
                        Add Field
                    </button>

                    <button type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default App;
