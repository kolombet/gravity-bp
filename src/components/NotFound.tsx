import * as React from 'react';
import { connected, IProps } from 'reducers';
import { RealisticTyper } from 'react-realistic-typer';
import { g } from 'styles';

class Main extends React.Component<IProps> {
  render() {
    const { history } = this.props;
    const { H1 } = g;

    return (
      <>
        <H1>
          <RealisticTyper message="Sorry, nothing to see here..." />
        </H1>
        <button onClick={() => history.push('/')}>Go Back</button>
      </>
    );
  }
}

export const NotFound = connected(Main);
