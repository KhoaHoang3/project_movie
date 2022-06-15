import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { loadingPage } from '../../redux/selectors';

export default function Loading() {
  const { isLoading } = useSelector(loadingPage);
  return (
    <Fragment>
      {isLoading ? (
        <div
          style={{
            position: 'fixed',
            backgroundColor: 'white',
            minHeight: '100vh',
            minWidth: '100vw',
            top: '0',
            zIndex: '10000000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <h1
            style={{ fontWeight: 'bolder', fontSize: '2rem' }}
            className="title"
          >
            Loading
          </h1>
          <div className="rainbow-marker-loader"></div>
        </div>
      ) : (
        ''
      )}
    </Fragment>
  );
}
