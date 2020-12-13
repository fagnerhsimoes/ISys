import React              from 'react';
//import SideBar from '../../Commons/Templates/SideBar/SideBar';
//import Header from '../../Commons/Templates/Header/Header';
//import Footer from '../../Commons/Templates/Footer/Footer';
//import Messages from '../../Commons/Templates/Msg/Messages';

import SideBar from '../SideBar/SideBar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


export default props => (
    <div className='wrapper'>
        <Header />
        <SideBar />
          {props.children}
        <Footer />
    </div>
);
