import { Component, ErrorInfo } from "react";
import '../assets/scss/error-boundary.scss'
interface IProps {
	title?: string;
	message?: string;
	children: React.ReactNode;
}

interface IState {
	hasError: boolean;
	errorMessage?: string;
}



export class ErrorBoundary extends Component<IProps, IState> {
	public constructor(props: IProps) {
		super(props);
		this.state = { hasError: false };
	}

	public componentDidCatch(error: Error, info: ErrorInfo) {
		console.error(error, info);
		this.setState({
			hasError: true,
			errorMessage: error.stack,
		});
	}

	public render() {
		const { title = 'Something went wrong.', message = this.state.errorMessage } = this.props;

		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div className="error-boundary">
                    <h1 className="error-boundary__title">{title}</h1>
                    <p className="error-boundary__subtitle">{message}</p>
                    <button className="error-boundary__button" onClick={() => window.location.reload()}>Reload</button>
                    </div>
			);
		}

		return this.props.children;
	}
}