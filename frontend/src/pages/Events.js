import { useLoaderData, json, defer, Await } from 'react-router-dom';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

function EventsPage() {

  // const data= useLoaderData(); destructure the data to get defer key events directly
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{textAlign: 'center'}} >Loading...</p>}>
      <Await resolve={events}>
      {/* Await  wants a function which will be called once the events are resolved the function takes events as parameter*/}
      {(loadedEvents)=> <EventsList events={loadedEvents} />} 
    </Await> {/*resolve takes a value that is getting defer*/}
    </Suspense>
  );
};

export default EventsPage;

async function loadEvents () {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
      // throw new Response(JSON.stringify({ message: 'could not fetch events.'}),
      //   {status: 500},
      //   );
      //or we can do this 
    throw json ({message: 'could not fetch events.'},
      {status: 500}
    );

  } else {
    const resData = await response.json();
    return resData.events;   //we need events because thats the key in defer
  }
};

export async function loader () {
   return(
    defer({
      events: loadEvents(),  //=> loadEvents has to be executed not pointed This loadEvents return
    })// - promise which is then defer
   );

};