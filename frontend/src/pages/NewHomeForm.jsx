import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header } from '../cmps/Header.jsx'
import { addHome } from '../store/actions/userActions'
import { loadUser } from '../store/actions/userActions'
import Alert from '../cmps/Alert'
import { TextField } from '@material-ui/core'

class _NewHomeForm extends Component {

    state = {
        stay: {
            name: '',
            price: 0,
            capacity: 0,
            summary: '',
            country: '',
            address: '',
        },
        isSubmit: false
    }

    componentDidMount() {
        this.props.loadUser(this.props.loggedInUser._id)
    }

    handleChange = ({ target }) => {
        let { name, value } = target
        const { stay } = this.state
        value = name === 'price' || name === 'capacity' ? +value : value
        this.setState({ stay: { ...stay, [name]: value } })
        console.log(stay)
    }

    addStay = (ev) => {
        ev.preventDefault()
        const { stay } = this.state
        const { _id } = this.props.loggedInUser
        this.props.addHome(stay, _id)
        this.setState({ isSubmit: true })
        this.props.history.push('/')
    }


    render() {
        const { stay, isSubmit } = this.state
        if (!stay) return <div>Loading</div>
        return (
            <div className="stay-edit flex column ">
                <Header />
                <h2>{stay._id ? 'Edit stay' : 'Add new stay'}</h2>
                <div className="divider"></div>
                <form onSubmit={this.addStay} className="flex column align-center" >
                    <TextField
                        name="name"
                        variant="outlined"
                        value={stay.name}
                        label="Name"
                        color="primary"
                        onChange={this.handleChange}
                        required={true}
                        style={{ width: 400 }}
                    />
                    <TextField
                        name="country"
                        variant="outlined"
                        value={stay.country}
                        label="country"
                        color="primary"
                        onChange={this.handleChange}
                        required={true}
                        style={{ width: 400 }}
                    />
                    <TextField
                        name="address"
                        variant="outlined"
                        value={stay.address}
                        label="address"
                        color="primary"
                        onChange={this.handleChange}
                        required={true}
                        style={{ width: 400 }}

                    />
                    <TextField
                        id="standard-number"
                        name="price"
                        placeholder="price"
                        variant="outlined"
                        label="Price"
                        type="number"
                        InputProps={{ inputProps: { min: 1, max: 100000 } }}
                        InputLabelProps={{ shrink: true }}
                        onChange={this.handleChange}
                        required={true}
                        style={{ width: 400 }}
                    />
                    <TextField
                        select
                        id="standard-number"
                        name="capacity"
                        label="Capacity"
                        value={stay.capacity}
                        SelectProps={{ native: true }}
                        variant="outlined"
                        onChange={this.handleChange}
                        required={true}
                        style={{ width: 400 }}

                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>

                    </TextField>
                    <TextField
                        placeholder="Add a short summary to your home"
                        multiline
                        rows={4}
                        rowsMax={4}
                        name="summary"
                        variant="outlined"
                        value={stay.summary}
                        label="Summary"
                        color="primary"
                        onChange={this.handleChange}
                        required={true}
                        style={{ width: 400 }}

                    />
                    <button className={isSubmit ? `add-btn submit` : `add-btn`}>Submit</button>
                </form>
                {
                    isSubmit &&
                    <Alert text="Your home has added successfully, check it on My-Stays page!" severity={"success"} />
                }
            </div>
        )
    }
}




function mapStateToProps(state) {
    return {
        stays: state.stayModule.stays,
        loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    addHome,
    loadUser
}

export const NewHomeForm = connect(mapStateToProps, mapDispatchToProps)(_NewHomeForm)