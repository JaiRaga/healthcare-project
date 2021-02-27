import React from 'react'
import {
	makeStyles,
	AppBar,
	Toolbar,
	IconButton,
	Hidden,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	appbar: {
		background: `linear-gradient(90deg, rgba(55,237,217,1) 0%, rgba(0,121,255,1) 100%, rgba(111,9,236,1) 100%)`,
	},
}))

const Navbar = () => {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<AppBar position='static' className={classes.appbar}>
				<Toolbar variant='dense'>
					<Hidden only={['lg', 'xl']}>
						<IconButton
							edge='start'
							className={classes.menuButton}
							color='inherit'
							aria-label='menu'>
							<MenuIcon />
						</IconButton>
					</Hidden>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Navbar
