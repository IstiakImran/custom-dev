import React from 'react';
import { Link } from 'react-router-dom';
import WaveMaker from '../../Customs/WaveMaker/WaveMaker';

const Home = () => {
    return (
        <div className="Home">

            <h1>Home</h1>

            <Link to="/box-shadow">Box Shadow</Link>
            <WaveMaker></WaveMaker>

        </div>
    );
};

export default Home;