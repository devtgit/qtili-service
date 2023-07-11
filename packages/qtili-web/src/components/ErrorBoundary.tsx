import React, { ErrorInfo } from "react";

type Props = {
  children: React.ReactNode;
};

export class ErrorBoundary extends React.Component<
  Props,
  { error: Error | null; info: ErrorInfo | null }
> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, info: null };
  }

  // static getDerivedStateFromError(error: Error) {
  //   // Update state so the next render will show the fallback UI.
  //   return { error: error };
  // }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    console.error(error);
    console.error(info.componentStack);
    this.setState({
      error,
      info,
    });
  }

  render() {
    if (this.state.error && this.state.info) {
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.info.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
