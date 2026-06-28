import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App crashed:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="min-h-screen bg-surface text-white flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <h1 className="font-display text-2xl font-bold mb-3">Something went wrong</h1>
              <p className="text-white/60 mb-6">Please refresh the page to try again.</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-6 py-3 rounded-full bg-accent font-mono text-sm"
              >
                Reload
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
