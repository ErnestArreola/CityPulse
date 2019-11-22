import React from 'react';

import './Modal.css';

const modal = props => {
          const cssClasses = [
            "Modal",
             props.show ? "ModalOpen" : "ModalClosed"
           ];
console.log("in Modal")
console.log(props.show)
        return (
            <div classname={cssClasses.join(' ')}>
              { props.children}
            </div>
        );
      };
export default modal;
