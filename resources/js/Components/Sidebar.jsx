import React from 'react'
import NavLink from '@/Components/NavLink';
import { SidebarData } from './SidebarData';
export default function Sidebar(){
    return (
        <div className="Sidebar">
            <ul className='SidebarList'>
                { SidebarData.map((val, key) => {
                    return(
                    <li 
                    key={key} 
                    className='row'
                    onClick={() => {
                        window.location.pathname = val.link;
                    }}
                    >
                        <div id='iconList'>{val.icon}
                        <NavLink className='titleList' 
                            active={route().current(val.active)}
                        >
                            {val.title}
                        </NavLink>
                        </div>
                       
                    </li>
                    );
                }) }
            </ul>

        </div>
    );

}