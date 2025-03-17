/* eslint-disable */

import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }; // Update state to show fallback UI
  }

  componentDidCatch(error, info) {
    this.setState({ error, info }); // Log the error and info for debugging
    console.error("Error Boundary Caught: ", error, info);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    return this.props.children; // Render children if no error
  }
}

export default ErrorBoundary;
