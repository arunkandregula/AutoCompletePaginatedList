import React from 'react';
import AppConstants from '../../constants/appConstants';
import VoluntaryRegistration from '../VoluntaryRegistration/VoluntaryRegistration';
import ProviderSearch from '../ProviderSearch/ProviderSearch';
import './Home.sass';

class Home extends React.Component{
	constructor(){
		super();
		this.state = {
			mode: AppConstants.AppMode.REGISTER_MODE
		};
	}
	onRegistrationSubmit(userData){
		// As per requirements, I have to just print it to console
		console.log(userData);
		// And then show the searh provider page.
		this.setState({
			mode: AppConstants.AppMode.SEARCH_MODE
		});
	}
	render(){
		let mainComp = null;
		if(this.state.mode === AppConstants.AppMode.REGISTER_MODE){
			mainComp = <VoluntaryRegistration onSubmit={this.onRegistrationSubmit.bind(this)} />;
		} else {
			mainComp = <ProviderSearch onSubmit={this.onRegistrationSubmit.bind(this)} />;
		}

		return <div className="companyPage">
					<header className="logo">
						<div className="name">
							<div className="title">MEDCOMPANY</div>
						</div>
						<div className="desc">Medcompany Efficacy Study</div>
					</header>
					{mainComp}
				</div>;	
	}
}

export default Home;

