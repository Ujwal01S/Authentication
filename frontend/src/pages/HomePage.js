import { Link } from 'react-router-dom';

function HomePage() {
    return(
        <>
            <h1>HomePage!!</h1>
            <p>Goto <Link to='/events'>Events page</Link></p>
        </>
    );
};

export default HomePage;