import React, { Component } from 'react'

export class TxtLength extends Component {

    state = {
        isLongShown: false,
    }
    onToggleShow = () => {
        this.setState(({ isLongShown }) => ({ isLongShown: !isLongShown }))
    }
    render() {
        const { isLongShown } = this.state
        const isOver20 = (this.props.text.length > 20) ? true : false;
        let shortTxt = this.props.text.slice(0, 20)
        if (isOver20) shortTxt += '...'
        return <div>
            <p>
                <span>{isLongShown ? this.props.text : shortTxt}</span>
                {isOver20 && <span className="txt-show-btn" onClick={this.onToggleShow}>{isLongShown ? ' Show Less' : ' Show More'}</span>}
            </p>
        </div>
    }


}