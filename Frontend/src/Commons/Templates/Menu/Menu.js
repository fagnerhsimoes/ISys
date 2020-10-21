import React from 'react';
import MenuItem from './MenuItem';
import MenuTree from './MenuTree';

export default props => (
    <ul className='sidebar-menu'>
        <MenuItem path='/' label='Inicio' icon='dashboard' />
        <MenuTree label='Cadastro' icon='edit'>
            <MenuItem path='room'
                label='Sala' icon='usd' />
        </MenuTree>
        <MenuTree label='Reserva' icon='edit'>
        <MenuItem path='reservation'
                label='Nova Reserva de Sala' icon='usd' />
            <MenuItem path='getreservationsavailability'
                label='Reservas de Salas' icon='usd' />
        </MenuTree>
    </ul>
)