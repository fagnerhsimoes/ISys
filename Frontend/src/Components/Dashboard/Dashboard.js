import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContentHeader from '../../Commons/Templates/Form/ContentHeader';
import Content from '../../Commons/Templates/Form/Content';
import ValueBox from  '../../Commons/Templates/Widget/ValueBox';
import Row from  '../../Commons/Templates/Form/Row';
import Layout from '../../Commons/Templates/Layout/Layout';

class Dashboard extends Component {

    render() {
        const credit = 0;
        const debt   = 0;

        return (
            <div> 
              <Layout />
                <div className='content-wrapper'>
                <ContentHeader title='Dashboard' small='Versão 1.0' />
                <Content>
                    <Row> 
                        <ValueBox 
                            cols='12 4' 
                            color='green' 
                            icon='bank'
                            value={`R$ ${credit}`} 
                            title='Total de Créditos' 
                            subtitle="+"/>
                        <ValueBox 
                            cols='12 4' 
                            color='red' 
                            icon='credit-card'
                            value={`R$ ${debt}`} 
                            title='Total de Débitos'
                            subtitle="-" />
                        <ValueBox 
                            cols='12 4' 
                            color='blue' 
                            icon='money'
                            value={`R$ ${credit - debt}`} 
                            title='Valor Consolidado'
                            subtitle="(+ - (-)) " />
                    </Row> 
                </Content> 
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)