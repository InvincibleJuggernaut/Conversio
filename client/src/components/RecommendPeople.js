import React from 'react';
import { Button, Form } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

const RecommendPeople = () => {

    const displayPeople = () => {
        console.log("Hi works");
    }
    return (
        <>
        <Button type="submit" onClick={displayPeople}>
            See people
        </Button>
        </>

    );
};


export default RecommendPeople;