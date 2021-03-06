import {
  Camera,
  Video,
  FileSystem,
  Permissions,
} from 'expo';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Slider,
  Image,
  Picker,
  Button,
  ScrollView,
  Vibration,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

export default class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };


    this.end = this.end.bind(this);
  }
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    ratios: [],
    photoId: 1,
    showGallery: false,
    photos: [],
  };

  componentDidMount() {
    // FileSystem.makeDirectoryAsync(
    //   FileSystem.documentDirectory + 'photos'
    // ).catch(e => {
    //   console.log(e, 'Directory exists');
    // });
  }

  getRatios = async function() {
    const ratios = await this.camera.getSupportedRatios();
    return ratios;
  };

  // toggleView() {
  //   this.setState({
  //     showGallery: !this.state.showGallery,
  //   });
  // }

  // toggleFacing() {
  //   this.setState({
  //     type: this.state.type === 'back' ? 'front' : 'back',
  //   });
  // }
  //
  // toggleFlash() {
  //   this.setState({
  //     flash: flashModeOrder[this.state.flash],
  //   });
  // }
  //
  // setRatio(ratio) {
  //   this.setState({
  //     ratio,
  //   });
  // }
  //
  // toggleWB() {
  //   this.setState({
  //     whiteBalance: wbOrder[this.state.whiteBalance],
  //   });
  // }
  //
  // toggleFocus() {
  //   this.setState({
  //     autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
  //   });
  // }
  //
  // zoomOut() {
  //   this.setState({
  //     zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
  //   });
  // }
  //
  // zoomIn() {
  //   this.setState({
  //     zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
  //   });
  // }
  //
  // setFocusDepth(depth) {
  //   this.setState({
  //     depth,
  //   });
  // }

  takePicture = async function() {
    if (this.camera) {
      this.camera.takePictureAsync({ base64: true }).then(data => {
        //console.log(data);
        const { navigate } = this.props.navigation;
        navigate('ConfirmPic', {data: data});
        // FileSystem.moveAsync({
        //   from: data,
        //   to: `${FileSystem.documentDirectory}photos/Photo_${this.state
        //     .photoId}.jpg`,
        // }).then(() => {
        //   this.setState({
        //     photoId: this.state.photoId + 1,
        //   });
        //   Vibration.vibrate();
        // });
      });
    }
  };

  // renderGallery() {
  //   return <GalleryScreen onPress={this.toggleView.bind(this)} />;
  // }
  end() {
    const { navigate } = this.props.navigation;

    navigate('end');
  };

  renderCamera() {
    return (
      <Camera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}>

        <View
          style={{
            flex: 0.1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.picButton,
              { flex: 0.3, alignSelf: 'flex-end' },
            ]}
            onPress={this.takePicture.bind(this)}>
            <Text style={styles.text}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    );
  }
// {this.state.showGallery ? this.end() : this.renderCamera()}
  render() {
    return (
      <View style={styles.container}>
        {this.state.showGallery ? this.end() : this.renderCamera()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ivory',
  },
  navigation: {
    flex: 1,
  },
  button: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 15,
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  row: {
    flexDirection: 'row',
  },
});
