import React from 'react';
import classnames from 'classnames';
import './AutoComplete.sass';


function debounce(callback, delay){
	let timeoutId = null;
	return function(...args){
		if(timeoutId != null){
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(()=>{
			callback(...args);
			timeoutId = null;
		}, delay);
	}

}

class AutoComplete extends React.Component{
		constructor(){
			super();
			this.debounceDelay = 1000;
		}
		componentWillMount(){
			this.delayedCallback = debounce(this.props.onChange, this.debounceDelay);
		}
        onSelect(selectedItem){
            this.props.onSelect(selectedItem);
        }
        onChange(event){
        	event.persist();
    		this.delayedCallback(event.target.value);
        }
        renderListItems(items){
            return items.map((eachFilteredItem, i)=>{
                return <li className="AutoComplete-listItem" key={'eachItem_'+i} onClick={this.onSelect.bind(this, eachFilteredItem)}>{this.props.renderItem(eachFilteredItem)}</li>;
            });
        }

        render(){
                let listStyle = {
                    width: 0
                };
                if(this.refs.inputText){
                    listStyle.width = this.refs.inputText.offsetWidth + 'px';
                }
                let middleSectionClassNames = classnames({
                    'AutoComplete-middle-section': true,
                    'hide' : !this.props.isDropdownOpen,
                    'mask' : this.props.isLoading
                });
                
                return <div className={`AutoComplete ${this.props.className}`}>
                            <div className="AutoComplete-top-section">
                                    <input className="AutoComplete-input" ref="inputText" placeholder={this.props.placeholder} onChange={this.onChange.bind(this)} />
                            </div>
                            <div className={middleSectionClassNames} style={listStyle}>
                                <ul ref="list" className="AutoComplete-list" >
                                    {this.renderListItems(this.props.items)}
                                </ul>
                                <div className="loading">{this.props.isLoadingText}</div>
                            </div>

                        </div>;
        }
}

export default AutoComplete;

