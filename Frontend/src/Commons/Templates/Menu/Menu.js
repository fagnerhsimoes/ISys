import React from 'react';
import MenuItem from './MenuItem';
import MenuTree from './MenuTree';

export default props => (
    <ul className='sidebar-menu'>
        <MenuItem path='/' label='Dashboard' icon='dashboard' />
        <MenuTree label='Cadastro' icon='edit'>
            <MenuItem path='vendor'
                label='Fornecedor' icon='usd' />
            <MenuItem path='category'
                label='Categoria' icon='usd' />
            <MenuItem path='product'
                label='Produto' icon='usd' />
            <MenuItem path='customer'
                label='Cliente' icon='usd' />
            <MenuItem path='/filme'
                label='Filme' icon='film' />
        </MenuTree>
        <MenuTree label='Torneio' icon='tasks'>
            <MenuItem path='/torneio'
                label='Novo Torneio' icon='play' />
            <MenuItem path='/torneiosrealizados'
                label='Torneios Realizados' icon='flag' />
        </MenuTree>
    </ul>
)