import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { COLOR } from '../../../lib/shared';
import api from '../api';

class Blocker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { blocker: props.blocker, hovering: false };
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.reload = props.reload;
  }

  componentWillReceiveProps({ blocker }) {
    this.setState({ blocker });
  }


  onMouseOver(e) {
    this.setState({ hovering: true });
  }

  onMouseOut(e) {
    this.setState({ hovering: false });
  }

  onClickHandler(e) {
    api.deleteBlocker(this.state.blocker)
      .then(res => this.reload());
  }

  render() {
    const blocker = this.state.blocker;
    const style = {
      borderRadius: '10px', margin: 'auto', width: '80%', backgroundColor: COLOR.red, padding: '5px', textAlign: 'center', height: '20px',
    };


    if (this.state.hovering) {
      return (
        <div onMouseLeave={this.onMouseOut}>
          <Card style={style}>
            <CardContent style={{
              height: '20px', padding: '0px', display: 'inline-block', width: '100%',
            }}
            >
              <div sytle={{ position: 'fixed' }}>
                {blocker.title}
              </div>
              <Button
                id={this.state.blocker.id}
                style={{
                  position: 'relative', float: 'right', top: '-25px', height: '5px', padding: '0', display: 'inline-block',
                }}
                onClick={this.onClickHandler}
              >
                <DeleteIcon />
              </Button>
            </CardContent>

          </Card>
        </div>
      );
    }

    return (
      <div>
        <Card style={style} onMouseEnter={this.onMouseOver}>
          <CardContent style={{ height: '20px', padding: '0px' }}>
            {blocker.title}
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Blocker;
