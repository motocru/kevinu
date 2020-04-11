import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResultItem from './resultItem';

class Results extends Component {
   render() {
      return this.props.results.map((result, key) => (
         <tr key={key}>
            <ResultItem 
               result={result}
            />
            <style jsx>{`
               tr {
                  margin: 10px;
                  border-bottom: 1px solid #ddd;
                  text-align: center;
                  background-color: ${(result.endTime == result.guessTime) ? "#77ff33" : "#ff1a1a"};
               }
            `}</style>
         </tr>
      ))
   }
}

Results.propTypes = {
   results: PropTypes.array.isRequired
}

export default Results;