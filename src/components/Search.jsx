import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { filterVideos } from '../actions';
import '../assets/styles/components/Search.scss';

const Search = (props) => {
  const { isHome } = props;
  const inputStyle = classNames('input', {
    isHome,
  });
  const handleInput = (event) => {
    props.filterVideos(event.target.value);
  };
  return (
    <section className='main'>
      <h2 className='main__title'>¿Qué quieres ver hoy?</h2>
      <input type='text' className={inputStyle} onChange={handleInput} placeholder='Buscar...' />
    </section>
  );
};

const mapDispatchToProps = {
  filterVideos,
};

export default connect(null, mapDispatchToProps)(Search);
