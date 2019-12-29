import React, { Component } from 'react';
import { connect } from 'react-redux';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import './App.css';

import * as screensActions from '../store/actions/screens';

import Loader from '../components/Loader';

const {
    getAllScreens,
    createScreen
} = screensActions;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null
        };
        this.webcam = React.createRef();
    }

    async componentDidMount() {
        await faceapi.loadFaceDetectionModel('./weights');
        await faceapi.loadFaceLandmarkModel('./weights');
        await faceapi.loadFaceRecognitionModel('./weights');
        await faceapi.nets.ageGenderNet.load('./weights');
        this.props.getAllScreens();
    }

    takeScreenshot = async () => {
        const screenshot = this.webcam.current.getScreenshot();
        let img = await faceapi.fetchImage(screenshot);

        const detections = await faceapi.detectAllFaces(img, new faceapi.SsdMobilenetv1Options())
            .withFaceLandmarks().withAgeAndGender();

        this.props.createScreen({
            _id: Math.random().toString(36).substr(2, 9),
            age: Math.round(detections[0].age),
            gender: detections[0].gender,
            screenshot: screenshot
        });
    };

    render() {
        const { screens, loading } = this.props;
        return (
            <div className='main'>
                <div className='camera'>
                    <Webcam
                        audio={false}
                        screenshotFormat='image/jpeg'
                        ref={this.webcam}
                        videoConstraints={{
                            width: 500,
                            height: 500,
                            facingMode: 'user'
                        }}
                    />
                </div>
                <button className='button' onClick={this.takeScreenshot} disabled={loading}>
                    Capture
                </button>
                {
                    !loading ? (
                        <div className='results'>
                            <div className='results__item'>
                                {
                                    screens && screens.length > 0 ? (
                                        screens.map((item) => (
                                            <div key={item._id} className='results__item'>
                                                <img width={200} height={200} src={item.screenshot} />
                                                <div>
                                                    <b>Gender:</b> {item.gender}
                                                </div>
                                                <div>
                                                    <b>Age:</b> {item.age}
                                                </div>
                                            </div>
                                        ))
                                    ) : null
                                }
                            </div>
                        </div>
                    ) : <Loader />

                }
            </div>
        );
    }
}

export default connect(
   state => ({
       screens: state.Screens.screens,
       loading: state.Screens.loading
   }),
   {
       getAllScreens,
       createScreen
   }
)(App);
