import React from 'react'

const toolbar = props => (
    <header>
        <nav>
            <div> </div>
            <div><a href=""> LOGO</a></div>
            <div>
                <ul>
                    <li> <Link to={"/"}> Home</Link></li>
                    <li> <Link to={"/new/player"}> Create Player </Link></li>
                </ul>
                
            </div>
        </nav>
    </header>
)

export default toolbar;