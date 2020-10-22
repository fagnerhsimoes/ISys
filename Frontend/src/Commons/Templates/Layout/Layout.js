import React              from 'react';
import SideBar from '../../../Commons/Templates/SideBar/SideBar';
import Header from '../../../Commons/Templates/Header/Header';
import Footer from '../../../Commons/Templates/Footer/Footer';
import { Alert } from '../../../Components/Alert/Alert';
import Messages from '../../../Commons/Templates/Msg/Messages';


export default props => (
    <div className='wrapper'>
        <Header />
        <Alert />
        <SideBar />
          {props.children}
        <Footer />
        <Messages />
    </div>
);
