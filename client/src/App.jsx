import './App.css';
import DateTimePicker from 'react-datetime-picker';
import { useState } from 'react';

function App() {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [user, setUser] = useState(null);

  async function googleSignIn() {
    try {
      const response = await fetch('http://localhost:4000/api/signin', {
        method: 'POST',
        credentials: 'include', // Ensure cookies are included
      });
      const data = await response.json();
      if (data.user) {
        setUser(data.user);
        alert("Signed in successfully!");
      } else {
        throw new Error("Sign-in failed");
      }
    } catch (error) {
      alert("Error logging in to Google");
      console.error(error);
    }
  }

  async function createCalendarEvent() {
    const eventDetails = {
      eventName,
      eventDescription,
      start: start.toISOString(),
      end: end.toISOString(),
    };

    try {
      const response = await fetch('http://localhost:4000/api/create-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(eventDetails),
      });
      const data = await response.json();
      if (data.success) {
        alert("Event created successfully, check your Google Calendar!");
      } else {
        throw new Error(data.error || "Event creation failed");
      }
    } catch (error) {
      alert("Error creating calendar event");
      console.error(error);
    }
  }

  return (
    <div className="App">
      <div style={{ width: "400px", margin: "30px auto" }}>
        {user ? (
          <>
            <h2>Hey there, {user.email}</h2>
            <p>Start of your event</p>
            <DateTimePicker onChange={setStart} value={start} />
            <p>End of your event</p>
            <DateTimePicker onChange={setEnd} value={end} />
            <p>Event name</p>
            <input type="text" onChange={(e) => setEventName(e.target.value)} />
            <p>Event description</p>
            <input type="text" onChange={(e) => setEventDescription(e.target.value)} />
            <hr />
            <button onClick={createCalendarEvent}>Create Calendar Event</button>
          </>
        ) : (
          <button onClick={googleSignIn}>Sign In With Google</button>
        )}
      </div>
    </div>
  );
}

export default App;
