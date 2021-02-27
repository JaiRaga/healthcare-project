import React, { Fragment } from 'react'
import { Hidden } from '@material-ui/core'
import Navbar from '../layout/Navbar'
import Drawer from '../layout/Drawer'

const Landing = () => {
	return (
		<Fragment>
			<Hidden only={['xs', 'sm']}>
				<Navbar />
			</Hidden>
			<Hidden only={['md', 'lg', 'xl']}>
				<Drawer />
			</Hidden>

			<div>Landing page.</div>
		</Fragment>
	)
}

export default Landing
