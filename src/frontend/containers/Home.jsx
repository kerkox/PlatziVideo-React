/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import '../assets/styles/App.scss';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Header from '../components/Header';

const Home = ({ myList, trends, originals }) => {
  return (
    <>
      <Header />
      <Search isHome />
      {
        myList.length > 0 && (
          <Categories title='Mi Lista'>
            <Carousel>
              <Carousel>
                {
                  myList.map((item) => (
                    <CarouselItem
                      key={item.id}
                      {...item}
                      isList
                    />
                  ))
                }
              </Carousel>
            </Carousel>
          </Categories>
        )
      }

      <Categories title='Tendencias'>
        <Carousel>
          {
            trends.map((item) => <CarouselItem key={item.id} {...item} />)
          }
        </Carousel>
      </Categories>

      <Categories title='Originales'>
        <Carousel>
          {
            originals.map((item) => <CarouselItem key={item.id} {...item} />)
          }

        </Carousel>
      </Categories>

    </>
  );
};

const mapStateToProps = (state) => {
  console.log('state.search', state.search);
  console.log('state.trendsFilter', state.trendsFilter);
  return {
    myList: state.myList,
    trends: state.search ? state.trendsFilter : state.trends,
    originals: state.search ? state.originalsFilter : state.originals,
  };
};
export default connect(mapStateToProps, null)(Home);
