import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  CheckBox,
  Button,
  Image,
  Alert,
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as Font from "expo-font";
import FloatingActionButton from "react-native-floating-action-button";
import { Hoshi } from "react-native-textinput-effects";
import { ColorPicker, fromHsv } from "react-native-color-picker";
import DatePicker from "react-native-modal-datetime-picker";
import Swipeout from "react-native-swipeout";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

//Text and background of counter colors
let textColor = "#000000";
let dateBackgroundColor = "#000000";
let currentlySelectingTextColor = false;

const homeStyle = StyleSheet.create({
  container: {
    backgroundColor: "#3da7db",
    flex: 1,
    paddingTop: 50,
    paddingBottom: 20,
  },
  add: {
    position: "absolute",
    bottom: 10,
    zIndex: 999,
    height: 60,
    right: 10,
  },
});

const dateStyle = StyleSheet.create({
  dateDiv: {
    width: "100%",
    paddingLeft: "2%",
    height: 150,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageBackground: {
    width: "100%",
    height: 150,
  },
  info: {
    justifyContent: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    maxWidth: 250,
    flexWrap: "wrap",
    textAlign: "left",
  },
  infoTextTitle: {
    fontFamily: "Manrope",
    fontSize: 25,
    maxWidth: 250,
    height: "70%",
    lineHeight: 30,
    textAlign: "left",
  },
  infoTextDate: {
    fontFamily: "Manrope",
    fontSize: 20,
    height: "30%",
    textAlign: "left",
  },

  daysUntil: {
    display: "flex",
    textAlign: "right",
  },
  daysUntilText: {
    fontSize: 65,
    lineHeight: 150,
    fontFamily: "Manrope",
  },
});

const addStyle = new StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F7F6",
  },
  dateDiv: {
    marginTop: 30,
    marginBottom: 30,
    display: "flex",
    textAlign: "center",
  },
  dateText: {
    fontSize: 50,
    textAlign: "center",
    fontFamily: "Jost",
  },
  checkboxDiv: {
    marginTop: 30,
    marginBottom: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    transform: [{ scale: 2 }],
  },
  checkboxText: {
    lineHeight: 30,
    fontFamily: "Jost",
  },
  colorPickerDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  colorPickerText: {
    fontSize: 30,
    fontFamily: "Jost",
    lineHeight: 50,
    marginRight: 20,
  },
  colorPicker: {
    width: 50,
    height: 50,
  },
  submit: {
    bottom: 20,
    width: "100%",
    position: "absolute",
  },
});
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }
  static navigationOptions = {
    headerShown: false,
  };
  render() {
    if (!this.state.isLoading) {
      return (
        <View style={homeStyle.container}>
          <ScrollView horizontal={false}>
            <Counter
              textColor="white"
              name="Testowy event"
              date={new Date("2020-06-03")}
              imageLink={require("./test.jpg")}
              isImage={true}
              id={1}
            />

            <Counter
              textColor="white"
              name="Testowy event numer 2 - urodzinki :)"
              date={new Date("2020-07-03")}
              isImage={false}
              backgroundColor={"lightgreen"}
              id={2}
            />
            <Counter
              textColor="white"
              name="Testowy event numer 3 :)"
              date={new Date("2020-08-05")}
              isImage={false}
              backgroundColor={"lightgreen"}
              id={3}
            />
            <Counter
              textColor="white"
              name="Testowy event numer 4 :)"
              date={new Date("2020-05-22")}
              isImage={false}
              backgroundColor={"lightgreen"}
              id={4}
            />
            <Counter
              textColor="white"
              name="Testowy event numer 5 :)"
              date={new Date("2020-06-18")}
              isImage={false}
              backgroundColor={"lightgreen"}
              id={5}
            />
          </ScrollView>
          <View style={homeStyle.add}>
            <FloatingActionButton
              text="Dodaj"
              iconName="md-add"
              iconType="Ionicons"
              iconColor="#30bf84"
              textColor="#30bf84"
              shadowColor="#30bf84"
              rippleColor="#30bf84"
              size={70}
              iconSize={35}
              onPress={() => this.props.navigation.navigate("Add")}
            />
          </View>
        </View>
      );
    } else {
      //DEV - make a loading page
      return <Text>Loading...</Text>;
    }
  }
  async componentDidMount() {
    await Font.loadAsync({
      Manrope: require("./assets/fonts/Manrope.ttf"),
      Jost: require("./assets/fonts/Jost.ttf"),
    });
    this.setState({
      isLoading: false,
    });
  }
}

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.id;
    this.swipeoutBtns = [
      {
        text: "Usuń",
        backgroundColor: "#f54257",
        type: "delete",
        underlayColor: "#3da7db",
        onPress: () => {
          Alert.alert(
            "Usuń",
            "Czy na pewno chcesz usunąć to wydarzenie?",
            [
              { text: "Nie" },
              {
                text: "Tak",
                onPress: () => {
                  deleteEvent(this.id);
                },
              },
            ],
            { cancelable: true }
          );
        },
      },
    ];

    //Count the days remaining to the date
    let datesDifference = this.props.date - new Date();
    this.state = {
      daysUntil: Math.ceil(datesDifference / 86400000),
    };
  }
  render() {
    return (
      <Swipeout
        right={this.swipeoutBtns}
        backgroundColor="#3da7db"
        autoClose={true}
      >
        <View>
          <ImageBackground
            source={this.props.imageLink}
            style={dateStyle.imageBackground}
            blurRadius={5}
            imageStyle={{ opacity: this.props.isImage ? 1 : 0 }}
          >
            <View
              style={[
                dateStyle.dateDiv,
                {
                  backgroundColor: !this.props.isImage
                    ? this.props.backgroundColor
                    : "",
                },
              ]}
            >
              <View style={dateStyle.info}>
                <Text
                  style={[
                    dateStyle.infoTextTitle,
                    { color: this.props.textColor },
                  ]}
                >
                  {this.props.name}
                </Text>
                <Text
                  style={[
                    dateStyle.infoTextDate,
                    { color: this.props.textColor },
                  ]}
                >
                  {parseDate(this.props.date)}
                </Text>
              </View>
              <View style={dateStyle.daysUntil}>
                <Text
                  style={[
                    dateStyle.daysUntilText,
                    { color: this.props.textColor },
                  ]}
                >
                  {this.state.daysUntil}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </Swipeout>
    );
  }
}

