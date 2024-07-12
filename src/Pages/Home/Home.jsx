import React from 'react';
import { Link } from 'react-router-dom';
import WaveMaker from '../../Customs/WaveMaker/WaveMaker';
import BoxShadow from '../../Customs/BoxShadow/BoxShadow';
import CustomBox from '../../Customs/CustomBox/CustomBox';
import ShapeEditor from '../../Customs/ShapeEditor/ShapeEditor';

const Home = () => {
    return (
        <div className="Home">

            {/* <h1>Home</h1>

            <Link to="/box-shadow">Box Shadow</Link>
            <WaveMaker></WaveMaker> */}

            {/* <BoxShadow></BoxShadow> */}
            <CustomBox></CustomBox>
            {/* <ShapeEditor></ShapeEditor> */}

        </div>
    );
};

export default Home;