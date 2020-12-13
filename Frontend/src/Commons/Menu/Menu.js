import React from 'react';
import MenuItem from './MenuItem';
import MenuTree from './MenuTree';

export default props => (
    <ul className='sidebar-menu'>
        <MenuItem path='/' label='Inicio' icon='home' />
        <MenuTree label='Cadastro' icon='edit'>
            <MenuItem path='room'
                label='Sala' icon='building' />
        </MenuTree>
        <MenuTree label='Agendamento' icon='tag'>
        <MenuItem path='reservation'
                label='Reserva de Sala' icon='clock-o' />
            <MenuItem path='getreservationsavailability'
                label='Disponibilidade de Sala' icon='calendar' />
        </MenuTree>
    </ul>
)