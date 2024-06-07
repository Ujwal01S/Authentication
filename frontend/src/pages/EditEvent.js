
import { useRouteLoaderData } from 'react-router-dom';
import EventForm from '../components/EventForm';

function EditEventPage () {
    const data= useRouteLoaderData('event-detail'); //=> THis data is provided by backend that is being fetched by loader
    return (
        <EventForm method='patch' event={data.event}/>
    );
};


export default EditEventPage;