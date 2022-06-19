import Proptypes from "prop-types"

function Button({text}){
    return(
        <div>
            <button  >{text}</button>
        </div>
    )
};

Button.prototype = {
    text: Proptypes.string.isRequired
}

export default Button;