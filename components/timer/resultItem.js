import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResultItem extends Component {
   render() {
      return (
         <React.Fragment>
            <td>{(this.props.result.item == 'red') ? "Red Armor": "Mega Health"}</td>
            <td>XX:{(this.props.result.startTime < 10) ? '0'+this.props.result.startTime: this.props.result.startTime}</td>
            <td>XX:{(this.props.result.endTime < 10) ? '0'+this.props.result.endTime: this.props.result.endTime}</td>
            <td>XX:{(this.props.result.guessTime < 10) ? '0'+this.props.result.guessTime: this.props.result.guessTime}</td>
         </React.Fragment>
      );
   }
}

ResultItem.propTypes = {
   result: PropTypes.object.isRequired
}

export default ResultItem