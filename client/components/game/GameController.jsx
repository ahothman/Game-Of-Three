var React = require('react')
var { Component } = React
var io = require('socket.io-client')

class GameController extends Component {
   constructor(props){
       super(props)
       var { canStart } = this.props
       this.state = {
          startNumber:'',
          selectManually:false,
          canStart
       }
       this.onTextChange = this.onTextChange.bind(this)
       this.onCheckBoxChange = this.onCheckBoxChange.bind(this)
       this.start = this.start.bind(this)
   }

   static get defaultProps(){
       return {
           canStart:false,
           startGame:()=>{}
       }
   }

   componentWillReceiveProps(nextProps){
       var { canStart } = nextProps
        if(this.props.canStart != canStart){
            this.setState({
                canStart
            })
        }
   }
  
   generateRandomNumber(){
        var number = Math.floor(Math.random() * 1000 ) + 2
       return number
   }

   start(){
        var { startNumber, selectManually } = this.state 
        var { startGame } = this.props
        this.setState({
            error:''
        })
        if(selectManually){
            if(startNumber.length == 0 ){
                this.setState({
                    error:'in order to start , you have to type an initial number.'
                })
                return
            }
            if(parseInt(startNumber) < 2 ){
                this.setState({
                    error:'The number should be at least 2'
                })
                return
            }
        } 
        else {
                startNumber = this.generateRandomNumber()
            }
         startGame(startNumber)
   }

   
   onTextChange(e){
         var val = e.target.value,
             reg = /^\d+$/
         if(reg.test(val) || val == ''){
             this.setState({
                 startNumber:val
             })
         }
   }

   onCheckBoxChange(e){
       this.setState({
           selectManually:!this.state.selectManually
       })
   }

   render(){
      var { startNumber, canStart, selectManually, error } = this.state

      return   <div className="game-controller">
                        <div className="control">
                            <span className="error">{error}</span>
                        </div>
                        <div className="control">
                                 <input type="text"
                                        disabled={!selectManually}
                                        value={startNumber}
                                        placeholder="Type number to start with"
                                        onChange={this.onTextChange}
                                        className="custom-input"/>
                        </div>
                        <div className="control">
                              <span>Select a number manually.</span>
                              <input type="checkbox" onChange={this.onCheckBoxChange} checked={selectManually}/>
                        </div>
                        <div className="control">
                             <button  className="btn btn-lg" 
                                      onClick={this.start} 
                                      disabled={!canStart}>Start the Game !!
                              </button>
                        </div>
                 </div>
              
   }
}

module.exports = GameController