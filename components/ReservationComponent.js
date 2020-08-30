import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, Alert, TouchableOpacity,Platform} from 'react-native';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import * as Calendar from 'expo-calendar';
import Moment from 'moment';
class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(),
            mode: 'date'
            // showModal: false
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };
    // toggleModal() {
    //     this.setState({showModal: !this.state.showModal});
    // }
    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }
    handleReservation() {
        // console.log(JSON.stringify(this.state));
        // this.toggleModal();
        Alert.alert(
            'Your Reservation OK?',
            `Number of Guests : ${this.state.guests}\nSmoking? ${this.state.smoking}\nDate and Time: ${this.state.date}`,
            [
                { 
                    text: 'Cancel', 
                    onPress: () => {this.resetForm();},
                    style: ' cancel'
                },
                {
                    text: 'OK',
                    onPress: () => {this.addReservationToCalendar(this.state.date); this.presentLocalNotification(this.state.date);this.resetForm();}
                }
            ],
            { cancelable: false }
        );
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(),
            showModal: false,
            mode:'date'
        });
    }
    async obtainCalendarPermission(){
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.CALENDAR);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to access calender');
            }
        }
        return permission;
    }

    async getDefaultCalendarSource() {
        const defaultCalendars = await Calendar.getCalendarsAsync();
        return defaultCalendars[0];
      }
    async  addReservationToCalendar(date) {
        console.log('calender cretion executed');
        await this.obtainCalendarPermission();
        console.log('perssion handeled');
        const defaultCalendarSource =
        Platform.OS === 'ios'
            ? await Calendar.getDefaultCalendarAsync()
            : await this.getDefaultCalendarSource();
        console.log('calender Id generated',defaultCalendarSource.id);

        Calendar.createEventAsync(defaultCalendarSource.id,{
            title: 'Con Fusion Table Reservation',
            startDate: new Date(Date.parse(date)),
            endDate: new Date(Date.parse(date) + (2*60*60*1000)),
            timeZone: 'Asia/Hong_Kong',
            location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
        });


    }
    render() {
        return(
            <ScrollView>
                <Animatable.View animation="zoomInUp" duration={2000}>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guests</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={this.state.guests}
                    onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                </Picker>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                <Switch
                    style={styles.formItem}
                    value={this.state.smoking}
                    trackColor='#512DA8'
                    onValueChange={(value) => this.setState({smoking: value})}>
                </Switch>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date and Time</Text>
                {/* <DatePicker
                    style={{flex: 2, marginRight: 20}}
                    date={this.state.date}
                    format=''
                    mode="datetime"
                    placeholder="select date and Time"
                    minDate="2020-01-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys. 
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                /> */}
                <TouchableOpacity style={styles.formItem}
            style={{
                padding: 7,
                borderColor: '#512DA8',
                borderWidth: 2,
                flexDirection: "row"
            }}
            onPress={() => this.setState({ show: true, mode: 'date' })}
      >
          <Icon type='font-awesome' name='calendar' color='#512DA8' />
          <Text >
              {' ' + Moment(this.state.date).format('DD-MMM-YYYY h:mm A') }
          </Text>
      </TouchableOpacity>
      {/* Date Time Picker */}
      {this.state.show && (
          <DateTimePicker
              value={this.state.date}
              mode={this.state.mode}
              minimumDate={new Date()}
              minuteInterval={30}
              onChange={(event, date) => {
                  if (date === undefined) {
                      this.setState({ show: false });
                  }
                  else {
                      this.setState({
                          show: this.state.mode === "time" ? false : true,
                          mode: "time",
                          date: new Date(date)
                      });
                  }
              }}
          />
      )}
                </View>
                <View style={styles.formRow}>
                <Button
                    onPress={() => this.handleReservation()}
                    title="Reserve"
                    color="#512DA8"
                    accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                {/* <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                        <Text style = {styles.modalTitle}>Your Reservation</Text>
                        <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style = {styles.modalText}>Date and Time: {this.state.date}</Text>
                        
                        <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color="#512DA8"
                            title="Close" 
                            />
                    </View>
                </Modal> */}
                </Animatable.View>
            </ScrollView>
            
        );
    }

};


const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
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
     }
});

export default Reservation;