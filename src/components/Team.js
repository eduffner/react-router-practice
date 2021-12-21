import { Component } from 'react'
import { getTeam } from '../api'
import propTypes from 'prop-types'

export default class Team extends Component {
    static propTypes = {
        id: propTypes.string.isRequired,
        children: propTypes.func.isRequired,
    }

    state = {
        team: null,
        loading: true
    }

    fetchTeam = (id) => {
        getTeam(id).then((team) => this.setState(() => ({team, loading: false})))
    }

    componentDidMount() {
        this.fetchTeam(this.props.id)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id) {
            this.fetchTeam(nextProps.id)
        }
    }


    render() {
        return this.props.children(this.state.team)
    }
}