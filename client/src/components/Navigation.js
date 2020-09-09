import React from 'react'
import {NavLink} from 'react-router-dom';

export const Navigation = () => (
    <nav>
        <ul>
            <li><NavLink exact activeClassName="current" to='/'>Home</NavLink></li>
            <li><NavLink exact activeClassName="current" to='/Table'>Table</NavLink></li>
            <li><NavLink exact activeClassName="current" to='/MyForm'>MyForm</NavLink></li>
        </ul>
    </nav>
);
