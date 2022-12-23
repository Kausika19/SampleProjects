import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { Card, Title, Paragraph } from "react-native-paper";
import { Component } from "react/cjs/react.production.min";

import Header from "./header";

export default class StartingPage extends Component {
  state = {
    articles: [],
    isLoading: true,
    errors: null,
    active: [true, false, false, false, false],
  };

  handleClick = (active) => {
    if (active === 1) {
      this.setState({ active: [true, false, false, false, false] });
    }
    if (active === 2) {
      this.setState({ active: [false, true, false, false, false] });
    }
    if (active === 3) {
      this.setState({ active: [false, false, true, false, false] });
    }
    if (active === 4) {
      this.setState({ active: [false, false, false, true, false] });
    }
    if (active === 5) {
      this.setState({ active: [false, false, false, false, true] });
    }
  };

  getArticles(request) {
    axios
      .get(request)
      .then((response) =>
        response.data.articles.map((articles) => ({
          date: `${articles.publishedAt}`,
          title: `${articles.title}`,
          url: `${articles.url}`,
          description: `${articles.description}`,
          urlToImage: `${articles.urlToImage}`,
        }))
      )
      .then((articles) => {
        this.setState({
          articles,
          isLoading: false,
        });
      });
  }
  componentDidMount() {
    const req =
      "https://newsapi.org/v2/everything?q=Apple&from=2022-12-22&sortBy=popularity&apiKey=3549e210405a4f6893ce58618eff6353";
    this.getArticles(req);
  }

  all = () => {
    this.handleClick(1);
    const req =
      "https://newsapi.org/v2/everything?q=Apple&from=2022-12-22&sortBy=popularity&apiKey=3549e210405a4f6893ce58618eff6353";
    this.getArticles(req);
  };

  business = () => {
    this.handleClick(2);

    const req =
      "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3549e210405a4f6893ce58618eff6353";
    this.getArticles(req);
  };

  sports = () => {
    this.handleClick(3);
    const req =
      "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=3549e210405a4f6893ce58618eff6353";
    this.getArticles(req);
  };

  health = () => {
    this.handleClick(4);
    const req =
      "https://newsapi.org/v2/top-headlines?category=health&apiKey=3549e210405a4f6893ce58618eff6353";
    this.getArticles(req);
  };

  technology = () => {
    this.handleClick(5);
    const req =
      "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=3549e210405a4f6893ce58618eff6353";
    this.getArticles(req);
  };

  render() {
    const { isLoading, active, articles } = this.state;
    return (
      <SafeAreaView>
        <View>
          <Header />
          <ScrollView style={styles.view}>
            {!isLoading ? (
              articles.map((article) => {
                const { date, title, url, description, urlToImage } = article;
                return (
                  <Card
                    key={url}
                    style={styles.card}
                    onPress={() => {
                      Linking.openURL(`${url}`);
                    }}
                  >
                    <View style={styles.newsContainer}>
                      <View style={styles.title}>
                        <Title style={styles.titleText}>{title}</Title>
                      </View>

                      {urlToImage == "" ? (
                        <View style={styles.imgContainer}>
                          <Image
                            style={styles.img}
                            source={{
                              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png",
                            }}
                          />
                        </View>
                      ) : (
                        <View style={styles.imgContainer}>
                          <Image
                            style={styles.img}
                            source={{
                              uri: urlToImage,
                            }}
                          />
                        </View>
                      )}
                    </View>
                    <View style={styles.paragraph}>
                      <Text style={styles.textDate}>Publish At: {date}</Text>
                      <Text></Text>
                      <Paragraph style={styles.paragraphText}>
                        {description}
                      </Paragraph>
                    </View>
                  </Card>
                );
              })
            ) : (
              <View style={styles.loading}>
                <Text style={styles.text}>Loading...</Text>
              </View>
            )}
          </ScrollView>
        </View>
        <View style={styles.tabContainer}>
          <Text
            onPress={this.all}
            style={{
              ...styles.btn,
              backgroundColor: active[0] ? "#83b1cf" : "white",
            }}
          >
            All
          </Text>
          <Text
            style={{
              ...styles.btn,
              backgroundColor: active[1] ? "#83b1cf" : "white",
            }}
            onPress={this.business}
          >
            Business
          </Text>
          <Text
            style={{
              ...styles.btn,
              backgroundColor: active[2] ? "#83b1cf" : "white",
            }}
            onPress={this.sports}
          >
            Sports
          </Text>
          <Text
            style={{
              ...styles.btn,
              backgroundColor: active[3] ? "#83b1cf" : "white",
            }}
            onPress={this.health}
          >
            Health
          </Text>
          <Text
            style={{
              ...styles.btn,
              backgroundColor: active[4] ? "#83b1cf" : "white",
            }}
            onPress={this.technology}
          >
            Tech
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  view: { height: "77%" },
  card: {
    marginTop: 10,
    borderColor: "black",
    borderRadius: 5,
    borderBottomWidth: 1,
  },
  newsContainer: { flexDirection: "row" },
  title: {
    justifyContent: "space-around",
    flex: 2 / 3,
    margin: 10,
  },
  titleText: {
    fontSize: 25,
    fontFamily: "serif",
    fontWeight: "bold",
  },
  imgContainer: { flex: 1 / 3, margin: 10 },
  img: {
    height: 130,
    width: 110,
  },
  paragraph: { margin: 10 },
  paragraphText: {
    fontSize: 17,
    fontFamily: "notoserif",
    fontWeight: "500",
    color: "black",
  },
  textDate: {
    fontSize: 14,
    fontFamily: "sans-serif",
    color: "grey",
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  text: {
    fontSize: 18,
    fontFamily: "sans-serif-light",
    fontStyle: "italic",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
  },
  btn: {
    fontSize: 21,
    marginBottom: 10,
    margin: 5,
    padding: 3,
    border: "solid",
    borderWidth: 1,
    borderColor: "#83b1cf",
    borderRadius: 5,
  },
});
