import React from 'react';
import { connect } from 'react-redux';
import { focusFriend } from '../../actions';

function ProfileLink({ dispatch, cdusuario, children, ...rest }) {
    return <div onClick={() => dispatch(focusFriend(cdusuario))} {...rest}>
        {children}
    </div>;
}

export default connect()(ProfileLink);