//Parse date object into string
function parseDate(date) {
  date = new Date(date);
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: new Date(new Date().getTime() + 86400000), //(tommorow by default)
      isImage: false,
      textColor: textColor,
      datePickerVisible: false,
      image: null,
      backgroundColor: dateBackgroundColor,
      imageBtnColor: "#3b7cff",
      imageBtnTitle: "Wybierz zdjęcie",
    };
  }
  static navigationOptions = {
    title: "Dodaj wydarzenie",
    headerStyle: {
      backgroundColor: "#3da7db",
    },
    headerTintColor: "#ffffff",
  };
  render() {
    return (
      <View style={addStyle.container}>
        <Hoshi
          style={addStyle.input}
          label={"Nazwa wydarzenia"}
          borderColor={"#3da7db"}
          borderHeight={2}
          inputPadding={16}
          backgroundColor={"#F9F7F6"}
          value={this.state.name}
          onChangeText={(text) => {
            this.setState({ name: text });
          }}
        />
        <TouchableOpacity
          style={addStyle.dateDiv}
          onPress={() => this.setState({ datePickerVisible: true })}
        >
          <Text style={addStyle.dateText}>{parseDate(this.state.date)}</Text>
        </TouchableOpacity>
        <DatePicker
          isVisible={this.state.datePickerVisible}
          mode="date"
          date={this.state.date}
          onConfirm={(date) => {
            this.setState({ date: date, datePickerVisible: false });
          }}
          onCancel={() => this.setState({ datePickerVisible: false })}
        />
        <View style={addStyle.colorPickerDiv}>
          <Text style={addStyle.colorPickerText}>Wybierz kolor tekstu</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("PickColor");
              currentlySelectingTextColor = true;
            }}
            style={[
              addStyle.colorPicker,
              { backgroundColor: this.state.textColor },
            ]}
          ></TouchableOpacity>
        </View>
        <View style={addStyle.checkboxDiv}>
          <CheckBox
            value={this.state.isImage}
            onValueChange={() => {
              this.setState({ isImage: !this.state.isImage });
            }}
          />
          <Text style={addStyle.checkboxText}>Zdjęcie jako tło</Text>
        </View>
        {!this.state.isImage && (
          <View style={addStyle.colorPickerDiv}>
            <Text style={addStyle.colorPickerText}>Wybierz kolor tła</Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("PickColor");
                currentlySelectingTextColor = false;
              }}
              style={[
                addStyle.colorPicker,
                { backgroundColor: this.state.backgroundColor },
              ]}
            ></TouchableOpacity>
          </View>
        )}
        {this.state.isImage && (
          <Button
            title={this.state.imageBtnTitle}
            color={this.state.imageBtnColor}
            onPress={async () => {
              try {
                let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  allowsEditing: true,
                  aspect: [12, 5],
                  quality: 0.5,
                });
                if (!result.cancelled) {
                  this.setState({
                    image: result.uri,
                    imageBtnColor: "#27a162",
                    imageBtnTitle: "Wybrano",
                  });
                }
                console.log(result);
              } catch (e) {
                console.log(e);
              }
            }}
          />
        )}
        <View style={addStyle.submit}>
          <Button title="Dodaj wydarzenie" onPress={this.submit.bind(this)} />
        </View>
      </View>
    );
  }
  submit() {
    //DEV
    //Zapisywaie do bazy danych/localstoarge
    this.props.navigation.navigate("Home");
  }
  componentDidMount() {
    this.props.navigation.addListener("didFocus", () => {
      if (this.state.textColor != textColor) {
        this.setState({ textColor: textColor });
      }
      if (this.state.backgroundColor != dateBackgroundColor) {
        this.setState({ backgroundColor: dateBackgroundColor });
      }
    });
  }
}

class PickColor extends React.Component {
  static navigationOptions = {
    title: "Ustaw kolor",
    headerStyle: {
      backgroundColor: "#3da7db",
    },
    headerTintColor: "#ffffff",
  };
  render() {
    return (
      <ColorPicker
        style={{ flex: 1 }}
        onColorChange={(color) => {
          if (currentlySelectingTextColor) {
            textColor = fromHsv(color);
          } else {
            dateBackgroundColor = fromHsv(color);
          }
        }}
      />
    );
  }
}

function deleteEvent(id) {
  //DEV
  console.log("Usuwam event o id " + id);
}

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Add: Add,
    PickColor: PickColor,
  },
  {
    initialRouteName: "Home",
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
