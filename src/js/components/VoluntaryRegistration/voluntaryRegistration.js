import React from 'react';
import classNames from 'classnames';
import './voluntaryRegistration.sass';

class VoluntaryRegistration extends React.Component{
	constructor(){
		super();
		this.state = {
			isSubmitButtonEnabled: false,
			submitButtonText: 'Complete the form to continue enrollment'
		};
	}
	isNameValid(str){
		// basic validation for now
		return /[\w]+/.test(str);
	}
	isCityValid(str){
		// basic validation for now
		return /[\w]+/.test(str);
	}
	isConsentValid(consent){
		return consent.checked;
	}
	handleSubmit(event){
		event.preventDefault();
		let obj = {
			fname: this.refs.fname.value,
			lname: this.refs.lname.value,
			city: this.refs.city.value,
			consent: this.refs.consent.checked
		};
		this.props.onSubmit(obj);

	}
	handleInputChange(event){
		let isSubmitButtonEnabled = this.state.isSubmitButtonEnabled;
		let submitButtonText = this.state.submitButtonText;
		if(this.isNameValid(this.refs.fname.value.trim()) 
				&& this.isNameValid(this.refs.lname.value.trim()) 
				&& this.isCityValid(this.refs.city.value.trim()) 
				&& this.isConsentValid(this.refs.consent)){
			isSubmitButtonEnabled = true;
			submitButtonText = 'I understand and wish to continue the enrolment';
		}
		this.setState({
			isSubmitButtonEnabled, 
			submitButtonText
		});


	}
	render(){
		let submitButtonClassnames = classNames({
			'submit': true,
			'enabled': this.state.isSubmitButtonEnabled
		});
		return <section className="voluntaryRegistration">
				<header className="heading">
					<div>Voluntary Participation</div>
				</header>
				<p className="line1">
					Participation in this study is voluntary. If you do not wish to participate, there will be no penalty of any kind.
				</p>
				<p className="line1">
					To confirm your intent to enroll in this study, please complete the form below.
				</p>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div className="row">
						<div className="half">
							<div className="label">First Name</div>
							<div><input type="text" placeholder="John" ref="fname" onChange={this.handleInputChange.bind(this)}/></div>
						</div>
						<div className="half">
							<div className="label">Last Name</div>
							<div><input type="text" placeholder="Doe" ref="lname" onChange={this.handleInputChange.bind(this)}/></div>
						</div>
					</div>
					<div className="row">
						<div className="full">
							<div className="label">Which city were you born ?</div>
							<div><input type="text" placeholder="City Name" ref="city" onChange={this.handleInputChange.bind(this)}/></div>
						</div>
					</div>
					<div className="row">
						<div className="full">
							<input type="checkbox" id="consentbox" ref="consent" onChange={this.handleInputChange.bind(this)}/>
	    					<label htmlFor="consentbox">I consent to participate in the study</label>
						</div>
					</div>
					<div className="row">
						<button disabled>&lt;</button>
						<button className={submitButtonClassnames} disabled={!this.state.isSubmitButtonEnabled} >{this.state.submitButtonText}</button>
 					</div>
				</form>	
			</section>;
	}
}
export default VoluntaryRegistration;
