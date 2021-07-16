import React, { useContext, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

function MenuBar() {
	const pathname = window.location.pathname;
	const path = pathname === '/' ? 'home' : pathname.substr(1);
	const [activeItem, setactiveItem] = useState(path);
	const context = useContext(AuthContext);
	const { user } = context;


	const handleItemClick = (e, { name }) => setactiveItem(name);
	 return  user ? (
			<Menu pointing secondary size="massive" color="pink">
				<Menu.Item
					name={user.username}
					active
					as={Link}
					to='/'
				/>
				<Menu.Menu position='right'>
					<Menu.Item
						name='logout'
						onClick={context.logout}
					/>

				</Menu.Menu>
			</Menu>
	) : (
			<Menu pointing secondary size="massive" color="pink">
				<Menu.Item
					name='home'
					active={activeItem === 'home'}
					onClick={handleItemClick}
					as={Link}
					to='/'
				/>
				<Menu.Menu position='right'>
					<Menu.Item
						name='login'
						active={activeItem === 'login'}
						onClick={handleItemClick}
						as={Link}
						to="/login"
					/>
					<Menu.Item
						name='register'
						active={activeItem === 'register'}
						onClick={handleItemClick}
						as={Link}
						to="/register"
					/>
				</Menu.Menu>
			</Menu>
	)

}

export default MenuBar;