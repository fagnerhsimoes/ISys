import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContentHeader from '../../Commons/Form/ContentHeader';
import Content from '../../Commons/Form/Content';
import Row from  '../../Commons/Form/Row';
import Layout from '../../Commons/Layout/Layout';

class Home extends Component {

    render() {
        const credit = 0;
        const debt   = 0;

        return (
            <div> 
              <Layout />
                <div className='content-wrapper'>
                <ContentHeader title='Inicio' small='Versão 1.0' />
                <Content>
                    <Row> 
                    </Row> 
                </Content> 
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Home)