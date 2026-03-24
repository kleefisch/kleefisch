"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl my-4 text-center">
          <p className="text-red-400 font-medium">
            Ops! Ocorreu um erro ao renderizar este conteúdo.
          </p>
          <p className="text-sm text-red-400/70 mt-2">
            Mas não se preocupe, o resto da página está seguro.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
