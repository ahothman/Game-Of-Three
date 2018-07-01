var React = require('react')

var Refresh = ()=>{
    return <div className="info">
              <h3>The current session is no longer valid !!!</h3>
              <div>
                     <a href="/" className="btn">refresh</a>
              </div>
           </div>
}

module.exports = Refresh