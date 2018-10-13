/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {
  Component
} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  RefreshControl,
  Alert,
  Image
} from 'react-native';

import * as Animatable from 'react-native-animatable';

var {
  height,
  width
} = Dimensions.get('window');

const AnimationStateTop = {
  0: {
    opacity: .8,
    top: 10,
    transform: [{
      rotate: '180deg'
    }]
  },
  0.2: {
    top: 20,
    opacity: 1,
    transform: [{
      rotate: '0deg'
    }]
  },
  0.5: {
    top: 40,
    transform: [{
      rotate: '0deg'
    }]

  },
  0.8: {
    top: 20,
    opacity: 1,
    transform: [{
      rotate: '0deg'
    }]
  },
  1: {
    opacity: .8,
    top: 10,
    transform: [{
      rotate: '-180deg'
    }]

  },
};

type Props = {};
export default class App extends Component < Props > {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      scrollPositionY: 0,
      AnimationStateTop: null,
      AnimationStateBottom: null,
      borderRadiusTop: 0,
      fisrstOpacity: 0,
    };
  }
  render() {
    var RefreshComponent = (
      <View style={[styles.topBar]}>
        <Animatable.View animation={this.state.AnimationStateTop1} duration={1000} easing={"ease-in-out"} iterationCount={'infinite'} direction="alternate" style={{height:10,width:10,backgroundColor:"#333",borderRadius:0,opacity:this.state.fisrstOpacity, position:'absolute',top:-this.state.scrollPositionY/6  ,}}></Animatable.View>
        <Animatable.View animation={this.state.AnimationStateTop2} duration={1000} easing={"ease-in-out"} iterationCount={'infinite'} direction="alternate" style={{height:10,width:10,backgroundColor:"#333",borderRadius:20,opacity:0, position:'absolute',top:-this.state.scrollPositionY/6  ,}}></Animatable.View>
        <Animatable.View animation={this.state.AnimationStateTop3} duration={1000} easing={"ease-in-out"} iterationCount={'infinite'} direction="alternate" style={{backgroundColor:"#fff",opacity:0, position:'absolute',top:-this.state.scrollPositionY/6  ,}}>
          <View style={{
          borderColor: 'transparent',    
          borderBottomWidth:10,
          borderRightWidth: 6,
          borderLeftWidth: 6,
          borderBottomColor: '#333'}}/>
        </Animatable.View>
         <Animatable.View animation={this.state.AnimationStateBottom} duration={1000} easing={"ease-in-out"} iterationCount={'infinite'} direction="alternate"  style={{height:2,width:4, transform: [{scaleX:-this.state.scrollPositionY / 30}],backgroundColor:"#ccc",borderRadius:20, position:'absolute',top:-this.state.scrollPositionY/6*5 ,}}></Animatable.View>
      </View>
    )
    return (
      <View>
       <View style={{zIndex:9999,}} >
        <Image
          style={{width: width, height:330/1125*width }}
          source={require('./img/topBar.png')}
        />
        <View style={{height:1,backgroundColor:"#f5f5f5"}} />
       </View>
      <View style={styles.container}>
        {RefreshComponent}
        <ScrollView 
        scrollEventThrottle={10}
        onScrollBeginDrag={()=>{
          this.setState({
            AnimationStateTop:null,
            AnimationStateBottom:null,
            AnimationStateTop1: null,
            AnimationStateTop2: null,
            AnimationStateTop3: null,
            fisrstOpacity:1,
          });
          clearTimeout(this.timer);
        }}
        onScrollEndDrag={this._onScrollEndDraghandle.bind(this)}
        onScroll={(event)=>{
          console.log(RefreshControl.SIZE)
          this.setState({
            scrollPositionY:event.nativeEvent.contentOffset.y ,
          })          
    }}
       
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            style={{opacity:0}}
            refreshing={this.state.refreshing}
            onRefresh = {
              this.renderRefreshComponent.bind(this)
            }
          />
        }>
          <Image
          style={{width: width, height:6789/1125*width, }}
          source={require('./img/container.png')}
        />
        </ScrollView>
      </View>
      </View>
    );
  }

  _chechState() {
    // console.log(this.state.AnimationStateTop2);
    if (this.state.AnimationStateTop1 == AnimationStateTop) {
      this.setState({
        AnimationStateTop1: null,
        AnimationStateTop2: AnimationStateTop
      })
    } else if (this.state.AnimationStateTop2 == AnimationStateTop) {
      this.setState({
        AnimationStateTop2: null,
        AnimationStateTop3: AnimationStateTop
      })
    } else if (this.state.AnimationStateTop3 == AnimationStateTop) {
      this.setState({
        AnimationStateTop3: null,
        AnimationStateTop1: AnimationStateTop
      })
    }
    this.timer = setTimeout(() => {
      this._chechState()

    }, 1000);
  }

  _onScrollEndDraghandle() {
    this.setState({
      AnimationStateBottom: {
        0: {
          transform: [{
            scaleX: .5
          }]

        },
        .4: {
          transform: [{
            scaleX: 3
          }]
        },

        0.5: {
          transform: [{
            scaleX: 6
          }]

        },
        .6: {
          transform: [{
            scaleX: 3
          }]
        },
        1: {
          transform: [{
            scaleX: .5
          }]

        },
      },
      AnimationStateTop1: AnimationStateTop,
      AnimationStateTop2: null,
      AnimationStateTop3: null,
      fisrstOpacity: 0,
    })

    this._chechState()



  }
  renderRefreshComponent() {
    this.setState({
      refreshing: true,

    });
    this.timer = setTimeout(() => {
      this.setState({
        borderRadiusTop: 20
      });

    }, 1000);

    this.timer = setTimeout(() => {
      this.setState({
        refreshing: false,
      });

    }, 6000);

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0
  },
  topBar: {


    // backgroundColor: 'blue',
    position: 'absolute',
    width: width,
    justifyContent: 'center',
    flexDirection: 'row',


  },
  scrollContainer: {
    height: height,
    width: width,
    top: 0,
    left: 0,
    position: 'absolute'
  },
  testView: {
    backgroundColor: '#9B9B9B',
    height: 500,

  },
  testView2: {
    backgroundColor: '#9B9B9B',
    height: 500,

  }

});
