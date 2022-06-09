import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Thisform() {
  const [message, setMessage] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [contact, setContact] = useState(null);
  const [date, setDate] = useState(null);
  const [val, setVal] = useState([false, "red"]);

  let handlesubmit = async (e)=>{
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:5000/", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          contact: contact, 
          date: date
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if( response.status === 200){
        setMessage("Successfully Submitted.")
        setVal([true, "text-success"])
      } else {
        setMessage("An error occured");
        setVal([false, "text-danger"])
      }
    } catch(err) {
      console.log(err)
      setMessage("Error Occured");
      setVal([false, "text-danger"])
    }
  }

  return (
    <div className="form">
      <h3 className="head mb-4 text-center"> Appointment Form </h3>
      <Form action="http://localhost:5000/" method="POST">
        <Form.Group className="mb-3">
          <Form.Label className="font-weight-bold">Name:</Form.Label>
          <Form.Control type="text" name="name" 
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
          required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="font-weight-bold">Email Address:</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email address" 
          onChange={(e) => setEmail(e.target.value)}
          required/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="font-weight-bold">Contact Number:</Form.Label>
          <Form.Control type="text" name="contact" placeholder="Enter your Contact Number"
          onChange={(e) => setContact(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label className="font-weight-bold">Date:</Form.Label>
          <Form.Control type="date" name="date"
          onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" disabled={val[0]} onClick={handlesubmit}>
          Submit
        </Button>
      </Form>
      <p className = {`message ${val[1]}`}>
        {message}
      </p>
      <p className="short">by <a href="https://github.com/shreyanssoni" target="_blank">Shreyans Soni</a> </p>
    </div>
  );
}
