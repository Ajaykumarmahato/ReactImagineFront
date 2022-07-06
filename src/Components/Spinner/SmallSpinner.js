import { SpinnerCircular } from 'spinners-react';


function SmallSpinner(props){
    return(
        <SpinnerCircular color={props.color} size={props.size} enabled={true} />
    );
}

export default SmallSpinner;