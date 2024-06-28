import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackward,
  faFastBackward,
  faForward,
  faFastForward,
  faShare
} from '@fortawesome/free-solid-svg-icons';


const PaginationButton = ({ canActivate, icon, onClick }) => {
  return (
    <a
      className='page-link d-flex align-items-center flex-grow-1 h-100'
      role='button'
      onClick={onClick}
      style={{ pointerEvents: canActivate() ? 'auto' : 'none' }}
    >
      <div className='d-flex flex-column align-items-center'>
        <span>
          <FontAwesomeIcon icon={icon} size='sm' />
        </span>
      </div>
    </a>
  );
};

PaginationButton.propTypes = {
  canActivate: PropTypes.func.isRequired,
  icon: PropTypes.element,
  onClick: PropTypes.func.isRequired
};

const SimplePagination = ({ currentPage, firstPage, lastPage, onPageChange }) => {

  const [userInput, setUserInput] = useState('');

  const onInputKeyDown = (ev) => {
    if (ev.key !== 'Enter') {
      return;
    }

    const page = parseInt(userInput);
    if (Number.isInteger(page) && page >= firstPage && page <= lastPage) {
      onPageChange(page);
    }
  };

  const onInputChange = (ev) => setUserInput(ev.target.value);

  const canGoHome = () => currentPage != firstPage;
  const canGoPrev = () => currentPage > firstPage;
  const canGoNext = () => currentPage < lastPage;
  const canGoLast = () => currentPage != lastPage;

  const goToHome = () => onPageChange(firstPage);
  const goToPrev = () => onPageChange(currentPage - 1);
  const goToNext = () => onPageChange(currentPage + 1);
  const goToLast = () => onPageChange(lastPage);

  return (
    <Container>
      <Row>
        <Col className='d-flex justify-content-center'>
          <ul className='pagination align-items-stretch mb-0'>
            <li className='page-item d-flex align-items-stretch'>
              <PaginationButton canActivate={canGoHome} icon={faFastBackward} onClick={goToHome} />
            </li>

            <li className='page-item d-flex align-items-stretch'>
              <PaginationButton canActivate={canGoPrev} icon={faBackward} onClick={goToPrev} />
            </li>

            <li className='page-item d-flex align-items-stretch'>
              <div className='page-link d-flex align-items-center flex-grow-1 h-100'>
                <div className='d-flex align-items-center'>
                  <span className='fw-bold'>Page {currentPage} sur {lastPage}</span>
                  &nbsp; &nbsp; &nbsp;
                  <span>
                    <FontAwesomeIcon icon={faShare} size='sm' />
                  </span>
                  &nbsp;
                  <input
                    size={4}
                    type='number'
                    aria-label='Page'
                    step={1}
                    min={firstPage}
                    max={lastPage}
                    onChange={onInputChange}
                    onKeyDown={onInputKeyDown}
                    style={{ minWidth: '80px', textAlign: 'right' }}
                  />
                </div>
              </div>
            </li>

            <li className='page-item d-flex align-items-stretch'>
              <PaginationButton canActivate={canGoNext} icon={faForward} onClick={goToNext} />
            </li>

            <li className='page-item d-flex align-items-stretch'>
              <PaginationButton canActivate={canGoLast} icon={faFastForward} onClick={goToLast} />
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

SimplePagination.propTypes = {
  firstPage: PropTypes.number,
  lastPage: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func
};

SimplePagination.defaultProps = {
  firstPage: 1,
  lastPage: Number.MAX_SAFE_INTEGER,
  currentPage: 1,
  onPageChange: () => { }
};

export default SimplePagination;
