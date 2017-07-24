import React from 'react';
import './ProviderSearch.sass';
import {Link} from 'react-router';
import AutoComplete from '../AutoComplete/AutoComplete';
import classnames from 'classnames';


class ProviderSearch extends React.Component{
	constructor(){
		super();
		this.pageSize = 2;
		this.state = {
			items: [],
			filteredItems: [],
			inputText: '',
			isDropdownOpen: false,
			selectedItem: null,
			currentPageNum: 0,
			isLoading: false
		};
	}
	componentWillMount(){
		fetch('../../../../data/data1.json')
			.then((response) => response.json())
			.then((response)=>{
				this.setState({
					items: response
				});
			});
		
	}
	onSelectCB(selectedItem){
		console.log(selectedItem);
		fetch("/someurl",
			{
			    headers: {
			      'Accept': 'application/json',
			      'Content-Type': 'application/json'
			    },
			    method: "POST",
			    body: JSON.stringify(selectedItem)
			})
			.then(function(res){ console.log(res) })
			.catch(function(res){ console.log(res) });
	}
    getFilteredOptions(arr, inputText){
        let set = [];

        if(inputText.trim().length > 0){
            set = this.state.items.filter((eachItem)=>{
                return this.shouldItemRender(eachItem, inputText);
            });
        }
        return set;
    }	
	onChangeCB(inputText){

		// lets introduce a bit of delay to show the Loading state as per requirements
		let filteredItems = this.getFilteredOptions(this.state.items, inputText);
		this.setState({
			inputText: inputText,
			isLoading: true
		});
		setTimeout(()=>{
	        this.setState({
	            inputText: inputText,
	            isDropdownOpen: true,
	            selectedItem: null,
	            filteredItems: filteredItems,
	            isLoading: false
	        });
		}, 2000);



	}
	shouldItemRender(item, inputText){
		if(item.first_name != null && item.first_name.toLowerCase().startsWith(inputText.toLowerCase())){
			return true;
		}
		if(item.last_name != null && item.last_name.toLowerCase().startsWith(inputText.toLowerCase())){
			return true;
		}
		if(item.organization_name != null && item.organization_name.toLowerCase().startsWith(inputText.toLowerCase())){
			return true;
		}
		return false;

	}
	renderItem(item){
		if(item.first_name != null && item.last_name != null){
			return `${item.first_name} ${item.last_name}`;
		}
		if(item.organization_name != null ){
			return `${item.organization_name}`;
		}
		return 'Dont know how to render';

	}
	changePageNumber(pgNum){
		this.setState({
			currentPageNum: pgNum
		});
	}
	getPaginatedButtons(){
		let numPages = this.getTotalNumOfPages();
		let buttons = Array.apply(null, {length: numPages}).map((item, i)=>{
			let btnClass = classnames({
				'active': i === this.state.currentPageNum
			});
			return <button key={'btn-pg-'+i} onClick={this.changePageNumber.bind(this, i)} className={btnClass}>{i}</button>;
		});
		return buttons;
	}
	getTotalNumOfPages(){
		return Math.ceil(this.state.filteredItems.length / this.pageSize);
	}
	getCurrentPageItems(){
		let numPages = this.getTotalNumOfPages();
		let pageItems = this.state.filteredItems.slice();
		let startIndex = (this.state.currentPageNum)*this.pageSize;
		let endIndex = startIndex + this.pageSize;
		return this.state.filteredItems.slice(startIndex, endIndex);
	}
	render(){
		return <section className="providerSearch">
				<header className="heading">
					<div className="htext">Search for a physician or organization</div>
				</header>	
				<div className="autocomplete-area">
					<AutoComplete 
						className="autocomplete-parent" 
	                    inputText={this.state.inputText}
	                    selectedItem= {this.state.selectedItem}
	                    isDropdownOpen= {this.state.isDropdownOpen}
						items={this.getCurrentPageItems()} 
						onSelect={this.onSelectCB.bind(this)}
						onChange={this.onChangeCB.bind(this)}
						placeholder="Search for a doctor, physician or organization by name"
						renderItem={(eachItem)=>{
							return this.renderItem(eachItem);
						}}
						isLoading= {this.state.isLoading}
						isLoadingText='Loading Providers...'
					/> 
				</div>
				<div className="main-footer">
					<div className="pagination">
						{this.getPaginatedButtons()}
					</div>
					<div>
						<Link to="/"><button className="homeBtn">Go to Home</button></Link>
					</div>	
				</div>
			</section>;
	}
}

export default ProviderSearch;