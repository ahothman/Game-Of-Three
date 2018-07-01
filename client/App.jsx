var React =  require('react')
var { render } = require('react-dom')
var Game = require('./components/game')
var styles =  require('./styles/index.scss')

render(<Game/>,document.getElementById('app'))