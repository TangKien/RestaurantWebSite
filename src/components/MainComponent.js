import React, { Component } from "react";

import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import { COMMENTS } from "../shared/comments";
import { LEADERS } from "../shared/leaders";
import { PROMOTIONS } from "../shared/promotions";
import { DISHES } from "../shared/dishes";
import { Routes, Route, Navigate, useParams } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
      selectedDish: null,
    };
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={
            this.state.promotions.filter((promotion) => promotion.featured)[0]
          }
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };

    const DishWithId = () => {
      let params = useParams();
      return (
        <DishDetail
          dish={
            this.state.dishes.filter(
              (dish) => dish.id === parseInt(params.dishId, 10)
            )[0]
          }
          comments={this.state.comments.filter(
            (comment) => comment.dishId === parseInt(params.dishId, 10)
          )}
        />
      );
    };

    return (
      <div>
        <Header />
        <Routes>
          <Route path="/home" element={HomePage()} />
          <Route
            exact
            path="/menu"
            element={<Menu dishes={this.state.dishes} />}
          ></Route>
          <Route path="/menu/:dishId" element={<DishWithId />} />
          <Route exact path="/contactus" element={<Contact />} />
          <Route exact path="/aboutus" element={<About leaders={this.state.leaders} />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        {/* <DishDetail
          dish={
            this.state.dishes.filter(
              (dish) => dish.id === this.state.selectedDish
            )[0]
          }
        /> */}
        <Footer />
      </div>
    );
  }
}

export default Main;
