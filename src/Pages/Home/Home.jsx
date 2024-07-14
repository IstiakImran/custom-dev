import React from 'react';
import { Link } from 'react-router-dom';
import WaveMaker from '../../Customs/WaveMaker/WaveMaker';
import BoxShadow from '../../Customs/BoxShadow/BoxShadow';
import CustomBox from '../../Customs/CustomBox/CustomBox';
import ShapeEditor from '../../Customs/ShapeEditor/ShapeEditor';
import CardCreator from '../../Customs/CardCreator/CardCreator';
import TextCustomizer from '../../Customs/TextCustomizer/TextCustomizer';
import Wysiwyg from '../../Customs/WYSIWYG/WYSIWYG/Wysiwyg';
import App from '../../Customs/DivElement/App';
import Editor from '../../Customs/WYSIWYG/Editor/Editor';



const Home = () => {
    return (
        <div className="Home">

            {/* <h1>Home</h1>

            <Link to="/box-shadow">Box Shadow</Link>
            <WaveMaker></WaveMaker> */}

            {/* <BoxShadow></BoxShadow> */}
            {/* <CustomBox></CustomBox> */}
            {/* <ShapeEditor></ShapeEditor> */}
            {/* <CardCreator></CardCreator> */}
            {/* <TextCustomizer></TextCustomizer> */}
            {/* <Wysiwyg></Wysiwyg> */}
            {/* <App></App> */}
            <Editor></Editor>

        </div>
    );
};

export default Home;