import React, { Component }from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet ,Modal,Button, Alert, PanResponder} from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';
const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }
const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

function RenderComments(props){
    const comments = props.comments;
    const renderCommentItem = ({item, index}) => {
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating
                    imageSize={15}
                    readonly
                    startingValue={item.rating}
                    style={{ alignItems: "flex-start" }}
                />
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}> 
        <Card title='Comments' >
            
                <FlatList 
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                    />
        </Card>
        </Animatable.View>
    );
}

function RenderDish(props) {

    const dish = props.dish;
    handleViewRef = ref => this.view = ref;
    
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }

    const recognizeComment = ({ moveX, moveY, dx, dy })=>{
        if ( dx > 200 )
            return true;
        else
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));},
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );
            if(recognizeComment(gestureState))
            {
                props.toggleModal()
            }

            return true;
        }
    })

    if (dish != null) {
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                ref={this.handleViewRef}
                {...panResponder.panHandlers}>
                <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={
                           { flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"}
                        }>
                    <Icon
                        raised
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
                    <Icon
                        raised
                        reverse
                        name={'pencil'}
                        type='font-awesome'
                        color='#512DA8'
                        onPress={() => props.toggleModal()}
                    />
                    </View>
                </Card>
                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}

class Dishdetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            rating:4,
            author: '',
            comment:'',
            date: ''
        }
    }
    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }
    markFavorite(dishId){
        this.props.postFavorite(dishId);
    }
    handleSubmit(dishId){
        this.props.postComment(dishId,this.state.rating,this.state.author,this.state.comment);
        this.toggleModal();
    }
    static navigationOptions = {
        title: 'Dish Details'
    };
    render(){
        const dishId = this.props.route.params.dishId;
        return(
            
                <ScrollView>
                    <RenderDish dish={this.props.dishes.dishes[+dishId]}
                        favorite={this.props.favorites.some(el => el === dishId)}
                        toggleModal = {() => this.toggleModal()}
                        onPress={() => this.markFavorite(dishId)} 
                        />
                    <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />

                    <Modal animationType = {"slide"} transparent = {false}
                            visible = {this.state.showModal}
                            onDismiss = {() => this.toggleModal() }
                            onRequestClose = {() => this.toggleModal() }>
                        <View>
                        <Rating
                            imageSize={30}
                            startingValue={4}
                            showRating
                            onFinishRating={(rating) => this.setState({rating : rating})}
                            style={{ paddingVertical: 10 }}
                            />
                        <Input placeholder = 'Your name' 
                            onChangeText = {(text) => this.setState({author : text})}
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        />
                        <Input placeholder = 'Your comment' 
                            onChangeText = {(text) => this.setState({comment : text})}
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                        />
                        <View style={styles.btn}>
                            <Button 
                                onPress = {() =>{this.handleSubmit(dishId);}}
                                color="#512DA8"
                                title="Submit" 
                                /> 
                        </View>
                        <View style={styles.btn}>
                        <Button style={styles.btn}
                            onPress = {() =>{this.toggleModal();}}
                            color="silver"
                            title="Close" 
                            /> 
                        </View> 
                        </View>
                            
                    </Modal>    
                </ScrollView>
            
        );    
    }
};
const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     },
     btn:{
        margin:10
     }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);