import { useEffect } from 'react'
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types'; 
 
const modalRoot = document.querySelector('#modal-root');

const Modal = ({onCloseModal, children}) => {

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); }
  })

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onCloseModal();
    }
  };

  const onBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  };

  return createPortal(
      <div className="Overlay" onClick={onBackdropClick}>
        <div className="Modal">{children}</div>
      </div>,
      modalRoot,
    );
}

Modal.propTypes = {
  onCloseModal: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   onBackdropClick = event => {
//     if (event.currentTarget === event.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className="Overlay" onClick={this.onBackdropClick}>
//         <div className="Modal">{this.props.children}</div>
//       </div>,
//       modalRoot,
//     );
//   }
// }

